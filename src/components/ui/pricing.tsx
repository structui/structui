import React, { useState } from "react";
import { Check, HelpCircle } from "lucide-react";
import { Button } from "./button";
import { Badge } from "./badge";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

interface PricingPlan {
  name: string;
  price: {
    monthly: number;
    yearly: number;
  };
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
}

const plans: PricingPlan[] = [
  {
    name: "Starter",
    price: { monthly: 0, yearly: 0 },
    description: "Perfect for individuals and side projects.",
    features: ["Up to 3 projects", "Basic analytics", "Community support", "1GB storage"],
    buttonText: "Get Started",
  },
  {
    name: "Pro",
    price: { monthly: 29, yearly: 290 },
    description: "Advanced features for growing teams.",
    features: ["Unlimited projects", "Advanced analytics", "Priority support", "10GB storage", "Custom domains", "Team collaboration"],
    isPopular: true,
    buttonText: "Start Free Trial",
  },
  {
    name: "Enterprise",
    price: { monthly: 99, yearly: 990 },
    description: "Custom solutions for large organizations.",
    features: ["Everything in Pro", "Unlimited storage", "Dedicated account manager", "SSO & SAML", "Custom contracts", "24/7 Phone support"],
    buttonText: "Contact Sales",
  },
];

export const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold tracking-tight">Simple, Transparent Pricing</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that's right for you. All plans include a 14-day free trial.
        </p>
        
        <div className="flex items-center justify-center gap-4 pt-4">
          <span className={cn("text-sm font-medium", !isYearly ? "text-foreground" : "text-muted-foreground")}>Monthly</span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="relative w-12 h-6 rounded-full bg-muted border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <motion.div
              animate={{ x: isYearly ? 24 : 0 }}
              className="w-5 h-5 rounded-full bg-primary shadow-sm"
            />
          </button>
          <span className={cn("text-sm font-medium", isYearly ? "text-foreground" : "text-muted-foreground")}>
            Yearly <Badge variant="secondary" className="ml-1 bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Save 20%</Badge>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "relative flex flex-col p-8 rounded-3xl border bg-card transition-all hover:shadow-2xl hover:shadow-primary/5",
              plan.isPopular && "border-primary shadow-xl shadow-primary/5 scale-105 z-10"
            )}
          >
            {plan.isPopular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="px-3 py-1 bg-primary text-primary-foreground">Most Popular</Badge>
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <p className="text-muted-foreground mt-2 text-sm">{plan.description}</p>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">${isYearly ? plan.price.yearly : plan.price.monthly}</span>
                <span className="text-muted-foreground">/{isYearly ? "year" : "month"}</span>
              </div>
            </div>

            <div className="space-y-4 mb-8 flex-1">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3 text-sm">
                  <div className="mt-1 rounded-full bg-emerald-500/10 p-0.5">
                    <Check className="h-3 w-3 text-emerald-500" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <Button 
              variant={plan.isPopular ? "default" : "outline"} 
              className={cn("w-full rounded-xl h-12 text-base font-semibold", plan.isPopular && "shadow-lg shadow-primary/25")}
            >
              {plan.buttonText}
            </Button>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
          <HelpCircle className="h-4 w-4" />
          Have questions? <button className="text-primary font-medium hover:underline">Contact our support team</button>
        </p>
      </div>
    </div>
  );
};
