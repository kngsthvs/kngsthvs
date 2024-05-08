/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [require.resolve("@kngsthvs/config/eslint/library")],
  ignorePatterns: ["@kngsthvs/**", "apps/**", "packages/**"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
