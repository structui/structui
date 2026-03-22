"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────

type Framework = "react" | "vue" | "astro";

interface InlineComponent {
  id: string;
  name: string;
  description: string;
  preview: React.ReactNode;
  code: Record<Framework, string>;
}

// ─── Helper ─────────────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      style={{
        position: "absolute",
        top: 10,
        right: 10,
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 8,
        padding: "4px 10px",
        cursor: "pointer",
        color: "var(--text-secondary)",
        fontSize: 11,
        display: "flex",
        alignItems: "center",
        gap: 4,
      }}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

// ─── 10 Components ──────────────────────────────────────────────────────────

const BENTO_REACT = `<div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gridTemplateRows:"repeat(2,160px)",gap:12,padding:20,background: "var(--bg-primary)",borderRadius:20}}>
  <div style={{gridColumn:"span 2",background:"linear-gradient(135deg,var(--accent),#8b5cf6)",borderRadius:16,padding:24,display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
    <p style={{color:"rgba(255,255,255,.6)",fontSize:12,margin:0}}>FEATURED</p>
    <h2 style={{color: "var(--text-primary)",margin:"4px 0 0",fontSize:22,fontWeight:700}}>Bento Grid Layout</h2>
  </div>
  <div style={{background: "var(--bg-secondary)",borderRadius:16,border: "1px solid var(--border)",padding:20,display:"flex",alignItems:"center",justifyContent:"center"}}>
    <span style={{fontSize:40}}>✦</span>
  </div>
  <div style={{background: "var(--bg-secondary)",borderRadius:16,border: "1px solid var(--border)",padding:20}}>
    <p style={{color: "var(--text-secondary)",fontSize:11,margin:0}}>USERS</p>
    <p style={{color: "var(--text-primary)",fontSize:28,fontWeight:700,margin:"4px 0 0"}}>12.4k</p>
  </div>
  <div style={{gridColumn:"span 2",background:"linear-gradient(135deg,#0f172a,#1e1b4b)",borderRadius:16,border:"1px solid #312e81",padding:20,display:"flex",alignItems:"center",gap:16}}>
    <div style={{width:48,height:48,borderRadius:"50%",background: "var(--accent)",display:"flex",alignItems:"center",justifyContent:"center",color: "var(--text-primary)",fontSize:20}}>★</div>
    <div>
      <p style={{color: "var(--text-muted)",fontSize:12,margin:0}}>Top Rated</p>
      <p style={{color: "var(--text-primary)",fontSize:16,fontWeight:600,margin:"2px 0 0"}}>Design System</p>
    </div>
  </div>
</div>`;

const GLASS_REACT = `<div style={{minHeight:200,background:"linear-gradient(135deg,var(--accent),#ec4899)",borderRadius:20,display:"flex",alignItems:"center",justifyContent:"center",padding:32}}>
  <div style={{background:"rgba(255,255,255,.12)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",border:"1px solid rgba(255,255,255,.25)",borderRadius:20,padding:28,textAlign:"center",minWidth:200}}>
    <div style={{width:56,height:56,borderRadius:"50%",background:"rgba(255,255,255,.2)",margin:"0 auto 12px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>✦</div>
    <h3 style={{color: "var(--text-primary)",margin:"0 0 6px",fontSize:18,fontWeight:700}}>Glassmorphism</h3>
    <p style={{color:"rgba(255,255,255,.7)",margin:0,fontSize:13}}>Frosted glass effect</p>
  </div>
</div>`;

const STAT_REACT = `<div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
  {[{label:"Revenue",value:"$48.2k",change:"+12.5%",up:true},{label:"Users",value:"9,241",change:"+8.1%",up:true},{label:"Churn",value:"2.4%",change:"-0.3%",up:false}].map(s=>(
    <div key={s.label} style={{flex:"1 1 140px",background: "var(--bg-secondary)",border: "1px solid var(--border)",borderRadius:16,padding:"18px 20px"}}>
      <p style={{color: "var(--text-secondary)",fontSize:11,margin:0,textTransform:"uppercase",letterSpacing:".1em"}}>{s.label}</p>
      <p style={{color: "var(--text-primary)",fontSize:26,fontWeight:700,margin:"6px 0 4px"}}>{s.value}</p>
      <span style={{fontSize:12,color:s.up?"#22c55e":"#ef4444",background:s.up?"rgba(34,197,94,.1)":"rgba(239,68,68,.1)",padding:"2px 8px",borderRadius:20}}>{s.change}</span>
    </div>
  ))}
</div>`;

