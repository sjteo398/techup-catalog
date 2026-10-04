import React from "react";
import { Link } from "react-router-dom";
import { Search, ListChecks, Send, FileText, Package, Truck, MapPin, Globe } from "lucide-react";
import Layout from "@/components/layout/Layout";

const journey = [
  { icon: Search, title: "Browse the catalog", body: "Explore products by category or industry, filter by specs, and open detail pages for full technical data." },
  { icon: ListChecks, title: "Build your RFQ list", body: "Add multiple products with quantities and configuration notes into one consolidated request." },
  { icon: Send, title: "Submit one enquiry", body: "Send a single multi-item RFQ instead of chasing quotes product-by-product." },
  { icon: FileText, title: "Receive quotation", body: "Our local team responds with pricing, lead times and configuration options." },
  { icon: Package, title: "Sample & negotiate", body: "Request evaluation samples and finalise specs, MOQ and commercial terms." },
  { icon: Truck, title: "Order & delivery", body: "Choose local warehousing dispatch or direct factory shipment with full documentation." },
];

export default function Sourcing() {
  return (
    <Layout>
      <section className="navy-bg text-white pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 grid-texture-dark opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow text-[hsl(var(--accent))]">How it works</p>
          <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight">A straightforward B2B sourcing journey</h1>
          <p className="mt-4 text-slate-300 max-w-2xl">No online checkout — this is an inquiry-driven model built for technical procurement. Here's how buying from TechUp works.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {journey.map((j, i) => (
            <div key={j.title} className="relative rounded-xl border border-slate-200 bg-white p-6 card-hover">
              <span className="absolute top-4 right-5 font-mono text-3xl font-extrabold text-slate-100">{i + 1}</span>
              <span className="grid place-items-center w-11 h-11 rounded-lg bg-[hsl(var(--accent))] text-white"><j.icon size={20} /></span>
              <h3 className="mt-4 font-display font-semibold text-lg">{j.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{j.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-8">
          <div className="rounded-xl border border-slate-200 p-6">
            <span className="grid place-items-center w-11 h-11 rounded-lg bg-[hsl(var(--navy))] text-white"><MapPin size={20} /></span>
            <h3 className="mt-4 font-display font-semibold text-lg">Local support & warehousing</h3>
            <p className="mt-2 text-sm text-slate-600">Malaysia-based sales and technical support for fast response, plus local stock options for popular SKUs to shorten lead times. <span className="text-slate-400">(Warehousing availability by SKU — placeholder.)</span></p>
          </div>
          <div className="rounded-xl border border-slate-200 p-6">
            <span className="grid place-items-center w-11 h-11 rounded-lg bg-[hsl(var(--primary))] text-white"><Globe size={20} /></span>
            <h3 className="mt-4 font-display font-semibold text-lg">Direct factory shipment</h3>
            <p className="mt-2 text-sm text-slate-600">For volume orders and international buyers, we arrange direct shipment from partner factories with export documentation. General MOQ and payment terms shared on quotation.</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-6 grid sm:grid-cols-3 gap-4 text-center">
            {[["Lead time", "2–6 weeks typical, SKU dependent"], ["MOQ", "Flexible — samples to volume"], ["Payment", "T/T, negotiable on quotation"]].map(([k, v]) => (
              <div key={k}><p className="eyebrow text-slate-400">{k}</p><p className="mt-1 font-medium text-slate-800 text-sm">{v}</p></div>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-400 text-center">General, non-binding information. Final terms are confirmed per quotation.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl sm:text-3xl font-display font-bold">Ready to start?</h2>
        <Link to="/catalog" className="inline-block mt-6 btn-cta px-8 h-12 leading-[3rem] rounded-md font-semibold">Browse the Catalog</Link>
      </section>
    </Layout>
  );
}
