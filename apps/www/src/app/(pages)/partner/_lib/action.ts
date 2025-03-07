"use server";

import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";
import { Effect } from "effect";
import { getIP } from "lib/network/ip";
import { resend } from "lib/resend";
import { z, type ZodError } from "zod";
import { fromError } from "zod-validation-error";

const ratelimit = new Ratelimit({
  // 5 requests from the same IP in 10 seconds
  limiter: Ratelimit.slidingWindow(3, "9 s"),
  redis: kv,
});
const schema = z.object({
  body: z.string(),
  company: z.string(),
  email: z.string().email(),
  name: z.string(),
});

export const action = async (formData: FormData) =>
  Effect.runPromise(
    Effect.tryPromise({
      catch: (error) => {
        const validationError = fromError(error as ZodError);
        const message =
          validationError.message ??
          "An error ocurrected while submitting the Partner Application";

        Effect.logError(validationError.message ?? message);

        return {
          message,
          ok: false,
        };
      },
      try: async () => {
        const ip = getIP();
        const { success } = await ratelimit.limit(ip);

        console.log("here");
        if (!success) {
          Effect.logError(`${ip} exceeded rate limit`);

          return {
            message: "Rate limit exceeded",
            ok: false,
          };
        }

        const parsed = await schema.parseAsync({
          body: formData.get("body"),
          company: formData.get("company"),
          email: formData.get("email"),
          name: formData.get("name"),
        });

        await resend.emails.send({
          from: "Kings & Thieves <system@kngsthvs.com>",
          subject: "Partner Application",
          text: `Name: ${parsed.name}

Email: ${parsed.email}

Company: ${parsed.company}

${parsed.body}
      `,
          to: "partners@kngsthvs.com",
        });

        return { message: "Partner application sent", ok: true };
      },
    }).pipe(Effect.flatMap((result) => Effect.succeed(result))),
  );
