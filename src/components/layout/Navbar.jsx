import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, FileText, GitCompare, ChevronDown, Cpu } from "lucide-react";
import { useStore } from "@/context/StoreContext";

const productMenu = [
  { slug: "motherboards", name: "Industrial Motherboards" },
  { slug: "embedded-box-pc", name: "Embedded Box PCs" },
  { slug: "mini-pc", name: "NUC Mini PC Hosts" },
  { slug: "network-security", name: "Network Security Appliances" },
  { slug: "panel-pc", name: "Industrial Panel PCs" },
  { slug: "ops-modules", name: "OPS Display Modules" },
  { slug: "all-in-one", name: "All-in-One Computers" },
  { slug: "live-systems", name: "Live Streaming Systems" },
];

const nav = [
  { to: "/catalog", label: "Products", mega: true },
  { to: "/industries", label: "Industries" },
  { to: "/help-me-choose", label: "Help Me Choose" },
  { to: "/oem", label: "OEM / Custom" },
  { to: "/sourcing", label: "How It Works" },
  { to: "/resources", label: "Resources" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const { rfqCount, setRfqOpen, compare } = useStore();
  const navigate = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { setOpen(false); setMega(false); }, [loc.pathname]);

  return (
    <header data-testid="main-navbar" className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm" : "bg-white/70 backdrop-blur-sm"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" data-testid="logo-link" className="flex items-center gap-2 group">
            <span className="grid place-items-center w-9 h-9 rounded bg-[hsl(var(--navy))] text-white group-hover:bg-[hsl(var(--primary))] transition-colors">
              <Cpu size={18} />
            </span>
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
                      <div className="w-[300px] bg-white rounded-lg border border-slate-200 shadow-xl p-2">
                        {productMenu.map((c) => (
                          <Link key={c.slug} to={`/category/${c.slug}`} data-testid={`mega-${c.slug}`} className="block px-3 py-2 rounded-md text-sm text-slate-700 hover:bg-slate-50 hover:text-[hsl(var(--primary))] transition-colors">
                            {c.name}
                          </Link>
                        ))}
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
            <Link to="/catalog" className="block py-2 font-semibold text-slate-900">All Products</Link>
            {productMenu.map((c) => (
              <Link key={c.slug} to={`/category/${c.slug}`} className="block py-2 pl-3 text-sm text-slate-600">{c.name}</Link>
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
