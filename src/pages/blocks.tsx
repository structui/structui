import React, { useState } from "react";
import { Container } from "@/src/components/layout/container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { 
  Github, 
  Mail, 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Activity, 
  DollarSign,
  CheckCircle2,
  ArrowRight,
  Star,
  MessageSquare,
  HelpCircle,
  Phone,
  MapPin,
  Globe,
  ShoppingBag,
  Search,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
  Zap,
  BarChart3,
  Layers,
  Smartphone,
  Laptop,
  Monitor,
  Heart,
  Share2,
  Clock,
  Calendar as CalendarIcon,
  Filter,
  Plus,
  Minus,
  Trash2
} from "lucide-react";
import { StatsCard, StatsGrid } from "@/src/components/ui/stats";
import { AreaChartComponent, BarChartComponent } from "@/src/components/ui/charts";

import { KanbanBoard } from "@/src/components/ui/kanban";
import { Calendar } from "@/src/components/ui/calendar";

import { Badge } from "@/src/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { DataTableAdvanced } from "@/src/components/ui/data-table-advanced";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";

import { Hero } from "@/src/components/ui/hero";
import { Pricing } from "@/src/components/ui/pricing";
import { Timeline, activityLog } from "@/src/components/ui/timeline";
import { useToast } from "@/src/components/ui/toast";
import { Snippet } from "@/src/components/ui/snippet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/src/components/ui/accordion";
import { motion } from "motion/react";

