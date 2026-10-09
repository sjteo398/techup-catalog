import React, { useState } from "react";
import { MapPin, Mail, Phone, MessageCircle, Send, CheckCircle2 } from "lucide-react";
import Layout from "@/components/layout/Layout";
import api from "@/lib/apiClient";
import { toast } from "sonner";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { toast.error("Please fill name, email and message."); return; }
    setBusy(true);
    try {
      await api.post("/contact", form);
      setSent(true);
      toast.success("Message sent — we'll be in touch shortly.");
    } catch { toast.error("Something went wrong. Please try again."); }
    finally { setBusy(false); }
  };

  return (
    <Layout>
      <section className="navy-bg text-white pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 grid-texture-dark opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow text-[hsl(var(--accent))]">Contact</p>
          <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight">Talk to our team</h1>
          <p className="mt-4 text-slate-300 max-w-2xl">Local Malaysia office — international enquiries welcome. For product quotes, use the RFQ list; for anything else, drop us a message.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-3 gap-10">
        <div className="space-y-6">
          {[[MapPin, "Office", "Kuala Lumpur, Malaysia (placeholder address)"], [Mail, "Email", "sales@quartzar.example"], [Phone, "Phone", "+60 12-681 8462"], [MessageCircle, "WhatsApp", "Tap the green button for instant chat"]].map(([Icon, k, v]) => (
            <div key={k} className="flex items-start gap-3">
              <span className="grid place-items-center w-11 h-11 rounded-lg bg-slate-100 text-[hsl(var(--primary))] flex-shrink-0"><Icon size={20} /></span>
              <div><p className="eyebrow text-slate-400">{k}</p><p className="mt-1 text-slate-800 font-medium text-sm">{v}</p></div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2">
          {sent ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
              <CheckCircle2 size={56} className="mx-auto text-[hsl(var(--primary))]" />
              <h3 className="mt-4 font-display font-bold text-2xl">Message received</h3>
              <p className="mt-2 text-slate-600">Thank you for reaching out. Our team will respond as soon as possible.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 grid sm:grid-cols-2 gap-4" data-testid="contact-form">
              {[["name", "Name *", "text"], ["email", "Email *", "email"], ["company", "Company", "text"], ["phone", "Phone", "text"], ["subject", "Subject", "text"]].map(([k, l, t]) => (
                <div key={k} className={k === "subject" ? "sm:col-span-2" : ""}>
                  <label className="eyebrow text-slate-500">{l}</label>
                  <input data-testid={`contact-${k}`} type={t} value={form[k]} onChange={set(k)} className="mt-1 w-full h-11 px-3 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none" />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className="eyebrow text-slate-500">Message *</label>
                <textarea data-testid="contact-message" value={form.message} onChange={set("message")} rows={5} className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none" />
              </div>
              <button data-testid="contact-submit" disabled={busy} className="sm:col-span-2 flex items-center justify-center gap-2 h-12 btn-cta rounded-md font-semibold disabled:opacity-60">
                <Send size={18} /> {busy ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
}
