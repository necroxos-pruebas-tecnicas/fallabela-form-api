module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).+(ts)'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  transform: {
    '^.+.(js|ts)$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  coveragePathIgnorePatterns: ['node_modules'],
  collectCoverageFrom: [
    'src/**',
    '!src/main.ts',
    '!**/index.ts',
    '!**/__tests__/**',
    '!**/submodule/validators/**',
    '!**/*.constants.ts',
    '!**/dto/**',
    '!**/enums/**',
    '!**/interfaces/**',
  ],
};
