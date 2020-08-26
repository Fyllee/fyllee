module.exports = {
  extends: 'noftalint',
  ignorePatterns: ['.eslintrc.js', 'node_modules/'],
  reportUnusedDisableDirectives: true,
  env: {
    node: true,
  },
  rules: {
    "guard-for-in": false
  },
};
