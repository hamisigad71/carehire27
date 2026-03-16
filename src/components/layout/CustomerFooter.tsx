"use client";

import { useState } from "react";
import {
  Box,
  Container,
  SimpleGrid,
  VStack,
  HStack,
  Text,
  Icon,
  Flex,
  Circle,
  Divider,
  Badge,
  Collapse,
  Button,
  Grid,
  Image,
} from "@chakra-ui/react";
import {
  FiInstagram,
  FiTwitter,
  FiFacebook,
  FiMail,
  FiPhone,
  FiMapPin,
  FiTruck,
  FiShield,
  FiStar,
  FiAward,
  FiChevronDown,
  FiChevronUp,
  FiCode,
  FiHeart,
  FiLinkedin,
  FiYoutube,
  FiArrowRight,
  FiClock,
  FiCheckCircle,
  FiGlobe,
} from "react-icons/fi";

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
  gold: "#b07d0a",
  goldBg: "rgba(176,125,10,0.1)",
};

// ─── STYLES ───────────────────────────────────────────────────────────────────
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

    @keyframes fadeUp {
      from { opacity:0; transform:translateY(12px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes heartBeat {
      0%,100% { transform: scale(1); }
      50%      { transform: scale(1.25); }
    }
    @keyframes shimmer {
      0%   { background-position: -300px 0; }
      100% { background-position:  300px 0; }
    }

    .ft-link {
      transition: color .18s ease, transform .18s ease;
      cursor: pointer;
      display: inline-block;
    }
    .ft-link:hover { color: ${L.accentLight} !important; transform: translateX(3px); }

    .ft-social {
      transition: all .2s ease;
      cursor: pointer;
    }
    .ft-social:hover { transform: translateY(-3px); background: ${L.accentGlow2} !important; border-color: ${L.accentLight} !important; }

    .ft-stat { transition: transform .2s ease; }
    .ft-stat:hover { transform: translateY(-3px); }

    .ft-creator-btn {
      transition: all .2s ease !important;
    }
    .ft-creator-btn:hover { background: ${L.accentGlow2} !important; border-color: ${L.accentLight} !important; }

    .heart { animation: heartBeat 1.8s ease-in-out infinite; display: inline-block; }

    .ft-shimmer-badge {
      background: linear-gradient(90deg, ${L.accentGlow} 0%, ${L.accentGlow2} 50%, ${L.accentGlow} 100%);
      background-size: 300px 100%;
      animation: shimmer 2.5s linear infinite;
    }

    .ft-newsletter-input {
      flex: 1;
      height: 44px;
      border: 1px solid ${L.cardBorder};
      border-radius: 12px 0 0 12px;
      padding: 0 16px;
      font-family: 'DM Sans', sans-serif;
      font-size: 13px;
      color: ${L.text};
      background: ${L.card};
      outline: none;
      transition: border-color .2s ease;
    }
    .ft-newsletter-input:focus { border-color: ${L.accentLight}; box-shadow: 0 0 0 3px rgba(30,110,30,0.1); }
    .ft-newsletter-input::placeholder { color: ${L.subtle}; }

    .ft-newsletter-btn {
      height: 44px;
      padding: 0 18px;
      background: ${L.accent};
      color: white;
      border: none;
      border-radius: 0 12px 12px 0;
      font-family: 'DM Sans', sans-serif;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      transition: background .2s ease, transform .2s ease;
      display: flex; align-items: center; gap: 6px;
    }
    .ft-newsletter-btn:hover { background: ${L.accentLight}; transform: translateX(2px); }
  `}</style>
);

// ─── NAV DATA ─────────────────────────────────────────────────────────────────
const NAV = [
  {
    title: "Fleet",
    links: [
      "Browse All Cars",
      "Luxury Sedans",
      "Premium SUVs",
      "Electric Vehicles",
      "Chauffeur Service",
    ],
  },
  {
    title: "Company",
    links: [
      "About DriveKE",
      "Partner Program",
      "Our Locations",
      "Safety Standards",
      "Careers",
    ],
  },
  {
    title: "Support",
    links: [
      "Help Centre",
      "Live Chat",
      "Roadside Assist",
      "Cancellation Policy",
      "FAQs",
    ],
  },
  {
    title: "Legal",
    links: [
      "Privacy Policy",
      "Terms of Service",
      "Cookie Settings",
      "Insurance Info",
      "Data Rights",
    ],
  },
];

const STATS = [
  { label: "Active Vehicles", value: "120+", icon: FiTruck },
  { label: "Cities Covered", value: "12", icon: FiGlobe },
  { label: "Happy Customers", value: "4,800+", icon: FiStar },
  { label: "Years of Trust", value: "6", icon: FiAward },
];

const SOCIALS = [
  { icon: FiTwitter, label: "Twitter" },
  { icon: FiInstagram, label: "Instagram" },
  { icon: FiFacebook, label: "Facebook" },
  { icon: FiLinkedin, label: "LinkedIn" },
  { icon: FiYoutube, label: "YouTube" },
];

const TRUST = [
  { icon: FiShield, text: "SSL Secured" },
  { icon: FiCheckCircle, text: "Verified Business" },
  { icon: FiClock, text: "24/7 Support" },
];

// ─── FOOTER ───────────────────────────────────────────────────────────────────
export const CustomerFooter = () => {
  const [creatorOpen, setCreatorOpen] = useState(false);

  return (
    <>
      <Styles />
      <Box bg={L.bg} borderTop="1px solid" borderColor={L.cardBorder}>
        {/* ── TOP STRIP: Stats ── */}
        <Box
          bg={L.card}
          borderBottom="1px solid"
          borderColor={L.cardBorder}
          py={6}
        >
          <Container maxW="1200px">
            <Grid
              templateColumns={{ base: "repeat(2,1fr)", md: "repeat(4,1fr)" }}
              gap={4}
            >
              {STATS.map((s, i) => (
                <Flex
                  key={i}
                  className="ft-stat"
                  align="center"
                  gap={3}
                  bg={L.bg}
                  borderRadius="16px"
                  border="1px solid"
                  borderColor={L.cardBorder}
                  px={4}
                  py={3}
                >
                  <Circle size="38px" bg={L.accentGlow2}>
                    <Icon as={s.icon} boxSize={4} color={L.accentLight} />
                  </Circle>
                  <Box>
                    <Text
                      fontFamily="'Syne', sans-serif"
                      fontSize="18px"
                      fontWeight="800"
                      color={L.text}
                      lineHeight="1"
                    >
                      {s.value}
                    </Text>
                    <Text
                      fontSize="11px"
                      fontWeight="600"
                      color={L.muted}
                      fontFamily="'DM Sans', sans-serif"
                    >
                      {s.label}
                    </Text>
                  </Box>
                </Flex>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* ── MAIN FOOTER BODY ── */}
        <Container maxW="1200px" pt={14} pb={10}>
          {/* Brand + Newsletter row */}
          <Grid
            templateColumns={{ base: "1fr", lg: "1.4fr 1fr" }}
            gap={12}
            mb={14}
          >
            {/* Brand */}
            <Box>
              <HStack spacing={2.5} mb={4}>
                <Box
                  w={10}
                  h={10}
                  bg={L.accent}
                  borderRadius="xl"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontSize="xl">🚘</Text>
                </Box>
                <Text
                  fontFamily="'Syne', sans-serif"
                  fontWeight="800"
                  fontSize="22px"
                  color={L.text}
                >
                  Drive
                  <Text as="span" color={L.accentLight}>
                    KE
                  </Text>
                </Text>
              </HStack>

              <Text
                fontFamily="'DM Sans', sans-serif"
                fontSize="14px"
                color={L.muted}
                lineHeight="1.75"
                fontWeight="400"
                maxW="380px"
                mb={5}
              >
                Kenya's most trusted premium car hire platform. We connect
                discerning travellers with a handpicked fleet of luxury and
                performance vehicles, delivering seamless experiences from
                booking to drop-off.
              </Text>

              {/* Social icons */}
              <HStack spacing={2} mb={6} flexWrap="wrap">
                {SOCIALS.map(({ icon, label }) => (
                  <Circle
                    key={label}
                    size="38px"
                    className="ft-social"
                    bg={L.card}
                    border="1px solid"
                    borderColor={L.cardBorder}
                    cursor="pointer"
                    title={label}
                  >
                    <Icon as={icon} boxSize={4} color={L.muted} />
                  </Circle>
                ))}
              </HStack>

              {/* Trust badges */}
              <HStack spacing={3} flexWrap="wrap">
                {TRUST.map(({ icon, text }) => (
                  <HStack
                    key={text}
                    spacing={1.5}
                    bg={L.accentGlow}
                    border="1px solid"
                    borderColor={L.cardBorder}
                    borderRadius="full"
                    px={3}
                    py={1.5}
                  >
                    <Icon as={icon} color={L.accentLight} boxSize={3} />
                    <Text
                      fontSize="11px"
                      fontWeight="700"
                      color={L.accentLight}
                    >
                      {text}
                    </Text>
                  </HStack>
                ))}
              </HStack>
            </Box>

            {/* Newsletter */}
            <Box>
              <Badge
                className="ft-shimmer-badge"
                borderRadius="full"
                px={3}
                py={1}
                fontSize="10px"
                fontWeight="700"
                color={L.accentLight}
                textTransform="uppercase"
                letterSpacing="0.1em"
                mb={3}
                border="1px solid"
                borderColor={L.cardBorder}
              >
                Stay in the Loop
              </Badge>
              <Text
                fontFamily="'Syne', sans-serif"
                fontSize="22px"
                fontWeight="800"
                color={L.text}
                letterSpacing="-0.02em"
                mb={2}
                lineHeight="1.2"
              >
                Get exclusive
                <br />
                <Text as="span" color={L.accentLight}>
                  member deals
                </Text>
              </Text>
              <Text
                fontSize="13px"
                color={L.muted}
                mb={5}
                lineHeight="1.7"
                fontFamily="'DM Sans', sans-serif"
              >
                Subscribe and be the first to know about flash deals,
                <br />
                new fleet additions, and loyalty rewards.
              </Text>

              <Flex mb={3}>
                <input
                  className="ft-newsletter-input"
                  type="email"
                  placeholder="Enter your email address"
                />
                <button className="ft-newsletter-btn">
                  Subscribe
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </Flex>
              <Text
                fontSize="11px"
                color={L.subtle}
                fontFamily="'DM Sans', sans-serif"
              >
                No spam. Unsubscribe anytime. We respect your privacy.
              </Text>

              {/* Contact quick links */}
              <VStack spacing={2} align="stretch" mt={6}>
                {[
                  {
                    icon: FiPhone,
                    text: "+254 800 123 456",
                    label: "24/7 Helpline",
                  },
                  {
                    icon: FiMail,
                    text: "hello@driveke.co.ke",
                    label: "Email Us",
                  },
                  {
                    icon: FiMapPin,
                    text: "Nairobi, Kenya",
                    label: "Headquarters",
                  },
                ].map(({ icon, text, label }) => (
                  <HStack
                    key={text}
                    spacing={3}
                    p={3}
                    bg={L.card}
                    borderRadius="12px"
                    border="1px solid"
                    borderColor={L.cardBorder}
                  >
                    <Circle size="32px" bg={L.accentGlow}>
                      <Icon as={icon} color={L.accentLight} boxSize={3.5} />
                    </Circle>
                    <Box>
                      <Text
                        fontSize="10px"
                        fontWeight="700"
                        color={L.subtle}
                        textTransform="uppercase"
                        letterSpacing="0.07em"
                      >
                        {label}
                      </Text>
                      <Text
                        fontSize="13px"
                        fontWeight="600"
                        color={L.text}
                        fontFamily="'DM Sans', sans-serif"
                      >
                        {text}
                      </Text>
                    </Box>
                  </HStack>
                ))}
              </VStack>
            </Box>
          </Grid>

          {/* Nav links grid */}
          <SimpleGrid columns={{ base: 2, sm: 2, md: 3 }} spacing={8} mb={14}>
            {NAV.map((col) => (
              <VStack key={col.title} align="start" spacing={4}>
                <Text
                  fontFamily="'Syne', sans-serif"
                  fontWeight="700"
                  color={L.text}
                  fontSize="13px"
                  letterSpacing="-0.01em"
                >
                  {col.title}
                </Text>
                <VStack align="start" spacing={2.5}>
                  {col.links.map((link) => (
                    <Text
                      key={link}
                      className="ft-link"
                      fontFamily="'DM Sans', sans-serif"
                      fontSize="12px"
                      color={L.muted}
                      fontWeight="400"
                    >
                      {link}
                    </Text>
                  ))}
                </VStack>
              </VStack>
            ))}
          </SimpleGrid>

          {/* App download strip */}
          <Box
            bg={L.card}
            borderRadius="20px"
            border="1px solid"
            borderColor={L.cardBorder}
            p={{ base: 5, md: 6 }}
            mb={10}
          >
            <Flex
              align="center"
              justify="space-between"
              flexWrap="wrap"
              gap={4}
            >
              <HStack spacing={4}>
                <Circle size="44px" bg={L.accentGlow2}>
                  <Text fontSize="xl">📱</Text>
                </Circle>
                <Box>
                  <Text
                    fontFamily="'Syne', sans-serif"
                    fontWeight="800"
                    fontSize="14px"
                    color={L.text}
                  >
                    Download the DriveKE App
                  </Text>
                  <Text
                    fontFamily="'DM Sans', sans-serif"
                    fontSize="12px"
                    color={L.muted}
                  >
                    Book in seconds. Available on iOS & Android.
                  </Text>
                </Box>
              </HStack>
              <HStack spacing={3} flexWrap="wrap">
                {[
                  { 
                    store: "App Store", 
                    logo: "https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg",
                    url: "https://apps.apple.com"
                  },
                  { 
                    store: "Google Play", 
                    logo: "https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png",
                    url: "https://play.google.com"
                  },
                ].map(({ store, logo, url }) => (
                  <Box
                    key={store}
                    as="a"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    display="inline-block"
                    transition="all .2s ease"
                    _hover={{ transform: "translateY(-2px)", opacity: 0.9 }}
                  >
                    <Image
                      src={logo}
                      alt={store}
                      h="40px"
                      objectFit="contain"
                    />
                  </Box>
                ))}
              </HStack>
            </Flex>
          </Box>

          {/* ── BOTTOM BAR ── */}
          <Divider borderColor={L.cardBorder} mb={6} />

          <Flex 
            align="center" 
            justify={{ base: "flex-end", md: "space-between" }} 
            flexWrap="wrap" 
            gap={4}
            pb={{ base: 20, md: 0 }}
          >
            {/* Copyright */}
            <Text
              fontFamily="'DM Sans', sans-serif"
              fontSize="12px"
              color={L.subtle}
              display={{ base: "none", md: "block" }}
            >
              © {new Date().getFullYear()} DriveKE Ltd. All rights reserved. ·
              Nairobi, Kenya
            </Text>

            {/* Legal links */}
            <HStack spacing={5} display={{ base: "none", md: "flex" }}>
              {["Privacy", "Terms", "Cookies", "Sitemap"].map((l) => (
                <Text
                  key={l}
                  className="ft-link"
                  fontFamily="'DM Sans', sans-serif"
                  fontSize="12px"
                  color={L.subtle}
                  _hover={{ color: L.accentLight }}
                >
                  {l}
                </Text>
              ))}
            </HStack>

            {/* ── CREATOR DROPDOWN ── */}
            <Box position="relative" w={{ base: "100%", md: "auto" }}>
              <Button
                className="ft-creator-btn"
                size="xs"
                h={{ base: "36px", md: "32px" }}
                px={4}
                w={{ base: "100%", md: "auto" }}
                bg={L.card}
                color={L.muted}
                border="1px solid"
                borderColor={L.cardBorder}
                borderRadius="full"
                fontWeight="600"
                fontSize="11px"
                rightIcon={
                  <Icon
                    as={creatorOpen ? FiChevronUp : FiChevronDown}
                    boxSize={3}
                    transition="transform .2s ease"
                  />
                }
                _hover={{}}
                onClick={() => setCreatorOpen(!creatorOpen)}
              >
                <Icon as={FiCode} boxSize={3} mr={1.5} color={L.accentLight} />
                Built by
              </Button>

              {creatorOpen && (
                <Box
                  position="absolute"
                  bottom="calc(100% + 8px)"
                  right={0}
                  bg={L.card}
                  border="1px solid"
                  borderColor={L.cardBorder}
                  borderRadius="20px"
                  boxShadow="0 16px 48px rgba(0,0,0,0.12)"
                  p={5}
                  w="260px"
                  zIndex={100}
                >
                  {/* Top accent */}
                  <Box
                    h="3px"
                    mx={-5}
                    mt={-5}
                    mb={4}
                    bg={`linear-gradient(90deg, ${L.accent}, ${L.accentLight}, #72b872)`}
                    borderRadius="20px 20px 0 0"
                  />

                  <VStack spacing={4} align="stretch">
                    {/* Avatar + name */}
                    <HStack spacing={3}>
                      <Circle
                        size="44px"
                        bg={`linear-gradient(135deg, ${L.accent}, ${L.accentLight})`}
                      >
                        <Text fontSize="16px" fontWeight="800" color="white">
                          DG
                        </Text>
                      </Circle>
                      <Box>
                        <Text
                          fontFamily="'Syne', sans-serif"
                          fontSize="15px"
                          fontWeight="800"
                          color={L.text}
                          letterSpacing="-0.01em"
                        >
                          Daysman Gad
                        </Text>
                        <Text fontSize="11px" color={L.muted}>
                          Full-stack Developer
                        </Text>
                      </Box>
                    </HStack>

                    <Divider borderColor={L.cardBorder} />

                    <VStack spacing={2.5} align="stretch">
                      <Text fontSize="12px" color={L.muted} lineHeight="1.6">
                        Designed & built with care. Crafted for DriveKE —
                        Kenya's premier car hire platform.
                      </Text>
                      <HStack spacing={2} flexWrap="wrap">
                        {["Next.js", "Chakra UI", "TypeScript"].map((t) => (
                          <Box
                            key={t}
                            bg={L.accentGlow}
                            border="1px solid"
                            borderColor={L.cardBorder}
                            borderRadius="full"
                            px={2.5}
                            py={0.5}
                          >
                            <Text
                              fontSize="10px"
                              fontWeight="700"
                              color={L.accentLight}
                            >
                              {t}
                            </Text>
                          </Box>
                        ))}
                      </HStack>
                    </VStack>

                    <Divider borderColor={L.cardBorder} />

                    <HStack justify="space-between" align="center">
                      <Text fontSize="11px" color={L.subtle}>
                        Made with{" "}
                        <Text as="span" className="heart" color={L.accent}>
                          ♥
                        </Text>{" "}
                        in Nairobi
                      </Text>
                      <Box
                        px={3}
                        py={1}
                        bg={L.accentGlow2}
                        borderRadius="full"
                        border="1px solid"
                        borderColor={L.cardBorder}
                      >
                        <Text
                          fontSize="10px"
                          fontWeight="700"
                          color={L.accentLight}
                        >
                          v1.0.0
                        </Text>
                      </Box>
                    </HStack>
                  </VStack>
                </Box>
              )}
            </Box>
          </Flex>
        </Container>
      </Box>
    </>
  );
};
