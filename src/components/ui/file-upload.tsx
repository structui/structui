"use client";

import * as React from "react";
import { AlertCircle, CheckCircle2, File, FileImage, FileText, Loader2, UploadCloud, X } from "lucide-react";

import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { Progress } from "@/src/components/ui/progress";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface UploadFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  status: "pending" | "uploading" | "done" | "error";
  progress: number;
  error?: string;
  preview?: string;
}

export interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // bytes
  maxFiles?: number;
  className?: string;
  onFilesChange?: (files: UploadFile[]) => void;
  onUpload?: (file: UploadFile) => Promise<void>;
  disabled?: boolean;
  variant?: "default" | "compact" | "image";
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function getFileIcon(type: string) {
  if (type.startsWith("image/")) return FileImage;
  if (type.includes("text") || type.includes("pdf")) return FileText;
  return File;
}

function createUploadFile(file: File): UploadFile {
  const preview = file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined;
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    file,
    name: file.name,
    size: file.size,
    type: file.type,
    status: "pending",
    progress: 0,
    preview,
  };
}

// ─── File Item ────────────────────────────────────────────────────────────────

function FileItem({
  upload,
  onRemove,
}: {
  upload: UploadFile;
  onRemove: (id: string) => void;
}) {
  const Icon = getFileIcon(upload.type);
  const isImage = upload.type.startsWith("image/");

  return (
    <div
      className={cn(
        "group flex items-center gap-3 rounded-xl border border-border/70 bg-background p-3 transition-colors",
        upload.status === "error" && "border-destructive/30 bg-destructive/5",
        upload.status === "done" && "border-emerald-500/20 bg-emerald-500/5",
      )}
    >
      {/* Thumbnail or Icon */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border/60 bg-muted/40">
        {isImage && upload.preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={upload.preview} alt={upload.name} className="h-full w-full object-cover" />
        ) : (
          <Icon className="h-4 w-4 text-muted-foreground" />
        )}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-xs font-medium">{upload.name}</p>
          <div className="flex shrink-0 items-center gap-1.5">
            <span className="text-[10px] text-muted-foreground">{formatBytes(upload.size)}</span>
            {upload.status === "done" && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />}
            {upload.status === "error" && <AlertCircle className="h-3.5 w-3.5 text-destructive" />}
            {upload.status === "uploading" && (
              <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
            )}
          </div>
        </div>
        {upload.status === "uploading" && (
          <Progress value={upload.progress} className="h-1" />
        )}
        {upload.status === "error" && upload.error && (
          <p className="text-[10px] text-destructive">{upload.error}</p>
        )}
      </div>

      {/* Remove */}
      <button
        type="button"
        onClick={() => onRemove(upload.id)}
        className="shrink-0 rounded-md p-1 text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function FileUpload({
  accept,
  multiple = true,
  maxSize = 10 * 1024 * 1024, // 10MB default
  maxFiles = 10,
  className,
  onFilesChange,
  onUpload,
  disabled = false,
  variant = "default",
}: FileUploadProps) {
  const [files, setFiles] = React.useState<UploadFile[]>([]);
  const [isDragging, setIsDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const addFiles = React.useCallback(
    (newFiles: FileList | File[]) => {
      const fileArray = Array.from(newFiles);
      const uploads: UploadFile[] = [];
      const errors: string[] = [];

      for (const file of fileArray) {
        if (files.length + uploads.length >= maxFiles) {
          errors.push(`Max ${maxFiles} files allowed`);
          break;
        }
        if (file.size > maxSize) {
          errors.push(`${file.name} exceeds ${formatBytes(maxSize)}`);
          continue;
        }
        uploads.push(createUploadFile(file));
      }

      const updated = [...files, ...uploads];
      setFiles(updated);
      onFilesChange?.(updated);

      // Auto-upload if handler provided
      if (onUpload) {
        uploads.forEach(async (upload) => {
          setFiles((prev) =>
            prev.map((f) => (f.id === upload.id ? { ...f, status: "uploading", progress: 0 } : f)),
          );
          try {
            // Simulate progress
            const interval = setInterval(() => {
              setFiles((prev) =>
                prev.map((f) => {
                  if (f.id !== upload.id || f.status !== "uploading") return f;
                  const next = Math.min(f.progress + Math.random() * 30, 90);
                  return { ...f, progress: next };
                }),
              );
            }, 200);
            await onUpload(upload);
            clearInterval(interval);
            setFiles((prev) =>
              prev.map((f) =>
                f.id === upload.id ? { ...f, status: "done", progress: 100 } : f,
              ),
            );
          } catch (err) {
            setFiles((prev) =>
              prev.map((f) =>
                f.id === upload.id
                  ? { ...f, status: "error", error: "Upload failed. Please try again." }
                  : f,
              ),
            );
          }
        });
      }
    },
    [files, maxFiles, maxSize, onFilesChange, onUpload],
  );

  const removeFile = React.useCallback(
    (id: string) => {
      setFiles((prev) => {
        const next = prev.filter((f) => f.id !== id);
        onFilesChange?.(next);
        return next;
      });
    },
    [onFilesChange],
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (!disabled) addFiles(e.dataTransfer.files);
  };

  const isCompact = variant === "compact";

  return (
    <div className={cn("space-y-3", className)}>
      {/* Drop zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        className={cn(
          "relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all",
          isCompact ? "gap-2 p-5" : "gap-3 p-10",
          isDragging
            ? "border-primary bg-primary/5 scale-[1.01]"
            : "border-border/70 bg-muted/20 hover:border-primary/40 hover:bg-muted/40",
          disabled && "pointer-events-none opacity-50",
        )}
      >
        <div
          className={cn(
            "flex items-center justify-center rounded-2xl border border-border/60 bg-background transition-colors",
            isCompact ? "h-10 w-10" : "h-14 w-14",
            isDragging && "border-primary/30 bg-primary/8",
          )}
        >
          <UploadCloud
            className={cn(
              "transition-colors",
              isCompact ? "h-5 w-5" : "h-7 w-7",
              isDragging ? "text-primary" : "text-muted-foreground",
            )}
          />
        </div>
        <div className="text-center">
          <p className={cn("font-medium", isCompact ? "text-xs" : "text-sm")}>
            {isDragging ? "Drop files here" : "Drag & drop or click to upload"}
          </p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            {accept
              ? `${accept.split(",").join(", ")} — `
              : ""}
            up to {formatBytes(maxSize)}
            {multiple ? `, max ${maxFiles} files` : ""}
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="sr-only"
          onChange={(e) => e.target.files && addFiles(e.target.files)}
          disabled={disabled}
        />
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              {files.length} file{files.length > 1 ? "s" : ""} selected
            </p>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-7 rounded-full text-xs text-muted-foreground"
              onClick={() => {
                setFiles([]);
                onFilesChange?.([]);
              }}
            >
              Clear all
            </Button>
          </div>
          <div className="space-y-2">
            {files.map((upload) => (
              <FileItem key={upload.id} upload={upload} onRemove={removeFile} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Demo ─────────────────────────────────────────────────────────────────────

export function FileUploadDemo() {
  return (
    <div className="space-y-8 p-6">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Default Upload</h3>
        <FileUpload
          accept="image/*,.pdf,.doc,.docx"
          maxSize={5 * 1024 * 1024}
          maxFiles={5}
          onFilesChange={(files) => console.log("Files:", files)}
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Compact Variant</h3>
        <FileUpload
          variant="compact"
          accept="image/*"
          multiple={false}
          maxSize={2 * 1024 * 1024}
        />
      </div>
    </div>
  );
}
