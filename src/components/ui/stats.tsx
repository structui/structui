import React from "react";
import { cn } from "@/src/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  description?: string;
  trend?: {
    value: string;
    isUp: boolean;
  };
  icon?: React.ReactNode;
  className?: string;
}

export const StatsCard = ({
  title,
  value,
  description,
  trend,
  icon,
  className,
}: StatsCardProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(description || trend) && (
          <div className="flex items-center gap-2 mt-1">
            {trend && (
              <span
                className={cn(
                  "flex items-center text-xs font-medium",
                  trend.isUp ? "text-emerald-500" : "text-rose-500"
                )}
              >
                {trend.isUp ? (
                  <ArrowUpIcon className="mr-1 h-3 w-3" />
                ) : (
                  <ArrowDownIcon className="mr-1 h-3 w-3" />
                )}
                {trend.value}
              </span>
            )}
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const StatsGrid = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-4", className)}>
      {children}
    </div>
  );
};
