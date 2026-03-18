import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./button";
import { X, Cookie } from "lucide-react";

export const CookiesBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookies-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookies-consent", "true");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookies-consent", "false");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-[400px] z-50"
        >
          <div className="bg-background/80 backdrop-blur-xl border border-primary/10 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-2xl bg-primary/10 text-primary">
                <Cookie className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-2">
                <h4 className="text-sm font-bold tracking-tight">We use cookies</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic.
                </p>
              </div>
              <button onClick={() => setIsVisible(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <Button size="sm" onClick={handleAccept} className="flex-1 rounded-full font-light tracking-wide">
                Accept All
              </Button>
              <Button size="sm" variant="outline" onClick={handleDecline} className="flex-1 rounded-full font-light tracking-wide border-primary/10">
                Reject
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
