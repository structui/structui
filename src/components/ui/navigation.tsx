import React from "react";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/src/lib/utils";

// --- Breadcrumbs ---
export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

export const Breadcrumbs = ({ items, className }: { items: BreadcrumbItem[]; className?: string }) => {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex", className)}>
      <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <ChevronRight className="mx-2 h-4 w-4 opacity-50" />}
            {item.href && !item.active ? (
              <a href={item.href} className="hover:text-foreground transition-colors">
                {item.label}
              </a>
            ) : (
              <span className={cn("font-medium", item.active ? "text-foreground" : "")}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

// --- Pagination ---
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination = ({ currentPage, totalPages, onPageChange, className }: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Pagination" className={cn("flex items-center justify-center space-x-1", className)}>
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md border text-sm font-medium disabled:opacity-50 hover:bg-muted transition-colors"
      >
        Previous
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={cn(
            "px-3 py-1 rounded-md border text-sm font-medium transition-colors",
            currentPage === page ? "bg-primary text-primary-foreground border-primary" : "hover:bg-muted"
          )}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md border text-sm font-medium disabled:opacity-50 hover:bg-muted transition-colors"
      >
        Next
      </button>
    </nav>
  );
};
