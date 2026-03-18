import React from "react";
import { Snippet } from "./snippet";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

// CodeBlock is a thin wrapper around Snippet for backward compatibility
export const CodeBlock = ({ code, language = "tsx", filename }: CodeBlockProps) => {
  return <Snippet code={code} language={language} filename={filename} />;
};
