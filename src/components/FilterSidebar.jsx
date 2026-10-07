import React from "react";
import { X } from "lucide-react";

function Group({ title, options, selected, onToggle, testid }) {
  if (!options?.length) return null;
  return (
    <div className="py-4 border-b border-slate-200 last:border-0">
      <p className="eyebrow text-slate-500 mb-3">{title}</p>
      <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
        {options.map((o) => {
          const on = selected.includes(o);
          return (
            <label key={o} data-testid={`${testid}-${o}`} className="flex items-start gap-2 cursor-pointer group text-sm">
              <span className={`mt-0.5 w-4 h-4 rounded-sm border grid place-items-center flex-shrink-0 transition-colors ${on ? "bg-[hsl(var(--primary))] border-[hsl(var(--primary))]" : "border-slate-300 group-hover:border-[hsl(var(--primary))]"}`}>
                {on && <X size={11} className="text-white" strokeWidth={3} />}
              </span>
              <input type="checkbox" className="sr-only" checked={on} onChange={() => onToggle(o)} />
              <span className={`leading-snug ${on ? "text-slate-900 font-medium" : "text-slate-600"}`}>{o}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default function FilterSidebar({ facets, filters, setFilters }) {
  const toggle = (key) => (val) => {
    setFilters((prev) => {
      const cur = prev[key] || [];
      return { ...prev, [key]: cur.includes(val) ? cur.filter((v) => v !== val) : [...cur, val] };
    });
  };
  const activeCount = Object.values(filters).reduce((a, b) => a + (b?.length || 0), 0);

  return (
    <div data-testid="filter-sidebar" className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-lg">Filters</h3>
        {activeCount > 0 && (
          <button data-testid="clear-filters-btn" onClick={() => setFilters({ series_family: [], series: [], form_factor: [], cpu_platform: [], cooling: [] })} className="text-xs text-[hsl(var(--accent))] font-semibold hover:underline">Clear ({activeCount})</button>
        )}
      </div>
      <Group title="Series Family" testid="filter-family" options={facets.series_family} selected={filters.series_family || []} onToggle={toggle("series_family")} />
      <Group title="Series" testid="filter-series" options={facets.series} selected={filters.series || []} onToggle={toggle("series")} />
      <Group title="Form Factor" testid="filter-form" options={facets.form_factor} selected={filters.form_factor || []} onToggle={toggle("form_factor")} />
      <Group title="Cooling" testid="filter-cooling" options={facets.cooling} selected={filters.cooling || []} onToggle={toggle("cooling")} />
      <Group title="CPU Platform" testid="filter-cpu" options={facets.cpu_platform} selected={filters.cpu_platform || []} onToggle={toggle("cpu_platform")} />
    </div>
  );
}
