import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Factory,
  ClipboardCheck,
  Microscope,
  ArrowRight,
  Award,
  TrendingUp,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  Zap,
  Settings
} from "lucide-react";
import Layout from "@/components/layout/Layout";

const milestones = [
  {
    year: "2009",
    title: "Company Founded",
    sub: "公司成立",
    desc: "Industrial manufacturing and engineering operations established, focusing on industrial motherboard and embedded system development."
  },
  {
    year: "2010",
    title: "R&D Center Established",
    sub: "研发中心成立",
    desc: "Dedicated research and development center launched to pioneer proprietary rugged hardware architectures and circuit designs."
  },
  {
    year: "2012",
    title: "Production Center Established",
    sub: "制作中心成立",
    desc: "Expanded manufacturing operations with high-precision SMT production lines and standardized assembly facilities."
  },
  {
    year: "2014",
    title: "Top 10 Industry Innovation Award",
    sub: "年度行业十大创新产品",
    desc: "Honored with the Annual Top 10 Industry Innovative Products Award for breakthrough industrial embedded computer designs."
  },
  {
    year: "2016",
    title: "Shenzhen High-Tech Enterprise",
    sub: "获深圳高新企业",
    desc: "Accredited as a certified High-Tech Enterprise for proven technological innovation and engineering excellence.",
    callout: {
      badge: "ISO 9001 & 3C Certified",
      text: "Acquired official qualifications: certified under ISO 9001 Quality Management System and 3C (CCC) Certification.",
      original: "获相关资质：通过ISO9001质量管理认证、3C认证"
    }
  },
  {
    year: "2019",
    title: "Shenzhen SRDI Enterprise",
    sub: "获深圳专精特新企业",
    desc: "Recognized as a 'Specialized, Refined, Differential and Innovative' (专精特新) enterprise for high-reliability industrial computing."
  },
  {
    year: "2021",
    title: "Annual Sales Exceeded ¥200M",
    sub: "销售突破2亿元",
    desc: "International sales turnover surpassed ¥200 million across automation, smart logistics, vision inspection, and edge computing."
  },
  {
    year: "2022",
    title: "Smart Factory Digital Transformation",
    sub: "工厂的数字化改造",
    desc: "Completed end-to-end digital transformation of manufacturing lines with intelligent MES integration and automated QC workflows."
  },
  {
    year: "2024–Present",
    title: "Structural Upgrades & Ecosystem Modernization",
    sub: "加强结构化升级",
    desc: "Advancing modular hardware integration and regional market reach as Quartzar Technology & Automation Solutions."
  }
];

const qc = [
  {
    icon: Microscope,
    title: "Component & Board Inspection",
    body: "Multi-point AOI, SPI, and X-ray inspection deployed on every production batch to guarantee zero silicon and solder defects."
  },
  {
    icon: ClipboardCheck,
    title: "Stress & Reliability Testing",
    body: "Full in-line thermal aging, operating temperature chambers, vibration, drop, ESD, and continuous duty-cycle testing."
  },
  {
    icon: Factory,
    title: "Audited Manufacturing Scale",
    body: "8,000 m² partner production facilities, 180+ technical staff, and reliable capacity exceeding ~30,000 units per month."
  }
];

