import { cn } from "@/src/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { Home, Layout, Box, FileText, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Floatbar = () => {
  const location = useLocation();

  const items = [
    { icon: Home, label: "Home", href: "/" },
    { icon: FileText, label: "Docs", href: "/docs" },
    { icon: Box, label: "Components", href: "/components" },
    { icon: Layout, label: "Blocks", href: "/blocks" },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-1 p-1.5 rounded-full border bg-background/80 backdrop-blur-xl shadow-2xl"
      >
        {items.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "relative flex items-center justify-center p-2.5 rounded-full transition-all duration-300",
                isActive ? "text-primary bg-accent" : "text-muted-foreground hover:text-primary hover:bg-accent/50"
              )}
            >
              <item.icon className="h-5 w-5" />
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="floatbar-active"
                    className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
};
