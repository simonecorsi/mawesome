// original content by: github.com/TriPSs/conventional-changelog-action/blob/master/src/helpers/git.js

import * as core from '@actions/core';
import * as exec from '@actions/exec';

const { GITHUB_REPOSITORY, GITHUB_REF } = process.env;

const IS_TEST = process.env.NODE_ENV === 'test';

const branch = GITHUB_REF?.replace('refs/heads/', '');

export default new (class Git {
  commandsRun: string[] = [];

  constructor() {
    const githubToken = core.getInput('github-token', { required: true });
    core.setSecret(githubToken);

    const gitUserName = core.getInput('git-user-name');
    const gitUserEmail = core.getInput('git-user-email');

    // Set config
    this.config('user.name', gitUserName);
    this.config('user.email', gitUserEmail);

    // Update the origin
    this.updateOrigin(
      `https://x-access-token:${githubToken}@github.com/${GITHUB_REPOSITORY}.git`
    );
  }

  exec = (command: string): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      if (IS_TEST) {
        const fullCommand = `git ${command}`;

        console.log(`Skipping "${fullCommand}" because of test env`);

        if (!fullCommand.includes('git remote set-url origin')) {
          this.commandsRun.push(fullCommand);
        }
        return resolve('done');
      }
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
    if (IS_TEST) return false;

    const isShallow: string = await this.exec(
      'rev-parse --is-shallow-repository'
    );

    return isShallow.trim().replace('\n', '') === 'true';
  };

  updateOrigin = (repo: string) => this.exec(`remote set-url origin ${repo}`);

  createTag = (tag: string) => this.exec(`tag -a ${tag} -m "${tag}"`);
})();
