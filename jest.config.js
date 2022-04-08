/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  // Stop running tests after `n` failures
  bail: true,
  // Automatically clear mock calls, instances and results before every test
  clearMocks: true,

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // The glob patterns Jest uses to detect test files
  testMatch: [
    "**/__tests__/**/*.test.js?(x)",
  ],
};