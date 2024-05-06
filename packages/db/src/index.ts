import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";

export * from "drizzle-orm";
const client = new PGlite();
export const db = drizzle(client);
