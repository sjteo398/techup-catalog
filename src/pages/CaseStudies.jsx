import React from "react";
import { Link } from "react-router-dom";
import { FolderKanban, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";

export default function CaseStudies() {
  return (
    <Layout>
      <section className="navy-bg text-white pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 grid-texture-dark opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow text-[hsl(var(--accent))]">Deployments & Applications</p>
          <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight">Case Studies</h1>
          <p className="mt-4 text-slate-300 max-w-2xl">
            Real-world deployments of Quartzar industrial motherboards, fanless box PCs, and edge computing solutions.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-12 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-sky-100 text-[hsl(var(--primary))] grid place-items-center mx-auto mb-4">
            <FolderKanban size={32} />
          </div>
          <h2 className="text-xl font-display font-bold text-slate-900">No Case Studies Available Yet</h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            We are currently documenting deployment projects, system integrations, and industrial success stories. Check back soon for detailed technical case studies.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Link to="/catalog" className="btn-cta px-5 h-10 leading-[2.5rem] rounded-md text-sm font-semibold inline-flex items-center gap-1.5">
              Browse Catalog <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="px-5 h-10 leading-[2.5rem] rounded-md text-sm font-semibold border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
