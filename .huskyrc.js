module.exports = {
  hooks: {
    'prepare-commit-msg': 'exec < /dev/tty && git cz --hook || true',
    'pre-commit': 'lint-staged',
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
  },
};
