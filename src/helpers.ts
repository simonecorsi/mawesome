import fs from 'fs';
import ejs from 'ejs';
import * as core from '@actions/core';
import remark from 'remark';
import toc from 'remark-toc';

import MD_TEMPLATE from './template';
import GithubApi from './api';
import link from './link';
import git from './git';

import type { PaginationLink, ApiGetStarResponse, Stars, Star } from './types';

export const REPO_USERNAME = process.env.GITHUB_REPOSITORY?.split('/')[0];
export const API_STARRED_URL = `${process.env.GITHUB_API_URL}/users/${REPO_USERNAME}/starred`;

const fsp = fs.promises;

export function wait(time = 200): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export async function renderer(
  data: { [key: string]: any },
  templateString = MD_TEMPLATE
): Promise<string> {
  try {
    return ejs.render(templateString, data);
  } catch (error) {
    core.setFailed(`#renderer: ${error}`);
    return '';
  }
}

export function getNextPage(links: PaginationLink[]): string | null {
  const next = links.find((l) => l.rel === 'next');
  const last = links.find((l) => l.rel === 'last');
  if (!next || !last) return null;
  const matchNext = next.uri.match(/page=([0-9]*)/);
  const matchLast = last.uri.match(/page=([0-9]*)/);
  if (!matchNext || !matchLast) return null;
  if (matchNext[1] === matchLast[1]) return null;
  return matchNext[1];
}

async function* paginateStars(url: string): AsyncGenerator<Stars> {
  let nextPage: string | null = '1';
  while (nextPage) {
    try {
      const { headers, body } = await GithubApi.get(url, {
        searchParams: {
          page: nextPage,
        },
      });
      yield (body as unknown) as Stars;
      nextPage = getNextPage(link.parse(headers.link).refs);
      await wait(1000); // avoid limits
    } catch (e) {
      console.error(e);
      break;
    }
  }
}

export async function apiGetStar(
  url: string = API_STARRED_URL
): Promise<ApiGetStarResponse> {
  const data: Partial<Star>[] = [];
  for await (const stars of paginateStars(url)) {
    for (const star of stars) {
      data.push({
        id: star.id,
        node_id: star.node_id,
        name: star.name,
        full_name: star.full_name,
        owner: {
          login: star?.owner?.login,
          id: star?.owner?.id,
          avatar_url: star?.owner?.avatar_url,
          url: star?.owner?.url,
          html_url: star?.owner?.html_url,
        },
        html_url: star.html_url,
        description: star.description,
        url: star.url,
        languages_url: star.languages_url,
        created_at: star.created_at,
        updated_at: star.updated_at,
        git_url: star.git_url,
        ssh_url: star.ssh_url,
        clone_url: star.clone_url,
        homepage: star.homepage,
        stargazers_count: star.stargazers_count,
        watchers_count: star.watchers_count,
        language: star.language,
        topics: star.topics,
      } as Partial<Star>);
    }
  }
  return (data as unknown) as Stars;
}

export function generateMd(data: string): Promise<string> {
  return new Promise((resolve) => {
    remark()
      .use(toc)
      .process(data, function (error, file) {
        if (error) {
          core.error('#generateMd');
          core.error(error);
          return resolve('');
        }
        return resolve(String(file));
      });
  });
}

export const MARKDOWN_FILENAME: string =
  core.getInput('output-filename') || 'README.md';

type File = {
  filename: string;
  data: string;
};

export async function pushNewFiles(files: File[] = []): Promise<any> {
  if (!files.length) return;

  await git.pull();

  await Promise.all(
    files.map(async ({ filename, data }) => {
      await fsp.writeFile(filename, data);
      await git.add(filename);
    })
  );

  await git.commit(`chore(updates): updated entries in files`);
  await git.push();
}
