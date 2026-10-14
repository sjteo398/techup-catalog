import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Compass,
  Layers,
  Wrench,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Factory,
  HeartPulse,
  Truck,
  Building2,
  Cpu,
  Workflow,
  Boxes,
  Zap,
  Activity,
  Network,
  Eye,
  Sliders,
  Mail,
  MessageCircle,
  FileText
} from "lucide-react";
import Layout from "@/components/layout/Layout";

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 }
};

const pillars = [
  {
    id: "design",
    number: "01",
    title: "Design & Architecture",
    tagline: "Tailoring the hardware & software ecosystem to your spatial and operational needs",
    icon: Compass,
    steps: [
      {
        name: "Vision & Consultation",
        desc: "Define your upgrade goals, quantifiable target metrics, and critical operational requirements."
      },
      {
        name: "Systems Diagnostic",
        desc: "In-depth analysis of existing infrastructure to pinpoint bottlenecks, data silos, and hardware inefficiencies."
      },
      {
        name: "Ecosystem Blueprint",
        desc: "Architecting a custom hardware and software configuration engineered for your spatial and thermal constraints."
      },
      {
        name: "Performance Projections",
        desc: "Establishing rigorous performance baselines and measurable KPIs to guarantee a clear operational ROI."
      },
      {
        name: "Risk Mitigation",
        desc: "Comprehensive risk assessments integrating watchdog circuitry, power redundancy, and fail-safe protocols."
      }
    ]
  },
  {
    id: "sourcing",
    number: "02",
    title: "Strategic Sourcing",
    tagline: "Direct OEM relationships eliminating intermediary markups and guaranteeing authentic tier-1 components",
    icon: Layers,
    items: [
      {
        title: "Direct OEM Relationships",
        desc: "Bypass local brokers and distributors to secure authentic hardware and direct-from-factory pricing from premier technology hubs."
      },
      {
        title: "Component-Level Vetting",
        desc: "Evaluate underlying silicon, sensor accuracy, industrial PCB substrates, and chassis build quality to ensure enterprise reliability."
      },
      {
        title: "Cost-to-Performance Optimisation",
        desc: "Eliminate multi-tiered middleman margins to maximize budget efficiency and deliver advanced computing infrastructure."
      },
      {
        title: "Scalable Procurement",
        desc: "Adapt dynamically to operational volume, seamlessly scaling from single localized prototypes to multi-site enterprise rollouts."
      }
    ]
  },
  {
    id: "integration",
    number: "03",
    title: "Custom Integration & Packaging",
    tagline: "Synchronising physical hardware with your operational software stacks before field dispatch",
    icon: Wrench,
    items: [
      {
        title: "Hardware-Software Synchronisation",
        desc: "Bridge physical computing hardware and enterprise software via custom data pipelines, API integrations, and industrial protocols."
      },
      {
        title: "System Pre-Configuration",
        desc: "Execute all technical groundwork—including firmware flashing, sensor calibration, and network staging—prior to site delivery."
      },
      {
        title: "Bespoke Assembly",
        desc: "Package procured technology into modular, ready-to-deploy units designed to physically and aesthetically fit your enclosures."
      },
      {
        title: "Interface Localisation",
        desc: "Customise dashboards, control interfaces, and telemetry visualizations to match your team's specific daily workflows."
      }
    ]
  },
  {
    id: "deployment",
    number: "04",
    title: "Implementation & Deployment",
    tagline: "Field-first execution ensuring seamless cutover without interrupting core business operations",
    icon: CheckCircle2,
    steps: [
      {
        name: "Transition Planning",
        desc: "Carefully map the migration path, protecting existing infrastructure against data loss and scheduling deployment to prevent disruption."
      },
      {
        name: "Field-First Installation",
        desc: "Our dedicated technical team personally manages on-site physical installation, cabling, mounting, and hardware staging."
      },
      {
        name: "Seamless Online Cutover",
        desc: "Bring newly integrated systems online smoothly within your live operational workflow with zero downtime for primary activities."
      },
      {
        name: "Operational Handover",
        desc: "Deliver full operational documentation, system diagnostics, and hands-on staff training to ensure day-one confidence."
      }
    ]
  }
];

