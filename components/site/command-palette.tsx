"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { BookOpen, Box, Component, Layers, Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import type { ComponentCatalogEntry } from "@/src/lib/registry/catalog";

interface CommandPaletteProps {
  components: ComponentCatalogEntry[];
}

export function CommandPalette({ components }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const goTo = (href: string) => {
    router.push(href);
    setOpen(false);
  };

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-lg border bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted"
      >
        <Search className="h-4 w-4" />
        <span>Search...</span>
        <kbd className="inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <AnimatePresence>
        {open ? (
          <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[20vh]">
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-xl border bg-popover shadow-2xl"
            >
              <Command className="flex h-full w-full flex-col overflow-hidden">
                <div className="flex items-center border-b px-3">
                  <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                  <Command.Input
                    placeholder="Type a command or search..."
                    className="flex h-12 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
                  />
                </div>
                <Command.List className="max-h-[320px] overflow-y-auto overflow-x-hidden p-2">
                  <Command.Empty className="py-6 text-center text-sm">
                    No results found.
                  </Command.Empty>

                  <Command.Group
                    heading="Jump to"
                    className="px-2 py-1.5 text-xs font-medium text-muted-foreground"
                  >
                    <PaletteItem
                      icon={<BookOpen className="h-4 w-4" />}
                      label="Docs"
                      onSelect={() => goTo("/docs")}
                    />
                    <PaletteItem
                      icon={<Component className="h-4 w-4" />}
                      label="Components"
                      onSelect={() => goTo("/components")}
                    />
                    <PaletteItem
                      icon={<Box className="h-4 w-4" />}
                      label="Blocks"
                      onSelect={() => goTo("/blocks")}
                    />
                  </Command.Group>

                  <Command.Separator className="-mx-2 my-1 h-px bg-border" />

                  <Command.Group
                    heading="Registry Components"
                    className="px-2 py-1.5 text-xs font-medium text-muted-foreground"
                  >
                    {components.map((component) => (
                      <React.Fragment key={component.slug}>
                        <PaletteItem
                          icon={<Layers className="h-4 w-4" />}
                          label={component.title}
                          meta={component.category}
                          value={`${component.title} ${component.category} ${component.slug}`}
                          onSelect={() => goTo(`/components/${component.slug}`)}
                        />
                      </React.Fragment>
                    ))}
                  </Command.Group>
                </Command.List>
              </Command>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

interface PaletteItemProps {
  icon: React.ReactNode;
  label: string;
  meta?: string;
  value?: string;
  onSelect?: () => void;
}

function PaletteItem({ icon, label, meta, value, onSelect }: PaletteItemProps) {
  return (
    <Command.Item
      value={value || label}
      onSelect={onSelect}
      className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground"
    >
      <div className="mr-2 flex h-4 w-4 items-center justify-center opacity-70">
        {icon}
      </div>
      <span>{label}</span>
      {meta ? (
        <span className="ml-auto text-xs tracking-widest text-muted-foreground">
          {meta}
        </span>
      ) : null}
    </Command.Item>
  );
}
