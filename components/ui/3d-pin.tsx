// @ts-nocheck
import { cn } from "@/src/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import React, { useRef } from "react";

/**
 * PinContainer — Original tilt card with perspective, glow, and floating label.
 */
export const PinContainer = ({
  children,
  title,
  href,
  className,
  containerClassName,
}: React.PropsWithChildren<{
  title?: string;
  href?: string;
  className?: string;
  containerClassName?: string;
}>) => {
  const ref = useRef<HTMLDivElement>(null);

  // Raw mouse offsets –0.5…0.5
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 200, damping: 32 });
  const smoothY = useSpring(mouseY, { stiffness: 200, damping: 32 });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [14, -14]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);

  // Glow position (%)
  const glowX = useTransform(smoothX, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(smoothY, [-0.5, 0.5], [0, 100]);

  // Computed style values
  const glowBg = useTransform<number, string>(
    [glowX, glowY] as any,
    ([x, y]: [number, number]) =>
      `radial-gradient(circle at ${x}% ${y}%, color-mix(in srgb, var(--primary) 20%, transparent) 0%, transparent 70%)`
  );

  const sheenBg = useTransform<number, string>(
    [rotateX, rotateY] as any,
    ([rx, ry]: [number, number]) =>
      `linear-gradient(${135 + ry * 1.5}deg, rgba(255,255,255,${Math.max(0, 0.03 + Math.abs(rx) * 0.006)}) 0%, transparent 55%)`
  );

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - left - width / 2) / width);
    mouseY.set((e.clientY - top - height / 2) / height);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const Wrapper = (href ? "a" : "div") as any;

  return (
    <Wrapper href={href} className={cn("block", containerClassName)} style={{ perspective: "1100px" }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={cn("relative group cursor-pointer select-none", className)}
      >
        {/* Glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: glowBg }}
        />

        {/* Card */}
        <div
          className={cn(
            "relative rounded-2xl overflow-hidden",
            "bg-card border border-border",
            "shadow-sm group-hover:shadow-2xl transition-shadow duration-500"
          )}
        >
          {/* Sheen */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ background: sheenBg }}
          />
          {children}
        </div>

        {/* Floating label */}
        {title && (
          <div
            className={cn(
              "absolute bottom-3 left-1/2 -translate-x-1/2",
              "opacity-0 translate-y-2",
              "group-hover:opacity-100 group-hover:translate-y-0",
              "transition-all duration-300 ease-out pointer-events-none z-20"
            )}
          >
            <span className="flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground/60 animate-pulse" />
              {title}
            </span>
          </div>
        )}
      </motion.div>
    </Wrapper>
  );
};

/**
 * PinCard — Ready-made card wrapper for PinContainer.
 */
export const PinCard = ({
  title,
  description,
  label,
  href,
  header,
  className,
}: {
  title: string;
  description?: string;
  label?: string;
  href?: string;
  header?: React.ReactNode;
  className?: string;
}) => (
  <PinContainer title={label ?? title} href={href} containerClassName={cn("h-full", className)}>
    {header && (
      <div className="h-40 overflow-hidden bg-muted/50 flex items-center justify-center">{header}</div>
    )}
    <div className="p-5">
      <h3 className="font-bold text-sm mb-1 text-card-foreground">{title}</h3>
      {description && <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>}
    </div>
  </PinContainer>
);
