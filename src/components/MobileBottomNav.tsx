"use client";

import { Box, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import { useRouter, usePathname } from "next/navigation";
import { 
  FiHome, 
  FiCalendar, 
  FiUser,
  FiTruck,
  FiUsers,
  FiSettings,
} from "react-icons/fi";
import { useLoading } from "@/context/LoadingContext";

// ─── LIGHT TOKENS ─────────────────────────────────────────────────────────────
const L = {
  bg: "#f4f7f4",
  card: "#ffffff",
  cardBorder: "rgba(30,110,30,0.1)",
  accent: "#1e6e1e",
  accentLight: "#2d8c2d",
  accentGlow: "rgba(30,110,30,0.08)",
  accentGlow2: "rgba(30,110,30,0.14)",
  text: "#111a11",
  muted: "#6b7f6b",
};

// ─── CUSTOMER PORTAL NAV ──────────────────────────────────────────────────────
const CUSTOMER_NAV_ITEMS = [
  { label: "Home", path: "/customer", icon: FiHome },
  { label: "Bookings", path: "/customer/bookings", icon: FiCalendar },
  { label: "Fleet", path: "/customer/fleet", icon: FiTruck },
  { label: "Profile", path: "/customer/profile", icon: FiUser },
];

// ─── BUSINESS PORTAL NAV ──────────────────────────────────────────────────────
const BUSINESS_NAV_ITEMS = [
  { label: "Home", path: "/business/dashboard", icon: FiHome },
  { label: "Fleet", path: "/business/fleet", icon: FiTruck },
  { label: "Customers", path: "/business/customers", icon: FiUsers },
  { label: "Settings", path: "/business/settings", icon: FiSettings },
];

export function MobileBottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { setIsLoading } = useLoading();

  // ─── DETERMINE CURRENT PORTAL ──────────────────────────────────────────────
  const isBusinessPortal = pathname.startsWith("/business");
  const isCustomerPortal = pathname.startsWith("/customer");
  const navItems = isBusinessPortal ? BUSINESS_NAV_ITEMS : CUSTOMER_NAV_ITEMS;

  // ─── ONLY SHOW IF IN A PORTAL ──────────────────────────────────────────────
  if (!isBusinessPortal && !isCustomerPortal) {
    return null;
  }

  const handleNavClick = (path: string) => {
    if (pathname !== path) {
      setIsLoading(true);
      router.push(path);
    }
  };

  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };

  return (
    <Box
      display={{ base: "block", md: "none" }}
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      bg={L.card}
      borderTop="1px solid"
      borderColor={L.cardBorder}
      boxShadow="0 -4px 20px rgba(30,110,30,0.12)"
      zIndex={50}
      pb="env(safe-area-inset-bottom)"
    >
      <Flex justify="space-around" align="center" h="64px">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <VStack
              key={item.path}
              spacing={0.5}
              align="center"
              justify="center"
              flex={1}
              h="100%"
              cursor="pointer"
              onClick={() => handleNavClick(item.path)}
              transition="all 0.2s ease"
              _active={{ bg: L.accentGlow }}
              position="relative"
            >
              {/* underline indicator for active */}
              {active && (
                <Box
                  position="absolute"
                  bottom={0}
                  left={0}
                  right={0}
                  h="3px"
                  bg={L.accentLight}
                  borderRadius="2px 2px 0 0"
                />
              )}
              
              <Icon
                as={item.icon}
                boxSize={5}
                color={active ? L.accentLight : L.muted}
                transition="all 0.2s ease"
              />
              <Text
                fontSize="10px"
                fontWeight={active ? "700" : "600"}
                color={active ? L.accentLight : L.muted}
                transition="all 0.2s ease"
                textAlign="center"
                noOfLines={1}
              >
                {item.label}
              </Text>
            </VStack>
          );
        })}
      </Flex>
    </Box>
  );
}
