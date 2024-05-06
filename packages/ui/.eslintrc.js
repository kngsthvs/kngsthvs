/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@kngsthvs/config/eslint/react-internal.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.lint.json",
  },
};
