import got from 'got';
import * as core from '@actions/core';

const GITHUB_TOKEN = core.getInput('api-token', { required: true });

export default got.extend({
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
  },
  responseType: 'json',
});
