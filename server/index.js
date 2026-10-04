import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Serve static catalog files
app.use("/catalog", express.static(path.join(__dirname, "../public/catalog")));

// Helper to load JSON safely
const loadJson = (filePath, fallback = []) => {
  try {
    const fullPath = path.join(__dirname, "data", filePath);
    if (fs.existsSync(fullPath)) {
      return JSON.parse(fs.readFileSync(fullPath, "utf-8"));
    }
  } catch (err) {
    console.error(`Error loading JSON ${filePath}:`, err);
  }
  return fallback;
};

// Helper to save JSON safely
const saveJson = (filePath, data) => {
  try {
    const fullPath = path.join(__dirname, "data", filePath);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error(`Error saving JSON ${filePath}:`, err);
  }
};

// Data state
let categories = loadJson("categories.json", []);
let products = loadJson("products.json", []);
let facets = loadJson("products_facets.json", { form_factor: [], cpu_platform: [], cooling: [] });
let sectors = loadJson("sectors.json", []);
let resources = loadJson("resources.json", []);

let rfqs = loadJson("rfqs.json", [
  {
    id: "RFQ-1001",
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    status: "pending",
    contact: { name: "Alex Tan", company: "AeroTech Solutions", email: "alex@aerotech.example", phone: "+60 12-345 6789" },
    items: [
      { slug: "ad600ca", model: "AD600CA", image: "/catalog/products/motherboard.jpg", quantity: 5, note: "Need extended temperature range version." }
    ],
    notes: "Urgent quote requested for Q4 project deployment."
  }
]);

let contacts = loadJson("contacts.json", [
  {
    id: "CNT-2001",
    created_at: new Date(Date.now() - 86400000).toISOString(),
    name: "Sarah Lee",
    company: "Smart Factory Automation",
    email: "sarah@smartfactory.example",
    phone: "+60 16-987 6543",
    message: "Interested in custom OEM branding for 500 units of Embedded Box PCs."
  }
]);

let currentUser = {
  id: "usr_admin",
  name: "TechUp Admin",
  email: "admin@techup.example",
  role: "admin"
};

// --- PUBLIC API ENDPOINTS ---

app.get("/api/categories", (req, res) => {
  res.json(categories);
});

app.get("/api/products/facets", (req, res) => {
  res.json(facets);
});

app.get("/api/products", (req, res) => {
  let result = [...products];
  const { category, featured, sector, search } = req.query;

  if (category) {
    result = result.filter((p) => p.category === category || p.category_slug === category);
  }
  if (featured === "true" || featured === true) {
    result = result.filter((p) => p.featured === true || p.featured === "true");
  }
  if (sector) {
    result = result.filter((p) => Array.isArray(p.sectors) && p.sectors.includes(sector));
  }
  if (search) {
    const q = search.toLowerCase();
    result = result.filter((p) =>
      `${p.model} ${p.title} ${p.cpu_platform} ${p.form_factor} ${p.applications}`.toLowerCase().includes(q)
    );
  }

  res.json(result);
});

app.get("/api/products/:slug", (req, res) => {
  const { slug } = req.params;
  const detail = loadJson(`products_detail/${slug}.json`, null);
  if (detail) {
    return res.json(detail);
  }
  const p = products.find((item) => item.slug === slug);
  if (p) {
    return res.json(p);
  }
  res.status(404).json({ message: "Product not found" });
});

app.post("/api/products/compare", (req, res) => {
  const slugs = Array.isArray(req.body) ? req.body : req.body.slugs || [];
  const result = slugs.map((slug) => {
    const detail = loadJson(`products_detail/${slug}.json`, null);
    if (detail) return detail;
    return products.find((p) => p.slug === slug) || { slug, model: slug };
  });
  res.json(result);
});

app.get("/api/sectors", (req, res) => {
  res.json(sectors);
});

