import * as core from '@actions/core';

import {
  renderer,
  paginate,
  REPO_USERNAME,
  generateMd,
  pushNewFile,
} from './helpers';

import type { SortedLanguageList, Stars, Star } from './types';

export async function main(): Promise<any> {
  let results: Stars = [];

  while (true) {
    // sorry.
    const r = await paginate();
    if (!r || r === null) break;
    results = results.concat(r.data);
  }

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
    username: REPO_USERNAME,
    stars: Object.entries(sortedByLanguages),
    updatedAt: Date.now(),
  });

  const markdown: string = await generateMd(rendered);

  await pushNewFile(markdown);
}

export async function run(): Promise<any> {
  try {
    await main();
  } catch (error) {
    core.setFailed(`#run: ${error}`);
  }
}

const catchAll = (info: any) => {
  core.setFailed(`#catchAll: ${info}`);
};
process.on('unhandledRejection', catchAll);
process.on('uncaughtException', catchAll);

run();
