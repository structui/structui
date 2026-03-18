"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  Loader2,
  X,
} from "lucide-react";
import { cn } from "@/src/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ToastType = "success" | "error" | "info" | "warning" | "loading";
export type ToastPosition =
  | "top-left" | "top-center" | "top-right"
  | "bottom-left" | "bottom-center" | "bottom-right";

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastOptions {
  id?: string;
  title: string;
  description?: React.ReactNode;
  type?: ToastType;
  duration?: number; // ms, Infinity = persistent
  icon?: React.ReactNode;
  action?: ToastAction;
  cancel?: ToastAction;
  onDismiss?: () => void;
}

interface ToastItem extends Required<Pick<ToastOptions, "id" | "title" | "type" | "duration">> {
  description?: React.ReactNode;
  icon?: React.ReactNode;
  action?: ToastAction;
  cancel?: ToastAction;
  onDismiss?: () => void;
  createdAt: number;
}

interface ToastContextType {
  toast: (opts: ToastOptions) => string;
  success: (title: string, opts?: Omit<ToastOptions, "title" | "type">) => string;
  error: (title: string, opts?: Omit<ToastOptions, "title" | "type">) => string;
  info: (title: string, opts?: Omit<ToastOptions, "title" | "type">) => string;
  warning: (title: string, opts?: Omit<ToastOptions, "title" | "type">) => string;
  loading: (title: string, opts?: Omit<ToastOptions, "title" | "type">) => string;
  update: (id: string, opts: Partial<ToastOptions>) => void;
  dismiss: (id?: string) => void;
  promise: <T>(
    promise: Promise<T>,
    msgs: { loading: string; success: string | ((data: T) => string); error: string | ((err: unknown) => string) },
    opts?: Omit<ToastOptions, "title" | "type">
  ) => Promise<T>;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be inside <ToastProvider>");
  return ctx;
};

// ─── Accent config ────────────────────────────────────────────────────────────

const ACCENT: Record<ToastType, {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  border: string;
  progress: string;
}> = {
  success: {
    icon: <CheckCircle2 className="h-[18px] w-[18px]" />,
    iconBg: "bg-emerald-500/12 dark:bg-emerald-500/15",
    iconColor: "text-emerald-500",
    border: "border-border/60",
    progress: "bg-emerald-500",
  },
  error: {
    icon: <AlertCircle className="h-[18px] w-[18px]" />,
    iconBg: "bg-red-500/10 dark:bg-red-500/15",
    iconColor: "text-red-500",
    border: "border-border/60",
    progress: "bg-red-500",
  },
  info: {
    icon: <Info className="h-[18px] w-[18px]" />,
    iconBg: "bg-blue-500/10 dark:bg-blue-500/15",
    iconColor: "text-blue-500",
    border: "border-border/60",
    progress: "bg-blue-500",
  },
  warning: {
    icon: <AlertTriangle className="h-[18px] w-[18px]" />,
    iconBg: "bg-amber-500/10 dark:bg-amber-500/15",
    iconColor: "text-amber-500",
    border: "border-border/60",
    progress: "bg-amber-500",
  },
  loading: {
    icon: <Loader2 className="h-[18px] w-[18px] animate-spin" />,
    iconBg: "bg-muted",
    iconColor: "text-muted-foreground",
    border: "border-border/60",
    progress: "bg-primary",
  },
};

// ─── Single Toast ─────────────────────────────────────────────────────────────

