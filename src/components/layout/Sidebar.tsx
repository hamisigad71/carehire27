"use client";

import {
  Box,
  Flex,
  VStack,
  Icon,
  Text,
  Tooltip,
  IconButton,
  CloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FiHome, FiCalendar, FiUsers, FiSettings, FiBarChart2, FiDollarSign, FiLogOut, FiMenu, FiChevronLeft, FiChevronRight, FiTool, FiActivity, FiCheckCircle, FiPlus, FiTrendingUp, FiUserCheck, FiShield, FiFileText, FiPackage, FiGlobe, FiLock } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import { useColorTokens } from "@/hooks/useColorTokens";
import { useState } from "react";
import { FaCar } from "react-icons/fa";

const navGroups = [
  {
    title: "Dashboards",
    items: [
      { label: "Operations", icon: FiHome, href: "/business/dashboard" },
      {
        label: "Finance",
        icon: FiBarChart2,
        href: "/business/finance",
      },
      {
        label: "Maintenance",
        icon: FiSettings,
        href: "/business/maintenance_dashboard",
      },
    ],
  },
  {
    title: "Fleet & Ops",
    items: [
      { label: "Inventory", icon: FaCar, href: "/business/fleet" },
      {
        label: "Add Vehicle",
        icon: FiPlus,
        href: "/business/onboarding/fleet-upload",
      },
      {
        label: "Inspections",
        icon: FiCheckCircle,
        href: "/business/vehicle_inspection_form",
      },
    ],
  },
  {
    title: "Rentals",
    items: [
      { label: "Bookings", icon: FiCalendar, href: "/business/bookings" },
      { label: "New Booking", icon: FiPlus, href: "/business/create_booking" },
      {
        label: "Growth Trends",
        icon: FiTrendingUp,
        href: "/business/booking_growth_trends",
      },
    ],
  },
  {
    title: "Management",
    items: [
      { label: "Customers", icon: FiUsers, href: "/business/customers" },
      { label: "Drivers", icon: FiUserCheck, href: "/business/drivers" },
      {
        label: "Team Accounts",
        icon: FiShield,
        href: "/business/staff_accounts",
      },
    ],
  },
  {
    title: "Finance",
    items: [
      { label: "Invoices", icon: FiFileText, href: "/business/invoices" },
      {
        label: "TX Ledger",
        icon: FiDollarSign,
        href: "/business/transaction_history",
      },
      {
        label: "Subscription",
        icon: FiPackage,
        href: "/business/subscription_management",
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        label: "Company Profile",
        icon: FiGlobe,
        href: "/business/company_profile",
      },
      {
        label: "Roles & RBAC",
        icon: FiLock,
        href: "/business/role_management",
      },
      {
        label: "Platform Settings",
        icon: FiSettings,
        href: "/business/settings",
      },
    ],
  },
];

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const tokens = useColorTokens();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const SidebarContent = () => (
    <VStack
      w="full"
      h="full"
      spacing={0}
      align="stretch"
      py={8}
      bg={tokens.sidebarBg}
      borderRight="1px solid"
      borderColor={tokens.border}
    >
      <Box px={6} mb={10}>
        <Flex align="center">
          <Box bg={tokens.accent} borderRadius="8px" boxSize="32px" mr={3} />
          {!isCollapsed && (
            <Text
              fontSize="18px"
              fontWeight="700"
              letterSpacing="-0.02em"
              color={tokens.textPrimary}
            >
              Elite CarHire
            </Text>
          )}
        </Flex>
      </Box>

      <Box
        flex={1}
        px={isCollapsed ? 2 : 4}
        overflowY="auto"
        className="hide-scrollbar"
      >
        {navGroups.map((group) => (
          <Box key={group.title} mb={6}>
            {!isCollapsed && (
              <Text
                fontSize="10px"
                fontWeight="600"
                letterSpacing="0.12em"
                textTransform="uppercase"
                color={tokens.textSubtle}
                px={4}
                mb={3}
              >
                {group.title}
              </Text>
            )}
            <VStack spacing={1} align="stretch">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Tooltip
                    key={item.href}
                    label={item.label}
                    isDisabled={!isCollapsed}
                    placement="right"
                    bg={tokens.cardBg}
                    color={tokens.textPrimary}
                  >
                    <Flex
                      align="center"
                      px={4}
                      py={3}
                      borderRadius="8px"
                      cursor="pointer"
                      bg={isActive ? tokens.sidebarActive : "transparent"}
                      borderLeft={
                        isActive ? `3px solid ${tokens.accent}` : "none"
                      }
                      transition="all 0.15s"
                      _hover={{ bg: tokens.sidebarActive }}
                      onClick={() => router.push(item.href)}
                    >
                      <Icon
                        as={item.icon}
                        boxSize={5}
                        color={isActive ? tokens.accent : tokens.textMuted}
                        mr={isCollapsed ? 0 : 3}
                      />
                      {!isCollapsed && (
                        <Text
                          fontSize="13px"
                          fontWeight={isActive ? "600" : "500"}
                          color={
                            isActive ? tokens.textPrimary : tokens.textMuted
                          }
                        >
                          {item.label}
                        </Text>
                      )}
                    </Flex>
                  </Tooltip>
                );
              })}
            </VStack>
          </Box>
        ))}
      </Box>

      <Box
        mb={4}
        borderTop="1px solid"
        borderColor={tokens.border}
        opacity={0.1}
      />

      <Box px={4} mb={4}>
        <Flex
          align="center"
          px={4}
          py={3}
          borderRadius="12px"
          bg={tokens.cardBg2}
        >
          <Box
            bg="gray.200"
            borderRadius="full"
            boxSize="32px"
            mr={isCollapsed ? 0 : 3}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={FiUsers} size="sm" />
          </Box>
          {!isCollapsed && (
            <Box overflow="hidden">
              <Text fontSize="13px" fontWeight="600" isTruncated>
                Admin User
              </Text>
              <Text fontSize="11px" color={tokens.textMuted}>
                Operations
              </Text>
            </Box>
          )}
        </Flex>
      </Box>

      <Flex
        px={6}
        py={4}
        align="center"
        cursor="pointer"
        color={tokens.danger}
        _hover={{ opacity: 0.8 }}
        onClick={() => router.push("/auth")}
      >
        <Icon as={FiLogOut} boxSize={5} mr={isCollapsed ? 0 : 3} />
        {!isCollapsed && (
          <Text fontSize="13px" fontWeight="600">
            Logout
          </Text>
        )}
      </Flex>
    </VStack>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <Box
        display={{ base: "none", lg: "block" }}
        w={isCollapsed ? "80px" : "280px"}
        h="100vh"
        transition="all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        position="sticky"
        top={0}
      >
        <SidebarContent />
        <IconButton
          aria-label="Toggle Sidebar"
          onClick={() => setIsCollapsed(!isCollapsed)}
          size="sm"
          borderRadius="full"
          position="absolute"
          right="-12px"
          top="40px"
          bg={tokens.sidebarBg}
          border="1px solid"
          borderColor={tokens.border}
          boxShadow={tokens.shadow}
          zIndex={2}
          _hover={{ bg: tokens.cardBg2 }}
          icon={isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
        />
      </Box>

      {/* Mobile Drawer Trigger */}
      <IconButton
        display={{ base: "flex", lg: "none" }}
        aria-label="Menu"
        onClick={onOpen}
        position="fixed"
        top={4}
        left={4}
        zIndex={10}
        bg={tokens.sidebarBg}
        boxShadow={tokens.shadow}
        icon={<FiMenu />}
      />

      {/* Mobile Sidebar */}
      {isOpen && (
        <>
          <Box
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="rgba(0,0,0,0.5)"
            backdropFilter="blur(4px)"
            zIndex={99}
            onClick={onClose}
          />
          <Box
            position="fixed"
            top={0}
            left={0}
            bottom={0}
            w="280px"
            bg={tokens.sidebarBg}
            zIndex={100}
            boxShadow="0 10px 40px rgba(0,0,0,0.2)"
          >
            <Box p={4} display="flex" justifyContent="flex-end">
              <CloseButton onClick={onClose} />
            </Box>
            <SidebarContent />
          </Box>
        </>
      )}
    </>
  );
};
