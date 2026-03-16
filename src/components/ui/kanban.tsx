import React, { useState } from "react";
import { cn } from "@/src/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";
import { MoreHorizontal, Plus } from "lucide-react";
import { Button } from "./button";

interface KanbanTask {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  tags: string[];
}

interface KanbanColumn {
  id: string;
  title: string;
  tasks: KanbanTask[];
}

interface KanbanBoardProps {
  columns: KanbanColumn[];
  className?: string;
}

export const KanbanBoard = ({ columns: initialColumns, className }: KanbanBoardProps) => {
  const [columns, setColumns] = useState(initialColumns);

  return (
    <div className={cn("flex gap-6 overflow-x-auto pb-4", className)}>
      {columns.map((column) => (
        <div key={column.id} className="flex-shrink-0 w-80 flex flex-col gap-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                {column.title}
              </h3>
              <Badge variant="secondary" className="rounded-full px-2 py-0 text-[10px]">
                {column.tasks.length}
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Plus className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-3 min-h-[500px] p-2 rounded-xl bg-muted/20 border border-dashed border-muted-foreground/20">
            {column.tasks.map((task) => (
              <Card key={task.id} className="cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors shadow-sm">
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <Badge 
                      variant={
                        task.priority === "high" ? "destructive" : 
                        task.priority === "medium" ? "default" : "secondary"
                      }
                      className="text-[10px] px-1.5 py-0"
                    >
                      {task.priority}
                    </Badge>
                  </div>
                  <CardTitle className="text-sm font-bold mt-2">{task.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                    {task.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {task.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-[9px] px-1 py-0 opacity-70">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button variant="ghost" className="w-full justify-start text-muted-foreground text-xs gap-2 h-10 border border-dashed border-transparent hover:border-muted-foreground/20">
              <Plus className="h-3 w-3" /> Add Task
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
