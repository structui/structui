import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Button } from "./button";
import { Input } from "./input";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogPortal = DialogPrimitive.Portal;

export const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-3xl",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

// --- Specialized Modals ---

export const SignInModal = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline" className="rounded-full px-6 font-light tracking-wide">Sign In</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[400px]">
      <div className="flex flex-col items-center text-center space-y-4 py-4">
        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
          <span className="text-xl font-bold tracking-tighter">S<span className="text-primary/60">U</span></span>
        </div>
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
          <p className="text-sm text-muted-foreground">Enter your credentials to access your account</p>
        </div>
      </div>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email</label>
          <Input type="email" placeholder="name@example.com" className="rounded-xl border-primary/10" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Password</label>
            <button className="text-xs text-primary/60 hover:text-primary transition-colors">Forgot password?</button>
          </div>
          <Input type="password" placeholder="••••••••" className="rounded-xl border-primary/10" />
        </div>
        <Button className="w-full rounded-xl h-11 font-light tracking-widest">Sign In</Button>
      </div>
      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-primary/5"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="rounded-xl border-primary/10 font-light">Google</Button>
        <Button variant="outline" className="rounded-xl border-primary/10 font-light">GitHub</Button>
      </div>
      <p className="text-center text-xs text-muted-foreground pt-4">
        Don't have an account? <button className="text-primary font-medium">Sign up</button>
      </p>
    </DialogContent>
  </Dialog>
);

export const AlertDialog = ({ 
  title, 
  description, 
  cancelText = "Cancel", 
  actionText = "Continue", 
  onAction 
}: { 
  title: string; 
  description: string; 
  cancelText?: string; 
  actionText?: string; 
  onAction?: () => void;
}) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="destructive" className="rounded-full px-6 font-light tracking-wide">Delete Item</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <div className="space-y-2">
        <h2 className="text-xl font-bold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
      <div className="flex justify-end gap-3 mt-6">
        <DialogPrimitive.Close asChild>
          <Button variant="outline" className="rounded-xl border-primary/10 font-light">
            {cancelText}
          </Button>
        </DialogPrimitive.Close>
        <Button onClick={onAction} variant="destructive" className="rounded-xl font-light">
          {actionText}
        </Button>
      </div>
    </DialogContent>
  </Dialog>
);
