import React from "react";
import { Container } from "@/src/components/layout/container";
import { CodeBlock } from "@/src/components/ui/code-block";
import { Palette, Sun, Moon, Leaf } from "lucide-react";

export const ThemingPage = () => {
  return (
    <div className="py-12 space-y-12">
      <Container>
        <div className="max-w-3xl space-y-4">
          <h1 className="text-5xl font-thin tracking-tighter">Theming</h1>
          <p className="text-xl text-muted-foreground font-light">
            Customize every aspect of your application's appearance. 
            StructUI uses CSS variables for effortless and dynamic theming.
          </p>
        </div>

        <div className="mt-16 space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-thin tracking-tighter">CSS Variables</h2>
            <p className="text-muted-foreground font-light leading-relaxed">
              Our theme system is built on top of standard CSS variables. You can override these in your global CSS file to change the look and feel of your entire app.
            </p>
            <CodeBlock 
              code={`:root {
  --background: #f7f8fa;
  --foreground: #1a1a1a;
  --primary: #1a1a1a;
  --primary-foreground: #f7f8fa;
  --radius: 0.5rem;
}`} 
              language="css" 
            />
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-thin tracking-tighter">Built-in Themes</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="p-6 border rounded-3xl bg-background space-y-3">
                <Sun className="h-5 w-5 text-amber-500" />
                <h4 className="font-bold">Light</h4>
                <p className="text-xs text-muted-foreground font-light">Clean, high-contrast light mode for maximum legibility.</p>
              </div>
              <div className="p-6 border rounded-3xl bg-[#0f1115] text-white space-y-3">
                <Moon className="h-5 w-5 text-indigo-400" />
                <h4 className="font-bold">Dark</h4>
                <p className="text-xs text-muted-foreground font-light">Sophisticated dark mode for reduced eye strain.</p>
              </div>
              <div className="p-6 border rounded-3xl bg-[#f0f2eb] text-[#2d331f] space-y-3">
                <Leaf className="h-5 w-5 text-emerald-600" />
                <h4 className="font-bold">Khaki</h4>
                <p className="text-xs text-muted-foreground font-light">Organic, warm tones for a natural and approachable feel.</p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-thin tracking-tighter">Usage in Tailwind</h2>
            <p className="text-muted-foreground font-light leading-relaxed">
              All variables are mapped to Tailwind utility classes automatically.
            </p>
            <CodeBlock 
              code={`<div className="bg-background text-foreground border-primary/10">
  <h1 className="text-primary">Hello World</h1>
</div>`} 
              language="tsx" 
            />
          </section>
        </div>
      </Container>
    </div>
  );
};
