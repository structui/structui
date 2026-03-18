import React from "react";
import { cn } from "@/src/lib/utils";
import { Check, Circle, Clock, AlertCircle, User, Package, CreditCard } from "lucide-react";

interface TimelineItem {
  id: string;
  title: string;
  description: string;
  time: string;
  status: "completed" | "current" | "pending" | "error";
  icon?: React.ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export const Timeline = ({ items, className }: TimelineProps) => {
  return (
    <div className={cn("space-y-8", className)}>
      {items.map((item, index) => (
        <div key={item.id} className="relative flex gap-6 group">
          {/* Vertical Line */}
          {index !== items.length - 1 && (
            <div className="absolute left-[19px] top-10 bottom-[-32px] w-px bg-border group-hover:bg-primary/30 transition-colors" />
          )}

          {/* Icon Container */}
          <div className={cn(
            "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-background shadow-sm transition-all group-hover:scale-110",
            item.status === "completed" && "border-emerald-500/50 bg-emerald-50 text-emerald-600",
            item.status === "current" && "border-primary bg-primary/5 text-primary ring-4 ring-primary/10",
            item.status === "error" && "border-destructive/50 bg-destructive/5 text-destructive",
            item.status === "pending" && "border-muted-foreground/30 bg-muted/50 text-muted-foreground"
          )}>
            {item.icon || (
              item.status === "completed" ? <Check className="h-5 w-5" /> :
                item.status === "current" ? <Clock className="h-5 w-5" /> :
                  item.status === "error" ? <AlertCircle className="h-5 w-5" /> :
                    <Circle className="h-3 w-3 fill-current" />
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col gap-1 pt-1">
            <div className="flex items-center gap-2">
              <h4 className={cn(
                "text-sm font-semibold tracking-tight",
                item.status === "current" && "text-primary"
              )}>
                {item.title}
              </h4>
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                {item.time}
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Example usage data
export const activityLog: TimelineItem[] = [
  {
    id: "1",
    title: "Project Milestone Reached",
    description: "The 'SaaS Dashboard' phase has been successfully completed and deployed to production.",
    time: "2h ago",
    status: "completed",
    icon: <Package className="h-5 w-5" />
  },
  {
    id: "2",
    title: "New Team Member Joined",
    description: "Sarah Jenkins has joined the 'Design' team as a Senior Product Designer.",
    time: "5h ago",
    status: "completed",
    icon: <User className="h-5 w-5" />
  },
  {
    id: "3",
    title: "System Update in Progress",
    description: "Deploying version 2.4.0 to the staging environment. Expected completion in 15 minutes.",
    time: "Just now",
    status: "current",
    icon: <Clock className="h-5 w-5" />
  },
  {
    id: "4",
    title: "Subscription Payment Failed",
    description: "Payment for 'Enterprise Plan' (Invoice #8821) was declined by the bank.",
    time: "1d ago",
    status: "error",
    icon: <CreditCard className="h-5 w-5" />
  },
  {
    id: "5",
    title: "Scheduled Maintenance",
    description: "Database optimization and backup scheduled for Saturday at 02:00 AM UTC.",
    time: "In 2 days",
    status: "pending",
  }
];
