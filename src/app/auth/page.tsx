"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoading } from "@/context/LoadingContext";
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  Icon,
  Image,
  Grid,
  Checkbox,
  Badge,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
  Radio,
  RadioGroup,
  useColorMode,
  Container,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiUser,
  FiPhone,
  FiArrowRight,
  FiCheck,
  FiShield,
  FiStar,
  FiZap,
  FiChevronLeft,
  FiChevronRight,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useColorTokens } from "@/hooks/useColorTokens";

// ─── ANIMATIONS ───────────────────────────────────────────────────────
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    @keyframes fadeUp    { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn    { from { opacity:0; } to { opacity:1; } }
    @keyframes floatY    { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-16px); } }
    @keyframes spinSlow  { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
    @keyframes slideIn   { from { opacity:0; transform:translateX(20px); } to { opacity:1; transform:translateX(0); } }
    @keyframes slideInL  { from { opacity:0; transform:translateX(-20px); } to { opacity:1; transform:translateX(0); } }
    @keyframes pulse     { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
    @keyframes shimmer   { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }

    .fu   { animation: fadeUp  .65s ease both; }
    .fu1  { animation: fadeUp  .65s .08s ease both; }
    .fu2  { animation: fadeUp  .65s .16s ease both; }
    .fu3  { animation: fadeUp  .65s .24s ease both; }
    .fu4  { animation: fadeUp  .65s .32s ease both; }
    .fu5  { animation: fadeUp  .65s .40s ease both; }
    .fu6  { animation: fadeUp  .65s .48s ease both; }
    .fi   { animation: fadeIn  .8s  .3s  ease both; }
    .si   { animation: slideIn .5s  ease both; }
    .sil  { animation: slideInL .5s ease both; }

    .float { animation: floatY 5s ease-in-out infinite; }
    .spin  { animation: spinSlow 20s linear infinite; }
    .pulse { animation: pulse 2s ease-in-out infinite; }

    .panel-switch { transition: all .45s cubic-bezier(.25,.46,.45,.94); }

    .input-field { 
      transition: all .25s cubic-bezier(.4,.0,.2,1) !important;
      background-color: var(--chakra-colors-chakra-body-bg) !important;
    }
    .input-field:focus { 
      transform: translateY(-2px) !important;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08) !important;
    }

    .btn-main {
      transition: all .3s cubic-bezier(.25,.46,.45,.94) !important;
      position: relative;
      overflow: hidden;
      font-weight: 700 !important;
      letter-spacing: -0.01em;
      box-shadow: 0 4px 12px rgba(0, 168, 85, 0.2) !important;
    }
    .btn-main:hover { 
      transform: translateY(-4px) !important;
      box-shadow: 0 12px 24px rgba(0, 168, 85, 0.3) !important;
    }
    .btn-main:active { transform: translateY(-1px) !important; }

    .btn-google { 
      transition: all .3s ease !important;
      position: relative;
      background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7)) !important;
      border: 1.5px solid rgba(0, 0, 0, 0.08) !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06) !important;
      font-weight: 700 !important;
    }
    .btn-google:hover { 
      transform: translateY(-3px) !important;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1) !important;
      background: linear-gradient(135deg, rgba(255,255,255,1), rgba(255,255,255,0.85)) !important;
    }

    .strength-bar { transition: width .4s ease, background .4s ease; }
    .feature-card { 
      transition: transform .2s ease, box-shadow .2s ease;
      padding: 12px;
      border-radius: 12px;
      background: rgba(0, 168, 85, 0.03);
      border: 1px solid rgba(0, 168, 85, 0.1);
    }
    .feature-card:hover { 
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 168, 85, 0.1);
    }
    
    .tab-pill { 
      transition: all .3s cubic-bezier(.25,.46,.45,.94);
      cursor: pointer;
    }

    .divider-line { transition: background-color .2s ease; }

    .section-divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.1), transparent);
      margin: 20px 0;
    }

    .trust-badge {
      padding: 8px 12px;
      border-radius: 10px;
      background: rgba(0, 168, 85, 0.08);
      border: 1px solid rgba(0, 168, 85, 0.15);
      font-weight: 600;
      font-size: 12px;
      transition: all .2s ease;
    }
    .trust-badge:hover {
      background: rgba(0, 168, 85, 0.12);
      border-color: rgba(0, 168, 85, 0.25);
      transform: translateY(-1px);
    }

    .car-showcase {
      border-radius: 16px;
      overflow: hidden;
      background: linear-gradient(135deg, rgba(0, 168, 85, 0.1), rgba(0, 168, 85, 0.05));
      border: 1px solid rgba(0, 168, 85, 0.15);
    }

    .counter-badge {
      background: linear-gradient(135deg, #00a855, #2d8c2d);
      color: white;
      padding: 8px 14px;
      border-radius: 20px;
      font-weight: 700;
      font-size: 12px;
    }
  `}</style>
);

// ─── PASSWORD STRENGTH ────────────────────────────────────────────────────────
function getStrength(pw: string, tokens: any) {
  if (!pw) return { score: 0, label: "", color: "transparent" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const map = [
    { label: "", color: "transparent" },
    { label: "Weak", color: tokens.danger },
    { label: "Fair", color: tokens.warning },
    { label: "Good", color: tokens.accent },
    { label: "Strong", color: tokens.success },
  ];
  return { score, ...map[score] };
}

// ─── PORTAL SELECTOR MODAL ────────────────────────────────────────────────
function PortalSelector({ isOpen, onClose, tokens }: any) {
  const router = useRouter();
  const { setIsLoading } = useLoading();

  const handlePortalSelect = (portal: "business" | "customer") => {
    setIsLoading(true);
    setTimeout(() => {
      router.push(`/${portal}`);
    }, 500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay backdropFilter="blur(4px)" bg="rgba(0,0,0,0.45)" />
      <ModalContent
        bg="#ffffff"
        border="1px solid"
        borderColor="rgba(30,110,30,0.1)"
        borderRadius="20px"
        overflow="hidden"
        mx={4}
        boxShadow="0 24px 64px rgba(0,0,0,0.18)"
      >
        <Box h="4px" bg="linear-gradient(90deg, #1e6e1e, #2d8c2d, #52b852)" />

        <ModalHeader
          bg="#eef3ee"
          borderBottom="1px solid"
          borderColor="rgba(0,0,0,0.07)"
          px={7}
          py={5}
        >
          <Text
            fontSize="20px"
            fontWeight="800"
            color="#111a11"
            letterSpacing="-0.02em"
          >
            Select your portal
          </Text>
          <Text fontSize="13px" color="#6b7f6b" mt={1}>
            Choose where you'd like to go
          </Text>
        </ModalHeader>
        <ModalCloseButton
          top={4}
          right={5}
          color="#9aaa9a"
          borderRadius="8px"
          _hover={{ bg: "rgba(30,110,30,0.08)", color: "#111a11" }}
        />

        <ModalBody px={5} py="20px 20px 26px 20px">
          <VStack spacing={3} align="stretch">
            {/* Business Portal */}
            <Box
              as="button"
              w="100%"
              textAlign="left"
              p={5}
              borderRadius="16px"
              bg="#ffffff"
              border="1px solid"
              borderColor="rgba(0,0,0,0.07)"
              cursor="pointer"
              transition="all 0.2s ease"
              onClick={() => handlePortalSelect("business")}
              _hover={{ borderColor: "#2d8c2d", bg: "rgba(30,110,30,0.05)" }}
            >
              <HStack spacing={3.5} mb={2.5} align="center">
                <Box
                  w="44px"
                  h="44px"
                  borderRadius="12px"
                  flexShrink={0}
                  bg="rgba(30,110,30,0.1)"
                  border="1px solid"
                  borderColor="rgba(30,110,30,0.18)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="22px"
                  lineHeight="1"
                >
                  💼
                </Box>
                <Text flex={1} fontSize="15px" fontWeight="800" color="#111a11">
                  Business Portal
                </Text>
                <Icon as={FiChevronRight} boxSize={4} color="#9aaa9a" />
              </HStack>
              <Text
                fontSize="13px"
                color="#6b7f6b"
                pl="58px"
                lineHeight="1.55"
                mb={3}
              >
                Manage fleet, bookings, and revenue
              </Text>
              <HStack spacing={1.5} pl="58px" flexWrap="wrap">
                {["Fleet", "Bookings", "Revenue"].map((tag) => (
                  <Box
                    key={tag}
                    px={2.25}
                    py={0.5}
                    borderRadius="6px"
                    bg="rgba(30,110,30,0.1)"
                    border="1px solid"
                    borderColor="rgba(30,110,30,0.18)"
                  >
                    <Text fontSize="11px" fontWeight="700" color="#2d8c2d">
                      {tag}
                    </Text>
                  </Box>
                ))}
              </HStack>
            </Box>

            {/* Customer Portal */}
            <Box
              as="button"
              w="100%"
              textAlign="left"
              p={5}
              borderRadius="16px"
              bg="#ffffff"
              border="1px solid"
              borderColor="rgba(0,0,0,0.07)"
              cursor="pointer"
              transition="all 0.2s ease"
              onClick={() => handlePortalSelect("customer")}
              _hover={{ borderColor: "#1a56a0", bg: "rgba(26,86,160,0.05)" }}
            >
              <HStack spacing={3.5} mb={2.5} align="center">
                <Box
                  w="44px"
                  h="44px"
                  borderRadius="12px"
                  flexShrink={0}
                  bg="rgba(26,86,160,0.08)"
                  border="1px solid"
                  borderColor="rgba(26,86,160,0.18)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="22px"
                  lineHeight="1"
                >
                  🚗
                </Box>
                <Text flex={1} fontSize="15px" fontWeight="800" color="#111a11">
                  Customer Portal
                </Text>
                <Icon as={FiChevronRight} boxSize={4} color="#9aaa9a" />
              </HStack>
              <Text
                fontSize="13px"
                color="#6b7f6b"
                pl="58px"
                lineHeight="1.55"
                mb={3}
              >
                Book vehicles and manage your rentals
              </Text>
              <HStack spacing={1.5} pl="58px" flexWrap="wrap">
                {["Browse", "Book", "Track"].map((tag) => (
                  <Box
                    key={tag}
                    px={2.25}
                    py={0.5}
                    borderRadius="6px"
                    bg="rgba(26,86,160,0.08)"
                    border="1px solid"
                    borderColor="rgba(26,86,160,0.18)"
                  >
                    <Text fontSize="11px" fontWeight="700" color="#1a56a0">
                      {tag}
                    </Text>
                  </Box>
                ))}
              </HStack>
            </Box>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
function LeftPanel({ mode, tokens }: any) {
  const isLogin = mode === "login";
  const [currentCarIndex, setCurrentCarIndex] = useState(0);

  const cars = [
    {
      name: "Toyota Voxy",
      price: "KSh 8,500/day",
      image:
        "https://i.pinimg.com/1200x/b7/ed/78/b7ed78a5554c98859572aa20ba4473f9.jpg",
      badge: "Popular",
    },
    {
      name: "Subaru Outback",
      price: "KSh 7,200/day",
      image:
        "https://i.pinimg.com/1200x/e9/5f/3e/e95f3e6e6e8e8e8e8e8e8e8e8e8e8e.jpg",
      badge: "Premium",
    },
    {
      name: "Honda Civic",
      price: "KSh 4,500/day",
      image:
        "https://i.pinimg.com/1200x/72/8a/0a/728a0a0a0a0a0a0a0a0a0a0a0a0a0a.jpg",
      badge: "Economy",
    },
  ];

  const whyDriveKE = [
    { icon: "🔒", text: "100% Insured", color: "rgba(0, 168, 85, 0.1)" },
    { icon: "⚡", text: "5-min Booking", color: "rgba(26, 86, 160, 0.1)" },
    { icon: "🌍", text: "Nationwide", color: "rgba(255, 107, 53, 0.1)" },
  ];

  const features = [
    { icon: FiZap, text: "Instant confirmation" },
    { icon: FiShield, text: "Zero deposit Gold members" },
    { icon: FiStar, text: "Earn points every trip" },
  ];

  const isDark = tokens.pageBg === "#0a0f0d";
  const gradColor = isDark ? "#00cc66" : "#00a855";

  const nextCar = () => setCurrentCarIndex((prev) => (prev + 1) % cars.length);
  const prevCar = () =>
    setCurrentCarIndex((prev) => (prev - 1 + cars.length) % cars.length);

  return (
    <Box
      position="relative"
      overflow="hidden"
      bg={
        isDark
          ? "linear-gradient(160deg, #0d380d 0%, #154a15 30%, #1e6e1e 60%, #0d380d 100%)"
          : "linear-gradient(160deg, #dffaf5 0%, #c2e8de 25%, #d4eee9 60%, #e6f2f0 100%)"
      }
      display={{ base: "none", lg: "flex" }}
      flexDir="column"
      justifyContent="space-between"
      p={{ lg: 8, xl: 12 }}
      minH="100vh"
    >
      {/* Multi-layered background decorations */}
      <Box
        position="absolute"
        inset={0}
        opacity={isDark ? 0.05 : 0.03}
        bgImage={`linear-gradient(${isDark ? "rgba(0,255,136,1)" : "rgba(0,168,85,1)"} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? "rgba(0,255,136,1)" : "rgba(0,168,85,1)"} 1px, transparent 1px)`}
        bgSize="48px 48px"
      />

      {/* Animated orbs for depth */}
      <Box
        position="absolute"
        top="-120px"
        right="-100px"
        w="450px"
        h="450px"
        bg={
          isDark
            ? "radial-gradient(circle, rgba(0,255,136,0.2) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(0,168,85,0.15) 0%, transparent 70%)"
        }
        className="float"
        filter="blur(60px)"
      />
      <Box
        position="absolute"
        bottom="-100px"
        left="-80px"
        w="400px"
        h="400px"
        bg={
          isDark
            ? "radial-gradient(circle, rgba(45,140,45,0.15) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(0,168,85,0.12) 0%, transparent 70%)"
        }
        filter="blur(80px)"
      />

      {/* Logo */}
      <HStack spacing={2.5} position="relative" zIndex={2} className="fu">
        <Box
          w={10}
          h={10}
          bg={isDark ? "rgba(0,255,136,0.15)" : "rgba(0,168,85,0.15)"}
          borderRadius="xl"
          border={`1px solid ${isDark ? "rgba(0,255,136,0.3)" : "rgba(0,168,85,0.3)"}`}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="xl">🚗</Text>
        </Box>
        <Text
          fontFamily="'Syne', sans-serif"
          fontWeight="800"
          fontSize="xl"
          color={isDark ? "white" : "#0a0f0d"}
        >
          Drive
          <Text as="span" color={gradColor}>
            KE
          </Text>
        </Text>
      </HStack>

      {/* Main content */}
      <VStack align="start" spacing={7} position="relative" zIndex={2}>
        {/* Hero section */}
        <Box>
          <Badge
            bg={isDark ? "rgba(0,255,136,0.15)" : "rgba(0,168,85,0.15)"}
            color={gradColor}
            borderRadius="full"
            px={3}
            py={1}
            fontSize="11px"
            fontWeight="700"
            mb={4}
            border={`1px solid ${isDark ? "rgba(0,255,136,0.3)" : "rgba(0,168,85,0.3)"}`}
          >
            {isLogin ? "👋 Welcome back" : "🚀 Join Kenya's #1 Car Hire"}
          </Badge>
          <Heading
            fontSize={{ lg: "40px", xl: "52px" }}
            color={isDark ? "white" : "#0a0f0d"}
            fontWeight="800"
            lineHeight="1.1"
            letterSpacing="-0.03em"
            mb={3}
          >
            {isLogin ? "Drive your adventure" : "Premium Kenya\nFleet"}
          </Heading>
          <Text
            color={isDark ? "rgba(255,255,255,0.7)" : "rgba(10,15,13,0.65)"}
            fontSize="14px"
            lineHeight="1.7"
            fontWeight="400"
            maxW="360px"
          >
            {isLogin
              ? "Access your bookings, loyalty rewards, and exclusive member perks."
              : "Trusted by 15,000+ drivers. Zero deposits for members. Island-wide delivery available."}
          </Text>
        </Box>

        {/* Car showcase gallery */}
        <Box w="100%" className="fu2">
          <Text
            fontSize="12px"
            fontWeight="700"
            color={tokens.textMuted}
            textTransform="uppercase"
            letterSpacing="0.08em"
            mb={3}
          >
            Featured Fleet
          </Text>

          <Box
            position="relative"
            borderRadius="18px"
            overflow="hidden"
            border={`1.5px solid ${isDark ? "rgba(0,255,136,0.2)" : "rgba(0,168,85,0.15)"}`}
            bg={isDark ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.4)"}
            boxShadow={
              isDark
                ? "0 16px 40px rgba(0,0,0,0.3)"
                : "0 8px 24px rgba(0,0,0,0.08)"
            }
            backdropFilter="blur(10px)"
          >
            {/* Car image */}
            <Box h="240px" bg={isDark ? "#000" : "#f5f5f5"} position="relative">
              <Image
                src={cars[currentCarIndex].image}
                w="100%"
                h="100%"
                objectFit="cover"
                style={{
                  filter: isDark ? "brightness(0.8)" : "brightness(1)",
                }}
              />
              <Box
                position="absolute"
                top={3}
                right={3}
                bg={gradColor}
                color="white"
                px={2.5}
                py={1}
                borderRadius="8px"
                fontSize="11px"
                fontWeight="700"
              >
                {cars[currentCarIndex].badge}
              </Box>
            </Box>

            {/* Car details */}
            <Box
              bg={isDark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.6)"}
              backdropFilter="blur(8px)"
              px={4}
              py={3.5}
              borderTop={`1px solid ${isDark ? "rgba(0,255,136,0.1)" : "rgba(0,168,85,0.1)"}`}
            >
              <HStack justify="space-between" align="center">
                <Box>
                  <Text
                    fontSize="15px"
                    color={isDark ? "white" : "#0a0f0d"}
                    fontWeight="800"
                  >
                    {cars[currentCarIndex].name}
                  </Text>
                  <Text
                    fontSize="12px"
                    color={tokens.textMuted}
                    fontWeight="600"
                  >
                    {cars[currentCarIndex].price}
                  </Text>
                </Box>
                <HStack spacing={1}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Icon
                      key={s}
                      as={FiStar}
                      color="#f6c90e"
                      boxSize={3}
                      fill="#f6c90e"
                    />
                  ))}
                </HStack>
              </HStack>

              {/* Navigation */}
              <HStack spacing={2} mt={3}>
                <Button
                  size="sm"
                  bg={isDark ? "rgba(0,255,136,0.1)" : "rgba(0,168,85,0.1)"}
                  border={`1px solid ${isDark ? "rgba(0,255,136,0.2)" : "rgba(0,168,85,0.2)"}`}
                  color={gradColor}
                  borderRadius="8px"
                  onClick={prevCar}
                  _hover={{
                    bg: isDark ? "rgba(0,255,136,0.2)" : "rgba(0,168,85,0.2)",
                  }}
                >
                  <Icon as={FiChevronLeft} boxSize={4} />
                </Button>
                <HStack spacing={1} flex={1} justify="center">
                  {cars.map((_, idx) => (
                    <Box
                      key={idx}
                      w="6px"
                      h="6px"
                      borderRadius="full"
                      bg={
                        idx === currentCarIndex
                          ? gradColor
                          : isDark
                            ? "rgba(0,255,136,0.2)"
                            : "rgba(0,168,85,0.2)"
                      }
                      cursor="pointer"
                      onClick={() => setCurrentCarIndex(idx)}
                      transition="all .3s ease"
                    />
                  ))}
                </HStack>
                <Button
                  size="sm"
                  bg={isDark ? "rgba(0,255,136,0.1)" : "rgba(0,168,85,0.1)"}
                  border={`1px solid ${isDark ? "rgba(0,255,136,0.2)" : "rgba(0,168,85,0.2)"}`}
                  color={gradColor}
                  borderRadius="8px"
                  onClick={nextCar}
                  _hover={{
                    bg: isDark ? "rgba(0,255,136,0.2)" : "rgba(0,168,85,0.2)",
                  }}
                >
                  <Icon as={FiChevronRight} boxSize={4} />
                </Button>
              </HStack>
            </Box>
          </Box>

          {/* Available counter */}
          <HStack spacing={2} mt={3} justify="space-between">
            <Text fontSize="12px" color={tokens.textMuted} fontWeight="600">
              2,847 VEHICLES AVAILABLE
            </Text>
            <HStack spacing={1} className="pulse">
              <Box w="8px" h="8px" borderRadius="full" bg={gradColor} />
              <Text fontSize="11px" color={gradColor} fontWeight="700">
                Live
              </Text>
            </HStack>
          </HStack>
        </Box>

        {/* Why DriveKE section */}
        <Box w="100%" className="fu3">
          <Text
            fontSize="12px"
            fontWeight="700"
            color={tokens.textMuted}
            textTransform="uppercase"
            letterSpacing="0.08em"
            mb={3}
          >
            Why DriveKE
          </Text>
          <Grid templateColumns="1fr 1fr 1fr" gap={2}>
            {whyDriveKE.map((item, idx) => (
              <Box
                key={idx}
                bg={isDark ? "rgba(0,0,0,0.3)" : item.color}
                border={`1px solid ${isDark ? "rgba(0,255,136,0.1)" : "rgba(0,168,85,0.1)"}`}
                borderRadius="12px"
                p={2.5}
                textAlign="center"
                transition="all .2s ease"
                cursor="pointer"
                _hover={{
                  transform: "translateY(-2px)",
                  borderColor: isDark
                    ? "rgba(0,255,136,0.3)"
                    : "rgba(0,168,85,0.3)",
                }}
              >
                <Text fontSize="24px" mb={1}>
                  {item.icon}
                </Text>
                <Text
                  fontSize="11px"
                  fontWeight="700"
                  color={isDark ? "rgba(255,255,255,0.9)" : "#0a0f0d"}
                >
                  {item.text}
                </Text>
              </Box>
            ))}
          </Grid>
        </Box>

        {/* Feature list */}
        <VStack align="start" spacing={2} w="100%" className="fu4">
          {features.map((f, i) => (
            <HStack key={i} spacing={3} className="feature-card" w="100%">
              <Box
                w="32px"
                h="32px"
                bg={isDark ? "rgba(0,255,136,0.1)" : "rgba(0,168,85,0.1)"}
                borderRadius="50%"
                border={`1px solid ${isDark ? "rgba(0,255,136,0.2)" : "rgba(0,168,85,0.2)"}`}
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
              >
                <Icon as={f.icon} color={gradColor} boxSize={3.5} />
              </Box>
              <Text
                fontSize="13px"
                color={isDark ? "rgba(255,255,255,0.8)" : "rgba(10,15,13,0.75)"}
                fontWeight="600"
                lineHeight="1.5"
              >
                {f.text}
              </Text>
            </HStack>
          ))}
        </VStack>
      </VStack>

      {/* Bottom */}
      <Text
        fontSize="11px"
        color={tokens.textSubtle}
        position="relative"
        zIndex={2}
        fontWeight="600"
      >
        © 2025 DriveKE · Trusted across Kenya
      </Text>
    </Box>
  );
}

// ─── LOGIN FORM ───────────────────────────────────────────────────────────────
function LoginForm({ onSwitch, tokens }: any) {
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  const validate = () => {
    const e: any = {};
    if (!email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email";
    if (!pw) e.pw = "Password is required";
    else if (pw.length < 6) e.pw = "Password must be at least 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onOpen();
    }, 1000);
  };

  return (
    <>
      <VStack spacing={6} align="stretch" className="si">
        {/* Header */}
        <Box mb={1}>
          <Heading
            fontSize={{ base: "28px", md: "32px" }}
            fontWeight="800"
            letterSpacing="-0.03em"
            mb={2}
            color={tokens.textPrimary}
          >
            Welcome back
          </Heading>
          <Text fontSize="14px" color={tokens.textMuted} fontWeight="500">
            Don't have an account?{" "}
            <Text
              as="span"
              color="#00a855"
              fontWeight="700"
              cursor="pointer"
              onClick={onSwitch}
              _hover={{ textDecoration: "underline" }}
            >
              Create one →
            </Text>
          </Text>
        </Box>

        {/* Google button */}
        <Button
          className="btn-google"
          h="56px"
          bg="white"
          border="1.5px solid"
          borderColor="rgba(0, 0, 0, 0.08)"
          borderRadius="14px"
          fontWeight="700"
          fontSize="15px"
          color="#0a0f0d"
          leftIcon={<FcGoogle size={22} />}
          _hover={{ bg: "rgba(0, 0, 0, 0.02)" }}
          _active={{ bg: "rgba(0, 0, 0, 0.04)" }}
        >
          Continue with Google
        </Button>

        {/* Divider */}
        <HStack spacing={3}>
          <Box flex={1} h="1px" bg={tokens.border} className="divider-line" />
          <Text fontSize="12px" color={tokens.textSubtle} fontWeight="600">
            or continue with email
          </Text>
          <Box flex={1} h="1px" bg={tokens.border} className="divider-line" />
        </HStack>

        {/* Email */}
        <FormControl isInvalid={!!errors.email}>
          <FormLabel
            fontSize="12px"
            fontWeight="700"
            color={tokens.textMuted}
            textTransform="uppercase"
            letterSpacing="0.08em"
            mb={2.5}
          >
            Email Address
          </FormLabel>
          <InputGroup>
            <InputLeftElement h="56px" pl={4}>
              <Icon as={FiMail} color={tokens.textSubtle} boxSize={5} />
            </InputLeftElement>
            <Input
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              h="56px"
              bg={tokens.cardBg2}
              border="1.5px solid"
              borderColor={tokens.border}
              borderRadius="12px"
              fontSize="15px"
              color={tokens.textPrimary}
              pl={12}
              _placeholder={{ color: tokens.textSubtle }}
              _focus={{
                outline: "none",
                borderColor: "#00a855",
                boxShadow: "0 0 0 3px rgba(0, 168, 85, 0.08)",
              }}
            />
          </InputGroup>
          <FormErrorMessage fontSize="12px" color="#dc2626" mt={1.5}>
            {errors.email}
          </FormErrorMessage>
        </FormControl>

        {/* Password */}
        <FormControl isInvalid={!!errors.pw}>
          <HStack justify="space-between" mb={2.5} align="center">
            <FormLabel
              fontSize="12px"
              fontWeight="700"
              color={tokens.textMuted}
              textTransform="uppercase"
              letterSpacing="0.08em"
              mb={0}
            >
              Password
            </FormLabel>
            <Text
              fontSize="12px"
              color="#00a855"
              fontWeight="700"
              cursor="pointer"
              _hover={{ textDecoration: "underline" }}
            >
              Forgot?
            </Text>
          </HStack>
          <InputGroup>
            <InputLeftElement h="56px" pl={4}>
              <Icon as={FiLock} color={tokens.textSubtle} boxSize={5} />
            </InputLeftElement>
            <Input
              className="input-field"
              type={showPw ? "text" : "password"}
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="••••••••"
              h="56px"
              bg={tokens.cardBg2}
              border="1.5px solid"
              borderColor={tokens.border}
              borderRadius="12px"
              fontSize="15px"
              color={tokens.textPrimary}
              pl={12}
              _placeholder={{ color: tokens.textSubtle }}
              _focus={{
                outline: "none",
                borderColor: "#00a855",
                boxShadow: "0 0 0 3px rgba(0, 168, 85, 0.08)",
              }}
            />
            <InputRightElement
              h="56px"
              pr={4}
              cursor="pointer"
              onClick={() => setShowPw(!showPw)}
            >
              <Icon
                as={showPw ? FiEyeOff : FiEye}
                color={tokens.textSubtle}
                boxSize={5}
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage fontSize="12px" color="#dc2626" mt={1.5}>
            {errors.pw}
          </FormErrorMessage>
        </FormControl>

        {/* Remember me */}
        <HStack>
          <Checkbox
            size="md"
            colorScheme="green"
            borderColor={tokens.border}
            borderRadius="6px"
          >
            <Text fontSize="13px" color={tokens.textMuted} fontWeight="500">
              Keep me signed in for 30 days
            </Text>
          </Checkbox>
        </HStack>

        {/* Submit button */}
        <Button
          className="btn-main"
          h="56px"
          w="100%"
          bg="#00a855"
          color="white"
          borderRadius="12px"
          fontWeight="800"
          fontSize="15px"
          rightIcon={<Icon as={FiArrowRight} />}
          isLoading={loading}
          loadingText="Signing in…"
          _hover={{ opacity: 0.95 }}
          onClick={handleSubmit}
        >
          Sign In
        </Button>

        {/* Trust badges */}
        <VStack spacing={2.5} w="100%" pt={2}>
          <Box w="100%" h="1px" bg={tokens.border} />
          <HStack justify="space-around" w="100%" spacing={2}>
            {[
              { icon: FiShield, text: "SSL Secured" },
              { icon: FiCheck, text: "No hidden fees" },
              { icon: FiStar, text: "Rated 4.9/5" },
            ].map(({ icon, text }) => (
              <HStack key={text} spacing={1.5} className="trust-badge">
                <Icon as={icon} color="#00a855" boxSize={4} />
                <Text fontSize="12px" color={tokens.textMuted} fontWeight="600">
                  {text}
                </Text>
              </HStack>
            ))}
          </HStack>
        </VStack>
      </VStack>
      <PortalSelector isOpen={isOpen} onClose={onClose} tokens={tokens} />
    </>
  );
}

// ─── SIGNUP FORM ──────────────────────────────────────────────────────────────
function SignupForm({ onSwitch, tokens }: any) {
  const [showPw, setShowPw] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    idType: "",
    agree: false,
  });
  const set = (k: string, v: any) => setForm((p) => ({ ...p, [k]: v }));
  const strength = getStrength(form.password, tokens);

  const validateStep1 = () => {
    const e: any = {};
    if (!form.firstName) e.firstName = "Required";
    if (!form.lastName) e.lastName = "Required";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Valid email required";
    if (!form.phone) e.phone = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: any = {};
    if (!form.password || form.password.length < 8)
      e.password = "Min 8 characters";
    if (form.confirm !== form.password) e.confirm = "Passwords do not match";
    if (!form.agree) e.agree = "Please accept terms";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setErrors({});
      setStep(2);
    }
  };
  const handleSubmit = () => {
    if (!validateStep2()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onOpen();
    }, 1000);
  };

  return (
    <>
      <VStack spacing={5} align="stretch" className="si">
        {/* Header */}
        <Box mb={1}>
          {step === 2 && (
            <HStack
              mb={3}
              cursor="pointer"
              onClick={() => setStep(1)}
              w="fit-content"
              _hover={{ color: "#00a855" }}
              transition="color .2s"
            >
              <Icon as={FiChevronLeft} boxSize={4} color={tokens.textMuted} />
              <Text fontSize="13px" color={tokens.textMuted} fontWeight="600">
                Back
              </Text>
            </HStack>
          )}
          <Heading
            fontSize={{ base: "26px", md: "30px" }}
            fontWeight="800"
            letterSpacing="-0.03em"
            mb={2}
            color={tokens.textPrimary}
          >
            {step === 1 ? "Create account" : "Set password"}
          </Heading>
          <Text fontSize="14px" color={tokens.textMuted} fontWeight="500">
            Already have an account?{" "}
            <Text
              as="span"
              color="#00a855"
              fontWeight="700"
              cursor="pointer"
              onClick={onSwitch}
              _hover={{ textDecoration: "underline" }}
            >
              Sign in →
            </Text>
          </Text>
        </Box>

        {/* Step indicator */}
        <Box>
          <HStack spacing={2} mb={2}>
            {[1, 2].map((s) => (
              <Box
                key={s}
                flex={1}
                h="3px"
                borderRadius="full"
                bg={s <= step ? "#00a855" : tokens.border}
                transition="background .4s ease"
              />
            ))}
          </HStack>
          <Text
            fontSize="11px"
            color={tokens.textSubtle}
            fontWeight="700"
            textTransform="uppercase"
            letterSpacing="0.08em"
          >
            Step {step} of 2
          </Text>
        </Box>

        {step === 1 ? (
          <>
            {/* Google */}
            <Button
              className="btn-google"
              h="56px"
              bg="white"
              border="1.5px solid"
              borderColor="rgba(0, 0, 0, 0.08)"
              borderRadius="12px"
              fontWeight="700"
              fontSize="15px"
              color="#0a0f0d"
              leftIcon={<FcGoogle size={22} />}
              _hover={{ bg: "rgba(0, 0, 0, 0.02)" }}
              _active={{ bg: "rgba(0, 0, 0, 0.04)" }}
            >
              Continue with Google
            </Button>

            <HStack spacing={3}>
              <Box
                flex={1}
                h="1px"
                bg={tokens.border}
                className="divider-line"
              />
              <Text fontSize="11px" color={tokens.textSubtle} fontWeight="600">
                or fill your details
              </Text>
              <Box
                flex={1}
                h="1px"
                bg={tokens.border}
                className="divider-line"
              />
            </HStack>

            {/* Name row */}
            <Grid templateColumns="1fr 1fr" gap={3}>
              <FormControl isInvalid={!!errors.firstName}>
                <FormLabel
                  fontSize="11px"
                  fontWeight="700"
                  color={tokens.textMuted}
                  textTransform="uppercase"
                  letterSpacing="0.08em"
                  mb={2}
                >
                  First Name
                </FormLabel>
                <InputGroup>
                  <InputLeftElement h="50px" pl={4}>
                    <Icon as={FiUser} color={tokens.textSubtle} boxSize={4.5} />
                  </InputLeftElement>
                  <Input
                    className="input-field"
                    h="50px"
                    bg={tokens.cardBg2}
                    border="1.5px solid"
                    borderColor={tokens.border}
                    borderRadius="11px"
                    fontSize="14px"
                    color={tokens.textPrimary}
                    placeholder="James"
                    _placeholder={{ color: tokens.textSubtle }}
                    _focus={{
                      outline: "none",
                      borderColor: "#00a855",
                      boxShadow: "0 0 0 3px rgba(0, 168, 85, 0.08)",
                    }}
                    value={form.firstName}
                    onChange={(e) => set("firstName", e.target.value)}
                  />
                </InputGroup>
                <FormErrorMessage fontSize="11px" color="#dc2626">
                  {errors.firstName}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.lastName}>
                <FormLabel
                  fontSize="11px"
                  fontWeight="700"
                  color={tokens.textMuted}
                  textTransform="uppercase"
                  letterSpacing="0.08em"
                  mb={2}
                >
                  Last Name
                </FormLabel>
                <Input
                  className="input-field"
                  h="50px"
                  bg={tokens.cardBg2}
                  border="1.5px solid"
                  borderColor={tokens.border}
                  borderRadius="11px"
                  fontSize="14px"
                  color={tokens.textPrimary}
                  placeholder="Kariuki"
                  _placeholder={{ color: tokens.textSubtle }}
                  _focus={{
                    outline: "none",
                    borderColor: "#00a855",
                    boxShadow: "0 0 0 3px rgba(0, 168, 85, 0.08)",
                  }}
                  value={form.lastName}
                  onChange={(e) => set("lastName", e.target.value)}
                />
                <FormErrorMessage fontSize="11px" color="#dc2626">
                  {errors.lastName}
                </FormErrorMessage>
              </FormControl>
            </Grid>

            {/* Email */}
            <FormControl isInvalid={!!errors.email}>
              <FormLabel
                fontSize="11px"
                fontWeight="700"
                color={tokens.textMuted}
                textTransform="uppercase"
                letterSpacing="0.08em"
                mb={2}
              >
                Email Address
              </FormLabel>
              <InputGroup>
                <InputLeftElement h="50px" pl={4}>
                  <Icon as={FiMail} color={tokens.textSubtle} boxSize={4.5} />
                </InputLeftElement>
                <Input
                  className="input-field"
                  h="50px"
                  bg={tokens.cardBg2}
                  border="1.5px solid"
                  borderColor={tokens.border}
                  borderRadius="11px"
                  fontSize="14px"
                  color={tokens.textPrimary}
                  placeholder="james@email.com"
                  _placeholder={{ color: tokens.textSubtle }}
                  _focus={{
                    outline: "none",
                    borderColor: "#00a855",
                    boxShadow: "0 0 0 3px rgba(0, 168, 85, 0.08)",
                  }}
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                />
              </InputGroup>
              <FormErrorMessage fontSize="11px" color="#dc2626">
                {errors.email}
              </FormErrorMessage>
            </FormControl>

            {/* Phone */}
            <FormControl isInvalid={!!errors.phone}>
              <FormLabel
                fontSize="11px"
                fontWeight="700"
                color={tokens.textMuted}
                textTransform="uppercase"
                letterSpacing="0.08em"
                mb={2}
              >
                Phone Number
              </FormLabel>
              <InputGroup>
                <InputLeftElement h="50px" pl={4}>
                  <Icon as={FiPhone} color={tokens.textSubtle} boxSize={4.5} />
                </InputLeftElement>
                <Input
                  className="input-field"
                  h="50px"
                  bg={tokens.cardBg2}
                  border="1.5px solid"
                  borderColor={tokens.border}
                  borderRadius="11px"
                  fontSize="14px"
                  color={tokens.textPrimary}
                  placeholder="+254 712 345 678"
                  _placeholder={{ color: tokens.textSubtle }}
                  _focus={{
                    outline: "none",
                    borderColor: "#00a855",
                    boxShadow: "0 0 0 3px rgba(0, 168, 85, 0.08)",
                  }}
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                />
              </InputGroup>
              <FormErrorMessage fontSize="11px" color="#dc2626">
                {errors.phone}
              </FormErrorMessage>
            </FormControl>

            <Button
              className="btn-main"
              h="52px"
              w="100%"
              bg="#00a855"
              color="white"
              borderRadius="11px"
              fontWeight="800"
              fontSize="15px"
              rightIcon={<Icon as={FiArrowRight} />}
              _hover={{ opacity: 0.95 }}
              onClick={handleNext}
            >
              Continue
            </Button>
          </>
        ) : (
          <>
            {/* Password */}
            <FormControl isInvalid={!!errors.password}>
              <FormLabel
                fontSize="11px"
                fontWeight="700"
                color={tokens.textMuted}
                textTransform="uppercase"
                letterSpacing="0.08em"
                mb={2}
              >
                Password
              </FormLabel>
              <InputGroup>
                <InputLeftElement h="50px" pl={4}>
                  <Icon as={FiLock} color={tokens.textSubtle} boxSize={4.5} />
                </InputLeftElement>
                <Input
                  className="input-field"
                  type={showPw ? "text" : "password"}
                  h="50px"
                  bg={tokens.cardBg2}
                  border="1.5px solid"
                  borderColor={tokens.border}
                  borderRadius="11px"
                  fontSize="14px"
                  color={tokens.textPrimary}
                  placeholder="Min. 8 characters"
                  _placeholder={{ color: tokens.textSubtle }}
                  _focus={{
                    outline: "none",
                    borderColor: "#00a855",
                    boxShadow: "0 0 0 3px rgba(0, 168, 85, 0.08)",
                  }}
                  value={form.password}
                  onChange={(e) => set("password", e.target.value)}
                />
                <InputRightElement
                  h="50px"
                  pr={4}
                  cursor="pointer"
                  onClick={() => setShowPw(!showPw)}
                >
                  <Icon
                    as={showPw ? FiEyeOff : FiEye}
                    color={tokens.textSubtle}
                    boxSize={4.5}
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage fontSize="11px" color="#dc2626">
                {errors.password}
              </FormErrorMessage>

              {/* Strength bar */}
              {form.password && (
                <Box mt={2.5}>
                  <HStack mb={1.5} spacing={1}>
                    {[1, 2, 3, 4].map((i) => (
                      <Box
                        key={i}
                        flex={1}
                        h="3px"
                        borderRadius="full"
                        bg={
                          i <= strength.score ? strength.color : tokens.border
                        }
                        className="strength-bar"
                      />
                    ))}
                  </HStack>
                  <Text fontSize="11px" color={strength.color} fontWeight="700">
                    {strength.label} password
                  </Text>
                </Box>
              )}
            </FormControl>

            {/* Confirm */}
            <FormControl isInvalid={!!errors.confirm}>
              <FormLabel
                fontSize="11px"
                fontWeight="700"
                color={tokens.textMuted}
                textTransform="uppercase"
                letterSpacing="0.08em"
                mb={2}
              >
                Confirm Password
              </FormLabel>
              <InputGroup>
                <InputLeftElement h="50px" pl={4}>
                  <Icon as={FiLock} color={tokens.textSubtle} boxSize={4.5} />
                </InputLeftElement>
                <Input
                  className="input-field"
                  type={showConf ? "text" : "password"}
                  h="50px"
                  bg={tokens.cardBg2}
                  border="1.5px solid"
                  borderColor={tokens.border}
                  borderRadius="11px"
                  fontSize="14px"
                  color={tokens.textPrimary}
                  placeholder="Re-enter password"
                  _placeholder={{ color: tokens.textSubtle }}
                  _focus={{
                    outline: "none",
                    borderColor: "#00a855",
                    boxShadow: "0 0 0 3px rgba(0, 168, 85, 0.08)",
                  }}
                  value={form.confirm}
                  onChange={(e) => set("confirm", e.target.value)}
                />
                <InputRightElement
                  h="50px"
                  pr={4}
                  cursor="pointer"
                  onClick={() => setShowConf(!showConf)}
                >
                  <Icon
                    as={showConf ? FiEyeOff : FiEye}
                    color={tokens.textSubtle}
                    boxSize={4.5}
                  />
                </InputRightElement>
              </InputGroup>
              {form.confirm && form.confirm === form.password && (
                <HStack mt={1.5} spacing={1.5}>
                  <Icon as={FiCheck} color="#00a855" boxSize={4} />
                  <Text fontSize="11px" color="#00a855" fontWeight="700">
                    Passwords match
                  </Text>
                </HStack>
              )}
              <FormErrorMessage fontSize="11px" color="#dc2626">
                {errors.confirm}
              </FormErrorMessage>
            </FormControl>

            {/* ID type */}
            <FormControl>
              <FormLabel
                fontSize="11px"
                fontWeight="700"
                color={tokens.textMuted}
                textTransform="uppercase"
                letterSpacing="0.08em"
                mb={2}
              >
                ID / Licence Type
              </FormLabel>
              <Select
                h="50px"
                bg={tokens.cardBg2}
                border="1.5px solid"
                borderColor={tokens.border}
                borderRadius="11px"
                fontSize="14px"
                color={form.idType ? tokens.textPrimary : tokens.textSubtle}
                _focus={{
                  borderColor: "#00a855",
                  outline: "none",
                  boxShadow: "0 0 0 3px rgba(0, 168, 85, 0.08)",
                }}
                onChange={(e) => set("idType", e.target.value)}
              >
                <option value="" disabled selected>
                  Select document type
                </option>
                <option value="national">National ID</option>
                <option value="passport">Passport</option>
                <option value="licence">Driver's Licence</option>
              </Select>
            </FormControl>

            {/* Terms */}
            <FormControl isInvalid={!!errors.agree}>
              <Checkbox
                size="md"
                colorScheme="green"
                borderColor={tokens.border}
                borderRadius="6px"
                isChecked={form.agree}
                onChange={(e) => set("agree", e.target.checked)}
              >
                <Text
                  fontSize="13px"
                  color={tokens.textMuted}
                  lineHeight="1.6"
                  fontWeight="500"
                >
                  I agree to DriveKE's{" "}
                  <Text
                    as="span"
                    color="#00a855"
                    fontWeight="700"
                    cursor="pointer"
                  >
                    Terms
                  </Text>{" "}
                  and{" "}
                  <Text
                    as="span"
                    color="#00a855"
                    fontWeight="700"
                    cursor="pointer"
                  >
                    Privacy Policy
                  </Text>
                </Text>
              </Checkbox>
              <FormErrorMessage fontSize="11px" color="#dc2626">
                {errors.agree}
              </FormErrorMessage>
            </FormControl>

            <Button
              className="btn-main"
              h="52px"
              w="100%"
              bg="#00a855"
              color="white"
              borderRadius="11px"
              fontWeight="800"
              fontSize="15px"
              rightIcon={<Icon as={FiCheck} />}
              isLoading={loading}
              loadingText="Creating account…"
              _hover={{ opacity: 0.95 }}
              onClick={handleSubmit}
            >
              Create Account
            </Button>

            {/* Trust badges */}
            <VStack spacing={2.5} w="100%" pt={2}>
              <Box w="100%" h="1px" bg={tokens.border} />
              <HStack justify="space-around" w="100%" spacing={2}>
                {[
                  { icon: FiShield, text: "Your data safe" },
                  { icon: FiCheck, text: "Free to join" },
                  { icon: FiZap, text: "Instant access" },
                ].map(({ icon, text }) => (
                  <HStack key={text} spacing={1.5} className="trust-badge">
                    <Icon as={icon} color="#00a855" boxSize={4} />
                    <Text
                      fontSize="12px"
                      color={tokens.textMuted}
                      fontWeight="600"
                    >
                      {text}
                    </Text>
                  </HStack>
                ))}
              </HStack>
            </VStack>
          </>
        )}
      </VStack>
      <PortalSelector isOpen={isOpen} onClose={onClose} tokens={tokens} />
    </>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function AuthPage() {
  const tokens = useColorTokens();
  const { colorMode, toggleColorMode } = useColorMode();
  const [mode, setMode] = useState("login");

  return (
    <Box minH="100vh" bg={tokens.pageBg}>
      <Styles />

      {/* Theme Toggle - Top Right (desktop only) */}
      <Box
        position="fixed"
        top={4}
        right={4}
        zIndex={50}
        display={{ base: "none", md: "block" }}
      >
        <Button
          onClick={toggleColorMode}
          variant="ghost"
          size="lg"
          borderRadius="full"
          bg={tokens.cardBg}
          border="1px solid"
          borderColor={tokens.border}
          color="#00a855"
          _hover={{ bg: tokens.cardBg2 }}
        >
          {colorMode === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
        </Button>
      </Box>

      <Grid templateColumns={{ base: "1fr", lg: "520px 1fr" }} minH="100vh">
        {/* Left decorative panel — desktop only */}
        <LeftPanel mode={mode} tokens={tokens} />

        {/* Right form panel */}
        <Flex
          direction="column"
          justify="center"
          align="center"
          bg={tokens.pageBg}
          px={{ base: 6, sm: 8, md: 10, lg: 8, xl: 12 }}
          py={{ base: 6, md: 8, lg: 8 }}
          minH="100vh"
        >
          <Box w="100%" maxW={{ base: "100%", sm: "500px", lg: "460px" }}>
            {/* Mobile theme toggle */}
            <HStack
              justify="flex-end"
              mb={4}
              display={{ base: "flex", md: "none" }}
            >
              <Button
                onClick={toggleColorMode}
                variant="ghost"
                size="sm"
                borderRadius="full"
                bg={tokens.cardBg2}
                border="1px solid"
                borderColor={tokens.border}
                color="#00a855"
                _hover={{ bg: tokens.cardBg }}
              >
                {colorMode === "light" ? (
                  <FiMoon size={18} />
                ) : (
                  <FiSun size={18} />
                )}
              </Button>
            </HStack>

            {/* Mobile tabs */}
            <HStack
              spacing={2}
              bg={tokens.cardBg2}
              p={1.5}
              borderRadius="14px"
              border="1.5px solid"
              borderColor={tokens.border}
              display={{ base: "flex", lg: "none" }}
              mb={4}
            >
              {["login", "signup"].map((m) => (
                <Box
                  key={m}
                  flex={1}
                  textAlign="center"
                  py={2.5}
                  px={2}
                  borderRadius="12px"
                  className="tab-pill"
                  bg={mode === m ? "#00a855" : "transparent"}
                  onClick={() => setMode(m)}
                  transition="all .3s cubic-bezier(.25,.46,.45,.94)"
                >
                  <Text
                    fontSize="13px"
                    fontWeight="800"
                    color={mode === m ? "white" : tokens.textMuted}
                  >
                    {m === "login" ? "Sign In" : "Sign Up"}
                  </Text>
                </Box>
              ))}
            </HStack>

            {/* Form card */}
            <Box
              bg={tokens.cardBg}
              borderRadius={{ base: "20px", md: "24px" }}
              border="1.5px solid"
              borderColor={tokens.border}
              p={{ base: 6, sm: 7, md: 8 }}
              boxShadow={`0 12px 32px ${tokens.pageBg === "#ffffff" ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0.24)"}`}
              position="relative"
              overflow="hidden"
            >
              {/* Subtle background accent */}
              <Box
                position="absolute"
                top={-40}
                right={-40}
                w="200px"
                h="200px"
                bg="radial-gradient(circle, rgba(0, 168, 85, 0.05), transparent 70%)"
                borderRadius="full"
                pointerEvents="none"
              />

              <Box position="relative" zIndex={1}>
                {mode === "login" ? (
                  <LoginForm
                    onSwitch={() => setMode("signup")}
                    tokens={tokens}
                  />
                ) : (
                  <SignupForm
                    onSwitch={() => setMode("login")}
                    tokens={tokens}
                  />
                )}
              </Box>
            </Box>

            {/* Bottom note */}
            <Text
              textAlign="center"
              fontSize="11px"
              color={tokens.textSubtle}
              mt={5}
              px={4}
              lineHeight="1.6"
              fontWeight="500"
            >
              By continuing, you agree to our{" "}
              <Text as="span" color="#00a855" cursor="pointer" fontWeight="700">
                Terms
              </Text>{" "}
              and{" "}
              <Text as="span" color="#00a855" cursor="pointer" fontWeight="700">
                Privacy Policy
              </Text>
              . DriveKE operates across Kenya.
            </Text>
          </Box>
        </Flex>
      </Grid>
    </Box>
  );
}
