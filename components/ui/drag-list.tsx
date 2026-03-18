"use client";

import * as React from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, GripHorizontal, Plus, Trash2, X } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Badge } from "./badge";
import { Button } from "./button";

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface DragListItem {
  id: string;
  [key: string]: unknown;
}

interface SortableItemProps<T extends DragListItem> {
  item: T;
  renderItem: (item: T, handle: React.ReactNode) => React.ReactNode;
  onDelete?: (id: string) => void;
  direction: "vertical" | "horizontal";
  disabled?: boolean;
}

// ─── Sortable item wrapper ──────────────────────────────────────────────────────

function SortableItem<T extends DragListItem>({
  item,
  renderItem,
  onDelete,
  direction,
  disabled,
}: SortableItemProps<T>) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id, disabled });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 50 : undefined,
  };

  const handle = (
    <button
      {...attributes}
      {...listeners}
      className="flex h-6 w-6 shrink-0 cursor-grab items-center justify-center rounded-md text-muted-foreground/50 transition-colors hover:text-muted-foreground active:cursor-grabbing"
      tabIndex={-1}
    >
      {direction === "vertical"
        ? <GripVertical className="h-4 w-4" />
        : <GripHorizontal className="h-4 w-4" />}
    </button>
  );

  return (
    <div ref={setNodeRef} style={style} className={cn("relative group", isDragging && "pointer-events-none")}>
      {renderItem(item, handle)}
      {onDelete && (
        <button
          onClick={() => onDelete(item.id)}
          className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-border bg-background text-muted-foreground opacity-0 shadow-sm transition-opacity hover:text-destructive group-hover:opacity-100"
        >
          <X className="h-2.5 w-2.5" />
        </button>
      )}
    </div>
  );
}

// ─── Main DragList ─────────────────────────────────────────────────────────────

interface DragListProps<T extends DragListItem> {
  items: T[];
  onReorder: (items: T[]) => void;
  renderItem: (item: T, handle: React.ReactNode) => React.ReactNode;
  renderOverlay?: (item: T) => React.ReactNode;
  direction?: "vertical" | "horizontal";
  onDelete?: (id: string) => void;
  className?: string;
  itemClassName?: string;
  disabled?: boolean;
}

export function DragList<T extends DragListItem>({
  items,
  onReorder,
  renderItem,
  renderOverlay,
  direction = "vertical",
  onDelete,
  className,
  disabled = false,
}: DragListProps<T>) {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const activeItem = items.find((i) => i.id === activeId);

  const handleDragStart = ({ active }: DragStartEvent) => setActiveId(active.id as string);
  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveId(null);
    if (!over || active.id === over.id) return;
    const oldIdx = items.findIndex((i) => i.id === active.id);
    const newIdx = items.findIndex((i) => i.id === over.id);
    onReorder(arrayMove(items, oldIdx, newIdx));
  };
  const handleDragCancel = () => setActiveId(null);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext
        items={items.map((i) => i.id)}
        strategy={direction === "vertical" ? verticalListSortingStrategy : horizontalListSortingStrategy}
      >
        <div
          className={cn(
            "flex",
            direction === "vertical" ? "flex-col gap-2" : "flex-row flex-wrap gap-2",
            className,
          )}
        >
          {items.map((item) => (
            <SortableItem
              key={item.id}
              item={item}
              renderItem={renderItem}
              onDelete={onDelete}
              direction={direction}
              disabled={disabled}
            />
          ))}
        </div>
      </SortableContext>

      <DragOverlay>
        {activeItem
          ? (renderOverlay
            ? renderOverlay(activeItem)
            : <div className="rounded-xl border border-primary/40 bg-card/95 shadow-2xl shadow-primary/10">{renderItem(activeItem, <GripVertical className="h-4 w-4" />)}</div>)
          : null}
      </DragOverlay>
    </DndContext>
  );
}

// ─── Preset: Task list ─────────────────────────────────────────────────────────

export interface TaskItem extends DragListItem {
  title: string;
  priority: "low" | "medium" | "high" | "urgent";
  done: boolean;
  tag?: string;
}

const PRIORITY_STYLES: Record<TaskItem["priority"], string> = {
  low: "bg-slate-500/10 text-slate-500 border-slate-500/20",
  medium: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  high: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  urgent: "bg-rose-500/10 text-rose-600 border-rose-500/20",
};

interface SortableTaskListProps {
  tasks?: TaskItem[];
  className?: string;
}

