"use client";

import * as React from "react";
import {
  ChevronDown,
  ChevronRight,
  File,
  FileCode2,
  FileImage,
  FileJson,
  FileText,
  Folder,
  FolderOpen,
} from "lucide-react";
import { cn } from "@/src/lib/utils";

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface TreeNode {
  id: string;
  label: string;
  icon?: React.ReactNode;
  type?: "file" | "folder" | string;
  children?: TreeNode[];
  meta?: string;
  disabled?: boolean;
}

interface TreeViewProps {
  nodes: TreeNode[];
  selectedId?: string | null;
  expandedIds?: Set<string>;
  onSelect?: (node: TreeNode) => void;
  onExpand?: (id: string, expanded: boolean) => void;
  defaultExpandedIds?: Set<string>;
  multiSelect?: boolean;
  selectedIds?: Set<string>;
  onMultiSelect?: (ids: Set<string>) => void;
  showIcons?: boolean;
  className?: string;
  indent?: number;
}

// ─── File icon helper ──────────────────────────────────────────────────────────

function fileIcon(label: string): React.ReactNode {
  const ext = label.split(".").pop()?.toLowerCase();
  const cls = "h-4 w-4 shrink-0";
  if (["ts", "tsx", "js", "jsx"].includes(ext ?? "")) return <FileCode2 className={cn(cls, "text-blue-400")} />;
  if (["json"].includes(ext ?? "")) return <FileJson className={cn(cls, "text-amber-400")} />;
  if (["md", "mdx", "txt"].includes(ext ?? "")) return <FileText className={cn(cls, "text-slate-400")} />;
  if (["png", "jpg", "svg", "gif", "webp"].includes(ext ?? "")) return <FileImage className={cn(cls, "text-pink-400")} />;
  return <File className={cn(cls, "text-muted-foreground/60")} />;
}

// ─── Single tree node ──────────────────────────────────────────────────────────

interface TreeNodeProps {
  node: TreeNode;
  depth: number;
  isExpanded: boolean;
  isSelected: boolean;
  isMultiSelected: boolean;
  onSelect: (node: TreeNode, e: React.MouseEvent) => void;
  onToggle: (id: string) => void;
  renderChildren: (nodes: TreeNode[], depth: number) => React.ReactNode;
  showIcons: boolean;
  indent: number;
}

function TreeNodeItem({
  node,
  depth,
  isExpanded,
  isSelected,
  isMultiSelected,
  onSelect,
  onToggle,
  renderChildren,
  showIcons,
  indent,
}: TreeNodeProps) {
  const isFolder = node.type === "folder" || (node.children && node.children.length > 0);
  const hasChildren = (node.children?.length ?? 0) > 0;

  const handleClick = (e: React.MouseEvent) => {
    if (node.disabled) return;
    if (isFolder && hasChildren) onToggle(node.id);
    onSelect(node, e);
  };

  const handleChevronClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) onToggle(node.id);
  };

  const icon = showIcons
    ? (node.icon ?? (isFolder
      ? (isExpanded ? <FolderOpen className="h-4 w-4 shrink-0 text-amber-400" /> : <Folder className="h-4 w-4 shrink-0 text-amber-400" />)
      : fileIcon(node.label)))
    : null;

  return (
    <div>
      <div
        className={cn(
          "group flex cursor-pointer items-center gap-1 rounded-lg py-1 pr-2 text-sm transition-colors",
          isSelected && "bg-primary/10 text-primary",
          isMultiSelected && !isSelected && "bg-primary/5 text-foreground",
          !isSelected && !isMultiSelected && "text-foreground hover:bg-muted/50",
          node.disabled && "cursor-not-allowed opacity-40",
        )}
        style={{ paddingLeft: `${depth * indent + 4}px` }}
        onClick={handleClick}
        role="treeitem"
        aria-selected={isSelected || isMultiSelected}
        aria-expanded={isFolder ? isExpanded : undefined}
      >
        {/* Chevron */}
        <span
          className="flex h-4 w-4 shrink-0 items-center justify-center"
          onClick={handleChevronClick}
        >
          {hasChildren
            ? (isExpanded
              ? <ChevronDown className="h-3.5 w-3.5 text-muted-foreground transition-transform" />
              : <ChevronRight className="h-3.5 w-3.5 text-muted-foreground transition-transform" />)
            : null}
        </span>

        {/* Icon */}
        {showIcons && <span className="mr-1 flex-shrink-0">{icon}</span>}

        {/* Label */}
        <span className="flex-1 truncate">{node.label}</span>

        {/* Meta */}
        {node.meta && (
          <span className="ml-2 shrink-0 rounded-full bg-muted px-1.5 py-0 text-[10px] font-medium text-muted-foreground">
            {node.meta}
          </span>
        )}
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div>
          {renderChildren(node.children!, depth + 1)}
        </div>
      )}
    </div>
  );
}

