import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { Floatbar } from "./components/floatbar";
import { HomePage } from "./pages/home";
import { BlocksPage } from "./pages/blocks";
import { ComponentsPage } from "./pages/components";
import { DocsPage } from "./pages/docs";
import { CliPage } from "./pages/docs/cli";
import { ThemingPage } from "./pages/docs/theming";
import { ThemeCreatorPage } from "./pages/theme-creator";
import { R2GoPage } from "./pages/r2go";
import { cn } from "./lib/utils";
import { ToastProvider } from "./components/ui/toast";
import { CookiesBanner } from "./components/ui/cookies-banner";

const App: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark" | "khaki" | "khaki-dark">("dark");

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <Router>
      <ToastProvider>
        <div className={cn(
          "min-h-screen bg-background text-foreground font-sans transition-colors duration-300",
          theme
        )}>
          <Navbar />
          
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/blocks" element={<BlocksPage />} />
              <Route path="/components/*" element={<ComponentsPage />} />
              <Route path="/docs" element={<DocsPage />} />
              <Route path="/docs/cli" element={<CliPage />} />
              <Route path="/docs/theming" element={<ThemingPage />} />
              <Route path="/theme-creator" element={<ThemeCreatorPage />} />
              <Route path="/r2go" element={<R2GoPage />} />
            </Routes>
          </main>

          <Footer />
          <Floatbar />
          <CookiesBanner />

          {/* Theme Switcher (Floating) - Shrunk */}
          <div className="fixed top-20 right-4 z-50 flex flex-col gap-1.5 p-1.5 rounded-full border border-primary/10 bg-background/50 backdrop-blur-md shadow-lg scale-90">
            {(["light", "dark", "khaki", "khaki-dark"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={cn(
                  "w-6 h-6 rounded-full border transition-all",
                  theme === t ? "border-primary scale-110" : "border-transparent opacity-50 hover:opacity-100",
                  t === "light" && "bg-[#f7f8fa]",
                  t === "dark" && "bg-[#0f1115]",
                  t === "khaki" && "bg-[#f5f5dc]",
                  t === "khaki-dark" && "bg-[#2d2d24]"
                )}
                title={t.charAt(0).toUpperCase() + t.slice(1) + " Theme"}
              />
            ))}
          </div>
        </div>
      </ToastProvider>
    </Router>
  );
};

export default App;

