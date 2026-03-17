"use client";

import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  Button,
  Icon,
  SimpleGrid,
  Container,
  Badge,
  HStack,
  Circle,
  Grid,
  Image,
  Divider,
  Spacer,
} from "@chakra-ui/react";
import { FiArrowRight, FiBriefcase, FiUser, FiShield, FiStar, FiTrendingUp, FiCheckCircle, FiZap, FiAward, FiBarChart2, FiCalendar, FiGift, FiMapPin, FiClock } from "react-icons/fi";
import { FaCar } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useLoading } from "@/context/LoadingContext";
import { useEffect } from "react";

// ─── LIGHT TOKENS ─────────────────────────────────────────────────────────────
const L = {
  bg: "#f4f7f4",
  card: "#ffffff",
  cardBorder: "rgba(30,110,30,0.1)",
  accent: "#1e6e1e",
  accentLight: "#2d8c2d",
  accentBright: "#3fa83f",
  accentGlow: "rgba(30,110,30,0.07)",
  accentGlow2: "rgba(30,110,30,0.13)",
  text: "#111a11",
  textSub: "#3a4d3a",
  muted: "#6b7f6b",
  subtle: "#9aaa9a",
  border: "rgba(0,0,0,0.07)",
  shadow: "0 2px 16px rgba(0,0,0,0.06)",
  shadowMd: "0 8px 40px rgba(0,0,0,0.1)",
  shadowLg: "0 20px 70px rgba(0,0,0,0.13)",
  teal: "#0e7b7b",
  tealBg: "rgba(14,123,123,0.08)",
  tealGlow: "rgba(14,123,123,0.14)",
  gold: "#b07d0a",
  goldBg: "rgba(176,125,10,0.08)",
};

