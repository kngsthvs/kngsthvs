/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    require.resolve("@kngsthvs/config/eslint/library"),
    "plugin:storybook/recommended",
  ],
};
