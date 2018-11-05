/* @flow */

const env = (modules, { esm = false } = {}) => [
  '@babel/env',
  {
    targets: esm
      ? { node: 10 }
      : {
          browsers: [
            'last 4 version',
            '> 1%',
            'maintained node versions',
            'not dead',
          ],
        },
    useBuiltIns: esm ? false : 'usage',
    modules: !!modules && 'commonjs',
  },
];

module.exports = {
  presets: ['@babel/flow', env()],
  env: {
    test: {
      presets: ['@babel/flow', env(true)],
    },
    esm: {
      presets: ['@babel/flow', env(false, { esm: true })],
    },
  },
};
