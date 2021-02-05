module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: 'noftalint/typescript',
  ignorePatterns: ['node_modules/', 'dist/'],
  reportUnusedDisableDirectives: true,
  env: {
    node: true,
  },
  rules: {
    'import/extensions': ['error', 'never', { ts: 'never' }],

    // It cannot resolve TypeScript's path aliases. See https://github.com/mysticatea/eslint-plugin-node/issues/233
    'node/no-missing-import': 'off',

    '@typescript-eslint/no-misused-promises': 'off',
    'unicorn/no-array-for-each': 'off',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
  overrides: [{
    files: ['./src/controllers/**/*.ts'],
    rules: {
      'import/prefer-default-export': 'off',
    },
  }],
};
