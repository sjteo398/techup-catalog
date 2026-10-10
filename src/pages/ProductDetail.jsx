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
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const { addToRFQ, toggleCompare, inCompare } = useStore();

  useEffect(() => {
    setData(null); setActiveImg(0); setSelectedVariantIdx(0);
    api.get(`/products/${slug}`).then((r) => setData(r.data)).catch(() => setData("error"));
    window.scrollTo(0, 0);
  }, [slug]);

  if (data === "error") return <Layout><div className="min-h-[60vh] grid place-items-center">Product not found. <Link to="/catalog" className="text-[hsl(var(--accent))] ml-2">Back to catalog</Link></div></Layout>;
  if (!data || !data.product) return <Layout><div className="min-h-[60vh] grid place-items-center text-slate-400">Loading…</div></Layout>;

  const p = data.product;
  const gallery = p.gallery?.length ? p.gallery : [p.image, p.datasheet_url].filter(Boolean);
  const active = inCompare(p.slug);

  const currentVariant = p.board_variants?.length ? p.board_variants[selectedVariantIdx] : null;
  const currentModelName = currentVariant ? `${p.model} (${currentVariant.code})` : p.model;

  const handleSelectVariant = (idx, variant) => {
    setSelectedVariantIdx(idx);
    if (variant.image) {
      const matchIdx = gallery.findIndex((g) => g === variant.image);
      if (matchIdx !== -1) setActiveImg(matchIdx);
    }
  };

  const handleAddToRFQ = () => {
    if (currentVariant) {
      addToRFQ({
        ...p,
        model: currentModelName,
        note: `Selected Board: ${currentVariant.code} (${currentVariant.cpu})`
      });
    } else {
      addToRFQ(p);
    }
  };

  return (
    <Layout>
      <div className="pt-20 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-slate-500 overflow-x-auto">
          <Link to="/catalog" className="hover:text-[hsl(var(--primary))]">Catalog</Link>
          <ChevronRight size={14} className="flex-shrink-0" />
          <Link to={`/category/${p.category}`} className="hover:text-[hsl(var(--primary))] capitalize flex-shrink-0">{p.category.replace(/-/g, " ")}</Link>
          {p.series && (
            <>
              <ChevronRight size={14} className="flex-shrink-0" />
              <span className="text-slate-600 truncate">{p.series}</span>
            </>
          )}
          <ChevronRight size={14} className="flex-shrink-0" />
          <span className="font-mono text-slate-800 font-semibold flex-shrink-0">{p.model}</span>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 overflow-hidden aspect-[4/3]">
              <img src={gallery[activeImg] || p.image} alt={p.model} className="w-full h-full object-contain" data-testid="product-main-image" />
            </div>
            {gallery.length > 1 && (
              <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
                {gallery.map((g, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} className={`w-20 h-20 rounded-lg border-2 flex-shrink-0 overflow-hidden bg-white ${activeImg === i ? "border-[hsl(var(--primary))]" : "border-slate-200"}`}>
                    <img src={g} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {p.series && (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-sky-50 text-[hsl(var(--primary))] border border-sky-200/80">
                  {p.series}
                </span>
              )}
              {p.cooling === "Fanless" && (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200/80">
                  Fanless
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-3 flex-wrap">
              <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight font-mono text-slate-900">
                {currentModelName}
              </h1>
            </div>

            {/* Interactive Motherboard / CPU Variant Selector */}
            {p.board_variants?.length > 0 && (
              <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <label className="eyebrow text-slate-600 font-bold block mb-2">Select Board / CPU Configuration</label>
                <div className="space-y-2">
                  {p.board_variants.map((v, idx) => (
                    <button
                      key={v.code}
                      onClick={() => handleSelectVariant(idx, v)}
                      className={`w-full text-left p-3 rounded-lg border transition-all flex items-start justify-between gap-3 ${
                        selectedVariantIdx === idx
                          ? "border-[hsl(var(--primary))] bg-white shadow-sm ring-2 ring-[hsl(var(--primary))]/30 text-slate-900"
                          : "border-slate-200 bg-white/60 hover:bg-white text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      <div>
                        <span className="font-mono font-bold text-sm block text-[hsl(var(--navy))]">{v.code} — {v.name}</span>
                        <span className="text-xs text-slate-500 block mt-0.5">{v.desc}</span>
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${selectedVariantIdx === idx ? "bg-sky-100 text-[hsl(var(--primary))]" : "bg-slate-100 text-slate-500"}`}>
                        {selectedVariantIdx === idx ? "Selected" : "Select"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <p className="mt-4 text-slate-600 font-medium">{currentVariant ? currentVariant.cpu : p.cpu_platform}</p>
            {p.applications && (
              <div className="mt-4">
                <p className="eyebrow text-slate-500 mb-1">Typical applications</p>
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
              <button data-testid="detail-add-rfq" onClick={handleAddToRFQ} className="flex items-center gap-2 btn-cta px-6 h-12 rounded-md font-semibold"><Plus size={18} /> Add to RFQ</button>
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
