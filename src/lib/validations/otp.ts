import * as z from "zod";

export const otpSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export type OtpSchema = z.infer<typeof otpSchema>;
