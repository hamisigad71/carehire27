"use client";

import { useState } from "react";
import {
  Box,
  Flex,
  HStack,
  Text,
  Button,
  Container,
  Icon,
  Circle,
  Badge,
  VStack,
  Divider,
  Spacer,
} from "@chakra-ui/react";
import {
  FiMenu,
  FiUser,
  FiLogOut,
  FiX,
  FiHome,
  FiCalendar,
  FiMapPin,
  FiTag,
  FiBell,
  FiSun,
} from "react-icons/fi";
import { FaCar } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";

// ─── LIGHT TOKENS ─────────────────────────────────────────────────────────────
const L = {
  bg: "#ffffff",
  pageBg: "#f4f7f4",
  cardBorder: "rgba(30,110,30,0.12)",
  accent: "#1e6e1e",
  accentLight: "#2d8c2d",
  accentGlow: "rgba(30,110,30,0.08)",
  accentGlow2: "rgba(30,110,30,0.14)",
  text: "#111a11",
  textSub: "#3a4d3a",
  muted: "#6b7f6b",
  subtle: "#9aaa9a",
  border: "rgba(0,0,0,0.07)",
  shadow: "0 1px 16px rgba(0,0,0,0.07)",
  red: "#c0392b",
  redBg: "rgba(192,57,43,0.06)",
};

