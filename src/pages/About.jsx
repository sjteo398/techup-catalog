import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Factory,
  ClipboardCheck,
  Microscope,
  ArrowRight,
  Layers,
  Settings
} from "lucide-react";
import Layout from "@/components/layout/Layout";

const milestones = [
  ["2009", "Manufacturing operations founded — dedicated industrial control board and embedded computing production."],
  ["2016", "Awarded High-Tech Enterprise status; certified under ISO 9001 Quality Management and 3C standards."],
  ["2021", "Annual sales exceeded MYR 130 million with full smart factory and digital line modernization."],
  ["2024", "Structural upgrades and regional brand expansion as Quartzar Technology & Automation Solutions."],
];

const qc = [
  {
    icon: Microscope,
    title: "Inspection",
    body: "AOI, SPI, and X-ray inspection deployed on every production batch to guarantee defect-free solder and silicon."
  },
  {
    icon: ClipboardCheck,
    title: "Reliability testing",
    body: "Aging, temperature chamber, vibration, drop, ESD, durability, and duty-cycle tests."
  },
  {
    icon: Factory,
    title: "Capacity",
    body: "8,000 m² partner facility, 180+ staff, ~30,000 units/month."
  }
];

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="navy-bg text-white pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-texture-dark opacity-50" />
        <img
          src="/catalog/context/about-support.jpg"
          alt=""
          className="absolute right-0 top-0 h-full w-[45%] object-cover opacity-25 hidden lg:block"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow text-[hsl(var(--accent))]">About Quartzar</p>
          <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight max-w-3xl">
            Quartzar Technology & Automation Solutions
          </h1>
          <p className="mt-5 text-slate-300 max-w-2xl leading-relaxed text-base sm:text-lg">
            A specialised solutions provider dedicated to bridging the gap between global manufacturing and technological capabilities and localised, client-specific needs.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/catalog" className="btn-cta h-12 px-6 rounded-md font-semibold text-sm inline-flex items-center gap-2">
              Explore Hardware Catalog <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="h-12 px-6 rounded-md font-semibold text-sm border border-slate-400 hover:border-white text-white hover:bg-white/10 transition-colors inline-flex items-center gap-2"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* About Our Company Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <p className="eyebrow text-[hsl(var(--accent))]">About Our Company</p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-display font-bold text-slate-900 leading-tight">
            Bridging Global Manufacturing with Localised Industrial Needs
          </h2>

          <div className="mt-6 space-y-4 text-slate-700 leading-relaxed text-base sm:text-lg max-w-4xl">
            <p>
              <strong>Quartzar Technology & Automation Solutions</strong> is a <strong>specialised solutions provider</strong> dedicated to bridging the gap between global manufacturing and technological capabilities and localised, client-specific needs.
            </p>
            <p>
              The rapid pace of global innovation is constantly introducing new technologies, and businesses that fail to adapt risk falling behind. That is why we operate as an <strong>end-to-end integrator</strong>, transforming high-quality, internationally sourced components into seamless, ready-to-deploy systems.
            </p>
          </div>

          {/* Highlight line formatted on a single line */}
          <div className="mt-6 pt-5 border-t border-slate-200">
            <p className="text-slate-900 font-bold text-base sm:text-lg md:whitespace-nowrap">
              We equip our clients with the latest technology so they can maintain their competitive edge.
            </p>
          </div>

          {/* Three core pillars with larger, authentic engineering text */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 shadow-sm flex flex-col justify-between">
              <div>
                <span className="w-12 h-12 rounded-xl bg-sky-50 text-[hsl(var(--primary))] grid place-items-center mb-4">
                  <Layers size={24} />
                </span>
                <h3 className="font-display font-bold text-slate-900 text-lg sm:text-xl">
                  Specialised Solutions Provider
                </h3>
                <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
                  We don't supply generic off-the-shelf units. We configure the hardware to match your exact mounting dimensions, ambient operating temperatures, and proprietary software stack.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 shadow-sm flex flex-col justify-between">
              <div>
                <span className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 grid place-items-center mb-4">
                  <Settings size={24} />
                </span>
                <h3 className="font-display font-bold text-slate-900 text-lg sm:text-xl">
                  End-to-End Integrator
                </h3>
                <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
                  Direct OEM sourcing, carrier board tailoring, OS installation, firmware calibration, and bench testing — delivered ready to plug in and run on day one.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 shadow-sm flex flex-col justify-between">
              <div>
                <span className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 grid place-items-center mb-4">
                  <Factory size={24} />
                </span>
                <h3 className="font-display font-bold text-slate-900 text-lg sm:text-xl">
                  16-Year Manufacturing Lineage
                </h3>
                <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
                  Produced in ISO 9001 and 3C certified facilities with 8,000 m² production floor and over 30,000 units manufactured every month since 2009.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing Partnership */}
      <section className="bg-white border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow text-[hsl(var(--accent))]">Manufacturing partnership</p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-display font-bold max-w-2xl text-slate-900">
            How our OEM relationships ensure quality
          </h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {qc.map((q) => (
              <div key={q.title} className="rounded-xl border border-slate-200 p-6">
                <span className="grid place-items-center w-11 h-11 rounded-lg bg-[hsl(var(--navy))] text-white">
                  <q.icon size={20} />
                </span>
                <h3 className="mt-4 font-display font-semibold text-lg text-slate-900">{q.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{q.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Previous Version Layout: Milestones & Certifications Side-by-Side */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Milestones Left Column */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">Milestones</h2>
            <div className="mt-8 space-y-6">
              {milestones.map(([y, t]) => (
                <div key={y} className="flex gap-5">
                  <div className="font-mono font-extrabold text-[hsl(var(--primary))] w-14 flex-shrink-0 text-base">
                    {y}
                  </div>
                  <div className="flex-1 border-l-2 border-slate-200 pl-5 pb-1">
                    <p className="text-slate-700 leading-relaxed">{t}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Right Column */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">Certifications</h2>
            <p className="mt-2 text-slate-600">Product lines carry the following compliance marks:</p>
            <div className="mt-6 flex flex-wrap gap-4">
              {["ISO 9001", "3C (CCC)", "CE", "FCC", "RoHS", "High-Tech"].map((c) => (
                <div key={c} className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-5 py-3 shadow-xs">
                  <ShieldCheck size={20} className="text-[hsl(var(--primary))]" />
                  <span className="font-display font-bold text-slate-900">{c}</span>
                </div>
              ))}
            </div>
            <Link to="/contact" className="inline-flex items-center gap-2 mt-8 btn-cta px-6 h-12 rounded-md font-semibold">
              Contact Us <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
