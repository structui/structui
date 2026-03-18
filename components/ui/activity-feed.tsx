"use client";

import * as React from "react";
import {
  GitBranch,
  GitCommit,
  GitMerge,
  GitPullRequest,
  MessageSquare,
  Star,
  UserCheck,
  Zap,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Badge } from "./badge";

export type ActivityType =
  | "commit"
  | "pull_request"
  | "merge"
  | "comment"
  | "star"
  | "branch"
  | "deploy"
  | "follow";

export interface ActivityActor {
  name: string;
  username: string;
  avatar?: string;
}

export interface ActivityEvent {
  id: string;
  type: ActivityType;
  actor: ActivityActor;
  title: string;
  description?: string;
  meta?: string;
  time: string;
  tags?: string[];
  repo?: string;
}

const ACTIVITY_CONFIG: Record<
  ActivityType,
  { icon: React.ElementType; color: string; bg: string; label: string }
> = {
  commit: { icon: GitCommit, color: "text-blue-500", bg: "bg-blue-500/10", label: "Committed" },
  pull_request: { icon: GitPullRequest, color: "text-violet-500", bg: "bg-violet-500/10", label: "Opened PR" },
  merge: { icon: GitMerge, color: "text-emerald-500", bg: "bg-emerald-500/10", label: "Merged" },
  comment: { icon: MessageSquare, color: "text-slate-500", bg: "bg-slate-500/10", label: "Commented" },
  star: { icon: Star, color: "text-amber-500", bg: "bg-amber-500/10", label: "Starred" },
  branch: { icon: GitBranch, color: "text-cyan-500", bg: "bg-cyan-500/10", label: "Branched" },
  deploy: { icon: Zap, color: "text-orange-500", bg: "bg-orange-500/10", label: "Deployed" },
  follow: { icon: UserCheck, color: "text-pink-500", bg: "bg-pink-500/10", label: "Followed" },
};

interface ActivityItemProps {
  event: ActivityEvent;
  isLast: boolean;
}

function ActivityItem({ event, isLast }: ActivityItemProps) {
  const { icon: Icon, color, bg, label } = ACTIVITY_CONFIG[event.type];

  return (
    <div className="group relative flex gap-3">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[15px] top-8 h-full w-px bg-border/60" />
      )}

      {/* Icon */}
      <div className={cn("relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full", bg)}>
        <Icon className={cn("h-3.5 w-3.5", color)} />
      </div>

      {/* Content */}
      <div className="flex-1 pb-6">
        <div className="flex flex-wrap items-baseline gap-1.5">
          <div className="flex items-center gap-1.5">
            <Avatar className="h-5 w-5">
              <AvatarImage src={event.actor.avatar} />
              <AvatarFallback className="text-[9px] font-bold">
                {event.actor.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-semibold">{event.actor.name}</span>
          </div>
          <span className="text-xs text-muted-foreground">{label.toLowerCase()}</span>
          {event.repo && (
            <span className="rounded-md bg-muted px-1.5 py-0.5 text-[11px] font-medium text-foreground/70">
              {event.repo}
            </span>
          )}
          <span className="ml-auto text-[11px] text-muted-foreground">{event.time}</span>
        </div>

        <div className="mt-1.5 rounded-xl border border-border/70 bg-background/60 p-3 transition-colors group-hover:border-border">
          <p className="text-sm font-medium">{event.title}</p>
          {event.description && (
            <p className="mt-1 text-xs text-muted-foreground">{event.description}</p>
          )}
          {event.meta && (
            <p className="mt-1.5 font-mono text-[11px] text-muted-foreground/70">{event.meta}</p>
          )}
          {event.tags && event.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {event.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="h-4 rounded px-1.5 text-[10px]">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const sampleActivityFeed: ActivityEvent[] = [
  {
    id: "a1",
    type: "pull_request",
    actor: { name: "Alex Chen", username: "alexchen" },
    title: "feat: add notification center component",
    description: "Adds a fully-featured notification center with filters, mark-as-read, and delete actions.",
    meta: "+284 -12 lines · 3 files changed",
    time: "just now",
    tags: ["ui", "component", "new"],
    repo: "structui/structui",
  },
  {
    id: "a2",
    type: "merge",
    actor: { name: "Mina Park", username: "minapark" },
    title: "Merged: feat/registry-foundation into main",
    description: "Registry foundation layer is now live.",
    time: "10 min ago",
    repo: "structui/structui",
  },
  {
    id: "a3",
    type: "commit",
    actor: { name: "Leo Torres", username: "leotorres" },
    title: "fix: resolve hydration mismatch in calendar component",
    meta: "sha: 3f4c9a2",
    time: "42 min ago",
    repo: "structui/structui",
  },
  {
    id: "a4",
    type: "deploy",
    actor: { name: "CI Bot", username: "ci-bot" },
    title: "Deployed structui@1.4.3 → production",
    description: "Build passed. 0 warnings, 0 errors.",
    time: "1 hr ago",
    tags: ["production"],
  },
  {
    id: "a5",
    type: "comment",
    actor: { name: "Sara Lee", username: "saralee" },
    title: "Left a review on PR #42",
    description: "\"Great work on the mobile responsive layout! Left a few nitpicks on spacing.\"",
    time: "2 hr ago",
    repo: "structui/structui",
  },
  {
    id: "a6",
    type: "star",
    actor: { name: "Dev User", username: "devuser" },
    title: "Starred structui/structui",
    time: "3 hr ago",
  },
];

interface ActivityFeedProps {
  events?: ActivityEvent[];
  className?: string;
  title?: string;
  maxItems?: number;
}

export function ActivityFeed({
  events = sampleActivityFeed,
  className,
  title = "Activity",
  maxItems,
}: ActivityFeedProps) {
  const [expanded, setExpanded] = React.useState(false);
  const displayedEvents = maxItems && !expanded ? events.slice(0, maxItems) : events;
  const hasMore = maxItems ? events.length > maxItems : false;

  return (
    <div className={cn("space-y-1", className)}>
      {title && (
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold">{title}</h3>
          <span className="text-xs text-muted-foreground">{events.length} events</span>
        </div>
      )}

      <div>
        {displayedEvents.map((event, index) => (
          <ActivityItem
            key={event.id}
            event={event}
            isLast={index === displayedEvents.length - 1 && (!hasMore || expanded)}
          />
        ))}
      </div>

      {hasMore && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 w-full rounded-xl border border-dashed py-2 text-xs text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
        >
          {expanded ? "Show less" : `Show ${events.length - maxItems!} more events`}
        </button>
      )}
    </div>
  );
}
