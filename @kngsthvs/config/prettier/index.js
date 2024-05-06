/**
 * Some of Prettier's defaults can be overridden by an EditorConfig file. We
 * define those here to ensure that doesn't happen.
 *
 * @see https://github.com/prettier/prettier/blob/main/docs/configuration.md#editorconfig
 * @see https://github.com/vercel/style-guide/blob/canary/prettier/index.js
 */
const overridableDefaults = {
  endOfLine: "lf",
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
};

module.exports = {
  ...overridableDefaults,
  order: "alphabetical",
  pluginSearchDirs: false,
  plugins: [
    "prettier-plugin-css-order",
    "prettier-plugin-organize-imports",
    "prettier-plugin-svelte",
    /**
     * @see https://github.com/tailwindlabs/prettier-plugin-tailwindcss?tab=readme-ov-file#compatibility-with-other-prettier-plugins
     */
    "prettier-plugin-tailwindcss", // MUST come last
  ],
  tailwindAttributes: ["tw"],
  tailwindFunctions: ["cva"],
};
