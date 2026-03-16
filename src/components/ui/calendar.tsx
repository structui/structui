import React, { useState } from "react";
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays, 
  eachDayOfInterval 
} from "date-fns";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Button } from "./button";
import { Badge } from "./badge";

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: "meeting" | "task" | "reminder";
}

interface CalendarProps {
  events?: CalendarEvent[];
  className?: string;
}

export const Calendar = ({ events = [], className }: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between px-4 py-4 border-b">
        <h2 className="text-lg font-bold">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setCurrentMonth(new Date())}>
            Today
          </Button>
          <Button variant="outline" size="icon" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button className="ml-2 gap-2" size="sm">
            <Plus className="h-4 w-4" /> New Event
          </Button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div className="grid grid-cols-7 border-b bg-muted/30">
        {days.map((day) => (
          <div key={day} className="py-2 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        const dayEvents = events.filter(e => isSameDay(e.date, cloneDay));

        days.push(
          <div
            key={day.toString()}
            className={cn(
              "min-h-[120px] p-2 border-r border-b transition-colors hover:bg-muted/10 cursor-pointer",
              !isSameMonth(day, monthStart) ? "bg-muted/5 text-muted-foreground/50" : "",
              isSameDay(day, selectedDate) ? "bg-primary/5" : ""
            )}
            onClick={() => setSelectedDate(cloneDay)}
          >
            <div className="flex justify-between items-start mb-1">
              <span className={cn(
                "text-sm font-medium h-7 w-7 flex items-center justify-center rounded-full",
                isSameDay(day, new Date()) ? "bg-primary text-primary-foreground" : ""
              )}>
                {formattedDate}
              </span>
            </div>
            <div className="space-y-1 overflow-hidden">
              {dayEvents.slice(0, 3).map(event => (
                <div 
                  key={event.id} 
                  className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded border truncate",
                    event.type === "meeting" ? "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400" :
                    event.type === "task" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400" :
                    "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400"
                  )}
                >
                  {event.title}
                </div>
              ))}
              {dayEvents.length > 3 && (
                <div className="text-[9px] text-muted-foreground pl-1">
                  + {dayEvents.length - 3} more
                </div>
              )}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="bg-background">{rows}</div>;
  };

  return (
    <div className={cn("border rounded-xl overflow-hidden shadow-sm", className)}>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};
