import { cn } from "@/src/lib/utils";
import { motion } from "motion/react";
import React, { useState } from "react";

// ─── Container ────────────────────────────────────────────────────────────────
export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.08, delayChildren: 0.1 },
        },
      }}
      className={cn(
        "grid md:auto-rows-[20rem] grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

// ─── Item ─────────────────────────────────────────────────────────────────────
export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  highlight,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  highlight?: boolean;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24, scale: 0.97 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { type: "spring", stiffness: 120, damping: 18 },
        },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "row-span-1 relative rounded-2xl group/bento overflow-hidden flex flex-col",
        "border transition-all duration-300 ease-out",
        highlight
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-card border-border hover:border-primary/30",
        "hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.2)]",
        className
      )}
    >
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: hovered ? 1 : 0,
          background: highlight
            ? "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)"
            : "linear-gradient(135deg, color-mix(in srgb, var(--primary) 8%, transparent) 0%, transparent 60%)",
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Header area */}
      <div className="flex-1 overflow-hidden relative">
        <motion.div
          className="w-full h-full"
          animate={{ scale: hovered ? 1.03 : 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {header}
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        className="p-5 relative z-10"
        animate={{ y: hovered ? -2 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {icon && (
          <motion.div
            className={cn(
              "w-9 h-9 rounded-xl flex items-center justify-center mb-3",
              highlight ? "bg-primary-foreground/20" : "bg-primary/10 text-primary"
            )}
            animate={{ rotate: hovered ? 5 : 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {icon}
          </motion.div>
        )}
        {title && (
          <div className={cn("font-bold text-base mb-1.5 leading-snug", highlight ? "text-primary-foreground" : "text-foreground")}>
            {title}
          </div>
        )}
        {description && (
          <div className={cn("text-sm leading-relaxed", highlight ? "text-primary-foreground/80" : "text-muted-foreground")}>
            {description}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

// ─── Compact Item (text-only, no header) ──────────────────────────────────────
export const BentoGridCompactItem = ({
  className,
  title,
  description,
  icon,
  badge,
}: {
  className?: string;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: string;
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: -16 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { type: "spring", stiffness: 140, damping: 20 },
        },
      }}
      className={cn(
        "relative rounded-2xl group/bento overflow-hidden flex flex-col justify-between p-5",
        "bg-card border border-border hover:border-primary/30",
        "hover:shadow-md transition-all duration-300",
        className
      )}
    >
      {badge && (
        <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
      {icon && (
        <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
          {icon}
        </div>
      )}
      <div>
        {title && <div className="font-bold text-base mb-1 text-foreground">{title}</div>}
        {description && <div className="text-sm text-muted-foreground leading-relaxed">{description}</div>}
      </div>
    </motion.div>
  );
};