const TIMELINE_REACT = `<div style={{padding:24,background: "var(--bg-primary)",borderRadius:20}}>
  {[{dot:"var(--accent)",title:"Design",desc:"Wireframes approved",time:"2h ago"},{dot:"#22c55e",title:"Development",desc:"API integration done",time:"5h ago"},{dot:"#f59e0b",title:"Review",desc:"QA testing in progress",time:"1d ago"}].map((item,i)=>(
    <div key={i} style={{display:"flex",gap:16,paddingBottom:24,position:"relative"}}>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:0}}>
        <div style={{width:12,height:12,borderRadius:"50%",background:item.dot,flexShrink:0,marginTop:4}}/>
        {i<2&&<div style={{width:2,flex:1,background: "var(--bg-secondary)",marginTop:4}}/>}
      </div>
      <div style={{paddingBottom:8}}>
        <p style={{color: "var(--text-primary)",fontWeight:600,fontSize:14,margin:0}}>{item.title}</p>
        <p style={{color: "var(--text-secondary)",fontSize:12,margin:"2px 0 0"}}>{item.desc}</p>
        <p style={{color: "var(--text-muted)",fontSize:11,margin:"4px 0 0"}}>{item.time}</p>
      </div>
    </div>
  ))}
</div>`;

const KANBAN_REACT = `<div style={{display:"flex",gap:12,overflowX:"auto",padding:20,background: "var(--bg-primary)",borderRadius:20}}>
  {[{col:"To Do",color:"var(--accent)",cards:["Research","Wireframes"]},{col:"In Progress",color:"#f59e0b",cards:["API design"]},{col:"Done",color:"#22c55e",cards:["Auth module","CI/CD"]}].map(col=>(
    <div key={col.col} style={{minWidth:180,background: "var(--bg-secondary)",borderRadius:14,border: "1px solid var(--border)",padding:14}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
        <div style={{width:8,height:8,borderRadius:"50%",background:col.color}}/>
        <span style={{color: "var(--text-secondary)",fontSize:12,fontWeight:600}}>{col.col}</span>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {col.cards.map(c=>(
          <div key={c} style={{background: "var(--bg-secondary)",borderRadius:10,padding:"10px 12px",color: "var(--text-primary)",fontSize:13}}>{c}</div>
        ))}
      </div>
    </div>
  ))}
</div>`;

const AVATAR_REACT = `<div style={{display:"flex",alignItems:"center",gap:20,padding:24,background: "var(--bg-secondary)",borderRadius:20,border: "1px solid var(--border)"}}>
  <div style={{position:"relative"}}>
    <div style={{width:56,height:56,borderRadius:"50%",background:"linear-gradient(135deg,var(--accent),#8b5cf6)",display:"flex",alignItems:"center",justifyContent:"center",color: "var(--text-primary)",fontSize:22,fontWeight:700}}>A</div>
    <div style={{position:"absolute",bottom:2,right:2,width:12,height:12,borderRadius:"50%",background:"#22c55e",border:"2px solid var(--bg-secondary)"}}/>
  </div>
  <div style={{flex:1}}>
    <p style={{color: "var(--text-primary)",fontWeight:600,fontSize:15,margin:0}}>Alex Johnson</p>
    <p style={{color: "var(--text-secondary)",fontSize:12,margin:"2px 0 0"}}>Product Designer · Online</p>
  </div>
  <button style={{background: "var(--accent)",color: "var(--text-primary)",border:"none",borderRadius:10,padding:"8px 16px",fontSize:13,cursor:"pointer",fontWeight:500}}>Follow</button>
</div>`;

