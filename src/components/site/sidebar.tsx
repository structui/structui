"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { cn } from "@/src/lib/utils";

interface SidebarSection {
  title: string;
  items: {
    title: string;
    href: string;
  }[];
}

interface SiteSidebarProps {
  items: SidebarSection[];
  className?: string;
}

export function SiteSidebar({ items, className }: SiteSidebarProps) {
  const pathname = usePathname();

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-5 py-5">
        {items.map((section) => (
          <div key={section.title} className="px-3">
            <h2 className="mb-2 px-3 text-[11px] font-semibold tracking-[0.24em] uppercase text-muted-foreground/60">
              {section.title}
            </h2>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/docs" && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    scroll={false}
                    className={cn(
                      "group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all hover:bg-accent/70 hover:text-accent-foreground",
                      isActive
                        ? "bg-accent text-accent-foreground shadow-sm"
                        : "text-muted-foreground",
                    )}
                  >
                    <span className="truncate pr-3">{item.title}</span>
                    <ChevronRight
                      className={cn(
                        "h-3.5 w-3.5 shrink-0 transition-transform",
                        isActive ? "translate-x-0 text-primary" : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                      )}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