// ─── Root TreeView ─────────────────────────────────────────────────────────────

export function TreeView({
  nodes,
  selectedId: controlledSelectedId,
  expandedIds: controlledExpandedIds,
  onSelect,
  onExpand,
  defaultExpandedIds,
  multiSelect = false,
  selectedIds: controlledSelectedIds,
  onMultiSelect,
  showIcons = true,
  className,
  indent = 16,
}: TreeViewProps) {
  const [internalSelectedId, setInternalSelectedId] = React.useState<string | null>(null);
  const [internalExpanded, setInternalExpanded] = React.useState<Set<string>>(
    defaultExpandedIds ?? new Set(),
  );
  const [internalMultiSelected, setInternalMultiSelected] = React.useState<Set<string>>(new Set());

  const selectedId = controlledSelectedId !== undefined ? controlledSelectedId : internalSelectedId;
  const expandedIds = controlledExpandedIds ?? internalExpanded;
  const selectedIds = controlledSelectedIds ?? internalMultiSelected;

  const handleToggle = (id: string) => {
    const next = new Set(expandedIds);
    const wasExpanded = next.has(id);
    wasExpanded ? next.delete(id) : next.add(id);
    if (controlledExpandedIds === undefined) setInternalExpanded(next);
    onExpand?.(id, !wasExpanded);
  };

  const handleSelect = (node: TreeNode, e: React.MouseEvent) => {
    if (node.disabled) return;

    if (multiSelect) {
      const next = new Set(selectedIds);
      if (e.metaKey || e.ctrlKey) {
        next.has(node.id) ? next.delete(node.id) : next.add(node.id);
      } else if (e.shiftKey) {
        // Simplified: just toggle
        next.has(node.id) ? next.delete(node.id) : next.add(node.id);
      } else {
        next.clear();
        next.add(node.id);
      }
      if (controlledSelectedIds === undefined) setInternalMultiSelected(next);
      onMultiSelect?.(next);
    } else {
      if (controlledSelectedId === undefined) setInternalSelectedId(node.id);
    }

    onSelect?.(node);
  };

  const renderNodes = (nodeList: TreeNode[], depth: number): React.ReactNode =>
    nodeList.map((node) => (
      <TreeNodeItem
        key={node.id}
        node={node}
        depth={depth}
        isExpanded={expandedIds.has(node.id)}
        isSelected={!multiSelect && selectedId === node.id}
        isMultiSelected={multiSelect && selectedIds.has(node.id)}
        onSelect={handleSelect}
        onToggle={handleToggle}
        renderChildren={renderNodes}
        showIcons={showIcons}
        indent={indent}
      />
    ));

  return (
    <div
      className={cn("rounded-2xl border border-border/70 bg-card p-2", className)}
      role="tree"
    >
      {renderNodes(nodes, 0)}
    </div>
  );
}

// ─── Keyboard-navigable wrapper ─────────────────────────────────────────────────

