"use client";

import * as React from "react";
import {
  Building2,
  Github,
  Globe,
  Link2,
  MapPin,
  MessageSquare,
  Twitter,
  UserPlus,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Badge } from "./badge";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

export interface ProfileStat {
  label: string;
  value: string | number;
}

export interface SocialLink {
  type: "github" | "twitter" | "website" | "link";
  href: string;
  label?: string;
}

export interface ProfileCardProps {
  name: string;
  username: string;
  role: string;
  bio?: string;
  avatar?: string;
  location?: string;
  company?: string;
  status?: "online" | "away" | "busy" | "offline";
  skills?: string[];
  stats?: ProfileStat[];
  socials?: SocialLink[];
  className?: string;
  variant?: "default" | "compact" | "horizontal";
  onFollow?: () => void;
  onMessage?: () => void;
}

const STATUS_COLORS: Record<NonNullable<ProfileCardProps["status"]>, string> = {
  online: "bg-emerald-500",
  away: "bg-amber-400",
  busy: "bg-rose-500",
  offline: "bg-muted-foreground/40",
};

const SOCIAL_ICONS: Record<SocialLink["type"], React.ElementType> = {
  github: Github,
  twitter: Twitter,
  website: Globe,
  link: Link2,
};

function SocialButton({ link }: { link: SocialLink }) {
  const Icon = SOCIAL_ICONS[link.type];
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer"
      className="flex h-7 w-7 items-center justify-center rounded-lg border border-border/70 text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
      aria-label={link.label ?? link.type}
    >
      <Icon className="h-3.5 w-3.5" />
    </a>
  );
}

export function ProfileCard({
  name,
  username,
  role,
  bio,
  avatar,
  location,
  company,
  status,
  skills = [],
  stats = [],
  socials = [],
  className,
  variant = "default",
  onFollow,
  onMessage,
}: ProfileCardProps) {
  if (variant === "compact") {
    return (
      <div
        className={cn(
          "flex items-center gap-3 rounded-xl border bg-card p-3 shadow-sm",
          className,
        )}
      >
        <div className="relative shrink-0">
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatar} />
            <AvatarFallback className="text-xs font-semibold">
              {name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {status && (
            <span
              className={cn(
                "absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background",
                STATUS_COLORS[status],
              )}
            />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{name}</p>
          <p className="truncate text-xs text-muted-foreground">@{username}</p>
        </div>
        <Button size="sm" variant="outline" className="h-7 rounded-full px-3 text-xs" onClick={onFollow}>
          Follow
        </Button>
      </div>
    );
  }

  if (variant === "horizontal") {
    return (
      <div
        className={cn(
          "flex gap-6 rounded-2xl border bg-card p-6 shadow-sm",
          className,
        )}
      >
        <div className="relative shrink-0">
          <Avatar className="h-20 w-20">
            <AvatarImage src={avatar} />
            <AvatarFallback className="text-2xl font-bold">
              {name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {status && (
            <span
              className={cn(
                "absolute bottom-1 right-1 h-3 w-3 rounded-full border-2 border-background",
                STATUS_COLORS[status],
              )}
            />
          )}
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold">{name}</h3>
              <span className="text-sm text-muted-foreground">@{username}</span>
            </div>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
          {bio && <p className="text-sm text-muted-foreground">{bio}</p>}
          {stats.length > 0 && (
            <div className="flex gap-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-base font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex shrink-0 flex-col gap-2">
          {onFollow && (
            <Button size="sm" className="rounded-full" onClick={onFollow}>
              <UserPlus className="mr-1.5 h-3.5 w-3.5" />
              Follow
            </Button>
          )}
          {onMessage && (
            <Button size="sm" variant="outline" className="rounded-full" onClick={onMessage}>
              <MessageSquare className="mr-1.5 h-3.5 w-3.5" />
              Message
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden rounded-2xl border bg-card shadow-sm", className)}>
      {/* Cover */}
      <div className="h-24 bg-gradient-to-br from-primary/20 via-primary/10 to-background" />

      <div className="px-5 pb-5">
        {/* Avatar row */}
        <div className="-mt-10 mb-4 flex items-end justify-between">
          <div className="relative">
            <Avatar className="h-16 w-16 ring-4 ring-background">
              <AvatarImage src={avatar} />
              <AvatarFallback className="text-xl font-bold">
                {name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {status && (
              <span
                className={cn(
                  "absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-full border-2 border-background",
                  STATUS_COLORS[status],
                )}
              />
            )}
          </div>
          <div className="flex gap-2">
            {onMessage && (
              <Button size="sm" variant="outline" className="h-8 rounded-full px-3" onClick={onMessage}>
                <MessageSquare className="h-3.5 w-3.5" />
              </Button>
            )}
            {onFollow && (
              <Button size="sm" className="h-8 rounded-full px-3" onClick={onFollow}>
                <UserPlus className="mr-1.5 h-3.5 w-3.5" />
                Follow
              </Button>
            )}
          </div>
        </div>

        {/* Identity */}
        <div className="mb-3 space-y-0.5">
          <h3 className="text-base font-bold leading-tight">{name}</h3>
          <p className="text-xs text-muted-foreground">@{username}</p>
          <p className="text-sm font-medium text-foreground/80">{role}</p>
        </div>

        {bio && <p className="mb-3 text-sm leading-relaxed text-muted-foreground">{bio}</p>}

        {/* Meta */}
        {(location || company) && (
          <div className="mb-3 flex flex-wrap gap-3">
            {company && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Building2 className="h-3.5 w-3.5" />
                {company}
              </div>
            )}
            {location && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                {location}
              </div>
            )}
          </div>
        )}

        {/* Stats */}
        {stats.length > 0 && (
          <div className="mb-4 grid grid-cols-3 gap-px overflow-hidden rounded-xl border">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={cn(
                  "flex flex-col items-center py-2.5 text-center",
                  i < stats.length - 1 && "border-r",
                )}
              >
                <span className="text-base font-bold leading-none">{stat.value}</span>
                <span className="mt-0.5 text-[11px] text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="rounded-full px-2.5 py-0.5 text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        )}

        {/* Socials */}
        {socials.length > 0 && (
          <div className="flex gap-2">
            {socials.map((link, i) => (
              <SocialButton key={i} link={link} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
