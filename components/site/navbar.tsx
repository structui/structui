"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Menu, Star, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { SignInModal } from "@/src/components/site/sign-in-modal";

interface SiteNavbarProps {
  starCount: number | null;
}

const formatStarCount = (value: number | null): string => {
  if (value === null) {
    return "GitHub";
  }

  if (value >= 1000) {
    return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}k`;
  }

  return String(value);
};

export function SiteNavbar({ starCount }: SiteNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const isDocsRoute = pathname.startsWith("/docs");

  const navLinks = [
    { name: "Docs", href: "/docs" },
    { name: "Components", href: "/components" },
    { name: "Blocks", href: "/blocks" },
    { name: "Setups", href: "/setups" },
    { name: "Theme", href: "/theme-creator" },
    { name: "Ready 2 Go (Beta)", href: "/r2go" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div
        className={cn(
          "flex h-12 items-center justify-between gap-4 px-3 sm:px-5 lg:px-6",
          isDocsRoute ? "w-full" : "max-w-7xl mx-auto",
        )}
      >
        <div className="flex items-center gap-5">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-base tracking-tight">
              Struct<span className="text-primary/50 font-bold">UI</span>
            </span>
          </Link>
          <div className="hidden items-center gap-4 md:flex">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-xs  transition-colors hover:text-primary/90",
                    isActive ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 sm:flex">
            <a
              href="https://github.com/structui/structui"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-7 items-center gap-1.5 rounded-full border border-border/70 bg-background/80 px-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:border-primary/20 hover:text-foreground"
            >
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              <span>{formatStarCount(starCount)}</span>
            </a>
            <a
              href="https://github.com/structui/structui"
              target="_blank"
              rel="noreferrer"
              className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
            >
              <Github className="h-4 w-4" />
            </a>
            {session?.user ? (
              <Button
                variant="outline"
                size="sm"
                className="h-7 rounded-full px-3 text-xs"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Sign Out
              </Button>
            ) : (
              <SignInModal
                buttonVariant="default"
                buttonSize="sm"
                buttonClassName="h-7 rounded-full px-3 text-xs"
              />
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 md:hidden"
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {isOpen ? (
        <div className="border-t border-border/70 bg-background/95 p-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-xs font-medium uppercase tracking-[0.2em] transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary" : "text-muted-foreground",
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center gap-2 border-t border-border/70 pt-3">
              <a
                href="https://github.com/structui/structui"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-7 items-center gap-1.5 rounded-full border border-border/70 bg-background/80 px-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground"
              >
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                <span>{formatStarCount(starCount)}</span>
              </a>
              {session?.user ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 rounded-full px-3 text-xs"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Sign Out
                </Button>
              ) : (
                <SignInModal
                  buttonVariant="default"
                  buttonSize="sm"
                  buttonClassName="h-7 rounded-full px-3 text-xs"
                  onOpenChange={(open) => {
                    if (open) {
                      setIsOpen(false);
                    }
                  }}
                />
              )}
              <a
                href="https://github.com/structui/structui"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 text-muted-foreground transition-colors hover:text-primary"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
