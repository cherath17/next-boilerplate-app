"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/ui/field";
import { Input } from "@/ui/input";
import { Checkbox } from "@/ui/checkbox";
import { Button } from "@/ui/button";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/ui/input-otp";

// Types
import {
  AuthApiFormProps,
  AuthFormFields,
  AuthFormProps,
} from "@/interface/authFormProps.interface";

// Validations
import { signupSchema } from "@/lib/validations/signup";
import { loginSchema } from "@/lib/validations/login";
import { otpSchema } from "@/lib/validations/otp";

// Enum
import { AuthModeEnum, AuthTextEnum, FieldLabelsEnum } from "@/enum/auth.enum";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

import { useRouter } from "next/navigation";
import { AuthSwitch } from "../AuthSwitch";

export function AuthForm({ mode, type }: AuthFormProps) {
  const isSignup = mode === AuthModeEnum.SIGNUP;
  const isOtp = type === AuthModeEnum.OTP;
  const [otpSent, setOtpSent] = React.useState(false);
  const [show, setShow] = React.useState({
    password: false,
    confirmPassword: false,
  });

  const { login, setUser } = useAuth();
  const router = useRouter();

  const baseDefaults = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
    agree: false,
    remember: false,
  };

  const defaultValues: AuthFormFields = {
    ...baseDefaults,
    ...(isSignup && {}),
    ...(!isSignup && { remember: false }),
  };

  const schema = isOtp
    ? otpSent
      ? otpSchema
      : z.object({ email: z.string().email() })
    : isSignup
    ? signupSchema
    : loginSchema;

  const form = useForm<AuthFormFields>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  React.useEffect(() => {
    if (isOtp) form.reset(form.getValues(), { keepValues: true });
  }, [otpSent]);

  const handleSubmit = async (data: AuthApiFormProps) => {
    if (isSignup && data.password !== data.confirmPassword) {
      toast.error(AuthTextEnum.PASSWORD_NOT_MATCH);
      return;
    }

    if (isOtp && !otpSent) {
      toast.success(`${AuthTextEnum.OTP_SENT} ${data.email}`);
      setOtpSent(true);
      return;
    }

    const { confirmPassword, ...payload } = data;

    // Fake user
    const user = {
      name: payload.name || "User",
      email: payload.email,
    };
    const token = "dummy-jwt-token";

    // Store user with AuthContext login()
    login(token, user);

    if (mode === AuthModeEnum.LOGIN) {
      toast.success("Login Successful");
      router.replace("/dashboard");
    }

    if (mode === AuthModeEnum.SIGNUP) {
      toast.success("Signup Successful");
      router.replace("/login");
    }
  };

  const toggleVisibility = (key: "password" | "confirmPassword") => {
    setShow((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <Card className="bg-white w-full sm:max-w-md m-auto px-4 border-0 shadow-3xl">
      <CardHeader className="px-2">
        <CardTitle className="auth_title">
          {isSignup
            ? AuthTextEnum.SIGN_UP_TITLE
            : isOtp
            ? AuthTextEnum.OTP_LOGIN_TITLE
            : AuthTextEnum.LOGIN_TITLE}
        </CardTitle>

        <CardDescription className="auth_desc">
          {isOtp
            ? otpSent
              ? AuthTextEnum.DESC_OTP_VERIFY
              : AuthTextEnum.DESC_OTP_EMAIL
            : isSignup
            ? AuthTextEnum.DESC_SIGNUP
            : AuthTextEnum.DESC_LOGIN}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-2">
        <form id="auth-form" onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup>
            {isSignup && (
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>{FieldLabelsEnum.NAME}</FieldLabel>
                    <Input {...field} placeholder="Type your Name" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            )}

            {(!otpSent || !isOtp) && (
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>{FieldLabelsEnum.EMAIL}</FieldLabel>
                    <Input {...field} placeholder="you@example.com" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            )}

            {isOtp && otpSent && (
              <>
                <p className="text-sm mb-2">
                  {AuthTextEnum.OTP_SENT}{" "}
                  <strong>{form.getValues("email")}</strong>
                </p>

                <Controller
                  name="otp"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>{FieldLabelsEnum.OTP}</FieldLabel>

                      <InputOTP
                        maxLength={6}
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </>
            )}

            {!isOtp && (
              <>
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>{FieldLabelsEnum.PASSWORD}</FieldLabel>
                      <div className="relative">
                        <Input
                          {...field}
                          type={show.password ? "text" : "password"}
                          placeholder="••••••••"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500 bg-transparent"
                          // onClick={() => setShowPassword((prev) => !prev)}
                          onClick={() => toggleVisibility("password")}
                        >
                          {!show.password ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </Button>
                      </div>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {isSignup && (
                  <Controller
                    name="confirmPassword"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>
                          {FieldLabelsEnum.CONFIRM_PASSWORD}
                        </FieldLabel>
                        <div className="relative">
                          <Input
                            {...field}
                            type={show.confirmPassword ? "text" : "password"}
                            placeholder="••••••••"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500 bg-transparent"
                            onClick={() => toggleVisibility("confirmPassword")}
                          >
                            {!show.confirmPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </Button>
                        </div>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                )}
              </>
            )}

            {!isSignup && !isOtp && (
              <Controller
                name="remember"
                control={form.control}
                render={({ field }) => (
                  <div className="flex items-center gap-2 mt-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <label className="text-sm">
                      {AuthTextEnum.REMEMBER_ME}
                    </label>
                  </div>
                )}
              />
            )}

            {isSignup && (
              <Controller
                name="agree"
                control={form.control}
                render={({ field, fieldState }) => (
                  <div data-invalid={fieldState.invalid}>
                    <div className="flex gap-3 mt-2">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <label className="text-sm leading-tight cursor-pointer">
                        {AuthTextEnum.PRIVACY_POLICY}
                      </label>
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                )}
              />
            )}
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex md:flex-row justify-end flex-col gap-2 pt-3">
        <Button variant="outline" type="button" onClick={() => form.reset()}>
          {AuthTextEnum.BTN_RESET}
        </Button>

        <Button type="submit" form="auth-form">
          {isOtp
            ? otpSent
              ? AuthTextEnum.BTN_VERIFY
              : AuthTextEnum.BTN_REQUEST_OTP
            : isSignup
            ? AuthTextEnum.BTN_SIGN_UP
            : AuthTextEnum.BTN_LOGIN}
        </Button>
      </CardFooter>
      <AuthSwitch />
    </Card>
  );
}
