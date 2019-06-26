module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/**/*.spec.ts'],
  collectCoverageFrom: ['<rootDir>/lib/**', 'index.ts'],
  coverageReporters: ['lcov', 'text', 'html'],
};
