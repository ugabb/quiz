import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CircleChevronLeft,
  CircleChevronRight,
} from "lucide-react";

export function RegisterTablePagination() {
  return (
    <div className="flex items-center justify-between px-2">
      <span className="text-sm text-muted-foreground">
        Total de 10 pessoas(s)
      </span>

      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex w-[100px] items-center justify-center text-xs font-medium">
          Página 1 de 10
        </div>
        <div className="flex items-center space-x-2">
          <button className="hidden h-8 w-8 p-0 lg: lg:flex items-center">
            <span className="sr-only">Primeira página</span>
            <ChevronsLeft className="h-4 w-4" />
          </button>
          <button className="h-8 w-8 p-0">
            <span className="sr-only">Página anterior</span>
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="h-8 w-8 p-0">
            <span className="sr-only">Próxima página</span>
            <ChevronRight className="h-4 w-4" />
          </button>
          <button className="hidden h-8 w-8 p-0 lg:flex items-center">
            <span className="sr-only">Última página</span>
            <ChevronsRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