export function FileTreeView({
  nodes,
  className,
  onFileOpen,
}: {
  nodes: TreeNode[];
  className?: string;
  onFileOpen?: (node: TreeNode) => void;
}) {
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [expanded, setExpanded] = React.useState<Set<string>>(
    new Set(nodes.filter((n) => n.type === "folder").map((n) => n.id)),
  );
  const [openedFile, setOpenedFile] = React.useState<TreeNode | null>(null);

  const handleSelect = (node: TreeNode) => {
    setSelectedId(node.id);
    if (node.type !== "folder" && !node.children?.length) {
      setOpenedFile(node);
      onFileOpen?.(node);
    }
  };

  const handleExpand = (id: string, isExpanded: boolean) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      isExpanded ? next.add(id) : next.delete(id);
      return next;
    });
  };

  return (
    <div className={cn("flex overflow-hidden rounded-2xl border border-border/70", className)}>
      {/* Tree panel */}
      <div className="w-56 shrink-0 overflow-y-auto border-r bg-card">
        <div className="border-b px-3 py-2.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Explorer
          </p>
        </div>
        <div className="p-1.5">
          <TreeView
            nodes={nodes}
            selectedId={selectedId}
            expandedIds={expanded}
            onSelect={handleSelect}
            onExpand={handleExpand}
            showIcons
            className="border-0 bg-transparent p-0"
          />
        </div>
      </div>

      {/* Preview panel */}
      <div className="flex flex-1 flex-col bg-background">
        {openedFile ? (
          <>
            <div className="flex items-center gap-2 border-b px-4 py-2.5">
              <FileCode2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{openedFile.label}</span>
              <span className="ml-auto text-xs text-muted-foreground">{openedFile.meta ?? "—"}</span>
            </div>
            <div className="flex flex-1 items-center justify-center">
              <p className="text-sm text-muted-foreground">
                File content preview for <strong>{openedFile.label}</strong>
              </p>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
            <Folder className="h-10 w-10 text-muted-foreground/20" />
            <p className="text-sm text-muted-foreground">Select a file to preview</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Sample data ────────────────────────────────────────────────────────────────

export const sampleFileTree: TreeNode[] = [
  {
    id: "app", label: "app", type: "folder", children: [
      { id: "app-layout", label: "layout.tsx", type: "file", meta: "2.1KB" },
      { id: "app-page", label: "page.tsx", type: "file", meta: "3.4KB" },
      {
        id: "app-components", label: "components", type: "folder", children: [
          { id: "app-page-tsx", label: "home-page.tsx", type: "file", meta: "5.2KB" },
          { id: "app-navbar-tsx", label: "navbar.tsx", type: "file", meta: "3.8KB" },
        ]
      },
    ]
  },
  {
    id: "src", label: "src", type: "folder", children: [
      {
        id: "src-components", label: "components", type: "folder", children: [
          {
            id: "src-ui", label: "ui", type: "folder", children: [
              { id: "src-button", label: "button.tsx", type: "file", meta: "1.2KB" },
              { id: "src-card", label: "card.tsx", type: "file", meta: "0.9KB" },
              { id: "src-tree", label: "tree-view.tsx", type: "file", meta: "4.8KB" },
              { id: "src-virtual", label: "virtual-list.tsx", type: "file", meta: "3.6KB" },
            ]
          },
        ]
      },
      {
        id: "src-lib", label: "lib", type: "folder", children: [
          { id: "src-utils", label: "utils.ts", type: "file", meta: "0.4KB" },
          { id: "src-github", label: "github.ts", type: "file", meta: "0.8KB" },
        ]
      },
    ]
  },
  {
    id: "public", label: "public", type: "folder", children: [
      { id: "pub-favicon", label: "favicon.ico", type: "file", meta: "4KB" },
      { id: "pub-og", label: "og.png", type: "file", meta: "42KB" },
    ]
  },
  { id: "package-json", label: "package.json", type: "file", meta: "2.1KB" },
  { id: "tsconfig", label: "tsconfig.json", type: "file", meta: "0.6KB" },
  { id: "readme", label: "README.md", type: "file", meta: "3.2KB" },
];
