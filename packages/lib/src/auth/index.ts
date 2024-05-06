/**
 * @see https://lucia-auth.com/getting-started/nextjs-app
 */
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "db";
import { sessions, users } from "db/schema/account";
import { Lucia, type Session, type User } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";
import { env } from "../env";

/**
 * @see https://lucia-auth.com/database/drizzle#postgresql
 */
const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

export const lucia = new Lucia(adapter, {
  getSessionAttributes: (attributes) => {
    return {
      browser: attributes.browser,
      country: attributes.country,
      device: attributes.device,
    };
  },
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email,
      emailVerified: attributes.emailVerified,
      firstName: attributes.firstName,
      lastName: attributes.lastName,
    };
  },
  sessionCookie: {
    attributes: {
      secure: env.NODE_ENV === "production", // Set to `true` when using HTTPS
    },
    // This sets cookies with super long expiration
    // Since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
    expires: false,
  },
});

/**
 * @see https://lucia-auth.com/guides/validate-session-cookies/nextjs-app
 * @see https://github.com/lucia-auth/examples/blob/main/nextjs-app/username-and-password/lib/auth.ts
 */
export const validateRequest = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

    if (!sessionId) {
      return {
        session: null,
        user: null,
      };
    }

    const result = await lucia.validateSession(sessionId);

    /**
     * @see https://lucia-auth.com/basics/sessions#session-cookies
     */
    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);

        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }

      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();

        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
    } catch {
      // Next.js throws when you attempt to set cookie when rendering page
    }

    return result;
  },
);

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseSessionAttributes: DatabaseSessionAttributes;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
  /**
   * @see https://lucia-auth.com/basics/sessions#define-session-attributes
   */
  interface DatabaseSessionAttributes {
    browser?: string;
    country?: string;
    device?: string;
  }
  interface DatabaseUserAttributes {
    /**
     * @see https://lucia-auth.com/guides/email-and-password/email-verification-codes#user-table
     */
    email: string;
    emailVerified: boolean;
    firstName: string;
    lastName: string;
  }
}