// ─── STYLES ───────────────────────────────────────────────────────────────────
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; }

    @keyframes fadeUp    { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn    { from { opacity:0; } to { opacity:1; } }
    @keyframes floatY    { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
    @keyframes floatY2   { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-7px); } }
    @keyframes spinSlow  { to { transform:rotate(360deg); } }
    @keyframes pulse     { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.5; transform:scale(.9); } }
    @keyframes shimmerIn { from { opacity:0; transform:scaleX(0.5); } to { opacity:1; transform:scaleX(1); } }
    @keyframes ticker    { 0% { transform:translateX(0); } 100% { transform:translateX(-50%); } }
    @keyframes countUp   { from { opacity:0; transform:scale(0.7); } to { opacity:1; transform:scale(1); } }
    @keyframes borderGlow {
      0%,100% { box-shadow: 0 0 0 0 transparent; }
      50%      { box-shadow: 0 0 0 4px rgba(30,110,30,0.15); }
    }

    .fu   { animation: fadeUp  .65s ease both; }
    .fu1  { animation: fadeUp  .65s .08s ease both; }
    .fu2  { animation: fadeUp  .65s .16s ease both; }
    .fu3  { animation: fadeUp  .65s .24s ease both; }
    .fu4  { animation: fadeUp  .65s .32s ease both; }
    .fu5  { animation: fadeUp  .65s .40s ease both; }
    .fu6  { animation: fadeUp  .65s .48s ease both; }
    .fi   { animation: fadeIn   .8s .3s ease both; }

    .float1 { animation: floatY  5s ease-in-out infinite; }
    .float2 { animation: floatY2 4s 1s ease-in-out infinite; }
    .float3 { animation: floatY  6s 2s ease-in-out infinite; }
    .spin   { animation: spinSlow 22s linear infinite; }
    .pulse-dot { animation: pulse 2s ease-in-out infinite; }

    /* portal cards */
    .portal-card {
      transition: transform .35s cubic-bezier(.25,.46,.45,.94), box-shadow .35s ease, border-color .25s ease;
      cursor: pointer;
    }
    .portal-card:hover { transform: translateY(-12px) scale(1.01); }

    .portal-card-biz:hover {
      box-shadow: 0 32px 80px rgba(30,110,30,0.18) !important;
      border-color: rgba(30,110,30,0.35) !important;
    }
    .portal-card-cust:hover {
      box-shadow: 0 32px 80px rgba(14,123,123,0.18) !important;
      border-color: rgba(14,123,123,0.35) !important;
    }

    .portal-card:hover .card-img { transform: scale(1.05); }
    .card-img { transition: transform .5s ease; }

    .feature-row { transition: transform .18s ease; }
    .feature-row:hover { transform: translateX(4px); }

    /* CTA buttons */
    .btn-biz {
      transition: all .22s cubic-bezier(.25,.46,.45,.94) !important;
    }
    .btn-biz:hover {
      transform: translateY(-3px) !important;
      box-shadow: 0 14px 36px rgba(30,110,30,0.36) !important;
    }
    .btn-cust {
      transition: all .22s cubic-bezier(.25,.46,.45,.94) !important;
    }
    .btn-cust:hover {
      transform: translateY(-3px) !important;
      box-shadow: 0 14px 36px rgba(14,123,123,0.36) !important;
    }

    /* stat cards */
    .stat-card { transition: transform .2s ease; }
    .stat-card:hover { transform: translateY(-4px); }

    /* trust items */
    .trust-item { transition: transform .18s ease; }
    .trust-item:hover { transform: scale(1.04); }

    /* ticker */
    .ticker-wrap { overflow:hidden; white-space:nowrap; }
    .ticker-inner { display:inline-flex; animation: ticker 28s linear infinite; }

    /* shimmer underline */
    .underline-anim {
      display: inline-block;
      transform-origin: left;
      animation: shimmerIn .4s .7s ease both;
    }
  `}</style>
);

// ─── TICKER ───────────────────────────────────────────────────────────────────
const TICKER_ITEMS = [
  "🚗 120+ Premium Vehicles",
  "⭐ Rated 4.9 / 5 by 2,400+ customers",
  "📍 12 Hubs across Nairobi",
  "✈️ Free JKIA Airport Pickup",
  "🏆 Kenya's #1 Car Hire Platform",
  "🎁 10% OFF First Booking — DRIVE10",
];

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <Box bg={L.accent} py={2.5} overflow="hidden">
      <div className="ticker-wrap">
        <div className="ticker-inner">
          {items.map((t, i) => (
            <Text
              key={i}
              fontSize="11px"
              fontWeight="700"
              color="white"
              letterSpacing="0.08em"
              px={8}
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

// ─── HERO / INTRO ─────────────────────────────────────────────────────────────
function HeroBadge() {
  return (
    <HStack className="fu" spacing={2} justify="center">
      <Circle size="8px" bg={L.accentBright} className="pulse-dot" />
      <Text
        fontSize="11px"
        fontWeight="700"
        color={L.accentBright}
        letterSpacing="0.14em"
        textTransform="uppercase"
      >
        Welcome to DriveKE
      </Text>
    </HStack>
  );
}

// ─── STATS ROW ────────────────────────────────────────────────────────────────
const STATS = [
  { n: "120+", l: "Premium Vehicles", icon: FaCar, color: L.accentLight },
  { n: "4,800+", l: "Happy Customers", icon: FiStar, color: L.gold },
  { n: "12", l: "City Hubs", icon: FiMapPin, color: L.teal },
  { n: "6 yrs", l: "Trusted Service", icon: FiAward, color: L.accentLight },
];

function StatsRow() {
  return (
    <SimpleGrid
      columns={{ base: 2, md: 4 }}
      spacing={4}
      w="100%"
      className="fu5"
    >
      {STATS.map((s, i) => (
        <Box
          key={i}
          className="stat-card"
          bg={L.card}
          borderRadius="18px"
          border="1px solid"
          borderColor={L.cardBorder}
          boxShadow={L.shadow}
          p={4}
          textAlign="center"
        >
          <Circle
            size={{ base: "44px", md: "36px" }}
            bg={L.accentGlow}
            mx="auto"
            mb={2}
          >
            <Icon
              as={s.icon}
              boxSize={{ base: "5", md: "4" }}
              color={s.color}
            />
          </Circle>

          <Text
            fontFamily="'Syne', sans-serif"
            fontSize="22px"
            fontWeight="800"
            color={L.text}
            lineHeight="1"
          >
            {s.n}
          </Text>
          <Text fontSize="11px" fontWeight="500" color={L.muted} mt={0.5}>
            {s.l}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  );
}

// ─── BUSINESS CARD ────────────────────────────────────────────────────────────
const BIZ_FEATURES = [
  { icon: FiBarChart2, text: "Real-time fleet analytics & revenue tracking" },
  { icon: FaCar, text: "Full vehicle lifecycle management" },
  { icon: FiCalendar, text: "Booking calendar with instant confirmations" },
  { icon: FiShield, text: "Insurance & compliance monitoring" },
  { icon: FiTrendingUp, text: "Performance reports & financial dashboard" },
];

function BusinessCard({ onClick }: { onClick: () => void }) {
  return (
    <Box
      className="portal-card portal-card-biz"
      bg={L.card}
      borderRadius="28px"
      border="1.5px solid"
      borderColor={L.cardBorder}
      boxShadow={L.shadowMd}
      overflow="hidden"
      onClick={onClick}
    >
      {/* Top accent */}
      <Box
        h="3px"
        bg={`linear-gradient(90deg, ${L.accent}, ${L.accentBright}, #72b872)`}
      />

      {/* Image strip */}
      <Box
        h={{ base: "180px", md: "220px" }}
        overflow="hidden"
        position="relative"
      >
        <Image
          className="card-img"
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=400&fit=crop"
          w="100%"
          h="100%"
          objectFit="cover"
          style={{ filter: "brightness(0.82) contrast(1.08)" }}
        />
        <Box
          position="absolute"
          inset={0}
          bg="linear-gradient(180deg, transparent 35%, rgba(255,255,255,0.9) 100%)"
        />

        {/* Floating badge */}
        <Box
          position="absolute"
          top={4}
          left={4}
          bg="rgba(255,255,255,0.92)"
          backdropFilter="blur(10px)"
          borderRadius="full"
          px={3}
          py={1.5}
          border="1px solid"
          borderColor={L.cardBorder}
        >
          <HStack spacing={1.5}>
            <Circle size="7px" bg={L.accentBright} />
            <Text
              fontSize="10px"
              fontWeight="800"
              color={L.accentLight}
              letterSpacing="0.08em"
              textTransform="uppercase"
            >
              Business
            </Text>
          </HStack>
        </Box>

        {/* Live metric */}
        <Box
          position="absolute"
          top={4}
          right={4}
          bg="rgba(255,255,255,0.92)"
          backdropFilter="blur(10px)"
          borderRadius="14px"
          px={3}
          py={2}
          border="1px solid"
          borderColor={L.cardBorder}
        >
          <Text
            fontSize="9px"
            fontWeight="700"
            color={L.muted}
            textTransform="uppercase"
            letterSpacing="0.07em"
          >
            Revenue MTD
          </Text>
          <Text
            fontFamily="'Syne', sans-serif"
            fontSize="15px"
            fontWeight="800"
            color={L.accentLight}
          >
            KSh 488K
          </Text>
        </Box>
      </Box>

      {/* Body */}
      <Box px={{ base: 6, md: 7 }} pb={7} pt={2}>
        {/* Icon + title */}
        <HStack spacing={3} mb={3}>
          <Circle
            size="48px"
            bg={L.accentGlow2}
            border="1px solid"
            borderColor={L.cardBorder}
          >
            <Icon as={FiBriefcase} boxSize={5} color={L.accentLight} />
          </Circle>
          <Box>
            <Text
              fontFamily="'Syne', sans-serif"
              fontSize="20px"
              fontWeight="800"
              color={L.text}
              letterSpacing="-0.02em"
            >
              Business Portal
            </Text>
            <Text fontSize="12px" color={L.muted}>
              Fleet operators & managers
            </Text>
          </Box>
        </HStack>

        <Text fontSize="13px" color={L.muted} lineHeight="1.75" mb={5}>
          Streamline your entire fleet operation. Manage vehicles, track
          bookings, monitor revenue and compliance — all from one powerful
          dashboard.
        </Text>

        {/* Feature list */}
        <VStack spacing={2.5} align="stretch" mb={6}>
          {BIZ_FEATURES.map((f, i) => (
            <HStack key={i} className="feature-row" spacing={2.5}>
              <Circle size="24px" bg={L.accentGlow2} flexShrink={0}>
                <Icon as={f.icon} boxSize={3} color={L.accentLight} />
              </Circle>
              <Text fontSize="12px" fontWeight="500" color={L.textSub}>
                {f.text}
              </Text>
            </HStack>
          ))}
        </VStack>

        <Button
          className="btn-biz"
          w="100%"
          h="52px"
          bg={`linear-gradient(135deg, ${L.accent}, ${L.accentLight})`}
          color="white"
          borderRadius="16px"
          fontWeight="700"
          fontSize="14px"
          rightIcon={<Icon as={FiArrowRight} boxSize={4} />}
          boxShadow="0 4px 18px rgba(30,110,30,0.28)"
          _hover={{ opacity: 1 }}
        >
          Access Dashboard
        </Button>
      </Box>
    </Box>
  );
}

