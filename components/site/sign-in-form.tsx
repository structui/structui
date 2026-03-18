"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";

export function SignInForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      username: String(formData.get("username") || ""),
      password: String(formData.get("password") || ""),
      redirect: false,
      callbackUrl: searchParams.get("callbackUrl") || "/dashboard",
    });

    setLoading(false);

    if (result?.error) {
      setError("Incorrect username or password.");
      return;
    }

    router.push(result?.url || "/dashboard");
    router.refresh();
  }

  return (
    <Card className="w-full max-w-md border-primary/10 shadow-xl">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription>
          NextAuth credentials flow is enabled. Default sign-in:
          <span className="ml-1 font-medium text-foreground">admin / structui</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="username">
              Username
            </label>
            <Input id="username" name="username" placeholder="admin" required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="password">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="structui"
              required
            />
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Continue"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