function ToastItem({
  item,
  onDismiss,
  position,
}: {
  item: ToastItem;
  onDismiss: (id: string) => void;
  position: ToastPosition;
}) {
  const accent = ACCENT[item.type];
  const displayIcon = item.icon ?? accent.icon;
  const isPersistent = item.duration === Infinity;
  const [paused, setPaused] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef<number>(Date.now());
  const rafRef = useRef<number>(0);

  // Tick elapsed time for progress bar
  useEffect(() => {
    if (isPersistent || paused) return;
    const tick = () => {
      setElapsed(Date.now() - startRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPersistent, paused]);

  // Pause / resume
  const handleMouseEnter = () => {
    setPaused(true);
    startRef.current = Date.now() - elapsed;
  };
  const handleMouseLeave = () => {
    startRef.current = Date.now() - elapsed;
    setPaused(false);
  };

  // Auto-dismiss
  useEffect(() => {
    if (isPersistent) return;
    const remaining = item.duration - elapsed;
    if (remaining <= 0) {
      item.onDismiss?.();
      onDismiss(item.id);
    }
  }, [elapsed, item, isPersistent, onDismiss]);

  const progress = isPersistent ? 0 : Math.min(1, elapsed / item.duration);

  const isTop = position.startsWith("top");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: isTop ? -12 : 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.15, ease: "easeIn" } }}
      transition={{ type: "spring", stiffness: 420, damping: 36 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "pointer-events-auto relative w-full overflow-hidden rounded-2xl border bg-card",
        "shadow-lg shadow-black/8 dark:shadow-black/30",
        accent.border,
      )}
    >
      {/* Body */}
      <div className="flex items-start gap-3 p-4">
        {/* Icon badge */}
        <div
          className={cn(
            "mt-px flex h-8 w-8 shrink-0 items-center justify-center rounded-xl",
            accent.iconBg,
            accent.iconColor,
          )}
        >
          {displayIcon}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0 pt-0.5">
          <p className="text-[13.5px] font-semibold leading-tight text-foreground">
            {item.title}
          </p>
          {item.description && (
            <div className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">
              {item.description}
            </div>
          )}

          {/* Actions */}
          {(item.action || item.cancel) && (
            <div className="mt-2.5 flex items-center gap-2">
              {item.action && (
                <button
                  onClick={() => {
                    item.action!.onClick();
                    onDismiss(item.id);
                  }}
                  className={cn(
                    "rounded-lg px-3 py-1 text-[11.5px] font-semibold transition-colors",
                    "bg-foreground text-background hover:bg-foreground/85",
                  )}
                >
                  {item.action.label}
                </button>
              )}
              {item.cancel && (
                <button
                  onClick={() => {
                    item.cancel!.onClick();
                    onDismiss(item.id);
                  }}
                  className="rounded-lg px-3 py-1 text-[11.5px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {item.cancel.label}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Dismiss */}
        <button
          onClick={() => {
            item.onDismiss?.();
            onDismiss(item.id);
          }}
          className="shrink-0 rounded-lg p-1 text-muted-foreground/60 transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Dismiss"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Progress bar */}
      {!isPersistent && (
        <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-muted/40">
          <div
            className={cn("h-full transition-none", accent.progress)}
            style={{ width: `${(1 - progress) * 100}%` }}
          />
        </div>
      )}
    </motion.div>
  );
}

// ─── Position layout ──────────────────────────────────────────────────────────

const POSITION_CLASSES: Record<ToastPosition, string> = {
  "top-left":      "top-0 left-0 items-start",
  "top-center":    "top-0 left-1/2 -translate-x-1/2 items-center",
  "top-right":     "top-0 right-0 items-end",
  "bottom-left":   "bottom-0 left-0 items-start",
  "bottom-center": "bottom-0 left-1/2 -translate-x-1/2 items-center",
  "bottom-right":  "bottom-0 right-0 items-end",
};

// ─── Provider ─────────────────────────────────────────────────────────────────

interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
  maxVisible?: number;
}