// ─── STYLES ───────────────────────────────────────────────────────────────────
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');

    @keyframes slideDown {
      from { opacity:0; transform:translateY(-10px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes mobileSlide {
      from { opacity:0; transform:translateX(100%); }
      to   { opacity:1; transform:translateX(0); }
    }

    .nav-link {
      position: relative;
      transition: color .18s ease;
      cursor: pointer;
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      font-weight: 600;
      color: ${L.muted};
    }
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -4px; left: 0;
      width: 0; height: 2px;
      background: ${L.accentLight};
      border-radius: 99px;
      transition: width .25s ease;
    }
    .nav-link:hover { color: ${L.accentLight}; }
    .nav-link:hover::after { width: 100%; }
    .nav-link.active { color: ${L.accentLight}; }
    .nav-link.active::after { width: 100%; }

    .nav-btn-primary {
      transition: all .22s ease !important;
    }
    .nav-btn-primary:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 8px 24px rgba(30,110,30,0.32) !important;
    }
    .nav-btn-primary:active { transform: translateY(0) !important; }

    .nav-icon-btn {
      transition: all .18s ease;
      cursor: pointer;
    }
    .nav-icon-btn:hover {
      background: ${L.accentGlow} !important;
      border-color: ${L.cardBorder} !important;
    }

    .mobile-link {
      transition: background .15s ease, transform .15s ease;
      cursor: pointer;
    }
    .mobile-link:hover {
      background: ${L.accentGlow} !important;
      transform: translateX(4px);
    }
    .mobile-link.active { background: ${L.accentGlow2} !important; }

    .mobile-drawer {
      animation: mobileSlide .3s cubic-bezier(.25,.46,.45,.94) both;
    }

    .search-input {
      flex: 1;
      height: 38px;
      border: 1px solid ${L.cardBorder};
      border-radius: 10px 0 0 10px;
      padding: 0 14px;
      font-family: 'DM Sans', sans-serif;
      font-size: 13px;
      color: ${L.text};
      background: ${L.pageBg};
      outline: none;
    }
    .search-input:focus {
      border-color: ${L.accentLight};
      box-shadow: 0 0 0 3px rgba(30,110,30,0.1);
    }
    .search-input::placeholder { color: ${L.subtle}; }

    .search-btn {
      height: 38px; width: 38px;
      background: ${L.accent};
      border: none; border-radius: 0 10px 10px 0;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer;
      transition: background .2s ease;
    }
    .search-btn:hover { background: ${L.accentLight}; }

    .notif-dot {
      position: absolute;
      top: 2px; right: 2px;
      width: 8px; height: 8px;
      background: #e05252;
      border-radius: 50%;
      border: 1.5px solid white;
    }
  `}</style>
);

// ─── NAV LINKS ────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home", href: "/customer", icon: FiHome },
  { label: "Locations", href: "/customer/locations", icon: FiMapPin },
  { label: "Offers", href: "/customer/offers", icon: FiTag },
  { label: "Vehicle", href: "/customer/fleet", icon: FaCar },
  { label: "Bookings", href: "/customer/bookings", icon: FiCalendar },
  { label: "Profile", href: "/customer/profile", icon: FiUser },
];

const MOBILE_EXTRAS = [];

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
export const CustomerNavbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const go = (href: string) => {
    router.push(href);
    setMenuOpen(false);
  };
  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(href + "/");

  return (
    <>
      <Styles />

      {/* ── NAVBAR ── */}
      <Box
        bg={L.bg}
        borderBottom="1px solid"
        borderColor={L.cardBorder}
        position="sticky"
        top={0}
        zIndex={200}
        boxShadow={L.shadow}
        fontFamily="'DM Sans', sans-serif"
      >
        <Container maxW="1280px" px={{ base: 4, md: 6 }}>
          <Flex align="center" h="68px" gap={6}>
            {/* Logo */}
            <HStack
              spacing={2.5}
              cursor="pointer"
              flexShrink={0}
              onClick={() => router.push("/customer")}
            >
              <Box
                w={9}
                h={9}
                bg={L.accent}
                borderRadius="xl"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text fontSize="lg">🚘</Text>
              </Box>
              <Text
                fontFamily="'Syne', sans-serif"
                fontWeight="800"
                fontSize="18px"
                color={L.text}
                letterSpacing="-0.02em"
              >
                Drive
                <Text as="span" color={L.accentLight}>
                  KE
                </Text>
              </Text>
            </HStack>

            {/* Desktop nav links */}
            <HStack spacing={7} display={{ base: "none", lg: "flex" }}>
              {NAV_LINKS.map((link) => (
                <span
                  key={link.href}
                  className={`nav-link${isActive(link.href) ? " active" : ""}`}
                  onClick={() => go(link.href)}
                >
                  {link.label}
                </span>
              ))}
            </HStack>

            <Spacer />

            {/* Right side buttons - Desktop */}
            <HStack spacing={2} display={{ base: "none", lg: "flex" }}>
              {/* Notification button */}
              <Box
                className="nav-icon-btn"
                w="40px"
                h="40px"
                borderRadius="10px"
                border="1px solid"
                borderColor={L.border}
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                position="relative"
                _hover={{ bg: L.accentGlow, borderColor: L.cardBorder }}
              >
                <Icon as={FiBell} boxSize={5} color={L.muted} />
                {notifications && (
                  <Box
                    position="absolute"
                    top="2px"
                    right="2px"
                    w="8px"
                    h="8px"
                    bg="#e05252"
                    borderRadius="50%"
                    border="1.5px solid white"
                  />
                )}
              </Box>

              {/* Light mode button */}
              <Box
                className="nav-icon-btn"
                w="40px"
                h="40px"
                borderRadius="10px"
                border="1px solid"
                borderColor={L.border}
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                _hover={{ bg: L.accentGlow, borderColor: L.cardBorder }}
              >
                <Icon as={FiSun} boxSize={5} color={L.muted} />
              </Box>

              {/* Profile button */}
              <Box
                className="nav-icon-btn"
                w="40px"
                h="40px"
                borderRadius="10px"
                border="1px solid"
                borderColor={L.border}
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                _hover={{ bg: L.accentGlow, borderColor: L.cardBorder }}
                onClick={() => go("/customer/profile")}
              >
                <Icon
                  as={FiUser}
                  boxSize={5}
                  color={
                    isActive("/customer/profile") ? L.accentLight : L.muted
                  }
                />
              </Box>

              {/* Sign out button */}
              <Button
                size="sm"
                h="40px"
                px={4}
                bg="transparent"
                color={L.red}
                border="1px solid"
                borderColor={L.red}
                borderRadius="10px"
                fontWeight="600"
                fontSize="13px"
                _hover={{ bg: L.redBg, borderColor: L.red }}
                leftIcon={<Icon as={FiLogOut} boxSize={5} />}
                onClick={() => router.push("/auth")}
              >
                Sign Out
              </Button>
            </HStack>

            {/* Mobile hamburger */}
            <Box
              display={{ base: "flex", lg: "none" }}
              className="nav-icon-btn"
              w={{ base: "44px", lg: "36px" }}
              h={{ base: "44px", lg: "36px" }}
              borderRadius="10px"
              border="1.5px solid"
              borderColor="#ffffff"
              bg={L.accentGlow}
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
              onClick={() => setMenuOpen(true)}
            >
              <Icon
                as={FiMenu}
                boxSize={{ base: 7, lg: 5.5 }}
                color={L.accent}
              />
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* ── MOBILE OVERLAY ── */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <Box
            position="fixed"
            inset={0}
            zIndex={299}
            bg="rgba(0,0,0,0.35)"
            backdropFilter="blur(4px)"
            onClick={() => setMenuOpen(false)}
          />

          {/* Drawer */}
          <Box
            className="mobile-drawer"
            position="fixed"
            top={0}
            right={0}
            bottom={0}
            zIndex={300}
            w={{ base: "100%", sm: "360px" }}
            bg={L.bg}
            overflowY="auto"
            boxShadow="-8px 0 40px rgba(0,0,0,0.12)"
          >
            {/* Drawer header */}
            <Box bg={L.accent} px={5} pt={10} pb={6}>
              <Flex align="center" justify="space-between" mb={5}>
                <HStack spacing={2}>
                  <Box
                    w={8}
                    h={8}
                    bg="rgba(255,255,255,0.2)"
                    borderRadius="lg"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text fontSize="md">🚘</Text>
                  </Box>
                  <Text
                    fontFamily="'Syne', sans-serif"
                    fontWeight="800"
                    fontSize="16px"
                    color="white"
                  >
                    DriveKE
                  </Text>
                </HStack>
                <Box
                  w="32px"
                  h="32px"
                  bg="rgba(255,255,255,0.15)"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  cursor="pointer"
                  onClick={() => setMenuOpen(false)}
                >
                  <Icon as={FiX} color="white" boxSize={4} />
                </Box>
              </Flex>

              {/* User card inside drawer */}
              <HStack
                spacing={3}
                bg="rgba(255,255,255,0.1)"
                borderRadius="16px"
                p={3}
                border="1px solid rgba(255,255,255,0.18)"
              >
                <Circle size="40px" bg="rgba(255,255,255,0.2)">
                  <Text fontSize="14px" fontWeight="800" color="white">
                    JK
                  </Text>
                </Circle>
                <Box flex={1}>
                  <Text fontSize="14px" fontWeight="700" color="white">
                    James Kariuki
                  </Text>
                  <Text fontSize="11px" color="rgba(255,255,255,0.65)">
                    Gold Member · 2,450 pts
                  </Text>
                </Box>
                <Box
                  bg="rgba(255,255,255,0.15)"
                  borderRadius="full"
                  px={2.5}
                  py={1}
                >
                  <Text fontSize="10px" fontWeight="700" color="white">
                    ⭐ Gold
                  </Text>
                </Box>
              </HStack>
            </Box>

            {/* Main nav links */}
            <Box px={4} py={4}>
              <Text
                fontSize="10px"
                fontWeight="700"
                color={L.subtle}
                textTransform="uppercase"
                letterSpacing="0.1em"
                px={2}
                mb={2}
              >
                Navigation
              </Text>
              <VStack spacing={1} align="stretch">
                {NAV_LINKS.map((link) => (
                  <Flex
                    key={link.href}
                    className={`mobile-link${isActive(link.href) ? " active" : ""}`}
                    align="center"
                    gap={3}
                    px={3}
                    py={3}
                    borderRadius="14px"
                    onClick={() => go(link.href)}
                  >
                    <Circle
                      size="34px"
                      bg={isActive(link.href) ? L.accentGlow2 : L.pageBg}
                    >
                      <Icon
                        as={link.icon}
                        boxSize={4}
                        color={isActive(link.href) ? L.accentLight : L.muted}
                      />
                    </Circle>
                    <Text
                      fontSize="14px"
                      fontWeight={isActive(link.href) ? "700" : "600"}
                      color={isActive(link.href) ? L.accentLight : L.text}
                    >
                      {link.label}
                    </Text>
                    {isActive(link.href) && (
                      <Box
                        ml="auto"
                        w="6px"
                        h="6px"
                        borderRadius="full"
                        bg={L.accentLight}
                      />
                    )}
                  </Flex>
                ))}
              </VStack>
            </Box>

            {/* CTA + Sign out */}
            <Box px={4} py={5}>
              <Button
                w="100%"
                h="44px"
                variant="ghost"
                color={L.red}
                borderRadius="14px"
                fontWeight="600"
                fontSize="13px"
                _hover={{ bg: L.redBg }}
                leftIcon={<Icon as={FiLogOut} boxSize={3.5} />}
                onClick={() => go("/auth")}
              >
                Sign Out
              </Button>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};
