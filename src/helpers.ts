import fs from 'fs';
import ejs from 'ejs';
import * as core from '@actions/core';
import { remark } from 'remark';
import toc from 'remark-toc';
import git from './git';

export const REPO_USERNAME = process.env.GITHUB_REPOSITORY?.split('/')[0];
export const API_STARRED_URL = `${process.env.GITHUB_API_URL}/users/${REPO_USERNAME}/starred`;

const fsp = fs.promises;

export async function renderer(
  data: { [key: string]: any },
  templateString: string
): Promise<string> {
  try {
    return ejs.render(templateString, data);
  } catch (error) {
    core.setFailed(`#renderer: ${error}`);
    return '';
  }
}

export function generateMd(data: string): Promise<string> {
  return new Promise((resolve) => {
    remark()
      .use(toc)
      .process(data, function (error, file) {
        if (error) {
          core.error('#generateMd');
          core.error(error);
          return resolve('');
        }
        return resolve(String(file));
      });
  });
}

export const MARKDOWN_FILENAME: string = core.getInput('output-filename');

type File = {
  filename: string;
  data: string;
};

export async function pushNewFiles(files: File[] = []): Promise<any> {
  if (!files.length) return;

  await git.pull();

  await Promise.all(
    files.map(({ filename, data }) => fsp.writeFile(filename, data))
  );

  await git.add(files.map(({ filename }) => filename));
  await git.commit(`chore(updates): updated entries in files`);
  await git.push();
}