export function ToastProvider({
  children,
  position = "bottom-right",
  maxVisible = 5,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const genId = () => Math.random().toString(36).slice(2, 9);

  const add = useCallback((opts: ToastOptions): string => {
    const id = opts.id ?? genId();
    const item: ToastItem = {
      id,
      title: opts.title,
      description: opts.description,
      type: opts.type ?? "info",
      duration: opts.duration ?? (opts.type === "loading" ? Infinity : 4500),
      icon: opts.icon,
      action: opts.action,
      cancel: opts.cancel,
      onDismiss: opts.onDismiss,
      createdAt: Date.now(),
    };
    setToasts((prev) => {
      const withoutDupe = prev.filter((t) => t.id !== id);
      const trimmed = withoutDupe.slice(-(maxVisible - 1));
      return [...trimmed, item];
    });
    return id;
  }, [maxVisible]);

  const update = useCallback((id: string, opts: Partial<ToastOptions>) => {
    setToasts((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        return {
          ...t,
          ...opts,
          id,
          type: opts.type ?? t.type,
          duration: opts.duration ?? (opts.type === "loading" ? Infinity : opts.type ? 4500 : t.duration),
          createdAt: Date.now(),
        };
      }),
    );
  }, []);

  const dismiss = useCallback((id?: string) => {
    if (id) {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    } else {
      setToasts([]);
    }
  }, []);

  const ctx: ToastContextType = {
    toast: add,
    success: (title, opts) => add({ ...opts, title, type: "success" }),
    error:   (title, opts) => add({ ...opts, title, type: "error" }),
    info:    (title, opts) => add({ ...opts, title, type: "info" }),
    warning: (title, opts) => add({ ...opts, title, type: "warning" }),
    loading: (title, opts) => add({ ...opts, title, type: "loading", duration: Infinity }),
    update,
    dismiss,
    promise: async (promise, msgs, opts) => {
      const id = add({ ...opts, title: msgs.loading, type: "loading", duration: Infinity });
      try {
        const data = await promise;
        const title = typeof msgs.success === "function" ? msgs.success(data) : msgs.success;
        update(id, { ...opts, title, type: "success", duration: 4500 });
        return data;
      } catch (err) {
        const title = typeof msgs.error === "function" ? msgs.error(err) : msgs.error;
        update(id, { ...opts, title, type: "error", duration: 5000 });
        throw err;
      }
    },
  };

  const isTop = position.startsWith("top");

  return (
    <ToastContext.Provider value={ctx}>
      {children}
      <div
        className={cn(
          "fixed z-[9999] flex flex-col p-4 gap-2.5 pointer-events-none",
          "w-full sm:max-w-[390px]",
          POSITION_CLASSES[position],
          isTop ? "flex-col" : "flex-col-reverse",
        )}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {toasts.map((item) => (
            <ToastItem
              key={item.id}
              item={item}
              onDismiss={dismiss}
              position={position}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

// ─── Demo ─────────────────────────────────────────────────────────────────────

export function ToastDemo() {
  const { toast, success, error, warning, info, loading, update, dismiss, promise } = useToast();

  const runPromise = () => {
    void promise(
      new Promise((res, rej) =>
        setTimeout(() => (Math.random() > 0.4 ? res("done") : rej(new Error("oops"))), 2000),
      ),
      {
        loading: "Uploading file...",
        success: "File uploaded successfully!",
        error: "Upload failed. Please try again.",
      },
      { description: "invoice_q4_2024.pdf" },
    ).catch(() => {
      // Error toast is already shown by `promise`; prevent demo button from throwing.
    });
  };

  const runUpdate = () => {
    const id = loading("Connecting to server...", {
      description: "Establishing secure connection",
    });
    setTimeout(() => {
      update(id, {
        type: "success",
        title: "Connected!",
        description: "Secure connection established.",
      });
    }, 2500);
  };

  const runPersistent = () => {
    const id = toast({
      type: "warning",
      title: "Unsaved changes",
      description: "You have unsaved changes that will be lost.",
      duration: Infinity,
      action: { label: "Save now", onClick: () => success("Changes saved!") },
      cancel: { label: "Discard", onClick: () => {} },
    });
  };

  return (
    <div className="flex flex-wrap gap-2 p-6">
      <button
        onClick={() => success("Changes saved!", { description: "Your project has been updated." })}
        className="rounded-xl bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-600 hover:bg-emerald-500/20 dark:text-emerald-400 transition-colors"
      >
        Success
      </button>
      <button
        onClick={() => error("Something went wrong", { description: "Could not connect to the server. Please check your network." })}
        className="rounded-xl bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-500/20 dark:text-red-400 transition-colors"
      >
        Error
      </button>
      <button
        onClick={() => info("New update available", { description: "SUI v1.5 is ready to install.", action: { label: "Update now", onClick: () => success("Updating…") } })}
        className="rounded-xl bg-blue-500/10 px-4 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-500/20 dark:text-blue-400 transition-colors"
      >
        Info + Action
      </button>
      <button
        onClick={() => warning("Storage limit reached", { description: "You're at 90% of your storage quota." })}
        className="rounded-xl bg-amber-500/10 px-4 py-2 text-xs font-semibold text-amber-600 hover:bg-amber-500/20 dark:text-amber-400 transition-colors"
      >
        Warning
      </button>
      <button
        onClick={runPersistent}
        className="rounded-xl border border-border/60 bg-muted/40 px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
      >
        Persistent + Actions
      </button>
      <button
        onClick={runUpdate}
        className="rounded-xl border border-border/60 bg-muted/40 px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
      >
        Loading → Update
      </button>
      <button
        onClick={runPromise}
        className="rounded-xl border border-border/60 bg-muted/40 px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
      >
        Promise toast
      </button>
      <button
        onClick={() => dismiss()}
        className="rounded-xl border border-border/60 bg-muted/40 px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-muted transition-colors"
      >
        Dismiss all
      </button>
    </div>
  );
}
