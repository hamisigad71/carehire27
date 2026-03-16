import { Vehicle } from "@/types";

// =============================================================================
// ─── VEHICLE DATA — SECTIONED BY CATEGORY ────────────────────────────────────
// To edit a vehicle or its images, find its named section below.
// Existing vehicle IDs, images, prices, and names are 100% preserved.
// New vehicles (Wedding V-1023+, Safari V-1026+, Airport V-1029+) added at end.
// =============================================================================

// ─── LUXURY FLEET ────────────────────────────────────────────────────────────
// Includes: original Luxury + remapped Sports (Porsche) + remapped Electric (Audi)
const LUXURY_VEHICLES: Vehicle[] = [
  {
    id: "V-1001",
    name: "Lexus LX 570 Disponible",
    type: "Luxury", // ✅ unchanged
    license: "ABC-1234",
    price: 150,
    status: "Available",
    image:
      "https://i.pinimg.com/1200x/2b/f2/5e/2bf25e33f3c1108363a4c96fbac8ad6a.jpg",
    images: [
      "https://i.pinimg.com/1200x/67/ed/a3/67eda3bf02af875a7dc62d08cd712e14.jpg",
      "https://i.pinimg.com/1200x/c6/ca/4d/c6ca4d1d769855f03b4fa62858fdc740.jpg",
      "https://images.unsplash.com/photo-1517457373614-b7152f800fd1?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1627454818618-f29a66fc18e7?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1464219414199-25421a1d05b5?auto=format&fit=crop&q=80&w=1200",
    ],
    year: 2024,
    seats: 5,
    transmission: "Automatic",
    mileage: "12K miles",
    condition: "Pristine",
    fuelType: "Electric",
    description:
      "The Tesla Model 3 is designed for electric-powered performance, with dual motor AWD, quick acceleration, long range and fast charging. Experience the future of driving today.",
    features: [
      { icon: "FiUsers", label: "5 Seats" },
      { icon: "FiCpu", label: "Autopilot" },
      { icon: "FiZap", label: "350mi Range" },
      { icon: "FiActivity", label: "0-60 in 3.1s" },
    ],
    specifications: [
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel Type", value: "Electric" },
      { label: "Exterior Color", value: "Midnight Silver" },
      { label: "Cargo Space", value: "23 cu ft" },
    ],
  },
  {
    id: "V-1002",
    name: "BMW 6 Series GT",
    type: "Luxury", // ✅ unchanged
    license: "LUX-777",
    price: 450,
    status: "Available",
    image:
      "https://images.squarespace-cdn.com/content/v1/5aac1f6a5cfd796d520a4a7a/66b300ea-16d4-48f4-9ce3-7ee08abc2b1a/2019+BMW+320i+%28M-sport+Package%29?format=1500w",
    images: [
      "https://i.pinimg.com/736x/17/f8/7f/17f87f5ac834e3a0edba53efc1f3d757.jpg",
      "https://images.unsplash.com/photo-1493195671595-30a332807d4e?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1517457373614-b7152f800fd1?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1627454818618-f29a66fc18e7?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1464219414199-25421a1d05b5?auto=format&fit=crop&q=80&w=1200",
    ],
    year: 2023,
    seats: 4,
    transmission: "Auto",
    mileage: "5K miles",
    condition: "Excellent",
    fuelType: "Petrol",
  },
  {
    id: "V-1004",
    name: "Porsche 911 GT3",
    type: "Luxury", // ❌ was Sports → Luxury
    license: "SPD-911",
    price: 500,
    status: "Maintenance",
    image:
      "https://i.pinimg.com/736x/4a/db/f1/4adbf1cb2da1b00df76099f83a45129a.jpg",
    images: [
      "https://i.pinimg.com/1200x/3e/fd/89/3efd892633bf664db7e5cc667fecfc82.jpg",
      "https://images.unsplash.com/photo-1493195671595-30a332807d4e?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1517457373614-b7152f800fd1?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1627454818618-f29a66fc18e7?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1464219414199-25421a1d05b5?auto=format&fit=crop&q=80&w=1200",
    ],
    year: 2024,
    seats: 4,
    transmission: "Manual",
    mileage: "2K miles",
    condition: "Perfect",
    fuelType: "Petrol",
  },
  {
    id: "V-1006",
    name: "Audi RS 5",
    type: "Luxury", // ❌ was Electric → Luxury
    license: "AUD-888",
    price: 350,
    status: "Available",
    image:
      "https://i.pinimg.com/1200x/d3/71/5e/d3715e2211fbb3739763d33aacbec14a.jpg",
    images: [
      "https://i.pinimg.com/1200x/10/fa/cd/10facd5a88062b19c795fddde344f64d.jpg",
      "https://images.unsplash.com/photo-1493195671595-30a332807d4e?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1517457373614-b7152f800fd1?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1627454818618-f29a66fc18e7?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1464219414199-25421a1d05b5?auto=format&fit=crop&q=80&w=1200",
    ],
    year: 2024,
    seats: 4,
    transmission: "Automatic",
    mileage: "3K miles",
    condition: "New",
    fuelType: "Electric",
  },
  {
    id: "V-1009",
    name: "Toyota Noah",
    type: "Luxury", // ✅ unchanged (was Luxury)
    license: "I7-2026",
    price: 550,
    status: "Available",
    image:
      "https://i.pinimg.com/736x/97/d4/31/97d4310b708b63dc8abfb53e3f5f9198.jpg",
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1493195671595-30a332807d4e?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1517457373614-b7152f800fd1?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1627454818618-f29a66fc18e7?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1464219414199-25421a1d05b5?auto=format&fit=crop&q=80&w=1200",
    ],
    year: 2026,
    seats: 5,
    transmission: "Automatic",
    mileage: "100 miles",
    condition: "New",
    fuelType: "Electric",
    description:
      "The BMW i7 is a fully electric luxury sedan that defines modern premium mobility. It offers unmatched comfort and state-of-the-art technology.",
  },
  {
    id: "V-1010",
    name: "Lexus LX600",
    type: "Luxury", // ✅ unchanged
    license: "GHOST-1",
    price: 1200,
    status: "Available",
    image:
      "https://i.pinimg.com/736x/ff/24/47/ff24476284575bc357ebcc645c0adb56.jpg",
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1493195671595-30a332807d4e?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1517457373614-b7152f800fd1?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1627454818618-f29a66fc18e7?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1464219414199-25421a1d05b5?auto=format&fit=crop&q=80&w=1200",
    ],
    year: 2025,
    seats: 4,
    transmission: "Automatic",
    mileage: "50 miles",
    condition: "Pristine",
    fuelType: "Petrol",
    description:
      "The Rolls-Royce Ghost is the pinnacle of luxury craftsmanship. Its silent ride and effortless power provide an unparalleled travel experience.",
  },
  {
    id: "V-1014",
    name: "Mercedes Benz C200",
    type: "Luxury", // ✅ unchanged
    license: "ECO-004",
    price: 55,
    status: "Available",
    image:
      "https://i.pinimg.com/1200x/cd/e1/fb/cde1fb0b9b13704cbe6b8aef7086dbf2.jpg",
    images: [
      "https://i.pinimg.com/1200x/32/76/5e/32765ef6987ac510ddad6c4b6becc599.jpg",
      "https://i.pinimg.com/736x/f7/3c/21/f73c2181b489b58113829d864820885b.jpg",
      "https://images.unsplash.com/photo-1627454818618-f29a66fc18e7?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1464219414199-25421a1d05b5?auto=format&fit=crop&q=80&w=1200",
    ],
    year: 2023,
    seats: 5,
    transmission: "Automatic",
    mileage: "35K miles",
    condition: "Excellent",
    fuelType: "Petrol",
    description:
      "Versatile compact car offering comfort and reliability. Great for both city and highway driving.",
  },
];

