import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, FileText, GitCompare, ChevronDown } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import api from "@/lib/apiClient";

const seriesFamilies = [
  {
    family: "Q-Core Series",
    slug: "Q-Core",
    desc: "Industrial Motherboards & SBCs",
    sub: "Ultra • Lite • Bulk • Compact • Xtreme",
    to: "/catalog?family=Q-Core",
  },
  {
    family: "Q-Edge Series",
    slug: "Q-Edge",
    desc: "Rugged Fanless Box PCs",
    sub: "Ultra • Network • Mini • Vision",
    to: "/catalog?family=Q-Edge",
  },
  {
    family: "Q-Micro Series",
    slug: "Q-Micro",
    desc: "Compact NUC & Mini PC Hosts",
    sub: "Network • Versatile • Mini",
    to: "/catalog?family=Q-Micro",
  },
  {
    family: "Q-Net Series",
    slug: "Q-Net",
    desc: "Network Security & Rackmounts",
    sub: "1U Rackmount • Security Appliances",
    to: "/catalog?family=Q-Net",
  },
  {
    family: "Q-Touch Series",
    slug: "Q-Touch",
    desc: "Touch Panels, Terminals & OPS",
    sub: "Xtreme Panels • AIO Terminals • OPS Brain",
    to: "/catalog?family=Q-Touch",
  },
];

const nav = [
  { to: "/catalog", label: "Products", mega: true },
  { to: "/industries", label: "Industries" },
  { to: "/help-me-choose", label: "Help Me Choose" },
  // { to: "/oem", label: "OEM / Custom" },
  { to: "/sourcing", label: "How It Works" },
  { to: "/resources", label: "Resources" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [products, setProducts] = useState([]);
  const { rfqCount, setRfqOpen, compare } = useStore();
  const navigate = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { setOpen(false); setMega(false); }, [loc.pathname]);

  useEffect(() => {
    api.get("/products").then((r) => setProducts(r.data || [])).catch(() => {});
  }, []);

  const getFamilyCount = (slug) => {
    return products.filter((p) => p.series_family === slug || p.series_family?.toLowerCase().replace(/\s+/g, "-") === slug.toLowerCase()).length;
  };

  const totalActiveCount = products.length;

  return (
    <header data-testid="main-navbar" className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm" : "bg-white/70 backdrop-blur-sm"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" data-testid="logo-link" className="flex items-center group">
            <span className="font-bold text-2xl tracking-tight text-[#1E3A8A]" style={{ fontFamily: '"Times New Roman", Times, serif', color: '#1E3A8A' }}>Quartzar</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {nav.map((n) => (
              n.mega ? (
                <div key={n.to} className="relative" onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)}>
                  <button data-testid="nav-products" onClick={() => navigate("/catalog")} className="flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-[hsl(var(--primary))] link-underline py-2">
                    {n.label} <ChevronDown size={14} />
                  </button>
                  {mega && (
                    <div className="absolute left-0 top-full pt-3">
                      <div className="w-[360px] bg-white rounded-xl border border-slate-200 shadow-xl p-3">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 pb-1.5 border-b border-slate-100 mb-1">
                          Product Series Families
                        </div>
                        <div className="space-y-1">
                          {seriesFamilies.map((f) => (
                            <Link key={f.slug} to={f.to} data-testid={`mega-${f.slug.toLowerCase()}`} className="block p-2 rounded-lg hover:bg-slate-50 transition-colors group">
                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-sm text-slate-900 group-hover:text-[hsl(var(--primary))] transition-colors">{f.family}</span>
                                <span className="text-[10px] font-mono text-slate-400 bg-slate-100 group-hover:bg-sky-50 group-hover:text-[hsl(var(--primary))] px-2 py-0.5 rounded-full">{getFamilyCount(f.slug)} models</span>
                              </div>
                              <p className="text-xs text-slate-600 mt-0.5">{f.desc}</p>
                              <p className="text-[11px] text-slate-400 mt-0.5">{f.sub}</p>
                            </Link>
                          ))}
                        </div>
                        <div className="pt-2 mt-2 border-t border-slate-100 px-2 flex justify-between items-center">
                          <Link to="/catalog" className="text-xs font-semibold text-[hsl(var(--primary))] hover:underline">
                            View All {totalActiveCount > 0 ? totalActiveCount : 13} Models →
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link key={n.to} to={n.to} data-testid={`nav-${n.label.toLowerCase().replace(/[^a-z]/g,'-')}`} className="text-sm font-medium text-slate-700 hover:text-[hsl(var(--primary))] link-underline py-2">
                  {n.label}
                </Link>
              )
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/compare" data-testid="compare-nav-btn" className="relative hidden sm:grid place-items-center w-10 h-10 rounded-md hover:bg-slate-100 transition-colors" title="Compare">
              <GitCompare size={18} className="text-slate-700" />
              {compare.length > 0 && <span className="absolute -top-0.5 -right-0.5 text-[10px] bg-[hsl(var(--primary))] text-white rounded-full w-4 h-4 grid place-items-center">{compare.length}</span>}
            </Link>
            <button data-testid="open-rfq-btn" onClick={() => setRfqOpen(true)} className="relative flex items-center gap-2 px-3 sm:px-4 h-10 rounded-md btn-cta text-sm font-semibold">
              <FileText size={16} /> <span className="hidden sm:inline">RFQ</span>
              {rfqCount > 0 && <span className="text-[10px] bg-white text-[hsl(var(--accent))] rounded-full w-5 h-5 grid place-items-center font-bold">{rfqCount}</span>}
            </button>
            <button data-testid="mobile-menu-btn" onClick={() => setOpen(!open)} className="lg:hidden grid place-items-center w-10 h-10 rounded-md hover:bg-slate-100">
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div data-testid="mobile-menu" className="lg:hidden bg-white border-t border-slate-200 max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-3 space-y-1">
            <Link to="/catalog" className="block py-2 font-semibold text-slate-900">All Products (108 Models)</Link>
            {seriesFamilies.map((f) => (
              <Link key={f.slug} to={f.to} className="block py-2 pl-3 text-sm text-slate-600 hover:text-[hsl(var(--primary))]">
                <span className="font-semibold text-slate-800">{f.family}</span> <span className="text-xs text-slate-400">({f.count})</span>
                <span className="block text-xs text-slate-500">{f.desc}</span>
              </Link>
            ))}
            <div className="h-px bg-slate-200 my-2" />
            {nav.filter(n => !n.mega).map((n) => (
              <Link key={n.to} to={n.to} className="block py-2 text-slate-800">{n.label}</Link>
            ))}
            <Link to="/contact" className="block py-2 text-slate-800">Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
}
