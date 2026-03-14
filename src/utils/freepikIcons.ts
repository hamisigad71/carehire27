export interface FreepikIcon {
  id: string;
  url: string;
  title: string;
  source: "freepik";
}

export async function fetchFreepikIcon(
  query: string,
): Promise<FreepikIcon | null> {
  try {
    const response = await fetch(
      `/api/freepik/icons?query=${encodeURIComponent(query)}&limit=1`,
    );

    if (!response.ok) {
      console.warn("Failed to fetch Freepik icon:", response.statusText);
      return null;
    }

    const data = await response.json();

    // If fallback is true or no icons, return null to use React Icon
    if (data.fallback || !data.icons || data.icons.length === 0) {
      return null;
    }

    return data.icons?.[0] || null;
  } catch (error) {
    console.warn("Error fetching Freepik icon:", error);
    return null;
  }
}

// Icon keywords for checkout steps
export const CHECKOUT_ICONS = {
  identity: "identity card icon",
  biometrics: "fingerprint security icon",
  guarantee: "shield check mark icon",
  payment: "credit card payment icon",
} as const;

// Icon keywords for vehicle features
export const VEHICLE_ICONS = {
  seats: "people users icon",
  transmission: "settings gear icon",
  fuel: "fuel gas pump icon",
  mileage: "speedometer gauge icon",
  engine: "engine motor icon",
  trunk: "cargo box icon",
} as const;
