import React from "react";
import { Link } from "react-router-dom";
import { Cpu, MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="navy-bg text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <span className="grid place-items-center w-9 h-9 rounded bg-[hsl(var(--primary))] text-white"><Cpu size={18} /></span>
              <span className="font-bold text-2xl text-white" style={{ fontFamily: '"Times New Roman", Times, serif' }}>Quartzar</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed max-w-sm text-slate-400">
              Malaysian-registered industrial computing brand. Local accountability, backed by vetted OEM/ODM manufacturing scale across Asia.
            </p>
            <div className="mt-5 space-y-2 text-sm">
              <p className="flex items-center gap-2"><MapPin size={15} className="text-[hsl(var(--accent))]" /> Kuala Lumpur, Malaysia</p>
              <p className="flex items-center gap-2"><Mail size={15} className="text-[hsl(var(--accent))]" /> sjteo@quartzar.com.my</p>
              <p className="flex items-center gap-2"><Phone size={15} className="text-[hsl(var(--accent))]" /> +60 12-396 5193</p>
            </div>
          </div>
          <div>
            <h4 className="text-white font-sub font-semibold text-sm mb-3">Products</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/category/motherboards" className="hover:text-white">Motherboards</Link></li>
              <li><Link to="/category/embedded-box-pc" className="hover:text-white">Box PCs</Link></li>
              <li><Link to="/category/panel-pc" className="hover:text-white">Panel PCs</Link></li>
              <li><Link to="/category/network-security" className="hover:text-white">Network Appliances</Link></li>
              <li><Link to="/catalog" className="hover:text-white">All products →</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-sub font-semibold text-sm mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              {/* <li><Link to="/oem" className="hover:text-white">OEM / ODM</Link></li> */}
              <li><Link to="/sourcing" className="hover:text-white">How It Works</Link></li>
              <li><Link to="/industries" className="hover:text-white">Industries</Link></li>
              <li><Link to="/case-studies" className="hover:text-white">Case Studies</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-sub font-semibold text-sm mb-3">Get in touch</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="hover:text-white">Contact / RFQ</Link></li>
              <li><Link to="/help-me-choose" className="hover:text-white">Help Me Choose</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Quartzar Industrial Computing. All rights reserved.</p>
          <p className="flex gap-4"><span>CE</span><span>FCC</span><span>RoHS</span><span>ISO 9001</span></p>
        </div>
      </div>
    </footer>
  );
}
