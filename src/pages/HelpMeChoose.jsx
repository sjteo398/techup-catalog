import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ProductCard";
import api from "@/lib/apiClient";
import { Wand2, ArrowRight, RotateCcw } from "lucide-react";

export default function HelpMeChoose() {
  const [sectors, setSectors] = useState([]);
  const [step, setStep] = useState(0);
  const [ans, setAns] = useState({ sector: null, environment: null, priority: null, form_pref: null });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { api.get("/sectors").then((r) => setSectors(r.data)); }, []);

  const steps = [
    { key: "sector", title: "What industry / application is this for?", options: sectors.map((s) => ({ value: s.slug, label: s.name })) },
    { key: "environment", title: "What is the deployment environment?", options: [
      { value: "harsh", label: "Harsh — dust, heat, vibration (factory floor, outdoor)" },
      { value: "controlled", label: "Controlled — office, indoor, climate-managed" },
      { value: "invehicle", label: "In-vehicle / mobile — needs wide DC & shock tolerance" },
    ] },
    { key: "priority", title: "What matters most?", options: [
      { value: "compute", label: "Maximum compute performance" },
      { value: "io", label: "Rich I/O — serial ports, GPIO, expansion" },
      { value: "compact", label: "Compact footprint / space-constrained" },
      { value: "display", label: "Integrated display / HMI touchscreen" },
    ] },
  ];

  const choose = (key, value) => {
    const next = { ...ans, [key]: value };
    setAns(next);
    if (step < steps.length - 1) setStep(step + 1);
    else submit(next);
  };

  const submit = async (finalAns) => {
    setLoading(true);
    const { data } = await api.post("/wizard/recommend", finalAns);
    setResults(data); setLoading(false);
  };

  const reset = () => { setStep(0); setAns({ sector: null, environment: null, priority: null, form_pref: null }); setResults(null); };

  return (
    <Layout>
      <section className="navy-bg text-white pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 grid-texture-dark opacity-50" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <span className="inline-grid place-items-center w-14 h-14 rounded-xl bg-[hsl(var(--accent))] mx-auto"><Wand2 size={26} /></span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-display font-extrabold">Help Me Choose</h1>
          <p className="mt-3 text-slate-300">Answer a few questions and we'll shortlist matching products from the catalog — then build your RFQ.</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-12">
        {results ? (
          <div data-testid="wizard-results">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold">Recommended for you</h2>
              <button onClick={reset} className="flex items-center gap-1 text-sm font-semibold text-[hsl(var(--accent))]"><RotateCcw size={15} /> Start over</button>
            </div>
            {loading ? <p className="text-slate-400">Matching…</p> : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {results.map((p) => <ProductCard key={p.slug} p={p} />)}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10">
            <div className="flex items-center gap-2 mb-6">
              {steps.map((_, i) => (
                <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-[hsl(var(--accent))]" : "bg-slate-200"}`} />
              ))}
            </div>
            <p className="eyebrow text-slate-400">Step {step + 1} of {steps.length}</p>
            <h2 className="mt-2 text-xl sm:text-2xl font-display font-bold">{steps[step].title}</h2>
            <div className="mt-6 space-y-3">
              {steps[step].options.map((o) => (
                <button key={o.value} data-testid={`wizard-opt-${o.value}`} onClick={() => choose(steps[step].key, o.value)} className="w-full flex items-center justify-between text-left p-4 rounded-lg border border-slate-200 hover:border-[hsl(var(--primary))] hover:bg-slate-50 transition-colors group">
                  <span className="font-medium text-slate-800">{o.label}</span>
                  <ArrowRight size={18} className="text-slate-300 group-hover:text-[hsl(var(--primary))] group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
            {step > 0 && <button onClick={() => setStep(step - 1)} className="mt-6 text-sm text-slate-500 hover:text-slate-800">← Back</button>}
          </div>
        )}
      </section>
    </Layout>
  );
}
