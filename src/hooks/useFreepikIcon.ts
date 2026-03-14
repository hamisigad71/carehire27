import { useState, useEffect } from "react";
import { fetchFreepikIcon, FreepikIcon } from "@/utils/freepikIcons";

export function useFreepikIcon(query: string) {
  const [icon, setIcon] = useState<FreepikIcon | null>(null);

  useEffect(() => {
    if (!query) return;

    const loadIcon = async () => {
      try {
        const result = await fetchFreepikIcon(query);
        setIcon(result);
      } catch (err) {
        // Silent fail - fallback to React Icon
        setIcon(null);
      }
    };

    loadIcon();
  }, [query]);

  return { icon };
}