// ─── SUV FLEET ───────────────────────────────────────────────────────────────
// Includes: original SUVs + remapped Mid-Range SUVs (Ford Escape, Nissan Rogue)
const SUV_VEHICLES: Vehicle[] = [
  {
    id: "V-1003",
    name: "Range Rover Sport",
    type: "SUV", // ✅ unchanged
    license: "RR-001",
    price: 300,
    status: "Available",
    image:
      "https://i.pinimg.com/1200x/d9/ca/5c/d9ca5c36aa39cbbf9da6b2768853b2f1.jpg",
    images: [
      "https://i.pinimg.com/1200x/d9/ca/5c/d9ca5c36aa39cbbf9da6b2768853b2f1.jpg",
      "https://images.unsplash.com/photo-1493195671595-30a332807d4e?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1517457373614-b7152f800fd1?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1627454818618-f29a66fc18e7?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1464219414199-25421a1d05b5?auto=format&fit=crop&q=80&w=1200",
    ],
    year: 2023,
    seats: 7,
    transmission: "Automatic",
    mileage: "15K miles",
    condition: "Excellent",
    fuelType: "Diesel",
  },
  {
    id: "V-1018",
    name: "Ford Escape",
    type: "SUV", // ❌ was Mid-Range → SUV
    license: "MID-003",
    price: 120,
    status: "Available",
    image:
      "https://i.pinimg.com/1200x/2b/f2/5e/2bf25e33f3c1108363a4c96fbac8ad6a.jpg",
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1493195671595-30a332807d4e?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1517457373614-b7152f800fd1?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1627454818618-f29a66fc18e7?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1464219414199-25421a1d05b5?auto=format&fit=crop&q=80&w=1200",
    ],
    year: 2024,
    seats: 5,
    transmission: "Automatic",
    mileage: "20K miles",
    condition: "Excellent",
    fuelType: "Petrol",
    description:
      "Versatile compact SUV perfect for families and small business groups. Excellent storage capacity.",
  },
  {
    id: "V-1019",
    name: "Nissan Rogue",
    type: "SUV", // ❌ was Mid-Range → SUV
    license: "MID-004",
    price: 110,
    status: "Available",
    image:
      "https://i.pinimg.com/1200x/2b/f2/5e/2bf25e33f3c1108363a4c96fbac8ad6a.jpg",
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1493195671595-30a332807d4e?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1517457373614-b7152f800fd1?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1627454818618-f29a66fc18e7?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1464219414199-25421a1d05b5?auto=format&fit=crop&q=80&w=1200",
    ],
    year: 2023,
    seats: 5,
    transmission: "Automatic",
    mileage: "28K miles",
    condition: "Excellent",
    fuelType: "Petrol",
    description:
      "Reliable compact SUV with spacious interior. Great for families and adventure seekers.",
  },
  {
    id: "V-1020",
    name: "Toyota RAV4",
    type: "SUV", // ✅ unchanged
    license: "SUV-001",
    price: 130,
    status: "Available",
    image:
      "https://i.pinimg.com/1200x/2b/f2/5e/2bf25e33f3c1108363a4c96fbac8ad6a.jpg",
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1493195671595-30a332807d4e?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1517457373614-b7152f800fd1?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1627454818618-f29a66fc18e7?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1464219414199-25421a1d05b5?auto=format&fit=crop&q=80&w=1200",
    ],
    year: 2024,
    seats: 5,
    transmission: "Automatic",
    mileage: "10K miles",
    condition: "Pristine",
    fuelType: "Petrol",
    description:
      "Best-selling SUV globally. Reliable, spacious, and great for families. Features advanced safety tech.",
  },
  {
    id: "V-1021",
    name: "Ford Explorer",
    type: "SUV", // ✅ unchanged
    license: "SUV-002",
    price: 150,
    status: "Available",
    image:
      "https://i.pinimg.com/1200x/2b/f2/5e/2bf25e33f3c1108363a4c96fbac8ad6a.jpg",
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1493195671595-30a332807d4e?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1517457373614-b7152f800fd1?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1627454818618-f29a66fc18e7?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1464219414199-25421a1d05b5?auto=format&fit=crop&q=80&w=1200",
    ],
    year: 2023,
    seats: 7,
    transmission: "Automatic",
    mileage: "25K miles",
    condition: "Excellent",
    fuelType: "Petrol",
    description:
      "Three-row SUV perfect for large families and group travel. Powerful and spacious with modern amenities.",
  },
  {
    id: "V-1022",
    name: "Nissan X-Trail",
    type: "SUV", // ✅ unchanged
    license: "SUV-003",
    price: 125,
    status: "Available",
    image:
      "https://i.pinimg.com/1200x/2b/f2/5e/2bf25e33f3c1108363a4c96fbac8ad6a.jpg",
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1493195671595-30a332807d4e?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1517457373614-b7152f800fd1?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1627454818618-f29a66fc18e7?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1464219414199-25421a1d05b5?auto=format&fit=crop&q=80&w=1200",
    ],
    year: 2024,
    seats: 5,
    transmission: "Automatic",
    mileage: "8K miles",
    condition: "Pristine",
    fuelType: "Diesel",
    description:
      "Practical crossover SUV with excellent fuel efficiency. Ideal for outdoor enthusiasts and families.",
  },
];

