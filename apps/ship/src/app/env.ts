/** @see https://env.t3.gg/docs/nextjs */

import { environment } from "@kngsthvs/lib/schemas";
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: {
    NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA:
      process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
  },
  server: {
    EDGE_CONFIG_FEATURE_FLAGS: z.string().min(1),
    FLAGS_SECRET: z.string().min(1),
    KV_REST_API_READ_ONLY_TOKEN: z.string().min(1),
    KV_REST_API_TOKEN: z.string().min(1),
    KV_REST_API_URL: z.string().min(1),
    KV_URL: z.string().min(1),
    NODE_ENV: environment,
    RESEND_API_KEY: z.string().min(1),
  },
  skipValidation: Boolean(process.env.SKIP_ENV_VALIDATION),
});
