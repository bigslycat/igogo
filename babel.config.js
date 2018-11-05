/* @flow */

const env = modules => [
  '@babel/env',
  {
    targets: {
      browsers: [
        'last 4 version',
        '> 1%',
        'maintained node versions',
        'not dead',
      ],
    },
    useBuiltIns: 'usage',
    modules: !!modules && 'commonjs',
  },
];

module.exports = {
  presets: ['@babel/flow', env()],
  env: {
    test: {
      presets: ['@babel/flow', env(true)],
    },
  },
};
