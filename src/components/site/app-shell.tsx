"use client";

import type { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { SiteFooter } from "@/src/components/site/footer";
import { SiteNavbar } from "@/src/components/site/navbar";
import { CookiesBanner } from "@/src/components/ui/cookies-banner";
import { ToastProvider } from "@/src/components/ui/toast";
import { cn } from "@/src/lib/utils";

interface AppShellProps {
  children: ReactNode;
  session: Session | null;
  starCount: number | null;
}

export function AppShell({
  children,
  session,
  starCount,
}: AppShellProps) {
  const [theme, setTheme] = useState<"light" | "dark" | "khaki" | "khaki-dark">(
    "dark",
  );

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isBarePreview = pathname === "/r2go" && searchParams.get("preview") === "1";

  return (
    <SessionProvider session={session}>
      <ToastProvider>
        <div
          className={cn(
            "min-h-screen bg-background font-sans text-foreground transition-colors duration-300",
            theme,
          )}
        >
          {!isBarePreview ? <SiteNavbar starCount={starCount} /> : null}
          <main>{children}</main>
          {!isBarePreview ? <SiteFooter /> : null}
          {!isBarePreview ? <CookiesBanner /> : null}
          {!isBarePreview ? (
            <div className="fixed right-4 top-20 z-50 flex scale-90 flex-col gap-1.5 rounded-full border border-primary/10 bg-background/50 p-1.5 shadow-lg backdrop-blur-md">
              {(["light", "dark", "khaki", "khaki-dark"] as const).map((item) => (
                <button
                  key={item}
                  onClick={() => setTheme(item)}
                  className={cn(
                    "h-6 w-6 rounded-full border transition-all",
                    theme === item
                      ? "scale-110 border-primary"
                      : "border-transparent opacity-50 hover:opacity-100",
                    item === "light" && "bg-[#f7f8fa]",
                    item === "dark" && "bg-[#0f1115]",
                    item === "khaki" && "bg-[#f5f5dc]",
                    item === "khaki-dark" && "bg-[#2d2d24]",
                  )}
                  title={item}
                />
              ))}
            </div>
          ) : null}
        </div>
      </ToastProvider>
    </SessionProvider>
  );
}
