import json
import os
import re
import uuid

# Helper to clean text
def clean(text):
    if not text:
        return ""
    text = str(text).strip()
    text = text.replace("170\ufffd170", "170 × 170")
    text = text.replace("120\ufffd120", "120 × 120")
    text = text.replace("100\ufffd100", "100 × 100")
    text = text.replace("12\ufffd14th", "12–14th")
    text = text.replace("12\ufffd13th", "12–13th")
    text = text.replace("11\ufffd12th", "11–12th")
    text = text.replace("8\ufffd9th", "8–9th")
    text = text.replace("6\ufffd11th", "6–11th")
    text = text.replace("6\ufffd8th", "6–8th")
    text = text.replace("6\ufffd9th", "6–9th")
    text = text.replace("\ufffd", "-")
    return text

def norm_model(m):
    return re.sub(r'[^A-Za-z0-9]', '', m).upper()

# Load source files
with open('public/data/products.json', 'r', encoding='utf-8-sig') as f:
    existing_products = json.load(f)

with open('public/data/series_mapping.json', 'r', encoding='utf-8-sig') as f:
    raw_mappings = json.load(f)

print(f"Loaded {len(existing_products)} existing products, {len(raw_mappings)} mapping items.")

existing_by_norm = {norm_model(p['model']): p for p in existing_products}

alias_map = {
    'TMI800B': 'TM1800B',
    'TMI600B': 'TM600B',
    'QBOX3': 'QBOXI1',
    'QBOXI1': 'QBOX3',
}

CAT_IMAGES = {
    "motherboards": "/catalog/products/motherboard.jpg",
    "embedded-box-pc": "/catalog/products/box_pc.jpg",
    "mini-pc": "/catalog/products/mini_pc.jpg",
    "network-security": "/catalog/products/rackmount.jpg",
    "panel-pc": "/catalog/products/panel_pc.jpg",
    "all-in-one": "/catalog/products/aio.jpg",
    "ops-modules": "/catalog/products/ops.jpg",
    "live-systems": "/catalog/products/live.jpg",
}

# Deduplicate raw mappings by 'new' model
deduped_mappings = []
seen_new = set()
for m in raw_mappings:
    new_model = m['new'].strip()
    if new_model in seen_new:
        continue
    seen_new.add(new_model)
    deduped_mappings.append(m)

print(f"Total unique PDF products: {len(deduped_mappings)}")

def get_sectors(cat, series):
    if "Vision" in series or "vision" in series.lower():
        return ["edge-ai-vision", "manufacturing-automation"]
    if cat == "network-security":
        return ["network-security-appliances", "smart-infrastructure"]
    if cat == "motherboards":
        return ["manufacturing-automation", "digital-signage"]
    if cat == "embedded-box-pc":
        return ["manufacturing-automation", "transportation-ev"]
    if cat == "mini-pc":
        return ["commercial-signage", "smart-retail"]
    if cat == "panel-pc":
        return ["manufacturing-automation", "smart-retail"]
    if cat == "all-in-one":
        return ["smart-retail", "corporate-kiosk"]
    if cat == "ops-modules":
        return ["digital-signage", "education-interactive"]
    return ["manufacturing-automation"]

def get_applications(cat, series, cpu):
    if "Vision" in series:
        return "Machine vision inspection, automated optical inspection (AOI), industrial camera gateway"
    if "Rackmount" in series:
        return "Enterprise firewall, network gateway, UTM security, SD-WAN routing"
    if "Security" in series:
        return "Branch office security gateway, soft router, VPN concentrator, firewall appliance"
    if "Ultra" in series or "High Performance" in series:
        return "High-performance edge compute, AI inferencing, industrial automation"
    if "Lite" in series or "Power-Efficient" in series:
        return "Energy-efficient IoT gateways, light industrial control, unattended commercial terminals"
    if "Bulk" in series or "Storage" in series:
        return "High-capacity network storage (NAS), NVR video surveillance, data logging"
    if "Compact" in series or "Small Size" in series:
        return "AGVs, robotics, embedded machinery, space-constrained industrial controllers"
    if "Xtreme" in series or "Heavy Duty" in series:
        if cat == "panel-pc":
            return "HMI production line interface, cleanroom terminal, outdoor machinery control"
        return "Heavy industrial automation, continuous 24/7 manufacturing plants, substation control"
    if "Network: Cableless" in series:
        return "Cableless rugged industrial computing, roadside units, vibration-prone mobile machinery"
    if "OPS" in series:
        return "Interactive flat panels (IFP), digital whiteboards, conference & classroom displays"
    if "Terminal" in series or cat == "all-in-one":
        return "Front-of-house service counter, self-service kiosk, interactive lobby terminal"
    if cat == "mini-pc":
        return "Digital signage player, edge computing node, compact office / retail host"
    return "Industrial computing, intelligent edge control, embedded automation"

