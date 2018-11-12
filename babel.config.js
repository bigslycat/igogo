const env = ({ modules = false, esm = false } = {}) => [
  '@babel/env',
  {
    targets: esm
      ? { node: 10 }
      : {
          node: 6,
          browsers: ['last 4 version', '> 1%', 'not dead'],
        },
    useBuiltIns: 'usage',
    modules: modules && 'commonjs',
  },
];

module.exports = {
  presets: ['@babel/flow', env()],
  env: {
    test: {
      plugins: ['istanbul'],
      presets: [env({ modules: true }), ['module:ava/stage-4', false]],
    },
    esm: {
      presets: [env({ esm: true })],
    },
  },
};
