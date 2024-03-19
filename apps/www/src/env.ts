/** @see https://env.t3.gg/docs/nextjs */

import { environment } from "@kngsthvs/lib/schemas";
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA: z.string().min(1).optional(),
  },
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: {
    NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA:
      process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
  },
  server: {
    NODE_ENV: environment,
    VERCEL_DEPLOYMENT_ID: z.string().min(1).optional(),
    VERCEL_ENV: z
      .enum(["development", "preview", "production"])
      .default("development"),
    VERCEL_GIT_COMMIT_SHA: z.string().min(1).optional(),
  },
  skipValidation: Boolean(process.env.SKIP_ENV_VALIDATION),
});
