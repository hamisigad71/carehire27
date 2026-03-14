"use client";

import { useState } from "react";
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
  Image,
  Badge,
  HStack,
  Grid,
  AspectRatio,
  Circle,
  Spacer,
  InputGroup,
  InputLeftElement,
  Input,
  extendTheme,
  ChakraProvider,
} from "@chakra-ui/react";
import {
  FiMapPin,
  FiPhone,
  FiClock,
  FiNavigation,
  FiSearch,
  FiArrowRight,
  FiCoffee,
  FiWifi,
  FiShield,
  FiCheckCircle,
  FiGlobe,
  FiStar,
  FiTruck,
  FiUsers,
  FiChevronRight,
  FiAward,
  FiZap,
} from "react-icons/fi";

// ─── THEME ────────────────────────────────────────────────────────────────────
const theme = extendTheme({
  fonts: { heading: "'Syne', sans-serif", body: "'DM Sans', sans-serif" },
  styles: { global: { body: { bg: "#f4f7f4", color: "#111a11" } } },
});

// ─── LIGHT TOKENS ─────────────────────────────────────────────────────────────
const T = {
  bg: "#f4f7f4",
  pageBg: "#eef2ee",
  card: "#ffffff",
  cardLight: "#f0f5f0",
  cardBorder: "rgba(30,110,30,0.12)",
  accent: "#1e6e1e",
  accentLight: "#2d8c2d",
  accentBright: "#3fa83f",
  accentGlow: "rgba(30,110,30,0.08)",
  accentGlow2: "rgba(30,110,30,0.14)",
  text: "#111a11",
  textSub: "#3a4d3a",
  muted: "#6b7f6b",
  subtle: "#9aaa9a",
  border: "rgba(0,0,0,0.07)",
  shadow: "0 1px 12px rgba(0,0,0,0.06)",
  shadowMd: "0 4px 32px rgba(0,0,0,0.09)",
  shadowLg: "0 12px 60px rgba(0,0,0,0.12)",
  gold: "#b07d0a",
  goldBg: "rgba(176,125,10,0.08)",
  blue: "#1a56a0",
  blueBg: "rgba(26,86,160,0.08)",
  red: "#c0392b",
  redBg: "rgba(192,57,43,0.08)",
};

