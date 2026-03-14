"use client";

import { Box } from "@chakra-ui/react";
import { CustomerNavbar } from "@/components/layout/CustomerNavbar";
import { CustomerFooter } from "@/components/layout/CustomerFooter";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box minH="100vh" bg="#f4f7f5">
      <CustomerNavbar />
      <Box as="main" minH="calc(100vh - 80px)">
        {children}
      </Box>
      <CustomerFooter />
    </Box>
  );
}
