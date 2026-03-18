import React from "react";
import { cn } from "@/src/lib/utils";

// --- Spinners ---

export const Spinner1 = ({ className }: { className?: string }) => (
  <div className={cn("h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent", className)} />
);

export const Spinner2 = ({ className }: { className?: string }) => (
  <div className={cn("h-8 w-8 animate-spin rounded-full border-4 border-dashed border-primary", className)} />
);

export const Spinner3 = ({ className }: { className?: string }) => (
  <div className={cn("relative h-8 w-8", className)}>
    <div className="absolute h-full w-full animate-ping rounded-full bg-primary opacity-75"></div>
    <div className="relative h-full w-full rounded-full bg-primary"></div>
  </div>
);

export const Spinner4 = ({ className }: { className?: string }) => (
  <div className={cn("flex space-x-1", className)}>
    {[0, 1, 2].map((i) => (
      <div key={i} className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: `${i * 0.1}s` }} />
    ))}
  </div>
);

export const Spinner5 = ({ className }: { className?: string }) => (
  <div className={cn("h-8 w-8 animate-pulse rounded-full bg-primary", className)} />
);

export const Spinner6 = ({ className }: { className?: string }) => (
  <div className={cn("h-8 w-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin", className)} />
);

export const Spinner7 = ({ className }: { className?: string }) => (
  <div className={cn("h-8 w-8 flex items-center justify-center", className)}>
    <div className="h-4 w-4 bg-primary animate-ping rounded-full" />
  </div>
);

export const Spinner8 = ({ className }: { className?: string }) => (
  <div className={cn("grid grid-cols-2 gap-1 animate-pulse", className)}>
    {[0, 1, 2, 3].map((i) => (
      <div key={i} className="h-3 w-3 bg-primary rounded-sm" />
    ))}
  </div>
);

export const Spinner9 = ({ className }: { className?: string }) => (
  <div className={cn("h-8 w-8 border-y-2 border-primary rounded-full animate-spin", className)} />
);

export const Spinner10 = ({ className }: { className?: string }) => (
  <div className={cn("h-8 w-8 border-l-2 border-primary rounded-full animate-spin", className)} />
);

// --- Loaders ---

export const Loader1 = ({ className }: { className?: string }) => (
  <div className={cn("h-2 w-full max-w-[200px] overflow-hidden rounded-full bg-muted", className)}>
    <div className="h-full w-1/2 animate-[progress_2s_ease-in-out_infinite] bg-primary rounded-full" />
  </div>
);

export const Loader2 = ({ className }: { className?: string }) => (
  <div className={cn("flex space-x-2", className)}>
    {[0, 1, 2].map((i) => (
      <div key={i} className="h-3 w-3 animate-pulse rounded-full bg-primary" style={{ animationDelay: `${i * 0.2}s` }} />
    ))}
  </div>
);

export const Loader3 = ({ className }: { className?: string }) => (
  <div className={cn("h-1 w-full max-w-[200px] bg-muted overflow-hidden", className)}>
    <div className="h-full bg-primary animate-[loading_1.5s_linear_infinite]" style={{ width: '30%' }} />
  </div>
);

export const Loader4 = ({ className }: { className?: string }) => (
  <div className={cn("relative h-10 w-10 animate-spin", className)}>
    <div className="absolute top-0 left-0 h-4 w-4 rounded-full bg-primary" />
    <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-primary opacity-50" />
  </div>
);

export const Loader5 = ({ className }: { className?: string }) => (
  <div className={cn("h-8 w-8 border-4 border-primary border-b-transparent rounded-full animate-spin", className)} />
);

export const Loader6 = ({ className }: { className?: string }) => (
  <div className={cn("flex items-end space-x-1 h-8", className)}>
    {[0, 1, 2, 3].map((i) => (
      <div key={i} className="w-1 bg-primary animate-[stretch_1s_ease-in-out_infinite]" style={{ height: '40%', animationDelay: `${i * 0.1}s` }} />
    ))}
  </div>
);

export const Loader7 = ({ className }: { className?: string }) => (
  <div className={cn("h-10 w-10 border-4 border-primary/10 border-r-primary rounded-full animate-spin", className)} />
);

export const Loader8 = ({ className }: { className?: string }) => (
  <div className={cn("h-2 w-48 bg-muted rounded-full overflow-hidden", className)}>
    <div className="h-full bg-primary animate-[shimmer_2s_infinite] -translate-x-full" style={{ width: '40%' }} />
  </div>
);

export const Loader9 = ({ className }: { className?: string }) => (
  <div className={cn("h-8 w-8 bg-primary rounded-lg animate-[flip_2s_infinite]", className)} />
);

export const Loader10 = ({ className }: { className?: string }) => (
  <div className={cn("h-10 w-10 border-t-4 border-primary rounded-full animate-spin", className)} />
);
