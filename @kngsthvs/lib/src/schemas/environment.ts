import { z } from "zod";

export const environment = z
  .enum(["development", "test", "production"])
  .default("development");
