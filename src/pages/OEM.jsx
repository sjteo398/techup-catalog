import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PenTool, Cpu, Layers, ShieldCheck, Truck, MessageSquare, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";

const steps = [
  { icon: MessageSquare, title: "Enquiry", body: "Share your application, target specs, quantities and branding needs." },
  { icon: PenTool, title: "Specification", body: "Our engineers propose a hardware config, enclosure and firmware plan." },
  { icon: Layers, title: "Sampling", body: "Evaluation samples built and validated against your requirements." },
  { icon: Cpu, title: "Production", body: "Volume manufacturing at vetted OEM/ODM partner lines." },
  { icon: ShieldCheck, title: "Quality Control", body: "AOI, SPI, X-ray plus aging, vibration, drop, ESD & thermal testing." },
  { icon: Truck, title: "Delivery", body: "Local warehousing or direct factory shipment with documentation." },
];

const services = [
  { title: "Branding & Logo", body: "Custom silkscreen, laser etching, boot logos and packaging with your brand." },
  { title: "Hardware Configuration", body: "Tailored CPU, memory, storage, I/O, wireless and expansion selection." },
  { title: "Custom Enclosures", body: "Bespoke chassis, panel cut-outs, mounting and colour to fit your deployment." },
  { title: "Firmware & BIOS", body: "Custom BIOS defaults, watchdog, auto-power-on, GPIO mapping and OS images." },
];

export default function OEM() {
  return (
    <Layout>
      <section className="navy-bg text-white pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-texture-dark opacity-50" />
        <img src="/catalog/context/sector-manufacturing.jpg" alt="" className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow text-[hsl(var(--accent))]">OEM / ODM Services</p>
          <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight max-w-2xl">Build it your way — custom industrial computing</h1>
          <p className="mt-4 text-slate-300 max-w-2xl">With 16+ years of OEM/ODM experience across our manufacturing partners, Quartzar turns your requirements into production-ready hardware — with local project management and accountability.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 mt-8 btn-cta px-6 h-12 rounded-md font-semibold">Start a Custom Project <ArrowRight size={18} /></Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl sm:text-3xl font-display font-bold">Customization services</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <div key={s.title} className="bg-white rounded-xl border border-slate-200 p-6 card-hover">
              <h3 className="font-display font-semibold text-lg text-[hsl(var(--primary))]">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl sm:text-3xl font-display font-bold">The process</h2>
          <p className="mt-2 text-slate-600">From first enquiry to delivered product.</p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="relative rounded-xl border border-slate-200 p-6">
                <span className="absolute top-4 right-4 font-mono text-3xl font-extrabold text-slate-100">0{i + 1}</span>
                <span className="grid place-items-center w-11 h-11 rounded-lg bg-[hsl(var(--navy))] text-white"><s.icon size={20} /></span>
                <h3 className="mt-4 font-display font-semibold text-lg">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