// ─── ECONOMY FLEET ───────────────────────────────────────────────────────────
// Includes: original Economy + remapped Mid-Range sedans (Camry, Accord)
const ECONOMY_VEHICLES: Vehicle[] = [
  {
    id: "V-1007",
    name: " Toyota Axio",
    type: "Economy", // ✅ unchanged
    license: "BULL-001",
    price: 600,
    status: "Available",
    image:
      "https://i.pinimg.com/1200x/e3/96/94/e396947623fd43be1bfb1dff7c2d0cf8.jpg",
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1493195671595-30a332807d4e?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1517457373614-b7152f800fd1?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1627454818618-f29a66fc18e7?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1464219414199-25421a1d05b5?auto=format&fit=crop&q=80&w=1200",
    ],
    year: 2024,
    seats: 5,
    transmission: "Automatic",
    mileage: "1K miles",
    condition: "Showroom",
    fuelType: "Petrol",
  },
  {
    id: "V-1008",
    name: "2020 Nissan Almera Drive68",
    type: "Economy", // ✅ unchanged
    license: "FST-488",
    price: 700,
    status: "Available",
    image:
      "https://i.pinimg.com/1200x/be/41/88/be41889d9fb475fdf7f59895dbbcb140.jpg",
    images: [
      "https://i.pinimg.com/1200x/9a/4e/0d/9a4e0d4047f0d5f869077a913d310cc0.jpg",
      "https://i.pinimg.com/736x/00/74/af/0074af7b9adff1642f283732b9efa38f.jpg",
      "https://images.unsplash.com/photo-1517457373614-b7152f800fd1?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1627454818618-f29a66fc18e7?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1464219414199-25421a1d05b5?auto=format&fit=crop&q=80&w=1200",
    ],
    year: 2023,
    seats: 2,
    transmission: "Automatic",
    mileage: "500 miles",
    condition: "Pristine",
    fuelType: "Petrol",
  },
  {
    id: "V-1011",
    name: "Toyota Corolla",
    type: "Economy", // ✅ unchanged
    license: "ECO-001",
    price: 45,
    status: "Available",
    image:
      "https://i.pinimg.com/1200x/a6/41/e4/a641e43eaea902907c5cd451afd377e5.jpg",
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1493195671595-30a332807d4e?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1517457373614-b7152f800fd1?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1627454818618-f29a66fc18e7?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1464219414199-25421a1d05b5?auto=format&fit=crop&q=80&w=1200",
    ],
    year: 2023,
    seats: 5,
    transmission: "Automatic",
    mileage: "45K miles",
    condition: "Excellent",
    fuelType: "Petrol",
    description:
      "The world's best-selling sedan. Known for reliability, fuel efficiency, and low maintenance costs.",
  },
  {
    id: "V-1012",
    name: "2025 Nissan Juke N-Sport",
    type: "Economy", // ✅ unchanged
    license: "ECO-002",
    price: 40,
    status: "Available",
    image:
      "https://i.pinimg.com/1200x/ca/28/b6/ca28b64b9dad6c728810cc6063501b32.jpg",
    images: [
      "https://i.pinimg.com/1200x/a9/f8/a4/a9f8a4b42251c6d11bf046901411f8e8.jpg",
      "https://images.unsplash.com/photo-1493195671595-30a332807d4e?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1517457373614-b7152f800fd1?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1627454818618-f29a66fc18e7?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1464219414199-25421a1d05b5?auto=format&fit=crop&q=80&w=1200",
    ],
    year: 2023,
    seats: 5,
    transmission: "Automatic",
    mileage: "50K miles",
    condition: "Excellent",
    fuelType: "Petrol",
    description:
      "Compact and economical. Perfect for city driving with excellent fuel efficiency and affordable pricing.",
  },
  {
    id: "V-1013",
    name: "Volkswagen Polo",
    type: "Economy", // ✅ unchanged
    license: "ECO-003",
    price: 50,
    status: "Available",
    image:
      "https://i.pinimg.com/1200x/8f/31/4f/8f314f5d3902e781f0931d510016f5de.jpg",
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1493195671595-30a332807d4e?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1517457373614-b7152f800fd1?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1627454818618-f29a66fc18e7?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1464219414199-25421a1d05b5?auto=format&fit=crop&q=80&w=1200",
    ],
    year: 2024,
    seats: 5,
    transmission: "Automatic",
    mileage: "8K miles",
    condition: "Pristine",
    fuelType: "Petrol",
    description:
      "European favorite for its fuel efficiency and compact design. Ideal for navigating crowded city streets.",
  },
  {
    id: "V-1015",
    name: "Honda Civic",
    type: "Economy", // ✅ unchanged
    license: "ECO-005",
    price: 60,
    status: "Available",
    image:
      "https://i.pinimg.com/1200x/b8/91/8b/b8918bbfb9a7a1909c32166bfa15e6c0.jpg",
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1493195671595-30a332807d4e?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1517457373614-b7152f800fd1?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1627454818618-f29a66fc18e7?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1464219414199-25421a1d05b5?auto=format&fit=crop&q=80&w=1200",
    ],
    year: 2024,
    seats: 5,
    transmission: "Automatic",
    mileage: "12K miles",
    condition: "Pristine",
    fuelType: "Petrol",
    description:
      "Dependable sedan with smooth handling and excellent fuel economy. Perfect for daily commuting.",
  },
  {
    id: "V-1016",
    name: "Toyota Camry",
    type: "Economy", // ❌ was Mid-Range → Economy
    license: "MID-001",
    price: 90,
    status: "Available",
    image:
      "https://i.pinimg.com/1200x/2b/f2/5e/2bf25e33f3c1108363a4c96fbac8ad6a.jpg",
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1493195671595-30a332807d4e?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1517457373614-b7152f800fd1?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1627454818618-f29a66fc18e7?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1464219414199-25421a1d05b5?auto=format&fit=crop&q=80&w=1200",
    ],
    year: 2024,
    seats: 5,
    transmission: "Automatic",
    mileage: "18K miles",
    condition: "Excellent",
    fuelType: "Petrol",
    description:
      "Premium midsize sedan offering comfort and reliability. Ideal for corporate travel and longer journeys.",
  },
];

