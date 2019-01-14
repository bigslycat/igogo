module.exports = {
  plugins: [
    ['@semantic-release/npm', { tarballDir: 'dist' }],
    ['@semantic-release/github', { assets: 'dist/*.tgz' }],
  ],
};
