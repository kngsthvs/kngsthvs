import { type TypeOf, type ZodObject, type ZodType, z } from "zod";

// FIX: Doesn't work with server-only
export function generateEnv({
  client,
  schema,
  server,
}: {
  client?: {
    prefix?: string;
    variables?: Record<string, string | undefined>;
  };
  schema: {
    [key: string]: z.ZodTypeAny;
  };
  server?: {
    variables?: Record<string, string | undefined>;
  };
}): Readonly<{
  [key in keyof TypeOf<ZodObject<Record<string, ZodType>>>]: TypeOf<
    ZodObject<Record<string, ZodType>>
  >[key];
}> {
  const keys = {
    client: Object.keys(schema).filter((key) =>
      client?.prefix ? key.includes(client?.prefix) : false,
    ),
    server: Object.keys(schema).filter((key) =>
      client?.prefix ? !key.includes(client?.prefix) : true,
    ),
  };
  const schemas = {
    client: z.object(
      keys.client.reduce(
        (accumalator, currentValue) => ({
          ...accumalator,
          [currentValue]: schema[currentValue],
        }),
        {},
      ),
    ),
    server: z.object(
      keys.server.reduce(
        (accumalator, currentValue) => ({
          ...accumalator,
          [currentValue]: schema[currentValue],
        }),
        {},
      ),
    ),
  };
  const variables = {
    ...server?.variables,
    ...client?.variables,
  };

  for (const [key, value] of Object.entries(variables)) {
    if (value === "") {
      delete variables[key];
    }
  }

  const parsed =
    typeof window === "undefined"
      ? schemas.server.merge(schemas.client).safeParse(variables)
      : schemas.client.safeParse(variables);

  if (!parsed.success) {
    console.error(parsed.error.issues);

    throw new Error(
      "An error occurred while parsing the environment variables",
    );
  }

  return new Proxy(parsed.data, {
    get(target, prop) {
      if (typeof prop !== "string" || prop === "$$typeof") {
        return undefined;
      }
      if (
        !(typeof window === "undefined") &&
        !(client?.prefix && prop.startsWith(client.prefix))
      ) {
        console.error(prop);

        throw new Error(
          "Server-side environment variables are not available on the client",
        );
      }

      return Reflect.get(target, prop);
    },
  });
}

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
    BLOB_READ_WRITE_TOKEN: z.string().min(1),
    EDGE_CONFIG: z.string().min(1),
    FLAGS_SECRET: z.string().min(1),
    HCAPTCHA_SECRET_KEY: z.string().min(1),
    NEXT_PUBLIC_HCAPTCHA_SITEKEY: z.string().min(1),
    NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA: z.string().min(1).optional(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    PAYLOAD_SECRET: z.string().min(1),
    POSTGRES_URL: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    RESEND_DEFAULT_ADDRESS: z.string().email().min(1),
    RESEND_DEFAULT_NAME: z.string().min(1),
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
