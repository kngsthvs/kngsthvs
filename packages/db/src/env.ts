import { generateEnv } from "@kngsthvs/lib/env";
import { z } from "zod";

export const env = generateEnv({
	schema: {
		POSTGRES_URL: z.string().min(1),
	},
	server: {
		variables: process.env,
	},
});
