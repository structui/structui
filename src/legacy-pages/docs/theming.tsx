import React from "react";
import { DocsPageShell, ThemingDocsContent } from "./shared";

export const ThemingPage = (): React.JSX.Element => (
  <DocsPageShell
    title="Theming"
    description="Customize every aspect of your application appearance with CSS variables and token-driven theming."
  >
    <ThemingDocsContent />
  </DocsPageShell>
);
