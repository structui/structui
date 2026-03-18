import React from "react";
import { cn } from "@/src/lib/utils";
import { Input } from "./input";
import { Button } from "./button";
import { X, Upload, Phone } from "lucide-react";

// --- Input OTP ---
export const InputOTP = ({ length = 6, onChange }: { length?: number; onChange?: (val: string) => void }) => {
  const [values, setValues] = React.useState(Array(length).fill(""));
  const inputs = React.useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
    onChange?.(newValues.join(""));

    if (value && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex gap-2">
      {values.map((v, i) => (
        <Input
          key={i}
          ref={(el) => {
            inputs.current[i] = el;
          }}
          value={v}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className="w-10 h-12 text-center text-lg font-bold"
          maxLength={1}
        />
      ))}
    </div>
  );
};

// --- Input Tag ---
export const InputTag = ({ tags, setTags }: { tags: string[]; setTags: (tags: string[]) => void }) => {
  const [input, setInput] = React.useState("");

  const addTag = () => {
    if (input && !tags.includes(input)) {
      setTags([...tags, input]);
      setInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-background focus-within:ring-1 focus-within:ring-ring">
      {tags.map((tag) => (
        <span key={tag} className="flex items-center gap-1 px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium">
          {tag}
          <button onClick={() => removeTag(tag)} className="hover:text-destructive">
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addTag()}
        placeholder="Add tag..."
        className="flex-1 bg-transparent outline-none text-sm min-w-[100px]"
      />
    </div>
  );
};

// --- File Upload ---
export const FileUpload = ({ onFileSelect }: { onFileSelect?: (file: File) => void }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = React.useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onFileSelect?.(file);
    }
  };

  return (
    <div 
      onClick={() => inputRef.current?.click()}
      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer hover:bg-muted/50 transition-colors"
    >
      <input type="file" ref={inputRef} onChange={handleFileChange} className="hidden" />
      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
      <p className="text-sm text-muted-foreground">
        {fileName ? fileName : "Click or drag to upload"}
      </p>
    </div>
  );
};
