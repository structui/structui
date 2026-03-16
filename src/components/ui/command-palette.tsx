import React, { useEffect, useState } from "react";
import { Command } from "cmdk";
import { Search, User, Settings, CreditCard, Mail, Bell, LayoutDashboard, FileText, Plus, Command as CommandIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const CommandPalette = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground border rounded-lg bg-muted/50 hover:bg-muted transition-colors"
      >
        <Search className="h-4 w-4" />
        <span>Search...</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] p-4">
            <motion.div
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
                    className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
                  <Command.Empty className="py-6 text-center text-sm">No results found.</Command.Empty>
                  
                  <Command.Group heading="Suggestions" className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                    <CommandItem icon={<LayoutDashboard />} label="Dashboard" shortcut="⌘D" />
                    <CommandItem icon={<Plus />} label="New Project" shortcut="⌘N" />
                    <CommandItem icon={<FileText />} label="Reports" shortcut="⌘R" />
                  </Command.Group>
                  
                  <Command.Separator className="-mx-2 my-1 h-px bg-border" />
                  
                  <Command.Group heading="Settings" className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                    <CommandItem icon={<User />} label="Profile" shortcut="⌘P" />
                    <CommandItem icon={<CreditCard />} label="Billing" shortcut="⌘B" />
                    <CommandItem icon={<Settings />} label="Settings" shortcut="⌘S" />
                  </Command.Group>

                  <Command.Separator className="-mx-2 my-1 h-px bg-border" />

                  <Command.Group heading="Notifications" className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                    <CommandItem icon={<Mail />} label="Inbox" />
                    <CommandItem icon={<Bell />} label="Updates" />
                  </Command.Group>
                </Command.List>
              </Command>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

const CommandItem = ({ icon, label, shortcut }: { icon: React.ReactNode; label: string; shortcut?: string }) => (
  <Command.Item className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
    <div className="mr-2 flex h-4 w-4 items-center justify-center opacity-70">
      {React.cloneElement(icon as React.ReactElement, { className: "h-4 w-4" })}
    </div>
    <span>{label}</span>
    {shortcut && (
      <span className="ml-auto text-xs tracking-widest text-muted-foreground">
        {shortcut}
      </span>
    )}
  </Command.Item>
);
