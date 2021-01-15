module.exports = {
  hooks: {
    'prepare-commit-msg': 'exec < /dev/tty && git cz --hook || true',
    'pre-commit': 'npm run build && lint-staged',
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
  },
};
