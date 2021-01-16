// original content by: https://github.com/TriPSs/conventional-changelog-action/blob/master/src/helpers/git.js

import * as core from '@actions/core';
import * as exec from '@actions/exec';

const { GITHUB_REPOSITORY, GITHUB_REF } = process.env;

const branch = GITHUB_REF?.replace('refs/heads/', '');

export default new (class Git {
  constructor() {
    const githubToken = core.getInput('github-token', { required: true });
    core.setSecret(githubToken);

    // Set config
    this.config('user.name', 'GitHub Actions');
    this.config('user.email', 'actions@users.noreply.github.com');

    // Update the origin
    this.updateOrigin(
      `https://x-access-token:${githubToken}@github.com/${GITHUB_REPOSITORY}.git`
    );
  }

  exec = (command: string): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      let execOutput = '';

      const options = {
        listeners: {
          stdout: (data: Buffer) => {
            execOutput += data.toString();
          },
        },
      };

      const exitCode = await exec.exec(`git ${command}`, undefined, options);

      if (exitCode === 0) {
        return resolve(execOutput);
      } else {
        core.error(`Command "git ${command}" exited with code ${exitCode}.`);
        return reject(`Command "git ${command}" exited with code ${exitCode}.`);
      }
    });
  };

  config = (prop: string, value: string) =>
    this.exec(`config ${prop} "${value}"`);

  add = (file: string) => this.exec(`add ${file}`);

  commit = (message: string) => this.exec(`commit -m "${message}"`);

  pull = async () => {
    const args = ['pull'];

    // Check if the repo is unshallow
    if (await this.isShallow()) {
      args.push('--unshallow');
    }

    args.push('--tags');
    args.push(core.getInput('git-pull-method'));

    return this.exec(args.join(' '));
  };

  push = () => this.exec(`push origin ${branch} --follow-tags`);

  isShallow = async () => {
    const isShallow: string = await this.exec(
      'rev-parse --is-shallow-repository'
    );

    return isShallow.trim().replace('\n', '') === 'true';
  };

  updateOrigin = (repo: string) => this.exec(`remote set-url origin ${repo}`);

  createTag = (tag: string) => this.exec(`tag -a ${tag} -m "${tag}"`);
})();
