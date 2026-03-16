import React from "react";
import { Container } from "@/src/components/layout/container";
import { CodeBlock } from "@/src/components/ui/code-block";
import { Terminal, Download, Package, Zap } from "lucide-react";

export const CliPage = () => {
  return (
    <div className="py-12 space-y-12">
      <Container>
        <div className="max-w-3xl space-y-4">
          <h1 className="text-5xl font-thin tracking-tighter">The strui CLI</h1>
          <p className="text-xl text-muted-foreground font-light">
            Automate your workflow with our powerful command-line interface. 
            Add components, manage themes, and initialize projects in seconds.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <div className="p-8 border rounded-3xl bg-muted/5 space-y-4">
            <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Download className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold">Installation</h3>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              Install the CLI globally to use it anywhere in your terminal.
            </p>
            <CodeBlock code="npm install -g strui" language="bash" />
          </div>

          <div className="p-8 border rounded-3xl bg-muted/5 space-y-4">
            <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold">Initialization</h3>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              Set up a new project with the recommended folder structure and configuration.
            </p>
            <CodeBlock code="strui init" language="bash" />
          </div>
        </div>

        <div className="mt-16 space-y-8">
          <h2 className="text-3xl font-thin tracking-tighter">Common Commands</h2>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <h4 className="text-lg font-bold">Add a Component</h4>
              <p className="text-sm text-muted-foreground font-light">Downloads and installs a component directly into your project.</p>
              <CodeBlock code="strui add button" language="bash" />
            </div>

            <div className="space-y-2">
              <h4 className="text-lg font-bold">List Components</h4>
              <p className="text-sm text-muted-foreground font-light">See all available components in the registry.</p>
              <CodeBlock code="strui list" language="bash" />
            </div>

            <div className="space-y-2">
              <h4 className="text-lg font-bold">Update CLI</h4>
              <p className="text-sm text-muted-foreground font-light">Keep your CLI up to date with the latest features.</p>
              <CodeBlock code="strui update" language="bash" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
