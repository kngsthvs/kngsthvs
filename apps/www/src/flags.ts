import { edgeConfigAdapter } from "@flags-sdk/edge-config";
import { flag } from "flags/next";

const adapter = edgeConfigAdapter();

export const maintenance = flag({
	adapter,
	decide: () => false,
	defaultValue: false,
	description: "Maintenance mode",
	key: "maintenance",
});
