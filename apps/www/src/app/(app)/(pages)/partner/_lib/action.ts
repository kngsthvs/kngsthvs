"use server";

import { hcaptcha } from "@kngsthvs/lib/actions/hcaptcha";
import { getIP } from "@repo/lib/network/ip";
import { resend } from "@repo/lib/resend";
import { Ratelimit } from "@unkey/ratelimit";
import { Effect } from "effect";
import { type ZodError, z } from "zod";
import { fromError } from "zod-validation-error";
import { env } from "@/env";

const ratelimit = new Ratelimit({
  duration: "9s",
  limit: 3,
  namespace: "www",
  rootKey: env.UNKEY_ROOT_KEY,
});
const schema = z.object({
  body: z.string(),
  company: z.string(),
  email: z.string().email(),
  name: z.string(),
  token: z.string().min(1),
});

export const submitApplication = async (formData: FormData) =>
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
        const ip = await getIP();
        const { success } = await ratelimit.limit(ip);

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
          token: formData.get("h-captcha-response"),
        });
        const challenge = await hcaptcha({
          token: parsed.token,
        });

        if (challenge.status === "error") {
          return {
            message: challenge.message,
            status: "error",
          };
        }

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
