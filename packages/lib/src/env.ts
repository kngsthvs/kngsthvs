import { generateEnv } from "@kngsthvs/lib/env";
import { environmentSchema } from "@kngsthvs/lib/schemas";

export const env = generateEnv({
  schema: {
    NODE_ENV: environmentSchema,
  },
  server: {
    variables: process.env,
  },
});
