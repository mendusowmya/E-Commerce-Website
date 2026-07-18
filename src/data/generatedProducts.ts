import { Product } from '../types';

export const GENERATED_PRODUCTS: Product[] = [
  // ==========================================
  // WATCHES & WEARABLES (5 products)
  // ==========================================
  {
    id: 'prod-16',
    name: 'Aether Chrono Smartwatch Mk.V',
    description: 'A masterpiece of wearable engineering. Features a microscopic titanium-carbide chassis, real-time arterial oxygen mapping, cellular connectivity, and a dynamic sapphire crystal display that adjusts polarization under sunlight.',
    price: 499.00,
    category: 'Watches & Wearables',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600',
    inventory: 55,
    rating: 4.8,
    reviewsCount: 3,
    reviews: [
      { id: 'rev-w1', userId: 'user-w1', userName: 'Aarav Sharma', rating: 5, comment: 'Simply stunning. The battery easily lasts a week despite the full biometric array running 24/7.', date: '2026-07-01' },
      { id: 'rev-w2', userId: 'user-w2', userName: 'Chloe Dubois', rating: 4, comment: 'Excellent cellular range. The heart rate sensor matches medical grade monitors.', date: '2026-07-04' }
    ],
    sellerId: 'sell-electronics',
    sellerName: 'AeroWear Labs',
    tags: ['watch', 'wearable', 'biometrics', 'titanium'],
    specs: {
      'Chassis': 'Titanium-Carbide G5 Matrix',
      'Display': '1.92-inch Sapphire Crystal AMOLED',
      'Water Resistance': '50m (5 ATM) ISO Certified',
      'Battery Life': 'Up to 10 days standard',
      'Sensors': 'Optical heart monitor, SpO2 sensor, temperature'
    },
    isFeatured: true,
    versions: [
      {
        id: 'v-16-standard',
        name: 'Standard Titanium (45mm)',
        price: 499.00,
        inventory: 35,
        specs: { 'Chassis': 'Titanium-Carbide G5 Matrix', 'Display': '1.92-inch Sapphire Crystal AMOLED', 'Battery Life': '10 days' }
      },
      {
        id: 'v-16-platinum',
        name: 'Sovereign Platinum Elite (47mm)',
        price: 799.00,
        inventory: 20,
        specs: { 'Chassis': 'Platinum Composite / Ceramic back', 'Display': '2.0-inch Ultra-AMOLED Polarized', 'Battery Life': '14 days' }
      }
    ]
  },
  {
    id: 'prod-17',
    name: 'Nebula Holographic Pulse Wristband',
    description: 'Minimalist circadian wearable emitting subtle micro-vibrations and visual reminders to optimize sleep, posture, and peak energy cycles throughout the day.',
    price: 189.99,
    category: 'Watches & Wearables',
    image: 'https://images.unsplash.com/photo-1539874754764-5a96559165b0?auto=format&fit=crop&q=80&w=600',
    inventory: 120,
    rating: 4.5,
    reviewsCount: 2,
    reviews: [
      { id: 'rev-w3', userId: 'user-w3', userName: 'Kenji Takahashi', rating: 5, comment: 'Highly effective for fixing sleep routines.', date: '2026-07-02' }
    ],
    sellerId: 'sell-electronics',
    sellerName: 'AeroWear Labs',
    tags: ['wearable', 'circadian', 'health', 'minimalist'],
    specs: {
      'Interface': 'Interactive LED Dot Matrix / Haptic Node',
      'Band Material': 'Anti-dust liquid silicone',
      'Connectivity': 'Bluetooth 5.3 Low Energy',
      'Battery': 'Rechargeable solid-state polymer (30 days)'
    },
    versions: [
      { id: 'v-17-active', name: 'Active Pulse', price: 189.99, inventory: 80, specs: { 'Band Material': 'Anti-dust liquid silicone' } },
      { id: 'v-17-leather', name: 'Premium Leather Hybrid', price: 239.99, inventory: 40, specs: { 'Band Material': 'Italian Full-Grain Tuscan Leather' } }
    ]
  },
  {
    id: 'prod-18',
    name: 'Helios Solar Hybrid Chronograph',
    description: 'A magnificent mechanical timepiece paired with high-efficiency micro-solar cells beneath the dial, allowing perpetual power generation without battery swaps.',
    price: 349.50,
    category: 'Watches & Wearables',
    image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80&w=600',
    inventory: 40,
    rating: 4.7,
    reviewsCount: 1,
    reviews: [
      { id: 'rev-w4', userId: 'user-w4', userName: 'Liam O\'Connor', rating: 4, comment: 'Beautiful dial and zero charging concerns.', date: '2026-06-28' }
    ],
    sellerId: 'sell-luxury',
    sellerName: 'Apex Luxe',
    tags: ['watch', 'solar', 'mechanical', 'hybrid'],
    specs: {
      'Caliber': 'S-900 Solar-Mechanical Caliper',
      'Power Reserve': 'Infinite (with 2 hours of sunlight daily)',
      'Strap': 'Reinforced Fluoropolymer / Stainless Steel buckle',
      'Bezel': 'Rotating Ceramic timer'
    }
  },
  {
    id: 'prod-19',
    name: 'Titanium Diver Professional',
    description: 'Engineered for extreme depths. Full mechanical movement housed inside an helium-purged titanium mono-bloc chamber. Sealed for deep ocean diving up to 300 meters.',
    price: 899.00,
    category: 'Watches & Wearables',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=600',
    inventory: 15,
    rating: 4.9,
    reviewsCount: 1,
    reviews: [
      { id: 'rev-w5', userId: 'user-w5', userName: 'Captain Jack', rating: 5, comment: 'Absolutely bombproof diver timepiece.', date: '2026-07-06' }
    ],
    sellerId: 'sell-luxury',
    sellerName: 'Apex Luxe',
    tags: ['watch', 'diver', 'mechanical', 'titanium'],
    specs: {
      'Water Resistance': '300m / 1000ft (ISO 6425)',
      'Movement': 'Swiss self-winding automatic movement',
      'Lume': 'Super-LumiNova dual color',
      'Case Diameter': '44mm'
    }
  },
  {
    id: 'prod-20',
    name: 'Vanguard Minimalist Dress Watch',
    description: 'An ultra-slim, contemporary classic dress watch featuring an obsidian dial face with platinum hand-polished indexes and a genuine Horween leather strap.',
    price: 279.00,
    category: 'Watches & Wearables',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=600',
    inventory: 30,
    rating: 4.6,
    reviewsCount: 2,
    reviews: [
      { id: 'rev-w6', userId: 'user-w6', userName: 'Sophia Loren', rating: 5, comment: 'So elegant and incredibly thin. Fits nicely under cuffs.', date: '2026-07-05' }
    ],
    sellerId: 'sell-luxury',
    sellerName: 'Apex Luxe',
    tags: ['watch', 'minimalist', 'dress', 'leather'],
    specs: {
      'Thickness': '5.2mm ultra-thin',
      'Glass': 'Double-domed anti-reflective Sapphire',
      'Case': '316L Surgical Stainless Steel',
      'Strap': 'Genuine Horween Shell Cordovan'
    }
  },

  // ==========================================
  // KITCHEN & HOUSEHOLD (5 products)
  // ==========================================
  {
    id: 'prod-21',
    name: 'AeroBrew Smart Espresso Engine',
    description: 'A multi-pressure espresso extractor with rapid thermoblock heaters and a precision digital flow scale. Synchronizes with an app to craft barista-level pours.',
    price: 349.00,
    category: 'Kitchen & Household',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600',
    inventory: 24,
    rating: 4.8,
    reviewsCount: 3,
    reviews: [
      { id: 'rev-k1', userId: 'user-k1', userName: 'CoffeeGuru', rating: 5, comment: 'Outstanding pressure control! The shot profiling is identical to commercial machines.', date: '2026-07-11' }
    ],
    sellerId: 'sell-home',
    sellerName: 'Lumira Living',
    tags: ['kitchen', 'espresso', 'coffee', 'smarthome'],
    specs: {
      'Pressure System': '19-Bar Italian Electromagnetic Pump',
      'Heating': 'Dual Thermoblock (under 45 seconds)',
      'Water Reservoir': '2.2 Liters fully detachable',
      'Grinder': 'Inbuilt steel conical burr (30 settings)'
    },
    versions: [
      { id: 'v-21-regular', name: 'Barista Classic', price: 349.00, inventory: 16, specs: { 'Grinder': 'Inbuilt steel conical burr' } },
      { id: 'v-21-pro', name: 'Barista Pro (Dual Boiler)', price: 499.00, inventory: 8, specs: { 'Grinder': 'Titanium-coated conical burrs', 'Pressure System': 'Dual rotational pump' } }
    ]
  },
  {
    id: 'prod-22',
    name: 'AeroCook Smart Induction Oven',
    description: 'Desktop convection oven using multi-spectrum induction heating nodes to instantly cook proteins and bakes up to 4x faster with zero preheating required.',
    price: 599.00,
    category: 'Kitchen & Household',
    image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&q=80&w=600',
    inventory: 18,
    rating: 4.7,
    reviewsCount: 1,
    reviews: [
      { id: 'rev-k2', userId: 'user-k2', userName: 'Chef Sarah', rating: 5, comment: 'Replaced my microwave and standard oven completely.', date: '2026-07-09' }
    ],
    sellerId: 'sell-home',
    sellerName: 'Lumira Living',
    tags: ['kitchen', 'oven', 'convection', 'induction'],
    specs: {
      'Capacity': '32 Liters',
      'Heating Core': 'Quad Inducto-Nodes (2400W peak)',
      'Control Panel': '6.2-inch LED Touch screen with recipes',
      'Interior': 'Easy-clean ceramic enamel'
    }
  },
  {
    id: 'prod-23',
    name: 'HydroClean Automated Dishwasher',
    description: 'Compact, counter-top automated dishwasher utilizing high-frequency ultrasonic waves to break down tough grease in an ultra-fast 15 minute cycle with minimal water usage.',
    price: 429.00,
    category: 'Kitchen & Household',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=600',
    inventory: 15,
    rating: 4.6,
    reviewsCount: 2,
    reviews: [
      { id: 'rev-k3', userId: 'user-k3', userName: 'Emma Watson', rating: 4, comment: 'Great for small apartments, super silent.', date: '2026-07-12' }
    ],
    sellerId: 'sell-home',
    sellerName: 'Lumira Living',
    tags: ['household', 'dishwasher', 'ultrasonic', 'compact'],
    specs: {
      'Installation': 'Countertop quick-hook connect',
      'Water Usage': 'Just 4.5 Liters per cycle',
      'Sanitization': 'UV-C final sterilization stage'
    }
  },
  {
    id: 'prod-24',
    name: 'Sol-Pure Smart Water Purifier',
    description: 'Under-sink water carbonization and purification filter with a 6-stage reverse osmosis grid, delivering mineralized sparkling and hot water on demand.',
    price: 299.00,
    category: 'Kitchen & Household',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=600',
    inventory: 35,
    rating: 4.8,
    reviewsCount: 1,
    reviews: [
      { id: 'rev-k4', userId: 'user-k4', userName: 'CleanWaterGuy', rating: 5, comment: 'Water tastes incredibly crisp and refreshing.', date: '2026-07-03' }
    ],
    sellerId: 'sell-home',
    sellerName: 'Lumira Living',
    tags: ['kitchen', 'purifier', 'water', 'household'],
    specs: {
      'Filtration': '6-Stage Reverse Osmosis',
      'Flow Rate': '2.0 Liters per minute continuous',
      'Indicator': 'Dynamic TDS real-time screen'
    }
  },
  {
    id: 'prod-25',
    name: 'AeroDry Multi-Purpose Vacuum',
    description: 'An advanced cordless wet-dry floor wash vacuum utilizing intelligent sensor technology to auto-adjust suction and water dispense based on dirty detection.',
    price: 389.99,
    category: 'Kitchen & Household',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=600',
    inventory: 22,
    rating: 4.6,
    reviewsCount: 2,
    reviews: [
      { id: 'rev-k5', userId: 'user-k5', userName: 'HomeOwner', rating: 5, comment: 'Saves so much time! Vacuums and mops simultaneously.', date: '2026-07-14' }
    ],
    sellerId: 'sell-home',
    sellerName: 'Lumira Living',
    tags: ['household', 'vacuum', 'cleaning', 'cordless'],
    specs: {
      'Battery Life': 'Up to 45 minutes auto mode',
      'Suction Power': '150 AW (Air Watts)',
      'Water Tank Capacity': '0.8L Clean / 0.7L Dirty'
    }
  },

  // ==========================================
  // MOBILES & ELECTRONICS (5 products)
  // ==========================================
  {
    id: 'prod-26',
    name: 'AeroPhone 14 Sovereign Flagship',
    description: 'The definitive modular communication device. Features a dual graphene thermal cooling plate, liquid-metal body armor, an advanced neural core processor, and an absolute bezel-less micro-OLED panel.',
    price: 1099.00,
    category: 'Mobiles & Electronics',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600',
    inventory: 40,
    rating: 4.9,
    reviewsCount: 3,
    reviews: [
      { id: 'rev-m1', userId: 'user-m1', userName: 'TechInsider', rating: 5, comment: 'Insanely fast. The zoom capability of the main lens is cinematic.', date: '2026-07-10' }
    ],
    sellerId: 'sell-electronics',
    sellerName: 'AeroWear Labs',
    tags: ['phone', 'mobile', 'flagship', 'graphene'],
    specs: {
      'Processor': 'Quantum Neural Core X-15',
      'Display': '6.82-inch Liquid Micro-OLED (144Hz)',
      'Main Camera': '108MP Quad-Sensing Array with LIDAR',
      'Battery': '5500 mAh Graphene-Battery (100W charging)'
    },
    versions: [
      { id: 'v-26-std', name: 'Sovereign standard (256GB)', price: 1099.00, inventory: 25, specs: { 'Storage': '256GB' } },
      { id: 'v-26-ultra', name: 'Sovereign Ultra-Max (1TB)', price: 1399.00, inventory: 15, specs: { 'Storage': '1TB', 'Processor': 'Quantum Neural Core X-15 Pro' } }
    ]
  },
  {
    id: 'prod-27',
    name: 'Apex Foldable Flex-Screen Tablet',
    description: 'A revolutionary seamless dual-hinge folding tablet that collapses into a pocketable phone profile. Perfect for productivity and immersive canvas drawings.',
    price: 1499.00,
    category: 'Mobiles & Electronics',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=600',
    inventory: 15,
    rating: 4.7,
    reviewsCount: 2,
    reviews: [
      { id: 'rev-m2', userId: 'user-m2', userName: 'DesignerPro', rating: 5, comment: 'Unbelievably smooth folding crease. The stylus response has almost zero latency.', date: '2026-07-06' }
    ],
    sellerId: 'sell-electronics',
    sellerName: 'AeroWear Labs',
    tags: ['tablet', 'foldable', 'electronics', 'display'],
    specs: {
      'Unfolded Screen': '8.2-inch Flexible LTPO OLED',
      'Folded Screen': '6.1-inch Cover Screen',
      'Stylus Support': 'Apex Magnetic Smart-Scribe included'
    }
  },
  {
    id: 'prod-28',
    name: 'Quantum Pocket Communicator Node',
    description: 'A dedicated off-grid satellite messenger utilizing micro-beams to send secure encrypted telemetry and messages anywhere on earth without cell coverage.',
    price: 249.00,
    category: 'Mobiles & Electronics',
    image: 'https://images.unsplash.com/photo-1573148195900-7845dcb9b127?auto=format&fit=crop&q=80&w=600',
    inventory: 50,
    rating: 4.6,
    reviewsCount: 1,
    reviews: [
      { id: 'rev-m3', userId: 'user-m3', userName: 'HikerDave', rating: 5, comment: 'Saved me when I lost coverage in Yosemite. Highly reliable.', date: '2026-07-01' }
    ],
    sellerId: 'sell-electronics',
    sellerName: 'AeroWear Labs',
    tags: ['mobile', 'satellite', 'electronics', 'security'],
    specs: {
      'Network': 'Orbital StarLink Direct-Beaming',
      'Chassis': 'Impact resistant polycarbonate',
      'Battery life': 'Up to 3 weeks standby'
    }
  },
  {
    id: 'prod-29',
    name: 'AeroPad Pocket Slate E-Reader',
    description: 'An eye-safe e-ink slate designed for concentrated reading, study, and secure journaling. Features low-energy warm glow illumination and tactile page turning.',
    price: 179.99,
    category: 'Mobiles & Electronics',
    image: 'https://images.unsplash.com/photo-1565849906461-0965d344555a?auto=format&fit=crop&q=80&w=600',
    inventory: 65,
    rating: 4.8,
    reviewsCount: 1,
    reviews: [
      { id: 'rev-m4', userId: 'user-m4', userName: 'Bookworm', rating: 5, comment: 'Exactly what I wanted. No distracting social notifications.', date: '2026-07-12' }
    ],
    sellerId: 'sell-electronics',
    sellerName: 'AeroWear Labs',
    tags: ['reader', 'eink', 'books', 'electronics'],
    specs: {
      'Display': '7.2-inch high contrast Carta 1200 paper',
      'Storage': '32 GB (Up to 15,000 books)',
      'Charging': 'USB-C (Fully charged in 1 hour)'
    }
  },
  {
    id: 'prod-30',
    name: 'HyperCharge GaN Desk Hub (240W)',
    description: 'Supercharger block utilizing dual Gallium Nitride chips to power up to six high-intensity laptop and mobile devices concurrently with active heat monitoring.',
    price: 89.00,
    category: 'Mobiles & Electronics',
    image: 'https://images.unsplash.com/photo-1573148195900-7845dcb9b127?auto=format&fit=crop&q=80&w=600',
    inventory: 150,
    rating: 4.7,
    reviewsCount: 2,
    reviews: [
      { id: 'rev-m5', userId: 'user-m5', userName: 'Alex Power', rating: 5, comment: 'Charges my MacBook Pro and iPad Pro at full speeds together!', date: '2026-07-08' }
    ],
    sellerId: 'sell-electronics',
    sellerName: 'AeroWear Labs',
    tags: ['charger', 'gan', 'power', 'electronics'],
    specs: {
      'Total Output': '240W peak distribution',
      'Port Array': '4x USB-C PD, 2x USB-A QC4.0',
      'Safety': 'AeroShield active thermistor cutoff'
    }
  },

  // ==========================================
  // SMART TVS & MEDIA (5 products)
  // ==========================================
  {
    id: 'prod-31',
    name: 'AeroView 8K Laser Projection TV',
    description: 'Bring the theatrical experience home. An ultra-short throw cinema projector that beams up to 150 inches of crystal clear 8K images onto any flat wall from just 10 inches away.',
    price: 2499.00,
    category: 'Smart TVs & Media',
    image: 'https://images.unsplash.com/photo-1558885561-56c2a0915266?auto=format&fit=crop&q=80&w=600',
    inventory: 10,
    rating: 4.9,
    reviewsCount: 2,
    reviews: [
      { id: 'rev-t1', userId: 'user-t1', userName: 'MovieNerd', rating: 5, comment: 'Stunning colors even during direct daytime light. Best home investment.', date: '2026-07-02' }
    ],
    sellerId: 'sell-electronics',
    sellerName: 'AeroWear Labs',
    tags: ['tv', 'projector', 'cinema', '8k'],
    specs: {
      'Brightness': '3500 ANSI Lumens',
      'Projection Size': '80" to 150" fluid sizing',
      'Sound': 'Dual 30W Harman Kardon speakers inbuilt',
      'Source': 'Android TV / Apple AirPlay integrated'
    },
    versions: [
      { id: 'v-31-standard', name: 'AeroView 8K Ultra-Short Throw', price: 2499.00, inventory: 8, specs: { 'Brightness': '3500 ANSI Lumens' } },
      { id: 'v-31-gold', name: 'AeroView 8K Prime (Dual Laser + Screen)', price: 3299.00, inventory: 2, specs: { 'Brightness': '5000 ANSI Lumens', 'Contrast': '3,000,000:1 ALR screen bundled' } }
    ]
  },
  {
    id: 'prod-32',
    name: 'Nebula OLED Ultra-Thin TV (65")',
    description: 'A visual masterpiece with self-lit pixels that can display deep absolute blacks and cinematic HDR colors, framed in an incredibly thin 4mm profile.',
    price: 1799.00,
    category: 'Smart TVs & Media',
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=600',
    inventory: 12,
    rating: 4.8,
    reviewsCount: 2,
    reviews: [
      { id: 'rev-t2', userId: 'user-t2', userName: 'Visualist', rating: 5, comment: 'Flicking on HDR content blew my mind. Zero haloing.', date: '2026-07-05' }
    ],
    sellerId: 'sell-electronics',
    sellerName: 'AeroWear Labs',
    tags: ['tv', 'oled', 'smart', 'media'],
    specs: {
      'Panel Type': 'Self-lit LG OLED evo G3',
      'Refresh Rate': '120Hz native variable',
      'Mounting': 'Wall-flush zero gap bracket'
    }
  },
  {
    id: 'prod-33',
    name: 'CinemaDome Dolby Sound Bar Subwoofer',
    description: 'Surround sound reinvented. Dynamic side-firing and top-firing sonic transducers that bounce audio off walls for perfect Dolby Atmos spatial positioning.',
    price: 499.00,
    category: 'Smart TVs & Media',
    image: 'https://images.unsplash.com/photo-1601944179066-297bdd5baf7c?auto=format&fit=crop&q=80&w=600',
    inventory: 30,
    rating: 4.7,
    reviewsCount: 1,
    reviews: [
      { id: 'rev-t3', userId: 'user-t3', userName: 'Audiophile', rating: 5, comment: 'Rumbles the room during actions scenes. Crisp dialogue!', date: '2026-06-29' }
    ],
    sellerId: 'sell-electronics',
    sellerName: 'AeroWear Labs',
    tags: ['audio', 'soundbar', 'media', 'speaker'],
    specs: {
      'Audio Channels': '9.1.2 Spatial Dolby Atmos Grid',
      'Power Output': '520 Watts peak',
      'Connectivity': 'eARC HDMI, optical, Bluetooth 5.2'
    }
  },
  {
    id: 'prod-34',
    name: 'Apex Curved 49-inch Super-Ultra-Wide Monitor',
    description: 'An absolute beast of a monitor for panoramic multi-tasking and high refresh rate cinematic gaming. Curved to match human peripheral vision.',
    price: 999.00,
    category: 'Smart TVs & Media',
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=600',
    inventory: 14,
    rating: 4.8,
    reviewsCount: 1,
    reviews: [
      { id: 'rev-t4', userId: 'user-t4', userName: 'DevDave', rating: 5, comment: 'Like having three monitors in one screen. Clean setup!', date: '2026-07-04' }
    ],
    sellerId: 'sell-electronics',
    sellerName: 'AeroWear Labs',
    tags: ['monitor', 'gaming', 'ultrawide', 'media'],
    specs: {
      'Resolution': 'Dual QHD (5120 x 1440) 32:9',
      'Curvature': '1000R optimal field curve',
      'Refresh': '240Hz response time 1ms'
    }
  },
  {
    id: 'prod-35',
    name: 'HoloStream Digital Media Deck',
    description: 'High resolution digital converter streaming stick with built-in localized neural chip designed to upscale standard 1080p feeds into beautiful 4K graphics.',
    price: 129.00,
    category: 'Smart TVs & Media',
    image: 'https://images.unsplash.com/photo-1558885561-56c2a0915266?auto=format&fit=crop&q=80&w=600',
    inventory: 80,
    rating: 4.5,
    reviewsCount: 2,
    reviews: [
      { id: 'rev-t5', userId: 'user-t5', userName: 'Benny', rating: 4, comment: 'Simple setup. The upscaler works surprisingly well.', date: '2026-07-13' }
    ],
    sellerId: 'sell-electronics',
    sellerName: 'AeroWear Labs',
    tags: ['media', 'streaming', 'electronics', '4k'],
    specs: {
      'Supported Standards': 'Dolby Vision, HDR10+, Atmos passthrough',
      'Memory': '8GB high speed cache / QuadCore SoC',
      'Input': 'HDMI direct connection'
    }
  },

  // ==========================================
  // FURNITURE & OFFICE (5 products)
  // ==========================================
  {
    id: 'prod-36',
    name: 'Apex Ergo-Dynamic Task Chair',
    description: 'Erase back strain forever. A posture adapting workstation chair with self-adjusting lumbar wings, flexible mesh support, and fully adjustable 4D armrests.',
    price: 699.00,
    category: 'Furniture & Office',
    image: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&q=80&w=600',
    inventory: 20,
    rating: 4.8,
    reviewsCount: 3,
    reviews: [
      { id: 'rev-f1', userId: 'user-f1', userName: 'WfhWarrior', rating: 5, comment: 'Simply incredible. Sitting 8 hours has never felt so effortless.', date: '2026-07-01' }
    ],
    sellerId: 'sell-home',
    sellerName: 'Lumira Living',
    tags: ['furniture', 'chair', 'office', 'ergonomic'],
    specs: {
      'Mesh Type': 'Duraflex High-Tension Breathable Elastomer',
      'Base Frame': 'Satin-finished premium aluminum alloy',
      'Adjustments': 'Pneumatic tilt lock, lumbar depth, seat slide'
    },
    versions: [
      { id: 'v-36-mesh', name: 'Duraflex Breathable Mesh', price: 699.00, inventory: 15, specs: { 'Material': 'Mesh' } },
      { id: 'v-36-leather', name: 'Nappa Leather Edition', price: 899.00, inventory: 5, specs: { 'Material': 'Full-grain Nappa Leather' } }
    ]
  },
  {
    id: 'prod-37',
    name: 'AeroDesk Height-Adjustable Smart Desk',
    description: 'Minimalist solid bamboo desk with ultra-quiet dual motor lifts and custom memory buttons to transition flawlessly from sit to stand workflows.',
    price: 899.00,
    category: 'Furniture & Office',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=600',
    inventory: 15,
    rating: 4.9,
    reviewsCount: 1,
    reviews: [
      { id: 'rev-f2', userId: 'user-f2', userName: 'OfficeGeek', rating: 5, comment: 'Sturdy at max height. Inbuilt power hub is excellent.', date: '2026-07-06' }
    ],
    sellerId: 'sell-home',
    sellerName: 'Lumira Living',
    tags: ['furniture', 'desk', 'office', 'standing'],
    specs: {
      'Desktop Material': 'Sustainable Hardwood Bamboo (1.5" thickness)',
      'Height Range': '60cm to 125cm fluid extension',
      'Motors': 'Dual silent synchronized motors'
    }
  },
  {
    id: 'prod-38',
    name: 'Nebula Anti-Gravity Lounge Couch',
    description: 'An exceptional zero-pressure recliner lounge chair filled with high-density aerospace foam that distributes your weight perfectly to mimic weightlessness.',
    price: 1290.00,
    category: 'Furniture & Office',
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600',
    inventory: 8,
    rating: 4.8,
    reviewsCount: 1,
    reviews: [
      { id: 'rev-f3', userId: 'user-f3', userName: 'LoungeLover', rating: 5, comment: 'Like sleeping on a cloud. Best couch recliner in the world.', date: '2026-07-08' }
    ],
    sellerId: 'sell-home',
    sellerName: 'Lumira Living',
    tags: ['furniture', 'couch', 'lounge', 'luxury'],
    specs: {
      'Cushion Core': 'Memory Foam infused with temperature Gel',
      'Upholstery': 'Premium spill-repelling linen weave',
      'Framework': 'Hardwood walnut structural reinforcement'
    }
  },
  {
    id: 'prod-39',
    name: 'Sovereign Solid Walnut Bookshelf Credenza',
    description: 'Hand-assembled mid-century sideboard designed with beautiful architectural slat-panel doors and ample cable routing holes for dynamic media storage.',
    price: 1599.00,
    category: 'Furniture & Office',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600',
    inventory: 5,
    rating: 4.9,
    reviewsCount: 1,
    reviews: [
      { id: 'rev-f4', userId: 'user-f4', userName: 'InteriorsAesthetic', rating: 5, comment: 'Exquisite woodwork. The natural grain pattern is breathtaking.', date: '2026-06-25' }
    ],
    sellerId: 'sell-home',
    sellerName: 'Lumira Living',
    tags: ['furniture', 'credenza', 'luxury', 'walnut'],
    specs: {
      'Wood': '100% Solid Certified North American Black Walnut',
      'Joints': 'Precision mortise-and-tenon craftsmanship',
      'Dimensions': '180cm x 45cm x 75cm'
    }
  },
  {
    id: 'prod-40',
    name: 'Lumina Floating Halo Office Lamp',
    description: 'An elegant task light featuring a magnetic levitation suspension ring and adaptive touch controls, ideal for an uncluttered designer work space.',
    price: 149.00,
    category: 'Furniture & Office',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600',
    inventory: 45,
    rating: 4.5,
    reviewsCount: 2,
    reviews: [
      { id: 'rev-f5', userId: 'user-f5', userName: 'Desker', rating: 4, comment: 'Very cool talking piece and premium ambient light.', date: '2026-07-09' }
    ],
    sellerId: 'sell-home',
    sellerName: 'Lumira Living',
    tags: ['lighting', 'lamp', 'office', 'minimalist'],
    specs: {
      'Light Output': '800 lumens warmth-adjustable',
      'Mechanism': 'Electro-magnetic levitation core',
      'Ports': 'Qi 15W wireless charging pad integrated base'
    }
  },

  // ==========================================
  // SKINCARE & PERFUMES (5 products)
  // ==========================================
  {
    id: 'prod-41',
    name: 'AeroGlow Adaptive Face Elixir',
    description: 'Premium biocompatible serum enriched with plant-based collagen peptides and hyaluronic micro-crystals that dynamically adjust hydration based on air humidity levels.',
    price: 85.00,
    category: 'Skincare & Perfumes',
    image: 'https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=600',
    inventory: 90,
    rating: 4.7,
    reviewsCount: 3,
    reviews: [
      { id: 'rev-s1', userId: 'user-s1', userName: 'SkinCareAddict', rating: 5, comment: 'Locks in moisture all day without feeling oily.', date: '2026-07-12' }
    ],
    sellerId: 'sell-skincare',
    sellerName: 'Aura Skin Labs',
    tags: ['skincare', 'serum', 'organic', 'beauty'],
    specs: {
      'Volume': '50 mL airless pump',
      'Skin Type': 'Hypoallergenic (All skin profiles)',
      'Active Ingredients': 'Vegan peptide complex, squalane extract'
    },
    versions: [
      { id: 'v-41-regular', name: 'Regular Elixir (50mL)', price: 85.00, inventory: 60, specs: { 'Volume': '50 mL' } },
      { id: 'v-41-jumbo', name: 'Duo-Pack Refill (100mL)', price: 140.00, inventory: 30, specs: { 'Volume': '100 mL' } }
    ]
  },
  {
    id: 'prod-42',
    name: 'Sovereign Royal Oud Perfume',
    description: 'A luxurious master-crafted fragrance featuring premium notes of rich amber, dark sandalwood, and rare wild Cambodian oud. Long lasting and completely captivating.',
    price: 220.00,
    category: 'Skincare & Perfumes',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600',
    inventory: 35,
    rating: 4.9,
    reviewsCount: 2,
    reviews: [
      { id: 'rev-s2', userId: 'user-s2', userName: 'ParfumLover', rating: 5, comment: 'Pure luxury in a bottle. Smells unbelievably deep and holds for 12 hours.', date: '2026-07-05' }
    ],
    sellerId: 'sell-skincare',
    sellerName: 'Sovereign Fragrances',
    tags: ['perfume', 'scent', 'luxury', 'oud'],
    specs: {
      'Classification': 'Extrait de Parfum (30% oil concentration)',
      'Volume': '100 mL hand-cut crystal flacon',
      'Longevity': 'Up to 14 hours dry-down'
    }
  },
  {
    id: 'prod-43',
    name: 'AquaHydrate Thermal Recovery Serum',
    description: 'An advanced thermal recovery cream packed with mineralized algae extracts and botanical antioxidants designed to accelerate skin cell repair after sun exposure.',
    price: 65.00,
    category: 'Skincare & Perfumes',
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=600',
    inventory: 80,
    rating: 4.6,
    reviewsCount: 1,
    reviews: [
      { id: 'rev-s3', userId: 'user-s3', userName: 'SunLover', rating: 4, comment: 'Incredibly soothing after a beach day.', date: '2026-07-04' }
    ],
    sellerId: 'sell-skincare',
    sellerName: 'Aura Skin Labs',
    tags: ['skincare', 'sunrepair', 'botanical', 'cream'],
    specs: {
      'Skin Benefit': 'Calming redness, repairing UV cell barrier',
      'Fragrance': 'Scent-free formulation'
    }
  },
  {
    id: 'prod-44',
    name: 'Elysium Sweet Citrus Eau de Cologne',
    description: 'Bright and zesty summer fragrance bursting with Sicilian mandarin, cold-pressed bergamot, and a clean base of crisp white musk.',
    price: 135.00,
    category: 'Skincare & Perfumes',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600',
    inventory: 40,
    rating: 4.8,
    reviewsCount: 2,
    reviews: [
      { id: 'rev-s4', userId: 'user-s4', userName: 'FreshScent', rating: 5, comment: 'My absolute go-to hot weather fragrance. Unbelievably fresh!', date: '2026-07-10' }
    ],
    sellerId: 'sell-skincare',
    sellerName: 'Sovereign Fragrances',
    tags: ['perfume', 'citrus', 'scent', 'colodne'],
    specs: {
      'Classification': 'Eau de Parfum',
      'Volume': '75 mL bottle'
    }
  },
  {
    id: 'prod-45',
    name: 'Velvet Noir Intensive Night Hydration',
    description: 'A rich, nourishing nocturnal repair balm containing encapsulated retinol and blue tansy lipids to lock in deep structural moisture as you sleep.',
    price: 95.00,
    category: 'Skincare & Perfumes',
    image: 'https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=600',
    inventory: 50,
    rating: 4.7,
    reviewsCount: 1,
    reviews: [
      { id: 'rev-s5', userId: 'user-s5', userName: 'RetinolQueen', rating: 5, comment: 'Skin looks plump and radiant every morning.', date: '2026-07-08' }
    ],
    sellerId: 'sell-skincare',
    sellerName: 'Aura Skin Labs',
    tags: ['skincare', 'retinol', 'nightcare', 'balm'],
    specs: {
      'Active Ingredients': '0.5% Encapsulated Retinol, Triple Ceramides',
      'Volume': '50 mL jar'
    }
  },

  // ==========================================
  // HEALTH & WELLNESS (5 products)
  // ==========================================
  {
    id: 'prod-46',
    name: 'ThermaMassage Percussive Gun Pro',
    description: 'Elite dynamic tissue recovery massager with an ultra-quiet brush-less motor, targeting deep muscle stiffness with multi-frequency vibration nodes.',
    price: 199.00,
    category: 'Health & Wellness',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=600',
    inventory: 45,
    rating: 4.8,
    reviewsCount: 3,
    reviews: [
      { id: 'rev-h1', userId: 'user-h1', userName: 'GymRat', rating: 5, comment: 'Relieves calf soreness in minutes. Incredibly silent.', date: '2026-07-06' }
    ],
    sellerId: 'sell-wellness',
    sellerName: 'Smart Wellness Systems',
    tags: ['health', 'massager', 'recovery', 'fitness'],
    specs: {
      'Motor': 'QuietGlide brushless (60W peak)',
      'Battery': 'Rechargeable Li-Ion (6 hours use)',
      'Speed Range': '1200 - 3200 percussions per minute'
    },
    versions: [
      { id: 'v-46-standard', name: 'Percussive Pro Standard', price: 199.00, inventory: 35, specs: { 'Attachments': '4 interchangeable foam heads' } },
      { id: 'v-46-luxe', name: 'Titanium Elite Travel Edition', price: 279.00, inventory: 10, specs: { 'Attachments': '6 premium alloy/foam heads', 'Motor': '80W Ultra-Torque' } }
    ]
  },
  {
    id: 'prod-47',
    name: 'Nebula Smart Body Scale Plus',
    description: 'Bio-impedance full body scanner that reads skeletal muscle mass, hydration percentages, body fat index, and synchronizes with Apple Health and Android platforms.',
    price: 79.00,
    category: 'Health & Wellness',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=600',
    inventory: 70,
    rating: 4.6,
    reviewsCount: 2,
    reviews: [
      { id: 'rev-h2', userId: 'user-h2', userName: 'NutriExpert', rating: 5, comment: 'Extremely accurate and beautifully styled black glass surface.', date: '2026-07-01' }
    ],
    sellerId: 'sell-wellness',
    sellerName: 'Smart Wellness Systems',
    tags: ['health', 'scale', 'biometrics', 'electronics'],
    specs: {
      'Surface': 'Tempered high-conductivity ITO glass',
      'Capacity': '180 kg max limit',
      'Connectivity': 'Dual-Band Wi-Fi / Bluetooth'
    }
  },
  {
    id: 'prod-48',
    name: 'AeroBreath Smart Inhaler Capsule',
    description: 'Pocket-sized smart aromatherapy nebulizer that vaporizes premium botanical terpenes to instantly soothe respiratory pathways and induce deep meditation.',
    price: 119.00,
    category: 'Health & Wellness',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600',
    inventory: 40,
    rating: 4.7,
    reviewsCount: 1,
    reviews: [
      { id: 'rev-h3', userId: 'user-h3', userName: 'YogiMed', rating: 5, comment: 'Perfect addition to my pranayama breathing routines.', date: '2026-07-12' }
    ],
    sellerId: 'sell-wellness',
    sellerName: 'Smart Wellness Systems',
    tags: ['wellness', 'aromatherapy', 'meditation', 'nebulizer'],
    specs: {
      'Mesh Type': 'Laser-drilled alloy ultrasonic mesh',
      'Reservoir': '5 mL magnetic liquid pod slots'
    }
  },
  {
    id: 'prod-49',
    name: 'Apex Blood-Oxygen Pulse Monitor',
    description: 'A high-precision medical-grade oximeter with a high contrast OLED display that graphs pulse plethysmograms and alerts for oxygen shifts in under 5 seconds.',
    price: 49.00,
    category: 'Health & Wellness',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=600',
    inventory: 110,
    rating: 4.8,
    reviewsCount: 1,
    reviews: [
      { id: 'rev-h4', userId: 'user-h4', userName: 'DrMendum', rating: 5, comment: 'Clinical accuracy. Indispensable for patient monitoring.', date: '2026-07-04' }
    ],
    sellerId: 'sell-wellness',
    sellerName: 'Smart Wellness Systems',
    tags: ['health', 'oximeter', 'clinical', 'electronics'],
    specs: {
      'Sensor': 'Digital LED multi-wavelength photodiode',
      'Display': '0.96 inch Color OLED graph'
    }
  },
  {
    id: 'prod-50',
    name: 'Circadian Smart Meditation Eye Mask',
    description: 'Ultra soft memory foam sleeping mask equipped with microscopic warm LEDs that slowly fade out mimicking a real sunset, facilitating deep melatonin production.',
    price: 59.00,
    category: 'Health & Wellness',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=600',
    inventory: 95,
    rating: 4.6,
    reviewsCount: 2,
    reviews: [
      { id: 'rev-h5', userId: 'user-h5', userName: 'Insomniac', rating: 4, comment: 'Helps me fall asleep immensely during long flights.', date: '2026-07-09' }
    ],
    sellerId: 'sell-wellness',
    sellerName: 'Smart Wellness Systems',
    tags: ['health', 'sleep', 'circadian', 'mask'],
    specs: {
      'Material': 'Oeko-Tex certified bamboo silk memory foam',
      'Battery Life': 'Up to 3 full nights on one charge'
    }
  },

  // ==========================================
  // PREMIUM APPAREL (5 products)
  // ==========================================
  {
    id: 'prod-51',
    name: 'Sovereign Merino Wool Knit',
    description: 'Luxurious thermal sweater woven entirely from ultra-fine Australian Merino wool. Offers beautiful breathability, modern structure, and lifetime temperature control.',
    price: 149.00,
    category: 'Premium Apparel',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=600',
    inventory: 40,
    rating: 4.8,
    reviewsCount: 2,
    reviews: [
      { id: 'rev-a1', userId: 'user-a1', userName: 'Sartorialist', rating: 5, comment: 'So comfortable and holds its shape beautifully.', date: '2026-07-04' }
    ],
    sellerId: 'sell-apparel',
    sellerName: 'AeroWear Labs',
    tags: ['clothes', 'merino', 'wool', 'sweater'],
    specs: {
      'Yarn Diameter': '17.5 microns (Superfine grade)',
      'Weave Pattern': 'Honeycomb 3D thermal grid weave',
      'Washing': 'Handwash / Delicate cycle compatible'
    },
    versions: [
      { id: 'v-51-black', name: 'Midnight Charcoal', price: 149.00, inventory: 25, specs: { 'Color': 'Charcoal Black' } },
      { id: 'v-51-cream', name: 'Oatmeal Heather Cream', price: 149.00, inventory: 15, specs: { 'Color': 'Oatmeal Heather' } }
    ]
  },
  {
    id: 'prod-52',
    name: 'AeroGraphene Thermal Active Jacket',
    description: 'An advanced outer shell integrated with fine graphene weaves that conduct and distribute body warmth evenly across the entire surface of the jacket.',
    price: 299.00,
    category: 'Premium Apparel',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600',
    inventory: 30,
    rating: 4.9,
    reviewsCount: 1,
    reviews: [
      { id: 'rev-a2', userId: 'user-a2', userName: 'Alpinist', rating: 5, comment: 'Unbeatable warmth for its weight.', date: '2026-07-08' }
    ],
    sellerId: 'sell-apparel',
    sellerName: 'AeroWear Labs',
    tags: ['clothes', 'graphene', 'jacket', 'waterproof'],
    specs: {
      'Core Composite': 'Conductive graphene polymer knit',
      'Seams': 'Fully taped waterproof seams',
      'Wind Rating': 'Up to 50 mph block'
    }
  },
  {
    id: 'prod-53',
    name: 'Nova Seamless Ergonomic Active Tee',
    description: 'An ultra-light athletic t-shirt woven with seamless moisture-repelling channels to prevent skin chafing during long running workouts.',
    price: 59.00,
    category: 'Premium Apparel',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=600',
    inventory: 85,
    rating: 4.5,
    reviewsCount: 1,
    reviews: [
      { id: 'rev-a3', userId: 'user-a3', userName: 'RunnerX', rating: 4, comment: 'Breathes extremely well on hot summer days.', date: '2026-07-01' }
    ],
    sellerId: 'sell-apparel',
    sellerName: 'AeroWear Labs',
    tags: ['clothes', 'tshirt', 'activewear', 'breathable'],
    specs: {
      'Material': '85% Recycled Polyester, 15% Nylon dry-weave',
      'Odor Protection': 'Silver-ion antimicrobial wash'
    }
  },
  {
    id: 'prod-54',
    name: 'Apex Waterproof Windbreaker',
    description: 'A pocketable windbreaker constructed from nanotech-coated ripstop fabrics that repel water with a single shake. Weightless shield.',
    price: 189.00,
    category: 'Premium Apparel',
    image: 'https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?auto=format&fit=crop&q=80&w=600',
    inventory: 50,
    rating: 4.7,
    reviewsCount: 2,
    reviews: [
      { id: 'rev-a4', userId: 'user-a4', userName: 'Explorer', rating: 5, comment: 'Packs into its own pocket. Ideal for trail runs.', date: '2026-07-11' }
    ],
    sellerId: 'sell-apparel',
    sellerName: 'AeroWear Labs',
    tags: ['clothes', 'windbreaker', 'waterproof', 'jacket'],
    specs: {
      'Weight': '110 grams',
      'Tear Rating': 'Ripstop Grade-4 reinforcement'
    }
  },
  {
    id: 'prod-55',
    name: 'Elysium Hand-Spun Cashmere Scarf',
    description: 'An exquisitely soft winter neck scarf sourced from traditional cashmere weavers of Himalayan goats. Warm, durable, and luxurious.',
    price: 120.00,
    category: 'Premium Apparel',
    image: 'https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?auto=format&fit=crop&q=80&w=600',
    inventory: 30,
    rating: 4.8,
    reviewsCount: 1,
    reviews: [
      { id: 'rev-a5', userId: 'user-a5', userName: 'LuxFashion', rating: 5, comment: 'Incredibly soft. Feels wonderful around the neck.', date: '2026-07-05' }
    ],
    sellerId: 'sell-apparel',
    sellerName: 'AeroWear Labs',
    tags: ['clothes', 'scarf', 'cashmere', 'luxury'],
    specs: {
      'Material': '100% Himalayan Cashmere',
      'Dimensions': '180cm x 35cm'
    }
  },

  // ==========================================
  // GIFTS & NOVELTIES (5 products)
  // ==========================================
  {
    id: 'prod-56',
    name: 'Nebula Crystal Eco Terrarium',
    description: 'A hand-blown geodesic glass vessel containing a self-sustaining miniature forest of rare mosses, requiring zero maintenance after setup.',
    price: 75.00,
    category: 'Gifts & Novelties',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600',
    inventory: 60,
    rating: 4.7,
    reviewsCount: 2,
    reviews: [
      { id: 'rev-g1', userId: 'user-g1', userName: 'PlantLover', rating: 5, comment: 'Looks incredible on my work desk. Self waters beautifully!', date: '2026-07-03' }
    ],
    sellerId: 'sell-luxury',
    sellerName: 'Apex Luxe',
    tags: ['gift', 'plant', 'terrarium', 'home'],
    specs: {
      'Glass Type': 'Ultra-clear borosilicate glass',
      'Ecosystem': 'Preserved live mosses, active charcoal filtration base'
    },
    versions: [
      { id: 'v-56-regular', name: 'Desktop Geodesic (15cm)', price: 75.00, inventory: 40, specs: { 'Dimensions': '15cm diameter' } },
      { id: 'v-56-large', name: 'Sovereign Spherical (25cm)', price: 125.00, inventory: 20, specs: { 'Dimensions': '25cm diameter' } }
    ]
  },
  {
    id: 'prod-57',
    name: 'Apex Precision Kinetic Desk Sculpture',
    description: 'An exceptional double-pendulum kinetic energy sculpture that moves in unpredictable, hypnotic chaotic loops, creating a soothing workspace companion.',
    price: 199.00,
    category: 'Gifts & Novelties',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600',
    inventory: 25,
    rating: 4.9,
    reviewsCount: 1,
    reviews: [
      { id: 'rev-g2', userId: 'user-g2', userName: 'ArtCollector', rating: 5, comment: 'Spins for days on end. Fascinating physics!', date: '2026-07-08' }
    ],
    sellerId: 'sell-luxury',
    sellerName: 'Apex Luxe',
    tags: ['gift', 'kinetic', 'art', 'sculpture'],
    specs: {
      'Drive Core': 'Low friction ruby bearing mounts',
      'Material': 'Anodized high grade aircraft aluminum'
    }
  },
  {
    id: 'prod-58',
    name: 'Sovereign Premium Gift Chest',
    description: 'A gorgeous dark walnut gift box containing hand-selected premium lifestyle accessories, including a matte steel pen and leather notebook.',
    price: 110.00,
    category: 'Gifts & Novelties',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600',
    inventory: 40,
    rating: 4.8,
    reviewsCount: 1,
    reviews: [
      { id: 'rev-g3', userId: 'user-g3', userName: 'CorporateGifter', rating: 5, comment: 'Extremely high build quality. Highly recommended for executives.', date: '2026-07-04' }
    ],
    sellerId: 'sell-luxury',
    sellerName: 'Apex Luxe',
    tags: ['gift', 'notebook', 'walnut', 'executive'],
    specs: {
      'Box': 'Sustainably harvested black walnut timber',
      'Contents': 'Refillable A5 leather journal, Apex Matte-Black Pen'
    }
  },
  {
    id: 'prod-59',
    name: 'Retro-Future Arcade Game Deck',
    description: 'A fully functional miniature handheld arcade console featuring 150 built-in indie retro games and an active physical joystick.',
    price: 249.00,
    category: 'Gifts & Novelties',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600',
    inventory: 35,
    rating: 4.6,
    reviewsCount: 2,
    reviews: [
      { id: 'rev-g4', userId: 'user-g4', userName: 'GamerKid', rating: 5, comment: 'Unbelievably nostalgic. The clicky buttons are satisfying!', date: '2026-07-06' }
    ],
    sellerId: 'sell-electronics',
    sellerName: 'AeroWear Labs',
    tags: ['gift', 'arcade', 'retro', 'gaming'],
    specs: {
      'Screen': '3.2-inch high contrast IPS panel',
      'Processor': 'Micro-Emulator Cortex Node'
    }
  },
  {
    id: 'prod-60',
    name: 'Levitating Earth Desk Globe',
    description: 'A beautiful geographical globe that hovers in mid-air above an electromagnetic base, rotating silently with glowing ambient LED lights.',
    price: 129.00,
    category: 'Gifts & Novelties',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600',
    inventory: 50,
    rating: 4.5,
    reviewsCount: 1,
    reviews: [
      { id: 'rev-g5', userId: 'user-g5', userName: 'Geographer', rating: 4, comment: 'Looks great in my study. Magnet is strong.', date: '2026-07-10' }
    ],
    sellerId: 'sell-luxury',
    sellerName: 'Apex Luxe',
    tags: ['gift', 'levitation', 'globe', 'ambient'],
    specs: {
      'Diameter': '6 inches sphere',
      'Levitation Distance': '12mm air gap height'
    }
  },

  // ==========================================
  // GADGETS & CYBER-GEAR (5 products)
  // ==========================================
  {
    id: 'prod-61',
    name: 'Apex Neural ANC Earbuds',
    description: 'Wireless in-ear audio buds utilizing custom digital sound filters to automatically map and cancel low and high environmental background chatter.',
    price: 189.00,
    category: 'Gadgets & Cyber-Gear',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=600',
    inventory: 60,
    rating: 4.8,
    reviewsCount: 3,
    reviews: [
      { id: 'rev-c1', userId: 'user-c1', userName: 'Commuter', rating: 5, comment: 'Blocks train rumbling completely. Terrific bass response.', date: '2026-07-07' }
    ],
    sellerId: 'sell-electronics',
    sellerName: 'AeroWear Labs',
    tags: ['gadgets', 'earbuds', 'anc', 'audio'],
    specs: {
      'Drivers': '11mm high fidelity beryllium transducers',
      'Battery Life': 'Up to 8 hours (32 hours with charge box)',
      'Noise Block': '45dB Hybrid Active Cancellation'
    },
    versions: [
      { id: 'v-61-standard', name: 'Neural Buds Classic', price: 189.00, inventory: 40, specs: { 'Finish': 'Matte Black' } },
      { id: 'v-61-luxe', name: 'Sovereign Carbon Finish', price: 249.00, inventory: 20, specs: { 'Finish': 'Premium Carbon Fiber weave', 'Drivers': '12mm Beryllium' } }
    ]
  },
  {
    id: 'prod-62',
    name: 'Nebula Mechanical Custom Keyboard',
    description: 'Hot-swappable mechanical writing deck featuring custom-lubed tactile switches, a thick aluminum structure, and beautiful RGB lighting configurations.',
    price: 179.00,
    category: 'Gadgets & Cyber-Gear',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=600',
    inventory: 35,
    rating: 4.9,
    reviewsCount: 2,
    reviews: [
      { id: 'rev-c2', userId: 'user-c2', userName: 'KeebNerd', rating: 5, comment: 'The acoustic profile is buttery smooth out of the box!', date: '2026-07-09' }
    ],
    sellerId: 'sell-electronics',
    sellerName: 'AeroWear Labs',
    tags: ['keyboard', 'mechanical', 'cyberpunk', 'gadgets'],
    specs: {
      'Form Factor': '75% Minimalist Layout (84 keys)',
      'Switches': 'Gateron Oil King Lubed linear switches',
      'Keycaps': 'Double-shot PBT cherry profiles'
    }
  },
  {
    id: 'prod-63',
    name: 'CyberGrip Ergonomic Mouse',
    description: 'An ergonomic high-precision cursor mouse constructed with a hand-conforming grip angle to eliminate wrist fatigue over long programming days.',
    price: 99.00,
    category: 'Gadgets & Cyber-Gear',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=600',
    inventory: 75,
    rating: 4.6,
    reviewsCount: 1,
    reviews: [
      { id: 'rev-c3', userId: 'user-c3', userName: 'ErgoFan', rating: 5, comment: 'My carpal tunnel symptoms vanished after switching.', date: '2026-07-03' }
    ],
    sellerId: 'sell-electronics',
    sellerName: 'AeroWear Labs',
    tags: ['mouse', 'ergonomic', 'gadgets', 'electronics'],
    specs: {
      'Sensor': 'Apex Precision 26,000 DPI Optical sensor',
      'Weight': '62 grams ultra-light'
    }
  },
  {
    id: 'prod-64',
    name: 'AeroPad Pro 12" Graphic Tablet',
    description: 'A pressure-sensitive wireless slate with zero parallax, designed to allow artists and designers to sketch fluid digital assets anywhere.',
    price: 399.00,
    category: 'Gadgets & Cyber-Gear',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=600',
    inventory: 20,
    rating: 4.7,
    reviewsCount: 1,
    reviews: [
      { id: 'rev-c4', userId: 'user-c4', userName: 'Illustrator', rating: 5, comment: 'Pressure sensitivity is incredibly linear.', date: '2026-07-08' }
    ],
    sellerId: 'sell-electronics',
    sellerName: 'AeroWear Labs',
    tags: ['tablet', 'design', 'gadgets', 'electronics'],
    specs: {
      'Active Area': '11.8 x 7.4 inches',
      'Pressure Levels': '8,192 levels of pen tilt tracking'
    }
  },
  {
    id: 'prod-65',
    name: 'Quantum Encrypted SSD 2TB',
    description: 'Ultra-fast external SSD enclosed in military-grade shockproof cases, featuring real-time on-chip AES-256 fingerprint hardware encryption.',
    price: 199.00,
    category: 'Gadgets & Cyber-Gear',
    image: 'https://images.unsplash.com/photo-1573148195900-7845dcb9b127?auto=format&fit=crop&q=80&w=600',
    inventory: 40,
    rating: 4.8,
    reviewsCount: 1,
    reviews: [
      { id: 'rev-c5', userId: 'user-c5', userName: 'SecurityEng', rating: 5, comment: 'Extremely secure, transfer speeds are blazing!', date: '2026-07-05' }
    ],
    sellerId: 'sell-electronics',
    sellerName: 'AeroWear Labs',
    tags: ['storage', 'ssd', 'gadgets', 'security'],
    specs: {
      'Transfer Speed': 'Up to 2,000 MB/s read-write',
      'Biometrics': 'Capacitive fingerprint scanner built-in'
    }
  },

  // ==========================================
  // PROGRAMMATIC BULK PRODUCTS TO TOTAL 80+
  // Let\'s write the remaining 30 items to reach high capacity seamlessly
  // ==========================================
  ...[
    // Additional Luxury Watches (3 products)
    { id: 'prod-66', name: 'AeroChrono Quartz Classic', price: 189.00, category: 'Watches & Wearables', tags: ['watch', 'quartz'], image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80&w=600', desc: 'Sleek premium quartz watch with an elegant silver-plated steel mesh strap.' },
    { id: 'prod-67', name: 'Chronos Digital Sport Band', price: 95.00, category: 'Watches & Wearables', tags: ['watch', 'sport'], image: 'https://images.unsplash.com/photo-1539874754764-5a96559165b0?auto=format&fit=crop&q=80&w=600', desc: 'Waterproof multi-sport watch with integrated GPS tracker and lap split memory.' },
    { id: 'prod-68', name: 'Sovereign Skeleton Automatic', price: 1250.00, category: 'Watches & Wearables', tags: ['watch', 'luxury'], image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=600', desc: 'Hand-crafted skeleton wristwatch displaying the intricate gears of an automatic system.' },

    // Additional Kitchen & Household (3 products)
    { id: 'prod-69', name: 'Multi-Core Electric Kettle', price: 79.99, category: 'Kitchen & Household', tags: ['kitchen', 'kettle'], image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600', desc: 'Double wall insulated electric heating kettle with six digital temperature adjustments.' },
    { id: 'prod-70', name: 'AeroAir Smart Convection Fryer', price: 149.00, category: 'Kitchen & Household', tags: ['kitchen', 'airfryer'], image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&q=80&w=600', desc: 'Digital air convection fryer with instant preheat and active crisp air circulation.' },
    { id: 'prod-71', name: 'ThermoShield Food Vacuum Sealer', price: 89.00, category: 'Kitchen & Household', tags: ['kitchen', 'sealer'], image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=600', desc: 'High-vacuum food sealer grid with adjustable pressure modes for fresh meal storage.' },

    // Additional Mobiles & Electronics (3 products)
    { id: 'prod-72', name: 'Nova Smart Stylus Pen', price: 49.00, category: 'Mobiles & Electronics', tags: ['electronics', 'stylus'], image: 'https://images.unsplash.com/photo-1565849906461-0965d344555a?auto=format&fit=crop&q=80&w=600', desc: 'Precision active digital stylus featuring magnetic induction charging and multi-tilt sensing.' },
    { id: 'prod-73', name: 'StarCharge Wireless Powerbank', price: 69.00, category: 'Mobiles & Electronics', tags: ['electronics', 'powerbank'], image: 'https://images.unsplash.com/photo-1573148195900-7845dcb9b127?auto=format&fit=crop&q=80&w=600', desc: 'High capacity 20,000mAh magnetic portable powerbank with status screens.' },
    { id: 'prod-74', name: 'AeroLink High-Speed Wi-Fi Router', price: 159.00, category: 'Mobiles & Electronics', tags: ['router', 'wifi'], image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600', desc: 'Triband Wi-Fi 6E mesh router designed for zero lag home spatial coverage.' },

    // Additional Smart TVs & Media (3 products)
    { id: 'prod-75', name: 'Studio Monitor Speakers Duo', price: 299.00, category: 'Smart TVs & Media', tags: ['audio', 'speakers'], image: 'https://images.unsplash.com/photo-1601944179066-297bdd5baf7c?auto=format&fit=crop&q=80&w=600', desc: 'High fidelity studio bookshelf speakers delivering crystalline highs and rich warm midtones.' },
    { id: 'prod-76', name: 'Nebula Smart Laser Projector Mini', price: 349.00, category: 'Smart TVs & Media', tags: ['projector', 'media'], image: 'https://images.unsplash.com/photo-1558885561-56c2a0915266?auto=format&fit=crop&q=80&w=600', desc: 'Pocket sized battery-powered movie projector streaming up to 100 inches anywhere.' },
    { id: 'prod-77', name: 'AudioLink ANC Wireless Over-Ears', price: 249.00, category: 'Smart TVs & Media', tags: ['audio', 'headphones'], image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=600', desc: 'Premium noise-cancelling headphones featuring luxury memory foam earcups and aptX lossless audio.' },

    // Additional Furniture & Office (3 products)
    { id: 'prod-78', name: 'Walnut Laptop Riser stand', price: 45.00, category: 'Furniture & Office', tags: ['office', 'walnut'], image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=600', desc: 'Sleek ergonomic laptop riser stand constructed from single pieces of walnut hardwood.' },
    { id: 'prod-79', name: 'ErgoSoft Anti-Fatigue Footrest', price: 39.00, category: 'Furniture & Office', tags: ['office', 'ergonomic'], image: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&q=80&w=600', desc: 'Contoured memory-foam underdesk footrest with soft anti-slip rubber lining.' },
    { id: 'prod-80', name: 'Modular Acrylic Cable Organizer', price: 24.00, category: 'Furniture & Office', tags: ['office', 'minimalist'], image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600', desc: 'Crystal-clear magnetic desk cable routing docks to organize power lines.' },

    // Additional Skincare & Perfumes (3 products)
    { id: 'prod-81', name: 'Citrus Squeeze Refreshing Cleanser', price: 28.00, category: 'Skincare & Perfumes', tags: ['skincare', 'organic'], image: 'https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=600', desc: 'Refreshing morning gel cleanser infused with orange vitamins and natural AHA oils.' },
    { id: 'prod-82', name: 'Pure Lavender Calming Tonic', price: 32.00, category: 'Skincare & Perfumes', tags: ['skincare', 'lavender'], image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=600', desc: 'Soothing organic skin toner distillate derived from premium Provencal lavender blooms.' },
    { id: 'prod-83', name: 'Elysium Amber Wood Cologne', price: 110.00, category: 'Skincare & Perfumes', tags: ['perfume', 'luxury'], image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600', desc: 'Masculine woody cologne opening with clean pine and landing on deep warm amber resin.' },

    // Additional Health & Wellness (3 products)
    { id: 'prod-84', name: 'Soreness-Release Muscle Roller', price: 29.00, category: 'Health & Wellness', tags: ['health', 'fitness'], image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=600', desc: 'High density contoured foam roller designed to stretch out stiff knots.' },
    { id: 'prod-85', name: 'Aura Sound White-Noise Player', price: 59.00, category: 'Health & Wellness', tags: ['health', 'sleep'], image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=600', desc: 'Soothing white-noise and ambient forest sound synthesiser with custom timer settings.' },
    { id: 'prod-86', name: 'Nebula Smart Pillbox Organizer', price: 45.00, category: 'Health & Wellness', tags: ['health', 'smart'], image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600', desc: 'App-synced medical pillbox featuring automated reminders and physical security locks.' },

    // Additional Premium Apparel (3 products)
    { id: 'prod-87', name: 'Merino Wool Athletic Socks', price: 22.00, category: 'Premium Apparel', tags: ['clothes', 'socks'], image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=600', desc: 'Blister-resistant merino wool performance running socks.' },
    { id: 'prod-88', name: 'AeroFlex Stretch Travel Pants', price: 115.00, category: 'Premium Apparel', tags: ['clothes', 'pants'], image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600', desc: 'Spill-repelling 4-way stretch commuter trousers with hidden zippered security pockets.' },
    { id: 'prod-89', name: 'Nova Organic Linen Button-Down', price: 79.00, category: 'Premium Apparel', tags: ['clothes', 'shirt'], image: 'https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?auto=format&fit=crop&q=80&w=600', desc: 'Light and airy classic button-down shirt woven from 100% sustainable organic flax fibers.' },

    // Additional Gifts & Novelties (3 products)
    { id: 'prod-90', name: 'Minimalist Sand timer Clock', price: 34.00, category: 'Gifts & Novelties', tags: ['gift', 'minimalist'], image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600', desc: 'Beautiful hourglass glass filled with fine magnetic black sand.' },
    { id: 'prod-91', name: 'Cyberpunk LED Neon desk Lamp', price: 49.00, category: 'Gifts & Novelties', tags: ['gift', 'lighting'], image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600', desc: 'Interactive sound-reactive glowing LED tube bar for workspace setups.' },
    { id: 'prod-92', name: 'AeroAir Levitating Plant Pot', price: 89.00, category: 'Gifts & Novelties', tags: ['gift', 'plant'], image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600', desc: 'Levitating magnetic geometric plant pot floating in mid-air over a walnut base.' },

    // Additional Gadgets & Cyber-Gear (3 products)
    { id: 'prod-93', name: 'Apex Multiport USB-C Hub', price: 59.00, category: 'Gadgets & Cyber-Gear', tags: ['gadgets', 'electronics'], image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=600', desc: 'Aluminum 8-in-1 multi-port adapters with HDMI 4K projection, Ethernet, and SD grids.' },
    { id: 'prod-94', name: 'Quantum Mouse Pad XL (Felt)', price: 39.00, category: 'Gadgets & Cyber-Gear', tags: ['gadgets', 'office'], image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=600', desc: 'Luxurious thick grey wool felt desk protector mat with rubber bottom stabilizers.' },
    { id: 'prod-95', name: 'Apex Ring Smart Biometrics', price: 299.00, category: 'Gadgets & Cyber-Gear', tags: ['gadgets', 'wearable'], image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=600', desc: 'Ultra lightweight titanium smart ring monitoring sleep cycles and body energy.' }
  ].map((p, i) => {
    return {
      id: p.id,
      name: p.name,
      description: p.desc,
      price: p.price,
      category: p.category,
      image: p.image,
      inventory: Math.floor(Math.random() * 60) + 15,
      rating: parseFloat((4.3 + Math.random() * 0.6).toFixed(1)),
      reviewsCount: 1,
      reviews: [
        {
          id: `rev-gen-${p.id}`,
          userId: `user-gen-${p.id}`,
          userName: ['Aarav Sharma', 'Chloe Dubois', 'Kenji Takahashi', 'Liam O\'Connor', 'Elena Petrova', 'Sowmya Mendum', 'Marcus Vance'][i % 7],
          rating: 5,
          comment: `Absolutely incredible quality! Perfectly matches the specifications and exceeded my expectations. Highly recommended.`,
          date: '2026-07-15'
        }
      ],
      sellerId: 'sell-1',
      sellerName: 'AeroWear Labs',
      tags: p.tags,
      specs: {
        'Material': 'Premium Composite',
        'Model Range': 'Apex Standard Class',
        'Warranty': '1 Year Full Protection'
      },
      isFeatured: i < 2
    };
  })
];
