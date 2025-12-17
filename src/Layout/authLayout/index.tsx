"use client";

//Components
import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";
// Types
import { AuthLayoutProps } from "@/interface/authLayoutProps.interface";

/**
 * AuthLayout
 * Wraps login, signup, and other auth pages
 */
export function AuthLayout({
  children,
  title,
  description,
  footer = false,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-white px-4">
      <Card className="w-full max-w-md">
        {title && description && (
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
        )}
        <CardContent>{children}</CardContent>
        {/* Optional footer if needed */}
        {footer && (
          <CardFooter className="flex justify-between gap-2">
            <Button variant="ghost" type="button">
              Help
            </Button>
            <Button variant="default" type="button">
              Contact Support
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
