import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import RFQDrawer from "@/components/RFQDrawer";
import CompareBar from "@/components/CompareBar";

export default function Layout({ children, bare }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">{children}</main>
      {!bare && <Footer />}
      <WhatsAppButton />
      <RFQDrawer />
      <CompareBar />
    </div>
  );
}
