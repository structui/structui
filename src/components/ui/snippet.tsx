import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/src/lib/utils";

// ─── Token Types ──────────────────────────────────────────────────────────────
type TokenType =
  | "keyword"
  | "string"
  | "comment"
  | "number"
  | "tag"
  | "attr"
  | "plain"
  | "prop"
  | "cssvar"
  | "command"
  | "operator";

type Token = { type: TokenType; value: string };

// ─── Color Map ────────────────────────────────────────────────────────────────
const TOKEN_COLOR: Record<TokenType, string> = {
  keyword:  "#c792ea",
  string:   "#c3e88d",
  comment:  "#546e7a",
  number:   "#f78c6c",
  tag:      "#89ddff",
  attr:     "#ffcb6b",
  plain:    "#cdd3de",
  operator: "#89ddff",
  prop:     "#80cbc4",
  cssvar:   "#89ddff",
  command:  "#82aaff",
};

// ─── JS/TS/JSX Tokenizer ─────────────────────────────────────────────────────
const JS_KW = new Set([
  "import","export","from","const","let","var","function","return","if","else",
  "for","while","do","switch","case","break","continue","class","extends","new",
  "this","super","typeof","instanceof","in","of","async","await","try","catch",
  "finally","throw","null","undefined","true","false","default","type",
  "interface","enum","as","readonly","abstract","implements","public","private",
  "protected","static","declare","namespace","module","keyof","infer","never",
  "any","unknown","void","React","useState","useEffect","useRef","useMemo",
  "useCallback","useContext",
]);

function tokenizeJS(code: string): Token[] {
  const t: Token[] = [];
  let i = 0;
  while (i < code.length) {
    const ch = code[i];
    // Line comment
    if (ch === "/" && code[i + 1] === "/") {
      const end = code.indexOf("\n", i);
      const v = end === -1 ? code.slice(i) : code.slice(i, end);
      t.push({ type: "comment", value: v }); i += v.length; continue;
    }
    // Block comment
    if (ch === "/" && code[i + 1] === "*") {
      const end = code.indexOf("*/", i + 2);
      const v = end === -1 ? code.slice(i) : code.slice(i, end + 2);
      t.push({ type: "comment", value: v }); i += v.length; continue;
    }
    // Template literal
    if (ch === "`") {
      let j = i + 1;
      while (j < code.length) { if (code[j] === "\\") { j += 2; } else if (code[j] === "`") { j++; break; } else j++; }
      t.push({ type: "string", value: code.slice(i, j) }); i = j; continue;
    }
    // Double-quoted string
    if (ch === '"') {
      let j = i + 1;
      while (j < code.length) { if (code[j] === "\\") { j += 2; } else if (code[j] === '"') { j++; break; } else j++; }
      t.push({ type: "string", value: code.slice(i, j) }); i = j; continue;
    }
    // Single-quoted string
    if (ch === "'") {
      let j = i + 1;
      while (j < code.length) { if (code[j] === "\\") { j += 2; } else if (code[j] === "'") { j++; break; } else j++; }
      t.push({ type: "string", value: code.slice(i, j) }); i = j; continue;
    }
    // JSX tag
    if (ch === "<" && i + 1 < code.length && (code[i + 1] === "/" || /[A-Za-z]/.test(code[i + 1]))) {
      let j = i + 1;
      if (code[j] === "/") j++;
      while (j < code.length && /[A-Za-z0-9._]/.test(code[j])) j++;
      if (j > i + 1) { t.push({ type: "tag", value: code.slice(i, j) }); i = j; continue; }
    }
    // Identifier / keyword
    if (/[a-zA-Z_$]/.test(ch)) {
      let j = i + 1;
      while (j < code.length && /[a-zA-Z0-9_$]/.test(code[j])) j++;
      const w = code.slice(i, j);
      t.push({ type: JS_KW.has(w) ? "keyword" : "plain", value: w }); i = j; continue;
    }
    // Number
    if (/\d/.test(ch) || (ch === "." && /\d/.test(code[i + 1] ?? ""))) {
      let j = i + 1;
      while (j < code.length && /[\d.xXa-fA-F_n]/.test(code[j])) j++;
      t.push({ type: "number", value: code.slice(i, j) }); i = j; continue;
    }
    t.push({ type: "plain", value: ch }); i++;
  }
  return t;
}

