import React from "react";
import { Link } from "react-router-dom";
import { Layers, Search, Wrench, CheckCircle2, MapPin, Globe, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";

const journey = [
  {
    icon: Layers,
    title: "Design & Architecture",
    subtitle: "Consultation, Diagnostic & Ecosystem Blueprint",
    body: "We define your upgrade goals and conduct an in-depth analysis of current operations to pinpoint bottlenecks. We design a custom hardware and software ecosystem tailored to your spatial needs, establishing performance baselines, ROI metrics, and targeted risk mitigation.",
    highlights: ["Vision & Consultation", "Systems Diagnostic", "Ecosystem Blueprint", "Performance & Risk Mitigation"]
  },
  {
    icon: Search,
    title: "Strategic Sourcing",
    subtitle: "Direct OEM Relationships & Component Vetting",
    body: "We bypass local intermediaries to secure authentic hardware and direct-from-factory pricing from premier technology hubs. Every component—from processing power to sensor accuracy—undergoes component-level vetting for enterprise-grade reliability and scalable procurement.",
    highlights: ["Direct OEM Pricing", "Component-Level Vetting", "Cost-to-Performance Optimization", "Scalable Procurement"]
  },
  {
    icon: Wrench,
    title: "Custom Integration & Packaging",
    subtitle: "Hardware-Software Sync & Bespoke Assembly",
    body: "We bridge physical hardware and operational software by managing data pipelines, API integrations, and protocols. Technical groundwork (firmware setup, component calibration, network config) is executed prior to deployment, packaged into modular, ready-to-deploy units with localized interfaces.",
    highlights: ["Hardware-Software Sync", "System Pre-Configuration", "Bespoke Modular Assembly", "Interface Localisation"]
  },
  {
    icon: CheckCircle2,
    title: "Implementation & Deployment",
    subtitle: "Field-First Installation & Live Integration",
    body: "Operating with a field-first approach, our dedicated team personally manages physical installation directly within your environment. We bring newly sourced technology online smoothly within your active workflow, concluding with a complete operational handover and documentation.",
    highlights: ["Transition Mapping", "Field-First Installation", "Live Workflow Integration", "Operational Handover"]
  }
];

export default function Sourcing() {
  return (
    <Layout>
      <section className="navy-bg text-white pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 grid-texture-dark opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow text-[hsl(var(--accent))]">End-to-End Solutions Integrator</p>
          <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight">How Quartzar Works</h1>
          <p className="mt-4 text-slate-300 max-w-3xl leading-relaxed">
            Quartzar Technology & Automation Solutions (Registration No: 202603261070) is a specialized solutions provider dedicated to bridging the gap between global manufacturing capabilities and localized, client-specific needs. We transform high-quality, internationally sourced components into seamless, ready-to-deploy systems.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="eyebrow text-[hsl(var(--primary))]">Four-Phase Integration Model</p>
          <h2 className="mt-1 text-2xl sm:text-3xl font-display font-bold text-slate-900">From Design Blueprint to Live Deployment</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {journey.map((j, i) => (
            <div key={j.title} className="relative rounded-xl border border-slate-200 bg-white p-6 sm:p-8 card-hover flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="grid place-items-center w-12 h-12 rounded-xl bg-sky-50 text-[hsl(var(--primary))] border border-sky-100">
                    <j.icon size={22} />
                  </span>
                  <span className="font-mono text-3xl font-extrabold text-slate-200">0{i + 1}</span>
                </div>
                <h3 className="font-display font-bold text-xl text-slate-900">{j.title}</h3>
                <p className="text-xs font-semibold text-[hsl(var(--primary))] mt-0.5 mb-3">{j.subtitle}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{j.body}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <div className="grid grid-cols-2 gap-2">
                  {j.highlights.map((h) => (
                    <span key={h} className="text-[11px] font-medium text-slate-600 bg-slate-50 border border-slate-200/70 rounded px-2.5 py-1 flex items-center gap-1.5 truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))] flex-shrink-0" />
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-8">
          <div className="rounded-xl border border-slate-200 p-6 sm:p-8 bg-slate-50/50">
            <span className="grid place-items-center w-11 h-11 rounded-lg bg-[hsl(var(--navy))] text-white mb-4">
              <MapPin size={20} />
            </span>
            <h3 className="font-display font-bold text-lg text-slate-900">Field-First Local Deployment & Support</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Operating with a dedicated field-first technical team in Malaysia, we personally manage physical installation directly within your environment. We ensure smooth live workflow integration and complete operational handover with full documentation so your team can confidently operate systems from day one.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 p-6 sm:p-8 bg-slate-50/50">
            <span className="grid place-items-center w-11 h-11 rounded-lg bg-[hsl(var(--primary))] text-white mb-4">
              <Globe size={20} />
            </span>
            <h3 className="font-display font-bold text-lg text-slate-900">Proven Application Fields</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Our integrated hardware and software solutions serve critical sector applications: power-monitoring and predictive maintenance for Manufacturing, secure environmental monitoring for Healthcare & Clinical Facilities, automated WMS tracking for Logistics, and mmWave radar AI automation for Smart Buildings.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="rounded-xl bg-sky-50/60 border border-sky-200/70 p-6 grid sm:grid-cols-3 gap-6 text-center">
            {[
              ["Registration No.", "202603261070"],
              ["Core Competency", "End-to-End Systems Integrator"],
              ["Sourcing Advantage", "Direct OEM & Factory Pricing"]
            ].map(([k, v]) => (
              <div key={k}>
                <p className="eyebrow text-slate-500 text-[11px]">{k}</p>
                <p className="mt-1 font-bold text-slate-900 text-sm sm:text-base">{v}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-400 text-center">
            Official corporate overview of Quartzar Technology & Automation Solutions.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">Ready to Upgrade Your Infrastructure?</h2>
        <p className="mt-2 text-slate-600 max-w-xl mx-auto text-sm">
          Explore our industrial hardware lineup or connect with our engineering team for custom integration solutions.
        </p>
        <div className="mt-6 flex items-center justify-center gap-4 flex-wrap">
          <Link to="/catalog" className="btn-cta px-8 h-12 leading-[3rem] rounded-md font-semibold inline-flex items-center gap-2">
            Browse Catalog <ArrowRight size={16} />
          </Link>
          <Link to="/contact" className="px-8 h-12 leading-[3rem] rounded-md font-semibold border border-slate-300 hover:bg-slate-100 text-slate-800 transition-colors">
            Contact Technical Directors
          </Link>
        </div>
      </section>
    </Layout>
  );
}
