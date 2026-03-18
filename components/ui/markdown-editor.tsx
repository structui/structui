import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Textarea } from "./textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

export const MarkdownEditor = ({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}) => {
  return (
    <Tabs defaultValue="edit" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-2">
        <TabsTrigger value="edit">Edit</TabsTrigger>
        <TabsTrigger value="preview">Preview</TabsTrigger>
      </TabsList>
      <TabsContent value="edit">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-h-[200px] font-mono"
        />
      </TabsContent>
      <TabsContent value="preview">
        <div className="min-h-[200px] p-4 border rounded-md bg-muted/30 prose prose-sm dark:prose-invert max-w-none">
          <ReactMarkdown>{value || "*Nothing to preview*"}</ReactMarkdown>
        </div>
      </TabsContent>
    </Tabs>
  );
};
