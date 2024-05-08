const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "prettier",
    require.resolve("@vercel/style-guide/eslint/browser"),
    require.resolve("@vercel/style-guide/eslint/node"),
    require.resolve("@vercel/style-guide/eslint/typescript"),
    require.resolve("@vercel/style-guide/eslint/react"),
    require.resolve("@vercel/style-guide/eslint/next"),
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
  ],
  overrides: [{ files: ["*.js?(x)", "*.ts?(x)"] }],
  parserOptions: {
    project,
  },
  plugins: ["only-warn"],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "import/no-default-export": "off",
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
