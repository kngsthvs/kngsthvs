/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    require.resolve("@kngsthvs/config/eslint/react-internal"),
    "plugin:storybook/recommended",
  ],
};
