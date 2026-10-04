import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { StoreProvider } from "@/context/StoreContext";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Catalog from "@/pages/Catalog";
import ProductDetail from "@/pages/ProductDetail";
import Industries from "@/pages/Industries";
import SectorPage from "@/pages/SectorPage";
import HelpMeChoose from "@/pages/HelpMeChoose";
import OEM from "@/pages/OEM";
import Sourcing from "@/pages/Sourcing";
import Resources from "@/pages/Resources";
import Contact from "@/pages/Contact";
import Compare from "@/pages/Compare";
import NotFound from "@/pages/NotFound";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/category/:slug" element={<Catalog />} />
      <Route path="/product/:slug" element={<ProductDetail />} />
      <Route path="/industries" element={<Industries />} />
      <Route path="/sector/:slug" element={<SectorPage />} />
      <Route path="/help-me-choose" element={<HelpMeChoose />} />
      <Route path="/oem" element={<OEM />} />
      <Route path="/sourcing" element={<Sourcing />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/compare" element={<Compare />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <AppRouter />
        <Toaster position="top-center" richColors />
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
