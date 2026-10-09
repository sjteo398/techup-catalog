import React, { useEffect, useState } from "react";
import { FileText, Download, FileBadge, Building2, Wrench } from "lucide-react";
import Layout from "@/components/layout/Layout";
import api from "@/lib/apiClient";

const icons = { Catalog: FileText, Company: Building2, Compliance: FileBadge, OEM: Wrench };

export default function Resources() {
  const [items, setItems] = useState([]);
  useEffect(() => { api.get("/resources").then((r) => setItems(r.data)); }, []);

  return (
    <Layout>
      <section className="navy-bg text-white pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 grid-texture-dark opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow text-[hsl(var(--accent))]">Resources & Downloads</p>
          <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight">Download center</h1>
          <p className="mt-4 text-slate-300 max-w-2xl">Datasheets, brochures, certifications and the company profile in one place.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((r) => {
            const Icon = icons[r.type] || FileText;
            return (
              <div key={r.title} data-testid={`resource-${r.title}`} className="flex items-start gap-4 bg-white rounded-xl border border-slate-200 p-6 card-hover">
                <span className="grid place-items-center w-12 h-12 rounded-lg bg-slate-100 text-[hsl(var(--primary))] flex-shrink-0"><Icon size={22} /></span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-semibold text-lg">{r.title}</h3>
                    <span className="text-[10px] mono bg-slate-100 rounded px-1.5 py-0.5 text-slate-500">{r.format}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{r.description}</p>
                  {r.flag && <p className="mt-1 text-xs text-amber-600">{r.flag}</p>}
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[hsl(var(--accent))] opacity-40 cursor-not-allowed select-none pointer-events-none" aria-disabled="true">
                    <Download size={15} /> Download
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
