import { type Config } from "drizzle-kit";
import { env } from "./src/env";

export default {
  dbCredentials: {
    connectionString: `${env.POSTGRES_URL}?sslmode=require`,
  },
  driver: "pg",
  schema: "./src/db/schema/*",
  tablesFilter: ["*", "crowsnest_*"],
} satisfies Config;
