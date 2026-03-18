import React from "react";
import { CliDocsContent, DocsPageShell } from "./shared";

export const CliPage = (): React.JSX.Element => (
  <DocsPageShell
    title="The strui CLI"
    description="Automate your workflow with the canonical command surface for components, blocks, and template initialization."
  >
    <CliDocsContent />
  </DocsPageShell>
);
