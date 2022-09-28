import R from 'path';
import * as i from '@actions/core';
import { readFile as x } from 'fs/promises';
import F, { compactByLanguage as _, compactByTopic as M } from 'gh-star-fetch';
import E from 'ejs';
import * as n from '@actions/core';
import { remark as I } from 'remark';
import O from 'remark-toc';
var h,
  u = (h = process.env.GITHUB_REPOSITORY) == null ? void 0 : h.split('/')[0],
  U = `${process.env.GITHUB_API_URL}/users/${u}/starred`;
async function p(r, e) {
  try {
    return E.render(e, r);
  } catch (t) {
    return n.setFailed(`#renderer: ${t}`), '';
  }
}
function m(r) {
  return new Promise((e) => {
    I()
      .use(O)
      .process(r, function (t, o) {
        return t ? (n.error('#generateMd'), n.error(t), e('')) : e(String(o));
      });
  });
}
var d = n.getInput('output-filename');
import * as s from '@actions/core';
import * as f from '@actions/exec';
import T from 'fs/promises';
var { GITHUB_REPOSITORY: b, GITHUB_REF: l } = process.env,
  S = l == null ? void 0 : l.replace('refs/heads/', ''),
  g = class {
    constructor() {
      let e = s.getInput('api-token', { required: !0 });
      s.setSecret(e);
      let t = s.getInput('github-name') || 'GitHub Actions',
        o = s.getInput('github-email') || 'actions@users.noreply.github.com';
      this.config('user.name', t),
        this.config('user.email', o),
        this.config('pull.rebase', 'false'),
        this.updateOrigin(`https://x-access-token:${e}@github.com/${b}.git`);
    }
    isShallow = async () =>
      (await this.exec('rev-parse --is-shallow-repository')).trim().replace(
        `
`,
        ''
      ) === 'true';
    async exec(e) {
      let t = '',
        o = {
          listeners: {
            stdout: (c) => {
              t += c.toString();
            },
          },
        },
        a = await f.exec(`git ${e}`, void 0, o);
      if (a === 0) return t;
      throw (
        (s.error(`Command "git ${e}" exited with code ${a}.`),
        new Error(`Command "git ${e}" exited with code ${a}.`))
      );
    }
    config = (e, t) => this.exec(`config ${e} "${t}"`);
    add = (e) => {
      let t = '';
      return (
        Array.isArray(e) ? e.map((o) => (t += ` ${o}`)) : (t = e),
        this.exec(`add ${t}`)
      );
    };
    commit = (e) => this.exec(`commit -m "${e}"`);
    pull = async () => {
      let e = ['pull'];
      return (
        (await this.isShallow()) && e.push('--unshallow'),
        e.push('--tags'),
        e.push(s.getInput('git-pull-method')),
        this.exec(e.join(' '))
      );
    };
    push = () => this.exec(`push origin ${S} --follow-tags`);
    updateOrigin = (e) => this.exec(`remote set-url origin ${e}`);
    createTag = (e) => this.exec(`tag -a ${e} -m "${e}"`);
    async pushNewFiles(e = []) {
      !e.length ||
        (await this.pull(),
        await Promise.all(
          e.map(({ filename: t, data: o }) => T.writeFile(t, o))
        ),
        await this.add(e.map(({ filename: t }) => t)),
        await this.commit('chore(updates): updated entries in files'),
        await this.push());
    }
  },
  w = new g();
async function N() {
  let r = await x(R.resolve(__dirname, './TEMPLATE.ejs'), 'utf8'),
    e = i.getInput('template-path');
  i.info(`check if customTemplatePath: ${e} exists`);
  try {
    r = await x(e, 'utf8');
  } catch {
    i.info("Couldn't find template file, using default");
  }
  let t = { accessToken: i.getInput('api-token', { required: !0 }) },
    o = await F(t),
    a = [],
    c = _(o),
    $ = await p(
      { username: u, stars: Object.entries(c), updatedAt: Date.now() },
      r
    );
  if (
    (a.push(
      { filename: d, data: await m($) },
      { filename: 'data.json', data: JSON.stringify(c, null, 2) }
    ),
    i.getInput('compact-by-topic') === 'true')
  ) {
    let P = M(o),
      A = await p(
        { username: u, stars: Object.entries(P), updatedAt: Date.now() },
        r
      );
    a.push({ filename: 'TOPICS.md', data: await m(A) });
  }
  await w.pushNewFiles(a);
}
async function k() {
  try {
    await N();
  } catch (r) {
    i.setFailed(`#run: ${r}`);
  }
}
var y = (r) => {
  i.setFailed(`#catchAll: ${r}`), i.error(r);
};
process.on('unhandledRejection', y);
process.on('uncaughtException', y);
k().catch(i.error);
export { N as main, k as run };
