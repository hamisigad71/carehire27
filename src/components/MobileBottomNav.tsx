"use client";

import { Box, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import { useRouter, usePathname } from "next/navigation";
import { FiHome, FiBriefcase, FiUser, FiSettings } from "react-icons/fi";
import { useLoading } from "@/context/LoadingContext";

const NAV_ITEMS = [
  { label: "Home", path: "/", icon: FiHome },
  { label: "Business", path: "/business/dashboard", icon: FiBriefcase },
  { label: "Customer", path: "/customer", icon: FiUser },
  { label: "Settings", path: "/customer/settings", icon: FiSettings },
];

export function MobileBottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { setIsLoading } = useLoading();

  const handleNavClick = (path: string) => {
    if (pathname !== path) {
      setIsLoading(true);
      router.push(path);
    }
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <Box
      display={{ base: "block", md: "none" }}
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      bg="white"
      borderTop="1px solid"
      borderColor="rgba(0,0,0,0.07)"
      boxShadow="0 -2px 16px rgba(0,0,0,0.08)"
      zIndex={50}
      pb="env(safe-area-inset-bottom)"
    >
      <Flex justify="space-around" align="center" h="60px">
        {NAV_ITEMS.map((item) => {
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
              _active={{ bg: "rgba(30,110,30,0.05)" }}
            >
              <Icon
                as={item.icon}
                boxSize={5}
                color={active ? "#1e6e1e" : "#6b7f6b"}
                transition="all 0.2s ease"
              />
              <Text
                fontSize="9px"
                fontWeight={active ? "700" : "600"}
                color={active ? "#1e6e1e" : "#6b7f6b"}
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
