/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [require.resolve("@kngsthvs/config/eslint/next")],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
