/** @see https://env.t3.gg/docs/nextjs */

import { environment } from "@kngsthvs/lib/schemas";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  emptyStringAsUndefined: true,
  server: {
    NODE_ENV: environment,
  },
  skipValidation: Boolean(process.env.SKIP_ENV_VALIDATION),
});
