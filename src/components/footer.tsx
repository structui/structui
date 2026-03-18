import { cn } from "@/src/lib/utils";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t bg-background/50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold tracking-tighter">
                Struct<span className="text-primary/60">UI</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              A modern, minimal UI system built for React and Next.js.
              Focused on structure, minimalism, and performance.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/docs" className="hover:text-primary transition-colors">Documentation</Link></li>
              <li><Link to="/components" className="hover:text-primary transition-colors">Components</Link></li>
              <li><Link to="/blocks" className="hover:text-primary transition-colors">Blocks</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="https://github.com" className="hover:text-primary transition-colors">GitHub</a></li>
              <li><a href="https://twitter.com" className="hover:text-primary transition-colors">Twitter</a></li>
              <li><a href="https://discord.com" className="hover:text-primary transition-colors">Discord</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} StructUI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
