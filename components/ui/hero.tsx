import React from "react";
import { Button } from "./button";
import { motion } from "motion/react";
import { ArrowRight, Play, Star, Shield, Zap, Globe } from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-violet-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-background/50 backdrop-blur-sm mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-primary animate-ping" />
          <span className="text-xs font-bold uppercase tracking-wider">New: Version 2.0 is live</span>
          <ArrowRight className="h-3 w-3" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-[0.9]"
        >
          Build your SaaS <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-violet-500 to-emerald-500">
            faster than ever.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          The ultimate component library for modern web applications. 
          Accessible, customizable, and ready for production. 
          Stop reinventing the wheel and start building.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Button size="lg" className="h-14 px-8 text-lg rounded-2xl shadow-xl shadow-primary/20 gap-2">
            Get Started Free <ArrowRight className="h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-2xl gap-2">
            <Play className="h-4 w-4 fill-current" /> Watch Demo
          </Button>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="pt-8 border-t border-border/50"
        >
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-8">Trusted by teams at</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all">
            <div className="flex items-center gap-2 font-bold text-xl"><Globe className="h-6 w-6" /> GLOBAL</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Zap className="h-6 w-6" /> FLASH</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Shield className="h-6 w-6" /> SECURE</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Star className="h-6 w-6" /> STELLAR</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
