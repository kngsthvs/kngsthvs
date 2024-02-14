import { isPossiblePhoneNumber } from "libphonenumber-js";
import z from "zod";

export const phone = z
  .string()
  .refine(
    async (value) => {
      if (!value) return false;

      return isPossiblePhoneNumber(value.replace(/\D+/g, ""), "US");
    },
    { message: "Invalid phone number" }
  )
  .optional();
