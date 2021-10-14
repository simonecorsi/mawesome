import test from 'ava';
import * as sinon from 'sinon';
import fs from 'fs';

import * as core from '@actions/core';
sinon.replace(core, 'getInput', sinon.fake());

import GithubApi from '../src/api';
const GithubApiFake = sinon.fake((rul) => ({
  body: [],
  headers: {
    link:
      '<https://api.github.com/user/5617452/starred?page=2>; rel="next", <https://api.github.com/user/5617452/starred?page=2>; rel="last"',
  },
}));
sinon.replace(GithubApi, 'get', GithubApiFake);

import Git from '../src/git';
const pull = sinon.fake();
sinon.replace(Git, 'pull', pull);
const add = sinon.fake();
sinon.replace(Git, 'add', add);
const commit = sinon.fake();
sinon.replace(Git, 'commit', commit);
const push = sinon.fake();
sinon.replace(Git, 'push', push);
sinon.replace(Git, 'config', sinon.fake());
sinon.replace(Git, 'updateOrigin', sinon.fake());

const fsp = fs.promises;
const writeFile = sinon.fake();
sinon.replace(fsp, 'writeFile', writeFile);

import {
  wait,
  renderer,
  apiGetStar,
  generateMd,
  pushNewFiles,
} from '../src/helpers';

test('wait should wait', async (t) => {
  await wait(200);
  t.pass();
});

test('renderer should render', async (t) => {
  const output = await renderer({ variable: 123 }, 'Test: <%= variable %>');
  t.is(output, 'Test: 123');
});

test('apiGetStar', async (t) => {
  let stars = await apiGetStar('url');
  t.true(GithubApiFake.called);
  t.true(Array.isArray(stars));
});

test('generateMd should create TOC', async (t) => {
  const tpl = `# title

## Table of Contents

## Javascript
`;
  const result = await generateMd(tpl);
  t.is(
    result,
    `# title\n\n## Table of Contents\n\n*   [Javascript](#javascript)\n\n## Javascript\n`
  );
});

test('should push', async (t) => {
  await pushNewFiles([{ filename: 'README.md', data: '# title' }]);
  t.true(writeFile.called);
  t.true(pull.called);
  t.true(add.called);
  t.true(commit.called);
  t.true(push.called);
});
