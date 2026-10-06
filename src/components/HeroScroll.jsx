import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, FileText, Cpu, Plug, Thermometer, Wind } from "lucide-react";

const HERO = "/catalog/products/hero_flagship.jpg";

const callouts = [
  { icon: Wind, label: "Fanless finned chassis", at: [0.05, 0.28] },
  { icon: Plug, label: "Dual LAN • 6x COM • USB", at: [0.28, 0.52] },
  { icon: Thermometer, label: "Wide-temp -20°C to 70°C", at: [0.52, 0.76] },
  { icon: Cpu, label: "Intel Core Ultra ready", at: [0.76, 1.0] },
];

function Callout({ c, progress }) {
  const opacity = useTransform(progress, [c.at[0] - 0.06, c.at[0], c.at[1] - 0.02, c.at[1]], [0, 1, 1, 0]);
  const x = useTransform(progress, [c.at[0] - 0.06, c.at[0]], [40, 0]);
  const Icon = c.icon;
  return (
    <motion.div style={{ opacity, x }} className="absolute right-6 sm:right-12 top-[42%] hidden md:flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-lg px-4 py-3">
      <span className="grid place-items-center w-9 h-9 rounded bg-[hsl(var(--accent))] text-white"><Icon size={18} /></span>
      <span className="text-white font-medium text-sm">{c.label}</span>
    </motion.div>
  );
}

export default function HeroScroll() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.35]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 12]);
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section ref={ref} className="relative h-[220vh]" data-testid="hero-scroll">
      <div className="sticky top-0 h-screen overflow-hidden navy-bg">
        <motion.div style={{ y: gridY }} className="absolute inset-0 grid-texture-dark opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--navy))] via-transparent to-[hsl(var(--navy))]" />

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <div className="max-w-2xl fade-up">
            <p className="eyebrow text-[hsl(var(--accent))]">Local accountability • Global OEM scale</p>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-[1.05] text-white">
              Rugged industrial computing,<br /><span className="text-[hsl(var(--accent))]">engineered</span> & supported in Malaysia.
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              Panel PCs, fanless box PCs, embedded boards and network appliances — specified by Quartzar, manufactured by vetted OEM/ODM partners, delivered with responsive local support.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/catalog" data-testid="hero-browse-btn" className="flex items-center gap-2 btn-cta px-6 h-12 rounded-md font-semibold">Browse Products <ArrowRight size={18} /></Link>
              <Link to="/contact" data-testid="hero-rfq-btn" className="flex items-center gap-2 px-6 h-12 rounded-md font-semibold text-white border border-white/25 hover:bg-white/10 transition-colors"><FileText size={18} /> Request a Quote</Link>
            </div>
          </div>
        </div>

        {/* Flagship product */}
        <motion.div style={{ scale, rotate, y }} className="pointer-events-none absolute right-[-4%] bottom-[-4%] w-[48%] max-w-[580px] hidden md:block">
          <img src={HERO} alt="Quartzar flagship industrial box PC" className="w-full drop-shadow-2xl rounded-xl" />
        </motion.div>

        {/* Scroll feature callouts */}
        {callouts.map((c, i) => <Callout key={i} c={c} progress={scrollYProgress} />)}

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-400 text-xs mono flex flex-col items-center gap-1">
          <span>SCROLL TO EXPLORE</span>
          <span className="w-px h-8 bg-gradient-to-b from-slate-400 to-transparent" />
        </div>
      </div>
    </section>
  );
}