def build_specs(cat, ff, cpu, cool, series, old_model):
    cpu_clean = clean(cpu)
    cool_clean = cool if cool in ["Fanless", "Fan-cooled"] else ("Fanless" if "fanless" in series.lower() or "lite" in series.lower() or "compact" in series.lower() else "Fan-cooled")
    
    if "Ultra" in cpu_clean or "Ryzen AI" in cpu_clean or "7000" in cpu_clean or "DDR5" in cpu_clean or "14th" in cpu_clean:
        mem = "2× DDR5 SO-DIMM, up to 64GB" if "Mini" in ff or "3.5" in ff or "NUC" in ff or "Box" in ff else "2× DDR5 UDIMM, up to 96GB"
    elif "12–" in cpu_clean or "13th" in cpu_clean or "Alder" in cpu_clean or "Tiger" in cpu_clean:
        mem = "2× DDR4/DDR5 SO-DIMM, up to 64GB"
    elif "Celeron" in cpu_clean or "Elkhart" in cpu_clean or "Apollo" in cpu_clean or "Gemini" in cpu_clean:
        mem = "1× DDR4 SO-DIMM, up to 16GB / 32GB"
    else:
        mem = "2× DDR4 SO-DIMM, up to 32GB"

    dim = "—"
    if "Mini-ITX" in ff or "170" in ff:
        dim = "170 × 170 mm"
    elif "3.5" in ff:
        dim = "146 × 102 mm"
    elif "2.5" in ff:
        dim = "100 × 72 mm"
    elif "NANO" in ff:
        dim = "120 × 120 mm"
    elif "Micro-ATX" in ff:
        dim = "244 × 244 mm"
    elif "ATX" in ff:
        dim = "305 × 244 mm"
    elif "PICMG" in ff:
        dim = "338 × 126 mm"
    elif "1U" in ff:
        dim = "430 × 350 × 44 mm"
    elif "Desktop" in ff:
        dim = "215 × 150 × 45 mm"
    elif "OPS" in ff:
        dim = "180 × 119 × 30 mm"
    elif "215" in old_model or "21.5" in ff:
        dim = "536 × 328 × 58 mm"
    elif "156" in old_model or "15.6" in ff:
        dim = "396 × 245 × 52 mm"
    elif "150" in old_model or "15.0" in ff:
        dim = "365 × 285 × 54 mm"
    elif "101" in old_model or "10.1" in ff:
        dim = "265 × 182 × 45 mm"
    elif "Box" in ff:
        dim = "195 × 140 × 55 mm"
    elif "NUC" in ff or "Mini PC" in ff:
        dim = "130 × 125 × 45 mm"

    if cat == "network-security":
        if "1U" in ff:
            io = "6× GbE / 2.5GbE LAN (opt SFP), 2× USB 3.0, 1× RJ45 Console, 1× VGA/HDMI"
        else:
            io = "6× 2.5GbE RJ45 LAN, 1× RJ45 Console, 2× USB 3.0, 1× HDMI"
    elif "Vision" in series:
        io = "4× PoE/GbE LAN (Intel i226), 4× USB 3.2, 2× COM (RS232/485), 16-ch Isolated Digital I/O, HDMI + DP"
    elif cat == "embedded-box-pc":
        io = "HDMI, DP, 4× USB 3.0, 2× USB 2.0, 2–4× LAN, 2–6× COM (RS232/422/485), Audio, DC-IN"
    elif cat == "mini-pc":
        io = "HDMI, DP / Type-C, 4× USB 3.0, 2× 2.5GbE LAN, Audio in/out, DC-IN"
    elif cat == "panel-pc":
        io = "HDMI, 4× USB 3.0, 2× GbE LAN, 2× RS232/485 COM, Audio, 9–36V DC Phoenix terminal"
    elif cat == "ops-modules":
        io = "80-pin JAE OPS connector, 1× HDMI out, 2× USB 3.0, 1× Type-C, 1× GbE LAN, Audio"
    elif cat == "all-in-one":
        io = "HDMI out, 4× USB 3.0, 2× USB 2.0, 1× GbE LAN, Audio jack, DC-IN"
    else:
        io = "HDMI, DP/VGA, 4× USB 3.0, 2× LAN, 2× COM (DB9), Audio, DC-IN"

    if cat == "network-security" and "1U" in ff:
        stor = "1× M.2 2280 NVMe SSD, 2× 2.5\"/3.5\" SATA bays"
    elif "Bulk" in series:
        stor = "2× M.2 2280 NVMe SSD, 4–6× SATA 3.0"
    else:
        stor = "1× M.2 2280 NVMe SSD, 1× SATA 3.0"

    if "1U" in ff:
        pwr = "AC 100–240V 50/60Hz, 250W PSU"
    elif cat in ["embedded-box-pc", "panel-pc"] or "Compact" in series:
        pwr = "DC 9–36V wide-range"
    elif cat == "ops-modules":
        pwr = "DC 12–19V (via 80-pin connector)"
    else:
        pwr = "DC 12–19V"

    disp = "—"
    if cat == "panel-pc":
        if "215" in old_model:
            disp = "21.5\" TFT LCD (1920×1080), 10-point capacitive touch, IP65 front"
        elif "156" in old_model:
            disp = "15.6\" TFT LCD (1920×1080), 10-point capacitive touch, IP65 front"
        elif "150" in old_model:
            disp = "15.0\" TFT LCD (1024×768), 10-point capacitive touch, IP65 front"
        elif "101" in old_model:
            disp = "10.1\" TFT LCD (1280×800), 10-point capacitive touch, IP65 front"
        else:
            disp = "Industrial capacitive touch screen, IP65 front bezel"
    elif cat == "all-in-one":
        disp = "23.8\" Full HD (1920×1080) LED IPS display"
    elif cat == "ops-modules":
        disp = "Supports 4K@60Hz via JAE 80-pin + external HDMI"

    mount = "—"
    if "1U" in ff:
        mount = "Standard 19-inch 1U rackmount"
    elif cat == "embedded-box-pc":
        mount = "Wall mount, DIN-rail mount, VESA mount"
    elif cat == "mini-pc":
        mount = "Desktop, VESA mount (75×75 / 100×100 mm)"
    elif cat == "panel-pc":
        mount = "Panel mount, VESA 75/100 mm"
    elif cat == "ops-modules":
        mount = "Standard 80-pin OPS slot"

    return {
        "CPU Platform": cpu_clean,
        "Memory": mem,
        "Storage": stor,
        "I/O Ports": io,
        "Power Input": pwr,
        "Dimensions": dim,
        "Display": disp,
        "Mounting": mount,
        "Cooling": cool_clean,
        "OS Support": "Windows 10/11, Linux (Ubuntu, Debian, CentOS)",
        "Form Factor": clean(ff)
    }

