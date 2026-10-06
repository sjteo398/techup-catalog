import React from "react";
import { MessageCircle } from "lucide-react";

// Placeholder WhatsApp number — swap to real Malaysia sales number later.
const WHATSAPP_NUMBER = "60300000000";

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Quartzar, I'd like a quotation / product info.")}`;
  return (
    <a
      data-testid="whatsapp-button"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 pl-3 pr-4 h-12 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all"
      title="Chat with sales on WhatsApp"
    >
      <MessageCircle size={22} />
      <span className="text-sm font-semibold hidden sm:inline">Chat Sales</span>
    </a>
  );
}