const PRICING_REACT = `<div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
  {[{plan:"Starter",price:"$0",features:["5 projects","1GB storage","Email support"],highlight:false},{plan:"Pro",price:"$19",features:["Unlimited projects","50GB storage","Priority support","Custom domain"],highlight:true}].map(p=>(
    <div key={p.plan} style={{flex:"1 1 180px",background:p.highlight?"linear-gradient(135deg,var(--accent),#8b5cf6)":"var(--bg-secondary)",border:p.highlight?"none":"1px solid var(--border)",borderRadius:18,padding:22,color: "var(--text-primary)"}}>
      <p style={{fontSize:12,opacity:.7,margin:0,textTransform:"uppercase",letterSpacing:".12em"}}>{p.plan}</p>
      <p style={{fontSize:32,fontWeight:800,margin:"6px 0 16px"}}>{p.price}<span style={{fontSize:14,fontWeight:400,opacity:.6}}>/mo</span></p>
      {p.features.map(f=><p key={f} style={{fontSize:13,opacity:.8,margin:"4px 0",display:"flex",alignItems:"center",gap:6}}><span>✓</span>{f}</p>)}
      <button style={{marginTop:16,width:"100%",padding:"10px 0",borderRadius:10,border:p.highlight?"2px solid rgba(255,255,255,.3)":"1px solid var(--accent)",background:p.highlight?"rgba(255,255,255,.15)":"transparent",color: "var(--text-primary)",fontSize:13,cursor:"pointer",fontWeight:600}}>Get started</button>
    </div>
  ))}
</div>`;

const TOAST_REACT = `<div style={{display:"flex",flexDirection:"column",gap:10}}>
  {[{type:"success",icon:"✓",bg:"rgba(34,197,94,.1)",border:"rgba(34,197,94,.2)",title:"Saved!",desc:"Your changes have been saved."},
    {type:"error",icon:"✕",bg:"rgba(239,68,68,.1)",border:"rgba(239,68,68,.2)",title:"Error",desc:"Something went wrong."},
    {type:"info",icon:"ℹ",bg:"rgba(99,102,241,.1)",border:"rgba(99,102,241,.2)",title:"Update",desc:"New version available."}
  ].map(t=>(
    <div key={t.type} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",background:t.bg,border:\`1px solid \${t.border}\`,borderRadius:14}}>
      <div style={{width:28,height:28,borderRadius:"50%",background:t.border,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>{t.icon}</div>
      <div>
        <p style={{color: "var(--text-primary)",fontWeight:600,fontSize:13,margin:0}}>{t.title}</p>
        <p style={{color: "var(--text-secondary)",fontSize:12,margin:"2px 0 0"}}>{t.desc}</p>
      </div>
    </div>
  ))}
</div>`;

const PROGRESS_REACT = `<div style={{padding:24,background: "var(--bg-secondary)",borderRadius:20,border: "1px solid var(--border)"}}>
  <h3 style={{color: "var(--text-primary)",fontSize:15,fontWeight:600,margin:"0 0 20px"}}>Skills</h3>
  {[{label:"TypeScript",val:88,color:"var(--accent)"},{label:"React",val:92,color:"#22d3ee"},{label:"Design",val:74,color:"#f59e0b"},{label:"Node.js",val:65,color:"#22c55e"}].map(s=>(
    <div key={s.label} style={{marginBottom:14}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
        <span style={{color: "var(--text-secondary)",fontSize:13}}>{s.label}</span>
        <span style={{color: "var(--text-primary)",fontSize:13,fontWeight:600}}>{s.val}%</span>
      </div>
      <div style={{height:6,background: "var(--bg-secondary)",borderRadius:99,overflow:"hidden"}}>
        <div style={{width:\`\${s.val}%\`,height:"100%",background:s.color,borderRadius:99}}/>
      </div>
    </div>
  ))}
</div>`;

