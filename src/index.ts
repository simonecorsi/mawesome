import dotnenv from 'dotenv';
import fs from 'fs';

import ejs from 'ejs';
import remark from 'remark';
import toc from 'remark-toc';
import GithubApi from './api';
import link from './link';
import git from './git';
import core from '@actions/core';

const fsp = fs.promises;

import type {
  SortedLanguageList,
  PaginationLink,
  Stars,
  Star,
  ApiGetStarResponse,
} from './types';

const REPO_USERNAME = process.env.GITHUB_REPOSITORY?.split('/')[0];
const OUTPUT_FILENAME: string = core.getInput('output-filename') || 'README.md';
const IS_PROD = process.env.NODE_ENV === 'production';

const USERNAME = process.env.GITHUB_ACTOR || 'simonecorsi';
const API_STARRED_URL = `'https://api.github.com/users/${REPO_USERNAME}/starred'`;

const renderer = async (data: any) => {
  try {
    const MD_TEMPLATE = await fsp.readFile('fixtures/template.md.ejs', 'utf-8');
    return ejs.render(MD_TEMPLATE, data);
  } catch (error) {
    core.error(error);
    return '';
  }
};

if (!IS_PROD) {
  dotnenv.config();
}

const wait = (time = 200) =>
  new Promise((resolve) => setTimeout(resolve, time));

async function apiGetStar(url: string): Promise<ApiGetStarResponse> {
  const { headers, body }: any = await (async () => {
    if (!IS_PROD)
      return JSON.parse(
        await fsp.readFile('fixtures/stars-response.json', 'utf-8')
      );
    return GithubApi.get(url);
  })();
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

function isLastPage(links: PaginationLink): boolean {
  return links.next === links.last;
}

export function generateMd(data: string): Promise<string> {
  return new Promise((resolve) => {
    remark()
      .use(toc)
      .process(data, function (error, file) {
        if (error) {
          core.error(error);
          return resolve('');
        }
        return resolve(String(file));
      });
  });
}

export async function main(): Promise<any> {
  let links: PaginationLink = {
    next: API_STARRED_URL,
    last: undefined,
  };
  let results: Stars = [];
  do {
    const r = await apiGetStar(links.next);
    links = r.links;
    results = results.concat(r.data);
    if (!IS_PROD) break;
    await wait();
  } while (!isLastPage(links));

  const sortedByLanguages = results.reduce(
    (acc: SortedLanguageList, val: Star) => {
      const language = val.language || 'generic';
      if (!acc[language]) {
        acc[language] = [val];
      } else {
        acc[language].push(val);
      }
      return acc;
    },
    {}
  );

  const rendered = await renderer({
    username: USERNAME,
    stars: Object.entries(sortedByLanguages),
    updatedAt: Date.now(),
  });

  const markdown: string = await generateMd(rendered);

  await fsp.writeFile(OUTPUT_FILENAME, markdown);

  await git.add(OUTPUT_FILENAME);

  await git.commit(`chore(${OUTPUT_FILENAME}): updated ${OUTPUT_FILENAME}`);

  await git.push();
}

export async function run(): Promise<any> {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    process.stderr.write(error);
    process.exit(1);
  }
}

const catchAll = (info: any) => {
  core.error(info);
  process.exit(1);
};
process.on('unhandledRejection', catchAll);
process.on('uncaughtException', catchAll);

run();
