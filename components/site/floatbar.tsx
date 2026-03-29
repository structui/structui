"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Box, FileText, Home, Layout, Sparkles } from "lucide-react";

import { cn } from "@/src/lib/utils";

export function SiteFloatbar() {
  const pathname = usePathname();

  const items = [
    { icon: Home, label: "Home", href: "/" },
    { icon: FileText, label: "Docs", href: "/docs" },
    { icon: Box, label: "Components", href: "/components" },
    { icon: Layout, label: "Blocks", href: "/blocks" },
    { icon: Sparkles, label: "Schemes", href: "/schemes" },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-1 rounded-full border bg-background/80 p-1.5 shadow-2xl backdrop-blur-xl"
      >
        {items.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center justify-center rounded-full p-2.5 transition-all duration-300",
                isActive
                  ? "bg-accent text-primary"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-primary",
              )}
            >
              <item.icon className="h-5 w-5" />
              <AnimatePresence>
                {isActive ? (
                  <motion.div
                    layoutId="site-floatbar-active"
                    className="absolute inset-0 -z-10 rounded-full bg-primary/10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                ) : null}
              </AnimatePresence>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
}
