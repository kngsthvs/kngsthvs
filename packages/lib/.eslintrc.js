module.exports = {
  extends: ["@kngsthvs/config/eslint/library.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.lint.json",
  },
};
