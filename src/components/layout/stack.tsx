import * as React from "react"
import { cn } from "@/src/lib/utils"

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
  direction?: "row" | "col"
  spacing?: "none" | "sm" | "md" | "lg" | "xl"
  align?: "start" | "center" | "end" | "stretch"
  justify?: "start" | "center" | "end" | "between" | "around"
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      className,
      as: Component = "div",
      direction = "col",
      spacing = "md",
      align,
      justify,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "flex",
          {
            "flex-col": direction === "col",
            "flex-row": direction === "row",
            "gap-0": spacing === "none",
            "gap-2": spacing === "sm",
            "gap-4": spacing === "md",
            "gap-6": spacing === "lg",
            "gap-8": spacing === "xl",
            "items-start": align === "start",
            "items-center": align === "center",
            "items-end": align === "end",
            "items-stretch": align === "stretch",
            "justify-start": justify === "start",
            "justify-center": justify === "center",
            "justify-end": justify === "end",
            "justify-between": justify === "between",
            "justify-around": justify === "around",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Stack.displayName = "Stack"

export { Stack }
