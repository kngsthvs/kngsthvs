module.exports = {
  extends: [require.resolve("@kngsthvs/config/eslint/library")],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.lint.json",
  },
};
