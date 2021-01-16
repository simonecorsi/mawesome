import ejs from 'ejs';
import * as core from '@actions/core';
import remark from 'remark';
import toc from 'remark-toc';

import MD_TEMPLATE from './template';
import GithubApi from './api';
import link from './link';
import git from './git';

import type { PaginationLink, ApiGetStarResponse } from './types';

import fs from 'fs';

const fsp = fs.promises;

export function wait(time = 200): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export function isLastPage(links: PaginationLink): boolean {
  return links.next === links.last;
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

export async function apiGetStar(url: string): Promise<ApiGetStarResponse> {
  const { headers, body }: any = await GithubApi.get(url);
  return {
    data: body,
    links: link.parse(headers.link).refs.reduce(
      (acc, val) => ({
        ...acc,
        [val.rel]: val.uri,
      }),
      {}
    ),
  };
}

export const REPO_USERNAME = process.env.GITHUB_REPOSITORY?.split('/')[0];
export const API_STARRED_URL = `${process.env.GITHUB_API_URL}/users/${REPO_USERNAME}/starred`;

let links: PaginationLink = {
  next: API_STARRED_URL,
  last: undefined,
};
export async function paginate(): Promise<ApiGetStarResponse | null> {
  if (isLastPage(links)) return null;
  const r = await apiGetStar(links.next);
  links = r.links;
  return r;
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

export const OUTPUT_FILENAME: string =
  core.getInput('output-filename') || 'README.md';
export async function pushNewFile(markdown: string): Promise<any> {
  await fsp.writeFile(OUTPUT_FILENAME, markdown);
  await git.pull();
  await git.add(OUTPUT_FILENAME);
  await git.commit(`chore(${OUTPUT_FILENAME}): updated ${OUTPUT_FILENAME}`);
  await git.push();
}
