import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, MapPin, Factory, Wrench, Cpu, Layers, CheckCircle2 } from "lucide-react";
import Layout from "@/components/layout/Layout";
import HeroScroll from "@/components/HeroScroll";
import ProductCard from "@/components/ProductCard";
import api from "@/lib/apiClient";

const trust = [
  { icon: MapPin, title: "Local Malaysian brand", body: "Registered locally with responsive KL-based sales and technical support — one accountable partner, not an anonymous overseas storefront." },
  { icon: Factory, title: "Vetted OEM/ODM partners", body: "Manufactured by audited partner factories with 16+ years of industrial computing experience and 30,000+ units/month capacity." },
  { icon: ShieldCheck, title: "Quality control built-in", body: "AOI, SPI, X-ray inspection plus aging, vibration, drop, ESD and temperature testing on production lines." },
  { icon: Wrench, title: "Customization capability", body: "Full OEM/ODM services — hardware configuration, custom enclosures and firmware for your application." },
];

const fade = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" }, transition: { duration: 0.5 } };

export default function Home() {
  const [cats, setCats] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [sectors, setSectors] = useState([]);

  useEffect(() => {
    api.get("/categories").then((r) => setCats(r.data));
    api.get("/products", { params: { featured: true } }).then((r) => setFeatured(r.data.slice(0, 8)));
    api.get("/sectors").then((r) => setSectors(r.data));
  }, []);

  return (
    <Layout>
      <HeroScroll />

      {/* Trust bar */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[["16+ yrs", "OEM/ODM experience"], ["30,000", "units/month capacity"], ["8,000 m²", "partner factory"], ["100+", "catalog products"]].map(([n, l]) => (
            <div key={l}>
              <p className="font-display font-extrabold text-2xl sm:text-3xl text-[hsl(var(--navy))]">{n}</p>
              <p className="text-xs text-slate-500 mt-1">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div {...fade} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="eyebrow text-[hsl(var(--accent))]">Product categories</p>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight">Browse by product type</h2>
          </div>
          <Link to="/catalog" className="flex items-center gap-1 text-sm font-semibold text-[hsl(var(--primary))] link-underline">View full catalog <ArrowRight size={16} /></Link>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cats.map((c, i) => (
            <motion.div key={c.slug} {...fade} transition={{ duration: 0.5, delay: i * 0.05 }}>
              <Link to={`/category/${c.slug}`} data-testid={`home-cat-${c.slug}`} className="group block bg-white rounded-xl border border-slate-200 overflow-hidden card-hover h-full">
                <div className="aspect-[4/3] bg-slate-50 overflow-hidden">
                  <img src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-semibold text-slate-900">{c.name}</h3>
                    <span className="text-xs mono text-slate-400">{c.count}</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{c.tagline}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Quartzar */}
      <section className="navy-bg text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-texture-dark opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <motion.div {...fade}>
            <p className="eyebrow text-[hsl(var(--accent))]">Why Quartzar</p>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-display font-bold max-w-2xl">Local accountability, global manufacturing scale</h2>
          </motion.div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trust.map((t, i) => (
              <motion.div key={t.title} {...fade} transition={{ duration: 0.5, delay: i * 0.06 }} className="bg-white/[0.06] border border-white/10 rounded-xl p-6 hover:bg-white/[0.1] transition-colors">
                <span className="grid place-items-center w-11 h-11 rounded-lg bg-[hsl(var(--accent))] text-white"><t.icon size={20} /></span>
                <h3 className="mt-4 font-display font-semibold text-lg">{t.title}</h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">{t.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div {...fade} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="eyebrow text-[hsl(var(--accent))]">Featured</p>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-display font-bold">Best-selling & flagship products</h2>
          </div>
          <Link to="/help-me-choose" className="flex items-center gap-1 text-sm font-semibold text-[hsl(var(--primary))] link-underline">Not sure? Help Me Choose <ArrowRight size={16} /></Link>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((p) => <ProductCard key={p.slug} p={p} />)}
        </div>
      </section>

      {/* Industries */}
      <section className="bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <motion.div {...fade} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="eyebrow text-[hsl(var(--accent))]">Industries served</p>
              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-display font-bold">Find products by application</h2>
            </div>
            <Link to="/industries" className="flex items-center gap-1 text-sm font-semibold text-[hsl(var(--primary))] link-underline">All industries <ArrowRight size={16} /></Link>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sectors.map((s, i) => (
              <motion.div key={s.slug} {...fade} transition={{ duration: 0.5, delay: i * 0.04 }}>
                <Link to={`/sector/${s.slug}`} data-testid={`home-sector-${s.slug}`} className="group relative block rounded-xl overflow-hidden aspect-[4/5] card-hover">
                  <img src={s.image} alt={s.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--navy))] via-[hsl(var(--navy))]/40 to-transparent" />
                  <div className="absolute bottom-0 p-4">
                    <h3 className="text-white font-display font-semibold leading-tight">{s.name}</h3>
                    <p className="text-xs text-slate-300 mt-1 mono">{s.count} products</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="rounded-2xl bg-[hsl(var(--navy))] text-white p-8 sm:p-14 relative overflow-hidden">
          <div className="absolute inset-0 grid-texture-dark opacity-40" />
          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="text-2xl sm:text-3xl font-display font-bold">Ready to source your industrial computing?</h2>
              <p className="mt-3 text-slate-300">Build a multi-item RFQ from our catalog and get a single consolidated quotation. OEM/ODM enquiries welcome.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/catalog" className="btn-cta px-6 h-12 leading-[3rem] rounded-md font-semibold">Browse Catalog</Link>
              <Link to="/contact" className="px-6 h-12 leading-[3rem] rounded-md font-semibold border border-white/25 hover:bg-white/10 transition-colors">Custom Solution Enquiries</Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
