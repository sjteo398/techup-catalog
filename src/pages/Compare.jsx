import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, X, GitCompare } from "lucide-react";
import Layout from "@/components/layout/Layout";
import api from "@/lib/apiClient";
import { useStore } from "@/context/StoreContext";

export default function Compare() {
  const { compare, toggleCompare, clearCompare, addToRFQ } = useStore();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (compare.length === 0) { setProducts([]); return; }
    api.post("/products/compare", compare.map((c) => c.slug)).then((r) => {
      const order = compare.map((c) => c.slug);
      setProducts(r.data.sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug)));
    });
  }, [compare]);

  const specKeys = ["Form Factor", "CPU Platform", "Memory", "Storage", "Display", "I/O Ports", "Power Input", "Cooling", "Mounting", "Dimensions", "OS Support"];

  return (
    <Layout>
      <section className="navy-bg text-white pt-24 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-[hsl(var(--accent))]">Side-by-side</p>
            <h1 className="mt-2 text-3xl sm:text-4xl font-display font-extrabold">Compare Products</h1>
          </div>
          {compare.length > 0 && <button onClick={clearCompare} className="text-sm text-slate-300 hover:text-white">Clear all</button>}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {products.length === 0 ? (
          <div className="py-20 text-center">
            <GitCompare size={48} className="mx-auto text-slate-300" />
            <p className="mt-4 text-slate-600">No products selected. Add up to 4 products from the catalog using the compare button.</p>
            <Link to="/catalog" className="inline-block mt-6 btn-cta px-6 h-12 leading-[3rem] rounded-md font-semibold">Browse Catalog</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[640px]" data-testid="compare-table">
              <thead>
                <tr>
                  <th className="w-40 text-left align-bottom p-3"></th>
                  {products.map((p) => (
                    <th key={p.slug} className="p-3 align-bottom border-l border-slate-200" style={{ width: `${80 / products.length}%` }}>
                      <div className="relative">
                        <button onClick={() => toggleCompare(p)} className="absolute -top-1 -right-1 w-6 h-6 grid place-items-center rounded-full bg-slate-100 hover:bg-red-100 text-slate-500"><X size={13} /></button>
                        <img src={p.image} alt={p.model} className="w-full aspect-[4/3] object-cover rounded-lg border border-slate-200 bg-slate-50" />
                        <Link to={`/product/${p.slug}`} className="block mt-2 font-mono font-bold text-slate-900 hover:text-[hsl(var(--primary))]">{p.model}</Link>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {specKeys.map((k) => (
                  <tr key={k} className="border-t border-slate-200">
                    <td className="p-3 eyebrow text-slate-500 align-top">{k}</td>
                    {products.map((p) => (
                      <td key={p.slug} className="p-3 border-l border-slate-100 font-mono text-xs text-slate-800 align-top">{p.specs?.[k] && p.specs[k] !== "—" ? p.specs[k] : <span className="text-slate-300">—</span>}</td>
                    ))}
                  </tr>
                ))}
                <tr className="border-t border-slate-200">
                  <td className="p-3"></td>
                  {products.map((p) => (
                    <td key={p.slug} className="p-3 border-l border-slate-100">
                      <button onClick={() => addToRFQ(p)} className="flex items-center justify-center gap-1 w-full h-10 btn-cta rounded-md text-xs font-semibold"><Plus size={14} /> Add to RFQ</button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </section>
    </Layout>
  );
}
