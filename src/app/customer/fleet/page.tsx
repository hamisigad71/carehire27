"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Button,
  Icon,
  SimpleGrid,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  HStack,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Circle,
  Spacer,
  Image,
  Grid,
} from "@chakra-ui/react";
import {
  FiSearch,
  FiFilter,
  FiTrendingUp,
  FiChevronRight,
  FiAlertCircle,
  FiZap,
  FiStar,
  FiMapPin,
  FiClock,
  FiShield,
  FiArrowRight,
  FiCheckCircle,
  FiX,
} from "react-icons/fi";
import { useColorTokens } from "@/hooks/useColorTokens";
import { VehicleCard } from "@/components/ui/VehicleCard";
import { Vehicle } from "@/types";

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
  textSub: "#3a4d3a",
  muted: "#6b7f6b",
  subtle: "#9aaa9a",
  border: "rgba(0,0,0,0.07)",
  shadow: "0 1px 12px rgba(0,0,0,0.06)",
  shadowMd: "0 4px 24px rgba(0,0,0,0.09)",
  inputBg: "#f8faf8",
  inputBorder: "rgba(30,110,30,0.2)",
};

// ─── STYLES ───────────────────────────────────────────────────────────────────
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

    @keyframes fadeUp {
      from { opacity:0; transform:translateY(18px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes floatY {
      0%,100% { transform: translateY(0); }
      50%      { transform: translateY(-10px); }
    }
    @keyframes spinRing {
      to { transform: rotate(360deg); }
    }
    @keyframes pulse { 0%,100%{opacity:1;}50%{opacity:.45;} }

    .fu  { animation: fadeUp .55s ease both; }
    .fu1 { animation: fadeUp .55s .08s ease both; }
    .fu2 { animation: fadeUp .55s .16s ease both; }
    .fu3 { animation: fadeUp .55s .24s ease both; }
    .fu4 { animation: fadeUp .55s .32s ease both; }

    .float { animation: floatY 5s ease-in-out infinite; }
    .spin  { animation: spinRing 18s linear infinite; }
    .pulse-dot { animation: pulse 2s ease-in-out infinite; }

    /* hero */
    .hero-bg {
      background: linear-gradient(145deg, #f4f7f4 0%, #e8f1e8 45%, #f0f6f0 100%);
      position: relative;
      overflow: hidden;
      border-radius: 0 0 40px 40px;
    }
    .hero-grid-overlay {
      position: absolute; inset: 0;
      background-image:
        linear-gradient(rgba(30,110,30,0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(30,110,30,0.05) 1px, transparent 1px);
      background-size: 44px 44px;
      pointer-events: none;
    }
    .hero-orb-1 {
      position: absolute;
      width: 380px; height: 380px;
      background: radial-gradient(circle, rgba(45,140,45,0.12) 0%, transparent 70%);
      top: -100px; right: -80px;
      border-radius: 50%;
      pointer-events: none;
    }
    .hero-orb-2 {
      position: absolute;
      width: 260px; height: 260px;
      background: radial-gradient(circle, rgba(30,110,30,0.1) 0%, transparent 70%);
      bottom: -60px; left: -40px;
      border-radius: 50%;
      pointer-events: none;
    }
    .hero-spin-ring {
      position: absolute;
      top: 60px; right: 120px;
      width: 180px; height: 180px;
      border: 1px solid rgba(30,110,30,0.15);
      border-radius: 50%;
      pointer-events: none;
    }
    .hero-spin-ring::before {
      content: '';
      position: absolute; inset: -1px;
      border-radius: 50%;
      border: 1px solid transparent;
      border-top-color: rgba(30,110,30,0.3);
      border-right-color: rgba(30,110,30,0.1);
      animation: spinRing 4s linear infinite;
    }

    /* filter bar */
    .filter-input {
      transition: border-color .2s ease, box-shadow .2s ease !important;
    }
    .filter-input:focus {
      border-color: ${L.accentLight} !important;
      box-shadow: 0 0 0 3px rgba(30,110,30,0.12) !important;
      outline: none !important;
    }
    .filter-input:hover { border-color: rgba(30,110,30,0.35) !important; }

    /* category pills */
    .cat-pill {
      transition: all .2s ease;
      cursor: pointer;
      white-space: nowrap;
    }
    .cat-pill:hover { transform: translateY(-1px); }
    .cat-pill.active { transform: translateY(-1px); }

    /* cards grid */
    .vehicle-grid-item {
      animation: fadeUp .55s ease both;
    }

    /* load more */
    .load-more-btn {
      transition: all .2s ease !important;
    }
    .load-more-btn:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 8px 24px rgba(30,110,30,0.2) !important;
    }

    /* hide scrollbar */
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `}</style>
);

// ─── DATA ─────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  "All",
  "Luxury",
  "Electric",
  "SUV",
  "Sports",
  "Economy",
  "Mid-Range",
];

const DEMO_VEHICLES: Vehicle[] = [
  {
    id: "v1",
    name: "Mercedes GLE 450",
    type: "Luxury",
    license: "KDD 345A",
    price: 12000,
    status: "Available",
    year: 2024,
    seats: 5,
    transmission: "Auto",
    mileage: "18K km",
    condition: "Excellent",
    fuelType: "Petrol",
    rating: 4.9,
    reviewCount: 34,
    driverAvailable: true,
    image:
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=700&h=440&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=700&h=440&fit=crop",
    ],
  },
  {
    id: "v2",
    name: "Toyota Prado 2024",
    type: "SUV",
    license: "KDD 892Z",
    price: 8500,
    status: "Available",
    year: 2024,
    seats: 7,
    transmission: "Auto",
    mileage: "22K km",
    condition: "Excellent",
    fuelType: "Diesel",
    rating: 4.8,
    reviewCount: 56,
    driverAvailable: false,
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=700&h=440&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=700&h=440&fit=crop",
    ],
  },
  {
    id: "v3",
    name: "Range Rover Sport",
    type: "Luxury",
    license: "KCB 210X",
    price: 18000,
    status: "Rented",
    year: 2023,
    seats: 5,
    transmission: "Auto",
    mileage: "31K km",
    condition: "Excellent",
    fuelType: "Diesel",
    rating: 5.0,
    reviewCount: 21,
    driverAvailable: true,
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=700&h=440&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=700&h=440&fit=crop",
    ],
  },
  {
    id: "v4",
    name: "VW Tiguan 2024",
    type: "SUV",
    license: "KBZ 441P",
    price: 7800,
    status: "Available",
    year: 2024,
    seats: 5,
    transmission: "Auto",
    mileage: "15K km",
    condition: "Good",
    fuelType: "Petrol",
    rating: 4.6,
    reviewCount: 43,
    driverAvailable: false,
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=700&h=440&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=700&h=440&fit=crop",
    ],
  },
  {
    id: "v5",
    name: "Lexus LX 570 Disponible",
    type: "Luxury",
    license: "KDD 109F",
    price: 9500,
    status: "Available",
    year: 2024,
    seats: 5,
    transmission: "Auto",
    mileage: "9K km",
    condition: "Excellent",
    fuelType: "Electric",
    rating: 4.9,
    reviewCount: 28,
    driverAvailable: true,
    image:
      "https://i.pinimg.com/1200x/2b/f2/5e/2bf25e33f3c1108363a4c96fbac8ad6a.jpg",
    images: [
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=700&h=440&fit=crop",
    ],
  },
  {
    id: "v6",
    name: "Toyota Camry 2024",
    type: "Mid-Range",
    license: "KDD 567M",
    price: 6500,
    status: "Available",
    year: 2024,
    seats: 5,
    transmission: "Auto",
    mileage: "12K km",
    condition: "Good",
    fuelType: "Hybrid",
    rating: 4.7,
    reviewCount: 62,
    driverAvailable: false,
    image:
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=700&h=440&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=700&h=440&fit=crop",
    ],
  },
];

// ─── TRUST PILLS ─────────────────────────────────────────────────────────────
function TrustPills() {
  const items = [
    { icon: FiShield, text: "Fully insured" },
    { icon: FiStar, text: "4.9 avg rating" },
    { icon: FiClock, text: "Instant booking" },
    { icon: FiMapPin, text: "Nairobi-wide" },
  ];
  return (
    <HStack spacing={3} flexWrap="wrap">
      {items.map((item) => (
        <HStack
          key={item.text}
          spacing={2}
          bg="rgba(30,110,30,0.08)"
          border="1px solid rgba(30,110,30,0.15)"
          borderRadius="full"
          px={3}
          py={1.5}
          backdropFilter="none"
        >
          <Icon as={item.icon} color="#2d8c2d" boxSize={3} />
          <Text fontSize="11px" fontWeight="600" color="#1e6e1e">
            {item.text}
          </Text>
        </HStack>
      ))}
    </HStack>
  );
}

// ─── STAT CHIPS ──────────────────────────────────────────────────────────────
function HeroStats() {
  return (
    <HStack spacing={6} mt={6} flexWrap="wrap">
      {[
        { n: "124+", l: "Vehicles" },
        { n: "2,400+", l: "Happy Clients" },
        { n: "4.9★", l: "Avg Rating" },
      ].map(({ n, l }) => (
        <Box key={l}>
          <Text
            fontFamily="'Syne', sans-serif"
            fontSize={{ base: "22px", md: "26px" }}
            fontWeight="800"
            color={L.accent}
            lineHeight="1"
          >
            {n}
          </Text>
          <Text fontSize="11px" color={L.muted} mt={0.5}>
            {l}
          </Text>
        </Box>
      ))}
    </HStack>
  );
}

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <Box
      className="hero-bg"
      mb={8}
      pt={{ base: 10, md: 14 }}
      pb={{ base: 14, md: 20 }}
    >
      <div className="hero-grid-overlay" />
      <div className="hero-orb-1" />
      <div className="hero-orb-2" />
      <div className="hero-spin-ring" />

      <Container maxW="1200px" position="relative" zIndex={2}>
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
          gap={10}
          alignItems="center"
        >
          {/* Left copy */}
          <VStack align="start" spacing={5}>
            {/* Breadcrumb */}
            <Breadcrumb
              spacing="6px"
              separator={
                <Icon
                  as={FiChevronRight}
                  color="rgba(17,26,17,0.25)"
                  boxSize={3}
                />
              }
              fontSize="12px"
              fontWeight="600"
              className="fu"
            >
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/customer"
                  color="rgba(255,255,255,0.5)"
                  _hover={{ color: "rgba(255,255,255,0.85)" }}
                >
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink color="rgba(255,255,255,0.85)">
                  Browse Fleet
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>

            {/* Tag */}
            <HStack className="fu1" spacing={2}>
              <Box
                className="pulse-dot"
                w="7px"
                h="7px"
                borderRadius="full"
                bg="#2d8c2d"
              />
              <Text
                fontSize="12px"
                fontWeight="700"
                color="#2d8c2d"
                letterSpacing="0.12em"
                textTransform="uppercase"
              >
                124+ Premium Vehicles Available
              </Text>
            </HStack>

            {/* Headline */}
            <Heading
              className="fu2"
              fontFamily="'Syne', sans-serif"
              fontSize={{ base: "36px", md: "50px", lg: "58px" }}
              fontWeight="800"
              color="#111a11"
              lineHeight="1.05"
              letterSpacing="-0.03em"
            >
              Browse Our{" "}
              <Text
                as="span"
                bgGradient="linear(135deg, #1e6e1e, #2d8c2d)"
                bgClip="text"
              >
                Elite Fleet
              </Text>
            </Heading>

            <Text
              className="fu3"
              fontSize={{ base: "14px", md: "16px" }}
              color="#6b7f6b"
              lineHeight="1.75"
              fontWeight="300"
              maxW="440px"
            >
              Choose from Kenya's finest collection of luxury, electric, and
              premium vehicles. Instant booking, fully insured.
            </Text>

            <Box className="fu4">
              <TrustPills />
            </Box>

            <HeroStats />
          </VStack>

          {/* Right: floating car card */}
          <Box display="block" position="relative">
            <Box
              className="float"
              borderRadius={{ base: "16px", md: "28px" }}
              overflow="hidden"
              border="1px solid rgba(255,255,255,0.12)"
              boxShadow={{
                base: "0 12px 32px rgba(0,0,0,0.25)",
                md: "0 32px 80px rgba(0,0,0,0.45)",
              }}
            >
              <Image
                src="https://i.pinimg.com/736x/2d/5d/c5/2d5dc53eb5a285b3fa468bc485ae881e.jpg"
                w="100%"
                h={{ base: "170px", md: "260px" }}
                objectFit="cover"
                objectPosition="center 55%"
                style={{ filter: "brightness(0.82)" }}
              />
              <Box
                bg="linear-gradient(180deg, transparent 0%, rgba(13,46,13,0.9) 100%)"
                position="absolute"
                inset={0}
              />
              <Box
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                px={{ base: 3, md: 6 }}
                py={{ base: 3, md: 5 }}
              >
                <HStack justify="space-between" align="flex-end">
                  <Box>
                    <Text
                      fontSize={{ base: "9px", md: "11px" }}
                      color="rgba(255,255,255,0.5)"
                      fontWeight="600"
                      textTransform="uppercase"
                      letterSpacing="0.08em"
                      mb={0.5}
                    >
                      Featured today
                    </Text>
                    <Text
                      fontFamily="'Syne', sans-serif"
                      fontSize={{ base: "13px", md: "18px" }}
                      fontWeight="800"
                      color="white"
                    >
                      Mercedes GLE 450
                    </Text>
                    <HStack spacing={0.5} mt={1}>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Box
                          key={s}
                          w={{ base: "7px", md: "10px" }}
                          h={{ base: "7px", md: "10px" }}
                          borderRadius="full"
                          bg="#f5c842"
                        />
                      ))}
                      <Text
                        fontSize={{ base: "9px", md: "11px" }}
                        color="rgba(255,255,255,0.55)"
                        ml={1}
                      >
                        4.9
                      </Text>
                    </HStack>
                  </Box>
                  <Box textAlign="right">
                    <Text
                      fontSize={{ base: "9px", md: "11px" }}
                      color="rgba(255,255,255,0.5)"
                      fontWeight="600"
                    >
                      From
                    </Text>
                    <Text
                      fontFamily="'Syne', sans-serif"
                      fontSize={{ base: "16px", md: "22px" }}
                      fontWeight="800"
                      color="#72c472"
                    >
                      KSh 12K
                    </Text>
                    <Text
                      fontSize={{ base: "8px", md: "10px" }}
                      color="rgba(255,255,255,0.4)"
                    >
                      per day
                    </Text>
                  </Box>
                </HStack>
              </Box>
            </Box>

            {/* Floating chip */}
            <Box
              position="absolute"
              top={{ base: "-8px", md: "-14px" }}
              right={{ base: "-8px", md: "-14px" }}
              bg={L.card}
              borderRadius={{ base: "12px", md: "18px" }}
              px={{ base: 2.5, md: 4 }}
              py={{ base: 2, md: 3 }}
              border="1px solid"
              borderColor={L.cardBorder}
              boxShadow={L.shadowMd}
            >
              <Text
                fontSize={{ base: "8px", md: "10px" }}
                color={L.muted}
                fontWeight="600"
                mb="2px"
              >
                This week
              </Text>
              <Text
                fontFamily="'Syne', sans-serif"
                fontSize={{ base: "16px", md: "20px" }}
                fontWeight="800"
                color={L.accentLight}
                lineHeight="1"
              >
                38
              </Text>
              <Text fontSize={{ base: "8px", md: "10px" }} color={L.muted}>
                Bookings made
              </Text>
            </Box>

            {/* Availability chip */}
            <Box
              position="absolute"
              bottom={{ base: "-8px", md: "-14px" }}
              left={{ base: "-8px", md: "-14px" }}
              bg={L.card}
              borderRadius={{ base: "12px", md: "16px" }}
              px={{ base: 2.5, md: 4 }}
              py={{ base: 2, md: 3 }}
              border="1px solid"
              borderColor={L.cardBorder}
              boxShadow={L.shadowMd}
            >
              <HStack spacing={{ base: 1.5, md: 2.5 }}>
                <Circle size={{ base: "24px", md: "32px" }} bg={L.accentGlow2}>
                  <Icon
                    as={FiCheckCircle}
                    color={L.accentLight}
                    boxSize={{ base: 2.5, md: 3.5 }}
                  />
                </Circle>
                <Box>
                  <Text
                    fontSize={{ base: "11px", md: "12px" }}
                    fontWeight="700"
                    color={L.text}
                  >
                    84 vehicles
                  </Text>
                  <Text fontSize={{ base: "9px", md: "10px" }} color={L.muted}>
                    available right now
                  </Text>
                </Box>
              </HStack>
            </Box>
          </Box>
        </Grid>
      </Container>

      {/* Bottom wave clip */}
      <Box position="absolute" bottom={0} left={0} right={0}>
        <svg
          viewBox="0 0 1440 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block" }}
        >
          <path
            d="M0 40 Q360 0 720 20 Q1080 40 1440 10 L1440 40 Z"
            fill="#f4f7f4"
          />
        </svg>
      </Box>
    </Box>
  );
}

// ─── FILTER BAR ───────────────────────────────────────────────────────────────
function FilterBar({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  selectedCategory,
  setSelectedCategory,
}: any) {
  return (
    <Box
      bg={L.card}
      borderRadius="24px"
      border="1px solid"
      borderColor={L.cardBorder}
      boxShadow={L.shadow}
      p={{ base: 4, md: 6 }}
      mb={6}
    >
      <Flex direction={{ base: "column", md: "row" }} gap={3} mb={4}>
        {/* Search */}
        <InputGroup flex={2}>
          <InputLeftElement h="48px" pl={3} pointerEvents="none">
            <Icon as={FiSearch} color={L.subtle} boxSize={4} />
          </InputLeftElement>
          <Input
            className="filter-input"
            placeholder="Search models, brands, types…"
            h="48px"
            pl="42px"
            bg={L.inputBg}
            border="1px solid"
            borderColor={L.inputBorder}
            borderRadius="14px"
            fontSize="14px"
            color={L.text}
            _placeholder={{ color: L.subtle }}
            _focus={{}}
            value={searchQuery}
            onChange={(e: any) => setSearchQuery(e.target.value)}
          />
        </InputGroup>

        {/* Sort + Filter */}
        <HStack spacing={3} flex={1}>
          <Select
            className="filter-input"
            h="48px"
            bg={L.inputBg}
            border="1px solid"
            borderColor={L.inputBorder}
            borderRadius="14px"
            fontSize="13px"
            color={L.text}
            _focus={{}}
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
          >
            <option value="popular">Popular</option>
            <option value="price-low">Price: Low → High</option>
            <option value="price-high">Price: High → Low</option>
            <option value="newest">Newest First</option>
          </Select>

          <Button
            h="48px"
            px={5}
            variant="outline"
            borderColor={L.cardBorder}
            color={L.muted}
            borderRadius="14px"
            fontWeight="700"
            fontSize="13px"
            leftIcon={<Icon as={FiFilter} boxSize={3.5} />}
            _hover={{
              bg: L.accentGlow,
              borderColor: L.accentLight,
              color: L.accentLight,
            }}
            flexShrink={0}
          >
            Filters
          </Button>
        </HStack>
      </Flex>

      {/* Category pills */}
      <Flex gap={2} overflowX="auto" className="no-scrollbar" pb={1}>
        {CATEGORIES.map((cat) => {
          const active = selectedCategory === cat;
          return (
            <Box
              key={cat}
              className={`cat-pill${active ? " active" : ""}`}
              px={4}
              py={2}
              borderRadius="full"
              fontSize="12px"
              fontWeight="700"
              bg={active ? L.accent : L.inputBg}
              color={active ? "white" : L.muted}
              border="1px solid"
              borderColor={active ? L.accent : L.border}
              boxShadow={active ? "0 4px 14px rgba(30,110,30,0.28)" : "none"}
              onClick={() => setSelectedCategory(cat)}
              style={{ cursor: "pointer", flexShrink: 0 }}
            >
              {cat}
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
}

// ─── RESULTS INFO ────────────────────────────────────────────────────────────
function ResultsInfo({ count, onClear, hasFilters }: any) {
  return (
    <Flex align="center" justify="space-between" mb={6} flexWrap="wrap" gap={3}>
      <HStack spacing={2}>
        <Text fontSize="13px" color={L.muted}>
          Showing
        </Text>
        <Text fontSize="13px" fontWeight="800" color={L.text}>
          {count}
        </Text>
        <Text fontSize="13px" color={L.muted}>
          vehicle{count !== 1 ? "s" : ""}
        </Text>
        {hasFilters && (
          <Button
            size="xs"
            variant="ghost"
            color={L.muted}
            fontWeight="600"
            leftIcon={<Icon as={FiX} boxSize={3} />}
            _hover={{ color: L.accentLight, bg: L.accentGlow }}
            onClick={onClear}
          >
            Clear
          </Button>
        )}
      </HStack>
      <HStack
        spacing={2}
        bg={L.accentGlow}
        border="1px solid"
        borderColor={L.cardBorder}
        borderRadius="full"
        px={3}
        py={1.5}
      >
        <Box
          w="6px"
          h="6px"
          borderRadius="full"
          bg={L.accentLight}
          style={{ animation: "pulse 2s ease-in-out infinite" }}
        />
        <Icon as={FiTrendingUp} color={L.accentLight} boxSize={3} />
        <Text fontSize="11px" fontWeight="700" color={L.accentLight}>
          High demand for Electric SUVs today
        </Text>
      </HStack>
    </Flex>
  );
}

// ─── EMPTY STATE ─────────────────────────────────────────────────────────────
function EmptyState({ onClear }: any) {
  return (
    <Box py={16} textAlign="center">
      <Circle size="64px" bg={L.accentGlow} mx="auto" mb={4}>
        <Icon as={FiAlertCircle} color={L.accentLight} boxSize={7} />
      </Circle>
      <Text fontSize="16px" fontWeight="800" color={L.text} mb={1}>
        No vehicles found
      </Text>
      <Text fontSize="13px" color={L.muted} mb={5}>
        Try adjusting your search or filters
      </Text>
      <Button
        h="44px"
        px={8}
        bg={L.accentGlow2}
        color={L.accentLight}
        borderRadius="14px"
        fontWeight="700"
        fontSize="13px"
        border="1px solid"
        borderColor={L.cardBorder}
        _hover={{ bg: "rgba(30,110,30,0.2)" }}
        onClick={onClear}
      >
        Clear All Filters
      </Button>
    </Box>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function FleetBrowserPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(DEMO_VEHICLES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/vehicles");
        if (!res.ok) throw new Error("Failed to fetch vehicles");
        const data = await res.json();
        if (data?.length) setVehicles(data);
      } catch (err) {
        // silently fall back to demo data
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  const filtered = vehicles
    .filter((v) => {
      const matchCat =
        selectedCategory === "All" || v.type === selectedCategory;
      const matchSearch =
        v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.type.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "newest":
          return (b.year || 2023) - (a.year || 2023);
        default:
          return 0;
      }
    });

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const hasFilters =
    selectedCategory !== "All" || searchQuery !== "" || sortBy !== "popular";

  const clearAll = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setSortBy("popular");
    setVisibleCount(6);
  };

  return (
    <>
      <Styles />
      <Box bg={L.bg} minH="100vh">
        {/* ── HERO ── */}
        <HeroSection />

        <Container maxW="1200px" px={{ base: 4, md: 6 }} pb={16}>
          {/* ── FILTER BAR ── */}
          <FilterBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortBy={sortBy}
            setSortBy={setSortBy}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          {/* ── RESULTS INFO ── */}
          <ResultsInfo
            count={filtered.length}
            onClear={clearAll}
            hasFilters={hasFilters}
          />

          {/* ── VEHICLE GRID ── */}
          {loading ? (
            <Box py={16} textAlign="center">
              <Box
                w="40px"
                h="40px"
                mx="auto"
                mb={4}
                border="3px solid"
                borderColor={L.accentLight}
                borderTopColor="transparent"
                borderRadius="full"
                style={{ animation: "spinRing 0.9s linear infinite" }}
              />
              <Text fontSize="14px" color={L.muted} fontWeight="600">
                Loading the fleet…
              </Text>
            </Box>
          ) : error ? (
            <Box py={16} textAlign="center">
              <Circle size="56px" bg="rgba(192,57,43,0.08)" mx="auto" mb={4}>
                <Icon as={FiAlertCircle} color="#c0392b" boxSize={6} />
              </Circle>
              <Text fontSize="14px" fontWeight="700" color="#c0392b" mb={4}>
                {error}
              </Text>
              <Button
                size="sm"
                onClick={() => window.location.reload()}
                bg="rgba(192,57,43,0.1)"
                color="#c0392b"
                borderRadius="10px"
                fontWeight="700"
                _hover={{ bg: "rgba(192,57,43,0.18)" }}
              >
                Try Again
              </Button>
            </Box>
          ) : filtered.length > 0 ? (
            <>
              <SimpleGrid
                columns={{ base: 1, md: 2, xl: 3 }}
                spacing={5}
                mb={8}
              >
                {visible.map((v, i) => (
                  <Box
                    key={v.id}
                    className="vehicle-grid-item"
                    style={{ animationDelay: `${i * 0.06}s` }}
                  >
                    <VehicleCard {...v} isCustomer />
                  </Box>
                ))}
              </SimpleGrid>

              {/* Load more */}
              {hasMore && (
                <Flex justify="center" mt={4}>
                  <Button
                    className="load-more-btn"
                    h="52px"
                    px={12}
                    bg={L.card}
                    color={L.accentLight}
                    border="1px solid"
                    borderColor={L.cardBorder}
                    borderRadius="16px"
                    fontWeight="700"
                    fontSize="14px"
                    rightIcon={<Icon as={FiArrowRight} boxSize={4} />}
                    boxShadow={L.shadow}
                    _hover={{ bg: L.accentGlow }}
                    onClick={() => setVisibleCount((n) => n + 6)}
                  >
                    Load More Vehicles
                  </Button>
                </Flex>
              )}

              {!hasMore && filtered.length > 0 && (
                <Text textAlign="center" fontSize="12px" color={L.muted} mt={6}>
                  All {filtered.length} vehicles shown
                </Text>
              )}
            </>
          ) : (
            <EmptyState onClear={clearAll} />
          )}
        </Container>
      </Box>
    </>
  );
}
