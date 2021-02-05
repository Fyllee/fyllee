module.exports = {
  extends: 'noftalint',
  ignorePatterns: ['node_modules/', 'dist/'],
  reportUnusedDisableDirectives: true,
  env: {
    node: true,
  },
  rules: {
    'unicorn/no-array-for-each': 'off',
  },
  overrides: [{
    files: ['./src/controllers/**/*.js'],
    rules: {
      'import/prefer-default-export': 'off',
    },
  }],
};
