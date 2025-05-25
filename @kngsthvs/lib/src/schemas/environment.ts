import { z } from "zod";

export const environmentSchema = z
	.enum(["development", "test", "production"])
	.default("development");