const certifications = [
  { code: "ISO 9001", name: "Quality Management System Certified" },
  { code: "3C (CCC)", name: "China Compulsory Certification" },
  { code: "CE", name: "European Conformity Standard" },
  { code: "FCC", name: "Federal Communications Compliance" },
  { code: "RoHS", name: "Restriction of Hazardous Substances" },
  { code: "SRDI / High-Tech", name: "National High-Tech & SRDI Enterprise" }
];

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="navy-bg text-white pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-texture-dark opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-300 text-xs font-semibold tracking-wider uppercase">
              Quartzar Technology & Automation Solutions
            </span>
            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight leading-tight">
              A Specialised Solutions Provider & End-to-End Integrator
            </h1>
            <p className="mt-5 text-slate-300 text-lg leading-relaxed">
              Dedicated to bridging the gap between global manufacturing and technological capabilities and localised, client-specific needs.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/catalog" className="btn-cta h-12 px-6 rounded-md font-semibold text-sm inline-flex items-center gap-2">
                Explore Hardware Catalog <ArrowRight size={16} />
              </Link>
              <Link
                to="/contact"
                className="h-12 px-6 rounded-md font-semibold text-sm border border-slate-400 hover:border-white text-white hover:bg-white/10 transition-colors inline-flex items-center gap-2"
              >
                Consult Our Engineers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Our Company Section (Directly from authentic briefing) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <div className="max-w-3xl">
            <p className="eyebrow text-[hsl(var(--accent))]">About Our Company</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-display font-bold text-slate-900 leading-tight">
              Equipping You with the Latest Technology to Maintain Your Competitive Edge
            </h2>
          </div>

          <div className="mt-8 grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5 text-slate-700 leading-relaxed text-base">
              <p className="text-lg font-medium text-slate-900">
                <strong>Quartzar Technology & Automation Solutions</strong> is a <strong>specialised solutions provider</strong> dedicated to bridging the gap between global manufacturing and technological capabilities and localised, client-specific needs.
              </p>
              <p>
                The rapid pace of global innovation is constantly introducing new technologies, and businesses that fail to adapt risk falling behind.
              </p>
              <p>
                That is why we operate as an <strong>end-to-end integrator</strong>, transforming high-quality, internationally sourced components into seamless, ready-to-deploy systems.
              </p>
              <p className="text-slate-900 font-semibold pt-2">
                We equip our clients with the latest technology so they can maintain their competitive edge.
              </p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 gap-4">
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-lg bg-sky-50 text-[hsl(var(--primary))] grid place-items-center">
                    <Layers size={20} />
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-slate-900 text-sm">Specialised Solutions Provider</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Customizing architecture to client requirements</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 grid place-items-center">
                    <Settings size={20} />
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-slate-900 text-sm">End-to-End Integrator</h3>
                    <p className="text-xs text-slate-500 mt-0.5">From sourcing to pre-configured deployment</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 grid place-items-center">
                    <Zap size={20} />
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-slate-900 text-sm">Proven 16+ Year Heritage</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Backed by audited tier-1 partner manufacturing scale</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Control & Manufacturing Partnership */}
      <section className="bg-white border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow text-[hsl(var(--accent))]">Manufacturing & Quality Assurance</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-display font-bold text-slate-900">
              How Our OEM Capabilities Guarantee Enterprise Reliability
            </h2>
            <p className="mt-3 text-slate-600 text-sm">
              Every unit dispatched undergoes multi-stage hardware vetting, board-level diagnostics, and environmental burn-in before site delivery.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {qc.map((q) => (
              <div key={q.title} className="rounded-xl border border-slate-200 p-6 bg-slate-50/50 hover:bg-white hover:shadow-sm transition-all">
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

      {/* Historical Milestones Timeline (2009 to 2024-Present) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="eyebrow text-[hsl(var(--accent))]">Evolution & Heritage</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
            Our Development Journey
          </h2>
          <p className="mt-3 text-slate-600 text-sm">
            Over 16 years of continuous engineering breakthroughs, certified high-tech accreditations, and digital manufacturing evolution.
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Track Line */}
          <div className="absolute left-4 sm:left-24 top-2 bottom-2 w-0.5 bg-slate-200" />

          <div className="space-y-8">
            {milestones.map((m) => (
              <div key={m.year} className="relative flex flex-col sm:flex-row gap-4 sm:gap-10 items-start">
                {/* Year Marker */}
                <div className="flex items-center gap-3 sm:w-24 flex-shrink-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[hsl(var(--navy))] border-4 border-white text-white shadow-sm flex items-center justify-center z-10">
                    <span className="w-2 h-2 rounded-full bg-[hsl(var(--accent))]" />
                  </div>
                  <span className="font-mono font-extrabold text-[hsl(var(--primary))] text-base sm:text-lg">
                    {m.year}
                  </span>
                </div>

                {/* Milestone Content Card */}
                <div className="flex-1 ml-7 sm:ml-0 bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm w-full">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <h3 className="font-display font-bold text-slate-900 text-lg">{m.title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-500 font-medium">
                        {m.sub}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">{m.desc}</p>

                  {/* Special Callout Bubble for 2016 ISO/3C Certifications */}
                  {m.callout && (
                    <div className="mt-4 p-4 rounded-xl bg-slate-900 text-white relative shadow-md border border-slate-800">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--accent))]">
                        <Award size={16} />
                        <span>{m.callout.badge}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 mt-1.5 leading-relaxed">
                        {m.callout.text}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1 font-mono">
                        {m.callout.original}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Direct Contact */}
      <section className="bg-slate-50 border-t border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <p className="eyebrow text-[hsl(var(--accent))]">Compliance & Certification</p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-display font-bold text-slate-900">
                Certified to International Standards
              </h2>
              <p className="mt-2 text-slate-600 text-sm max-w-xl">
                Our product architectures and partner facilities comply with worldwide industry directives and strict quality management protocols:
              </p>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {certifications.map((c) => (
                  <div key={c.code} className="bg-white border border-slate-200 rounded-xl p-3.5 flex items-start gap-3 shadow-xs">
                    <ShieldCheck size={18} className="text-[hsl(var(--primary))] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-display font-bold text-sm text-slate-900 block">{c.code}</span>
                      <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">{c.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
              <h3 className="font-display font-bold text-xl text-slate-900">Partner With Quartzar</h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                Connect directly with our engineering team for customized industrial PC architectures, carrier board tailoring, or strategic volume quotes.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Link to="/contact" className="btn-cta h-11 px-5 rounded-md font-semibold text-xs inline-flex items-center justify-center gap-2">
                  Send Technical Inquiry <ArrowRight size={14} />
                </Link>
                <Link
                  to="/catalog"
                  className="h-11 px-5 rounded-md font-semibold text-xs border border-slate-300 hover:border-slate-800 text-slate-800 hover:bg-slate-50 transition-colors inline-flex items-center justify-center gap-2"
                >
                  Browse Full Catalog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
