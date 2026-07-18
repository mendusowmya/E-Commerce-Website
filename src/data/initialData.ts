import { Product, BlogPost } from '../types';
import { GENERATED_PRODUCTS } from './generatedProducts';

export const CATEGORIES = [
  'Futuristic Wear',
  'Ambient Living',
  'Cybernetic Gear',
  'Eco Luxury',
  'Smart Wellness',
  'Watches & Wearables',
  'Mobiles & Electronics',
  'Smart TVs & Media',
  'Kitchen & Household',
  'Furniture & Office',
  'Skincare & Perfumes',
  'Health & Wellness',
  'Premium Apparel',
  'Gifts & Novelties',
  'Gadgets & Cyber-Gear'
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'AeroShell Active Trenchcoat',
    description: 'An advanced, dynamic weatherproofing outer shell with micro-ventilation and thermo-chromic response panels. Adapts in real-time to sudden climate shifts.',
    price: 349.99,
    category: 'Futuristic Wear',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600',
    inventory: 45,
    rating: 4.8,
    reviewsCount: 12,
    reviews: [
      { id: 'rev-1', userId: 'user-1', userName: 'John Doe', rating: 5, comment: 'Incredible weather adaptation! Wore it during a sudden rainstorm and it repelled moisture perfectly while adjusting internal temperature.', date: '2026-07-10' },
      { id: 'rev-2', userId: 'user-2', userName: 'Alice Smith', rating: 4.5, comment: 'Super lightweight and the color changes slightly in cold weather. Got lots of compliments!', date: '2026-07-12' }
    ],
    sellerId: 'sell-1',
    sellerName: 'AeroWear Labs',
    tags: ['outerwear', 'thermochromic', 'waterproof', 'techwear'],
    specs: {
      'Material': 'AeroGraphene G3 Composite',
      'Weight': '350 grams',
      'Waterproof Rating': '25,000mm hydrostatic head',
      'Breathability': '30,000 g/m²/24h',
      'Pockets': '6 magnetic security compartments'
    },
    isFeatured: true,
    versions: [
      {
        id: 'v-1-lite',
        name: 'Model G2 - Lite Edition',
        price: 279.99,
        inventory: 15,
        specs: {
          'Material': 'AeroGraphene G2 Composite',
          'Weight': '300 grams',
          'Waterproof Rating': '15,000mm hydrostatic head',
          'Breathability': '20,000 g/m²/24h',
          'Pockets': '4 zip compartments'
        }
      },
      {
        id: 'v-1-active',
        name: 'Model G3 - Active Edition',
        price: 349.99,
        inventory: 45,
        specs: {
          'Material': 'AeroGraphene G3 Composite',
          'Weight': '350 grams',
          'Waterproof Rating': '25,000mm hydrostatic head',
          'Breathability': '30,000 g/m²/24h',
          'Pockets': '6 magnetic security compartments'
        }
      },
      {
        id: 'v-1-sovereign',
        name: 'Model G4 - Sovereign Elite',
        price: 499.99,
        inventory: 10,
        specs: {
          'Material': 'AeroGraphene Platinum Matrix',
          'Weight': '380 grams',
          'Waterproof Rating': '40,000mm hydrostatic head',
          'Breathability': '45,000 g/m²/24h',
          'Pockets': '8 climate-isolated chambers'
        }
      }
    ]
  },
  {
    id: 'prod-2',
    name: 'Lumira Sol Ambient Lamp',
    description: 'A responsive visual wellness companion. Synchronizes with your circadian cycle, emitting low-blue spectrums for twilight relaxation and bright, natural spectrums for energetic mornings.',
    price: 189.00,
    category: 'Ambient Living',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600',
    inventory: 12,
    rating: 4.9,
    reviewsCount: 8,
    reviews: [
      { id: 'rev-3', userId: 'user-3', userName: 'David Miller', rating: 5, comment: 'Seriously cured my morning brain fog. It slowly fades in mimicking a dawn sunrise. Life-changing.', date: '2026-07-05' }
    ],
    sellerId: 'sell-2',
    sellerName: 'Lumira Living',
    tags: ['lighting', 'circadian', 'wellness', 'smarthome'],
    specs: {
      'Light Source': 'Circadian Spectrum LED Array',
      'Luminous Flux': '1200 lumens peak',
      'Connectivity': 'Bluetooth 5.2 / Matter Compatible',
      'Power Input': 'USB-C (Power Delivery)',
      'Dimensions': '14cm x 14cm x 22cm'
    },
    isFeatured: true,
    versions: [
      {
        id: 'v-2-aura',
        name: 'Model Aura - Compact (Bedside)',
        price: 129.00,
        inventory: 20,
        specs: {
          'Light Source': 'Circadian Spectrum LED Array',
          'Luminous Flux': '800 lumens peak',
          'Connectivity': 'Bluetooth 5.2',
          'Power Input': 'USB-C (15W)',
          'Dimensions': '10cm x 10cm x 16cm'
        }
      },
      {
        id: 'v-2-sol',
        name: 'Model Sol - Standard (Living Room)',
        price: 189.00,
        inventory: 12,
        specs: {
          'Light Source': 'Circadian Spectrum LED Array',
          'Luminous Flux': '1200 lumens peak',
          'Connectivity': 'Bluetooth 5.2 / Matter Compatible',
          'Power Input': 'USB-C (Power Delivery)',
          'Dimensions': '14cm x 14cm x 22cm'
        }
      },
      {
        id: 'v-2-zenith',
        name: 'Model Zenith - Pro Studio',
        price: 299.00,
        inventory: 8,
        specs: {
          'Light Source': 'High-Intensity Circadian Array',
          'Luminous Flux': '2400 lumens peak',
          'Connectivity': 'Wi-Fi 6E / Matter / Bluetooth 5.3',
          'Power Input': 'USB-C PD (100W)',
          'Dimensions': '18cm x 18cm x 30cm'
        }
      }
    ]
  },
  {
    id: 'prod-3',
    name: 'NeuralBand Focus VR Headband',
    description: 'Ultralight EEG sensing band designed to map mental state and guide your workflow. Emits soothing audio frequencies to lock you into deep concentration or facilitate rapid recovery.',
    price: 299.50,
    category: 'Cybernetic Gear',
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=600',
    inventory: 20,
    rating: 4.6,
    reviewsCount: 15,
    reviews: [
      { id: 'rev-4', userId: 'user-4', userName: 'Emily Watson', rating: 5, comment: 'Excellent focus tracking! The haptic cue when I lose attention really works to bring me back.', date: '2026-07-08' }
    ],
    sellerId: 'sell-1',
    sellerName: 'AeroWear Labs',
    tags: ['wearable', 'productivity', 'eeg', 'biofeedback'],
    specs: {
      'Sensors': '7-channel dry EEG sensors',
      'Battery Life': 'Up to 16 hours of continuous use',
      'Audio': 'Dual bone-conduction transducers',
      'Weight': '85 grams',
      'Material': 'Allergen-free memory fabric'
    },
    isFeatured: true,
    versions: [
      {
        id: 'v-3-lite',
        name: 'Model Alpha - Focus Lite',
        price: 199.00,
        inventory: 15,
        specs: {
          'Sensors': '3-channel dry EEG sensors',
          'Battery Life': 'Up to 10 hours of continuous use',
          'Audio': 'Single bone-conduction transducer',
          'Weight': '95 grams',
          'Material': 'Allergen-free polymer strap'
        }
      },
      {
        id: 'v-3-pro',
        name: 'Model Beta - Focus Pro',
        price: 299.50,
        inventory: 20,
        specs: {
          'Sensors': '7-channel dry EEG sensors',
          'Battery Life': 'Up to 16 hours of continuous use',
          'Audio': 'Dual bone-conduction transducers',
          'Weight': '85 grams',
          'Material': 'Allergen-free memory fabric'
        }
      },
      {
        id: 'v-3-omni',
        name: 'Model Omega - Deep Neuroscience',
        price: 450.00,
        inventory: 10,
        specs: {
          'Sensors': '16-channel gold-coated EEG',
          'Battery Life': 'Up to 24 hours of continuous use',
          'Audio': 'Holographic surround bone-conduction',
          'Weight': '70 grams',
          'Material': 'Carbon fiber weave & breathable silk'
        }
      }
    ]
  },
  {
    id: 'prod-4',
    name: 'Verdant Earth Bloom Planter',
    description: 'Self-sustaining botanical planter utilizing aerospace root aeration and dynamic nutrient misting. Perfect for cultivating complex indoor micro-greens or rare orchids effortlessly.',
    price: 125.00,
    category: 'Eco Luxury',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=600',
    inventory: 30,
    rating: 4.7,
    reviewsCount: 6,
    reviews: [
      { id: 'rev-5', userId: 'user-5', userName: 'Michael Chen', rating: 4, comment: 'My basil grew twice as fast as normal! Very quiet misting system too.', date: '2026-07-01' }
    ],
    sellerId: 'sell-3',
    sellerName: 'Verdant Tech',
    tags: ['botany', 'aeroponics', 'interior', 'sustainable'],
    specs: {
      'Misting Method': 'High-frequency ultrasonic misting',
      'Water Capacity': '2.5 Liters (Up to 4 weeks autonomy)',
      'Lighting': '60W Full-spectrum growth LEDs',
      'Material': 'Recycled marine plastic & cork'
    },
    versions: [
      {
        id: 'v-4-bud',
        name: 'Model Bud - Compact Seedling',
        price: 95.00,
        inventory: 40,
        specs: {
          'Misting Method': 'Micro ultrasonic nozzle',
          'Water Capacity': '1.0 Liter (Up to 2 weeks autonomy)',
          'Lighting': '25W Full-spectrum growth LEDs',
          'Material': 'Recycled bio-cork composite'
        }
      },
      {
        id: 'v-4-bloom',
        name: 'Model Bloom - Standard Botanical',
        price: 125.00,
        inventory: 30,
        specs: {
          'Misting Method': 'High-frequency ultrasonic misting',
          'Water Capacity': '2.5 Liters (Up to 4 weeks autonomy)',
          'Lighting': '60W Full-spectrum growth LEDs',
          'Material': 'Recycled marine plastic & cork'
        }
      },
      {
        id: 'v-4-canopy',
        name: 'Model Canopy - Professional Grow',
        price: 220.00,
        inventory: 15,
        specs: {
          'Misting Method': 'Quad aeroponic pressure nozzles',
          'Water Capacity': '6.0 Liters (Up to 8 weeks autonomy)',
          'Lighting': '120W Smart Adaptive growth LEDs',
          'Material': 'Biodegradable bamboo-carbon composite'
        }
      }
    ]
  },
  {
    id: 'prod-5',
    name: 'Somnus Air Sleep Ring',
    description: 'The slimmest titanium biometric tracker on earth. Continuously monitors respiratory efficiency, skin temperature, and sleep phases to optimize your circadian recovery.',
    price: 249.00,
    category: 'Smart Wellness',
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=600',
    inventory: 18,
    rating: 4.5,
    reviewsCount: 22,
    reviews: [
      { id: 'rev-6', userId: 'user-6', userName: 'Sarah Jenkins', rating: 5, comment: 'So comfortable to wear during sleep. The app metrics are beautifully detailed.', date: '2026-06-28' }
    ],
    sellerId: 'sell-3',
    sellerName: 'Verdant Tech',
    tags: ['wellness', 'sleep', 'biometrics', 'titanium'],
    specs: {
      'Material': 'Aerospace Grade Titanium (Grade 5)',
      'Water Resistance': '100 meters (10 ATM)',
      'Charging': 'Wireless contact charger (Full in 45 min)',
      'Weight': '4 grams'
    },
    versions: [
      {
        id: 'v-5-classic',
        name: 'Model S - Classic Sleep',
        price: 199.00,
        inventory: 25,
        specs: {
          'Material': 'Satin Finish Titanium (Grade 2)',
          'Water Resistance': '50 meters (5 ATM)',
          'Charging': 'Wired magnetic dock (Full in 60 min)',
          'Weight': '5 grams'
        }
      },
      {
        id: 'v-5-air',
        name: 'Model S Pro - Ultralight Active',
        price: 249.00,
        inventory: 18,
        specs: {
          'Material': 'Aerospace Grade Titanium (Grade 5)',
          'Water Resistance': '100 meters (10 ATM)',
          'Charging': 'Wireless contact charger (Full in 45 min)',
          'Weight': '4 grams'
        }
      },
      {
        id: 'v-5-quantum',
        name: 'Model Omega - Bio-Quantum Matrix',
        price: 349.00,
        inventory: 12,
        specs: {
          'Material': 'Diamond-Like Carbon Coated Gold-Titanium Matrix',
          'Water Resistance': '200 meters (20 ATM)',
          'Charging': 'Inductive ambient resonance charger',
          'Weight': '3.5 grams'
        }
      }
    ]
  },
  {
    id: 'prod-6',
    name: 'Vector Carbon Smart Backpack',
    description: 'A modular, carbon-fiber reinforced commuter pack with integrated solar harvesting, dual laptop sleeves, and an electromagnetic security lock to prevent unauthorized access.',
    price: 210.00,
    category: 'Cybernetic Gear',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600',
    inventory: 8,
    rating: 4.4,
    reviewsCount: 14,
    reviews: [
      { id: 'rev-7', userId: 'user-7', userName: 'Alex Rivera', rating: 4, comment: 'Very protective and matches my tech aesthetic. Solar charger is handy in direct sunlight.', date: '2026-07-02' }
    ],
    sellerId: 'sell-2',
    sellerName: 'Lumira Living',
    tags: ['backpack', 'commuter', 'solar', 'security'],
    specs: {
      'Exterior Shell': '3K Matte Carbon Fiber Twill',
      'Solar Panel': '8W High-efficiency monocrystalline',
      'USB Ports': '1x USB-C PD, 1x USB-A QC 3.0',
      'Capacity': '26 Liters, expandable to 32'
    },
    versions: [
      {
        id: 'v-6-standard',
        name: 'Model V1 - Urban Poly',
        price: 149.00,
        inventory: 15,
        specs: {
          'Exterior Shell': 'Recycled Polycarbonate Hard Shell',
          'Solar Panel': '5W Standard monocrystalline',
          'USB Ports': '1x USB-A charging port',
          'Capacity': '22 Liters fixed'
        }
      },
      {
        id: 'v-6-carbon',
        name: 'Model V2 - Carbon Pro',
        price: 210.00,
        inventory: 8,
        specs: {
          'Exterior Shell': '3K Matte Carbon Fiber Twill',
          'Solar Panel': '8W High-efficiency monocrystalline',
          'USB Ports': '1x USB-C PD, 1x USB-A QC 3.0',
          'Capacity': '26 Liters, expandable to 32'
        }
      },
      {
        id: 'v-6-elite',
        name: 'Model V3 - Command Elite',
        price: 320.00,
        inventory: 5,
        specs: {
          'Exterior Shell': 'Aerospace 6K Woven Carbon Weave',
          'Solar Panel': '12W Solar-Tracking Composite Film',
          'USB Ports': '2x USB-C PD (65W/30W), 1x Qi wireless transmitter pocket',
          'Capacity': '32 Liters, modular snap-on system'
        }
      }
    ]
  },
  {
    id: 'prod-7',
    name: 'KinetiX Adaptable Sneakers',
    description: 'Smart athletic footwear designed with magnetic-rheological shock absorption, motor-driven lace-tension locks, and self-cleaning molecular coating.',
    price: 240.00,
    category: 'Futuristic Wear',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
    inventory: 16,
    rating: 4.7,
    reviewsCount: 11,
    reviews: [
      { id: 'rev-8', userId: 'user-8', userName: 'Chris Pine', rating: 5, comment: 'Lacing motor sounds like sci-fi! The sole adjusts stiffness on the fly when I start sprinting.', date: '2026-07-06' }
    ],
    sellerId: 'sell-1',
    sellerName: 'AeroWear Labs',
    tags: ['shoes', 'sneakers', 'kinetic', 'apparel'],
    specs: {
      'Auto-lacing': 'Smart Fit v1 Micro-Gear Motor',
      'Soles': 'Carbon-infused Spring Plate',
      'Weight': '180 grams',
      'Dynamic Stiffness': 'Electro-fluid damping',
      'Waterproof': 'Hydrophobic nano-seal'
    },
    versions: [
      {
        id: 'v-7-sprint',
        name: 'Model Velocity - Sprint Edition',
        price: 180.00,
        inventory: 20,
        specs: {
          'Auto-lacing': 'Manual dual-dial secure adjust',
          'Soles': 'Gel-infused responsive cell',
          'Weight': '210 grams',
          'Dynamic Stiffness': 'Static high-density bounce',
          'Waterproof': 'DWR spray finish'
        }
      },
      {
        id: 'v-7-marathon',
        name: 'Model Aero - Marathon Elite',
        price: 240.00,
        inventory: 16,
        specs: {
          'Auto-lacing': 'Smart Fit v1 Micro-Gear Motor',
          'Soles': 'Carbon-infused Spring Plate',
          'Weight': '180 grams',
          'Dynamic Stiffness': 'Electro-fluid damping',
          'Waterproof': 'Hydrophobic nano-seal'
        }
      },
      {
        id: 'v-7-quantum',
        name: 'Model Chrono - Kinetic Sovereign',
        price: 360.00,
        inventory: 8,
        specs: {
          'Auto-lacing': 'Neuromorphic Instant Auto-Tighten',
          'Soles': 'Active Magneto-Rheological Smart Fluid',
          'Weight': '165 grams',
          'Dynamic Stiffness': 'Sensory real-time micro-adjustments',
          'Waterproof': 'Perpetual molecular vapor barrier'
        }
      }
    ]
  },
  {
    id: 'prod-8',
    name: 'AuraFlow Soundwave Sculptor',
    description: 'An advanced, magnetic levitation sculpture using ferrofluid droplets suspended in a sealed acoustic resonance chamber, reacting visually to background sound waves.',
    price: 195.00,
    category: 'Ambient Living',
    image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=600',
    inventory: 14,
    rating: 4.8,
    reviewsCount: 5,
    reviews: [
      { id: 'rev-9', userId: 'user-9', userName: 'Mia Wong', rating: 5, comment: 'Watching the black liquid dance to classical jazz music is incredibly hypnotic. Everyone who visits is amazed!', date: '2026-07-09' }
    ],
    sellerId: 'sell-2',
    sellerName: 'Lumira Living',
    tags: ['sculpture', 'acoustic', 'ferrofluid', 'decor'],
    specs: {
      'Fluid Volume': '50ml high-purity ferrofluid',
      'Levitation Range': '1.5cm air gap',
      'Chamber Gas': 'Helium-isolated low drag',
      'Battery': 'Rechargeable Li-Ion (6 hours)',
      'Connectivity': 'Bluetooth 5.1'
    },
    versions: [
      {
        id: 'v-8-micro',
        name: 'Model Micro - Desk Companion',
        price: 140.00,
        inventory: 20,
        specs: {
          'Fluid Volume': '25ml standard ferrofluid',
          'Levitation Range': '1.0cm air gap',
          'Chamber Gas': 'Nitrogen-stabilized',
          'Battery': 'Rechargeable Li-Ion (4 hours)',
          'Connectivity': 'Bluetooth 5.0'
        }
      },
      {
        id: 'v-8-space',
        name: 'Model Macro - Living Space Deluxe',
        price: 195.00,
        inventory: 14,
        specs: {
          'Fluid Volume': '50ml high-purity ferrofluid',
          'Levitation Range': '1.5cm air gap',
          'Chamber Gas': 'Helium-isolated low drag',
          'Battery': 'Rechargeable Li-Ion (6 hours)',
          'Connectivity': 'Bluetooth 5.1'
        }
      },
      {
        id: 'v-8-symphony',
        name: 'Model Symphony - Audiophile Infinite',
        price: 340.00,
        inventory: 6,
        specs: {
          'Fluid Volume': '150ml reactive colloidal matrix',
          'Levitation Range': '3.0cm dual-pole air gap',
          'Chamber Gas': 'Vacuum insulated perpetual sealing',
          'Battery': 'Wireless charging continuous loop',
          'Connectivity': 'Wi-Fi 6 / AirPlay 2 / Bluetooth 5.3'
        }
      }
    ]
  },
  {
    id: 'prod-9',
    name: 'SolaRain Atmospheric Condenser',
    description: 'Elegant dining carafe that extracts molecular water vapor directly from ambient indoor air, filters it through a charcoal microgrid, and infuses essential trace minerals.',
    price: 380.00,
    category: 'Eco Luxury',
    image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&q=80&w=600',
    inventory: 9,
    rating: 4.6,
    reviewsCount: 7,
    reviews: [
      { id: 'rev-10', userId: 'user-10', userName: 'Leo Messi', rating: 4.5, comment: 'Pulls pure, delicious water out of nowhere. It sounds like a whisper. Perfect for dry climates.', date: '2026-06-30' }
    ],
    sellerId: 'sell-3',
    sellerName: 'Verdant Tech',
    tags: ['water', 'aeroponic', 'sustainable', 'carafe'],
    specs: {
      'Water Generation Rate': '1.2 Liters per 24 hours',
      'Filter Matrix': 'Coconut charcoal + Ionic silver membrane',
      'Mineral Infusion': 'Magnesium, Calcium, Potassium',
      'Power Source': 'Rechargeable solar base + USB-C',
      'Capacity': '1.8 Liters storage'
    },
    versions: [
      {
        id: 'v-9-oasis',
        name: 'Model Oasis - Daily Carafe',
        price: 380.00,
        inventory: 9,
        specs: {
          'Water Generation Rate': '1.2 Liters per 24 hours',
          'Filter Matrix': 'Coconut charcoal + Ionic silver membrane',
          'Mineral Infusion': 'Magnesium, Calcium, Potassium',
          'Power Source': 'Rechargeable solar base + USB-C',
          'Capacity': '1.8 Liters storage'
        }
      },
      {
        id: 'v-9-fountain',
        name: 'Model Fountain - Estate Dispenser',
        price: 590.00,
        inventory: 4,
        specs: {
          'Water Generation Rate': '3.5 Liters per 24 hours',
          'Filter Matrix': 'Quad-Core ultrafiltration with UV sterilization',
          'Mineral Infusion': 'Full-Spectrum volcanic minerals',
          'Power Source': 'Matter plug-in + Integrated photovoltaic',
          'Capacity': '5.0 Liters storage'
        }
      }
    ]
  },
  {
    id: 'prod-10',
    name: 'PulseRespirator Smart Mask',
    description: 'Active biological barrier featuring dual micro-turbines, clinical HEPA-H13 particulate filters, and integrated bone-conduction vocal amplification.',
    price: 110.00,
    category: 'Smart Wellness',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600',
    inventory: 24,
    rating: 4.7,
    reviewsCount: 18,
    reviews: [
      { id: 'rev-11', userId: 'user-11', userName: 'Diana Prince', rating: 5, comment: 'Saves me from city smog. Fans make breathing totally effortless while biking uphill. Mic amplification is clear.', date: '2026-07-04' }
    ],
    sellerId: 'sell-3',
    sellerName: 'Verdant Tech',
    tags: ['wellness', 'mask', 'filter', 'respiratory'],
    specs: {
      'Particulate Rating': 'HEPA H13 (99.97% of 0.3 microns)',
      'Airstream Fans': 'Dual speed micro-turbines',
      'Vocal Amp': 'Bluetooth 5.0 bone-conduction mic',
      'Weight': '110 grams',
      'Seal Trim': 'Hypoallergenic silicone memory contour'
    },
    versions: [
      {
        id: 'v-10-air',
        name: 'Model Air - Daily Defense',
        price: 79.00,
        inventory: 35,
        specs: {
          'Particulate Rating': 'HEPA H11 (95% filter)',
          'Airstream Fans': 'Passive exhaust valves',
          'Vocal Amp': 'No amplification',
          'Weight': '80 grams',
          'Seal Trim': 'Standard neoprene'
        }
      },
      {
        id: 'v-10-pro',
        name: 'Model Pro - Active Urban',
        price: 110.00,
        inventory: 24,
        specs: {
          'Particulate Rating': 'HEPA H13 (99.97% of 0.3 microns)',
          'Airstream Fans': 'Dual speed micro-turbines',
          'Vocal Amp': 'Bluetooth 5.0 bone-conduction mic',
          'Weight': '110 grams',
          'Seal Trim': 'Hypoallergenic silicone memory contour'
        }
      },
      {
        id: 'v-10-shield',
        name: 'Model Shield - Tactical CBRN',
        price: 245.00,
        inventory: 10,
        specs: {
          'Particulate Rating': 'Military Grade CBRN canisters + HEPA H14',
          'Airstream Fans': 'Quad speed auto-throttling fans',
          'Vocal Amp': 'Integrated surround sound voice synthesizer',
          'Weight': '195 grams',
          'Seal Trim': 'Tactical double-seal fluoroelastomer'
        }
      }
    ]
  },
  {
    id: 'prod-11',
    name: 'CyberGrip VR Haptic Gloves',
    description: 'High-fidelity VR interaction gloves featuring dynamic string-tension resistive force, micro-peltier thermal simulation plates, and sub-millimeter optical finger tracking.',
    price: 499.00,
    category: 'Cybernetic Gear',
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=600',
    inventory: 10,
    rating: 4.8,
    reviewsCount: 9,
    reviews: [
      { id: 'rev-12', userId: 'user-12', userName: 'Bruce Wayne', rating: 5, comment: 'The physical resistance when grabbing virtual tools is unmatched. Feeling hot and cold is mind-blowing.', date: '2026-07-03' }
    ],
    sellerId: 'sell-1',
    sellerName: 'AeroWear Labs',
    tags: ['gloves', 'vr', 'haptic', 'gaming'],
    specs: {
      'Tracking Accuracy': '0.5mm spatial resolution',
      'Tension Resistance': 'Up to 20N force feedback per finger',
      'Thermal Control': 'Micro Peltier tiles (15°C to 45°C)',
      'Connection': 'Ultra-wideband 2.4Ghz direct link',
      'Skin Material': 'Reinforced aramid flex-yarn'
    },
    versions: [
      {
        id: 'v-11-alpha',
        name: 'Model Alpha - Kinetic Haptic',
        price: 299.00,
        inventory: 15,
        specs: {
          'Tracking Accuracy': '1.5mm spatial resolution',
          'Tension Resistance': 'Vibrational pulse nodes only',
          'Thermal Control': 'No thermal plates',
          'Connection': 'Bluetooth 5.2 link',
          'Skin Material': 'Stretch spandex'
        }
      },
      {
        id: 'v-11-sigma',
        name: 'Model Sigma - Thermal Force',
        price: 499.00,
        inventory: 10,
        specs: {
          'Tracking Accuracy': '0.5mm spatial resolution',
          'Tension Resistance': 'Up to 20N force feedback per finger',
          'Thermal Control': 'Micro Peltier tiles (15°C to 45°C)',
          'Connection': 'Ultra-wideband 2.4Ghz direct link',
          'Skin Material': 'Reinforced aramid flex-yarn'
        }
      },
      {
        id: 'v-11-omega',
        name: 'Model Omega - Cyber Realist Pro',
        price: 890.00,
        inventory: 4,
        specs: {
          'Tracking Accuracy': '0.1mm neuromorphically enhanced',
          'Tension Resistance': 'Up to 45N active pneumatic force feedback',
          'Thermal Control': 'Quad-junction Peltier tiles (5°C to 65°C)',
          'Connection': 'Wireless UWB + Sub-millisecond proprietary protocol',
          'Skin Material': 'Premium artificial bio-skin matrix'
        }
      }
    ]
  },
  {
    id: 'prod-12',
    name: 'Graphene Thermal Cashmere Throw',
    description: 'Luxurious, natural organic Mongolian cashmere throw blanket woven with carbon-graphene threads. Provides deep far-infrared warmth safely and evenly.',
    price: 250.00,
    category: 'Eco Luxury',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600',
    inventory: 15,
    rating: 4.9,
    reviewsCount: 14,
    reviews: [
      { id: 'rev-13', userId: 'user-13', userName: 'Selina Kyle', rating: 5, comment: 'So incredibly soft, and the warmth is like sunshine on your skin rather than a dry heating pad. Absolutely gorgeous!', date: '2026-07-01' }
    ],
    sellerId: 'sell-3',
    sellerName: 'Verdant Tech',
    tags: ['blanket', 'cashmere', 'graphene', 'heating'],
    specs: {
      'Blanket Dimensions': '125cm x 150cm (Lounge)',
      'Heating Threading': '0.05mm flexible carbon-graphene wires',
      'Temperature Zones': '4 independent heating quadrants',
      'Power Connector': 'Magnetic quick-release lock with 10k mAh pack',
      'Material': '95% Mongolian Cashmere, 5% Graphene'
    },
    versions: [
      {
        id: 'v-12-lounge',
        name: 'Model Lounge - Single Throw',
        price: 250.00,
        inventory: 15,
        specs: {
          'Blanket Dimensions': '125cm x 150cm (Lounge)',
          'Heating Threading': '0.05mm flexible carbon-graphene wires',
          'Temperature Zones': '4 independent heating quadrants',
          'Power Connector': 'Magnetic quick-release lock with 10k mAh pack',
          'Material': '95% Mongolian Cashmere, 5% Graphene'
        }
      },
      {
        id: 'v-12-king',
        name: 'Model King - Bed Sovereign',
        price: 399.00,
        inventory: 8,
        specs: {
          'Blanket Dimensions': '200cm x 225cm (King)',
          'Heating Threading': 'Double-density graphene grid',
          'Temperature Zones': '8 independent dual-temperature zones',
          'Power Connector': 'Wall plug-in controller with smart home integration',
          'Material': '98% Ultra-soft Mongolian Cashmere, 2% Graphene'
        }
      }
    ]
  },
  {
    id: 'prod-13',
    name: 'Chronos Sandglass Quantum Clock',
    description: 'An interactive ambient time-keeper utilizing high-viscosity mineral oils, magnetic nano-particles, and program-controlled electromagnet arrays to shape digital clock readouts and graphic sands.',
    price: 160.00,
    category: 'Ambient Living',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=600',
    inventory: 19,
    rating: 4.7,
    reviewsCount: 10,
    reviews: [
      { id: 'rev-14', userId: 'user-14', userName: 'Barry Allen', rating: 4.5, comment: 'Mesmerizing to watch the sand arrange itself into numbers. The custom patterns make my desk look exceptionally technical.', date: '2026-06-25' }
    ],
    sellerId: 'sell-2',
    sellerName: 'Lumira Living',
    tags: ['clock', 'ambient', 'magnet', 'fluid', 'decor'],
    specs: {
      'Display Particles': 'High-remanence cobalt-ferrite grains',
      'Electromagnet Grid': '128 x 64 custom-wound coils',
      'Refresh Latency': '1.2 seconds',
      'Enclosure': 'Anodized aluminum with mineral glass',
      'Modes': 'Digital Clock, Hourglass, Fluid Waves'
    },
    versions: [
      {
        id: 'v-13-standard',
        name: 'Standard Slate Edition',
        price: 160.00,
        inventory: 19,
        specs: {
          'Display Particles': 'High-remanence cobalt-ferrite grains',
          'Electromagnet Grid': '128 x 64 custom-wound coils',
          'Refresh Latency': '1.2 seconds',
          'Enclosure': 'Anodized aluminum with mineral glass',
          'Modes': 'Digital Clock, Hourglass, Fluid Waves'
        }
      },
      {
        id: 'v-13-holographic',
        name: 'Pro Holographic Brass',
        price: 280.00,
        inventory: 7,
        specs: {
          'Display Particles': 'Superparamagnetic nickel-alloy grains',
          'Electromagnet Grid': '256 x 128 high-density array',
          'Refresh Latency': '0.3 seconds',
          'Enclosure': 'Machined solid brass with holographic dual-lens glass',
          'Modes': 'Clock, Customizable SVGs, Quantum Interference Sandbox'
        }
      }
    ]
  },
  {
    id: 'prod-14',
    name: 'MyoStim Biometric Recovery Sleeve',
    description: 'An advanced full-sleeve compression band merging sequential pneumatic air pressure compression and wireless EMS (Electrical Muscle Stimulation) to speed up recovery and flush waste.',
    price: 220.00,
    category: 'Smart Wellness',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600',
    inventory: 11,
    rating: 4.6,
    reviewsCount: 13,
    reviews: [
      { id: 'rev-15', userId: 'user-15', userName: 'Hal Jordan', rating: 5, comment: 'Completely eliminates muscle soreness after leg day. EMS pulse modes are very comfortable.', date: '2026-07-02' }
    ],
    sellerId: 'sell-3',
    sellerName: 'Verdant Tech',
    tags: ['wellness', 'ems', 'sleeve', 'compression', 'fitness'],
    specs: {
      'Pneumatic Chambers': '5 overlapping chambers (sequential loop)',
      'EMS Channels': '8 channels of active dual-frequency stim',
      'Pressure Range': '20 - 120 mmHg',
      'App Integration': 'Apex Health Connect (iOS / Android)',
      'Battery': 'Rechargeable control pod (8 sessions)'
    },
    versions: [
      {
        id: 'v-14-arm',
        name: 'Model Arm - Upper Recovery',
        price: 135.00,
        inventory: 20,
        specs: {
          'Pneumatic Chambers': '3 overlapping chambers',
          'EMS Channels': '4 channels of stim',
          'Pressure Range': '20 - 90 mmHg',
          'App Integration': 'Apex Health Link',
          'Battery': 'Sleeve-integrated battery (4 sessions)'
        }
      },
      {
        id: 'v-14-leg',
        name: 'Model Leg - Full Recovery',
        price: 220.00,
        inventory: 11,
        specs: {
          'Pneumatic Chambers': '5 overlapping chambers (sequential loop)',
          'EMS Channels': '8 channels of active dual-frequency stim',
          'Pressure Range': '20 - 120 mmHg',
          'App Integration': 'Apex Health Connect',
          'Battery': 'Rechargeable control pod (8 sessions)'
        }
      },
      {
        id: 'v-14-suite',
        name: 'Model Pro - Double-Leg Elite System',
        price: 399.00,
        inventory: 5,
        specs: {
          'Pneumatic Chambers': '8 micro-overlapping chambers (dual legs)',
          'EMS Channels': '16 channels high-voltage biofeedback stim',
          'Pressure Range': '20 - 160 mmHg',
          'App Integration': 'Apex Professional Cloud Hub',
          'Battery': 'Dual high-capacity smart charging pods (15 sessions)'
        }
      }
    ]
  },
  {
    id: 'prod-15',
    name: 'OmniShield Thermoelectric Climate Suit',
    description: 'An incredible complete weather jumpsuit integrated with an active solid-state heating/cooling grid, biometric core monitoring, and high-strength light armor plates.',
    price: 850.00,
    category: 'Futuristic Wear',
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=600',
    inventory: 6,
    rating: 4.8,
    reviewsCount: 4,
    reviews: [
      { id: 'rev-16', userId: 'user-16', userName: 'Clark Kent', rating: 5, comment: 'Provides absolute protection from extreme cold. Wore it during a blizzard and was perfectly warm at room temp inside.', date: '2026-07-08' }
    ],
    sellerId: 'sell-1',
    sellerName: 'AeroWear Labs',
    tags: ['suit', 'armor', 'climate', 'outerwear'],
    specs: {
      'Thermoelectric Grid': '32 Peltier micro-modules',
      'Temperature Range': '-20°C to +60°C adaptation',
      'Inner Armor': 'Grade-3 Kevlar Graphene weaves',
      'Power Source': 'Flexible polymer battery pack (12 hours)',
      'Sensor Array': 'Heart rate, hydration, blood oxygen, ambient radiation'
    },
    versions: [
      {
        id: 'v-15-scout',
        name: 'Model Scout - Explorer Suit',
        price: 599.00,
        inventory: 10,
        specs: {
          'Thermoelectric Grid': '16 Peltier micro-modules',
          'Temperature Range': '10°C to +45°C adaptation',
          'Inner Armor': 'Grade-1 non-Newtonian gel lining',
          'Power Source': 'Standard lithium pack (6 hours)',
          'Sensor Array': 'Heart rate, ambient temperature'
        }
      },
      {
        id: 'v-15-pathfinder',
        name: 'Model Pathfinder - Tactical Climate',
        price: 850.00,
        inventory: 6,
        specs: {
          'Thermoelectric Grid': '32 Peltier micro-modules',
          'Temperature Range': '-20°C to +60°C adaptation',
          'Inner Armor': 'Grade-3 Kevlar Graphene weaves',
          'Power Source': 'Flexible polymer battery pack (12 hours)',
          'Sensor Array': 'Heart rate, hydration, blood oxygen, ambient radiation'
        }
      },
      {
        id: 'v-15-vanguard',
        name: 'Model Apex - Sovereign Vanguard',
        price: 1200.00,
        inventory: 3,
        specs: {
          'Thermoelectric Grid': '64 high-density Peltier micro-modules',
          'Temperature Range': '-50°C to +100°C hostile environment seal',
          'Inner Armor': 'Grade-5 Carbon Nanotube Non-Newtonian Plates',
          'Power Source': 'Dual hot-swappable solid state batteries (24 hours)',
          'Sensor Array': 'Full telemetry suite with neural link & heads-up tracking'
        }
      }
    ]
  },
  ...GENERATED_PRODUCTS
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'The Future of Wearable Wellness: Bio-adaptation',
    excerpt: 'How next-generation bio-interactive textiles and wearable neurosensors are moving beyond passive tracking into real-time health adaptation.',
    content: 'Over the last decade, we have watched wearables evolve from simple step counters into complex physiological monitors. Today, the horizon is shift towards active, bio-adaptive materials. Advanced composites like Graphene and specialized EEG sensors can now dynamically change structural permeability, temperature, and visual states based on the wearer’s immediate needs. This article explores how platforms like AeroWear Labs are shaping the bio-adaptive clothing revolution...',
    image: 'https://images.unsplash.com/photo-1510519138101-570d1dca3d66?auto=format&fit=crop&q=80&w=600',
    category: 'Futuristic Tech',
    readTime: '5 min read',
    date: 'July 15, 2026',
    author: 'Elena Rostova'
  },
  {
    id: 'post-2',
    title: 'Restorative Living: Tuning Your Circadian Home',
    excerpt: 'Practical strategies to adjust light temperature, room aesthetics, and sound frequencies in your home to support natural hormone cycles and deeper sleep.',
    content: 'Human bodies evolved to thrive in natural sunlight, which moves from warm golden dawn, to clinical blue midday, to a soft ember sunset. Yet modern offices and homes subject our eyes to constant static white wavelengths. By utilizing Matter-connected circadian LED lights and biofeedback audio tools, we can restore the natural cycles. Learn how to transform your apartment into a sanctuary of recovery...',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600',
    category: 'Ambient Design',
    readTime: '4 min read',
    date: 'July 10, 2026',
    author: 'Marcus Vance'
  }
];
