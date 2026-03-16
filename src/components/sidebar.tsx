import { cn } from "@/src/lib/utils";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  items: {
    title: string;
    items: {
      title: string;
      href: string;
    }[];
  }[];
  className?: string;
}

export const Sidebar = ({ items, className }: SidebarProps) => {
  const location = useLocation();

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        {items.map((section, i) => (
          <div key={i} className="px-3 py-2">
            <h2 className="mb-2 px-4 text-xs font-semibold tracking-widest uppercase text-muted-foreground/70">
              {section.title}
            </h2>
            <div className="space-y-1">
              {section.items.map((item, j) => (
                <Link
                  key={j}
                  to={item.href}
                  className={cn(
                    "group flex items-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                    location.pathname === item.href
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
