import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ProductCard";
import api from "@/lib/apiClient";

export default function SectorPage() {
  const { slug } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(null); window.scrollTo(0, 0);
    api.get(`/sectors/${slug}`).then((r) => setData(r.data)).catch(() => setData("error"));
  }, [slug]);

  if (data === "error") return <Layout><div className="min-h-[60vh] grid place-items-center">Sector not found.</div></Layout>;
  if (!data) return <Layout><div className="min-h-[60vh] grid place-items-center text-slate-400">Loading…</div></Layout>;

  const s = data.sector;
  return (
    <Layout>
      <section className="relative pt-24 pb-14 text-white overflow-hidden">
        <img src={s.image} alt={s.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[hsl(var(--navy))]/85" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/industries" className="text-sm text-slate-300 hover:text-white">← All industries</Link>
          <p className="eyebrow text-[hsl(var(--accent))] mt-4">Industry</p>
          <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight">{s.name}</h1>
          <p className="mt-4 text-slate-200 max-w-2xl">{s.blurb}</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-slate-200 p-6 sticky top-20">
              <h3 className="font-display font-bold text-lg">Typical requirements</h3>
              <ul className="mt-4 space-y-3">
                {s.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 size={17} className="text-[hsl(var(--primary))] flex-shrink-0 mt-0.5" /> {r}
                  </li>
                ))}
              </ul>
              <Link to="/help-me-choose" className="mt-6 flex items-center justify-center gap-2 h-11 rounded-md border border-slate-300 font-semibold text-sm hover:border-[hsl(var(--primary))] transition-colors">Help Me Choose <ArrowRight size={15} /></Link>
            </div>
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-display font-bold mb-6">Recommended products <span className="text-slate-400 mono text-base">({data.products.length})</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {data.products.map((p) => <ProductCard key={p.slug} p={p} />)}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
