/** @see https://env.t3.gg/docs/nextjs */

import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: {},
  server: {
    POSTGRES_URL: z.string().min(1),
  },
  skipValidation: Boolean(process.env.SKIP_ENV_VALIDATION),
});
