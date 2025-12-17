import { z } from "zod";

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}|[\]\\:";'<>?,./]).{6,}$/;

export const passwordRegexMessage =
  "Password must include uppercase, lowercase, number, and special character";

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(30, "Name must be less than 30 characters")
      .regex(/^[A-Za-z ]+$/, "Name should contain only letters"),

    email: z
      .string()
      .min(1, "Email is required")
      .regex(emailRegex, "Enter a valid email address"),

    password: z.string().regex(passwordRegex, passwordRegexMessage),

    confirmPassword: z.string().min(1, "Confirm password is required"),

    agree: z
      .boolean()
      .refine((v) => v === true, {
        message: "You must agree to the privacy policy",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
