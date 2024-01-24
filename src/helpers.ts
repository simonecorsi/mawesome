import ejs from 'ejs';
import * as core from '@actions/core';
import { remark } from 'remark';
import toc from 'remark-toc';

export const REPO_USERNAME = process.env.GITHUB_REPOSITORY?.split('/')[0];
export const API_STARRED_URL = `${process.env.GITHUB_API_URL}/users/${REPO_USERNAME}/starred`;

export async function renderer(
  data: { [key: string]: unknown },
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
          resolve('');
        }
        resolve(String(file));
      });
  });
}

export const MARKDOWN_FILENAME: string = core.getInput('output-filename');
