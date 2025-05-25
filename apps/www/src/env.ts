import { generateEnv } from "@kngsthvs/lib/env";
import { environmentSchema } from "@kngsthvs/lib/schemas";
import { z } from "zod";

export const env = generateEnv({
	client: {
		prefix: "NEXT_PUBLIC_",
		variables: {
			NEXT_PUBLIC_HCAPTCHA_SITEKEY: process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY,
			NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA:
				process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
		},
	},
	schema: {
		BASEHUB_TOKEN: z.string().min(1),
		EDGE_CONFIG: z.string().min(1),
		FLAGS_SECRET: z.string().min(1),
		HCAPTCHA_SECRET_KEY: z.string().min(1),
		NEXT_PUBLIC_HCAPTCHA_SITEKEY: z.string().min(1),
		NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA: z.string().min(1).optional(),
		NODE_ENV: environmentSchema,
		RESEND_API_KEY: z.string().min(1),
		UNKEY_ROOT_KEY: z.string().min(1),
		VERCEL_DEPLOYMENT_ID: z.string().min(1).optional(),
		VERCEL_ENV: z
			.enum(["development", "preview", "production"])
			.default("development"),
		VERCEL_GIT_COMMIT_SHA: z.string().min(1).optional(),
	},
	server: {
		variables: process.env,
	},
});
