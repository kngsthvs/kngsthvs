import { type StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  stories: ["../**/story.@(ts|tsx)"],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
};

export default config;
