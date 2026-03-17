"use client";

import { HStack, Box, Icon, VStack, Text, Flex } from "@chakra-ui/react";
import { FiHome, FiCalendar, FiHelpCircle, FiUser } from "react-icons/fi";
import { FaCar } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";

// ─── COLOR TOKENS ─────────────────────────────────────────────────────────────
const L = {
  bg: "#ffffff",
  accent: "#1e6e1e",
  accentLight: "#2d8c2d",
  muted: "#6b7f6b",
  border: "rgba(0,0,0,0.07)",
  shadow: "0 -4px 16px rgba(0,0,0,0.08)",
};

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { icon: FiHome, label: "Dashboard", href: "/customer" },
  { icon: FiCalendar, label: "Bookings", href: "/customer/bookings" },
  { icon: FaCar, label: "Fleet", href: "/customer/fleet" },
  { icon: FiHelpCircle, label: "Support", href: "/customer/support" },
  { icon: FiUser, label: "Profile", href: "/customer/profile" },
];

export function MobileBottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/customer" && pathname === "/customer") return true;
    if (href !== "/customer" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <Box
      display={{ base: "block", md: "none" }}
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      bg={L.bg}
      borderTop="1px solid"
      borderColor={L.border}
      boxShadow={L.shadow}
      zIndex={100}
      pb="env(safe-area-inset-bottom)"
    >
      <HStack
        spacing={0}
        justify="space-around"
        align="stretch"
        h="64px"
        px={2}
      >
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          return (
            <VStack
              key={item.label}
              cursor="pointer"
              spacing={0.5}
              justify="center"
              align="center"
              flex={1}
              h="100%"
              transition="all 0.2s ease"
              onClick={() => router.push(item.href)}
              _hover={{
                bg: "rgba(30,110,30,0.04)",
              }}
              py={2}
            >
              <Icon
                as={item.icon}
                boxSize={6}
                color={active ? L.accent : L.muted}
                transition="color 0.2s"
              />
              <Text
                fontSize="10px"
                fontWeight={active ? "700" : "500"}
                color={active ? L.accent : L.muted}
                textAlign="center"
                transition="color 0.2s"
                noOfLines={1}
              >
                {item.label}
              </Text>
            </VStack>
          );
        })}
      </HStack>
    </Box>
  );
}