// ─── BUSINESS FLEET ──────────────────────────────────────────────────────────
// Includes: remapped van (Mercedes AMG Viano) + remapped Mid-Range (Honda Accord)
const BUSINESS_VEHICLES: Vehicle[] = [
  {
    id: "V-1005",
    name: "Lexus LX 570",
    type: "Business", // ❌ was van → Business
    license: "EQS-001",
    price: 480,
    status: "Available",
    image:
      "https://i.pinimg.com/736x/b6/92/43/b69243cd68f0c6ca56ec02768a533905.jpg",
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1493195671595-30a332807d4e?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1517457373614-b7152f800fd1?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1627454818618-f29a66fc18e7?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1464219414199-25421a1d05b5?auto=format&fit=crop&q=80&w=1200",
    ],
    year: 2023,
    seats: 5,
    transmission: "Automatic",
    mileage: "8K miles",
    condition: "Mint",
    fuelType: "Petrol",
  },
  {
    id: "V-1005",
    name: "The Mercedes AMG Viano",
    type: "Business", // ❌ was van → Business
    license: "EQS-001",
    price: 480,
    status: "Available",
    image:
      "https://i.pinimg.com/736x/2b/f0/70/2bf070960859b7224a8f6dafc68d29fa.jpg ",
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1493195671595-30a332807d4e?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1517457373614-b7152f800fd1?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1627454818618-f29a66fc18e7?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1464219414199-25421a1d05b5?auto=format&fit=crop&q=80&w=1200",
    ],
    year: 2023,
    seats: 5,
    transmission: "Automatic",
    mileage: "8K miles",
    condition: "Mint",
    fuelType: "Petrol",
  },
  {
    id: "V-1017",
    name: "Honda Accord",
    type: "Business", // ❌ was Mid-Range → Business
    license: "MID-002",
    price: 95,
    status: "Available",
    image:
      " https://i.pinimg.com/1200x/2b/f2/5e/2bf25e33f3c1108363a4c96fbac8ad6a.jpg",
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1493195671595-30a332807d4e?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1517457373614-b7152f800fd1?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1627454818618-f29a66fc18e7?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1464219414199-25421a1d05b5?auto=format&fit=crop&q=80&w=1200",
    ],
    year: 2024,
    seats: 5,
    transmission: "Automatic",
    mileage: "15K miles",
    condition: "Excellent",
    fuelType: "Petrol",
    description:
      "Sophisticated midsize sedan with advanced features. Perfect for executive travel and business clients.",
  },
];

