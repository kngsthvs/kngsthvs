/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@kngsthvs/eslint-config/library.js"],
  ignorePatterns: ["@kngsthvs/**", "apps/**", "packages/**"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
