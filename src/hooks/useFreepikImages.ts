import { useState, useEffect } from "react";
import { fetchFreepikImages, FreepikImage } from "@/utils/freepik";

export function useFreepikImages(query: string, limit: number = 5) {
  const [images, setImages] = useState<FreepikImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;

    const loadImages = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchFreepikImages(query, limit);
        setImages(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load images");
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [query, limit]);

  return { images, loading, error };
}
