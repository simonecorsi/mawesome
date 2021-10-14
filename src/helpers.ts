import fs from 'fs';
import ejs from 'ejs';
import * as core from '@actions/core';
import remark from 'remark';
import toc from 'remark-toc';

import MD_TEMPLATE from './template';
import GithubApi from './api';
import link from './link';
import git from './git';

import type { PaginationLink, ApiGetStarResponse, Stars } from './types';

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
  const matchLast = next.uri.match(/page=([0-9]*)/);

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
  let data: Stars[] = [];
  for await (const stars of paginateStars(url)) {
    data = data.concat(stars);
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
