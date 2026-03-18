import { cn } from "@/src/lib/utils";
import { Github, Star, Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getSiteMetrics, SITE_BRAND_NAME, SITE_GITHUB_URL } from "@/src/lib/registry";
import { Button } from "./ui/button";
import { CommandPalette } from "./ui/command-palette";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const siteMetrics = getSiteMetrics();

  const navLinks = [
    { name: "Docs", href: "/docs" },
    { name: "Components", href: "/components" },
    { name: "Blocks", href: "/blocks" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tighter">
              {SITE_BRAND_NAME.replace("UI", "")}<span className="text-primary/60">UI</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <CommandPalette />
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium">{siteMetrics.documentedComponents} docs</span>
            </Button>
            <a
              href={SITE_GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="p-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-b bg-background p-4">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center gap-4 pt-4 border-t">
              <Button variant="ghost" size="sm" className="gap-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium">{siteMetrics.documentedComponents} docs</span>
              </Button>
              <a href={SITE_GITHUB_URL} target="_blank" rel="noreferrer">
                <Github className="h-5 w-5 text-muted-foreground" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
