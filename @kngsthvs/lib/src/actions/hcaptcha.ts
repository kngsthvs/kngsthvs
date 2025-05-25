import "server-only";

// import { generateEnv } from "@kngsthvs/lib/env";
// import { z } from "zod";

// const env = generateEnv({
//   schema: {
//     HCAPTCHA_SECRET_KEY: z.string().min(1),
//   },
//   server: {
//     variables: process.env,
//   },
// });

/**
 * @param secret
 * @param token
 * @see https://docs.hcaptcha.com/
 * @see https://github.com/neg4n/next-hcaptcha/blob/main/src/index.ts
 * @see https://github.com/glenstack/glenstack/blob/master/packages/cf-workers-hcaptcha/src/index.ts
 */

export async function hcaptcha(props: {
  secret?: string; // FIX: Doesn't work currently
  token: string;
}): Promise<any> {
  let message = "An unknown hCaptcha error occured.";

  try {
    const body = new FormData();

    if (!process.env.HCAPTCHA_SECRET_KEY) {
      return {
        code: "missing-input-secret",
        message: "Your secret key is missing.",
        status: "error",
      };
    }

    const secret = process.env.HCAPTCHA_SECRET_KEY ?? props.secret;
    body.append("response", props.token);
    body.append("secret", secret);

    const res = await fetch("https://api.hcaptcha.com/siteverify", {
      body: new URLSearchParams({
        response: props.token,
        secret,
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });
    const data = await res.json();

    if (data.success) {
      return data;
    }

    /**
     * @see https://docs.hcaptcha.com/#siteverify-error-codes-table
     */
    const errorCodes = data["error-codes"];
    switch (errorCodes[0]) {
      case "missing-input-secret":
        return {
          code: "missing-input-secret",
          message: "Your secret key is missing.",
          status: "error",
        };
      case "invalid-input-secret":
        return {
          code: "invalid-input-secret",
          message: "	Your secret key is invalid or malformed.",
          status: "error",
        };
      case "missing-input-response":
        return {
          code: "missing-input-response",
          message: "The response parameter (verification token) is missing.",
          status: "error",
        };
      case "invalid-input-response":
        return {
          code: "invalid-input-response",
          message:
            "The response parameter (verification token) is invalid or malformed.",
          status: "error",
        };
      case "bad-request":
        return {
          code: "bad-request",
          message: "The request is invalid or malformed.",
          status: "error",
        };
      case "invalid-or-already-seen-response":
        return {
          code: "invalid-or-already-seen-response",
          message:
            "The response parameter has already been checked, or has another issue.",
          status: "error",
        };
      case "not-using-dummy-passcode":
        return {
          code: "not-using-dummy-passcode",
          message:
            "	You have used a testing sitekey but have not used its matching secret.",
          status: "error",
        };
      case "sitekey-secret-mismatch":
        return {
          code: "sitekey-secret-mismatch",
          message: "The sitekey is not registered with the provided secret.",
          status: "error",
        };
      default:
        return {
          message,
          status: "error",
        };
    }
  } catch (error: any) {
    console.error(error);

    return {
      ...error,
      message,
      status: "error",
    };
  }
}