const applications = [
  {
    title: "Manufacturing & Industrial Operations",
    category: "Industrial IoT & Automation",
    image: "/catalog/about/app_manufacturing.jpeg",
    icon: Factory,
    points: [
      "Integrating precise power-monitoring modules and microcontrollers to track real-time energy consumption and machine health.",
      "Deploying custom sensor arrays to predict maintenance needs and reduce operational downtime on the factory floor.",
      "Developing bespoke API pipelines to connect isolated legacy hardware to centralized, modern monitoring dashboards."
    ]
  },
  {
    title: "Healthcare & Clinical Facilities",
    category: "Medical Diagnostics & Storage",
    image: "/catalog/about/app_healthcare.jpeg",
    icon: HeartPulse,
    points: [
      "Configuring localized, highly secure environmental monitoring systems for sensitive storage, such as medical chillers and cleanrooms.",
      "Implementing automated alert frameworks that trigger instantly upon temperature or environmental deviations for regulatory compliance.",
      "Integrating edge-computing hardware to process sensitive operational data locally, eliminating reliance on vulnerable external networks."
    ]
  },
  {
    title: "Warehousing & Logistics",
    category: "Supply Chain & Tracking",
    image: "/catalog/about/app_logistics.jpeg",
    icon: Truck,
    points: [
      "Engineering integrated tracking architectures that synchronize external sensors directly with your existing warehouse management software.",
      "Packaging custom hardware-software bridges to eliminate inventory blind spots from the receiving dock to final dispatch.",
      "Automating bulk data collection across large spatial environments to streamline workflow efficiency and eliminate manual scanning errors."
    ]
  },
  {
    title: "Commercial Real Estate & Smart Facilities",
    category: "Smart Buildings & Occupancy",
    image: "/catalog/about/app_facilities.jpeg",
    icon: Building2,
    points: [
      "Deploying high-precision mmWave radar sensors and localized AI processing to automate lighting and climate control based on real-time room occupancy.",
      "Unifying fragmented access, security, and environmental controls into a single, cohesive smart-building framework.",
      "Incorporating advanced visual interfaces—such as transparent display technology—to modernize interactive facility data delivery."
    ]
  }
];

const leadership = [
  {
    name: "Teo Shean Jiun",
    role: "Technical Director",
    email: "sheanjiun.teo@quartzar.com.my",
    qr: "/catalog/about/qr_teo.png",
    whatsappLink: "https://wa.me/60126818462",
    focus: "Hardware architecture, embedded systems engineering, component-level vetting & technical delivery."
  },
  {
    name: "Sam Jun Hong",
    role: "Financial Director",
    email: "junhong.sam@quartzar.com.my",
    qr: "/catalog/about/qr_sam.jpeg",
    whatsappLink: "https://wa.me/60123965193",
    focus: "Strategic OEM procurement, financial planning, supply chain scalability & cost-to-performance optimisation."
  }
];

