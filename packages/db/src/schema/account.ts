import { relations, sql } from "drizzle-orm";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  email: text("email").unique(),
  emailVerified: boolean("email_verified").default(false),
  firstName: text("first_name"),
  image: text("image"),
  lastName: text("last_name"),
});

export const usersRelations = relations(users, ({ many }) => ({
  organization: many(organizations),
}));

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  browser: text("browser"),
  device: text("device"),
  expiresAt: timestamp("expires_at", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
  ipAddress: text("ip_address"),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
});

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

/**
 * @see https://lucia-auth.com/guides/email-and-password/email-verification-codes#email-verification-code-table
 */
export const verificationCodes = pgTable("verification_codes", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  code: text("code").notNull(),
  deviceId: text("device_id").notNull(),
  email: text("email").notNull().unique(),
  expiresAt: timestamp("expires_at", { mode: "date" }).notNull(),
  userId: text("user_id").notNull(),
});

export const accounts = pgTable("accounts", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
});

export const organizations = pgTable("organizations", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  domain: text("domain").notNull().unique(),
  image: text("image"),
  name: text("name"),
});

export const organizationsRelations = relations(organizations, ({ many }) => ({
  users: many(users),
}));