export function SortableTaskList({ tasks: initialTasks, className }: SortableTaskListProps) {
  const [tasks, setTasks] = React.useState<TaskItem[]>(
    initialTasks ?? DEFAULT_TASKS,
  );
  const [newTitle, setNewTitle] = React.useState("");

  const toggle = (id: string) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const remove = (id: string) => setTasks((prev) => prev.filter((t) => t.id !== id));

  const add = () => {
    if (!newTitle.trim()) return;
    setTasks((prev) => [
      ...prev,
      { id: `task-${Date.now()}`, title: newTitle.trim(), priority: "medium", done: false },
    ]);
    setNewTitle("");
  };

  return (
    <div className={cn("space-y-3", className)}>
      {/* Add input */}
      <div className="flex gap-2">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="Add a task…"
          className="flex-1 rounded-xl border border-border/70 bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground/50 focus:border-primary/40"
        />
        <Button size="sm" onClick={add} className="rounded-xl px-3">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <DragList
        items={tasks}
        onReorder={setTasks}
        onDelete={remove}
        renderItem={(task, handle) => (
          <div
            className={cn(
              "flex items-center gap-3 rounded-xl border border-border/70 bg-card px-3 py-2.5 transition-colors",
              task.done && "opacity-50",
            )}
          >
            {handle}
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggle(task.id)}
              className="h-4 w-4 rounded accent-primary"
            />
            <span className={cn("flex-1 text-sm", task.done && "line-through text-muted-foreground")}>
              {task.title}
            </span>
            <span className={cn("rounded-full border px-2 py-0.5 text-[10px] font-medium", PRIORITY_STYLES[task.priority])}>
              {task.priority}
            </span>
            {task.tag && (
              <Badge variant="secondary" className="rounded-full px-2 py-0 text-[10px]">
                {task.tag}
              </Badge>
            )}
          </div>
        )}
      />

      <p className="text-xs text-muted-foreground">
        {tasks.filter((t) => t.done).length} / {tasks.length} completed · Drag to reorder
      </p>
    </div>
  );
}

const DEFAULT_TASKS: TaskItem[] = [
  { id: "t1", title: "Design new notification center", priority: "high", done: false, tag: "ui" },
  { id: "t2", title: "Implement virtual list component", priority: "high", done: true, tag: "dev" },
  { id: "t3", title: "Write component documentation", priority: "medium", done: false, tag: "docs" },
  { id: "t4", title: "Fix calendar hydration mismatch", priority: "urgent", done: false, tag: "bug" },
  { id: "t5", title: "Add dark mode to data grid", priority: "low", done: false, tag: "ui" },
  { id: "t6", title: "Set up CI/CD pipeline", priority: "medium", done: true, tag: "ops" },
];

// ─── Preset: Sortable chip list ────────────────────────────────────────────────

export interface ChipItem extends DragListItem {
  label: string;
  color?: string;
}

interface SortableChipListProps {
  items?: ChipItem[];
  onChange?: (items: ChipItem[]) => void;
  className?: string;
}

export function SortableChipList({ items: initial, onChange, className }: SortableChipListProps) {
  const [items, setItems] = React.useState<ChipItem[]>(
    initial ?? DEFAULT_CHIPS,
  );

  const handle = (next: ChipItem[]) => { setItems(next); onChange?.(next); };

  return (
    <DragList
      items={items}
      onReorder={handle}
      onDelete={(id) => handle(items.filter((i) => i.id !== id))}
      direction="horizontal"
      className={cn("flex-wrap", className)}
      renderItem={(item, drag) => (
        <div
          className="flex cursor-default items-center gap-1.5 rounded-full border border-border/70 bg-card px-3 py-1.5 text-xs font-medium shadow-sm"
          style={item.color ? { borderColor: item.color + "40", background: item.color + "15", color: item.color } : {}}
        >
          {drag}
          {item.label}
        </div>
      )}
    />
  );
}

const DEFAULT_CHIPS: ChipItem[] = [
  { id: "c1", label: "React", color: "#61dafb" },
  { id: "c2", label: "TypeScript", color: "#3178c6" },
  { id: "c3", label: "Next.js", color: "#000000" },
  { id: "c4", label: "Tailwind", color: "#38bdf8" },
  { id: "c5", label: "Radix UI" },
  { id: "c6", label: "Recharts", color: "#8884d8" },
];
