/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [require.resolve("@kngsthvs/config/eslint/react-internal")],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.lint.json",
  },
};
