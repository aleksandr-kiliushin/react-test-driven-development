const config = {
  moduleNameMapper: {
    "\\.module\\.css$": "<rootDir>/src/utils/testing/mocks/style-mock.ts",
    "^#components(.*)$": "<rootDir>/src/components$1",
    "^#mocks(.*)$": "<rootDir>/src/mocks$1",
    "^#utils(.*)$": "<rootDir>/src/utils$1",
  },
  modulePathIgnorePatterns: ["<rootDir>/dist"],
  testEnvironment: "jsdom",
}

export default config