final_products = []

for m in deduped_mappings:
    old = clean(m['old'])
    new = clean(m['new'])
    slug = new.lower()
    series = clean(m['series'])
    family = clean(m['family'])
    code = clean(m['code'])
    cat = clean(m['cat'])
    ff = clean(m['ff'])
    cpu = clean(m['cpu'])
    cool = clean(m['cool'])
    
    n_old = norm_model(old)
    if n_old in alias_map and n_old not in existing_by_norm:
        n_old = norm_model(alias_map[n_old])

    if n_old in existing_by_norm:
        base = existing_by_norm[n_old].copy()
        clean_cool = cool if cool in ["Fanless", "Fan-cooled"] else ("Fanless" if "fanless" in series.lower() or "lite" in series.lower() or "compact" in series.lower() else "Fan-cooled")
        base["model"] = new
        base["legacy_model"] = old
        base["slug"] = slug
        base["series"] = series
        base["series_family"] = family
        base["series_code"] = code
        base["category"] = cat
        base["form_factor"] = ff
        base["cpu_platform"] = cpu
        base["cooling"] = clean_cool
        
        if "specs" in base and isinstance(base["specs"], dict):
            base["specs"]["Form Factor"] = ff
            base["specs"]["CPU Platform"] = cpu
            base["specs"]["Cooling"] = clean_cool
        else:
            base["specs"] = build_specs(cat, ff, cpu, clean_cool, series, old)

        final_products.append(base)
    else:
        specs = build_specs(cat, ff, cpu, cool, series, old)
        new_prod = {
            "model": new,
            "legacy_model": old,
            "slug": slug,
            "series": series,
            "series_family": family,
            "series_code": code,
            "category": cat,
            "sectors": get_sectors(cat, series),
            "specs": specs,
            "cpu_platform": specs["CPU Platform"],
            "cooling": specs["Cooling"],
            "form_factor": specs["Form Factor"],
            "applications": get_applications(cat, series, cpu),
            "datasheet_page": None,
            "datasheet_url": None,
            "image": CAT_IMAGES.get(cat, "/catalog/products/motherboard.jpg"),
            "featured": False,
            "flags": f"Allocated to {series}. Official Quartzar industrial catalog specification.",
            "id": str(uuid.uuid4()),
            "created_at": "2026-10-07T00:00:00.000000+00:00"
        }
        final_products.append(new_prod)

