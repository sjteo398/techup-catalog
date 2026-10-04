import React from "react";
import { Link } from "react-router-dom";
import { X, GitCompare, ArrowRight } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function CompareBar() {
  const { compare, toggleCompare, clearCompare } = useStore();
  if (compare.length === 0) return null;
  return (
    <div data-testid="compare-bar" className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-2xl">
      <div className="bg-[hsl(var(--navy))] text-white rounded-xl shadow-2xl p-3 flex items-center gap-3">
        <div className="flex items-center gap-2 pl-2">
          <GitCompare size={18} className="text-[hsl(var(--accent))]" />
          <span className="text-sm font-semibold hidden sm:inline">Compare</span>
        </div>
        <div className="flex-1 flex items-center gap-2 overflow-x-auto">
          {compare.map((p) => (
            <div key={p.slug} className="flex items-center gap-1.5 bg-white/10 rounded-md pl-2 pr-1 py-1 flex-shrink-0">
              <span className="font-mono text-xs">{p.model}</span>
              <button onClick={() => toggleCompare(p)} className="w-5 h-5 grid place-items-center rounded hover:bg-white/20"><X size={12} /></button>
            </div>
          ))}
          {Array.from({ length: 4 - compare.length }).map((_, i) => (
            <div key={i} className="w-16 h-7 rounded-md border border-dashed border-white/20 flex-shrink-0" />
          ))}
        </div>
        <button onClick={clearCompare} className="text-xs text-slate-400 hover:text-white px-1">Clear</button>
        <Link to="/compare" data-testid="go-compare-btn" className="flex items-center gap-1 btn-cta px-4 h-10 rounded-md text-sm font-semibold whitespace-nowrap">
          Compare <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
