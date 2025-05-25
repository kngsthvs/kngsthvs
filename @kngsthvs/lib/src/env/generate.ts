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
      keys.client.reduce<Record<string, z.ZodTypeAny>>(
        (accumulator, currentValue) => {
          const schemaValue = schema[currentValue];

          if (schemaValue) {
            accumulator[currentValue] = schemaValue;
          }

          return accumulator;
        },
        {},
      ),
    ),
    server: z.object(
      keys.client.reduce<Record<string, z.ZodTypeAny>>(
        (accumulator, currentValue) => {
          const schemaValue = schema[currentValue];

          if (schemaValue) {
            accumulator[currentValue] = schemaValue;
          }

          return accumulator;
        },
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