const FEATURE_REACT = `<div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12}}>
  {[{icon:"⚡",title:"Blazing Fast",desc:"Optimized for performance",color:"#f59e0b"},
    {icon:"🔒",title:"Secure",desc:"Enterprise grade security",color:"#22c55e"},
    {icon:"🎨",title:"Beautiful",desc:"Pixel perfect designs",color:"var(--accent)"},
    {icon:"📦",title:"Modular",desc:"Pick only what you need",color:"#ec4899"}
  ].map(f=>(
    <div key={f.title} style={{background: "var(--bg-secondary)",border: "1px solid var(--border)",borderRadius:16,padding:18}}>
      <div style={{width:40,height:40,borderRadius:12,background:\`\${f.color}18\`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,marginBottom:10}}>{f.icon}</div>
      <p style={{color: "var(--text-primary)",fontWeight:600,fontSize:14,margin:0}}>{f.title}</p>
      <p style={{color: "var(--text-secondary)",fontSize:12,margin:"4px 0 0"}}>{f.desc}</p>
    </div>
  ))}
</div>`;

// ─── Framework code generators ──────────────────────────────────────────────

function toVue(jsx: string): string {
  return `<template>\n${jsx
    .replace(/style=\{\{/g, ":style=\"{")
    .replace(/\}\}/g, "}\"")
    .replace(/className=/g, "class=")
    .replace(/\{`/g, "\"")
    .replace(/`\}/g, "\"")
    .replace(/=>/g, "=>")}\n</template>`;
}

function toAstro(jsx: string): string {
  return `---\n// Astro component — no imports needed\n---\n\n${jsx
    .replace(/style=\{\{/g, "style=\"{{")
    .replace(/ className=/g, " class=")
    .replace(/\{`/g, "`")
    .replace(/`\}/g, "`")}`;
}

// ─── Component Data ─────────────────────────────────────────────────────────