// ─── CUSTOMER CARD ────────────────────────────────────────────────────────────
const CUST_FEATURES = [
  { icon: FaCar, text: "Browse 120+ premium vehicles instantly" },
  { icon: FiZap, text: "Book in under 60 seconds" },
  { icon: FiGift, text: "Earn loyalty points on every rental" },
  { icon: FiMapPin, text: "Free delivery to your hotel or office" },
  { icon: FiClock, text: "Flexible pickup — any time, any location" },
];

function CustomerCard({ onClick }: { onClick: () => void }) {
  return (
    <Box
      className="portal-card portal-card-cust"
      bg={L.card}
      borderRadius="28px"
      border="1.5px solid"
      borderColor={L.cardBorder}
      boxShadow={L.shadowMd}
      overflow="hidden"
      onClick={onClick}
    >
      {/* Top accent */}
      <Box h="3px" bg={`linear-gradient(90deg, ${L.teal}, #1aa0a0, #5dd0d0)`} />

      {/* Image strip */}
      <Box
        h={{ base: "180px", md: "220px" }}
        overflow="hidden"
        position="relative"
      >
        <Image
          className="card-img"
          src="https://i.pinimg.com/736x/d4/81/03/d48103accdbde80fb39aba5f5e9554bb.jpg"
          w="100%"
          h="100%"
          objectFit="cover"
          objectPosition="center 60%"
          style={{ filter: "brightness(0.84) contrast(1.06)" }}
        />
        <Box
          position="absolute"
          inset={0}
          bg="linear-gradient(180deg, transparent 35%, rgba(255,255,255,0.9) 100%)"
        />

        {/* Badge */}
        <Box
          position="absolute"
          top={4}
          left={4}
          bg="rgba(255,255,255,0.92)"
          backdropFilter="blur(10px)"
          borderRadius="full"
          px={3}
          py={1.5}
          border="1px solid"
          borderColor="rgba(14,123,123,0.15)"
        >
          <HStack spacing={1.5}>
            <Circle size="7px" bg={L.teal} />
            <Text
              fontSize="10px"
              fontWeight="800"
              color={L.teal}
              letterSpacing="0.08em"
              textTransform="uppercase"
            >
              Customer
            </Text>
          </HStack>
        </Box>

        {/* Offer chip */}
        <Box
          position="absolute"
          top={4}
          right={4}
          bg="rgba(255,255,255,0.92)"
          backdropFilter="blur(10px)"
          borderRadius="14px"
          px={3}
          py={2}
          border="1px solid"
          borderColor="rgba(14,123,123,0.15)"
        >
          <Text
            fontSize="9px"
            fontWeight="700"
            color={L.muted}
            textTransform="uppercase"
            letterSpacing="0.07em"
          >
            New Users Get
          </Text>
          <Text
            fontFamily="'Syne', sans-serif"
            fontSize="15px"
            fontWeight="800"
            color={L.teal}
          >
            10% OFF
          </Text>
        </Box>
      </Box>

      {/* Body */}
      <Box px={{ base: 6, md: 7 }} pb={7} pt={2}>
        <HStack spacing={3} mb={3}>
          <Circle
            size="48px"
            bg={L.tealBg}
            border="1px solid"
            borderColor="rgba(14,123,123,0.15)"
          >
            <Icon as={FiUser} boxSize={5} color={L.teal} />
          </Circle>
          <Box>
            <Text
              fontFamily="'Syne', sans-serif"
              fontSize="20px"
              fontWeight="800"
              color={L.text}
              letterSpacing="-0.02em"
            >
              Customer Portal
            </Text>
            <Text fontSize="12px" color={L.muted}>
              Rent & manage your bookings
            </Text>
          </Box>
        </HStack>

        <Text fontSize="13px" color={L.muted} lineHeight="1.75" mb={5}>
          Browse Kenya's finest fleet, book in seconds, and manage everything
          from your rentals to loyalty points — all in one place.
        </Text>

        <VStack spacing={2.5} align="stretch" mb={6}>
          {CUST_FEATURES.map((f, i) => (
            <HStack key={i} className="feature-row" spacing={2.5}>
              <Circle
                size="24px"
                bg={L.tealBg}
                flexShrink={0}
                border="1px solid"
                borderColor="rgba(14,123,123,0.12)"
              >
                <Icon as={f.icon} boxSize={3} color={L.teal} />
              </Circle>
              <Text fontSize="12px" fontWeight="500" color={L.textSub}>
                {f.text}
              </Text>
            </HStack>
          ))}
        </VStack>

        <Button
          className="btn-cust"
          w="100%"
          h="52px"
          bg={`linear-gradient(135deg, ${L.teal}, #1aa0a0)`}
          color="white"
          borderRadius="16px"
          fontWeight="700"
          fontSize="14px"
          rightIcon={<Icon as={FiArrowRight} boxSize={4} />}
          boxShadow="0 4px 18px rgba(14,123,123,0.28)"
          _hover={{ opacity: 1 }}
        >
          Enter Portal
        </Button>
      </Box>
    </Box>
  );
}

