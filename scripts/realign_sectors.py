import json
import os

SECTORS_CANONICAL = [
    "manufacturing-automation",
    "robotics",
    "medical-healthcare",
    "transportation-ev",
    "network-security",
    "retail-kiosk",
    "digital-signage",
    "smart-office"
]

def get_product_sectors(p):
    code = p.get("series_code", "")
    model = p.get("model", "")
    cat = p.get("category", "")
    sectors = []

    if code == "QCU":
        # Mini-ITX High Performance Core Ultra: industrial automation + medical imaging/diagnostics
        sectors.extend(["manufacturing-automation", "medical-healthcare"])

    elif code == "QCL":
        # Mini-ITX Power Efficient (N100, Elkhart): retail kiosks, POS, medical carts/bedside
        sectors.extend(["retail-kiosk", "medical-healthcare", "manufacturing-automation"])

    elif code == "QCB":
        # Mini-ITX Bulk Storage (multi-SATA NAS): office storage & factory NVR/data logging
        sectors.extend(["smart-office", "manufacturing-automation"])

    elif code == "QCC":
        # 3.5" SBCs (DC 9-36V, compact): AMR/robotics, transportation/EV, machine control
        sectors.extend(["robotics", "transportation-ev", "manufacturing-automation"])

    elif code == "QCX":
        # Micro-ATX Heavy Duty: continuous manufacturing automation & transit infrastructure
        sectors.extend(["manufacturing-automation", "transportation-ev"])

    elif code == "QEU":
        # Fanless Box PC Premium (Core Ultra, DC 9-36V): manufacturing, robotics, transit
        sectors.extend(["manufacturing-automation", "robotics", "transportation-ev"])

    elif code == "QEN":
        # Cableless & Multi-LAN Box PC: rugged network security, transportation/RSU, factory automation
        sectors.extend(["network-security", "transportation-ev", "manufacturing-automation"])

    elif code == "QEM":
        # Compact Box PC (DC 9-36V): robotics/AMRs, EV charging/transportation, automation
        sectors.extend(["robotics", "transportation-ev", "manufacturing-automation"])

    elif code == "QEV":
        # Vision Controllers (4x PoE, 16-ch DIO): machine vision AOI & robot arm vision
        sectors.extend(["manufacturing-automation", "robotics"])

    elif code == "QMC":
        # NUC Mini PC Connectivity (dual 2.5G LAN, multi-4K): edge network, digital signage, smart office
        sectors.extend(["network-security", "digital-signage", "smart-office"])

    elif code == "QMV":
        # NUC Mini PC Versatile: smart office productivity & commercial retail kiosks
        sectors.extend(["smart-office", "retail-kiosk"])

    elif code == "QMM":
        # NUC Mini PC Ready-to-deploy: 4K digital signage player & smart office thin clients
        sectors.extend(["digital-signage", "smart-office"])

    elif code == "QNR":
        # 1U Rackmount Network Security: enterprise firewalls, gateways
        sectors.extend(["network-security"])

    elif code == "QNS":
        # Desktop Network Security: branch firewalls, VPN routers
        sectors.extend(["network-security"])

    elif code == "QTX":
        # Industrial Panel PC (IP65 touch): manufacturing HMI, self-service kiosks, medical cleanroom
        sectors.extend(["manufacturing-automation", "retail-kiosk", "medical-healthcare"])

    elif code == "QTT":
        # All-in-One PC: smart office, front desk kiosk, clinic consultation
        sectors.extend(["smart-office", "retail-kiosk", "medical-healthcare"])

    elif code == "QTB":
        # OPS Modules: interactive digital signage, conference IFP, smart boards
        sectors.extend(["digital-signage"])

    elif code == "LIVE":
        # Live Studio streaming deck: digital signage broadcast, corporate webinar studio
        sectors.extend(["digital-signage", "smart-office"])

    else:
        # Fallback based on category
        if cat == "network-security":
            sectors.append("network-security")
        elif cat == "ops-modules":
            sectors.append("digital-signage")
        elif cat == "panel-pc":
            sectors.extend(["manufacturing-automation", "retail-kiosk"])
        else:
            sectors.append("manufacturing-automation")

    # Validate all are within canonical 8 sectors
    clean_sectors = [s for s in sectors if s in SECTORS_CANONICAL]
    # Remove duplicates preserving order
    seen = set()
    result = []
    for s in clean_sectors:
        if s not in seen:
            seen.add(s)
            result.append(s)
    return result

def realign(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        products = json.load(f)
    
    for p in products:
        p["sectors"] = get_product_sectors(p)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(products, f, indent=2, ensure_ascii=False)
        f.write('\n')
    print(f"Updated {len(products)} products in {filepath}")

# Update public and server products.json
realign('public/data/products.json')
realign('server/data/products.json')

# Update detail files in public/data/products_detail and server/data/products_detail if they have sectors
for detail_dir in ['public/data/products_detail', 'server/data/products_detail']:
    if os.path.exists(detail_dir):
        files = [f for f in os.listdir(detail_dir) if f.endswith('.json')]
        with open('public/data/products.json', 'r', encoding='utf-8') as f:
            all_p = {p["slug"].lower(): p for p in json.load(f)}
        count = 0
        for fname in files:
            fpath = os.path.join(detail_dir, fname)
            with open(fpath, 'r', encoding='utf-8') as f:
                d = json.load(f)
            prod = d.get("product", d)
            slug = prod.get("slug", "").lower()
            if slug in all_p:
                prod["sectors"] = all_p[slug]["sectors"]
                with open(fpath, 'w', encoding='utf-8') as f:
                    json.dump(d, f, indent=2, ensure_ascii=False)
                    f.write('\n')
                count += 1
        print(f"Updated {count} detail files in {detail_dir}")

# Calculate and update sectors.json static counts to match
with open('public/data/products.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

sector_counts = {s: 0 for s in SECTORS_CANONICAL}
for p in products:
    for s in p["sectors"]:
        sector_counts[s] += 1

print("\n--- NEW REALIGNED SECTOR COUNTS ---")
for s in SECTORS_CANONICAL:
    print(f"{s}: {sector_counts[s]} models")

for sec_path in ['public/data/sectors.json', 'server/data/sectors.json']:
    if os.path.exists(sec_path):
        with open(sec_path, 'r', encoding='utf-8') as f:
            sectors = json.load(f)
        for sec in sectors:
            if sec["slug"] in sector_counts:
                sec["count"] = sector_counts[sec["slug"]]
        with open(sec_path, 'w', encoding='utf-8') as f:
            json.dump(sectors, f, indent=2, ensure_ascii=False)
            f.write('\n')
        print(f"Updated static counts in {sec_path}")