export default function About() {
  const [activeTab, setActiveTab] = useState("design");

  const currentPillar = pillars.find((p) => p.id === activeTab) || pillars[0];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="navy-bg text-white pt-24 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-texture-dark opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fade} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-300 text-xs font-semibold tracking-wider uppercase">
              Technology & Automation Solutions
            </span>
            <h1 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-[1.15]">
              Bridging Global Manufacturing with Localised Industrial Needs
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
              Quartzar is a specialised solutions provider and end-to-end integrator. We transform high-quality, internationally sourced industrial computing components into seamless, ready-to-deploy systems built for Malaysian and regional enterprises.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/catalog" className="btn-cta h-12 px-6 rounded-md font-semibold text-sm inline-flex items-center gap-2">
                Explore Hardware Catalog <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="h-12 px-6 rounded-md font-semibold text-sm border border-slate-400 hover:border-white text-white hover:bg-white/10 transition-colors inline-flex items-center gap-2">
                Talk to Our Directors
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Mission & Exploded Architecture Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <motion.div {...fade} className="lg:col-span-6 space-y-6">
            <p className="eyebrow text-[hsl(var(--accent))]">About Our Company</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight leading-tight">
              An End-to-End Integrator Built to Keep You Competitive
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed text-base">
              <p>
                The rapid pace of global innovation is constantly introducing new technologies, and businesses that fail to adapt risk falling behind.
              </p>
              <p>
                That is why Quartzar operates as an <strong>end-to-end integrator</strong>. Rather than acting as a passive box-mover, we bridge the gap between world-class component manufacturing and client-specific operational demands.
              </p>
              <p>
                From custom carrier boards and fanless thermal enclosures to onboard power monitoring and telemetry pipelines, we equip our clients with durable, vetted technology so they can maintain their competitive edge.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="block text-2xl font-display font-extrabold text-[hsl(var(--primary))]">0 Middlemen</span>
                <span className="text-xs text-slate-500 mt-1 block">Direct-from-factory pricing with full engineering accountability</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="block text-2xl font-display font-extrabold text-[hsl(var(--primary))]">100% Tested</span>
                <span className="text-xs text-slate-500 mt-1 block">Pre-configured, firmware-calibrated & bench-tested prior to dispatch</span>
              </div>
            </div>
          </motion.div>

          <motion.div {...fade} transition={{ duration: 0.6, delay: 0.15 }} className="lg:col-span-6">
            <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden border border-slate-800">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[hsl(var(--accent))]">Hardware Architecture</span>
                  <h3 className="font-display font-bold text-lg text-white">Rugged Fanless System Anatomy</h3>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-400 border border-slate-700">Exploded View</span>
              </div>

              <div className="relative rounded-xl overflow-hidden bg-slate-950/80 border border-slate-800/80 flex items-center justify-center p-4">
                <img
                  src="/catalog/about/exploded_architecture.jpeg"
                  alt="Quartzar Industrial Hardware Architecture Exploded View"
                  className="w-full max-h-[460px] object-contain rounded-lg hover:scale-[1.02] transition-transform duration-500"
                />
              </div>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-2 rounded bg-slate-800/60 border border-slate-700/50">
                  <p className="text-[11px] font-mono text-slate-400">Processor</p>
                  <p className="text-xs font-semibold text-white mt-0.5">Tiger Lake / Ultra SoC</p>
                </div>
                <div className="p-2 rounded bg-slate-800/60 border border-slate-700/50">
                  <p className="text-[11px] font-mono text-slate-400">Power Bank</p>
                  <p className="text-xs font-semibold text-white mt-0.5">12x Supercapacitor</p>
                </div>
                <div className="p-2 rounded bg-slate-800/60 border border-slate-700/50">
                  <p className="text-[11px] font-mono text-slate-400">Reliability</p>
                  <p className="text-xs font-semibold text-white mt-0.5">Hardware Watchdog</p>
                </div>
                <div className="p-2 rounded bg-slate-800/60 border border-slate-700/50">
                  <p className="text-[11px] font-mono text-slate-400">Chassis</p>
                  <p className="text-xs font-semibold text-white mt-0.5">Aluminium Heatsink</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4-Pillar Operating Framework */}
      <section className="bg-slate-50 border-y border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="eyebrow text-[hsl(var(--accent))]">Company Overview</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
              Our 4-Stage Operating Framework
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              From the initial system diagnostic to long-term operational handover, every phase is engineered to eliminate risk, maintain budget efficiency, and minimize deployment shock.
            </p>

            {/* Tab Controls */}
            <div className="mt-8 flex flex-wrap justify-center gap-2 p-1.5 bg-white border border-slate-200 rounded-xl max-w-2xl mx-auto shadow-sm">
              {pillars.map((p) => {
                const Icon = p.icon;
                const active = activeTab === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActiveTab(p.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                      active
                        ? "bg-[hsl(var(--navy))] text-white shadow"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <Icon size={16} />
                    <span>{p.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Pillar Card */}
          <motion.div
            key={currentPillar.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <span className="w-14 h-14 rounded-xl bg-sky-50 text-[hsl(var(--primary))] grid place-items-center font-display font-extrabold text-2xl">
                  {currentPillar.number}
                </span>
                <div>
                  <h3 className="text-2xl font-display font-bold text-slate-900">{currentPillar.title}</h3>
                  <p className="text-slate-500 text-sm mt-0.5">{currentPillar.tagline}</p>
                </div>
              </div>
            </div>

            {/* If Pillar has sequential steps (Design or Deployment) */}
            {currentPillar.steps && (
              <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {currentPillar.steps.map((st, i) => (
                  <div key={st.name} className="p-5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-mono font-bold text-[hsl(var(--accent))] uppercase tracking-wider">
                        Phase 0{i + 1}
                      </span>
                      <h4 className="font-display font-semibold text-slate-900 mt-2 text-base">{st.name}</h4>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">{st.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* If Pillar has 4 items (Sourcing or Integration) */}
            {currentPillar.items && (
              <div className="mt-8 grid sm:grid-cols-2 gap-6">
                {currentPillar.items.map((it) => (
                  <div key={it.title} className="p-6 rounded-xl bg-slate-50 border border-slate-100 flex gap-4 items-start">
                    <span className="w-9 h-9 rounded-lg bg-[hsl(var(--primary))] text-white grid place-items-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 size={18} />
                    </span>
                    <div>
                      <h4 className="font-display font-bold text-slate-900 text-lg">{it.title}</h4>
                      <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">{it.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Fields of Application Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <p className="eyebrow text-[hsl(var(--accent))]">Field of Application</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
              Real-World Engineering Deployments
            </h2>
          </div>
          <Link to="/industries" className="flex items-center gap-1.5 text-sm font-semibold text-[hsl(var(--primary))] link-underline">
            View all industry sectors <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {applications.map((app, i) => {
            const Icon = app.icon;
            return (
              <motion.div
                key={app.title}
                {...fade}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col card-hover"
              >
                <div className="relative h-56 w-full bg-slate-900 overflow-hidden">
                  <img src={app.image} alt={app.title} className="w-full h-full object-cover object-center opacity-85 group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2.5">
                      <span className="w-9 h-9 rounded-lg bg-[hsl(var(--accent))] text-white grid place-items-center">
                        <Icon size={18} />
                      </span>
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-300">{app.category}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-xl text-slate-900">{app.title}</h3>
                    <p className="eyebrow text-slate-400 mt-4 mb-3">Our Solutions:</p>
                    <ul className="space-y-2.5">
                      {app.points.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))] mt-2 flex-shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Leadership & Executive Contacts */}
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-texture-dark opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="eyebrow text-[hsl(var(--accent))]">Leadership</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">Talk Directly with Our Directors</h2>
            <p className="mt-3 text-slate-300 text-sm">
              We provide direct access to technical and executive decision-makers for all custom architecture consultations, OEM sourcing, and quotation inquiries.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {leadership.map((leader) => (
              <div
                key={leader.name}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 hover:bg-white/[0.08] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-display font-bold text-white">{leader.name}</h3>
                      <p className="text-[hsl(var(--accent))] text-sm font-semibold tracking-wide mt-1">{leader.role}</p>
                    </div>
                    {leader.qr && (
                      <div className="bg-white p-2 rounded-lg shadow-md flex-shrink-0 text-center">
                        <img src={leader.qr} alt={`Chat with ${leader.name}`} className="w-16 h-16 object-contain" />
                        <span className="text-[9px] font-mono text-slate-700 block mt-1">Scan WhatsApp</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 mt-4 leading-relaxed">{leader.focus}</p>
                </div>

                <div className="mt-6 pt-5 border-t border-white/10 space-y-2.5">
                  <a
                    href={`mailto:${leader.email}`}
                    className="flex items-center gap-2.5 text-sm text-slate-300 hover:text-white transition-colors"
                  >
                    <Mail size={16} className="text-[hsl(var(--accent))]" />
                    <span className="font-mono text-xs">{leader.email}</span>
                  </a>
                  <a
                    href={leader.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-sm text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                  >
                    <MessageCircle size={16} />
                    <span>Instant WhatsApp Chat</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Trust Signoff */}
          <div className="mt-14 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <p className="text-white font-semibold">Quartzar Technology & Automation Solutions</p>
              <p className="text-xs text-slate-400 mt-1">Local Malaysia office • Global OEM manufacturing partnerships • International inquiries welcome</p>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/contact" className="btn-cta h-11 px-5 rounded-md font-semibold text-xs inline-flex items-center gap-2">
                Send Inquiry <ArrowRight size={14} />
              </Link>
              <Link to="/catalog" className="h-11 px-5 rounded-md font-semibold text-xs border border-white/20 hover:border-white text-white hover:bg-white/10 transition-colors inline-flex items-center gap-2">
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