// ─── WEDDING FLEET ────────────────────────────────────────────────────────────
// NEW vehicles — IDs continue from V-1023
const WEDDING_VEHICLES: Vehicle[] = [
  {
    id: "V-1023",
    name: "2025 Mercedes-Benz",
    type: "Wedding",
    license: "WED-001",
    price: 1800,
    status: "Available",
    image:
      "https://i.pinimg.com/736x/4b/93/00/4b93000a73446cd165768cd926f42c90.jpg",
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=520&fit=crop",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=520&fit=crop",
      "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=520&fit=crop",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=520&fit=crop",
    ],
    year: 2024,
    seats: 4,
    transmission: "Automatic",
    mileage: "6K miles",
    condition: "Pristine",
    fuelType: "Petrol",
    description:
      "The pinnacle of wedding luxury. The Rolls Royce Ghost arrives dressed with floral décor, champagne on ice, and a professional chauffeur — making your special day truly unforgettable.",
    features: [
      { icon: "FiUsers", label: "Chauffeur Included" },
      { icon: "FiHeart", label: "Floral Décor" },
      { icon: "FiGift", label: "Champagne Service" },
      { icon: "FiCamera", label: "Photo Friendly" },
    ],
    specifications: [
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel Type", value: "Petrol" },
      { label: "Colour", value: "Pearlescent White" },
      { label: "Ribbon & Décor", value: "Included" },
    ],
  },
  {
    id: "V-1024",
    name: "Audi",
    type: "Wedding",
    license: "WED-002",
    price: 950,
    status: "Available",
    image:
      "https://i.pinimg.com/1200x/b1/02/8c/b1028cc0912f564b0903c20ddbf986c9.jpg",
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=520&fit=crop",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=520&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=520&fit=crop",
    ],
    year: 2024,
    seats: 4,
    transmission: "Automatic",
    mileage: "11K miles",
    condition: "Excellent",
    fuelType: "Petrol",
    description:
      "Elegant and classic. The Mercedes S-Class is a top choice for wedding couples seeking timeless style with supreme comfort. Arrives beautifully decorated with ribbon and flowers.",
    features: [
      { icon: "FiUsers", label: "Chauffeur Included" },
      { icon: "FiHeart", label: "Ribbon & Flowers" },
      { icon: "FiStar", label: "Red Carpet Service" },
      { icon: "FiShield", label: "Fully Insured" },
    ],
    specifications: [
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel Type", value: "Petrol" },
      { label: "Colour", value: "Obsidian Black" },
      { label: "Decoration", value: "Ribbon & Bows" },
    ],
  },
  {
    id: "V-1025",
    name: "Hummer H2 limousine",
    type: "Wedding",
    license: "WED-003",
    price: 1100,
    status: "Available",
    image:
      "https://i.pinimg.com/1200x/b6/b9/ed/b6b9ed32b428ed3bed3d9cf3eb84affb.jpg",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=520&fit=crop",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=520&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=520&fit=crop",
    ],
    year: 2024,
    seats: 5,
    transmission: "Automatic",
    mileage: "7K miles",
    condition: "Excellent",
    fuelType: "Petrol",
    description:
      "Modern and bold. The Porsche Cayenne is the perfect choice for a contemporary wedding with a touch of sportiness and luxury combined.",
    features: [
      { icon: "FiUsers", label: "Chauffeur Ready" },
      { icon: "FiHeart", label: "White Ribbon Décor" },
      { icon: "FiZap", label: "Sport Mode" },
      { icon: "FiShield", label: "Fully Insured" },
    ],
    specifications: [
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel Type", value: "Petrol" },
      { label: "Colour", value: "Carrara White" },
      { label: "Decoration", value: "White Ribbons" },
    ],
  },
];

