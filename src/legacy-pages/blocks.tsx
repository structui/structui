// @ts-nocheck
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
  cliName,
}: {
  title: string;
  code: string;
  category?: string;
  children: React.ReactNode;
  noPad?: boolean;
  cliName?: string;
}) => {
  const [tab, setTab] = useState<"preview" | "code" | "cli">("preview");
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
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-foreground">{title}</h3>
            {cliName && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-mono font-medium border border-primary/20">
                sui add {cliName}
              </span>
            )}
          </div>
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
          {cliName && (
            <button
              onClick={() => setTab("cli")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${tab === "cli" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              CLI
            </button>
          )}
        </div>
      </div>

      {tab === "preview" ? (
        <div className={`border rounded-2xl overflow-hidden bg-muted/5 ${noPad ? "" : "p-8"}`}>
          {children}
        </div>
      ) : tab === "cli" && cliName ? (
        <Snippet
          code={`npx sui add ${cliName}`}
          language="bash"
          filename="terminal"
        />
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

const chatMessages = [
  { id: 1, author: "Sarah K.", avatar: "SK", side: "left", text: "Hey! Did you finish the new dashboard mockups?", time: "10:32" },
  { id: 2, author: "You", avatar: "YO", side: "right", text: "Almost done! Sending them over in 10 minutes.", time: "10:34" },
  { id: 3, author: "Sarah K.", avatar: "SK", side: "left", text: "Perfect. The client is expecting them by noon.", time: "10:35" },
  { id: 4, author: "You", avatar: "YO", side: "right", text: "No worries, I'll have everything ready well before that!", time: "10:36" },
];

const ChatInterfaceBlock = () => {
  const [input, setInput] = useState("");

  return (
    <div className="flex flex-col h-[480px] border rounded-2xl overflow-hidden bg-background">
      <div className="flex items-center gap-3 px-5 py-4 border-b bg-muted/20">
        <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">SK</div>
        <div>
          <p className="text-sm font-semibold">Sarah K.</p>
          <p className="text-xs text-emerald-500">Online</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {chatMessages.map((message) => (
          <div key={message.id} className={`flex gap-3 ${message.side === "right" ? "flex-row-reverse" : ""}`}>
            <div className="h-8 w-8 shrink-0 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">{message.avatar}</div>
            <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm ${message.side === "right" ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-muted rounded-tl-sm"}`}>
              <p>{message.text}</p>
              <p className={`text-[10px] mt-1 ${message.side === "right" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{message.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 px-4 py-3 border-t">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-muted/50 rounded-full px-4 py-2 text-sm outline-none focus:bg-muted"
        />
        <Button size="sm" className="rounded-full px-5">Send</Button>
      </div>
    </div>
  );
};

const InvoiceCardBlock = () => {
  const items = [
    { name: "UI Design System (Pro)", qty: 1, price: 299 },
    { name: "Component Library License", qty: 3, price: 49 },
    { name: "Priority Support (12mo)", qty: 1, price: 120 },
  ];
  const subtotal = items.reduce((sum, item) => sum + item.qty * item.price, 0);

  return (
    <div className="max-w-lg mx-auto border rounded-2xl overflow-hidden shadow-sm">
      <div className="bg-primary px-8 py-6 text-primary-foreground flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">Invoice</h2>
          <p className="text-primary-foreground/70 text-sm mt-1">#INV-2024-0081</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-primary-foreground/70">Issued</p>
          <p className="font-semibold">Dec 15, 2024</p>
        </div>
      </div>
      <div className="p-8 space-y-6 bg-background">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground mb-1">From</p>
            <p className="font-semibold">StructUI Inc.</p>
            <p className="text-muted-foreground">hello@structui.com</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">To</p>
            <p className="font-semibold">Acme Corp</p>
            <p className="text-muted-foreground">billing@acme.co</p>
          </div>
        </div>
        <div className="border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Item</th>
                <th className="text-center px-4 py-3 font-medium">Qty</th>
                <th className="text-right px-4 py-3 font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3 text-center text-muted-foreground">{item.qty}</td>
                  <td className="px-4 py-3 text-right font-medium">${(item.qty * item.price).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="space-y-2 text-sm border-t pt-4">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Tax (10%)</span>
            <span>${(subtotal * 0.1).toFixed(0)}</span>
          </div>
          <div className="flex justify-between font-bold text-base pt-2 border-t">
            <span>Total</span>
            <span>${(subtotal * 1.1).toFixed(0)}</span>
          </div>
        </div>
        <Button className="w-full rounded-xl">Download PDF</Button>
      </div>
    </div>
  );
};

const jobBoardItems = [
  { title: "Senior Frontend Engineer", company: "Vercel", location: "Remote", type: "Full-time", salary: "$140-$180k", tags: ["React", "TypeScript", "Next.js"], logo: "V", color: "#000" },
  { title: "Product Designer", company: "Linear", location: "San Francisco", type: "Full-time", salary: "$120-$160k", tags: ["Figma", "Design Systems"], logo: "L", color: "#5E6AD2" },
  { title: "DevOps Engineer", company: "Supabase", location: "Remote", type: "Contract", salary: "$100-$140k", tags: ["Kubernetes", "AWS", "Terraform"], logo: "S", color: "#3ECF8E" },
  { title: "Full Stack Developer", company: "PlanetScale", location: "Hybrid", type: "Full-time", salary: "$130-$170k", tags: ["Go", "MySQL", "React"], logo: "P", color: "#F64D8B" },
];

const JobBoardBlock = () => (
  <div className="space-y-3">
    {jobBoardItems.map((job, index) => (
      <div key={index} className="flex items-center gap-4 p-5 border rounded-2xl hover:border-primary/30 hover:bg-muted/30 transition-all cursor-pointer group">
        <div className="h-12 w-12 shrink-0 rounded-xl flex items-center justify-center text-white font-bold text-lg" style={{ background: job.color }}>
          {job.logo}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-semibold group-hover:text-primary transition-colors">{job.title}</h4>
              <p className="text-sm text-muted-foreground">{job.company} · {job.location}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-semibold">{job.salary}</p>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{job.type}</span>
            </div>
          </div>
          <div className="flex gap-1.5 mt-2">
            {job.tags.map((tag) => (
              <span key={tag} className="text-[11px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
);

const CountdownBlock = () => {
  const [time, setTime] = useState({ d: 3, h: 14, m: 37, s: 22 });

  React.useEffect(() => {
    const target = Date.now() + 3 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000 + 37 * 60 * 1000 + 22 * 1000;
    const timerId = setInterval(() => {
      const diff = Math.max(0, target - Date.now());
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor(diff / 3600000) % 24,
        m: Math.floor(diff / 60000) % 60,
        s: Math.floor(diff / 1000) % 60,
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const pad = (value: number) => String(value).padStart(2, "0");

  return (
    <div className="text-center space-y-6 py-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Limited Time Offer</p>
        <h3 className="text-3xl font-bold">Early Bird Sale Ends In</h3>
      </div>
      <div className="flex justify-center gap-4">
        {[{ label: "Days", val: time.d }, { label: "Hours", val: time.h }, { label: "Minutes", val: time.m }, { label: "Seconds", val: time.s }].map(({ label, val }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 rounded-2xl border-2 border-primary/20 bg-primary/5 flex items-center justify-center">
              <span className="text-3xl font-bold tabular-nums">{pad(val)}</span>
            </div>
            <span className="text-xs text-muted-foreground uppercase tracking-widest">{label}</span>
          </div>
        ))}
      </div>
      <Button className="rounded-full px-10 h-12 text-base">Claim 40% Off</Button>
    </div>
  );
};

const commentData = [
  {
    id: 1,
    author: "Alex M.",
    avatar: "AM",
    time: "2h ago",
    text: "This is exactly what I was looking for. The API design is really clean.",
    likes: 14,
    replies: [{ id: 11, author: "Jordan L.", avatar: "JL", time: "1h ago", text: "Agreed! The TypeScript types are super helpful too.", likes: 5 }],
  },
  { id: 2, author: "Priya N.", avatar: "PN", time: "4h ago", text: "Is there support for dark mode out of the box? Or do we need to configure it manually?", likes: 7, replies: [] },
];

const CommentThreadBlock = () => (
  <div className="max-w-2xl mx-auto space-y-6">
    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">{commentData.length} Comments</h4>
    {commentData.map((comment) => (
      <div key={comment.id} className="space-y-4">
        <div className="flex gap-3">
          <div className="h-9 w-9 shrink-0 rounded-full bg-primary/15 flex items-center justify-center text-xs font-bold text-primary">{comment.avatar}</div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">{comment.author}</span>
              <span className="text-xs text-muted-foreground">{comment.time}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{comment.text}</p>
            <div className="flex items-center gap-3 pt-1">
              <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                <Heart className="h-3 w-3" />
                {comment.likes}
              </button>
              <button className="text-xs text-muted-foreground hover:text-primary transition-colors">Reply</button>
            </div>
          </div>
        </div>
        {comment.replies.map((reply) => (
          <div key={reply.id} className="ml-12 flex gap-3">
            <div className="h-8 w-8 shrink-0 rounded-full bg-muted flex items-center justify-center text-xs font-bold">{reply.avatar}</div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">{reply.author}</span>
                <span className="text-xs text-muted-foreground">{reply.time}</span>
              </div>
              <p className="text-sm text-muted-foreground">{reply.text}</p>
            </div>
          </div>
        ))}
      </div>
    ))}
    <div className="flex gap-3 pt-2 border-t">
      <div className="h-9 w-9 shrink-0 rounded-full bg-muted flex items-center justify-center text-xs font-bold">YO</div>
      <input placeholder="Write a comment..." className="flex-1 bg-muted/50 rounded-full px-4 py-2 text-sm outline-none focus:bg-muted" />
    </div>
  </div>
);

const FileUploadBlock = () => {
  const [files, setFiles] = useState([
    { name: "design-system.fig", size: "4.2 MB", status: "done" },
    { name: "brand-assets.zip", size: "18.7 MB", status: "uploading", progress: 64 },
  ]);

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-border rounded-2xl p-12 cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all group">
        <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
          <Plus className="h-7 w-7 text-primary" />
        </div>
        <div className="text-center">
          <p className="font-semibold">Drop files here or click to upload</p>
          <p className="text-sm text-muted-foreground mt-1">PNG, JPG, PDF, ZIP up to 50MB</p>
        </div>
        <input type="file" className="hidden" multiple />
      </label>
      <div className="space-y-2">
        {files.map((file, index) => (
          <div key={index} className="flex items-center gap-3 p-3 border rounded-xl bg-muted/20">
            <div className="h-9 w-9 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
              <Layers className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{file.name}</p>
              {file.status === "uploading" ? (
                <div className="mt-1 space-y-1">
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${file.progress}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground">{file.progress}% · {file.size}</p>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">{file.size} · Done</p>
              )}
            </div>
            <button onClick={() => setFiles((prev) => prev.filter((_, currentIndex) => currentIndex !== index))} className="text-muted-foreground hover:text-destructive transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const kpiMetrics = [
  { label: "Monthly Revenue", value: "$84,320", change: "+12.4%", up: true, icon: DollarSign },
  { label: "Active Users", value: "24,180", change: "+8.1%", up: true, icon: Users },
  { label: "Churn Rate", value: "2.3%", change: "-0.4%", up: false, icon: Activity },
  { label: "Avg. Session", value: "4m 32s", change: "+22s", up: true, icon: Clock },
];

const KPIStripBlock = () => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
    {kpiMetrics.map((metric, index) => (
      <div key={index} className="p-5 border rounded-2xl space-y-3 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <metric.icon className="h-4 w-4 text-muted-foreground" />
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${metric.up ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"}`}>
            {metric.change}
          </span>
        </div>
        <div>
          <p className="text-2xl font-bold tracking-tight">{metric.value}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{metric.label}</p>
        </div>
      </div>
    ))}
  </div>
);

const NewsletterBlock = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-14 text-center text-primary-foreground">
      <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
      <div className="relative z-10 max-w-md mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm">
          <Zap className="h-3.5 w-3.5" />
          Weekly insights · No spam
        </div>
        <div className="space-y-2">
          <h3 className="text-3xl font-bold">Stay in the loop</h3>
          <p className="text-primary-foreground/70">Get the latest component releases, tutorials, and design tips delivered to your inbox.</p>
        </div>
        {sent ? (
          <div className="flex items-center justify-center gap-2 bg-white/10 rounded-2xl py-4">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-medium">You're subscribed!</span>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="your@email.com"
              className="flex-1 rounded-xl bg-white/10 border border-white/20 px-4 py-2.5 text-sm placeholder:text-primary-foreground/40 outline-none focus:bg-white/15"
            />
            <Button onClick={() => email && setSent(true)} variant="secondary" className="rounded-xl shrink-0">Subscribe</Button>
          </div>
        )}
        <p className="text-xs text-primary-foreground/50">Join 8,400+ developers. Unsubscribe anytime.</p>
      </div>
    </div>
  );
};

const comparisonPlans = ["Free", "Pro", "Enterprise"];
const comparisonFeatures = [
  { name: "Components", values: ["12", "80+", "Unlimited"] },
  { name: "Projects", values: ["1", "10", "Unlimited"] },
  { name: "Team members", values: ["-", "5", "Unlimited"] },
  { name: "Custom themes", values: [false, true, true] },
  { name: "Priority support", values: [false, false, true] },
  { name: "Analytics", values: [false, true, true] },
  { name: "SSO / SAML", values: [false, false, true] },
];

const ComparisonTableBlock = () => (
  <div className="overflow-x-auto rounded-2xl border">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b bg-muted/30">
          <th className="text-left px-6 py-4 font-medium text-muted-foreground">Feature</th>
          {comparisonPlans.map((plan, index) => (
            <th key={plan} className={`px-6 py-4 font-semibold ${index === 1 ? "text-primary" : ""}`}>
              {plan}
              {index === 1 && <span className="ml-1.5 text-[10px] bg-primary/10 text-primary rounded-full px-2 py-0.5">Popular</span>}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {comparisonFeatures.map((feature, index) => (
          <tr key={index} className="border-t hover:bg-muted/20 transition-colors">
            <td className="px-6 py-3.5 text-muted-foreground">{feature.name}</td>
            {feature.values.map((value, valueIndex) => (
              <td key={valueIndex} className="px-6 py-3.5 text-center">
                {typeof value === "boolean" ? (
                  value ? <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" /> : <Minus className="h-4 w-4 text-muted-foreground/40 mx-auto" />
                ) : (
                  <span className={valueIndex === 1 ? "font-semibold text-primary" : ""}>{value}</span>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const SettingsPanelBlock = () => {
  const [notifications, setNotifications] = useState({ email: true, push: false, weekly: true });
  const [theme, setTheme] = useState("system");

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="border rounded-2xl divide-y overflow-hidden">
        <div className="px-5 py-4 bg-muted/30">
          <h4 className="font-semibold text-sm">Notifications</h4>
        </div>
        {[
          { key: "email", label: "Email notifications", desc: "Receive updates via email" },
          { key: "push", label: "Push notifications", desc: "Browser push alerts" },
          { key: "weekly", label: "Weekly digest", desc: "Summary every Monday" },
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="text-sm font-medium">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
            <button
              onClick={() => setNotifications((previous) => ({ ...previous, [item.key]: !previous[item.key] }))}
              className={`relative h-5 w-9 rounded-full transition-colors ${notifications[item.key] ? "bg-primary" : "bg-muted-foreground/30"}`}
            >
              <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${notifications[item.key] ? "translate-x-4" : "translate-x-0.5"}`} />
            </button>
          </div>
        ))}
      </div>

      <div className="border rounded-2xl divide-y overflow-hidden">
        <div className="px-5 py-4 bg-muted/30">
          <h4 className="font-semibold text-sm">Appearance</h4>
        </div>
        <div className="px-5 py-4">
          <div className="grid grid-cols-3 gap-2">
            {["light", "dark", "system"].map((selectedTheme) => (
              <button
                key={selectedTheme}
                onClick={() => setTheme(selectedTheme)}
                className={`py-2.5 rounded-xl border text-sm capitalize font-medium transition-all ${theme === selectedTheme ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-muted/50"}`}
              >
                {selectedTheme}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="border rounded-2xl divide-y overflow-hidden">
        <div className="px-5 py-4 bg-muted/30">
          <h4 className="font-semibold text-sm">Danger Zone</h4>
        </div>
        <div className="px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Delete account</p>
            <p className="text-xs text-muted-foreground">Permanently remove all data</p>
          </div>
          <Button variant="destructive" size="sm" className="rounded-xl">Delete</Button>
        </div>
      </div>
    </div>
  );
};

export const BlocksPage = () => {
  const { toast } = useToast();

  return (
    <div className="py-12">
      <Container>
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Blocks</h1>
          <p className="text-muted-foreground">Ready-to-use UI blocks for your next project.</p>
        </div>

        <div className="mb-12 rounded-2xl border border-primary/20 bg-primary/5 px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground mb-0.5">Install blocks with the CLI</p>
            <p className="text-xs text-muted-foreground">
              Blocks marked with a <span className="font-mono bg-primary/10 text-primary px-1 py-0.5 rounded text-[10px] border border-primary/20">sui add</span> badge can be installed directly into your project. All other blocks can be copied from the Code tab.
            </p>
          </div>
          <div className="shrink-0 flex flex-col gap-1.5 font-mono text-xs">
            <span className="px-3 py-1.5 rounded-lg bg-background border text-muted-foreground">npx sui search --blocks</span>
            <span className="px-3 py-1.5 rounded-lg bg-background border text-muted-foreground">npx sui add &lt;block-name&gt;</span>
          </div>
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
            cliName="hero-section"
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
            cliName="pricing-section"
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

          {/* Block 1: Chat Interface */}
          <BlockSection
            title="Chat Interface"
            category="Messaging"
            code={`const messages = [
  { id: 1, author: "Sarah K.", avatar: "SK", side: "left", text: "Hey! Did you finish the new dashboard mockups?", time: "10:32" },
  { id: 2, author: "You", avatar: "YO", side: "right", text: "Almost done! Sending them over in 10 minutes.", time: "10:34" },
  { id: 3, author: "Sarah K.", avatar: "SK", side: "left", text: "Perfect. The client is expecting them by noon.", time: "10:35" },
  { id: 4, author: "You", avatar: "YO", side: "right", text: "No worries, I'll have everything ready well before that! 🚀", time: "10:36" },
];

export function ChatInterface() {
  const [input, setInput] = React.useState("");
  return (
    <div className="flex flex-col h-[480px] border rounded-2xl overflow-hidden bg-background">
      <div className="flex items-center gap-3 px-5 py-4 border-b bg-muted/20">
        <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">SK</div>
        <div><p className="text-sm font-semibold">Sarah K.</p><p className="text-xs text-emerald-500">● Online</p></div>
      </div>
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.map(m => (
          <div key={m.id} className={\`flex gap-3 \${m.side === "right" ? "flex-row-reverse" : ""}\`}>
            <div className="h-8 w-8 shrink-0 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">{m.avatar}</div>
            <div className={\`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm \${m.side === "right" ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-muted rounded-tl-sm"}\`}>
              <p>{m.text}</p>
              <p className={\`text-[10px] mt-1 \${m.side === "right" ? "text-primary-foreground/60" : "text-muted-foreground"}\`}>{m.time}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 px-4 py-3 border-t">
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message…" className="flex-1 bg-muted/50 rounded-full px-4 py-2 text-sm outline-none focus:bg-muted" />
        <Button size="sm" className="rounded-full px-5">Send</Button>
      </div>
    </div>
  );
}`}
          >
            <ChatInterfaceBlock />
          </BlockSection>

          {/* Block 2: Invoice Card */}
          <BlockSection
            title="Invoice Card"
            category="Finance"
            code={`export function InvoiceCard() {
  const items = [
    { name: "UI Design System (Pro)", qty: 1, price: 299 },
    { name: "Component Library License", qty: 3, price: 49 },
    { name: "Priority Support (12mo)", qty: 1, price: 120 },
  ];
  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
  return (
    <div className="max-w-lg mx-auto border rounded-2xl overflow-hidden shadow-sm">
      <div className="bg-primary px-8 py-6 text-primary-foreground flex justify-between items-start">
        <div><h2 className="text-2xl font-bold">Invoice</h2><p className="text-primary-foreground/70 text-sm mt-1">#INV-2024-0081</p></div>
        <div className="text-right"><p className="text-sm text-primary-foreground/70">Issued</p><p className="font-semibold">Dec 15, 2024</p></div>
      </div>
      <div className="p-8 space-y-6 bg-background">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><p className="text-muted-foreground mb-1">From</p><p className="font-semibold">StructUI Inc.</p><p className="text-muted-foreground">hello@structui.com</p></div>
          <div><p className="text-muted-foreground mb-1">To</p><p className="font-semibold">Acme Corp</p><p className="text-muted-foreground">billing@acme.co</p></div>
        </div>
        <div className="border rounded-xl overflow-hidden">
          <table className="w-full text-sm"><thead className="bg-muted/50"><tr><th className="text-left px-4 py-3 font-medium">Item</th><th className="text-center px-4 py-3 font-medium">Qty</th><th className="text-right px-4 py-3 font-medium">Total</th></tr></thead>
          <tbody>{items.map((item, i) => (<tr key={i} className="border-t"><td className="px-4 py-3">{item.name}</td><td className="px-4 py-3 text-center text-muted-foreground">{item.qty}</td><td className="px-4 py-3 text-right font-medium">\${(item.qty * item.price).toLocaleString()}</td></tr>))}</tbody></table>
        </div>
        <div className="space-y-2 text-sm border-t pt-4">
          <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>\${subtotal}</span></div>
          <div className="flex justify-between text-muted-foreground"><span>Tax (10%)</span><span>\${(subtotal * 0.1).toFixed(0)}</span></div>
          <div className="flex justify-between font-bold text-base pt-2 border-t"><span>Total</span><span>\${(subtotal * 1.1).toFixed(0)}</span></div>
        </div>
        <Button className="w-full rounded-xl">Download PDF</Button>
      </div>
    </div>
  );
}`}
          >
            <InvoiceCardBlock />
          </BlockSection>

          {/* Block 3: Job Board */}
          <BlockSection
            title="Job Board Listing"
            category="Recruiting"
            code={`const jobs = [
  { title: "Senior Frontend Engineer", company: "Vercel", location: "Remote", type: "Full-time", salary: "$140–$180k", tags: ["React", "TypeScript", "Next.js"], logo: "V", color: "#000" },
  { title: "Product Designer", company: "Linear", location: "San Francisco", type: "Full-time", salary: "$120–$160k", tags: ["Figma", "Design Systems"], logo: "L", color: "#5E6AD2" },
  { title: "DevOps Engineer", company: "Supabase", location: "Remote", type: "Contract", salary: "$100–$140k", tags: ["Kubernetes", "AWS", "Terraform"], logo: "S", color: "#3ECF8E" },
  { title: "Full Stack Developer", company: "PlanetScale", location: "Hybrid", type: "Full-time", salary: "$130–$170k", tags: ["Go", "MySQL", "React"], logo: "P", color: "#F64D8B" },
];

export function JobBoard() {
  return (
    <div className="space-y-3">
      {jobs.map((job, i) => (
        <div key={i} className="flex items-center gap-4 p-5 border rounded-2xl hover:border-primary/30 hover:bg-muted/30 transition-all cursor-pointer group">
          <div className="h-12 w-12 shrink-0 rounded-xl flex items-center justify-center text-white font-bold text-lg" style={{ background: job.color }}>{job.logo}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div><h4 className="font-semibold group-hover:text-primary transition-colors">{job.title}</h4><p className="text-sm text-muted-foreground">{job.company} · {job.location}</p></div>
              <div className="text-right shrink-0"><p className="text-sm font-semibold">{job.salary}</p><span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{job.type}</span></div>
            </div>
            <div className="flex gap-1.5 mt-2">{job.tags.map(t => <span key={t} className="text-[11px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{t}</span>)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}`}
          >
            <JobBoardBlock />
          </BlockSection>

          {/* Block 4: Countdown Timer */}
          <BlockSection
            title="Countdown Timer"
            category="Marketing"
            code={`export function CountdownTimer() {
  const target = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000 + 37 * 60 * 1000 + 22 * 1000);
  const [time, setTime] = React.useState({ d: 3, h: 14, m: 37, s: 22 });
  React.useEffect(() => {
    const t = setInterval(() => {
      const diff = Math.max(0, target.getTime() - Date.now());
      setTime({ d: Math.floor(diff / 86400000), h: Math.floor(diff / 3600000) % 24, m: Math.floor(diff / 60000) % 60, s: Math.floor(diff / 1000) % 60 });
    }, 1000);
    return () => clearInterval(t);
  }, []);
  const pads = (n: number) => String(n).padStart(2, "0");
  return (
    <div className="text-center space-y-6 py-8">
      <div><p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Limited Time Offer</p><h3 className="text-3xl font-bold">Early Bird Sale Ends In</h3></div>
      <div className="flex justify-center gap-4">
        {[{ label: "Days", val: time.d }, { label: "Hours", val: time.h }, { label: "Minutes", val: time.m }, { label: "Seconds", val: time.s }].map(({ label, val }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 rounded-2xl border-2 border-primary/20 bg-primary/5 flex items-center justify-center">
              <span className="text-3xl font-bold tabular-nums">{pads(val)}</span>
            </div>
            <span className="text-xs text-muted-foreground uppercase tracking-widest">{label}</span>
          </div>
        ))}
      </div>
      <Button className="rounded-full px-10 h-12 text-base">Claim 40% Off →</Button>
    </div>
  );
}`}
          >
            <CountdownBlock />
          </BlockSection>

          {/* Block 5: Comment Thread */}
          <BlockSection
            title="Comment Thread"
            category="Community"
            code={`const comments = [
  { id: 1, author: "Alex M.", avatar: "AM", time: "2h ago", text: "This is exactly what I was looking for. The API design is really clean.", likes: 14, replies: [
    { id: 11, author: "Jordan L.", avatar: "JL", time: "1h ago", text: "Agreed! The TypeScript types are super helpful too.", likes: 5 },
  ]},
  { id: 2, author: "Priya N.", avatar: "PN", time: "4h ago", text: "Is there support for dark mode out of the box? Or do we need to configure it manually?", likes: 7, replies: [] },
];

export function CommentThread() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">{comments.length} Comments</h4>
      {comments.map(c => (
        <div key={c.id} className="space-y-4">
          <div className="flex gap-3">
            <div className="h-9 w-9 shrink-0 rounded-full bg-primary/15 flex items-center justify-center text-xs font-bold text-primary">{c.avatar}</div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2"><span className="text-sm font-semibold">{c.author}</span><span className="text-xs text-muted-foreground">{c.time}</span></div>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.text}</p>
              <div className="flex items-center gap-3 pt-1">
                <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"><Heart className="h-3 w-3" />{c.likes}</button>
                <button className="text-xs text-muted-foreground hover:text-primary transition-colors">Reply</button>
              </div>
            </div>
          </div>
          {c.replies.map(r => (
            <div key={r.id} className="ml-12 flex gap-3">
              <div className="h-8 w-8 shrink-0 rounded-full bg-muted flex items-center justify-center text-xs font-bold">{r.avatar}</div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2"><span className="text-sm font-semibold">{r.author}</span><span className="text-xs text-muted-foreground">{r.time}</span></div>
                <p className="text-sm text-muted-foreground">{r.text}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
      <div className="flex gap-3 pt-2 border-t">
        <div className="h-9 w-9 shrink-0 rounded-full bg-muted flex items-center justify-center text-xs font-bold">YO</div>
        <input placeholder="Write a comment…" className="flex-1 bg-muted/50 rounded-full px-4 py-2 text-sm outline-none focus:bg-muted" />
      </div>
    </div>
  );
}`}
          >
            <CommentThreadBlock />
          </BlockSection>

          {/* Block 6: File Upload Zone */}
          <BlockSection
            title="File Upload Zone"
            category="Forms"
            code={`export function FileUploadZone() {
  const [files, setFiles] = React.useState([
    { name: "design-system.fig", size: "4.2 MB", status: "done" },
    { name: "brand-assets.zip", size: "18.7 MB", status: "uploading", progress: 64 },
  ]);
  return (
    <div className="max-w-xl mx-auto space-y-4">
      <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-border rounded-2xl p-12 cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all group">
        <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
          <Plus className="h-7 w-7 text-primary" />
        </div>
        <div className="text-center"><p className="font-semibold">Drop files here or click to upload</p><p className="text-sm text-muted-foreground mt-1">PNG, JPG, PDF, ZIP up to 50MB</p></div>
        <input type="file" className="hidden" multiple />
      </label>
      <div className="space-y-2">
        {files.map((f, i) => (
          <div key={i} className="flex items-center gap-3 p-3 border rounded-xl bg-muted/20">
            <div className="h-9 w-9 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center"><Layers className="h-4 w-4 text-primary" /></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{f.name}</p>
              {f.status === "uploading" ? (
                <div className="mt-1 space-y-1">
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden"><div className="h-full bg-primary rounded-full transition-all" style={{ width: f.progress + "%" }} /></div>
                  <p className="text-xs text-muted-foreground">{f.progress}% · {f.size}</p>
                </div>
              ) : <p className="text-xs text-muted-foreground">{f.size} · Done</p>}
            </div>
            <button onClick={() => setFiles(prev => prev.filter((_, j) => j !== i))} className="text-muted-foreground hover:text-destructive transition-colors"><X className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}`}
          >
            <FileUploadBlock />
          </BlockSection>

          {/* Block 7: KPI Metrics Strip */}
          <BlockSection
            title="KPI Metrics Strip"
            category="Analytics"
            code={`const metrics = [
  { label: "Monthly Revenue", value: "$84,320", change: "+12.4%", up: true, icon: DollarSign, color: "emerald" },
  { label: "Active Users", value: "24,180", change: "+8.1%", up: true, icon: Users, color: "blue" },
  { label: "Churn Rate", value: "2.3%", change: "-0.4%", up: false, icon: Activity, color: "violet" },
  { label: "Avg. Session", value: "4m 32s", change: "+22s", up: true, icon: Clock, color: "amber" },
];

export function KPIStrip() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((m, i) => (
        <div key={i} className="p-5 border rounded-2xl space-y-3 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <m.icon className="h-4 w-4 text-muted-foreground" />
            <span className={\`text-xs font-semibold px-2 py-0.5 rounded-full \${m.up ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"}\`}>{m.change}</span>
          </div>
          <div>
            <p className="text-2xl font-bold tracking-tight">{m.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{m.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}`}
          >
            <KPIStripBlock />
          </BlockSection>

          {/* Block 8: Newsletter Signup */}
          <BlockSection
            title="Newsletter Signup"
            category="Marketing"
            code={`export function NewsletterSignup() {
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);
  return (
    <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-14 text-center text-primary-foreground">
      <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
      <div className="relative z-10 max-w-md mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm"><Zap className="h-3.5 w-3.5" />Weekly insights · No spam</div>
        <div className="space-y-2">
          <h3 className="text-3xl font-bold">Stay in the loop</h3>
          <p className="text-primary-foreground/70">Get the latest component releases, tutorials, and design tips delivered to your inbox.</p>
        </div>
        {sent ? (
          <div className="flex items-center justify-center gap-2 bg-white/10 rounded-2xl py-4"><CheckCircle2 className="h-5 w-5" /><span className="font-medium">You're subscribed!</span></div>
        ) : (
          <div className="flex gap-2">
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" className="flex-1 rounded-xl bg-white/10 border border-white/20 px-4 py-2.5 text-sm placeholder:text-primary-foreground/40 outline-none focus:bg-white/15" />
            <Button onClick={() => email && setSent(true)} variant="secondary" className="rounded-xl shrink-0">Subscribe</Button>
          </div>
        )}
        <p className="text-xs text-primary-foreground/50">Join 8,400+ developers. Unsubscribe anytime.</p>
      </div>
    </div>
  );
}`}
          >
            <NewsletterBlock />
          </BlockSection>

          {/* Block 9: Feature Comparison Table */}
          <BlockSection
            title="Feature Comparison Table"
            category="Marketing"
            code={`const plans = ["Free", "Pro", "Enterprise"];
const features = [
  { name: "Components", values: ["12", "80+", "Unlimited"] },
  { name: "Projects", values: ["1", "10", "Unlimited"] },
  { name: "Team members", values: ["—", "5", "Unlimited"] },
  { name: "Custom themes", values: [false, true, true] },
  { name: "Priority support", values: [false, false, true] },
  { name: "Analytics", values: [false, true, true] },
  { name: "SSO / SAML", values: [false, false, true] },
];

export function ComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-2xl border">
      <table className="w-full text-sm">
        <thead><tr className="border-b bg-muted/30">
          <th className="text-left px-6 py-4 font-medium text-muted-foreground">Feature</th>
          {plans.map((p, i) => <th key={p} className={\`px-6 py-4 font-semibold \${i === 1 ? "text-primary" : ""}\`}>{p}{i === 1 && <span className="ml-1.5 text-[10px] bg-primary/10 text-primary rounded-full px-2 py-0.5">Popular</span>}</th>)}
        </tr></thead>
        <tbody>{features.map((f, i) => (
          <tr key={i} className="border-t hover:bg-muted/20 transition-colors">
            <td className="px-6 py-3.5 text-muted-foreground">{f.name}</td>
            {f.values.map((v, j) => (
              <td key={j} className="px-6 py-3.5 text-center">
                {typeof v === "boolean" ? (v ? <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" /> : <Minus className="h-4 w-4 text-muted-foreground/40 mx-auto" />) : <span className={j === 1 ? "font-semibold text-primary" : ""}>{v}</span>}
              </td>
            ))}
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}`}
          >
            <ComparisonTableBlock />
          </BlockSection>

          {/* Block 10: User Settings Panel */}
          <BlockSection
            title="Settings Panel"
            category="Application"
            code={`export function SettingsPanel() {
  const [notifications, setNotifications] = React.useState({ email: true, push: false, weekly: true });
  const [theme, setTheme] = React.useState("system");
  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="border rounded-2xl divide-y overflow-hidden">
        <div className="px-5 py-4 bg-muted/30"><h4 className="font-semibold text-sm">Notifications</h4></div>
        {[
          { key: "email", label: "Email notifications", desc: "Receive updates via email" },
          { key: "push", label: "Push notifications", desc: "Browser push alerts" },
          { key: "weekly", label: "Weekly digest", desc: "Summary every Monday" },
        ].map(item => (
          <div key={item.key} className="flex items-center justify-between px-5 py-4">
            <div><p className="text-sm font-medium">{item.label}</p><p className="text-xs text-muted-foreground">{item.desc}</p></div>
            <button onClick={() => setNotifications(p => ({ ...p, [item.key]: !p[item.key] }))}
              className={\`relative h-5 w-9 rounded-full transition-colors \${notifications[item.key] ? "bg-primary" : "bg-muted-foreground/30"}\`}>
              <span className={\`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform \${notifications[item.key] ? "translate-x-4" : "translate-x-0.5"}\`} />
            </button>
          </div>
        ))}
      </div>
      <div className="border rounded-2xl divide-y overflow-hidden">
        <div className="px-5 py-4 bg-muted/30"><h4 className="font-semibold text-sm">Appearance</h4></div>
        <div className="px-5 py-4">
          <div className="grid grid-cols-3 gap-2">
            {["light", "dark", "system"].map(t => (
              <button key={t} onClick={() => setTheme(t)}
                className={\`py-2.5 rounded-xl border text-sm capitalize font-medium transition-all \${theme === t ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-muted/50"}\`}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="border rounded-2xl divide-y overflow-hidden">
        <div className="px-5 py-4 bg-muted/30"><h4 className="font-semibold text-sm">Danger Zone</h4></div>
        <div className="px-5 py-4 flex items-center justify-between">
          <div><p className="text-sm font-medium">Delete account</p><p className="text-xs text-muted-foreground">Permanently remove all data</p></div>
          <Button variant="destructive" size="sm" className="rounded-xl">Delete</Button>
        </div>
      </div>
    </div>
  );
}`}
          >
            <SettingsPanelBlock />
          </BlockSection>

        </div>
      </Container>
    </div>
  );
};
