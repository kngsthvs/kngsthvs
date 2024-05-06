/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@kngsthvs/config/eslint/library.js"],
  ignorePatterns: ["@kngsthvs/**", "apps/**", "packages/**"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