# Also preserve LIVE-A1
live_prod = next((p for p in existing_products if p['model'] == "LIVE-A1"), None)
if live_prod:
    live = live_prod.copy()
    live["series"] = "Live Studio: Streaming Deck"
    live["series_family"] = "Live Studio"
    live["series_code"] = "LIVE"
    live["legacy_model"] = "LIVE-A1"
    live["cooling"] = "Fan-cooled"
    if "specs" in live and isinstance(live["specs"], dict):
        live["specs"]["Cooling"] = "Fan-cooled"
    final_products.append(live)

print(f"Total final products: {len(final_products)}")

# Write to public/data/products.json and server/data/products.json
with open('public/data/products.json', 'w', encoding='utf-8') as f:
    json.dump(final_products, f, indent=2, ensure_ascii=False)

if os.path.exists('server/data'):
    with open('server/data/products.json', 'w', encoding='utf-8') as f:
        json.dump(final_products, f, indent=2, ensure_ascii=False)

# Update Facets
all_families = sorted(list(set(p.get('series_family') for p in final_products if p.get('series_family'))))
all_series = sorted(list(set(p.get('series') for p in final_products if p.get('series'))))
all_forms = sorted(list(set(p.get('form_factor') for p in final_products if p.get('form_factor'))))
all_cpus = sorted(list(set(p.get('cpu_platform') for p in final_products if p.get('cpu_platform'))))
all_cool = sorted(list(set(p.get('cooling') for p in final_products if p.get('cooling'))))

facets = {
    "series_family": all_families,
    "series": all_series,
    "form_factor": all_forms,
    "cooling": all_cool,
    "cpu_platform": all_cpus
}

with open('public/data/products_facets.json', 'w', encoding='utf-8') as f:
    json.dump(facets, f, indent=2, ensure_ascii=False)

if os.path.exists('server/data'):
    with open('server/data/products_facets.json', 'w', encoding='utf-8') as f:
        json.dump(facets, f, indent=2, ensure_ascii=False)

# Update Categories counts
with open('public/data/categories.json', 'r', encoding='utf-8-sig') as f:
    categories = json.load(f)

for cat in categories:
    count = sum(1 for p in final_products if p.get('category') == cat['slug'])
    cat['count'] = count

with open('public/data/categories.json', 'w', encoding='utf-8') as f:
    json.dump(categories, f, indent=2, ensure_ascii=False)

if os.path.exists('server/data'):
    with open('server/data/categories.json', 'w', encoding='utf-8') as f:
        json.dump(categories, f, indent=2, ensure_ascii=False)

# Generate individual product detail files in public/data/products_detail/
os.makedirs('public/data/products_detail', exist_ok=True)
for p in final_products:
    slug = p['slug']
    related = [r for r in final_products if (r.get('series') == p.get('series') or r.get('category') == p.get('category')) and r['slug'] != slug][:4]
    detail = {
        "product": p,
        "related": related
    }
    with open(f'public/data/products_detail/{slug}.json', 'w', encoding='utf-8') as f:
        json.dump(detail, f, indent=2, ensure_ascii=False)
    
    # Also write under legacy_model if exists for backwards compatibility
    if p.get('legacy_model'):
        old_slug = p['legacy_model'].lower().replace('/', '-')
        if old_slug != slug:
            with open(f'public/data/products_detail/{old_slug}.json', 'w', encoding='utf-8') as f:
                json.dump(detail, f, indent=2, ensure_ascii=False)

print("Catalog data updated successfully!")
