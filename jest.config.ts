const config = {
  moduleNameMapper: {
    "\\.module\\.css$": "<rootDir>/src/utils/testing/mocks/style-mock.ts",
    "^#components(.*)$": "<rootDir>/src/components$1",
    "^#sampleData(.*)$": "<rootDir>/src/sampleData$1",
    "^#store(.*)$": "<rootDir>/src/store$1",
    "^#types(.*)$": "<rootDir>/src/types$1",
    "^#utils(.*)$": "<rootDir>/src/utils$1",
  },
  modulePathIgnorePatterns: ["<rootDir>/dist"],
  setupFilesAfterEnv: ["./jest.setup.ts"],
  testEnvironment: "jsdom",
}

export default config
