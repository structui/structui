import { cn } from "@/src/lib/utils";
import React from "react";

interface StepperProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export const Stepper = ({ steps, currentStep, className }: StepperProps) => {
  return (
    <div className={cn("flex items-center w-full", className)}>
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center relative">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium border transition-colors",
                index <= currentStep
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-input"
              )}
            >
              {index + 1}
            </div>
            <span className="absolute -bottom-6 text-[10px] whitespace-nowrap text-muted-foreground font-medium">
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "flex-1 h-[1px] mx-2 transition-colors",
                index < currentStep ? "bg-primary" : "bg-input"
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
