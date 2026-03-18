"use client";

import { Loader2, ShieldCheck } from "lucide-react";
import { signIn } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";

import { Button, type ButtonProps } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialogs";
import { Input } from "@/src/components/ui/input";
import { cn } from "@/src/lib/utils";

interface SignInModalProps {
  buttonClassName?: string;
  buttonSize?: ButtonProps["size"];
  buttonVariant?: ButtonProps["variant"];
  onOpenChange?: (open: boolean) => void;
}

export function SignInModal({
  buttonClassName,
  buttonSize = "sm",
  buttonVariant = "default",
  onOpenChange,
}: SignInModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("structui");

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const openFromQuery = searchParams.get("auth") === "signin";
  const callbackUrl = useMemo(() => {
    const requested = searchParams.get("callbackUrl");
    if (requested && requested.startsWith("/")) {
      return requested;
    }

    return "/dashboard";
  }, [searchParams]);

  useEffect(() => {
    if (openFromQuery) {
      setOpen(true);
    }
  }, [openFromQuery]);

  function clearAuthQuery() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("auth");
    params.delete("callbackUrl");

    const nextQuery = params.toString();
    const nextPath = nextQuery ? `${pathname}?${nextQuery}` : pathname;

    router.replace(nextPath, { scroll: false });
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    onOpenChange?.(nextOpen);

    if (!nextOpen && openFromQuery) {
      clearAuthQuery();
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
      callbackUrl,
    });

    setLoading(false);

    if (result?.error) {
      setError("Incorrect username or password.");
      return;
    }

    setOpen(false);

    if (openFromQuery) {
      clearAuthQuery();
    }

    router.push(result?.url || callbackUrl);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size={buttonSize} variant={buttonVariant} className={cn(buttonClassName)}>
          Sign In
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[430px] max-h-[360px]">
        <div className="space-y-5">
          <div className="space-y-3 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-1">
              <DialogTitle className="text-2xl font-semibold tracking-tight">
                Sign in to StructUI
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Continue with credentials auth.
              </DialogDescription>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1.5">
              <label htmlFor="signin-username" className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Username
              </label>
              <Input
                id="signin-username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="admin"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="signin-password" className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Password
              </label>
              <Input
                id="signin-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="structui"
                required
              />
            </div>

            {error ? <p className="text-sm text-destructive">{error}</p> : null}

            <Button type="submit" className="mt-1 w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Continue"
              )}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
