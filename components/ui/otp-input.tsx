"use client";

import * as React from "react";

import { cn } from "@/src/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface OtpInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
  inputClassName?: string;
  type?: "numeric" | "alphanumeric";
  mask?: boolean;
  separator?: React.ReactNode;
  error?: boolean;
  success?: boolean;
  size?: "sm" | "md" | "lg";
}

const SIZE_CLASSES = {
  sm: "h-9 w-9 text-base",
  md: "h-12 w-12 text-xl",
  lg: "h-14 w-14 text-2xl",
};

// ─── OTP Input ────────────────────────────────────────────────────────────────

export function OtpInput({
  length = 6,
  value = "",
  onChange,
  onComplete,
  disabled = false,
  autoFocus = false,
  className,
  inputClassName,
  type = "numeric",
  mask = false,
  separator,
  error = false,
  success = false,
  size = "md",
}: OtpInputProps) {
  const inputsRef = React.useRef<(HTMLInputElement | null)[]>([]);
  const [localValues, setLocalValues] = React.useState<string[]>(
    () => value.split("").concat(Array(length).fill("")).slice(0, length),
  );

  // Sync from controlled value
  React.useEffect(() => {
    const incoming = value.split("").concat(Array(length).fill("")).slice(0, length);
    setLocalValues(incoming);
  }, [value, length]);

  const focus = (index: number) => {
    inputsRef.current[index]?.focus();
  };

  const handleChange = (index: number, raw: string) => {
    const isValid = type === "numeric" ? /^\d*$/.test(raw) : /^[a-zA-Z0-9]*$/.test(raw);
    if (!isValid) return;

    // Handle paste
    if (raw.length > 1) {
      const chars = raw.split("").slice(0, length - index);
      const next = [...localValues];
      chars.forEach((c, i) => {
        if (index + i < length) next[index + i] = c;
      });
      setLocalValues(next);
      const combined = next.join("");
      onChange?.(combined);
      const nextFocus = Math.min(index + chars.length, length - 1);
      focus(nextFocus);
      if (next.every((v) => v !== "")) onComplete?.(combined);
      return;
    }

    const next = [...localValues];
    next[index] = raw;
    setLocalValues(next);
    const combined = next.join("");
    onChange?.(combined);
    if (raw && index < length - 1) focus(index + 1);
    if (next.every((v) => v !== "")) onComplete?.(combined);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (localValues[index]) {
        const next = [...localValues];
        next[index] = "";
        setLocalValues(next);
        onChange?.(next.join(""));
      } else if (index > 0) {
        const next = [...localValues];
        next[index - 1] = "";
        setLocalValues(next);
        onChange?.(next.join(""));
        focus(index - 1);
      }
    }
    if (e.key === "ArrowLeft" && index > 0) focus(index - 1);
    if (e.key === "ArrowRight" && index < length - 1) focus(index + 1);
    if (e.key === "Delete") {
      const next = [...localValues];
      next[index] = "";
      setLocalValues(next);
      onChange?.(next.join(""));
    }
  };

  const handleFocus = (index: number) => {
    inputsRef.current[index]?.select();
  };

  const inputClass = cn(
    "rounded-xl border border-border bg-background text-center font-mono font-bold tracking-widest transition-all outline-none",
    "focus:border-primary focus:ring-2 focus:ring-primary/20",
    SIZE_CLASSES[size],
    error && "border-destructive focus:border-destructive focus:ring-destructive/20",
    success && "border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500/20",
    disabled && "pointer-events-none opacity-50",
    inputClassName,
  );

  // Separator placement (typically at half, for 6-digit OTPs at position 3)
  const showSeparatorAfter = length === 6 ? 2 : Math.floor(length / 2) - 1;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {localValues.map((val, i) => (
        <React.Fragment key={i}>
          <input
            ref={(el) => { inputsRef.current[i] = el; }}
            type={mask ? "password" : "text"}
            inputMode={type === "numeric" ? "numeric" : "text"}
            pattern={type === "numeric" ? "[0-9]*" : "[a-zA-Z0-9]*"}
            maxLength={2}
            value={val}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onFocus={() => handleFocus(i)}
            autoFocus={autoFocus && i === 0}
            disabled={disabled}
            className={inputClass}
            aria-label={`OTP digit ${i + 1}`}
          />
          {separator && i === showSeparatorAfter && (
            <div className="text-muted-foreground">{separator}</div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── OTP Form ─────────────────────────────────────────────────────────────────

export interface OtpFormProps {
  title?: string;
  description?: string;
  length?: number;
  onVerify?: (code: string) => void | Promise<void>;
  onResend?: () => void | Promise<void>;
  resendCooldown?: number; // seconds
  className?: string;
}

export function OtpForm({
  title = "Verify your email",
  description = "We sent a 6-digit code to your email.",
  length = 6,
  onVerify,
  onResend,
  resendCooldown = 30,
  className,
}: OtpFormProps) {
  const [otp, setOtp] = React.useState("");
  const [state, setState] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = React.useState("");
  const [cooldown, setCooldown] = React.useState(0);

  const startCooldown = () => {
    setCooldown(resendCooldown);
    const interval = setInterval(() => {
      setCooldown((c) => {
        if (c <= 1) { clearInterval(interval); return 0; }
        return c - 1;
      });
    }, 1000);
  };

  const handleVerify = async (code: string) => {
    if (code.length < length) return;
    setState("loading");
    setErrorMsg("");
    try {
      await onVerify?.(code);
      setState("success");
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "Invalid code. Please try again.");
      setOtp("");
    }
  };

  const handleResend = async () => {
    if (cooldown > 0) return;
    try {
      await onResend?.();
      startCooldown();
    } catch {
      // silently fail
    }
  };

  return (
    <div className={cn("flex flex-col items-center gap-6", className)}>
      <div className="text-center space-y-1.5">
        <h2 className="text-xl font-bold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <OtpInput
        length={length}
        value={otp}
        onChange={setOtp}
        onComplete={handleVerify}
        disabled={state === "loading" || state === "success"}
        autoFocus
        error={state === "error"}
        success={state === "success"}
        separator={<span className="text-lg font-light text-border">—</span>}
        size="lg"
      />

      {state === "error" && errorMsg && (
        <p className="rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-2 text-xs text-destructive">
          {errorMsg}
        </p>
      )}
      {state === "success" && (
        <p className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 text-xs text-emerald-600 dark:text-emerald-400">
          Verification successful!
        </p>
      )}

      <button
        type="button"
        onClick={handleResend}
        disabled={cooldown > 0}
        className="text-xs text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
      >
        {cooldown > 0 ? `Resend code in ${cooldown}s` : "Didn't receive a code? Resend"}
      </button>
    </div>
  );
}

// ─── Demo ─────────────────────────────────────────────────────────────────────

export function OtpInputDemo() {
  const [value, setValue] = React.useState("");

  return (
    <div className="flex flex-col items-center gap-8 p-10">
      <div className="space-y-3 text-center">
        <h3 className="text-sm font-semibold">Basic OTP</h3>
        <OtpInput
          length={6}
          value={value}
          onChange={setValue}
          onComplete={(v) => console.log("Complete:", v)}
          separator={<span className="text-muted-foreground">·</span>}
        />
        <p className="font-mono text-xs text-muted-foreground">Value: {value || "—"}</p>
      </div>
      <div className="w-full max-w-sm rounded-2xl border border-border/70 bg-card p-6">
        <OtpForm
          onVerify={async (code) => {
            await new Promise((r) => setTimeout(r, 1000));
            if (code !== "123456") throw new Error("Invalid code. Try 123456.");
          }}
          onResend={async () => {
            await new Promise((r) => setTimeout(r, 500));
          }}
        />
      </div>
    </div>
  );
}
