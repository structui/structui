import { CircleCheck } from "lucide-react";

interface SchemeMetadataGridProps {
  title?: string;
  items: string[];
  columns?: string;
  className?: string;
}

export function SchemeMetadataGrid({
  title,
  items,
  columns = "sm:grid-cols-2",
  className,
}: SchemeMetadataGridProps) {
  return (
    <article className={`space-y-4 border border-border/70 bg-card/50 p-5 ${className ?? ""}`}>
      {title ? <h2 className="text-base font-semibold">{title}</h2> : null}
      <div className={`grid gap-2 ${columns}`}>
        {items.map((entry) => (
          <div key={entry} className="flex items-center gap-2 border border-border/70 bg-background/80 px-3 py-2 text-sm">
            <CircleCheck className="h-3.5 w-3.5 text-primary" />
            {entry}
          </div>
        ))}
      </div>
    </article>
  );
}
