"use client";

import * as React from "react";
import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Button } from "./button";
import { Badge } from "./badge";

export interface FormStep {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  optional?: boolean;
}

interface MultiStepFormContextValue {
  steps: FormStep[];
  currentStep: number;
  completedSteps: Set<number>;
  goToStep: (index: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  markCompleted: (index: number) => void;
}

const MultiStepFormContext = React.createContext<MultiStepFormContextValue | null>(null);

function useMultiStepForm() {
  const ctx = React.useContext(MultiStepFormContext);
  if (!ctx) throw new Error("useMultiStepForm must be used inside MultiStepForm");
  return ctx;
}

// ─── Step Indicator ────────────────────────────────────────────────────────────

interface StepIndicatorProps {
  variant?: "horizontal" | "vertical";
  className?: string;
}

export function MultiStepFormIndicator({ variant = "horizontal", className }: StepIndicatorProps) {
  const { steps, currentStep, completedSteps, goToStep } = useMultiStepForm();

  if (variant === "vertical") {
    return (
      <div className={cn("flex flex-col gap-1", className)}>
        {steps.map((step, index) => {
          const isCompleted = completedSteps.has(index);
          const isCurrent = currentStep === index;
          const isPast = index < currentStep;

          return (
            <button
              key={step.id}
              onClick={() => goToStep(index)}
              disabled={!isPast && !isCurrent && !completedSteps.has(index - 1)}
              className={cn(
                "group flex items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                isCurrent && "bg-primary/8",
                !isCurrent && "hover:bg-muted/40",
              )}
            >
              <div
                className={cn(
                  "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-all",
                  isCompleted && "border-emerald-500 bg-emerald-500 text-white",
                  isCurrent && !isCompleted && "border-primary bg-primary text-primary-foreground",
                  !isCurrent && !isCompleted && "border-border text-muted-foreground",
                )}
              >
                {isCompleted ? <Check className="h-3 w-3" /> : index + 1}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p
                    className={cn(
                      "text-sm font-medium",
                      isCurrent ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {step.title}
                  </p>
                  {step.optional && (
                    <Badge variant="outline" className="h-4 rounded px-1 text-[10px]">
                      Optional
                    </Badge>
                  )}
                </div>
                {step.description && (
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center", className)}>
      {steps.map((step, index) => {
        const isCompleted = completedSteps.has(index);
        const isCurrent = currentStep === index;

        return (
          <React.Fragment key={step.id}>
            <button
              onClick={() => goToStep(index)}
              className="flex flex-col items-center gap-1.5"
            >
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-all",
                  isCompleted && "border-emerald-500 bg-emerald-500 text-white",
                  isCurrent && !isCompleted && "border-primary bg-primary text-primary-foreground",
                  !isCurrent && !isCompleted && "border-border bg-background text-muted-foreground",
                )}
              >
                {isCompleted ? <Check className="h-3.5 w-3.5" /> : index + 1}
              </div>
              <span
                className={cn(
                  "text-xs font-medium",
                  isCurrent ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {step.title}
              </span>
            </button>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "mx-2 mb-5 h-px flex-1 transition-colors",
                  completedSteps.has(index) ? "bg-emerald-500" : "bg-border",
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── Progress Bar ───────────────────────────────────────────────────────────────

export function MultiStepFormProgress({ className }: { className?: string }) {
  const { steps, currentStep, completedSteps } = useMultiStepForm();
  const progress = Math.round(((completedSteps.size) / steps.length) * 100);

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Step {currentStep + 1} of {steps.length}
        </span>
        <span>{progress}% complete</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

// ─── Step Content ───────────────────────────────────────────────────────────────

interface StepContentProps {
  step: number;
  children: React.ReactNode;
}

export function MultiStepFormStepContent({ step, children }: StepContentProps) {
  const { currentStep } = useMultiStepForm();
  if (currentStep !== step) return null;
  return <>{children}</>;
}

// ─── Navigation ─────────────────────────────────────────────────────────────────

interface NavigationProps {
  onComplete?: () => void;
  completeLabel?: string;
  className?: string;
  nextLabel?: string;
  prevLabel?: string;
  disableNext?: boolean;
}

export function MultiStepFormNavigation({
  onComplete,
  completeLabel = "Complete",
  nextLabel = "Continue",
  prevLabel = "Back",
  className,
  disableNext = false,
}: NavigationProps) {
  const { steps, currentStep, nextStep, prevStep, markCompleted } = useMultiStepForm();
  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;

  const handleNext = () => {
    markCompleted(currentStep);
    if (isLast) {
      onComplete?.();
    } else {
      nextStep();
    }
  };

  return (
    <div className={cn("flex items-center justify-between gap-3", className)}>
      <Button
        variant="outline"
        onClick={prevStep}
        disabled={isFirst}
        className="rounded-full"
      >
        {prevLabel}
      </Button>
      <Button
        onClick={handleNext}
        disabled={disableNext}
        className="rounded-full"
      >
        {isLast ? completeLabel : nextLabel}
        {!isLast && <ChevronRight className="ml-1.5 h-4 w-4" />}
      </Button>
    </div>
  );
}

// ─── Root ────────────────────────────────────────────────────────────────────────

interface MultiStepFormProps {
  steps: FormStep[];
  initialStep?: number;
  children: React.ReactNode;
  className?: string;
}

export function MultiStepForm({ steps, initialStep = 0, children, className }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = React.useState(initialStep);
  const [completedSteps, setCompletedSteps] = React.useState<Set<number>>(new Set());

  const goToStep = (index: number) => {
    if (index >= 0 && index < steps.length) {
      setCurrentStep(index);
    }
  };

  const nextStep = () => goToStep(currentStep + 1);
  const prevStep = () => goToStep(currentStep - 1);

  const markCompleted = (index: number) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  };

  return (
    <MultiStepFormContext.Provider
      value={{ steps, currentStep, completedSteps, goToStep, nextStep, prevStep, markCompleted }}
    >
      <div className={cn("space-y-6", className)}>{children}</div>
    </MultiStepFormContext.Provider>
  );
}

// ─── Preset: Full Wizard Layout ──────────────────────────────────────────────────

interface WizardStep {
  id: string;
  title: string;
  description?: string;
  optional?: boolean;
  content: React.ReactNode;
}

interface FormWizardProps {
  steps: WizardStep[];
  onComplete?: () => void;
  className?: string;
  layout?: "stacked" | "sidebar";
}

export function FormWizard({ steps, onComplete, className, layout = "stacked" }: FormWizardProps) {
  const formSteps: FormStep[] = steps.map(({ id, title, description, optional }) => ({
    id,
    title,
    description,
    optional,
  }));

  if (layout === "sidebar") {
    return (
      <MultiStepForm steps={formSteps} className={className}>
        <div className="grid gap-8 md:grid-cols-[220px_1fr]">
          <div className="space-y-4">
            <MultiStepFormProgress />
            <MultiStepFormIndicator variant="vertical" />
          </div>
          <div className="space-y-6">
            {steps.map((step, index) => (
              <MultiStepFormStepContent key={step.id} step={index}>
                <div className="space-y-1 pb-4">
                  <h3 className="text-base font-semibold">{step.title}</h3>
                  {step.description && (
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  )}
                </div>
                {step.content}
              </MultiStepFormStepContent>
            ))}
            <MultiStepFormNavigation onComplete={onComplete} />
          </div>
        </div>
      </MultiStepForm>
    );
  }

  return (
    <MultiStepForm steps={formSteps} className={className}>
      <MultiStepFormProgress />
      <MultiStepFormIndicator />
      {steps.map((step, index) => (
        <MultiStepFormStepContent key={step.id} step={index}>
          <div className="space-y-1 pb-2">
            <h3 className="text-base font-semibold">{step.title}</h3>
            {step.description && (
              <p className="text-sm text-muted-foreground">{step.description}</p>
            )}
          </div>
          {step.content}
        </MultiStepFormStepContent>
      ))}
      <MultiStepFormNavigation onComplete={onComplete} />
    </MultiStepForm>
  );
}
