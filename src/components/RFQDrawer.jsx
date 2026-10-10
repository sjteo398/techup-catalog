import React, { useState } from "react";
import { X, Trash2, Minus, Plus, FileText, CheckCircle2 } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import api from "@/lib/apiClient";
import { toast } from "sonner";

export default function RFQDrawer() {
  const { rfqOpen, setRfqOpen, rfqItems, updateQty, updateNote, removeRFQ, clearRFQ } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ company: "", contact_name: "", email: "", phone: "", country: "", target_price: "", delivery_location: "", timeline: "", message: "" });

  const setField = (field, maxLen, stripPattern) => (e) => {
    let val = e.target.value;
    if (stripPattern) {
      val = val.replace(stripPattern, "");
    }
    if (maxLen && val.length > maxLen) {
      val = val.slice(0, maxLen);
    }
    setForm((prev) => ({ ...prev, [field]: val }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.company.trim() || !form.contact_name.trim() || !form.email.trim()) {
      toast.error("Please fill in Company, Name, and Email.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      toast.error("Please enter a valid email address (e.g. name@company.com).");
      return;
    }
    setSubmitting(true);
    try {
      await api.post("/rfq", { ...form, items: rfqItems.map((i) => ({ model: i.model, slug: i.slug, quantity: i.quantity, note: i.note })) });
      setDone(true);
      clearRFQ();
      toast.success("RFQ submitted — our team will respond shortly.");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!rfqOpen) return null;

  const fieldsConfig = [
    { key: "company", label: "Company name *", type: "text", max: 100, placeholder: "e.g. Quartzar Solutions Sdn Bhd" },
    { key: "contact_name", label: "Your name *", type: "text", max: 80, strip: /[^a-zA-Z\s\.\-']/g, placeholder: "e.g. Alex Wong" },
    { key: "email", label: "Email *", type: "email", max: 100, placeholder: "e.g. alex@company.com" },
    { key: "phone", label: "Phone", type: "tel", max: 25, strip: /[^\d\+\-\s\(\)]/g, placeholder: "e.g. +60 12-345 6789" },
    { key: "country", label: "Country", type: "text", max: 60, placeholder: "e.g. Malaysia" },
    { key: "delivery_location", label: "Delivery location", type: "text", max: 120, placeholder: "e.g. Penang, Malaysia" },
    { key: "timeline", label: "Required timeline", type: "text", max: 60, placeholder: "e.g. 2–3 weeks / Q3 2026" },
    { key: "target_price", label: "Target price (optional)", type: "text", max: 50, placeholder: "e.g. MYR 15,000" }
  ];

  return (
    <div className="fixed inset-0 z-[60]" data-testid="rfq-drawer">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setRfqOpen(false)} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col fade-up">
        <div className="flex items-center justify-between px-5 h-16 border-b border-slate-200">
          <h3 className="font-display font-bold text-lg flex items-center gap-2"><FileText size={18} className="text-[hsl(var(--accent))]" /> Request for Quote</h3>
          <button data-testid="close-rfq-btn" onClick={() => setRfqOpen(false)} className="w-9 h-9 grid place-items-center rounded hover:bg-slate-100"><X size={18} /></button>
        </div>

        {done ? (
          <div className="flex-1 grid place-items-center p-8 text-center">
            <div>
              <CheckCircle2 size={56} className="mx-auto text-[hsl(var(--primary))]" />
              <h4 className="mt-4 font-display font-bold text-xl">RFQ Submitted</h4>
              <p className="mt-2 text-sm text-slate-600">Thank you. A confirmation has been emailed to our sales team and we'll get back to you shortly.</p>
              <button onClick={() => { setDone(false); setShowForm(false); setRfqOpen(false); }} className="mt-6 px-5 h-11 rounded-md btn-cta font-semibold text-sm">Done</button>
            </div>
          </div>
        ) : rfqItems.length === 0 ? (
          <div className="flex-1 grid place-items-center p-8 text-center text-slate-500">
            <div>
              <FileText size={40} className="mx-auto text-slate-300" />
              <p className="mt-3 text-sm">Your RFQ list is empty.<br/>Browse the catalog and click <b>Add to RFQ</b> on any product.</p>
            </div>
          </div>
        ) : !showForm ? (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {rfqItems.map((i) => (
                <div key={i.slug} data-testid={`rfq-item-${i.slug}`} className="flex gap-3 p-3 rounded-lg border border-slate-200">
                  <img src={i.image} alt={i.model} className="w-16 h-16 object-cover rounded bg-slate-50 border border-slate-100" />
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-sm font-semibold text-slate-900">{i.model}</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <button onClick={() => updateQty(i.slug, i.quantity - 1)} className="w-7 h-7 grid place-items-center rounded border border-slate-200 hover:bg-slate-50"><Minus size={13} /></button>
                      <input data-testid={`rfq-qty-${i.slug}`} type="number" value={i.quantity} onChange={(e) => updateQty(i.slug, parseInt(e.target.value) || 1)} className="w-14 h-7 text-center text-sm border border-slate-200 rounded font-mono" />
                      <button onClick={() => updateQty(i.slug, i.quantity + 1)} className="w-7 h-7 grid place-items-center rounded border border-slate-200 hover:bg-slate-50"><Plus size={13} /></button>
                      <button onClick={() => removeRFQ(i.slug)} className="ml-auto w-7 h-7 grid place-items-center rounded text-red-500 hover:bg-red-50"><Trash2 size={14} /></button>
                    </div>
                    <input value={i.note} maxLength={200} onChange={(e) => updateNote(i.slug, e.target.value)} placeholder="Note (config, memory, storage…)" className="mt-2 w-full h-8 px-2 text-xs border border-slate-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-slate-200">
              <button data-testid="rfq-continue-btn" onClick={() => setShowForm(true)} className="w-full h-12 rounded-md btn-cta font-semibold">Continue to Enquiry Details</button>
            </div>
          </>
        ) : (
          <form onSubmit={submit} className="flex-1 overflow-y-auto p-4 space-y-3">
            <p className="text-xs text-slate-500 mono">{rfqItems.length} line item(s) attached to this request.</p>
            {fieldsConfig.map(({ key, label, type, max, strip, placeholder }) => (
              <div key={key}>
                <div className="flex justify-between items-center">
                  <label className="eyebrow text-slate-500">{label}</label>
                  <span className="text-[10px] text-slate-400 font-mono">{form[key]?.length || 0}/{max}</span>
                </div>
                <input
                  data-testid={`rfq-field-${key}`}
                  type={type}
                  value={form[key]}
                  maxLength={max}
                  placeholder={placeholder}
                  onChange={setField(key, max, strip)}
                  className="mt-1 w-full h-10 px-3 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none"
                />
              </div>
            ))}
            <div>
              <div className="flex justify-between items-center">
                <label className="eyebrow text-slate-500">Message</label>
                <span className="text-[10px] text-slate-400 font-mono">{form.message.length}/1000</span>
              </div>
              <textarea
                data-testid="rfq-field-message"
                value={form.message}
                maxLength={1000}
                placeholder="Include specific configuration, certifications, or custom IO requirements…"
                onChange={setField("message", 1000)}
                rows={3}
                className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button type="button" onClick={() => setShowForm(false)} className="h-12 px-4 rounded-md border border-slate-300 font-semibold text-sm">Back</button>
              <button data-testid="rfq-submit-btn" disabled={submitting} type="submit" className="flex-1 h-12 rounded-md btn-cta font-semibold disabled:opacity-60">{submitting ? "Submitting…" : "Submit RFQ"}</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
