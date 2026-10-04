import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const StoreContext = createContext(null);
export const useStore = () => useContext(StoreContext);

const load = (k, d) => {
  try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; }
};

export const StoreProvider = ({ children }) => {
  const [rfqItems, setRfqItems] = useState(() => load("techup_rfq", []));
  const [compare, setCompare] = useState(() => load("techup_compare", []));
  const [rfqOpen, setRfqOpen] = useState(false);

  useEffect(() => { localStorage.setItem("techup_rfq", JSON.stringify(rfqItems)); }, [rfqItems]);
  useEffect(() => { localStorage.setItem("techup_compare", JSON.stringify(compare)); }, [compare]);

  const addToRFQ = useCallback((product, qty = 1) => {
    setRfqItems((prev) => {
      const found = prev.find((i) => i.slug === product.slug);
      if (found) return prev.map((i) => i.slug === product.slug ? { ...i, quantity: i.quantity + qty } : i);
      return [...prev, { slug: product.slug, model: product.model, image: product.image, quantity: qty, note: "" }];
    });
    setRfqOpen(true);
  }, []);

  const updateQty = useCallback((slug, quantity) => {
    setRfqItems((prev) => prev.map((i) => i.slug === slug ? { ...i, quantity: Math.max(1, quantity) } : i));
  }, []);
  const updateNote = useCallback((slug, note) => {
    setRfqItems((prev) => prev.map((i) => i.slug === slug ? { ...i, note } : i));
  }, []);
  const removeRFQ = useCallback((slug) => setRfqItems((prev) => prev.filter((i) => i.slug !== slug)), []);
  const clearRFQ = useCallback(() => setRfqItems([]), []);

  const toggleCompare = useCallback((product) => {
    setCompare((prev) => {
      if (prev.find((p) => p.slug === product.slug)) return prev.filter((p) => p.slug !== product.slug);
      if (prev.length >= 4) return prev;
      return [...prev, { slug: product.slug, model: product.model, image: product.image }];
    });
  }, []);
  const inCompare = useCallback((slug) => compare.some((p) => p.slug === slug), [compare]);
  const clearCompare = useCallback(() => setCompare([]), []);

  const rfqCount = rfqItems.reduce((a, b) => a + b.quantity, 0);

  return (
    <StoreContext.Provider value={{
      rfqItems, rfqCount, addToRFQ, updateQty, updateNote, removeRFQ, clearRFQ,
      rfqOpen, setRfqOpen, compare, toggleCompare, inCompare, clearCompare,
    }}>
      {children}
    </StoreContext.Provider>
  );
};
