import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Plus, GitCompare, Check, Download, ArrowLeft, AlertTriangle, ChevronRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SpecTable from "@/components/SpecTable";
import ProductCard from "@/components/ProductCard";
import api from "@/lib/apiClient";
import { useStore } from "@/context/StoreContext";

export default function ProductDetail() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const { addToRFQ, toggleCompare, inCompare } = useStore();

  useEffect(() => {
    setData(null); setActiveImg(0);
    api.get(`/products/${slug}`).then((r) => setData(r.data)).catch(() => setData("error"));
    window.scrollTo(0, 0);
  }, [slug]);

  if (data === "error") return <Layout><div className="min-h-[60vh] grid place-items-center">Product not found. <Link to="/catalog" className="text-[hsl(var(--accent))] ml-2">Back to catalog</Link></div></Layout>;
  if (!data) return <Layout><div className="min-h-[60vh] grid place-items-center text-slate-400">Loading…</div></Layout>;

  const p = data.product;
  const gallery = [p.image, p.datasheet_url].filter(Boolean);
  const active = inCompare(p.slug);

  return (
    <Layout>
      <div className="pt-20 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-slate-500">
          <Link to="/catalog" className="hover:text-[hsl(var(--primary))]">Catalog</Link>
          <ChevronRight size={14} />
          <Link to={`/category/${p.category}`} className="hover:text-[hsl(var(--primary))] capitalize">{p.category.replace(/-/g, " ")}</Link>
          <ChevronRight size={14} />
          <span className="font-mono text-slate-800">{p.model}</span>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 overflow-hidden aspect-[4/3]">
              <img src={gallery[activeImg]} alt={p.model} className="w-full h-full object-contain" data-testid="product-main-image" />
            </div>
            <div className="mt-3 flex gap-3">
              {gallery.map((g, i) => (
                <button key={i} onClick={() => setActiveImg(i)} className={`w-20 h-20 rounded-lg border-2 overflow-hidden bg-white ${activeImg === i ? "border-[hsl(var(--primary))]" : "border-slate-200"}`}>
                  <img src={g} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
            {p.flags && (
              <div className="mt-4 flex items-start gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3">
                <AlertTriangle size={15} className="flex-shrink-0 mt-0.5" />
                <span>{p.flags}</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <p className="eyebrow text-[hsl(var(--accent))] capitalize">{p.form_factor}</p>
            <h1 className="mt-2 text-3xl sm:text-4xl font-display font-extrabold tracking-tight font-mono">{p.model}</h1>
            <p className="mt-3 text-slate-600">{p.cpu_platform}</p>
            {p.applications && (
              <div className="mt-4">
                <p className="eyebrow text-slate-500 mb-2">Typical applications</p>
                <p className="text-sm text-slate-700">{p.applications}</p>
              </div>
            )}
            {p.sectors?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {p.sectors.map((s) => (
                  <Link key={s} to={`/sector/${s}`} className="text-xs bg-slate-100 hover:bg-slate-200 rounded-full px-3 py-1 capitalize transition-colors">{s.replace(/-/g, " ")}</Link>
                ))}
              </div>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              <button data-testid="detail-add-rfq" onClick={() => addToRFQ(p)} className="flex items-center gap-2 btn-cta px-6 h-12 rounded-md font-semibold"><Plus size={18} /> Add to RFQ</button>
              <button data-testid="detail-compare" onClick={() => toggleCompare(p)} className={`flex items-center gap-2 px-5 h-12 rounded-md font-semibold border transition-colors ${active ? "bg-[hsl(var(--navy))] text-white border-[hsl(var(--navy))]" : "border-slate-300 hover:border-[hsl(var(--primary))]"}`}>
                {active ? <Check size={18} /> : <GitCompare size={18} />} {active ? "Comparing" : "Compare"}
              </button>
              {p.datasheet_url && (
                <a href={p.datasheet_url} target="_blank" rel="noopener noreferrer" data-testid="detail-datasheet" className="flex items-center gap-2 px-5 h-12 rounded-md font-semibold border border-slate-300 hover:border-[hsl(var(--primary))] transition-colors"><Download size={18} /> Datasheet</a>
              )}
            </div>
            <p className="mt-3 text-xs text-slate-400 mono">Datasheet links to catalog page {p.datasheet_page || "—"} render from the source PDF.</p>
          </div>
        </div>

        {/* Specs */}
        <div className="mt-14">
          <h2 className="text-2xl font-display font-bold mb-5">Technical Specifications</h2>
          <SpecTable specs={p.specs} />
        </div>

        {/* Related */}
        {data.related?.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-display font-bold mb-6">Related products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {data.related.map((r) => <ProductCard key={r.slug} p={r} />)}
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}
