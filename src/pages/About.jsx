import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Target, Eye, Factory, ClipboardCheck, Microscope, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";

const milestones = [
  ["2009", "Partner manufacturing operations founded — industrial control boards & systems."],
  ["2015", "Expanded OEM/ODM services across panel PCs, box PCs and network appliances."],
  ["2022", "Full in-line QC: AOI, SPI, X-ray, aging, vibration, drop & ESD testing."],
  ["2026", "Quartzar launches as the Malaysian brand front — local accountability, global scale."],
];

const qc = [
  { icon: Microscope, title: "Inspection", body: "AOI, SPI and X-ray inspection on every production batch." },
  { icon: ClipboardCheck, title: "Reliability testing", body: "Aging, temperature, vibration, drop, ESD, durability and key-lifespan tests." },
  { icon: Factory, title: "Capacity", body: "8,000 m² partner facility, 180+ staff, ~30,000 units/month." },
];

export default function About() {
  return (
    <Layout>
      <section className="navy-bg text-white pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-texture-dark opacity-50" />
        <img src="/catalog/context/about-support.jpg" alt="" className="absolute right-0 top-0 h-full w-[45%] object-cover opacity-25 hidden lg:block" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow text-[hsl(var(--accent))]">About Quartzar</p>
          <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight max-w-3xl">A local industrial computing brand with global manufacturing reach</h1>
          <p className="mt-5 text-slate-300 max-w-2xl leading-relaxed">Quartzar is a Malaysian-registered industrial PC brand. We design and specify rugged computing products — motherboards, box PCs, panel PCs, network appliances and displays — manufactured by vetted OEM/ODM partners with over 16 years of experience. You get one accountable local partner, backed by proven manufacturing scale.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-6">
        {[[Target, "Our mission", "To make rugged, reliable industrial computing easy to source in Malaysia and SEA — with technical depth, honest specs and responsive local support."], [Eye, "Our positioning", "Not a generic reseller and not an anonymous overseas storefront. A local brand that stands behind every unit, backed by audited manufacturing partners."]].map(([Icon, t, b]) => (
          <div key={t} className="bg-white rounded-xl border border-slate-200 p-8">
            <span className="grid place-items-center w-12 h-12 rounded-lg bg-[hsl(var(--accent))] text-white"><Icon size={22} /></span>
            <h3 className="mt-4 font-display font-bold text-xl">{t}</h3>
            <p className="mt-2 text-slate-600">{b}</p>
          </div>
        ))}
      </section>

      <section className="bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="eyebrow text-[hsl(var(--accent))]">Manufacturing partnership</p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-display font-bold max-w-2xl">How our OEM relationships ensure quality</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {qc.map((q) => (
              <div key={q.title} className="rounded-xl border border-slate-200 p-6">
                <span className="grid place-items-center w-11 h-11 rounded-lg bg-[hsl(var(--navy))] text-white"><q.icon size={20} /></span>
                <h3 className="mt-4 font-display font-semibold text-lg">{q.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{q.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold">Milestones</h2>
            <div className="mt-8 space-y-6">
              {milestones.map(([y, t]) => (
                <div key={y} className="flex gap-5">
                  <div className="font-mono font-extrabold text-[hsl(var(--primary))] w-14 flex-shrink-0">{y}</div>
                  <div className="flex-1 border-l-2 border-slate-200 pl-5 pb-1"><p className="text-slate-700">{t}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold">Certifications</h2>
            <p className="mt-2 text-slate-600">Product lines carry the following compliance marks:</p>
            <div className="mt-6 flex flex-wrap gap-4">
              {["CE", "FCC", "RoHS", "ISO 9001"].map((c) => (
                <div key={c} className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-5 py-3">
                  <ShieldCheck size={20} className="text-[hsl(var(--primary))]" />
                  <span className="font-display font-bold">{c}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-amber-600">ISO 9001 shown as placeholder — confirm/upload certificate before publishing.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 mt-8 btn-cta px-6 h-12 rounded-md font-semibold">Contact Us <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
