import axios from "axios";

// Helper to fetch static json from /data/
const fetchJson = async (url) => {
  const res = await axios.get(url);
  return res.data;
};

const staticApi = {
  get: async (url, config = {}) => {
    // 1. Categories
    if (url === "/categories") {
      const data = await fetchJson("/data/categories.json");
      return { data };
    }

    // 2. Facets
    if (url === "/products/facets") {
      const data = await fetchJson("/data/products_facets.json");
      return { data };
    }

    // 3. Products list with parameters
    if (url === "/products") {
      let data = await fetchJson("/data/products.json");
      const { params = {} } = config;
      if (params.category) {
        data = data.filter(
          (p) =>
            p.category === params.category ||
            p.category_slug === params.category ||
            p.series_code?.toLowerCase() === params.category.toLowerCase() ||
            p.series_family?.toLowerCase().replace(/\s+/g, "-") === params.category.toLowerCase()
        );
      }
      if (params.series) {
        data = data.filter((p) => p.series === params.series || p.series_code?.toLowerCase() === params.series.toLowerCase());
      }
      if (params.series_family) {
        data = data.filter((p) => p.series_family === params.series_family || p.series_family?.toLowerCase().replace(/\s+/g, "-") === params.series_family.toLowerCase());
      }
      if (params.featured === "true" || params.featured === true) {
        data = data.filter((p) => p.featured === true || p.featured === "true");
      }
      if (params.sector) {
        data = data.filter((p) => Array.isArray(p.sectors) && p.sectors.includes(params.sector));
      }
      if (params.search) {
        const q = params.search.toLowerCase();
        data = data.filter((p) =>
          `${p.model} ${p.legacy_model || ""} ${p.series || ""} ${p.series_family || ""} ${p.series_code || ""} ${p.title || ""} ${p.cpu_platform || ""} ${p.form_factor || ""} ${p.applications || ""}`.toLowerCase().includes(q)
        );
      }
      return { data };
    }

    // 4. Product Detail: /products/:slug
    if (url.startsWith("/products/")) {
      const slug = url.replace("/products/", "").toLowerCase();
      try {
        const detail = await fetchJson(`/data/products_detail/${slug}.json`);
        return { data: detail };
      } catch {
        const allProducts = await fetchJson("/data/products.json");
        const found = allProducts.find(
          (p) =>
            p.slug.toLowerCase() === slug ||
            (p.legacy_model && p.legacy_model.toLowerCase().replace(/[^a-z0-9]/g, "") === slug.replace(/[^a-z0-9]/g, "")) ||
            (p.model && p.model.toLowerCase().replace(/[^a-z0-9]/g, "") === slug.replace(/[^a-z0-9]/g, ""))
        );
        if (found) {
          const related = allProducts.filter(
            (p) => (p.series === found.series || p.category === found.category) && p.slug !== found.slug
          ).slice(0, 4);
          return { data: { product: found, related } };
        }
        throw new Error("Product not found");
      }
    }

    // 5. Sectors list
    if (url === "/sectors") {
      const data = await fetchJson("/data/sectors.json");
      return { data };
    }

    // 6. Sector Detail: /sectors/:slug
    if (url.startsWith("/sectors/")) {
      const slug = url.replace("/sectors/", "");
      try {
        const detail = await fetchJson(`/data/sectors_detail/${slug}.json`);
        return { data: detail };
      } catch {
        const allSectors = await fetchJson("/data/sectors.json");
        const found = allSectors.find((s) => s.slug === slug);
        if (found) return { data: found };
        throw new Error("Sector not found");
      }
    }

    // 7. Resources
    if (url === "/resources") {
      const data = await fetchJson("/data/resources.json");
      return { data };
    }

    // Default fallback to direct axios call if needed
    return axios.get(url, config);
  },

  post: async (url, body, config = {}) => {
    // Product comparison endpoint
    if (url === "/products/compare") {
      const slugs = Array.isArray(body) ? body : body?.slugs || [];
      const results = await Promise.all(
        slugs.map(async (slug) => {
          try {
            const detail = await fetchJson(`/data/products_detail/${slug}.json`);
            return detail.product || detail;
          } catch {
            const all = await fetchJson("/data/products.json");
            const found = all.find(
              (p) =>
                p.slug.toLowerCase() === slug.toLowerCase() ||
                (p.legacy_model && p.legacy_model.toLowerCase() === slug.toLowerCase()) ||
                (p.model && p.model.toLowerCase() === slug.toLowerCase())
            );
            return found || { slug, model: slug };
          }
        })
      );
      return { data: results.filter(Boolean) };
    }

    // Wizard recommendation
    if (url === "/wizard/recommend") {
      const { sector } = body || {};
      let matches = await fetchJson("/data/products.json");
      if (sector) {
        matches = matches.filter((p) => Array.isArray(p.sectors) && p.sectors.includes(sector));
      }
      return { data: matches.slice(0, 4) };
    }

    // Form submissions (RFQ / Contact) -> Send to Cloudflare Function /api/rfq or /api/contact
    if (url === "/rfq" || url === "/api/rfq") {
      try {
        const res = await axios.post("/api/rfq", body, config);
        return res;
      } catch {
        // Fallback static success response for local/offline preview
        return { data: { success: true, message: "Quote request submitted successfully!" } };
      }
    }

    if (url === "/contact" || url === "/api/contact") {
      try {
        const res = await axios.post("/api/contact", body, config);
        return res;
      } catch {
        // Fallback static success response for local/offline preview
        return { data: { success: true, message: "Message submitted successfully!" } };
      }
    }

    return axios.post(url, body, config);
  }
};

export default staticApi;
