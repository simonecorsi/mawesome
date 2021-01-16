import test from 'ava';
import * as sinon from 'sinon';
import fs from 'fs';

import * as core from '@actions/core';
sinon.replace(core, 'getInput', sinon.fake());

import GithubApi from '../src/api';
const GithubApiFake = sinon.fake((rul) => ({
  body: 'data',
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
  isLastPage,
  wait,
  renderer,
  apiGetStar,
  paginate,
  generateMd,
  pushNewFile,
} from '../src/helpers';

test('wait should wait', async (t) => {
  await wait(200);
  t.pass();
});

test('isLastPage', (t) => {
  t.true(
    isLastPage({
      next: 'last',
      last: 'last',
    })
  );
  t.false(
    isLastPage({
      next: 'last',
      last: undefined,
    })
  );
});

test('renderer should render', async (t) => {
  const output = await renderer({ variable: 123 }, 'Test: <%= variable %>');
  t.is(output, 'Test: 123');
});

test('apiGetStar', async (t) => {
  let { data, links } = await apiGetStar('url');
  t.true(GithubApiFake.called);
  t.is(data, 'data');
  t.deepEqual(links, {
    last: 'https://api.github.com/user/5617452/starred?page=2',
    next: 'https://api.github.com/user/5617452/starred?page=2',
  });
});

test('paginate', async (t) => {
  await paginate();
  const res = await paginate();
  t.is(res, null);
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
  await pushNewFile('# title');
  t.true(writeFile.calledWith('README.md', '# title'));
  t.true(pull.called);
  t.true(add.calledWith('README.md'));
  t.true(commit.calledWith('chore(README.md): updated README.md'));
  t.true(push.called);
});
