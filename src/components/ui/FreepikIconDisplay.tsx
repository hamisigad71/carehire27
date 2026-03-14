"use client";

import { Box, Image } from "@chakra-ui/react";
import { useFreepikIcon } from "@/hooks/useFreepikIcon";
import { ReactNode } from "react";

interface FreepikIconDisplayProps {
  query: string;
  fallbackIcon?: ReactNode;
  size?: string | number;
  boxSize?: string | number;
}

export const FreepikIconDisplay = ({
  query,
  fallbackIcon,
  size = "40px",
  boxSize = "44px",
}: FreepikIconDisplayProps) => {
  const { icon } = useFreepikIcon(query);

  // If no icon found, use fallback React Icon
  if (!icon?.url) {
    return <>{fallbackIcon}</>;
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Image
        src={icon.url}
        alt={icon.title}
        maxW={size}
        maxH={size}
        objectFit="contain"
      />
    </Box>
  );
};
