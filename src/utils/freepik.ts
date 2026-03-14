export interface FreepikImage {
  id: string;
  url: string;
  title: string;
  source: "freepik";
}

export async function fetchFreepikImages(
  query: string,
  limit: number = 5,
): Promise<FreepikImage[]> {
  try {
    const response = await fetch(
      `/api/freepik/search?query=${encodeURIComponent(query)}&limit=${limit}`,
    );

    if (!response.ok) {
      console.error("Failed to fetch Freepik images:", response.statusText);
      return [];
    }

    const data = await response.json();
    return data.images || [];
  } catch (error) {
    console.error("Error fetching Freepik images:", error);
    return [];
  }
}

export async function getVehicleImages(
  vehicleName: string,
  vehicleType: string,
): Promise<string[]> {
  // Try fetching from Freepik first
  const freepikImages = await fetchFreepikImages(
    `${vehicleName} ${vehicleType} car`,
    5,
  );

  if (freepikImages.length > 0) {
    return freepikImages.map((img) => img.url);
  }

  // Fallback to Unsplash if Freepik fails
  const fallbackImages = [
    `https://i.pinimg.com/1200x/2b/f2/5e/2bf25e33f3c1108363a4c96fbac8ad6a.jpg`,
    `https://images.unsplash.com/photo-1493195671595-30a332807d4e?auto=format&fit=crop&q=80&w=800`,
    `https://images.unsplash.com/photo-1517457373614-b7152f800fd1?auto=format&fit=crop&q=80&w=800`,
    `https://images.unsplash.com/photo-1627454818618-f29a66fc18e7?auto=format&fit=crop&q=80&w=800`,
    `https://images.unsplash.com/photo-1464219414199-25421a1d05b5?auto=format&fit=crop&q=80&w=800`,
  ];

  return fallbackImages;
}
