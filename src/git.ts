// original content by: https://github.com/TriPSs/conventional-changelog-action/blob/master/src/helpers/git.js

import * as core from '@actions/core';
import * as exec from '@actions/exec';
import fs from 'fs/promises';

const { GITHUB_REPOSITORY, GITHUB_REF } = process.env;

const branch = GITHUB_REF?.replace('refs/heads/', '');

type File = {
  filename: string;
  data: string;
};

class Git {
  constructor() {
    const githubToken = core.getInput('github-token', { required: true });
    core.setSecret(githubToken);

    const githubName = core.getInput('github-name') || 'GitHub Actions';
    const githubEmail =
      core.getInput('github-email') || 'actions@users.noreply.github.com';

    // Set config
    this.config('user.name', githubName);
    this.config('user.email', githubEmail);
    this.config('pull.rebase', 'false');

    // Update the origin
    this.updateOrigin(
      `https://x-access-token:${githubToken}@github.com/${GITHUB_REPOSITORY}.git`
    );
  }

  isShallow = async () => {
    const isShallow: string = await this.exec(
      'rev-parse --is-shallow-repository'
    );

    return isShallow.trim().replace('\n', '') === 'true';
  };

  async exec(command: string): Promise<string> {
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
      return execOutput;
    } else {
      core.error(`Command "git ${command}" exited with code ${exitCode}.`);
      throw new Error(`Command "git ${command}" exited with code ${exitCode}.`);
    }
  }

  config = (prop: string, value: string) =>
    this.exec(`config ${prop} "${value}"`);

  add = (file: string | string[]) => {
    let str = '';
    if (Array.isArray(file)) {
      file.map((f) => (str += ` ${f}`));
    } else {
      str = file;
    }
    return this.exec(`add ${str}`);
  };

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

  updateOrigin = (repo: string) => this.exec(`remote set-url origin ${repo}`);

  createTag = (tag: string) => this.exec(`tag -a ${tag} -m "${tag}"`);

  async pushNewFiles(files: File[] = []): Promise<any> {
    if (!files.length) return;

    await this.pull();

    await Promise.all(
      files.map(({ filename, data }) => fs.writeFile(filename, data))
    );

    await this.add(files.map(({ filename }) => filename));
    await this.commit(`chore(updates): updated entries in files`);
    await this.push();
  }
}

export default new Git();
