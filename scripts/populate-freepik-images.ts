/**
 * Admin Script: Populate Freepik Images for All Vehicles
 *
 * Usage: npx tsx scripts/populate-freepik-images.ts
 *
 * This script:
 * 1. Reads all vehicles from src/data/vehicles.ts
 * 2. Fetches 5 images from Freepik for each vehicle
 * 3. Updates vehicles.ts with the fetched image URLs
 * 4. Saves the updated vehicles data
 */

import * as fs from "fs";
import * as path from "path";

const FREEPIK_API_KEY =
  process.env.NEXT_PUBLIC_FREEPIK_API_KEY ||
  "FPSX8590804ea554d178507da39646c415a8";
const BASE_URL = "https://api.freepik.com/v1/resources";

interface VehicleData {
  id: string;
  name: string;
  type: string;
  [key: string]: any;
}

interface FreepikImage {
  id: string;
  url: string;
  title: string;
  previews: { url: string }[];
}

interface FreepikResponse {
  data: FreepikImage[];
  total: number;
}

async function fetchFreepikImages(
  vehicleName: string,
  vehicleType: string,
  limit: number = 5,
): Promise<string[]> {
  const query = `${vehicleName} ${vehicleType} car`;

  try {
    console.log(`  Fetching images for: ${query}`);

    const response = await fetch(
      `${BASE_URL}?query=${encodeURIComponent(query)}&limit=${limit}&locale=en`,
      {
        method: "GET",
        headers: {
          "x-freepik-api-key": FREEPIK_API_KEY,
        },
      },
    );

    if (!response.ok) {
      console.warn(
        `  ⚠️  API error for ${vehicleName}: ${response.status} ${response.statusText}`,
      );
      return getFallbackImages();
    }

    const data: FreepikResponse = await response.json();

    if (!data.data || data.data.length === 0) {
      console.warn(`  ⚠️  No images found for ${vehicleName}, using fallback`);
      return getFallbackImages();
    }

    // Extract preview images (direct image URLs)
    const urls = data.data
      .map((item) => {
        // Get the first preview which is the actual image URL
        if (item.previews && item.previews.length > 0) {
          return item.previews[0].url;
        }
        return null;
      })
      .filter((url): url is string => url !== null);

    console.log(`  ✓ Found ${urls.length} images`);
    return urls.slice(0, limit);
  } catch (error) {
    console.error(`  ✗ Error fetching images for ${vehicleName}:`, error);
    return getFallbackImages();
  }
}

function getFallbackImages(): string[] {
  return [
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1493195671595-30a332807d4e?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1517457373614-b7152f800fd1?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1627454818618-f29a66fc18e7?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1464219414199-25421a1d05b5?auto=format&fit=crop&q=80&w=1200",
  ];
}

async function populateVehicleImages() {
  console.log("🚗 Starting Freepik image population...\n");

  const vehiclesPath = path.join(process.cwd(), "src/data/vehicles.ts");

  // Read the current vehicles file
  const fileContent = fs.readFileSync(vehiclesPath, "utf-8");

  // Extract the vehicles array using regex (simplified parsing)
  const vehiclesMatch = fileContent.match(
    /export const vehicles: Vehicle\[\] = \[([\s\S]*)\];/,
  );

  if (!vehiclesMatch) {
    console.error("❌ Could not find vehicles array in vehicles.ts");
    process.exit(1);
  }

  // Parse vehicles using a simple approach
  // Import and use the actual vehicles data
  const vehiclesModule = await import(vehiclesPath);
  const vehicles: VehicleData[] = vehiclesModule.vehicles;

  console.log(`Found ${vehicles.length} vehicles to process\n`);

  // Fetch images for each vehicle
  const updatedVehicles = [];

  for (let i = 0; i < vehicles.length; i++) {
    const vehicle = vehicles[i];
    console.log(`[${i + 1}/${vehicles.length}] ${vehicle.name}`);

    const images = await fetchFreepikImages(vehicle.name, vehicle.type);

    updatedVehicles.push({
      ...vehicle,
      image: images[0] || vehicle.image, // Use first image as primary
      images: images,
    });

    // Delay between requests to avoid rate limiting (500ms)
    if (i < vehicles.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  console.log(`\n✅ Image fetching complete!\n`);

  // Generate updated vehicles.ts content
  const updatedContent = generateVehiclesContent(updatedVehicles);

  // Write back to vehicles.ts
  fs.writeFileSync(vehiclesPath, updatedContent, "utf-8");
  console.log(`✓ Updated ${vehiclesPath}`);
  console.log(`✓ ${updatedVehicles.length} vehicles with Freepik images\n`);

  console.log("📝 Summary:");
  updatedVehicles.forEach((v, i) => {
    console.log(`   ${i + 1}. ${v.name} - ${v.images.length} images`);
  });
}

function generateVehiclesContent(vehicles: VehicleData[]): string {
  const vehiclesJson = JSON.stringify(vehicles, null, 2);

  return `import { Vehicle } from "@/types";

export const vehicles: Vehicle[] = ${vehiclesJson};
`;
}

// Run the script
populateVehicleImages().catch((error) => {
  console.error("❌ Script failed:", error);
  process.exit(1);
});
