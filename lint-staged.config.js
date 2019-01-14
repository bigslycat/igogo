module.exports = {
  'lint-staged': {
    '*.js': ['eslint --fix', 'flow', 'prettier --write', 'git add'],
    '*.{json,js}': ['prettier --write', 'git add'],
  },
};