// ─── Block Section Wrapper ────────────────────────────────────────────────────
const BlockSection = ({
  title,
  code,
  category,
  children,
  noPad = false,
}: {
  title: string;
  code: string;
  category?: string;
  children: React.ReactNode;
  noPad?: boolean;
}) => {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          {category && <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-0.5">{category}</p>}
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        </div>
        <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-0.5">
          <button
            onClick={() => setTab("preview")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${tab === "preview" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Preview
          </button>
          <button
            onClick={() => setTab("code")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${tab === "code" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Code
          </button>
        </div>
      </div>

      {tab === "preview" ? (
        <div className={`border rounded-2xl overflow-hidden bg-muted/5 ${noPad ? "" : "p-8"}`}>
          {children}
        </div>
      ) : (
        <Snippet
          code={code}
          language="tsx"
          filename={`${title.toLowerCase().replace(/\s+/g, "-")}.tsx`}
        />
      )}
    </motion.div>
  );
};

export const BlocksPage = () => {
  const { toast } = useToast();

  return (
    <div className="py-12">
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Blocks</h1>
          <p className="text-muted-foreground">Ready-to-use UI blocks for your next project.</p>
        </div>

        <div className="space-y-20">
          {/* Interactive Notifications */}
          <BlockSection
            title="Toast Notifications"
            category="Feedback"
            code={`import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";

export function ToastDemo() {
  const { toast } = useToast();
  return (
    <div className="flex flex-wrap gap-4">
      <Button
        className="bg-emerald-500 hover:bg-emerald-600 text-white"
        onClick={() => toast({ title: "Success!", description: "Changes saved.", type: "success" })}
      >Success Toast</Button>
      <Button
        variant="destructive"
        onClick={() => toast({ title: "Error", description: "Something went wrong.", type: "error" })}
      >Error Toast</Button>
      <Button
        variant="outline"
        onClick={() => toast({ title: "Information", description: "Update available.", type: "info" })}
      >Info Toast</Button>
      <Button
        className="bg-amber-500 hover:bg-amber-600 text-white"
        onClick={() => toast({ title: "Warning", description: "Subscription expires in 3 days.", type: "warning" })}
      >Warning Toast</Button>
    </div>
  );
}`}
          >
            <div className="flex flex-wrap justify-center gap-4">
              <Button onClick={() => toast({ title: "Success!", description: "Your changes have been saved successfully.", type: "success" })} className="bg-emerald-500 hover:bg-emerald-600 text-white">Success Toast</Button>
              <Button onClick={() => toast({ title: "Error", description: "Something went wrong. Please try again.", type: "error" })} variant="destructive">Error Toast</Button>
              <Button onClick={() => toast({ title: "Information", description: "A new update is available for your account.", type: "info" })} variant="outline">Info Toast</Button>
              <Button onClick={() => toast({ title: "Warning", description: "Your subscription will expire in 3 days.", type: "warning" })} className="bg-amber-500 hover:bg-amber-600 text-white">Warning Toast</Button>
            </div>
          </BlockSection>

          {/* Split Hero Section */}
          <BlockSection
            title="Split Hero Section"
            category="Marketing"
            noPad
            code={`import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function SplitHero() {
  return (
    <div className="grid lg:grid-cols-2 min-h-[600px] border rounded-3xl overflow-hidden">
      <div className="p-12 lg:p-24 flex flex-col justify-center space-y-8">
        <Badge variant="outline" className="w-fit px-4 py-1 rounded-full border-primary/20 text-primary">
          New Release v2.0
        </Badge>
        <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter leading-[0.9]">
          Build faster with <span className="text-primary">StructUI</span>.
        </h1>
        <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-md">
          A comprehensive library of modern, accessible components.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button size="lg" className="rounded-full px-8">Get Started</Button>
          <Button size="lg" variant="outline" className="rounded-full px-8">View Docs</Button>
        </div>
        <div className="flex items-center gap-4 pt-8 border-t">
          <div className="flex -space-x-3">
            {[1,2,3,4].map(i => (
              <Avatar key={i} className="border-2 border-background w-10 h-10">
                <AvatarImage src={\`https://i.pravatar.cc/150?u=\${i}\`} />
                <AvatarFallback>U{i}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Joined by <span className="font-bold text-foreground">10k+</span> developers
          </p>
        </div>
      </div>
      <div className="bg-muted relative overflow-hidden hidden lg:block">
        <img src="https://picsum.photos/seed/dashboard/1200/1200" alt="Preview"
          className="absolute inset-0 w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent" />
      </div>
    </div>
  );
}`}
          >
            <div className="border rounded-[2.5rem] overflow-hidden bg-background grid lg:grid-cols-2 min-h-[600px]">
              <div className="p-12 lg:p-24 flex flex-col justify-center space-y-8">
                <Badge variant="outline" className="w-fit px-4 py-1 rounded-full border-primary/20 text-primary">New Release v2.0</Badge>
                <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter leading-[0.9]">Build faster with <span className="text-primary">StructUI</span>.</h1>
                <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-md">
                  A comprehensive library of modern, accessible components designed for enterprise-grade applications.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="rounded-full px-8">Get Started</Button>
                  <Button size="lg" variant="outline" className="rounded-full px-8">View Docs</Button>
                </div>
                <div className="flex items-center gap-4 pt-8 border-t">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(i => (
                      <Avatar key={i} className="border-2 border-background w-10 h-10">
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${i}`} />
                        <AvatarFallback>U{i}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Joined by <span className="font-bold text-foreground">10k+</span> developers</p>
                </div>
              </div>
              <div className="bg-muted relative overflow-hidden hidden lg:block">
                <img 
                  src="https://picsum.photos/seed/dashboard/1200/1200" 
                  alt="Dashboard Preview" 
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent" />
              </div>
            </div>
          </BlockSection>

          {/* Feature Grid Block */}
          <BlockSection
            title="Feature Grid"
            category="Marketing"
            code={`import { Zap, ShieldCheck, Layers, Smartphone, Monitor, CheckCircle2 } from "lucide-react";

const features = [
  { title: "Lightning Fast", desc: "Optimized for performance with zero-runtime CSS.", icon: <Zap /> },
  { title: "Fully Accessible", desc: "Built on Radix UI with WAI-ARIA compliance.", icon: <ShieldCheck /> },
  { title: "Highly Modular", desc: "Compose and customize components to fit your brand.", icon: <Layers /> },
];

export function FeatureGrid() {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {features.map((feature, i) => (
        <div key={i} className="p-8 border rounded-3xl bg-muted/5 space-y-4 hover:border-primary/50 transition-colors group">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            {feature.icon}
          </div>
          <h4 className="text-xl font-bold tracking-tight">{feature.title}</h4>
          <p className="text-muted-foreground font-light leading-relaxed">{feature.desc}</p>
        </div>
      ))}
    </div>
  );
}`}
          >
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Lightning Fast", desc: "Optimized for performance with zero-runtime CSS and minimal bundle size.", icon: <Zap className="h-6 w-6" /> },
                { title: "Fully Accessible", desc: "Built on top of Radix UI primitives with full WAI-ARIA compliance.", icon: <ShieldCheck className="h-6 w-6" /> },
                { title: "Highly Modular", desc: "Easily compose and customize components to fit your brand identity.", icon: <Layers className="h-6 w-6" /> },
                { title: "Responsive Design", desc: "Mobile-first approach ensures your app looks great on any device.", icon: <Smartphone className="h-6 w-6" /> },
                { title: "Dark Mode Ready", desc: "First-class support for dark mode with seamless theme switching.", icon: <Monitor className="h-6 w-6" /> },
                { title: "Type Safe", desc: "Written in TypeScript for a robust and predictable developer experience.", icon: <CheckCircle2 className="h-6 w-6" /> }
              ].map((feature, i) => (
                <div key={i} className="p-8 border rounded-3xl bg-muted/5 space-y-4 hover:border-primary/50 transition-colors group">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-bold tracking-tight">{feature.title}</h4>
                  <p className="text-muted-foreground font-light leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </BlockSection>

          {/* Testimonials Grid Block */}
          <BlockSection
            title="Testimonials Grid"
            category="Marketing"
            code={`import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Sarah Chen", role: "CTO at TechFlow", text: "StructUI has completely transformed our development workflow." },
  { name: "Marcus Thorne", role: "Lead Designer", text: "Finally a UI library that understands design." },
  { name: "Elena Rodriguez", role: "Senior Frontend Engineer", text: "The accessibility features are a lifesaver." },
];

export function TestimonialsGrid() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {testimonials.map((t, i) => (
        <Card key={i} className="rounded-3xl border-none bg-muted/5">
          <CardContent className="p-8 space-y-6">
            <div className="flex gap-1 text-amber-500">
              {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 fill-current" />)}
            </div>
            <p className="text-lg font-light italic">"{t.text}"</p>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={\`https://i.pravatar.cc/150?u=\${t.name}\`} />
                <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-bold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}`}
          >
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Sarah Chen", role: "CTO at TechFlow", text: "StructUI has completely transformed our development workflow. The components are incredibly well-built and easy to customize." },
                { name: "Marcus Thorne", role: "Lead Designer", text: "Finally a UI library that understands design. The attention to detail in the animations and spacing is top-notch." },
                { name: "Elena Rodriguez", role: "Senior Frontend Engineer", text: "The accessibility features are a lifesaver. We were able to achieve full compliance in record time thanks to StructUI." }
              ].map((t, i) => (
                <Card key={i} className="rounded-3xl border-none bg-muted/5">
                  <CardContent className="p-8 space-y-6">
                    <div className="flex gap-1 text-amber-500">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-4 w-4 fill-current" />)}
                    </div>
                    <p className="text-lg font-light italic leading-relaxed">"{t.text}"</p>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${t.name}`} />
                        <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-bold">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </BlockSection>

          {/* FAQ Accordion Block */}
          <BlockSection
            title="FAQ Section"
            category="Marketing"
            code={`import { ChevronRight } from "lucide-react";

const faqs = [
  { q: "Is it free for commercial use?", a: "Yes, StructUI is MIT licensed." },
  { q: "Does it support React Server Components?", a: "Yes, all components work with RSC and Next.js App Router." },
];

export function FAQSection() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <p className="text-muted-foreground">Everything you need to know about StructUI.</p>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="border rounded-2xl overflow-hidden">
            <button className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/5 transition-colors group">
              <span className="font-medium">{faq.q}</span>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-focus:rotate-90 transition-transform" />
            </button>
            <div className="px-6 pb-6 text-muted-foreground font-light leading-relaxed">
              {faq.a}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`}
          >
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
                <p className="text-muted-foreground">Everything you need to know about StructUI.</p>
              </div>
              <div className="space-y-4">
                {[
                  { q: "Is it free for commercial use?", a: "Yes, StructUI is licensed under MIT and is free for both personal and commercial projects." },
                  { q: "Does it support React Server Components?", a: "Absolutely. All our components are designed to work seamlessly with RSC and Next.js App Router." },
                  { q: "How do I customize the theme?", a: "You can easily customize the theme using CSS variables or our built-in theming system." },
                  { q: "Is there a Figma file available?", a: "Yes, we provide a comprehensive Figma library for designers to maintain consistency." }
                ].map((faq, i) => (
                  <div key={i} className="border rounded-2xl overflow-hidden">
                    <button className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/5 transition-colors group">
                      <span className="font-medium">{faq.q}</span>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-focus:rotate-90 transition-transform" />
                    </button>
                    <div className="px-6 pb-6 text-muted-foreground font-light leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </BlockSection>

          {/* Contact Form Block */}
          <BlockSection
            title="Contact Form"
            category="Marketing"
            noPad
            code={`import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

export function ContactForm() {
  return (
    <div className="grid lg:grid-cols-2 border rounded-[2.5rem] overflow-hidden bg-background">
      <div className="p-12 lg:p-24 bg-primary text-primary-foreground space-y-12">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold tracking-tight">Let's talk.</h2>
          <p className="text-primary-foreground/70 text-lg font-light">Have a question or want to work together?</p>
        </div>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
              <Mail className="h-5 w-5" />
            </div>
            <span>hello@structui.com</span>
          </div>
        </div>
      </div>
      <div className="p-12 lg:p-24 space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">First Name</label>
            <Input placeholder="John" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Last Name</label>
            <Input placeholder="Doe" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <Input placeholder="john@example.com" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Message</label>
          <Textarea placeholder="How can we help you?" className="min-h-[150px]" />
        </div>
        <Button className="w-full h-12 text-lg">Send Message</Button>
      </div>
    </div>
  );
}`}
          >
            <div className="grid lg:grid-cols-2 border rounded-[2.5rem] overflow-hidden bg-background">
              <div className="p-12 lg:p-24 bg-primary text-primary-foreground space-y-12">
                <div className="space-y-4">
                  <h2 className="text-4xl font-bold tracking-tight">Let's talk.</h2>
                  <p className="text-primary-foreground/70 text-lg font-light">Have a question or want to work together? We'd love to hear from you.</p>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                      <Mail className="h-5 w-5" />
                    </div>
                    <span>hello@structui.com</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                      <Phone className="h-5 w-5" />
                    </div>
                    <span>+1 (555) 000-0000</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <span>123 Design St, San Francisco, CA</span>
                  </div>
                </div>
                <div className="flex gap-4 pt-12">
                  {[Github, Globe, MessageSquare].map((Icon, i) => (
                    <Button key={i} variant="ghost" size="icon" className="rounded-full bg-white/10 hover:bg-white/20">
                      <Icon className="h-5 w-5" />
                    </Button>
                  ))}
                </div>
              </div>
              <div className="p-12 lg:p-24 space-y-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <Input placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <Input placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea placeholder="How can we help you?" className="min-h-[150px]" />
                </div>
                <Button className="w-full h-12 text-lg">Send Message</Button>
              </div>
            </div>
          </BlockSection>

          {/* Newsletter Block */}
          <BlockSection
            title="Newsletter Section"
            category="Marketing"
            code={`import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
  return (
    <div className="p-16 border rounded-[3rem] bg-muted/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full -ml-32 -mb-32" />
      <div className="max-w-2xl mx-auto text-center space-y-8 relative z-10">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold tracking-tight">Stay in the loop.</h2>
          <p className="text-muted-foreground text-lg font-light">
            Get the latest updates delivered to your inbox.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input placeholder="Enter your email" className="h-12 rounded-full px-6" />
          <Button className="h-12 rounded-full px-8">Subscribe</Button>
        </div>
        <p className="text-xs text-muted-foreground">
          We care about your data. Read our <span className="underline cursor-pointer">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
}`}
          >
            <div className="p-16 border rounded-[3rem] bg-muted/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full -ml-32 -mb-32" />
              <div className="max-w-2xl mx-auto text-center space-y-8 relative z-10">
                <div className="space-y-4">
                  <h2 className="text-4xl font-bold tracking-tight">Stay in the loop.</h2>
                  <p className="text-muted-foreground text-lg font-light">Get the latest updates, components, and design tips delivered straight to your inbox.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input placeholder="Enter your email" className="h-12 rounded-full px-6" />
                  <Button className="h-12 rounded-full px-8">Subscribe</Button>
                </div>
                <p className="text-xs text-muted-foreground">We care about your data. Read our <span className="underline cursor-pointer">Privacy Policy</span>.</p>
              </div>
            </div>
          </BlockSection>

          {/* E-commerce Product Grid Block */}
          <BlockSection
            title="Product Grid"
            category="E-commerce"
            code={`import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag } from "lucide-react";

const products = [
  { name: "Premium Hoodie", price: "$89.00", category: "Apparel", img: "https://picsum.photos/seed/hoodie/600/800" },
  { name: "Minimalist Watch", price: "$149.00", category: "Accessories", img: "https://picsum.photos/seed/watch/600/800" },
  { name: "Leather Backpack", price: "$199.00", category: "Travel", img: "https://picsum.photos/seed/backpack/600/800" },
  { name: "Wireless Earbuds", price: "$129.00", category: "Tech", img: "https://picsum.photos/seed/earbuds/600/800" },
];

export function ProductGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product, i) => (
        <div key={i} className="group space-y-4">
          <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-muted relative">
            <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute top-4 right-4">
              <Button size="icon" variant="secondary" className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
            <div className="absolute bottom-4 left-4 right-4 translate-y-12 group-hover:translate-y-0 transition-transform duration-300">
              <Button className="w-full rounded-full gap-2">
                <ShoppingBag className="h-4 w-4" /> Add to Cart
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-widest">{product.category}</p>
            <div className="flex justify-between items-center">
              <h4 className="font-bold">{product.name}</h4>
              <p className="font-medium">{product.price}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}`}
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "Premium Hoodie", price: "$89.00", category: "Apparel", img: "https://picsum.photos/seed/hoodie/600/800" },
                { name: "Minimalist Watch", price: "$149.00", category: "Accessories", img: "https://picsum.photos/seed/watch/600/800" },
                { name: "Leather Backpack", price: "$199.00", category: "Travel", img: "https://picsum.photos/seed/backpack/600/800" },
                { name: "Wireless Earbuds", price: "$129.00", category: "Tech", img: "https://picsum.photos/seed/earbuds/600/800" }
              ].map((product, i) => (
                <div key={i} className="group space-y-4">
                  <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-muted relative">
                    <img 
                      src={product.img} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4">
                      <Button size="icon" variant="secondary" className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 translate-y-12 group-hover:translate-y-0 transition-transform duration-300">
                      <Button className="w-full rounded-full gap-2">
                        <ShoppingBag className="h-4 w-4" /> Add to Cart
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">{product.category}</p>
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold">{product.name}</h4>
                      <p className="font-medium">{product.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </BlockSection>

          {/* Blog Grid Block */}
          <BlockSection
            title="Blog Section"
            category="Content"
            code={`import { ArrowRight } from "lucide-react";
import { CalendarIcon } from "lucide-react";

const posts = [
  { title: "The Future of UI Design in 2026", date: "Mar 15, 2026", author: "Alex Rivera", img: "https://picsum.photos/seed/ui/800/600" },
  { title: "Optimizing React Performance", date: "Mar 12, 2026", author: "Jordan Smith", img: "https://picsum.photos/seed/react/800/600" },
  { title: "Building Accessible Components", date: "Mar 10, 2026", author: "Taylor Wong", img: "https://picsum.photos/seed/a11y/800/600" },
];

export function BlogSection() {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {posts.map((post, i) => (
        <div key={i} className="group cursor-pointer space-y-6">
          <div className="aspect-video rounded-3xl overflow-hidden">
            <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CalendarIcon className="h-3 w-3" />
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.author}</span>
            </div>
            <h4 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">{post.title}</h4>
            <div className="flex items-center gap-2 text-primary font-medium pt-2">
              Read More <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}`}
          >
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "The Future of UI Design in 2026", date: "Mar 15, 2026", author: "Alex Rivera", img: "https://picsum.photos/seed/ui/800/600" },
                { title: "Optimizing React Performance", date: "Mar 12, 2026", author: "Jordan Smith", img: "https://picsum.photos/seed/react/800/600" },
                { title: "Building Accessible Components", date: "Mar 10, 2026", author: "Taylor Wong", img: "https://picsum.photos/seed/a11y/800/600" }
              ].map((post, i) => (
                <div key={i} className="group cursor-pointer space-y-6">
                  <div className="aspect-video rounded-3xl overflow-hidden">
                    <img 
                      src={post.img} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CalendarIcon className="h-3 w-3" />
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.author}</span>
                    </div>
                    <h4 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">{post.title}</h4>
                    <p className="text-muted-foreground font-light leading-relaxed line-clamp-2">
                      Discover the latest trends and techniques that are shaping the future of digital interfaces...
                    </p>
                    <div className="flex items-center gap-2 text-primary font-medium pt-2">
                      Read More <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </BlockSection>

          {/* Stats Grid Block 2 */}
          <BlockSection
            title="Impact Stats"
            category="Marketing"
            code={`import { Users, Layers, Star, Activity } from "lucide-react";

const stats = [
  { label: "Active Users", value: "2.5M+", icon: <Users className="h-6 w-6" /> },
  { label: "Components", value: "150+", icon: <Layers className="h-6 w-6" /> },
  { label: "Github Stars", value: "45k+", icon: <Star className="h-6 w-6" /> },
  { label: "Daily Downloads", value: "120k+", icon: <Activity className="h-6 w-6" /> },
];

export function ImpactStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 p-12 border rounded-[3rem] bg-muted/5">
      {stats.map((stat, i) => (
        <div key={i} className="text-center space-y-2">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
            {stat.icon}
          </div>
          <div className="text-4xl font-bold tracking-tighter">{stat.value}</div>
          <div className="text-sm text-muted-foreground uppercase tracking-widest">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}`}
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 p-12 border rounded-[3rem] bg-muted/5">
              {[
                { label: "Active Users", value: "2.5M+", icon: <Users className="h-6 w-6" /> },
                { label: "Components", value: "150+", icon: <Layers className="h-6 w-6" /> },
                { label: "Github Stars", value: "45k+", icon: <Star className="h-6 w-6" /> },
                { label: "Daily Downloads", value: "120k+", icon: <Activity className="h-6 w-6" /> }
              ].map((stat, i) => (
                <div key={i} className="text-center space-y-2">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold tracking-tighter">{stat.value}</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </BlockSection>

          {/* Team Grid Block */}
          <BlockSection
            title="Our Team"
            category="Marketing"
            code={`import { Button } from "@/components/ui/button";
import { Github, Mail } from "lucide-react";

const team = [
  { name: "David Kim", role: "Founder & CEO", img: "https://i.pravatar.cc/150?u=david" },
  { name: "Sophie Chen", role: "Head of Design", img: "https://i.pravatar.cc/150?u=sophie" },
  { name: "James Wilson", role: "Lead Engineer", img: "https://i.pravatar.cc/150?u=james" },
  { name: "Maria Garcia", role: "Product Manager", img: "https://i.pravatar.cc/150?u=maria" },
];

export function OurTeam() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
      {team.map((member, i) => (
        <div key={i} className="text-center space-y-4 group">
          <div className="aspect-square rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 max-w-[200px] mx-auto">
            <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xl font-bold tracking-tight">{member.name}</h4>
            <p className="text-sm text-muted-foreground">{member.role}</p>
          </div>
          <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><Github className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><Mail className="h-4 w-4" /></Button>
          </div>
        </div>
      ))}
    </div>
  );
}`}
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: "David Kim", role: "Founder & CEO", img: "https://i.pravatar.cc/150?u=david" },
                { name: "Sophie Chen", role: "Head of Design", img: "https://i.pravatar.cc/150?u=sophie" },
                { name: "James Wilson", role: "Lead Engineer", img: "https://i.pravatar.cc/150?u=james" },
                { name: "Maria Garcia", role: "Product Manager", img: "https://i.pravatar.cc/150?u=maria" }
              ].map((member, i) => (
                <div key={i} className="text-center space-y-4 group">
                  <div className="aspect-square rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 max-w-[200px] mx-auto">
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xl font-bold tracking-tight">{member.name}</h4>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                  <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <Github className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </BlockSection>

          {/* Comparison Table Block */}
          <BlockSection
            title="Comparison Table"
            category="Marketing"
            noPad
            code={`import { CheckCircle2, X } from "lucide-react";

const rows = [
  { f: "Basic Components", free: true, pro: true, ent: true },
  { f: "Advanced Blocks", free: false, pro: true, ent: true },
  { f: "Custom Theming", free: false, pro: true, ent: true },
  { f: "Priority Support", free: false, pro: "Email", ent: "24/7 Phone" },
  { f: "Team Collaboration", free: "1 User", pro: "Up to 10", ent: "Unlimited" },
  { f: "SLA Guarantee", free: false, pro: false, ent: true },
];

export function ComparisonTable() {
  return (
    <div className="border rounded-[2.5rem] overflow-hidden bg-background">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b bg-muted/5">
            <th className="p-8 text-lg font-bold">Features</th>
            <th className="p-8 text-center text-lg font-bold">Free</th>
            <th className="p-8 text-center text-lg font-bold bg-primary/5">Pro</th>
            <th className="p-8 text-center text-lg font-bold">Enterprise</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-muted/5 transition-colors">
              <td className="p-8 font-medium">{row.f}</td>
              <td className="p-8 text-center">
                {typeof row.free === "boolean" ? (row.free ? <CheckCircle2 className="h-5 w-5 text-emerald-500 mx-auto" /> : <X className="h-5 w-5 text-muted-foreground mx-auto" />) : row.free}
              </td>
              <td className="p-8 text-center bg-primary/5">
                {typeof row.pro === "boolean" ? (row.pro ? <CheckCircle2 className="h-5 w-5 text-primary mx-auto" /> : <X className="h-5 w-5 text-muted-foreground mx-auto" />) : row.pro}
              </td>
              <td className="p-8 text-center">
                {typeof row.ent === "boolean" ? (row.ent ? <CheckCircle2 className="h-5 w-5 text-primary mx-auto" /> : <X className="h-5 w-5 text-muted-foreground mx-auto" />) : row.ent}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}`}
          >
            <div className="border rounded-[2.5rem] overflow-hidden bg-background">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b bg-muted/5">
                    <th className="p-8 text-lg font-bold">Features</th>
                    <th className="p-8 text-center text-lg font-bold">Free</th>
                    <th className="p-8 text-center text-lg font-bold bg-primary/5">Pro</th>
                    <th className="p-8 text-center text-lg font-bold">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    { f: "Basic Components", free: true, pro: true, ent: true },
                    { f: "Advanced Blocks", free: false, pro: true, ent: true },
                    { f: "Custom Theming", free: false, pro: true, ent: true },
                    { f: "Priority Support", free: false, pro: "Email", ent: "24/7 Phone" },
                    { f: "Team Collaboration", free: "1 User", pro: "Up to 10", ent: "Unlimited" },
                    { f: "SLA Guarantee", free: false, pro: false, ent: true }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-muted/5 transition-colors">
                      <td className="p-8 font-medium">{row.f}</td>
                      <td className="p-8 text-center">
                        {typeof row.free === 'boolean' ? (row.free ? <CheckCircle2 className="h-5 w-5 text-emerald-500 mx-auto" /> : <X className="h-5 w-5 text-muted-foreground mx-auto" />) : row.free}
                      </td>
                      <td className="p-8 text-center bg-primary/5">
                        {typeof row.pro === 'boolean' ? (row.pro ? <CheckCircle2 className="h-5 w-5 text-primary mx-auto" /> : <X className="h-5 w-5 text-muted-foreground mx-auto" />) : row.pro}
                      </td>
                      <td className="p-8 text-center">
                        {typeof row.ent === 'boolean' ? (row.ent ? <CheckCircle2 className="h-5 w-5 text-primary mx-auto" /> : <X className="h-5 w-5 text-muted-foreground mx-auto" />) : row.ent}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </BlockSection>

          {/* Simple Footer Block */}
          <BlockSection
            title="Simple Footer"
            category="Layout"
            code={`import { Button } from "@/components/ui/button";
import { Github, Mail } from "lucide-react";

export function SimpleFooter() {
  return (
    <div className="p-12 border rounded-[2.5rem] bg-muted/5 flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">S</div>
        <span className="text-xl font-bold tracking-tight">StructUI</span>
      </div>
      <div className="flex gap-8 text-sm text-muted-foreground">
        <span className="hover:text-primary cursor-pointer transition-colors">About</span>
        <span className="hover:text-primary cursor-pointer transition-colors">Features</span>
        <span className="hover:text-primary cursor-pointer transition-colors">Pricing</span>
        <span className="hover:text-primary cursor-pointer transition-colors">Contact</span>
      </div>
      <div className="flex gap-4">
        <Button variant="ghost" size="icon" className="rounded-full"><Github className="h-5 w-5" /></Button>
        <Button variant="ghost" size="icon" className="rounded-full"><Mail className="h-5 w-5" /></Button>
      </div>
    </div>
  );
}`}
          >
            <div className="p-12 border rounded-[2.5rem] bg-muted/5 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">S</div>
                <span className="text-xl font-bold tracking-tight">StructUI</span>
              </div>
              <div className="flex gap-8 text-sm text-muted-foreground">
                <span className="hover:text-primary cursor-pointer transition-colors">About</span>
                <span className="hover:text-primary cursor-pointer transition-colors">Features</span>
                <span className="hover:text-primary cursor-pointer transition-colors">Pricing</span>
                <span className="hover:text-primary cursor-pointer transition-colors">Contact</span>
              </div>
              <div className="flex gap-4">
                <Button variant="ghost" size="icon" className="rounded-full"><Github className="h-5 w-5" /></Button>
                <Button variant="ghost" size="icon" className="rounded-full"><Mail className="h-5 w-5" /></Button>
              </div>
            </div>
          </BlockSection>

          {/* Complex Footer Block */}
          <BlockSection
            title="Complex Footer"
            category="Layout"
            code={`import { Button } from "@/components/ui/button";
import { Github, Mail, Globe } from "lucide-react";

export function ComplexFooter() {
  return (
    <div className="p-16 border rounded-[3rem] bg-background grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12">
      <div className="col-span-2 space-y-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">S</div>
          <span className="text-xl font-bold tracking-tight">StructUI</span>
        </div>
        <p className="text-muted-foreground font-light leading-relaxed max-w-xs">
          The ultimate UI library for modern web applications.
        </p>
        <div className="flex gap-3">
          {[Github, Mail, Globe].map((Icon, i) => (
            <Button key={i} variant="outline" size="icon" className="rounded-full h-9 w-9">
              <Icon className="h-4 w-4" />
            </Button>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <h4 className="font-bold">Product</h4>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          {["Components", "Templates", "Blocks", "Pricing"].map(l => (
            <span key={l} className="hover:text-primary cursor-pointer">{l}</span>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <h4 className="font-bold">Company</h4>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          {["About Us", "Careers", "Blog", "Press"].map(l => (
            <span key={l} className="hover:text-primary cursor-pointer">{l}</span>
          ))}
        </div>
      </div>
    </div>
  );
}`}
          >
            <div className="p-16 border rounded-[3rem] bg-background grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12">
              <div className="col-span-2 space-y-6">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">S</div>
                  <span className="text-xl font-bold tracking-tight">StructUI</span>
                </div>
                <p className="text-muted-foreground font-light leading-relaxed max-w-xs">
                  The ultimate UI library for modern web applications. Built with performance and accessibility in mind.
                </p>
                <div className="flex gap-3">
                  {[Github, Mail, Globe].map((Icon, i) => (
                    <Button key={i} variant="outline" size="icon" className="rounded-full h-9 w-9">
                      <Icon className="h-4 w-4" />
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold">Product</h4>
                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <span className="hover:text-primary cursor-pointer">Components</span>
                  <span className="hover:text-primary cursor-pointer">Templates</span>
                  <span className="hover:text-primary cursor-pointer">Blocks</span>
                  <span className="hover:text-primary cursor-pointer">Pricing</span>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold">Company</h4>
                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <span className="hover:text-primary cursor-pointer">About Us</span>
                  <span className="hover:text-primary cursor-pointer">Careers</span>
                  <span className="hover:text-primary cursor-pointer">Blog</span>
                  <span className="hover:text-primary cursor-pointer">Press</span>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold">Resources</h4>
                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <span className="hover:text-primary cursor-pointer">Documentation</span>
                  <span className="hover:text-primary cursor-pointer">Help Center</span>
                  <span className="hover:text-primary cursor-pointer">Community</span>
                  <span className="hover:text-primary cursor-pointer">Status</span>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold">Legal</h4>
                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <span className="hover:text-primary cursor-pointer">Privacy Policy</span>
                  <span className="hover:text-primary cursor-pointer">Terms of Service</span>
                  <span className="hover:text-primary cursor-pointer">Cookie Policy</span>
                </div>
              </div>
            </div>
          </BlockSection>

          {/* Hero Section Block */}
          <BlockSection
            title="Modern Hero Section"
            category="Marketing"
            noPad
            code={`import { Hero } from "@/components/ui/hero";

export function ModernHeroSection() {
  return <Hero />;
}`}
          >
            <div className="border rounded-[2.5rem] overflow-hidden bg-background">
              <Hero />
            </div>
          </BlockSection>

          {/* Pricing Section Block */}
          <BlockSection
            title="Pricing Table"
            category="Marketing"
            code={`import { Pricing } from "@/components/ui/pricing";

export function PricingTable() {
  return <Pricing />;
}`}
          >
            <div className="p-8 border rounded-[2.5rem] bg-muted/5">
              <Pricing />
            </div>
          </BlockSection>

          {/* SaaS Dashboard Block */}
          <BlockSection
            title="SaaS Dashboard Template"
            category="Dashboard"
            code={`import { StatsCard, StatsGrid } from "@/components/ui/stats";
import { AreaChartComponent } from "@/components/ui/charts";
import { Timeline, activityLog } from "@/components/ui/timeline";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";

export function SaaSDashboard() {
  return (
    <div className="p-8 border rounded-3xl bg-muted/5 space-y-8">
      <StatsGrid>
        <StatsCard title="Total Revenue" value="$45,231.89" trend={{ value: "+20.1%", isUp: true }} description="from last month" icon={<DollarSign className="h-4 w-4" />} />
        <StatsCard title="Subscriptions" value="+2350" trend={{ value: "+180.1%", isUp: true }} description="from last month" icon={<Users className="h-4 w-4" />} />
        <StatsCard title="Sales" value="+12,234" trend={{ value: "+19%", isUp: true }} description="from last month" icon={<CreditCard className="h-4 w-4" />} />
        <StatsCard title="Active Now" value="+573" trend={{ value: "+201", isUp: true }} description="since last hour" icon={<Activity className="h-4 w-4" />} />
      </StatsGrid>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <AreaChartComponent title="Revenue Growth" description="Monthly revenue performance." data={[...]} className="lg:col-span-4" />
        <div className="lg:col-span-3">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
              <CardDescription>Latest events from your platform.</CardDescription>
            </CardHeader>
            <CardContent>
              <Timeline items={activityLog.slice(0, 4)} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}`}
          >
            <div className="p-8 border rounded-3xl bg-muted/5 space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Dashboard Overview</h2>
                  <p className="text-muted-foreground">Welcome back, here's what's happening today.</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">Download Report</Button>
                  <Button size="sm">Create New</Button>
                </div>
              </div>

              <StatsGrid>
                <StatsCard 
                  title="Total Revenue" 
                  value="$45,231.89" 
                  trend={{ value: "+20.1%", isUp: true }} 
                  description="from last month"
                  icon={<DollarSign className="h-4 w-4" />}
                />
                <StatsCard 
                  title="Subscriptions" 
                  value="+2350" 
                  trend={{ value: "+180.1%", isUp: true }} 
                  description="from last month"
                  icon={<Users className="h-4 w-4" />}
                />
                <StatsCard 
                  title="Sales" 
                  value="+12,234" 
                  trend={{ value: "+19%", isUp: true }} 
                  description="from last month"
                  icon={<CreditCard className="h-4 w-4" />}
                />
                <StatsCard 
                  title="Active Now" 
                  value="+573" 
                  trend={{ value: "+201", isUp: true }} 
                  description="since last hour"
                  icon={<Activity className="h-4 w-4" />}
                />
              </StatsGrid>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <AreaChartComponent 
                  title="Revenue Growth" 
                  description="Monthly revenue performance for the current year."
                  data={[
                    { name: "Jan", value: 4000 },
                    { name: "Feb", value: 3000 },
                    { name: "Mar", value: 2000 },
                    { name: "Apr", value: 2780 },
                    { name: "May", value: 1890 },
                    { name: "Jun", value: 2390 },
                    { name: "Jul", value: 3490 },
                  ]}
                  className="lg:col-span-4"
                />
                <div className="lg:col-span-3 space-y-6">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-lg">Recent Activity</CardTitle>
                      <CardDescription>Latest events from across your platform.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Timeline items={activityLog.slice(0, 4)} />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </BlockSection>

          {/* CRM Customer List Block */}
          <BlockSection
            title="CRM Customer Management"
            category="Dashboard"
            code={`import { DataTableAdvanced } from "@/components/ui/data-table-advanced";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const customers = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", status: "active", plan: "Pro", spent: "$1,200" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", status: "inactive", plan: "Free", spent: "$0" },
];

const columns = [
  {
    header: "Customer",
    accessorKey: "name",
    cell: ({ row }: any) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">{row.original.name}</p>
          <p className="text-xs text-muted-foreground">{row.original.email}</p>
        </div>
      </div>
    ),
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }: any) => (
      <Badge variant={row.original.status === "active" ? "default" : "secondary"} className="capitalize">
        {row.original.status}
      </Badge>
    ),
  },
  { header: "Plan", accessorKey: "plan" },
  { header: "Total Spent", accessorKey: "spent" },
];

export function CRMCustomerManagement() {
  return (
    <div className="p-8 border rounded-3xl bg-muted/5">
      <DataTableAdvanced data={customers} columns={columns} />
    </div>
  );
}`}
          >
            <div className="p-8 border rounded-3xl bg-muted/5">
              <DataTableAdvanced 
                data={[
                  { id: 1, name: "Alice Johnson", email: "alice@example.com", status: "active", plan: "Pro", spent: "$1,200" },
                  { id: 2, name: "Bob Smith", email: "bob@example.com", status: "inactive", plan: "Free", spent: "$0" },
                  { id: 3, name: "Charlie Brown", email: "charlie@example.com", status: "active", plan: "Enterprise", spent: "$12,500" },
                  { id: 4, name: "Diana Prince", email: "diana@example.com", status: "active", plan: "Pro", spent: "$2,400" },
                  { id: 5, name: "Edward Norton", email: "edward@example.com", status: "pending", plan: "Pro", spent: "$600" },
                  { id: 6, name: "Fiona Gallagher", email: "fiona@example.com", status: "active", plan: "Free", spent: "$0" },
                ]}
                columns={[
                  {
                    header: "Customer",
                    accessorKey: "name",
                    cell: ({ row }: any) => {
                      const item = row.original;
                      return (
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{item.name ? item.name.charAt(0) : "?"}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.email}</p>
                          </div>
                        </div>
                      );
                    }
                  },
                  {
                    header: "Status",
                    accessorKey: "status",
                    cell: ({ row }: any) => {
                      const item = row.original;
                      return (
                        <Badge variant={item.status === "active" ? "default" : "secondary"} className="capitalize">
                          {item.status}
                        </Badge>
                      );
                    }
                  },
                  { header: "Plan", accessorKey: "plan" },
                  { header: "Total Spent", accessorKey: "spent" },
                ]}
              />
            </div>
          </BlockSection>

          {/* User Settings Block */}
          <BlockSection
            title="User Account Settings"
            category="Dashboard"
            code={`import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserAccountSettings() {
  return (
    <div className="p-8 border rounded-3xl bg-muted/5">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-1">
          <Button variant="ghost" className="w-full justify-start font-bold bg-muted">Profile</Button>
          <Button variant="ghost" className="w-full justify-start">Security</Button>
          <Button variant="ghost" className="w-full justify-start">Billing</Button>
          <Button variant="ghost" className="w-full justify-start">Notifications</Button>
          <Button variant="ghost" className="w-full justify-start text-destructive">Delete Account</Button>
        </div>
        <div className="md:col-span-3 space-y-8">
          <div className="space-y-4">
            <h4 className="text-lg font-bold">Public Profile</h4>
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src="https://picsum.photos/seed/user/200" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Button size="sm">Change Avatar</Button>
                <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max size of 800K</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">First Name</label>
                <Input defaultValue="John" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Last Name</label>
                <Input defaultValue="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Bio</label>
              <Textarea placeholder="Tell us a bit about yourself..." />
            </div>
          </div>
          <div className="pt-6 border-t flex justify-end gap-3">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
}`}
          >
            <div className="p-8 border rounded-3xl bg-muted/5">
              <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-1 space-y-1">
                  <Button variant="ghost" className="w-full justify-start font-bold bg-muted">Profile</Button>
                  <Button variant="ghost" className="w-full justify-start">Security</Button>
                  <Button variant="ghost" className="w-full justify-start">Billing</Button>
                  <Button variant="ghost" className="w-full justify-start">Notifications</Button>
                  <Button variant="ghost" className="w-full justify-start text-destructive">Delete Account</Button>
                </div>
                <div className="md:col-span-3 space-y-8">
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold">Public Profile</h4>
                    <div className="flex items-center gap-6">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src="https://picsum.photos/seed/user/200" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <Button size="sm">Change Avatar</Button>
                        <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max size of 800K</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">First Name</label>
                        <Input defaultValue="John" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Last Name</label>
                        <Input defaultValue="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Bio</label>
                      <Textarea placeholder="Tell us a bit about yourself..." />
                    </div>
                  </div>
                  <div className="pt-6 border-t flex justify-end gap-3">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Changes</Button>
                  </div>
                </div>
              </div>
            </div>
          </BlockSection>

          {/* Project Management Block */}
          <BlockSection
            title="Project Management Template"
            category="Dashboard"
            code={`import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KanbanBoard } from "@/components/ui/kanban";
import { Calendar } from "@/components/ui/calendar";

export function ProjectManagement() {
  return (
    <div className="p-8 border rounded-3xl bg-muted/5 space-y-8">
      <Tabs defaultValue="board">
        <TabsList className="mb-6">
          <TabsTrigger value="board">Kanban Board</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>
        <TabsContent value="board">
          <KanbanBoard
            columns={[
              { id: "todo", title: "To Do", tasks: [{ id: "1", title: "Research Competitors", priority: "high", tags: ["research"] }] },
              { id: "in-progress", title: "In Progress", tasks: [{ id: "2", title: "Refactor Auth Logic", priority: "high", tags: ["dev"] }] },
              { id: "done", title: "Done", tasks: [{ id: "3", title: "Initial Launch", priority: "high", tags: ["ops"] }] },
            ]}
          />
        </TabsContent>
        <TabsContent value="calendar">
          <Calendar
            events={[
              { id: "1", title: "Team Sync", date: new Date(), type: "meeting" },
              { id: "2", title: "Client Call", date: new Date(), type: "meeting" },
            ]}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}`}
          >
            <div className="p-8 border rounded-3xl bg-muted/5 space-y-8">
              <Tabs defaultValue="board">
                <TabsList className="mb-6">
                  <TabsTrigger value="board">Kanban Board</TabsTrigger>
                  <TabsTrigger value="calendar">Calendar View</TabsTrigger>
                </TabsList>
                <TabsContent value="board">
                  <KanbanBoard 
                    columns={[
                      { 
                        id: "todo", 
                        title: "To Do", 
                        tasks: [
                          { id: "1", title: "Research Competitors", description: "Analyze top 5 competitors in the SaaS space.", priority: "high", tags: ["marketing", "research"] },
                          { id: "2", title: "Update Documentation", description: "Refine the API docs for the new release.", priority: "medium", tags: ["docs"] },
                        ] 
                      },
                      { 
                        id: "in-progress", 
                        title: "In Progress", 
                        tasks: [
                          { id: "3", title: "Refactor Auth Logic", description: "Move to a more robust JWT implementation.", priority: "high", tags: ["dev", "security"] },
                        ] 
                      },
                      { 
                        id: "done", 
                        title: "Done", 
                        tasks: [
                          { id: "4", title: "Initial Launch", description: "Deploy the MVP to production.", priority: "high", tags: ["dev", "ops"] },
                        ] 
                      },
                    ]}
                  />
                </TabsContent>
                <TabsContent value="calendar">
                  <Calendar 
                    events={[
                      { id: "1", title: "Team Sync", date: new Date(), type: "meeting" },
                      { id: "2", title: "Client Call", date: new Date(), type: "meeting" },
                      { id: "3", title: "Fix Bug #123", date: new Date(), type: "task" },
                    ]}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </BlockSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Auth Block 1: Minimal */}
          <BlockSection
            title="Minimal Auth"
            category="Auth"
            code={`import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Mail } from "lucide-react";

export function MinimalAuth() {
  return (
    <div className="p-8 border rounded-2xl bg-background/50 backdrop-blur-sm">
      <div className="max-w-sm mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
          <p className="text-sm text-muted-foreground">Enter your credentials to access your account</p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input placeholder="name@example.com" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <Button className="w-full">Sign In</Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="gap-2"><Github className="h-4 w-4" /> Github</Button>
          <Button variant="outline" className="gap-2"><Mail className="h-4 w-4" /> Google</Button>
        </div>
      </div>
    </div>
  );
}`}
          >
            <div className="p-8 border rounded-2xl bg-background/50 backdrop-blur-sm">
              <div className="max-w-sm mx-auto space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
                  <p className="text-sm text-muted-foreground">Enter your credentials to access your account</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input placeholder="name@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <Button className="w-full">Sign In</Button>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="gap-2">
                    <Github className="h-4 w-4" /> Github
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Mail className="h-4 w-4" /> Google
                  </Button>
                </div>
              </div>
            </div>
          </BlockSection>

          {/* Auth Block 2: Card Based */}
          <BlockSection
            title="Card Auth"
            category="Auth"
            code={`import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Github, Mail } from "lucide-react";

export function CardAuth() {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>Enter your email below to create your account</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-6">
          <Button variant="outline"><Github className="mr-2 h-4 w-4" /> Github</Button>
          <Button variant="outline"><Mail className="mr-2 h-4 w-4" /> Google</Button>
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium leading-none">Email</label>
          <Input type="email" placeholder="m@example.com" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium leading-none">Password</label>
          <Input type="password" />
        </div>
        <Button className="w-full">Create account</Button>
      </CardContent>
    </Card>
  );
}`}
          >
            <Card className="max-w-md mx-auto">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Create an account</CardTitle>
                <CardDescription>
                  Enter your email below to create your account
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-6">
                  <Button variant="outline">
                    <Github className="mr-2 h-4 w-4" />
                    Github
                  </Button>
                  <Button variant="outline">
                    <Mail className="mr-2 h-4 w-4" />
                    Google
                  </Button>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium leading-none">Email</label>
                  <Input id="email" type="email" placeholder="m@example.com" />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium leading-none">Password</label>
                  <Input id="password" type="password" />
                </div>
                <Button className="w-full">Create account</Button>
              </CardContent>
            </Card>
          </BlockSection>
        </div>

        {/* Social Proof Block */}
        <BlockSection
          title="Social Proof Sections"
          category="Marketing"
          code={`import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

export function SocialProof() {
  return (
    <div className="space-y-24">
      {/* Partners logos */}
      <div className="space-y-8">
        <p className="text-center text-xs font-bold uppercase tracking-[0.4em] text-muted-foreground opacity-60">Trusted by industry leaders</p>
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
          {["STRIPE", "VERCEL", "LINEAR", "GITHUB", "OPENAI"].map(name => (
            <div key={name} className="text-3xl font-black tracking-tighter italic">{name}</div>
          ))}
        </div>
      </div>
      {/* Used By cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="p-8 border rounded-[2rem] bg-muted/5 flex flex-col items-center text-center space-y-6">
            <div className="h-16 w-16 rounded-full bg-primary/5 flex items-center justify-center text-primary/40">
              <Users className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-bold tracking-tight">Enterprise {i}</h4>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                Scaling their infrastructure with StructUI since 2024.
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Sponsor CTA */}
      <div className="relative p-16 border rounded-[3.5rem] bg-foreground text-background text-center space-y-8 overflow-hidden">
        <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full transform translate-y-1/2" />
        <div className="relative z-10 space-y-4">
          <h4 className="text-4xl font-thin tracking-tighter">Support the Future of UI</h4>
          <p className="text-background/60 font-light max-w-lg mx-auto text-lg leading-relaxed">
            Help us maintain and grow this library by becoming a sponsor.
          </p>
        </div>
        <Button variant="secondary" className="relative z-10 rounded-full px-12 h-14 text-lg font-light tracking-widest bg-background text-foreground hover:opacity-90 transition-opacity">
          Become a Sponsor
        </Button>
      </div>
    </div>
  );
}`}
        >
          <div className="space-y-24">
            {/* Partners */}
            <div className="space-y-8">
              <p className="text-center text-xs font-bold uppercase tracking-[0.4em] text-muted-foreground opacity-60">Trusted by industry leaders</p>
              <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="text-3xl font-black tracking-tighter italic">STRIPE</div>
                <div className="text-3xl font-black tracking-tighter italic">VERCEL</div>
                <div className="text-3xl font-black tracking-tighter italic">LINEAR</div>
                <div className="text-3xl font-black tracking-tighter italic">GITHUB</div>
                <div className="text-3xl font-black tracking-tighter italic">OPENAI</div>
              </div>
            </div>

            {/* Used By */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-8 border rounded-[2rem] bg-muted/5 flex flex-col items-center text-center space-y-6 hover:bg-muted/10 transition-colors">
                  <div className="h-16 w-16 rounded-full bg-primary/5 flex items-center justify-center text-primary/40">
                    <Users className="h-8 w-8" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-bold tracking-tight">Enterprise {i}</h4>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">Scaling their entire infrastructure with StructUI components since 2024.</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Sponsors */}
            <div className="relative p-16 border rounded-[3.5rem] bg-foreground text-background text-center space-y-8 overflow-hidden">
              <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full transform translate-y-1/2" />
              <div className="relative z-10 space-y-4">
                <h4 className="text-4xl font-thin tracking-tighter">Support the Future of UI</h4>
                <p className="text-background/60 font-light max-w-lg mx-auto text-lg leading-relaxed">
                  We are building a more beautiful web, one component at a time. 
                  Help us maintain and grow this library by becoming a sponsor.
                </p>
              </div>
              <Button variant="secondary" className="relative z-10 rounded-full px-12 h-14 text-lg font-light tracking-widest bg-background text-foreground hover:opacity-90 transition-opacity">
                Become a Sponsor
              </Button>
            </div>
          </div>
        </BlockSection>
      </div>
    </Container>
  </div>
);
};
