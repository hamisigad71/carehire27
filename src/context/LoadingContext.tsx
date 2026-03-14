"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-hide loader after 3-4 seconds
  useEffect(() => {
    if (isLoading) {
      // Clear existing timer if any
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Set new timer
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3500); // 3.5 seconds

      timerRef.current = timer;

      return () => {
        if (timer) {
          clearTimeout(timer);
        }
      };
    }
  }, [isLoading]);

  // Hide loader when pathname changes (page navigation complete)
  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
