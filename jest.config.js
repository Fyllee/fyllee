module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/{!(main),}.(t|j)s', '!**/*.module.ts', '!**/*.config.ts'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
