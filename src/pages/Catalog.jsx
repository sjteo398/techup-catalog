import React, { useEffect, useState, useMemo } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ProductCard";
import FilterSidebar from "@/components/FilterSidebar";
import api from "@/lib/apiClient";

export default function Catalog() {
  const { slug } = useParams();
  const [params] = useSearchParams();
  const sector = params.get("sector");
  const seriesParam = params.get("series");
  const familyParam = params.get("family");
  const [products, setProducts] = useState([]);
  const [facets, setFacets] = useState({ series_family: [], series: [], form_factor: [], cpu_platform: [], cooling: [] });
  const [category, setCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ series_family: [], series: [], form_factor: [], cpu_platform: [], cooling: [] });
  const [mobileFilters, setMobileFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => { api.get("/products/facets").then((r) => setFacets(r.data)); }, []);
  useEffect(() => {
    const initFilters = { series_family: [], series: [], form_factor: [], cpu_platform: [], cooling: [] };
    if (seriesParam) initFilters.series = [seriesParam];
    if (familyParam) initFilters.series_family = [familyParam];
    setFilters(initFilters);
    if (slug) api.get("/categories").then((r) => setCategory(r.data.find((c) => c.slug === slug)));
    else setCategory(null);
  }, [slug, seriesParam, familyParam]);

  useEffect(() => {
    setLoading(true);
    const p = {};
    if (slug) p.category = slug;
    if (sector) p.sector = sector;
    api.get("/products", { params: p }).then((r) => { setProducts(r.data); setLoading(false); });
  }, [slug, sector]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (
        search &&
        !`${p.model} ${p.legacy_model || ""} ${p.series || ""} ${p.series_family || ""} ${p.series_code || ""} ${p.cpu_platform} ${p.applications} ${p.form_factor}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
        return false;
      for (const key of ["series_family", "series", "form_factor", "cpu_platform", "cooling"]) {
        if (filters[key]?.length && !filters[key].includes(p[key])) return false;
      }
      return true;
    });
  }, [products, search, filters]);

  const activeSeries = filters.series?.length === 1 ? filters.series[0] : null;
  const activeFamily = filters.series_family?.length === 1 ? filters.series_family[0] : null;
  const title = activeSeries || activeFamily || (category ? category.name : sector ? "Filtered products" : "Product Catalog");

  return (
    <Layout>
      {/* Header */}
      <section className="navy-bg text-white pt-24 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow text-[hsl(var(--accent))]">{category ? "Category" : "Catalog"}</p>
          <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight">{title}</h1>
          {category && <p className="mt-3 text-slate-300 max-w-3xl">{category.description}</p>}
          {category?.differentiators && (
            <div className="mt-4 flex flex-wrap gap-2">
              {category.differentiators.map((d) => (
                <span key={d} className="text-xs bg-white/10 border border-white/15 rounded-full px-3 py-1">{d}</span>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-20">
              <FilterSidebar facets={facets} filters={filters} setFilters={setFilters} />
            </div>
          </aside>

          {/* Main */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input data-testid="catalog-search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search model (e.g. QCU-100 or TMI800B), series, CPU…" className="w-full h-11 pl-10 pr-4 rounded-md border border-slate-300 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none" />
              </div>
              <button onClick={() => setMobileFilters(true)} className="lg:hidden flex items-center gap-2 h-11 px-4 rounded-md border border-slate-300 font-medium text-sm"><SlidersHorizontal size={16} /> Filters</button>
            </div>
            <p className="text-sm text-slate-500 mb-4 mono">{loading ? "Loading…" : `${filtered.length} product(s)`}</p>
            {filtered.length === 0 && !loading ? (
              <div className="py-20 text-center text-slate-500">No products match your filters. <button onClick={() => { setFilters({ series_family: [], series: [], form_factor: [], cpu_platform: [], cooling: [] }); setSearch(""); }} className="text-[hsl(var(--accent))] font-semibold">Reset</button></div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((p) => <ProductCard key={p.slug} p={p} />)}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile filters */}
      {mobileFilters && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-slate-900/50" onClick={() => setMobileFilters(false)} />
          <div className="absolute left-0 top-0 h-full w-80 max-w-[85%] bg-white overflow-y-auto p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-display font-bold text-lg">Filters</h3>
              <button onClick={() => setMobileFilters(false)}><X /></button>
            </div>
            <FilterSidebar facets={facets} filters={filters} setFilters={setFilters} />
            <button onClick={() => setMobileFilters(false)} className="mt-4 w-full h-11 btn-cta rounded-md font-semibold">Show {filtered.length} results</button>
          </div>
        </div>
      )}
    </Layout>
  );
}