// ─── TRUST BAR ────────────────────────────────────────────────────────────────
const TRUST = [
  { icon: FiShield, text: "SSL Encrypted", sub: "Bank-grade security" },
  { icon: FiCheckCircle, text: "Verified Business", sub: "Licensed & insured" },
  { icon: FiClock, text: "24/7 Support", sub: "Always available" },
  { icon: FiZap, text: "Instant Confirmation", sub: "Book in 60 seconds" },
];

function TrustBar() {
  return (
    <SimpleGrid
      columns={{ base: 2, md: 4 }}
      spacing={4}
      w="100%"
      className="fu6"
    >
      {TRUST.map((t, i) => (
        <HStack
          key={i}
          className="trust-item"
          spacing={3}
          bg={L.card}
          borderRadius="16px"
          border="1px solid"
          borderColor={L.cardBorder}
          boxShadow={L.shadow}
          px={4}
          py={3.5}
        >
          <Circle size="34px" bg={L.accentGlow2} flexShrink={0}>
            <Icon as={t.icon} boxSize={3.5} color={L.accentLight} />
          </Circle>
          <Box>
            <Text fontSize="12px" fontWeight="700" color={L.text}>
              {t.text}
            </Text>
            <Text fontSize="10px" color={L.muted}>
              {t.sub}
            </Text>
          </Box>
        </HStack>
      ))}
    </SimpleGrid>
  );
}