// ─── STYLES ───────────────────────────────────────────────────────────────────
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
    *, *::before, *::after { box-sizing: border-box; }

    @keyframes fadeUp    { from { opacity:0; transform:translateY(22px);  } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn    { from { opacity:0; } to { opacity:1; } }
    @keyframes floatY    { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-12px); } }
    @keyframes spinSlow  { to { transform:rotate(360deg); } }
    @keyframes ticker    { 0% { transform:translateX(0); } 100% { transform:translateX(-50%); } }
    @keyframes pulse     { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.5; transform:scale(.94); } }
    @keyframes scanline  { 0% { top:-8%; } 100% { top:108%; } }
    @keyframes shimmerIn { from { opacity:0; transform:scaleX(.6); } to { opacity:1; transform:scaleX(1); } }

    .fu  { animation: fadeUp  .6s ease both; }
    .fu1 { animation: fadeUp  .6s .08s ease both; }
    .fu2 { animation: fadeUp  .6s .16s ease both; }
    .fu3 { animation: fadeUp  .6s .24s ease both; }
    .fu4 { animation: fadeUp  .6s .32s ease both; }
    .fu5 { animation: fadeUp  .6s .40s ease both; }
    .fi  { animation: fadeIn  .8s .3s ease both; }

    .float { animation: floatY 5s ease-in-out infinite; }
    .spin  { animation: spinSlow 22s linear infinite; }
    .pulse-dot { animation: pulse 2s ease-in-out infinite; }

    /* hero accent line */
    .hero-line {
      display: inline-block;
      transform-origin: left;
      animation: shimmerIn .5s .6s ease both;
    }

    /* location cards */
    .loc-card { transition: transform .3s cubic-bezier(.25,.46,.45,.94), box-shadow .3s ease; cursor:pointer; }
    .loc-card:hover { transform: translateY(-8px) scale(1.01); box-shadow: 0 28px 64px rgba(30,110,30,0.15) !important; }
    .loc-card:hover .card-img { transform: scale(1.07); }
    .card-img { transition: transform .5s ease; }

    /* service cards */
    .svc-card { transition: transform .25s ease, box-shadow .25s ease; }
    .svc-card:hover { transform: translateY(-5px); box-shadow: 0 20px 50px rgba(30,110,30,0.12) !important; }
    .svc-card:hover .svc-icon-wrap { background: ${T.accentGlow2} !important; }
    .svc-icon-wrap { transition: background .2s ease; }

    /* map pins */
    .map-pin { transition: transform .2s ease; cursor:pointer; }
    .map-pin:hover { transform: scale(1.3) translateY(-4px); }

    /* search */
    .search-inp { transition: border-color .2s ease, box-shadow .2s ease !important; }
    .search-inp:focus { border-color: ${T.accentBright} !important; box-shadow: 0 0 0 3px rgba(30,110,30,0.12) !important; outline:none !important; }
    .search-inp:hover { border-color: rgba(30,110,30,0.35) !important; }

    /* buttons */
    .btn-prim { transition: all .22s cubic-bezier(.25,.46,.45,.94) !important; }
    .btn-prim:hover { transform: translateY(-3px) !important; box-shadow: 0 14px 36px rgba(30,110,30,0.32) !important; }

    /* filter pills */
    .filter-pill { transition: all .2s ease; cursor:pointer; }
    .filter-pill:hover { border-color: ${T.accentLight} !important; color: ${T.accentLight} !important; }

    /* ticker */
    .ticker-wrap { overflow:hidden; white-space:nowrap; }
    .ticker-inner { display:inline-flex; animation: ticker 30s linear infinite; }

    /* scanline */
    .scanline {
      position:absolute; left:0; right:0; height:8%;
      background: linear-gradient(180deg, transparent 0%, rgba(30,110,30,0.05) 50%, transparent 100%);
      animation: scanline 5s linear infinite;
      pointer-events:none;
    }

    ::-webkit-scrollbar { width:5px; }
    ::-webkit-scrollbar-track { background: ${T.pageBg}; }
    ::-webkit-scrollbar-thumb { background: ${T.accentLight}; border-radius:99px; }
  `}</style>
);

// ─── DATA ─────────────────────────────────────────────────────────────────────
const LOCATIONS = [
  {
    name: "JKIA International Airport",
    address: "Terminal 1, Arrivals Hall A, Desk 7",
    hours: "Open 24 / 7",
    phone: "+254 800 123 456",
    type: "Airport",
    typeColor: T.blue,
    typeBg: T.blueBg,
    services: ["Concierge", "VIP Lounge", "Valet", "Fast Track"],
    open: true,
    rating: 4.9,
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=520&fit=crop",
  },
  {
    name: "Nairobi CBD — Upper Hill",
    address: "14 Upperhill Rd, Kilimani, Nairobi",
    hours: "08:00 AM – 10:00 PM",
    phone: "+254 800 123 457",
    type: "City Centre",
    typeColor: T.accentLight,
    typeBg: T.accentGlow2,
    services: ["Meeting Rooms", "Lounge", "Wi-Fi", "Parking"],
    open: true,
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=520&fit=crop",
  },
  {
    name: "Westlands Luxury Hub",
    address: "Sarit Centre, Westlands, Nairobi",
    hours: "09:00 AM – 08:00 PM",
    phone: "+254 800 123 458",
    type: "Premium",
    typeColor: T.gold,
    typeBg: T.goldBg,
    services: ["Champagne Welcome", "Valet", "Detailing", "Concierge"],
    open: false,
    rating: 5.0,
    img: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=520&fit=crop",
  },
];

const SERVICES = [
  {
    icon: FiCoffee,
    title: "VIP Lounge",
    desc: "Premium refreshments and quiet spaces while you wait.",
    color: T.gold,
  },
  {
    icon: FiWifi,
    title: "High-Speed Wi-Fi",
    desc: "Complimentary fibre broadband at every hub.",
    color: T.blue,
  },
  {
    icon: FiTruck,
    title: "Door-to-Door",
    desc: "We deliver your rental to your hotel, office, or event.",
    color: "#d946a8",
  },
  {
    icon: FiShield,
    title: "24 / 7 Support",
    desc: "On-site staff available round the clock for any query.",
    color: T.accentLight,
  },
];

const STATS = [
  { n: "12+", l: "Nairobi Hubs" },
  { n: "40+", l: "Cities Covered" },
  { n: "24/7", l: "Airport Service" },
  { n: "150+", l: "Global Partners" },
];

const TICKER = [
  "📍 JKIA OPEN 24/7",
  "🚗 FREE HOTEL DELIVERY",
  "✈️ AIRPORT FAST-TRACK",
  "⭐ RATED #1 IN NAIROBI",
  "🏆 VIP LOUNGE AT ALL HUBS",
];

// ─── TICKER ───────────────────────────────────────────────────────────────────
function Ticker() {
  const items = [...TICKER, ...TICKER];
  return (
    <Box bg={T.accent} py={2.5} overflow="hidden">
      <div className="ticker-wrap">
        <div className="ticker-inner">
          {items.map((t, i) => (
            <Text
              key={i}
              fontSize="11px"
              fontWeight="700"
              color="white"
              letterSpacing="0.1em"
              px={10}
              display="inline-block"
            >
              {t}
            </Text>
          ))}
        </div>
      </div>
    </Box>
  );
}

// ─── HERO SECTION (redesigned) ────────────────────────────────────────────────
function HeroSection({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (v: string) => void;
}) {
  return (
    <Box position="relative" overflow="hidden" bg={T.card}>
      {/* Top thin accent line */}
      <Box
        h="3px"
        bg={`linear-gradient(90deg, ${T.accent}, ${T.accentLight}, #72b872, ${T.accentLight}, ${T.accent})`}
      />

      <Container maxW="1280px" px={{ base: 4, md: 8 }}>
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
          minH={{ base: "auto", lg: "88vh" }}
          alignItems="center"
          gap={{ base: 10, lg: 0 }}
        >
          {/* ── LEFT COPY ── */}
          <Box
            py={{ base: 16, lg: 0 }}
            pr={{ lg: 16 }}
            position="relative"
            zIndex={2}
          >
            {/* Breadcrumb-style label */}
            <HStack className="fu" spacing={2} mb={5}>
              <Circle size="8px" bg={T.accentBright} className="pulse-dot" />
              <Text
                fontSize="11px"
                fontWeight="700"
                color={T.accentBright}
                letterSpacing="0.14em"
                textTransform="uppercase"
              >
                Find Your Nearest Hub
              </Text>
            </HStack>

            {/* Main headline — editorial split */}
            <Box className="fu1" mb={6}>
              <Text
                fontFamily="'Syne', sans-serif"
                fontSize={{ base: "14px", md: "16px" }}
                fontWeight="600"
                color={T.muted}
                letterSpacing="0.06em"
                textTransform="uppercase"
                mb={2}
              >
                Our Locations
              </Text>
              <Heading
                fontFamily="'Syne', sans-serif"
                fontSize={{ base: "44px", md: "62px", lg: "72px" }}
                fontWeight="800"
                letterSpacing="-0.04em"
                lineHeight="0.95"
                color={T.text}
                mb={3}
              >
                Every
                <br />
                Journey
                <br />
                <Text as="span" color={T.accentLight} position="relative">
                  Starts Here.
                  <Box
                    className="hero-line"
                    position="absolute"
                    bottom="-4px"
                    left={0}
                    right={0}
                    h="4px"
                    bg={T.accentLight}
                    borderRadius="full"
                  />
                </Text>
              </Heading>
            </Box>

            <Text
              className="fu2"
              fontSize={{ base: "15px", md: "17px" }}
              color={T.muted}
              maxW="420px"
              lineHeight="1.8"
              fontWeight="300"
              mb={8}
            >
              Find us at major airports, downtown business centres, and premium
              hotspots across Kenya. Seamless pickup, world-class service.
            </Text>

            {/* Search input */}
            <Box className="fu3" w="100%" maxW="480px" mb={8}>
              <InputGroup>
                <InputLeftElement h="54px" pl={2} pointerEvents="none">
                  <Icon as={FiSearch} color={T.accentBright} boxSize={4.5} />
                </InputLeftElement>
                <Input
                  className="search-inp"
                  placeholder="Search city, airport or area…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  h="54px"
                  bg={T.pageBg}
                  border="1.5px solid"
                  borderColor={T.cardBorder}
                  borderRadius="16px"
                  fontSize="14px"
                  color={T.text}
                  _placeholder={{ color: T.subtle }}
                  _focus={{}}
                />
              </InputGroup>
            </Box>

            {/* CTA buttons */}
            <HStack className="fu4" spacing={3} mb={10} flexWrap="wrap">
              <Button
                className="btn-prim"
                h="52px"
                px={8}
                bg={T.accent}
                color="white"
                borderRadius="14px"
                fontWeight="700"
                fontSize="14px"
                rightIcon={<Icon as={FiArrowRight} boxSize={4} />}
                boxShadow="0 4px 20px rgba(30,110,30,0.28)"
                _hover={{ bg: T.accentLight }}
              >
                View All Hubs
              </Button>
              <Button
                h="52px"
                px={8}
                variant="outline"
                borderColor={T.cardBorder}
                color={T.textSub}
                borderRadius="14px"
                fontWeight="600"
                fontSize="14px"
                _hover={{
                  bg: T.accentGlow,
                  borderColor: T.accentLight,
                  color: T.accentLight,
                }}
                transition="all .2s ease"
              >
                Book a Delivery
              </Button>
            </HStack>

            {/* Stats strip */}
            <HStack
              className="fu5"
              spacing={0}
              flexWrap="wrap"
              divider={<Box w="1px" h="32px" bg={T.cardBorder} mx={5} />}
            >
              {STATS.map(({ n, l }) => (
                <Box key={l} textAlign="center">
                  <Text
                    fontFamily="'Syne', sans-serif"
                    fontSize="22px"
                    fontWeight="800"
                    color={T.accentLight}
                    lineHeight="1"
                  >
                    {n}
                  </Text>
                  <Text
                    fontSize="11px"
                    color={T.subtle}
                    fontWeight="500"
                    mt={0.5}
                  >
                    {l}
                  </Text>
                </Box>
              ))}
            </HStack>
          </Box>

          {/* ── RIGHT IMAGE COLLAGE ── */}
          <Box
            className="fi"
            position="relative"
            h={{ base: "340px", lg: "88vh" }}
            display={{ base: "none", lg: "block" }}
          >
            {/* Main full-height image */}
            <Box position="absolute" inset={0} overflow="hidden">
              <Image
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=900&h=900&fit=crop"
                w="100%"
                h="100%"
                objectFit="cover"
                objectPosition="center 40%"
                style={{ filter: "brightness(0.88) contrast(1.05)" }}
              />
              {/* Left fade */}
              <Box
                position="absolute"
                inset={0}
                bg="linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.3) 25%, transparent 55%)"
              />
              {/* Top fade */}
              <Box
                position="absolute"
                inset={0}
                bg="linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 20%)"
              />
              {/* Bottom fade */}
              <Box
                position="absolute"
                inset={0}
                bg="linear-gradient(0deg, rgba(244,247,244,0.6) 0%, transparent 30%)"
              />
            </Box>

            {/* Floating card — top right */}
            <Box
              position="absolute"
              top={8}
              right={8}
              bg={T.card}
              borderRadius="22px"
              px={5}
              py={4}
              boxShadow="0 16px 48px rgba(0,0,0,0.14)"
              border="1px solid"
              borderColor={T.cardBorder}
              className="float"
              style={{ animationDelay: "0s" }}
            >
              <Text
                fontSize="10px"
                fontWeight="700"
                color={T.subtle}
                textTransform="uppercase"
                letterSpacing="0.1em"
                mb={1}
              >
                Open Now
              </Text>
              <Text
                fontFamily="'Syne', sans-serif"
                fontSize="26px"
                fontWeight="800"
                color={T.accentLight}
                lineHeight="1"
              >
                12 Hubs
              </Text>
              <Text fontSize="11px" color={T.muted} mt={0.5}>
                across Kenya
              </Text>
            </Box>

            {/* Floating card — bottom left */}
            <Box
              position="absolute"
              bottom={10}
              left={6}
              bg={T.card}
              borderRadius="20px"
              px={5}
              py={4}
              boxShadow="0 12px 40px rgba(0,0,0,0.12)"
              border="1px solid"
              borderColor={T.cardBorder}
              className="float"
              style={{ animationDelay: "1.5s" }}
            >
              <HStack spacing={3}>
                <Circle
                  size="40px"
                  bg={T.goldBg}
                  border="1px solid"
                  borderColor={`${T.gold}30`}
                >
                  <Icon as={FiStar} color={T.gold} boxSize={4.5} />
                </Circle>
                <Box>
                  <Text fontWeight="800" fontSize="15px" color={T.text}>
                    Rated 4.9 / 5
                  </Text>
                  <Text fontSize="11px" color={T.muted}>
                    From 2,400+ reviews
                  </Text>
                </Box>
              </HStack>
            </Box>

            {/* Floating card — middle */}
            <Box
              position="absolute"
              top="42%"
              right={6}
              bg={T.card}
              borderRadius="18px"
              px={4}
              py={3.5}
              boxShadow="0 8px 32px rgba(0,0,0,0.1)"
              border="1px solid"
              borderColor={T.cardBorder}
              className="float"
              style={{ animationDelay: "3s" }}
            >
              <HStack spacing={2.5} mb={2}>
                <Circle size="28px" bg={T.accentGlow2}>
                  <Icon
                    as={FiCheckCircle}
                    color={T.accentLight}
                    boxSize={3.5}
                  />
                </Circle>
                <Text fontSize="12px" fontWeight="700" color={T.accentLight}>
                  Available 24/7
                </Text>
              </HStack>
              <Text fontSize="11px" color={T.muted}>
                JKIA Airport Hub
              </Text>
            </Box>

            {/* Decorative corner accent */}
            <Box
              position="absolute"
              bottom={4}
              right={4}
              w="48px"
              h="48px"
              border="2px solid"
              borderColor={T.cardBorder}
              borderRadius="12px"
              opacity={0.4}
            />
            <Box
              position="absolute"
              bottom={8}
              right={8}
              w="28px"
              h="28px"
              border="1.5px solid"
              borderColor={T.cardBorder}
              borderRadius="8px"
              opacity={0.25}
            />
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

// ─── LOCATION CARD ────────────────────────────────────────────────────────────
function LocationCard({ loc }: { loc: any }) {
  return (
    <Box
      className="loc-card"
      bg={T.card}
      borderRadius="28px"
      overflow="hidden"
      border="1px solid"
      borderColor={T.cardBorder}
      boxShadow={T.shadow}
    >
      {/* Image */}
      <Box h="220px" overflow="hidden" position="relative">
        <Image
          className="card-img"
          src={loc.img}
          w="100%"
          h="100%"
          objectFit="cover"
        />
        <Box
          position="absolute"
          inset={0}
          bg="linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.45) 100%)"
        />

        {/* Type badge */}
        <Box
          position="absolute"
          top={4}
          left={4}
          bg={loc.typeBg}
          borderRadius="full"
          px={3}
          py={1.5}
          border="1px solid"
          borderColor={`${loc.typeColor}30`}
          backdropFilter="blur(8px)"
        >
          <Text
            fontSize="10px"
            fontWeight="800"
            color={loc.typeColor}
            letterSpacing="0.1em"
            textTransform="uppercase"
          >
            {loc.type}
          </Text>
        </Box>

        {/* Open/closed */}
        <Box position="absolute" top={4} right={4}>
          <HStack
            spacing={1.5}
            bg={loc.open ? "rgba(30,110,30,0.15)" : "rgba(192,57,43,0.15)"}
            border="1px solid"
            borderColor={
              loc.open ? "rgba(30,110,30,0.3)" : "rgba(192,57,43,0.3)"
            }
            borderRadius="full"
            px={3}
            py={1}
            backdropFilter="blur(8px)"
          >
            <Box
              w="6px"
              h="6px"
              borderRadius="full"
              bg={loc.open ? T.accentBright : T.red}
              style={{
                animation: loc.open ? "pulse 2s ease-in-out infinite" : "none",
              }}
            />
            <Text
              fontSize="10px"
              fontWeight="700"
              color={loc.open ? T.accentBright : T.red}
            >
              {loc.open ? "Open Now" : "Closed"}
            </Text>
          </HStack>
        </Box>

        {/* Rating */}
        <HStack position="absolute" bottom={4} left={4} spacing={1}>
          <Icon as={FiStar} color={T.gold} boxSize={3.5} />
          <Text fontSize="12px" fontWeight="800" color="white">
            {loc.rating}
          </Text>
        </HStack>
      </Box>

      {/* Body */}
      <Box p={6}>
        <Heading
          fontSize="17px"
          fontWeight="800"
          letterSpacing="-0.02em"
          color={T.text}
          mb={1.5}
        >
          {loc.name}
        </Heading>
        <HStack color={T.muted} spacing={2} mb={4}>
          <Icon as={FiMapPin} boxSize={3.5} flexShrink={0} />
          <Text fontSize="12px" noOfLines={1}>
            {loc.address}
          </Text>
        </HStack>

        <Box h="1px" bg={T.cardBorder} mb={4} />

        <VStack spacing={2} align="stretch" mb={4}>
          <HStack spacing={2.5} color={T.muted}>
            <Icon as={FiClock} boxSize={3.5} />
            <Text fontSize="12px" fontWeight="600">
              {loc.hours}
            </Text>
          </HStack>
          <HStack spacing={2.5} color={T.muted}>
            <Icon as={FiPhone} boxSize={3.5} />
            <Text fontSize="12px" fontWeight="600">
              {loc.phone}
            </Text>
          </HStack>
        </VStack>

        {/* Service tags */}
        <Flex wrap="wrap" gap={1.5} mb={5}>
          {loc.services.map((s: string) => (
            <Box
              key={s}
              bg={T.accentGlow}
              borderRadius="full"
              px={2.5}
              py={1}
              border="1px solid"
              borderColor={T.cardBorder}
            >
              <Text fontSize="10px" fontWeight="600" color={T.accentLight}>
                {s}
              </Text>
            </Box>
          ))}
        </Flex>

        <Button
          w="100%"
          h="46px"
          bg={T.accentGlow}
          color={T.accentLight}
          border="1px solid"
          borderColor={T.cardBorder}
          borderRadius="14px"
          fontWeight="700"
          fontSize="13px"
          rightIcon={<Icon as={FiNavigation} boxSize={3.5} />}
          _hover={{ bg: T.accent, color: "white", borderColor: T.accent }}
          transition="all 0.22s ease"
        >
          Get Directions
        </Button>
      </Box>
    </Box>
  );
}

// ─── SERVICES SECTION ─────────────────────────────────────────────────────────
function ServicesSection() {
  return (
    <Box
      bg={T.card}
      borderRadius="32px"
      overflow="hidden"
      border="1px solid"
      borderColor={T.cardBorder}
      boxShadow={T.shadow}
    >
      <Box
        h="3px"
        bg={`linear-gradient(90deg, transparent, ${T.accentLight}, #72b872, ${T.accentLight}, transparent)`}
      />
      <Box px={{ base: 6, md: 12 }} py={{ base: 10, md: 14 }}>
        <Box textAlign="center" mb={10}>
          <Text
            fontSize="11px"
            fontWeight="700"
            color={T.accentBright}
            letterSpacing="0.12em"
            textTransform="uppercase"
            mb={3}
          >
            At Every Location
          </Text>
          <Heading
            fontSize={{ base: "26px", md: "36px" }}
            fontWeight="800"
            letterSpacing="-0.03em"
            color={T.text}
            mb={3}
          >
            More Than Just a Rental
          </Heading>
          <Text
            color={T.muted}
            maxW="520px"
            mx="auto"
            fontSize="15px"
            fontWeight="300"
            lineHeight="1.8"
          >
            A full suite of services ensuring your comfort from arrival to
            departure.
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={5}>
          {SERVICES.map((s, i) => (
            <Box
              key={i}
              className="svc-card"
              p={6}
              bg={T.pageBg}
              borderRadius="22px"
              border="1px solid"
              borderColor={T.cardBorder}
            >
              <Circle
                className="svc-icon-wrap"
                size="50px"
                bg={T.accentGlow}
                border="1px solid"
                borderColor={T.cardBorder}
                mb={4}
              >
                <Icon as={s.icon} boxSize={5} color={s.color} />
              </Circle>
              <Text fontWeight="800" fontSize="16px" color={T.text} mb={1.5}>
                {s.title}
              </Text>
              <Text fontSize="13px" color={T.muted} lineHeight="1.7">
                {s.desc}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

// ─── MAP SECTION ──────────────────────────────────────────────────────────────
function MapSection() {
  const pins = [
    { top: "38%", left: "62%", label: "JKIA", color: T.blue },
    { top: "34%", left: "58%", label: "CBD", color: T.gold },
    { top: "31%", left: "60%", label: "Westlands", color: T.accentLight },
  ];
  return (
    <Box
      position="relative"
      borderRadius="32px"
      overflow="hidden"
      border="1px solid"
      borderColor={T.cardBorder}
      h={{ base: "320px", md: "440px" }}
    >
      <div className="scanline" />
      <Image
        src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1400&h=700&fit=crop"
        w="100%"
        h="100%"
        objectFit="cover"
        style={{ filter: "brightness(0.3) saturate(0.5) hue-rotate(100deg)" }}
      />
      <Box
        position="absolute"
        inset={0}
        opacity={0.08}
        bgImage="linear-gradient(rgba(30,110,30,1) 1px, transparent 1px), linear-gradient(90deg, rgba(30,110,30,1) 1px, transparent 1px)"
        bgSize="40px 40px"
      />
      <Box
        position="absolute"
        inset={0}
        bg="radial-gradient(ellipse at center, transparent 30%, rgba(20,40,20,0.6) 100%)"
      />

      {pins.map((pin, i) => (
        <Box
          key={i}
          className="map-pin"
          position="absolute"
          top={pin.top}
          left={pin.left}
        >
          <VStack spacing={0.5}>
            <Box
              w="12px"
              h="12px"
              borderRadius="full"
              bg={pin.color}
              border="2px solid white"
              boxShadow={`0 0 12px ${pin.color}bb`}
            />
            <Box
              bg="rgba(255,255,255,0.9)"
              backdropFilter="blur(8px)"
              border="1px solid"
              borderColor="rgba(0,0,0,0.1)"
              px={2}
              py={0.5}
              borderRadius="7px"
            >
              <Text
                fontSize="9px"
                fontWeight="800"
                color={pin.color}
                letterSpacing="0.07em"
              >
                {pin.label}
              </Text>
            </Box>
          </VStack>
        </Box>
      ))}

      <VStack
        spacing={4}
        position="absolute"
        inset={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Circle
          size="56px"
          bg="rgba(255,255,255,0.12)"
          border="1px solid rgba(255,255,255,0.2)"
          backdropFilter="blur(10px)"
        >
          <Icon as={FiGlobe} boxSize={6} color={T.accentBright} />
        </Circle>
        <Heading
          fontSize={{ base: "22px", md: "36px" }}
          color="white"
          fontWeight="800"
          letterSpacing="-0.03em"
          textAlign="center"
        >
          Explore Kenya with Us
        </Heading>
        <Text
          fontSize={{ base: "13px", md: "16px" }}
          color="rgba(255,255,255,0.65)"
          textAlign="center"
        >
          12+ Locations · 40+ Cities · 150 Global Partners
        </Text>
        <Button
          className="btn-prim"
          bg={T.accent}
          color="white"
          h="50px"
          px={10}
          borderRadius="16px"
          fontWeight="700"
          fontSize="14px"
          rightIcon={<Icon as={FiArrowRight} />}
          _hover={{ bg: T.accentLight }}
        >
          View Interactive Map
        </Button>
      </VStack>
    </Box>
  );
}

// ─── BOTTOM CTA ───────────────────────────────────────────────────────────────
function BottomCTA() {
  return (
    <Box
      position="relative"
      overflow="hidden"
      borderRadius="32px"
      bg={`linear-gradient(135deg, ${T.accent} 0%, ${T.accentLight} 60%, #52b852 100%)`}
      p={{ base: 8, md: 14 }}
      textAlign="center"
    >
      <Box
        position="absolute"
        top="-80px"
        right="-80px"
        w="300px"
        h="300px"
        bg="rgba(255,255,255,0.08)"
        borderRadius="full"
      />
      <Box
        position="absolute"
        bottom="-60px"
        left="-60px"
        w="240px"
        h="240px"
        bg="rgba(255,255,255,0.06)"
        borderRadius="full"
      />
      <VStack position="relative" zIndex={1} spacing={5}>
        <Badge
          bg="rgba(255,255,255,0.2)"
          color="white"
          borderRadius="full"
          px={4}
          py={1.5}
          fontSize="10px"
          fontWeight="700"
          letterSpacing="0.1em"
        >
          DOOR-TO-DOOR AVAILABLE
        </Badge>
        <Heading
          fontSize={{ base: "24px", md: "40px" }}
          color="white"
          fontWeight="800"
          letterSpacing="-0.03em"
          maxW="540px"
          lineHeight="1.15"
        >
          Can't find a hub near you? We'll come to you.
        </Heading>
        <Text
          color="rgba(255,255,255,0.8)"
          fontSize="15px"
          maxW="400px"
          fontWeight="300"
        >
          Schedule a delivery to your hotel, office, or event venue anywhere in
          Nairobi.
        </Text>
        <HStack spacing={3} flexWrap="wrap" justify="center">
          <Button
            bg="white"
            color={T.accent}
            h="52px"
            px={10}
            borderRadius="16px"
            fontWeight="800"
            fontSize="14px"
            _hover={{ bg: "#f0f5f0", transform: "translateY(-2px)" }}
            transition="all .2s"
          >
            Schedule Delivery
          </Button>
          <Button
            variant="outline"
            borderColor="rgba(255,255,255,0.5)"
            color="white"
            h="52px"
            px={10}
            borderRadius="16px"
            fontWeight="600"
            _hover={{ bg: "rgba(255,255,255,0.12)" }}
          >
            Call Us Now
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function LocationsPage() {
  const [query, setQuery] = useState("");

  const filtered = LOCATIONS.filter(
    (l) =>
      l.name.toLowerCase().includes(query.toLowerCase()) ||
      l.address.toLowerCase().includes(query.toLowerCase()) ||
      l.type.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <ChakraProvider theme={theme}>
      <Styles />
      <Box bg={T.bg} minH="100vh" pb={20}>
        <Ticker />
        <HeroSection query={query} setQuery={setQuery} />

        <Container
          maxW="1280px"
          px={{ base: 4, md: 6, lg: 8 }}
          mt="-40px"
          position="relative"
          zIndex={10}
        >
          <VStack spacing={14} align="stretch">
            {/* Locations grid */}
            <Box>
              <Flex
                align="flex-end"
                justify="space-between"
                mb={7}
                flexWrap="wrap"
                gap={4}
              >
                <Box>
                  <Text
                    fontSize="11px"
                    fontWeight="700"
                    color={T.accentBright}
                    letterSpacing="0.12em"
                    textTransform="uppercase"
                    mb={1.5}
                  >
                    {filtered.length} Location{filtered.length !== 1 ? "s" : ""}{" "}
                    Found
                  </Text>
                  <Heading
                    fontSize={{ base: "24px", md: "32px" }}
                    fontWeight="800"
                    letterSpacing="-0.03em"
                    color={T.text}
                  >
                    Our Hubs
                  </Heading>
                  <Text color={T.muted} fontSize="14px" mt={1}>
                    Elite hospitality at every location
                  </Text>
                </Box>
                <HStack spacing={2} flexWrap="wrap">
                  {["All", "Airport", "City Centre", "Premium"].map((f) => (
                    <Box
                      key={f}
                      className="filter-pill"
                      px={4}
                      py={1.5}
                      borderRadius="full"
                      cursor="pointer"
                      bg={f === "All" ? T.accent : T.card}
                      border="1px solid"
                      borderColor={f === "All" ? T.accent : T.cardBorder}
                      transition="all .2s"
                    >
                      <Text
                        fontSize="12px"
                        fontWeight="700"
                        color={f === "All" ? "white" : T.muted}
                      >
                        {f}
                      </Text>
                    </Box>
                  ))}
                </HStack>
              </Flex>

              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {filtered.map((loc, i) => (
                  <LocationCard key={i} loc={loc} />
                ))}
              </SimpleGrid>

              {filtered.length === 0 && (
                <VStack py={14} spacing={3}>
                  <Circle size="56px" bg={T.accentGlow}>
                    <Icon as={FiMapPin} color={T.accentLight} boxSize={6} />
                  </Circle>
                  <Text color={T.muted} fontSize="15px" fontWeight="600">
                    No locations match "{query}"
                  </Text>
                  <Button
                    size="sm"
                    variant="ghost"
                    color={T.accentBright}
                    fontWeight="700"
                    onClick={() => setQuery("")}
                  >
                    Clear search
                  </Button>
                </VStack>
              )}
            </Box>

            <ServicesSection />

            <Box>
              <Text
                fontSize="11px"
                fontWeight="700"
                color={T.accentBright}
                letterSpacing="0.12em"
                textTransform="uppercase"
                mb={2}
              >
                Coverage Map
              </Text>
              <Heading
                fontSize={{ base: "24px", md: "32px" }}
                fontWeight="800"
                letterSpacing="-0.03em"
                color={T.text}
                mb={6}
              >
                Find Us on the Map
              </Heading>
              <MapSection />
            </Box>

            <BottomCTA />
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  );
}
