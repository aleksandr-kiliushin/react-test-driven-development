const config = {
  moduleNameMapper: {
    "^#types(.*)$": "<rootDir>/src/types$1",
    "^#utils(.*)$": "<rootDir>/src/utils$1",
  },
  modulePathIgnorePatterns: ["<rootDir>/dist"],
  testEnvironment: "jsdom",
}

export default config
