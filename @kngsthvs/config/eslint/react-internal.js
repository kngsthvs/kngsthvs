const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: {
    browser: true,
  },
  extends: [
    "eslint:recommended",
    "prettier",
    require.resolve("@vercel/style-guide/eslint/browser"),
    require.resolve("@vercel/style-guide/eslint/typescript"),
    require.resolve("@vercel/style-guide/eslint/react"),
    "eslint-config-turbo",
  ],
  globals: {
    JSX: true,
    React: true,
  },
  ignorePatterns: [
    // Ignore dotfiles
    ".*.js",
    "node_modules/",
    "dist/",
  ],
  overrides: [
    // Force ESLint to detect .tsx files
    { files: ["*.js?(x)", "*.ts?(x)"] },
  ],
  parserOptions: {
    project,
  },
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "import/order": "off",
    "no-nested-ternary": "off",
    "react/no-unknown-property": [
      "error",
      {
        ignore: ["as", "data-", "tw", "vaul-drawer-wrapper"],
      },
    ],
    "sort-keys": ["warn", "asc", { natural: true }],
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
};