// ─── CSS Tokenizer ────────────────────────────────────────────────────────────
function tokenizeCSS(code: string): Token[] {
  const t: Token[] = [];
  let i = 0;
  while (i < code.length) {
    const ch = code[i];
    if (ch === "/" && code[i + 1] === "*") {
      const end = code.indexOf("*/", i + 2);
      const v = end === -1 ? code.slice(i) : code.slice(i, end + 2);
      t.push({ type: "comment", value: v }); i += v.length; continue;
    }
    if (ch === "-" && code[i + 1] === "-") {
      let j = i + 2;
      while (j < code.length && /[a-zA-Z0-9_-]/.test(code[j])) j++;
      t.push({ type: "cssvar", value: code.slice(i, j) }); i = j; continue;
    }
    if (ch === "#" && /[0-9a-fA-F]/.test(code[i + 1] ?? "")) {
      let j = i + 1;
      while (j < code.length && /[0-9a-fA-F]/.test(code[j])) j++;
      t.push({ type: "number", value: code.slice(i, j) }); i = j; continue;
    }
    if (ch === '"' || ch === "'") {
      const q = ch; let j = i + 1;
      while (j < code.length && code[j] !== q) j++;
      t.push({ type: "string", value: code.slice(i, j + 1) }); i = j + 1; continue;
    }
    if (/[a-zA-Z_]/.test(ch)) {
      let j = i + 1;
      while (j < code.length && /[a-zA-Z0-9_-]/.test(code[j])) j++;
      const w = code.slice(i, j);
      let k = j;
      while (k < code.length && code[k] === " ") k++;
      const isProp = code[k] === ":" && code[k + 1] !== ":";
      t.push({ type: isProp ? "prop" : "plain", value: w }); i = j; continue;
    }
    if (/\d/.test(ch)) {
      let j = i + 1;
      while (j < code.length && /[\d.]/.test(code[j])) j++;
      while (j < code.length && /[a-zA-Z%]/.test(code[j])) j++;
      t.push({ type: "number", value: code.slice(i, j) }); i = j; continue;
    }
    t.push({ type: "plain", value: ch }); i++;
  }
  return t;
}

// ─── Bash Tokenizer ───────────────────────────────────────────────────────────
const BASH_CMDS = new Set([
  "npx","npm","pnpm","yarn","node","strui","ls","cd","mkdir","git","echo",
  "export","source","curl","wget","sudo","chmod","cat","touch","cp","mv","rm",
]);

function tokenizeBash(code: string): Token[] {
  const t: Token[] = [];
  let i = 0;
  while (i < code.length) {
    const ch = code[i];
    if (ch === "#") {
      const end = code.indexOf("\n", i);
      const v = end === -1 ? code.slice(i) : code.slice(i, end);
      t.push({ type: "comment", value: v }); i += v.length; continue;
    }
    if (ch === '"') {
      let j = i + 1;
      while (j < code.length) { if (code[j] === "\\") { j += 2; } else if (code[j] === '"') { j++; break; } else j++; }
      t.push({ type: "string", value: code.slice(i, j) }); i = j; continue;
    }
    if (ch === "'") {
      let j = i + 1;
      while (j < code.length && code[j] !== "'") j++;
      t.push({ type: "string", value: code.slice(i, j + 1) }); i = j + 1; continue;
    }
    if (ch === "-" && i + 1 < code.length && (code[i + 1] === "-" || /[a-zA-Z]/.test(code[i + 1]))) {
      let j = i + 1;
      if (code[j] === "-") j++;
      while (j < code.length && /[a-zA-Z0-9_-]/.test(code[j])) j++;
      t.push({ type: "attr", value: code.slice(i, j) }); i = j; continue;
    }
    if (/[a-zA-Z_]/.test(ch)) {
      let j = i + 1;
      while (j < code.length && /[a-zA-Z0-9_]/.test(code[j])) j++;
      const w = code.slice(i, j);
      t.push({ type: BASH_CMDS.has(w) ? "command" : "plain", value: w }); i = j; continue;
    }
    t.push({ type: "plain", value: ch }); i++;
  }
  return t;
}

function getTokens(code: string, language: string): Token[] {
  switch (language.toLowerCase()) {
    case "css": return tokenizeCSS(code);
    case "bash":
    case "sh":
    case "shell": return tokenizeBash(code);
    default: return tokenizeJS(code);
  }
}

// ─── Snippet Component ────────────────────────────────────────────────────────
interface SnippetProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
  showLineNumbers?: boolean;
}

export const Snippet = ({
  code,
  language = "bash",
  filename,
  className,
  showLineNumbers = false,
}: SnippetProps) => {
  const [copied, setCopied] = useState(false);
  const tokens = getTokens(code, language);
  const lines = code.split("\n");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Render tokens as React nodes
  const rendered = tokens.map((token, idx) => {
    if (token.type === "plain") return token.value;
    return (
      <span key={idx} style={{ color: TOKEN_COLOR[token.type] }}>
        {token.type === "comment" ? <em>{token.value}</em> : token.value}
      </span>
    );
  });

  return (
    <div className={cn("relative my-4 rounded-xl overflow-hidden bg-[#0d1117] border border-white/10 shadow-2xl", className)}>
      {/* macOS-style header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>
          {filename && (
            <span className="ml-1 text-xs font-mono text-zinc-400 border border-white/10 px-2 py-0.5 rounded-md bg-white/5">
              {filename}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded">
            {language}
          </span>
          <button
            onClick={copyToClipboard}
            className="flex items-center justify-center w-7 h-7 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Copy code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Code area */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm font-mono leading-relaxed m-0 bg-transparent">
          {showLineNumbers ? (
            <table className="w-full border-collapse">
              <tbody>
                {lines.map((_, lineIdx) => {
                  // Count tokens for this line range
                  return (
                    <tr key={lineIdx}>
                      <td className="select-none text-right pr-4 text-zinc-600 text-xs w-8 align-top">
                        {lineIdx + 1}
                      </td>
                      <td className="align-top">
                        {lineIdx < lines.length - 1 ? (
                          <>{lines[lineIdx]}<br /></>
                        ) : lines[lineIdx]}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <code style={{ color: TOKEN_COLOR.plain }}>{rendered}</code>
          )}
        </pre>
      </div>
    </div>
  );
};