function BentoPreview() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gridTemplateRows: "repeat(2,140px)", gap: 10, padding: 16, background: "var(--bg-primary)", borderRadius: 16 }}>
      <div style={{ gridColumn: "span 2", background: "linear-gradient(135deg,var(--accent),#8b5cf6)", borderRadius: 14, padding: 20, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <p style={{ color: "rgba(255,255,255,.6)", fontSize: 11, margin: 0 }}>FEATURED</p>
        <h2 style={{ color: "var(--text-primary)", margin: "4px 0 0", fontSize: 18, fontWeight: 700, fontFamily: "var(--font-merriweather), serif" }}>Bento Grid Layout</h2>
      </div>
      <div style={{ background: "var(--bg-secondary)", borderRadius: 14, border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 36 }}>✦</span>
      </div>
      <div style={{ background: "var(--bg-secondary)", borderRadius: 14, border: "1px solid var(--border)", padding: 16 }}>
        <p style={{ color: "var(--text-secondary)", fontSize: 10, margin: 0 }}>USERS</p>
        <p style={{ color: "var(--text-primary)", fontSize: 24, fontWeight: 700, fontFamily: "var(--font-merriweather), serif", margin: "4px 0 0" }}>12.4k</p>
      </div>
      <div style={{ gridColumn: "span 2", background: "linear-gradient(135deg,#0f172a,#1e1b4b)", borderRadius: 14, border: "1px solid #312e81", padding: 16, display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-primary)", fontSize: 18, flexShrink: 0 }}>★</div>
        <div>
          <p style={{ color: "var(--text-muted)", fontSize: 11, margin: 0 }}>Top Rated</p>
          <p style={{ color: "var(--text-primary)", fontSize: 14, fontWeight: 600, margin: "2px 0 0" }}>Design System</p>
        </div>
      </div>
    </div>
  );
}

function GlassPreview() {
  return (
    <div style={{ minHeight: 180, background: "linear-gradient(135deg,var(--accent),#ec4899)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: "rgba(255,255,255,.12)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,.25)", borderRadius: 18, padding: 24, textAlign: "center", minWidth: 180 }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,.2)", margin: "0 auto 10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>✦</div>
        <h3 style={{ color: "var(--text-primary)", margin: "0 0 4px", fontSize: 16, fontWeight: 700, fontFamily: "var(--font-merriweather), serif" }}>Glassmorphism</h3>
        <p style={{ color: "rgba(255,255,255,.7)", margin: 0, fontSize: 12 }}>Frosted glass effect</p>
      </div>
    </div>
  );
}

function StatPreview() {
  const stats = [{ label: "Revenue", value: "$48.2k", change: "+12.5%", up: true }, { label: "Users", value: "9,241", change: "+8.1%", up: true }, { label: "Churn", value: "2.4%", change: "-0.3%", up: false }];
  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
      {stats.map(s => (
        <div key={s.label} style={{ flex: "1 1 120px", background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 14, padding: "14px 16px" }}>
          <p style={{ color: "var(--text-secondary)", fontSize: 10, margin: 0, textTransform: "uppercase", letterSpacing: ".1em" }}>{s.label}</p>
          <p style={{ color: "var(--text-primary)", fontSize: 22, fontWeight: 700, fontFamily: "var(--font-merriweather), serif", margin: "4px 0 4px" }}>{s.value}</p>
          <span style={{ fontSize: 11, color: s.up ? "#22c55e" : "#ef4444", background: s.up ? "rgba(34,197,94,.1)" : "rgba(239,68,68,.1)", padding: "2px 8px", borderRadius: 20 }}>{s.change}</span>
        </div>
      ))}
    </div>
  );
}

function TimelinePreview() {
  const items = [{ dot: "var(--accent)", title: "Design", desc: "Wireframes approved", time: "2h ago" }, { dot: "#22c55e", title: "Development", desc: "API integration done", time: "5h ago" }, { dot: "#f59e0b", title: "Review", desc: "QA testing in progress", time: "1d ago" }];
  return (
    <div style={{ padding: "16px 20px", background: "var(--bg-primary)", borderRadius: 16 }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 14, paddingBottom: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 11, height: 11, borderRadius: "50%", background: item.dot, flexShrink: 0, marginTop: 4 }} />
            {i < items.length - 1 && <div style={{ width: 2, flex: 1, background: "var(--bg-secondary)", marginTop: 4 }} />}
          </div>
          <div style={{ paddingBottom: 6 }}>
            <p style={{ color: "var(--text-primary)", fontWeight: 600, fontSize: 13, margin: 0 }}>{item.title}</p>
            <p style={{ color: "var(--text-secondary)", fontSize: 12, margin: "2px 0 0" }}>{item.desc}</p>
            <p style={{ color: "var(--text-muted)", fontSize: 11, margin: "4px 0 0" }}>{item.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function KanbanPreview() {
  const cols = [{ col: "To Do", color: "var(--accent)", cards: ["Research", "Wireframes"] }, { col: "In Progress", color: "#f59e0b", cards: ["API design"] }, { col: "Done", color: "#22c55e", cards: ["Auth module", "CI/CD"] }];
  return (
    <div style={{ display: "flex", gap: 10, overflowX: "auto", padding: "16px 4px", background: "var(--bg-primary)", borderRadius: 16 }}>
      {cols.map(c => (
        <div key={c.col} style={{ minWidth: 160, background: "var(--bg-secondary)", borderRadius: 12, border: "1px solid var(--border)", padding: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: c.color }} />
            <span style={{ color: "var(--text-secondary)", fontSize: 11, fontWeight: 600 }}>{c.col}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {c.cards.map(card => <div key={card} style={{ background: "var(--bg-secondary)", borderRadius: 9, padding: "8px 10px", color: "var(--text-primary)", fontSize: 12 }}>{card}</div>)}
          </div>
        </div>
      ))}
    </div>
  );
}

function AvatarPreview() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 20px", background: "var(--bg-secondary)", borderRadius: 18, border: "1px solid var(--border)" }}>
      <div style={{ position: "relative" }}>
        <div style={{ width: 52, height: 52, borderRadius: "50%", background: "linear-gradient(135deg,var(--accent),#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-primary)", fontSize: 20, fontWeight: 700, fontFamily: "var(--font-merriweather), serif" }}>A</div>
        <div style={{ position: "absolute", bottom: 2, right: 2, width: 11, height: 11, borderRadius: "50%", background: "#22c55e", border: "2px solid var(--bg-secondary)" }} />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ color: "var(--text-primary)", fontWeight: 600, fontSize: 14, margin: 0 }}>Alex Johnson</p>
        <p style={{ color: "var(--text-secondary)", fontSize: 12, margin: "2px 0 0" }}>Product Designer · Online</p>
      </div>
      <button style={{ background: "var(--accent)", color: "var(--text-primary)", border: "none", borderRadius: 9, padding: "7px 14px", fontSize: 12, cursor: "pointer", fontWeight: 500 }}>Follow</button>
    </div>
  );
}

