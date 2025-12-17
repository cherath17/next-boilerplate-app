import * as z from "zod";
import { passwordRegex, passwordRegexMessage } from "./signup";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters")
    // .max(12, "Paswword should below 12 chacarcter")
    .regex(passwordRegex, passwordRegexMessage),
  remember: z.boolean().optional(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
