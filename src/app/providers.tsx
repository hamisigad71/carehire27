"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/theme";
import { BusinessProvider } from "@/context/BusinessContext";
import { LoadingProvider } from "@/context/LoadingContext";
import { GlobalLoader } from "@/components/layout/GlobalLoader";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <LoadingProvider>
        <BusinessProvider>
          <GlobalLoader />
          {children}
        </BusinessProvider>
      </LoadingProvider>
    </ChakraProvider>
  );
}
