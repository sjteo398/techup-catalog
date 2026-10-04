import React from "react";
import { Link } from "react-router-dom";
import { Plus, GitCompare, Check, Snowflake } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function ProductCard({ p }) {
  const { addToRFQ, toggleCompare, inCompare } = useStore();
  const active = inCompare(p.slug);
  return (
    <div data-testid={`product-card-${p.slug}`} className="group bg-white rounded-xl border border-slate-200 overflow-hidden card-hover flex flex-col">
      <Link to={`/product/${p.slug}`} className="relative block aspect-[4/3] bg-slate-50 overflow-hidden">
        <img src={p.image} alt={p.model} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        {p.cooling === "Fanless" && (
          <span className="absolute top-2 left-2 flex items-center gap-1 text-[10px] font-semibold bg-[hsl(var(--primary))] text-white px-2 py-1 rounded-full"><Snowflake size={11} /> Fanless</span>
        )}
      </Link>
      <div className="p-4 flex-1 flex flex-col">
        <Link to={`/product/${p.slug}`}>
          <h3 className="font-mono font-bold text-slate-900 hover:text-[hsl(var(--primary))] transition-colors">{p.model}</h3>
        </Link>
        <p className="mt-1 text-xs text-slate-500">{p.form_factor}</p>
        <p className="mt-2 text-sm text-slate-600 line-clamp-2 flex-1">{p.cpu_platform}</p>
        <div className="mt-3 flex items-center gap-2">
          <button data-testid={`add-rfq-${p.slug}`} onClick={() => addToRFQ(p)} className="flex-1 flex items-center justify-center gap-1 h-9 rounded-md btn-cta text-xs font-semibold">
            <Plus size={14} /> Add to RFQ
          </button>
          <button data-testid={`compare-toggle-${p.slug}`} onClick={() => toggleCompare(p)} title="Compare" className={`w-9 h-9 grid place-items-center rounded-md border transition-colors ${active ? "bg-[hsl(var(--navy))] text-white border-[hsl(var(--navy))]" : "border-slate-300 text-slate-600 hover:border-[hsl(var(--primary))]"}`}>
            {active ? <Check size={16} /> : <GitCompare size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
