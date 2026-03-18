"use client";

import * as React from "react";
import { Bell, Check, CheckCheck, Info, MessageSquare, Star, Trash2, X } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Badge } from "./badge";
import { Button } from "./button";

export type NotificationType = "info" | "success" | "warning" | "mention" | "review" | "system";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  avatar?: string;
  initials?: string;
}

const TYPE_CONFIG: Record<NotificationType, { icon: React.ElementType; color: string; bg: string }> = {
  info: { icon: Info, color: "text-blue-500", bg: "bg-blue-500/10" },
  success: { icon: Check, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  warning: { icon: Star, color: "text-amber-500", bg: "bg-amber-500/10" },
  mention: { icon: MessageSquare, color: "text-violet-500", bg: "bg-violet-500/10" },
  review: { icon: Star, color: "text-orange-500", bg: "bg-orange-500/10" },
  system: { icon: Bell, color: "text-muted-foreground", bg: "bg-muted/40" },
};

interface NotificationItemProps {
  notification: Notification;
  onMarkRead: (id: string) => void;
  onDelete: (id: string) => void;
}

function NotificationItem({ notification, onMarkRead, onDelete }: NotificationItemProps) {
  const { icon: Icon, color, bg } = TYPE_CONFIG[notification.type];

  return (
    <div
      className={cn(
        "group relative flex items-start gap-3 rounded-xl p-3 transition-colors",
        notification.read
          ? "hover:bg-muted/30"
          : "bg-primary/4 hover:bg-primary/6 border border-primary/8",
      )}
    >
      <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full", bg)}>
        <Icon className={cn("h-4 w-4", color)} />
      </div>

      <div className="min-w-0 flex-1 space-y-0.5">
        <div className="flex items-center gap-2">
          <p className={cn("text-sm font-medium leading-none", !notification.read && "text-foreground")}>
            {notification.title}
          </p>
          {!notification.read && (
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          )}
        </div>
        <p className="line-clamp-2 text-xs text-muted-foreground">{notification.message}</p>
        <p className="text-[11px] text-muted-foreground/70">{notification.time}</p>
      </div>

      <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        {!notification.read && (
          <button
            onClick={() => onMarkRead(notification.id)}
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
            aria-label="Mark as read"
          >
            <Check className="h-3.5 w-3.5" />
          </button>
        )}
        <button
          onClick={() => onDelete(notification.id)}
          className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-background hover:text-destructive"
          aria-label="Delete"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

type FilterTab = "all" | "unread" | "mentions";

interface NotificationCenterProps {
  notifications?: Notification[];
  className?: string;
}

const DEFAULT_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "mention",
    title: "Alex mentioned you",
    message: "Hey, can you review the new button variants? Added 3 new states.",
    time: "2 min ago",
    read: false,
  },
  {
    id: "2",
    type: "success",
    title: "Deployment successful",
    message: "structui@1.4.2 was deployed to production without errors.",
    time: "14 min ago",
    read: false,
  },
  {
    id: "3",
    type: "review",
    title: "PR needs your review",
    message: "feat: add notification center component — 3 files changed, +284",
    time: "1 hr ago",
    read: false,
  },
  {
    id: "4",
    type: "info",
    title: "Registry sync complete",
    message: "48 components indexed. 3 new entries added to the catalog.",
    time: "3 hr ago",
    read: true,
  },
  {
    id: "5",
    type: "warning",
    title: "Dependency outdated",
    message: "radix-ui/react-dialog has a new major version available (2.0.0).",
    time: "Yesterday",
    read: true,
  },
  {
    id: "6",
    type: "system",
    title: "System update",
    message: "StructUI design tokens have been refreshed. Rebuild to apply changes.",
    time: "2 days ago",
    read: true,
  },
];

export function NotificationCenter({ notifications: initialNotifications = DEFAULT_NOTIFICATIONS, className }: NotificationCenterProps) {
  const [items, setItems] = React.useState<Notification[]>(initialNotifications);
  const [filter, setFilter] = React.useState<FilterTab>("all");

  const unreadCount = items.filter((n) => !n.read).length;
  const mentionCount = items.filter((n) => n.type === "mention" && !n.read).length;

  const filtered = items.filter((n) => {
    if (filter === "unread") return !n.read;
    if (filter === "mentions") return n.type === "mention";
    return true;
  });

  const markRead = (id: string) =>
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  const markAllRead = () =>
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));

  const deleteItem = (id: string) =>
    setItems((prev) => prev.filter((n) => n.id !== id));

  const tabs: { key: FilterTab; label: string; count?: number }[] = [
    { key: "all", label: "All" },
    { key: "unread", label: "Unread", count: unreadCount },
    { key: "mentions", label: "Mentions", count: mentionCount },
  ];

  return (
    <div className={cn("flex w-full max-w-sm flex-col rounded-2xl border bg-background shadow-xl", className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-foreground" />
          <span className="text-sm font-semibold">Notifications</span>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="h-5 rounded-full px-1.5 text-[11px]">
              {unreadCount}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1">
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 gap-1.5 rounded-lg px-2 text-xs text-muted-foreground"
              onClick={markAllRead}
            >
              <CheckCheck className="h-3.5 w-3.5" />
              Mark all read
            </Button>
          )}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 border-b px-3 py-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-medium transition-colors",
              filter === tab.key
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {tab.label}
            {tab.count !== undefined && tab.count > 0 && (
              <span
                className={cn(
                  "rounded-full px-1.5 text-[10px] font-semibold leading-none py-0.5",
                  filter === tab.key ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted-foreground/15",
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="max-h-80 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <Bell className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">No notifications</p>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {filtered.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkRead={markRead}
                onDelete={deleteItem}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t px-4 py-2.5">
        <button className="w-full rounded-lg py-1 text-center text-xs text-muted-foreground transition-colors hover:text-foreground">
          View all notifications
        </button>
      </div>
    </div>
  );
}
