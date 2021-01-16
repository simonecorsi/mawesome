import got from 'got';
import core from '@actions/core';

const GITHUB_TOKEN = core.getInput('github-token', { required: true });

export default got.extend({
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
  },
  responseType: 'json',
});
