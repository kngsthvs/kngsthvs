import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
	],
	framework: {
		name: "@storybook/nextjs",
		options: {},
	},
	stories: ["../**/story.@(ts|tsx)"],
};

export default config;
