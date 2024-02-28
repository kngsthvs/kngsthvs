/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@kngsthvs/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  root: true,
};