// ─── SAFARI FLEET ─────────────────────────────────────────────────────────────
// NEW vehicles — IDs continue from V-1026
const SAFARI_VEHICLES: Vehicle[] = [
  {
    id: "V-1026",
    name: "Toyota Land Cruiser Safari",
    type: "Safari",
    license: "SAF-001",
    price: 400,
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&h=520&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&h=520&fit=crop",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=520&fit=crop",
      "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=520&fit=crop",
    ],
    year: 2022,
    seats: 7,
    transmission: "Automatic",
    mileage: "38K miles",
    condition: "Good",
    fuelType: "Diesel",
    description:
      "Kenya's most trusted safari vehicle. The Land Cruiser is built for rough terrain, long distances, and unforgettable game drives. Features a pop-up roof for wildlife viewing.",
    features: [
      { icon: "FiUsers", label: "7 Seats" },
      { icon: "FiTruck", label: "Pop-up Roof" },
      { icon: "FiActivity", label: "4WD Off-road" },
      { icon: "FiPackage", label: "Cooler Box Incl." },
    ],
    specifications: [
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel Type", value: "Diesel" },
      { label: "Drive", value: "4WD" },
      { label: "Roof", value: "Pop-up Hatch" },
    ],
  },
  {
    id: "V-1027",
    name: "Range Rover Defender Safari",
    type: "Safari",
    license: "SAF-002",
    price: 650,
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=520&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=520&fit=crop",
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&h=520&fit=crop",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=520&fit=crop",
    ],
    year: 2023,
    seats: 5,
    transmission: "Automatic",
    mileage: "21K miles",
    condition: "Excellent",
    fuelType: "Diesel",
    description:
      "The Defender redefines safari exploration. Designed to tackle the toughest African terrains while keeping passengers in absolute comfort. Ideal for Maasai Mara and Amboseli.",
    features: [
      { icon: "FiUsers", label: "5 Seats" },
      { icon: "FiShield", label: "Bull Bar" },
      { icon: "FiActivity", label: "Off-road Ready" },
      { icon: "FiPackage", label: "Long Range Tank" },
    ],
    specifications: [
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel Type", value: "Diesel" },
      { label: "Drive", value: "4WD" },
      { label: "Suspension", value: "Air Adaptive" },
    ],
  },
  {
    id: "V-1028",
    name: "Nissan Patrol 4x4",
    type: "Safari",
    license: "SAF-003",
    price: 320,
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=520&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=520&fit=crop",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=520&fit=crop",
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&h=520&fit=crop",
    ],
    year: 2022,
    seats: 7,
    transmission: "Automatic",
    mileage: "44K miles",
    condition: "Good",
    fuelType: "Diesel",
    description:
      "Rugged and dependable, the Nissan Patrol is a favourite for budget-friendly safari adventures. Equipped with a bull bar, tow hitch, and extended fuel tank.",
    features: [
      { icon: "FiUsers", label: "7 Seats" },
      { icon: "FiActivity", label: "4WD" },
      { icon: "FiTruck", label: "Bull Bar" },
      { icon: "FiPackage", label: "Extended Tank" },
    ],
    specifications: [
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel Type", value: "Diesel" },
      { label: "Drive", value: "4WD" },
      { label: "Tank", value: "Extended Range" },
    ],
  },
];