// ─── FLEET PREVIEW STRIP ──────────────────────────────────────────────────────
const FLEET_PREVIEW = [
  {
    name: "Mercedes GLE 450",
    price: "KSh 12,000",
    img: "https://i.pinimg.com/1200x/3e/b6/f0/3eb6f096b3fc7054b11b7b7847d5cedb.jpg",
  },
  {
    name: "Range Rover Sport",
    price: "KSh 18,000",
    img: "https://i.pinimg.com/736x/34/fa/4f/34fa4fea50de089ab2a0bbb5781ae62c.jpg",
  },
  {
    name: "Toyota Prado 2024",
    price: "KSh 8,500",
    img: "https://i.pinimg.com/736x/c4/f5/1b/c4f51b497cfd0ee9243a845058dda64c.jpg",
  },
  {
    name: "VW Tiguan",
    price: "KSh 17,800",
    img: "https://i.pinimg.com/1200x/a8/bf/9d/a8bf9d0fd60233b1715a8bc9d0fcc1a6.jpg",
  },
];

function FleetPreview() {
  return (
    <Box className="fu5" w="100%">
      <HStack justify="space-between" mb={4} px={1}>
        <Box>
          <Text
            fontSize="11px"
            fontWeight="700"
            color={L.accentBright}
            letterSpacing="0.12em"
            textTransform="uppercase"
            mb={0.5}
          >
            Featured Fleet
          </Text>
          <Text
            fontFamily="'Syne', sans-serif"
            fontSize="18px"
            fontWeight="800"
            color={L.text}
            letterSpacing="-0.02em"
          >
            Explore what's waiting for you
          </Text>
        </Box>
        <Text
          fontSize="12px"
          fontWeight="600"
          color={L.accentLight}
          cursor="pointer"
          _hover={{ textDecoration: "underline" }}
        >
          View all 120+ →
        </Text>
      </HStack>

      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
        {FLEET_PREVIEW.map((car, i) => (
          <Box
            key={i}
            bg={L.card}
            borderRadius="20px"
            overflow="hidden"
            border="1px solid"
            borderColor={L.cardBorder}
            boxShadow={L.shadow}
            cursor="pointer"
            transition="transform .25s ease, box-shadow .25s ease"
            _hover={{ transform: "translateY(-5px)", boxShadow: L.shadowMd }}
          >
            <Box h="120px" overflow="hidden">
              <Image
                src={car.img}
                w="100%"
                h="100%"
                objectFit="cover"
                transition="transform .4s ease"
                _groupHover={{ transform: "scale(1.06)" }}
              />
            </Box>
            <Box px={3} py={3}>
              <Text
                fontSize="12px"
                fontWeight="700"
                color={L.text}
                noOfLines={1}
                mb={0.5}
              >
                {car.name}
              </Text>
              <Text fontSize="11px" fontWeight="800" color={L.accentLight}>
                {car.price}
              </Text>
              <Text fontSize="10px" color={L.muted}>
                per day
              </Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function Home() {
  const router = useRouter();
  const { setIsLoading } = useLoading();

  const goTo = (path: string) => {
    setIsLoading(true);
    router.push(path);
  };

  return (
    <>
      <Styles />
      <Box
        minH="100vh"
        bg={L.bg}
        fontFamily="'DM Sans', sans-serif"
        pb={{ base: 20, md: 0 }}
      >
        <Ticker />

        {/* Navbar minimal */}
        <Box
          bg={L.card}
          borderBottom="1px solid"
          borderColor={L.cardBorder}
          px={{ base: 4, md: 10 }}
          py={4}
          boxShadow="0 1px 12px rgba(0,0,0,0.05)"
        >
          <Flex align="center" maxW="1200px" mx="auto">
            <HStack spacing={2.5}>
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
            <Spacer />
            <HStack spacing={3}>
              <Box
                px={3}
                py={1.5}
                borderRadius="full"
                bg={L.accentGlow}
                border="1px solid"
                borderColor={L.cardBorder}
              >
                <HStack spacing={1.5}>
                  <Circle
                    size="7px"
                    bg={L.accentBright}
                    className="pulse-dot"
                  />
                  <Text fontSize="11px" fontWeight="700" color={L.accentLight}>
                    All Systems Live
                  </Text>
                </HStack>
              </Box>
              <Text
                fontSize="12px"
                color={L.subtle}
                display={{ base: "none", md: "block" }}
              >
                +254 800 123 456
              </Text>
            </HStack>
          </Flex>
        </Box>

        <Container
          maxW="1100px"
          px={{ base: 4, md: 6 }}
          py={{ base: 10, md: 16 }}
        >
          <VStack spacing={12} align="stretch">
            {/* Header */}
            <VStack spacing={5} textAlign="center">
              <HeroBadge />

              <Box className="fu1">
                <Text
                  fontFamily="'Syne', sans-serif"
                  fontSize={{
                    base: "38px",
                    sm: "50px",
                    md: "64px",
                    lg: "74px",
                  }}
                  fontWeight="800"
                  letterSpacing="-0.04em"
                  lineHeight="0.95"
                  color={L.text}
                >
                  Select Your
                  <br />
                  <Text as="span" color={L.accentLight} position="relative">
                    Portal Access
                    <Box
                      className="underline-anim"
                      position="absolute"
                      bottom="-3px"
                      left={0}
                      right={0}
                      h="4px"
                      bg={L.accentLight}
                      borderRadius="full"
                    />
                  </Text>
                </Text>
              </Box>

              <Text
                className="fu2"
                color={L.muted}
                fontSize={{ base: "14px", md: "16px" }}
                maxW="560px"
                mx="auto"
                lineHeight="1.8"
                fontWeight="300"
              >
                DriveKE connects fleet owners and customers on one seamless
                platform. Choose your role to unlock your personalised
                experience.
              </Text>
            </VStack>

            {/* Portal cards */}
            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              spacing={6}
              className="fu3"
            >
              <BusinessCard onClick={() => goTo("/auth")} />
              <CustomerCard onClick={() => goTo("/auth")} />
            </SimpleGrid>

            {/* Stats */}
            <StatsRow />

            {/* Fleet preview */}
            <FleetPreview />

            {/* Trust bar */}
            <TrustBar />

            {/* Footer */}
            <Box pt={2}>
              <Divider borderColor={L.cardBorder} mb={6} />
              <Flex
                align="center"
                justify="space-between"
                flexWrap="wrap"
                gap={3}
              >
                <HStack spacing={2}>
                  <Box
                    w={7}
                    h={7}
                    bg={L.accent}
                    borderRadius="lg"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text fontSize="sm">🚘</Text>
                  </Box>
                  <Text
                    fontFamily="'Syne', sans-serif"
                    fontSize="14px"
                    fontWeight="800"
                    color={L.text}
                  >
                    Drive
                    <Text as="span" color={L.accentLight}>
                      KE
                    </Text>
                  </Text>
                </HStack>
                <Text fontSize="12px" color={L.subtle} textAlign="center">
                  © {new Date().getFullYear()} DriveKE Ltd · Kenya's Premium Car
                  Hire Platform
                </Text>
                <HStack spacing={4}>
                  {["Privacy", "Terms", "Support"].map((l) => (
                    <Text
                      key={l}
                      fontSize="12px"
                      color={L.subtle}
                      cursor="pointer"
                      _hover={{ color: L.accentLight }}
                      transition="color .2s ease"
                    >
                      {l}
                    </Text>
                  ))}
                </HStack>
              </Flex>
            </Box>
          </VStack>
        </Container>
      </Box>
    </>
  );
}
