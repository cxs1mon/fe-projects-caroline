module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest"
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(@testing-library|animate.css)/)"
  ],
  setupFilesAfterEnv: [
    "<rootDir>/src/setupTests.tsx"
  ]
};