// ─── AIRPORT FLEET ───────────────────────────────────────────────────────────
// NEW vehicles — IDs continue from V-1029
const AIRPORT_VEHICLES: Vehicle[] = [
  {
    id: "V-1029",
    name: "Toyota Hiace Grand Cabin",
    type: "Airport",
    license: "AIR-001",
    price: 250,
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1570733117311-d990c3816223?w=800&h=520&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1570733117311-d990c3816223?w=800&h=520&fit=crop",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=520&fit=crop",
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=520&fit=crop",
    ],
    year: 2022,
    seats: 9,
    transmission: "Automatic",
    mileage: "52K miles",
    condition: "Good",
    fuelType: "Diesel",
    description:
      "The perfect group airport transfer vehicle. Spacious 9-seater with generous luggage space, air conditioning, and a professional driver. Ideal for corporate groups and large families.",
    features: [
      { icon: "FiUsers", label: "9 Seats" },
      { icon: "FiPackage", label: "Large Luggage Bay" },
      { icon: "FiWind", label: "Full AC" },
      { icon: "FiUsers", label: "Driver Included" },
    ],
    specifications: [
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel Type", value: "Diesel" },
      { label: "Capacity", value: "9 passengers" },
      { label: "Luggage", value: "9 bags" },
    ],
  },
  {
    id: "V-1030",
    name: "Mercedes Sprinter Executive",
    type: "Airport",
    license: "AIR-002",
    price: 480,
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=520&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=520&fit=crop",
      "https://images.unsplash.com/photo-1570733117311-d990c3816223?w=800&h=520&fit=crop",
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&h=520&fit=crop",
    ],
    year: 2023,
    seats: 14,
    transmission: "Automatic",
    mileage: "31K miles",
    condition: "Good",
    fuelType: "Diesel",
    description:
      "Premium 14-seater airport shuttle. Perfect for large delegations, corporate groups, or flight crews. Features leather seating, WiFi hotspot, and individual reading lights.",
    features: [
      { icon: "FiUsers", label: "14 Seats" },
      { icon: "FiWifi", label: "WiFi Hotspot" },
      { icon: "FiPackage", label: "Roof Luggage Rack" },
      { icon: "FiUsers", label: "Driver Included" },
    ],
    specifications: [
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel Type", value: "Diesel" },
      { label: "Capacity", value: "14 passengers" },
      { label: "Luggage", value: "Roof + Boot" },
    ],
  },
  {
    id: "V-1031",
    name: "Toyota Camry Airport Executive",
    type: "Airport",
    license: "AIR-003",
    price: 180,
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=520&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=520&fit=crop",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=520&fit=crop",
      "https://images.unsplash.com/photo-1570733117311-d990c3816223?w=800&h=520&fit=crop",
    ],
    year: 2023,
    seats: 5,
    transmission: "Automatic",
    mileage: "23K miles",
    condition: "Good",
    fuelType: "Hybrid",
    description:
      "Comfortable and affordable individual airport transfer. The Camry Hybrid offers a smooth, quiet ride ideal for solo travellers or small groups needing a reliable JKIA pickup or drop-off.",
    features: [
      { icon: "FiUsers", label: "5 Seats" },
      { icon: "FiZap", label: "Hybrid Engine" },
      { icon: "FiPackage", label: "3 Suitcases" },
      { icon: "FiUsers", label: "Driver Included" },
    ],
    specifications: [
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel Type", value: "Hybrid" },
      { label: "Capacity", value: "5 passengers" },
      { label: "Luggage", value: "3 bags" },
    ],
  },
];

// =============================================================================
// ─── COMBINED EXPORT ──────────────────────────────────────────────────────────
// This is the single array your API and pages consume.
// To add a vehicle: add it to its named section above — it appears here automatically.
// =============================================================================
export const vehicles: Vehicle[] = [
  ...LUXURY_VEHICLES,
  ...SUV_VEHICLES,
  ...ECONOMY_VEHICLES,
  ...BUSINESS_VEHICLES,
  ...WEDDING_VEHICLES,
  ...SAFARI_VEHICLES,
  ...AIRPORT_VEHICLES,
];