app.get("/api/sectors/:slug", (req, res) => {
  const { slug } = req.params;
  const detail = loadJson(`sectors_detail/${slug}.json`, null);
  if (detail) {
    return res.json(detail);
  }
  const sec = sectors.find((s) => s.slug === slug);
  if (sec) {
    return res.json(sec);
  }
  res.status(404).json({ message: "Sector not found" });
});

app.get("/api/resources", (req, res) => {
  res.json(resources);
});

app.post("/api/rfq", (req, res) => {
  const { items, contact, notes } = req.body;
  const newRfq = {
    id: `RFQ-${Date.now().toString().slice(-6)}`,
    created_at: new Date().toISOString(),
    status: "pending",
    contact: contact || {},
    items: items || [],
    notes: notes || ""
  };
  rfqs.unshift(newRfq);
  saveJson("rfqs.json", rfqs);
  res.json({ success: true, id: newRfq.id, message: "Quote request submitted successfully!" });
});

app.post("/api/contact", (req, res) => {
  const form = req.body;
  const newContact = {
    id: `CNT-${Date.now().toString().slice(-6)}`,
    created_at: new Date().toISOString(),
    ...form
  };
  contacts.unshift(newContact);
  saveJson("contacts.json", contacts);
  res.json({ success: true, message: "Message submitted successfully!" });
});

app.post("/api/wizard/recommend", (req, res) => {
  const { sector, environment, priority } = req.body;
  let matches = [...products];

  if (sector) {
    matches = matches.filter((p) => Array.isArray(p.sectors) && p.sectors.includes(sector));
  }
  if (matches.length < 3) {
    matches = [...products];
  }
  res.json(matches.slice(0, 4));
});

// --- AUTH ENDPOINTS ---

app.get("/api/auth/me", (req, res) => {
  if (currentUser) {
    res.json(currentUser);
  } else {
    res.status(401).json({ message: "Unauthenticated" });
  }
});

app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;
  currentUser = {
    id: "usr_admin",
    name: username || "TechUp Admin",
    email: "admin@techup.example",
    role: "admin"
  };
  res.json(currentUser);
});

app.post("/api/auth/session", (req, res) => {
  currentUser = {
    id: "usr_admin",
    name: "TechUp Admin",
    email: "admin@techup.example",
    role: "admin"
  };
  res.json(currentUser);
});

app.post("/api/auth/logout", (req, res) => {
  currentUser = null;
  res.json({ success: true });
});

// --- ADMIN ENDPOINTS ---

app.get("/api/admin/stats", (req, res) => {
  res.json({
    totalProducts: products.length,
    totalRfqs: rfqs.length,
    totalContacts: contacts.length
  });
});

app.get("/api/admin/rfqs", (req, res) => {
  res.json(rfqs);
});

app.patch("/api/admin/rfqs/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const item = rfqs.find((r) => r.id === id);
  if (item) {
    item.status = status;
    saveJson("rfqs.json", rfqs);
    return res.json(item);
  }
  res.status(404).json({ message: "RFQ not found" });
});

app.get("/api/admin/contacts", (req, res) => {
  res.json(contacts);
});

app.post("/api/admin/products", (req, res) => {
  const p = req.body;
  const slug = p.slug || p.model.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const newProd = { ...p, slug };
  products.unshift(newProd);
  saveJson("products.json", products);
  res.json(newProd);
});

app.put("/api/admin/products/:slug", (req, res) => {
  const { slug } = req.params;
  const updated = req.body;
  const idx = products.findIndex((p) => p.slug === slug);
  if (idx !== -1) {
    products[idx] = { ...products[idx], ...updated };
    saveJson("products.json", products);
    return res.json(products[idx]);
  }
  res.status(404).json({ message: "Product not found" });
});

app.delete("/api/admin/products/:slug", (req, res) => {
  const { slug } = req.params;
  products = products.filter((p) => p.slug !== slug);
  saveJson("products.json", products);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
