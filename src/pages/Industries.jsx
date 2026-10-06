import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import api from "@/lib/apiClient";

export default function Industries() {
  const [sectors, setSectors] = useState([]);
  useEffect(() => { api.get("/sectors").then((r) => setSectors(r.data)); }, []);

  return (
    <Layout>
      <section className="navy-bg text-white pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 grid-texture-dark opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow text-[hsl(var(--accent))]">Industries & Applications</p>
          <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight">Find products by your use-case</h1>
          <p className="mt-4 text-slate-300 max-w-2xl">Technical buyers often know their application before the product category. Browse recommended Quartzar products by industry, with the typical requirements for each environment.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((s, i) => (
            <motion.div key={s.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.04 }}>
              <Link to={`/sector/${s.slug}`} data-testid={`industry-${s.slug}`} className="group block rounded-xl overflow-hidden border border-slate-200 bg-white card-hover h-full">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img src={s.image} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-3 left-4 text-white font-display font-bold text-lg">{s.name}</h3>
                </div>
                <div className="p-5">
                  <p className="text-sm text-slate-600">{s.blurb}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[hsl(var(--primary))]">{s.count} products <ArrowRight size={15} /></span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
