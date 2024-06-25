"use-client";

import { ListFilter, Download } from "lucide-react";

export function RegisterTableFilters() {
  return (
    <div className="flex justify-between">
      <div className="flex items-center justify-center gap-4">
        <button className="btn btn-outline">
          <ListFilter />
          Filtros
        </button>
        <button className="btn btn-outline btn-neutral">
          <Download />
          Exportar
        </button>
      </div>

      <label className="input input-bordered flex items-center gap-2">
        <input type="text" className="grow" placeholder="Procurar..." />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fill-rule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clip-rule="evenodd"
          />
        </svg>
      </label>
    </div>
  );
}