function PricingPreview() {
  const plans = [{ plan: "Starter", price: "$0", features: ["5 projects", "1GB storage", "Email support"], highlight: false }, { plan: "Pro", price: "$19", features: ["Unlimited projects", "50GB storage", "Priority support"], highlight: true }];
  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
      {plans.map(p => (
        <div key={p.plan} style={{ flex: "1 1 160px", background: p.highlight ? "linear-gradient(135deg,var(--accent),#8b5cf6)" : "var(--bg-secondary)", border: p.highlight ? "none" : "1px solid var(--border)", borderRadius: 16, padding: 18, color: "var(--text-primary)" }}>
          <p style={{ fontSize: 11, opacity: .7, margin: 0, textTransform: "uppercase", letterSpacing: ".12em" }}>{p.plan}</p>
          <p style={{ fontSize: 28, fontWeight: 800, fontFamily: "var(--font-merriweather), serif", margin: "4px 0 12px" }}>{p.price}<span style={{ fontSize: 13, fontWeight: 400, opacity: .6 }}>/mo</span></p>
          {p.features.map(f => <p key={f} style={{ fontSize: 12, opacity: .8, margin: "3px 0", display: "flex", alignItems: "center", gap: 5 }}><span>✓</span>{f}</p>)}
          <button style={{ marginTop: 12, width: "100%", padding: "9px 0", borderRadius: 9, border: p.highlight ? "1px solid rgba(255,255,255,.3)" : "1px solid var(--accent)", background: p.highlight ? "rgba(255,255,255,.15)" : "transparent", color: "var(--text-primary)", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>Get started</button>
        </div>
      ))}
    </div>
  );
}

function ToastPreview() {
  const toasts = [{ type: "success", icon: "✓", bg: "rgba(34,197,94,.1)", border: "rgba(34,197,94,.3)", title: "Saved!", desc: "Your changes have been saved." }, { type: "error", icon: "✕", bg: "rgba(239,68,68,.1)", border: "rgba(239,68,68,.3)", title: "Error", desc: "Something went wrong." }, { type: "info", icon: "ℹ", bg: "rgba(99,102,241,.1)", border: "rgba(99,102,241,.3)", title: "Update", desc: "New version available." }];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {toasts.map(t => (
        <div key={t.type} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: t.bg, border: `1px solid ${t.border}`, borderRadius: 12 }}>
          <div style={{ width: 26, height: 26, borderRadius: "50%", background: t.border, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}>{t.icon}</div>
          <div>
            <p style={{ color: "var(--text-primary)", fontWeight: 600, fontSize: 12, margin: 0 }}>{t.title}</p>
            <p style={{ color: "var(--text-secondary)", fontSize: 11, margin: "2px 0 0" }}>{t.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProgressPreview() {
  const skills = [{ label: "TypeScript", val: 88, color: "var(--accent)" }, { label: "React", val: 92, color: "#22d3ee" }, { label: "Design", val: 74, color: "#f59e0b" }, { label: "Node.js", val: 65, color: "#22c55e" }];
  return (
    <div style={{ padding: "18px 20px", background: "var(--bg-secondary)", borderRadius: 16, border: "1px solid var(--border)" }}>
      <h3 style={{ color: "var(--text-primary)", fontSize: 13, fontWeight: 600, margin: "0 0 14px" }}>Skills</h3>
      {skills.map(s => (
        <div key={s.label} style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <span style={{ color: "var(--text-secondary)", fontSize: 12 }}>{s.label}</span>
            <span style={{ color: "var(--text-primary)", fontSize: 12, fontWeight: 600 }}>{s.val}%</span>
          </div>
          <div style={{ height: 5, background: "var(--bg-secondary)", borderRadius: 99, overflow: "hidden" }}>
            <div style={{ width: `${s.val}%`, height: "100%", background: s.color, borderRadius: 99 }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function FeaturePreview() {
  const features = [{ icon: "⚡", title: "Blazing Fast", desc: "Optimized for performance", color: "#f59e0b" }, { icon: "🔒", title: "Secure", desc: "Enterprise grade security", color: "#22c55e" }, { icon: "🎨", title: "Beautiful", desc: "Pixel perfect designs", color: "var(--accent)" }, { icon: "📦", title: "Modular", desc: "Pick only what you need", color: "#ec4899" }];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }}>
      {features.map(f => (
        <div key={f.title} style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 14, padding: 14 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `${f.color}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, marginBottom: 8 }}>{f.icon}</div>
          <p style={{ color: "var(--text-primary)", fontWeight: 600, fontSize: 13, margin: 0 }}>{f.title}</p>
          <p style={{ color: "var(--text-secondary)", fontSize: 11, margin: "3px 0 0" }}>{f.desc}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Component definitions ───────────────────────────────────────────────────

const COMPONENTS: InlineComponent[] = [
  { id: "bento-grid", name: "Bento Grid", description: "CSS grid layout with featured cards and stat tiles.", preview: <BentoPreview />, code: { react: BENTO_REACT, vue: toVue(BENTO_REACT), astro: toAstro(BENTO_REACT) } },
  { id: "glass-card", name: "Glass Card", description: "Glassmorphism card with backdrop blur and gradient background.", preview: <GlassPreview />, code: { react: GLASS_REACT, vue: toVue(GLASS_REACT), astro: toAstro(GLASS_REACT) } },
  { id: "stat-ticker", name: "Stat Ticker", description: "KPI stat cards with trend indicators.", preview: <StatPreview />, code: { react: STAT_REACT, vue: toVue(STAT_REACT), astro: toAstro(STAT_REACT) } },
  { id: "timeline", name: "Timeline", description: "Vertical activity timeline with colored dots.", preview: <TimelinePreview />, code: { react: TIMELINE_REACT, vue: toVue(TIMELINE_REACT), astro: toAstro(TIMELINE_REACT) } },
  { id: "kanban-board", name: "Kanban Board", description: "Horizontal kanban columns with task cards.", preview: <KanbanPreview />, code: { react: KANBAN_REACT, vue: toVue(KANBAN_REACT), astro: toAstro(KANBAN_REACT) } },
  { id: "avatar-card", name: "Avatar Card", description: "User profile card with online status indicator.", preview: <AvatarPreview />, code: { react: AVATAR_REACT, vue: toVue(AVATAR_REACT), astro: toAstro(AVATAR_REACT) } },
  { id: "pricing-cards", name: "Pricing Cards", description: "Side-by-side pricing tiers with highlighted plan.", preview: <PricingPreview />, code: { react: PRICING_REACT, vue: toVue(PRICING_REACT), astro: toAstro(PRICING_REACT) } },
  { id: "toast-stack", name: "Toast Stack", description: "Notification toasts with success, error, and info types.", preview: <ToastPreview />, code: { react: TOAST_REACT, vue: toVue(TOAST_REACT), astro: toAstro(TOAST_REACT) } },
  { id: "progress-bars", name: "Progress Bars", description: "Skill-level progress bars with percentage labels.", preview: <ProgressPreview />, code: { react: PROGRESS_REACT, vue: toVue(PROGRESS_REACT), astro: toAstro(PROGRESS_REACT) } },
  { id: "feature-grid", name: "Feature Grid", description: "2×2 feature highlight grid with icons and descriptions.", preview: <FeaturePreview />, code: { react: FEATURE_REACT, vue: toVue(FEATURE_REACT), astro: toAstro(FEATURE_REACT) } },
];

const FW_LABELS: { id: Framework; label: string }[] = [
  { id: "react", label: "React / Next.js" },
  { id: "vue", label: "Vue 3" },
  { id: "astro", label: "Astro" },
];

// ─── Main Client Component ──────────────────────────────────────────────────

export function InlineComponentsClient() {
  const [activeFw, setActiveFw] = useState<Framework>("react");
  const [search, setSearch] = useState("");

  const filtered = COMPONENTS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Hero */}
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "60px 32px 0" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(99,102,241,.12)", border: "1px solid rgba(99,102,241,.25)", borderRadius: 99, padding: "4px 14px", marginBottom: 20 }}>
          <span style={{ fontSize: 12, fontWeight: 600 }}>Pure CSS · Zero Deps</span>
        </div>
        <h1 style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 800, fontFamily: "var(--font-merriweather), serif", margin: "0 0 12px", letterSpacing: "-0.02em", background: "linear-gradient(to right,var(--text-primary),var(--text-secondary))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Inline Components
        </h1>
        <p style={{ fontSize: 16, margin: "0 0 32px", maxWidth: 540, lineHeight: 1.6 }}>
          10 popular UI components built with pure inline CSS. Copy-paste ready for React, Vue 3, and Astro — no class names, no stylesheets.
        </p>

        {/* Framework tabs + search */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", marginBottom: 40 }}>
          <div style={{ display: "flex", border: "1px solid var(--border)", borderRadius: 12, padding: 4, gap: 4 }}>
            {FW_LABELS.map(fw => (
              <button
                key={fw.id}
                onClick={() => setActiveFw(fw.id)}
                style={{
                  padding: "6px 16px",
                  borderRadius: 9,
                  border: "none",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 500,
                  transition: "all .15s",
                  background: activeFw === fw.id ? "var(--accent)" : "transparent",
                  color: activeFw === fw.id ? "var(--text-primary)" : "var(--text-muted)",
                }}
              >
                {fw.label}
              </button>
            ))}
          </div>
          <input
            type="search"
            placeholder="Search components…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, minWidth: 180, maxWidth: 300, background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 10, padding: "8px 14px", color: "var(--text-primary)", fontSize: 13, outline: "none" }}
          />
        </div>

        {/* Count */}
        <p style={{ color: "var(--text-muted)", fontSize: 12, marginBottom: 24 }}>{filtered.length} component{filtered.length !== 1 ? "s" : ""}</p>

        {/* Grid */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32, paddingBottom: 80 }}>
          {filtered.map(comp => (
            <ComponentCard key={comp.id} comp={comp} activeFw={activeFw} />
          ))}
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", color: "var(--text-muted)", padding: "60px 0", fontSize: 14 }}>No components match your search.</div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Single Component Card ──────────────────────────────────────────────────

function ComponentCard({ comp, activeFw }: { comp: InlineComponent; activeFw: Framework }) {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const code = comp.code[activeFw];

  return (
    <div style={{ background: "var(--bg-primary)", border: "1px solid var(--border)", borderRadius: 20, overflow: "hidden" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid var(--border)" }}>
        <div>
          <h2 style={{ color: "var(--text-primary)", fontWeight: 700, fontFamily: "var(--font-merriweather), serif", fontSize: 16, margin: 0 }}>{comp.name}</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 12, margin: "3px 0 0" }}>{comp.description}</p>
        </div>
        <div style={{ display: "flex", background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 9, padding: 3, gap: 3 }}>
          {(["preview", "code"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{ padding: "5px 14px", borderRadius: 7, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 500, background: tab === t ? "var(--accent)" : "transparent", color: tab === t ? "var(--text-primary)" : "var(--text-muted)" }}
            >
              {t === "preview" ? "Preview" : "Code"}
            </button>
          ))}
        </div>
      </div>

      {/* Body */}
      {tab === "preview" ? (
        <div style={{ padding: 24, background: "var(--bg-primary)" }}>
          {comp.preview}
        </div>
      ) : (
        <div style={{ position: "relative" }}>
          <CopyButton text={code} />
          <pre style={{ margin: 0, padding: "20px 20px 20px 20px", overflowX: "auto", fontSize: 12, lineHeight: 1.65, color: "var(--text-secondary)", background: "var(--bg-secondary)", fontFamily: "'Fira Code', 'Cascadia Code', 'Menlo', monospace", maxHeight: 420 }}>
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
