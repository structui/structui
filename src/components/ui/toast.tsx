import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/src/lib/utils";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastAction {
  label: string;
  onClick: () => void;
}

interface Toast {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
  action?: ToastAction;
}

interface ToastContextType {
  toast: (props: Omit<Toast, "id">) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback(({ title, description, type, action }: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description, type, action }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-0 right-0 z-[100] p-6 flex flex-col gap-4 w-full max-w-md pointer-events-none">
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className={cn(
                "pointer-events-auto relative flex w-full items-start gap-4 overflow-hidden rounded-2xl border p-4 shadow-2xl backdrop-blur-md",
                t.type === "success" && "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400",
                t.type === "error" && "bg-destructive/10 border-destructive/20 text-destructive",
                t.type === "info" && "bg-primary/10 border-primary/20 text-primary",
                t.type === "warning" && "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400"
              )}
            >
              <div className="mt-0.5">
                {t.type === "success" && <CheckCircle2 className="h-5 w-5" />}
                {t.type === "error" && <AlertCircle className="h-5 w-5" />}
                {t.type === "info" && <Info className="h-5 w-5" />}
                {t.type === "warning" && <AlertTriangle className="h-5 w-5" />}
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="text-sm font-bold leading-none">{t.title}</h4>
                {t.description && (
                  <p className="text-xs opacity-80 leading-relaxed">{t.description}</p>
                )}
                {t.action && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      t.action?.onClick();
                      removeToast(t.id);
                    }}
                    className="mt-2 text-xs font-bold uppercase tracking-widest underline underline-offset-4 hover:opacity-70 transition-opacity"
                  >
                    {t.action.label}
                  </button>
                )}
              </div>
              <button
                onClick={() => removeToast(t.id)}
                className="rounded-lg p-1 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
              
              {/* Progress bar */}
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 5, ease: "linear" }}
                className={cn(
                  "absolute bottom-0 left-0 h-1 bg-current opacity-20",
                )}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
