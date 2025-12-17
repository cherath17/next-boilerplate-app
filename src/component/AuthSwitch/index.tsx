"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// ─── Component ──────────────────────────────────────────
export function AuthSwitch() {
  const pathname = usePathname();

  const isLogin = pathname === "/login";
  const isSignup = pathname === "/signup";

  if (!isLogin && !isSignup) return null;

  const config = isLogin
    ? {
        text: "Don't have an account?",
        linkText: "Sign up",
        href: "/signup",
      }
    : {
        text: "Already have an account?",
        linkText: "Login",
        href: "/login",
      };

  return (
    <div className="flex justify-center text-sm text-muted-foreground pt-4">
      <span>{config.text}</span>
      <Link
        href={config.href}
        className="ml-1 font-medium text-primary hover:underline"
      >
        {config.linkText}
      </Link>
    </div>
  );
}
