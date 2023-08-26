/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@kngsthvs"],
  root: true,
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
