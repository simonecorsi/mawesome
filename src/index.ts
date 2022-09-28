import path from 'path';
import * as core from '@actions/core';
import { readFile } from 'fs/promises';
import ghStarFetch, {
  Options,
  compactByLanguage,
  compactByTopic,
} from 'gh-star-fetch';

import {
  renderer,
  REPO_USERNAME,
  generateMd,
  MARKDOWN_FILENAME,
} from './helpers';
import git from './git';
import { fileURLToPath } from 'url';

export async function main() {
  // set default template
  let template = await readFile(
    path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      './TEMPLATE.ejs'
    ),
    'utf8'
  );

  // get template if found in the repo
  const customTemplatePath = core.getInput('template-path');
  core.info(`check if customTemplatePath: ${customTemplatePath} exists`);
  try {
    template = await readFile(customTemplatePath, 'utf8');
  } catch {
    core.info("Couldn't find template file, using default");
  }

  const opts: Partial<Options> = {
    accessToken: core.getInput('api-token', { required: true }),
  };

  const results = await ghStarFetch(opts);

  const files = [];

  const compactedByLanguage = compactByLanguage(results);
  const byLanguage = await renderer(
    {
      username: REPO_USERNAME,
      stars: Object.entries(compactedByLanguage),
      updatedAt: Date.now(),
    },
    template
  );

  files.push(
    {
      filename: MARKDOWN_FILENAME,
      data: await generateMd(byLanguage),
    },
    {
      filename: 'data.json',
      data: JSON.stringify(compactedByLanguage, null, 2),
    }
  );

  if (core.getInput('compact-by-topic') === 'true') {
    const compactedByTopic = compactByTopic(results);
    const byTopic = await renderer(
      {
        username: REPO_USERNAME,
        stars: Object.entries(compactedByTopic),
        updatedAt: Date.now(),
      },
      template
    );
    files.push({
      filename: 'TOPICS.md',
      data: await generateMd(byTopic),
    });
  }

  await git.pushNewFiles(files);
}

export async function run(): Promise<void> {
  try {
    await main();
  } catch (error) {
    core.setFailed(`#run: ${error}`);
  }
}

const catchAll = (info: any) => {
  core.setFailed(`#catchAll: ${info}`);
  core.error(info);
};
process.on('unhandledRejection', catchAll);
process.on('uncaughtException', catchAll);

run().catch(core.error);
