"use client";

import { useState } from "react";
import {
  Box,
  Flex,
  Grid,
  Text,
  Heading,
  Button,
  Icon,
  Avatar,
  Badge,
  HStack,
  VStack,
  Progress,
  Tag,
  Circle,
  Container,
  SimpleGrid,
  Image,
  useDisclosure,
  Spacer,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Alert,
  AlertIcon,
  AlertDescription,
  Input,
  Select,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import {
  FiPhone,
  FiMessageSquare,
  FiAlertCircle,
  FiArrowRight,
  FiUser,
  FiEdit,
  FiStar,
  FiMapPin,
  FiCalendar,
  FiActivity,
  FiCreditCard,
  FiTrendingUp,
  FiChevronRight,
  FiCheck,
  FiX,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import { DriveGreenAdCard } from "@/components/DriveGreenAdCard";
import { MobileBottomNav } from "@/components/customer/MobileBottomNav";

// ─── TOKENS ───────────────────────────────────────────────────────────────────
const L = {
  bg: "#f4f7f4",
  card: "#ffffff",
  cardBorder: "rgba(30,110,30,0.1)",
  accent: "#1e6e1e",
  accentLight: "#2d8c2d",
  accentGlow: "rgba(30,110,30,0.08)",
  accentGlow2: "rgba(30,110,30,0.14)",
  accentGlow3: "rgba(30,110,30,0.22)",
  text: "#111a11",
  textSub: "#3a4d3a",
  muted: "#6b7f6b",
  subtle: "#9aaa9a",
  border: "rgba(0,0,0,0.07)",
  borderMid: "rgba(30,110,30,0.15)",
  shadow: "0 1px 12px rgba(0,0,0,0.06)",
  shadowMd: "0 4px 24px rgba(0,0,0,0.09)",
  bg2: "#eef3ee",
  blue: "#1a56a0",
  blueBg: "rgba(26,86,160,0.08)",
  blueBorder: "rgba(26,86,160,0.18)",
  gold: "#b07d0a",
  goldBg: "rgba(176,125,10,0.08)",
  goldBorder: "rgba(176,125,10,0.18)",
  red: "#c0392b",
  redBg: "rgba(192,57,43,0.07)",
  redBorder: "rgba(192,57,43,0.18)",
  orange: "#c05c00",
  orangeBg: "rgba(192,92,0,0.08)",
  orangeBorder: "rgba(192,92,0,0.18)",
  purple: "#6d28d9",
  purpleBg: "rgba(109,40,217,0.08)",
  purpleBorder: "rgba(109,40,217,0.18)",
  teal: "#0e7b7b",
  tealBg: "rgba(14,123,123,0.08)",
  tealBorder: "rgba(14,123,123,0.18)",
};

// ─── STYLES ───────────────────────────────────────────────────────────────────
const Styles = () => (
  <style>{`
    @keyframes fadeUp {
      from { opacity:0; transform:translateY(14px); }
      to   { opacity:1; transform:translateY(0); }
    }
    .fu  { animation: fadeUp .5s ease both; }
    .fu1 { animation: fadeUp .5s .07s ease both; }
    .fu2 { animation: fadeUp .5s .14s ease both; }
    .fu3 { animation: fadeUp .5s .21s ease both; }
    .fu4 { animation: fadeUp .5s .28s ease both; }
    .fu5 { animation: fadeUp .5s .35s ease both; }
    .fu6 { animation: fadeUp .5s .42s ease both; }

    .kpi-card {
      transition: transform .28s cubic-bezier(.22,1,.36,1), box-shadow .28s ease;
    }
    .kpi-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 16px 48px rgba(0,0,0,0.1) !important;
    }

    .fleet-card {
      transition: transform .28s cubic-bezier(.22,1,.36,1), box-shadow .28s ease;
    }
    .fleet-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 16px 48px rgba(0,0,0,0.1) !important;
    }

    .fleet-img { transition: transform .4s ease; }
    .fleet-card:hover .fleet-img { transform: scale(1.04); }

    .booking-row {
      transition: background .15s ease;
    }
    .booking-row:hover { background: ${L.accentGlow} !important; }

    .support-row {
      transition: background .15s ease, transform .15s ease;
      cursor: pointer;
      border-radius: 14px;
    }
    .support-row:hover {
      background: ${L.accentGlow} !important;
      transform: translateX(3px);
    }

    .filter-btn {
      transition: all .2s ease;
      cursor: pointer;
      font-size: 12px;
      font-weight: 700;
      border-radius: 10px;
      padding: 5px 14px;
      border: 1px solid;
    }
    .filter-btn.active {
      background: ${L.accentGlow2};
      color: ${L.accentLight};
      border-color: ${L.borderMid};
    }
    .filter-btn:not(.active) {
      background: ${L.card};
      color: ${L.muted};
      border-color: ${L.border};
    }
    .filter-btn:not(.active):hover {
      background: ${L.accentGlow};
      color: ${L.textSub};
      border-color: ${L.borderMid};
    }

    .active-rental-card {
      transition: box-shadow .3s ease;
    }
    .active-rental-card:hover {
      box-shadow: 0 20px 60px rgba(30,110,30,0.2) !important;
    }

    .progress-track {
      background: rgba(255,255,255,0.2);
      border-radius: 99px;
      overflow: hidden;
      height: 6px;
    }
    .progress-fill {
      height: 100%;
      border-radius: 99px;
      background: linear-gradient(90deg, rgba(168,212,168,0.9), #ffffff);
      transition: width .8s cubic-bezier(.22,1,.36,1);
    }
  `}</style>
);

// ─── FLEET CAR TYPE ───────────────────────────────────────────────────────────
interface FleetCar {
  name: string;
  category: string;
  price: number;
  seats: number;
  fuel: string;
  transmission: string;
  available: boolean;
  rating: number;
  reviews: number;
  img: string;
  badge: string | null;
}

// ─── DEMO DATA ────────────────────────────────────────────────────────────────
const USER = {
  name: "James Kariuki",
  email: "james.k@gmail.com",
  phone: "+254 712 345 678",
  avatar:
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
  memberSince: "March 2022",
  tier: "Gold Member",
  totalRentals: 18,
  loyaltyPoints: 2450,
};

const ACTIVE_BOOKING = {
  car: "Toyota Land Cruiser Prado",
  plate: "KDD 234X",
  img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&h=500&fit=crop",
  pickupDate: "Mar 12, 2025",
  returnDate: "Mar 17, 2025",
  pickupLocation: "Nairobi CBD Office",
  days: 5,
  dailyRate: 8500,
  total: 42500,
  status: "Active",
  ref: "BK-20250312-004",
};

const FLEET: FleetCar[] = [
  {
    name: "Mercedes GLE 450",
    category: "SUV · Luxury",
    price: 12000,
    seats: 5,
    fuel: "Petrol",
    transmission: "Auto",
    available: true,
    rating: 4.9,
    reviews: 34,
    img: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=700&h=440&fit=crop",
    badge: "Popular",
  },
  {
    name: "Toyota Camry 2024",
    category: "Sedan · Business",
    price: 6500,
    seats: 5,
    fuel: "Hybrid",
    transmission: "Auto",
    available: true,
    rating: 4.7,
    reviews: 56,
    img: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=700&h=440&fit=crop",
    badge: "Best Value",
  },
  {
    name: "Range Rover Sport",
    category: "SUV · Premium",
    price: 18000,
    seats: 7,
    fuel: "Diesel",
    transmission: "Auto",
    available: false,
    rating: 5.0,
    reviews: 21,
    img: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=700&h=440&fit=crop",
    badge: "Premium",
  },
  {
    name: "Volkswagen Tiguan",
    category: "SUV · Mid-range",
    price: 7800,
    seats: 5,
    fuel: "Petrol",
    transmission: "Auto",
    available: true,
    rating: 4.6,
    reviews: 43,
    img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=700&h=440&fit=crop",
    badge: null,
  },
];

const PAST_BOOKINGS = [
  {
    ref: "BK-20250201",
    car: "Toyota Camry",
    dates: "Feb 1–5, 2025",
    total: "KSh 32,500",
    status: "Completed",
  },
  {
    ref: "BK-20250112",
    car: "Nissan X-Trail",
    dates: "Jan 12–15, 2025",
    total: "KSh 24,000",
    status: "Completed",
  },
  {
    ref: "BK-20241205",
    car: "Mercedes C200",
    dates: "Dec 5–8, 2024",
    total: "KSh 36,000",
    status: "Completed",
  },
];

// ─── REUSABLE CARD ────────────────────────────────────────────────────────────
function Card({
  children,
  p = "6",
  className = "",
  noPad = false,
  ...rest
}: any) {
  return (
    <Box
      bg={L.card}
      borderRadius="20px"
      border="1px solid"
      borderColor={L.cardBorder}
      boxShadow={L.shadow}
      p={noPad ? 0 : { base: 4, md: p }}
      position="relative"
      overflow="hidden"
      className={className}
      {...rest}
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        w="56px"
        h="56px"
        bg={`radial-gradient(circle at top left, ${L.accentGlow2}, transparent 70%)`}
        pointerEvents="none"
        zIndex={0}
      />
      <Box position="relative" zIndex={1}>
        {children}
      </Box>
    </Box>
  );
}

// ─── KPI CARD ─────────────────────────────────────────────────────────────────
function KpiCard({
  label,
  value,
  note,
  icon,
  accent,
  accentBg,
}: {
  label: string;
  value: string;
  note: string;
  icon: React.ElementType;
  accent: string;
  accentBg: string;
}) {
  return (
    <Card className="kpi-card" p="5">
      <Flex justify="space-between" align="center" mb={4}>
        <Text
          fontSize="11px"
          fontWeight="700"
          color={L.muted}
          textTransform="uppercase"
          letterSpacing=".08em"
        >
          {label}
        </Text>
        <Circle size="36px" bg={accentBg}>
          <Icon as={icon} boxSize={4} color={accent} />
        </Circle>
      </Flex>
      <Text
        fontSize={{ base: "20px", md: "24px" }}
        fontWeight="800"
        color={L.text}
        letterSpacing="-0.03em"
        lineHeight="1"
        mb={1}
      >
        {value}
      </Text>
      <Text fontSize="11px" color={L.subtle}>
        {note}
      </Text>
      <Box
        mt={3.5}
        h="2px"
        bg={L.accentGlow}
        borderRadius="full"
        overflow="hidden"
      >
        <Box
          h="100%"
          borderRadius="full"
          bg={accent}
          style={{ width: "55%", opacity: 0.4 }}
        />
      </Box>
    </Card>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function CustomerDashboard() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCar, setSelectedCar] = useState<FleetCar | null>(null);
  const [filter, setFilter] = useState("All");
  const [showAlert, setShowAlert] = useState(true);

  const categories = ["All", "SUV", "Sedan", "Luxury"];
  const filtered =
    filter === "All" ? FLEET : FLEET.filter((c) => c.category.includes(filter));
  const pct = Math.round((USER.loyaltyPoints / 3000) * 100);

  const handleBook = (car: FleetCar) => {
    setSelectedCar(car);
    onOpen();
  };

  const stats = [
    {
      label: "Active Rentals",
      value: "1",
      note: "Ends Mar 17",
      icon: FiActivity,
      accent: L.accentLight,
      accentBg: L.accentGlow2,
    },
    {
      label: "Total Spent",
      value: "KSh 134,500",
      note: "This year",
      icon: FiCreditCard,
      accent: L.blue,
      accentBg: L.blueBg,
    },
    {
      label: "Loyalty Points",
      value: "2,450",
      note: "≈ 1 free day",
      icon: FiStar,
      accent: L.gold,
      accentBg: L.goldBg,
    },
    {
      label: "Upcoming Booking",
      value: "None",
      note: "Book below",
      icon: FiCalendar,
      accent: L.orange,
      accentBg: L.orangeBg,
    },
  ];

  return (
    <>
      <Styles />
      <Box minH="100vh" bg={L.bg} pb={{ base: "80px", md: "0" }}>
        {/* ── ALERT ─────────────────────────────────────────────────────── */}
        {showAlert && (
          <Box px={{ base: 4, lg: 6 }} pt={4}>
            <Box
              maxW="1400px"
              mx="auto"
              px={4}
              py={3}
              bg={L.card}
              borderRadius="14px"
              border="1px solid"
              borderColor={L.goldBorder}
              boxShadow={L.shadow}
            >
              <HStack spacing={3} justify="space-between">
                <HStack spacing={3} flex={1}>
                  <Circle size="30px" bg={L.goldBg} flexShrink={0}>
                    <Icon as={FiAlertCircle} boxSize={3.5} color={L.gold} />
                  </Circle>
                  <Text fontSize="13px" color={L.textSub}>
                    <Text as="span" fontWeight="700" color={L.gold}>
                      Upcoming:{" "}
                    </Text>
                    Scheduled maintenance on your active rental — drop vehicle
                    at any branch on Mar 16 for complimentary service check.
                  </Text>
                </HStack>
                <Button
                  size="sm"
                  variant="ghost"
                  color={L.muted}
                  _hover={{ bg: L.accentGlow, color: L.text }}
                  flexShrink={0}
                  p={1}
                  minW="auto"
                  h="auto"
                  onClick={() => setShowAlert(false)}
                >
                  <Icon as={FiX} boxSize={5} />
                </Button>
              </HStack>
            </Box>
          </Box>
        )}

        <Container maxW="1400px" px={{ base: 4, lg: 6 }} py={6}>
          <VStack spacing={7} align="stretch">
            {/* ── HERO (UNCHANGED) ──────────────────────────────────────── */}
            <Box
              position="relative"
              overflow="hidden"
              minH={{ base: "320px", md: "380px" }}
              bg="linear-gradient(135deg, #0F1419 0%, #1A1F2E 50%, #0F1419 100%)"
              borderRadius={{ base: 0, lg: "3xl" }}
              mx={{ base: -4, lg: 0 }}
              px={{ base: 6, md: 14 }}
              py={{ base: 10, md: 14 }}
            >
              <Box
                position="absolute"
                inset={0}
                bgImage="url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1600&h=600&fit=crop')"
                bgSize="cover"
                bgPosition="center"
                _after={{
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(105deg, rgba(13,56,13,0.92) 0%, rgba(13,56,13,0.7) 50%, rgba(13,56,13,0.3) 100%)",
                }}
              />
              <Circle
                size="300px"
                bg="whiteAlpha.50"
                position="absolute"
                top={-80}
                right={-60}
              />
              <Circle
                size="180px"
                bg="whiteAlpha.50"
                position="absolute"
                bottom={-60}
                right="200px"
              />
              <Box position="relative" zIndex={1}>
                <HStack mb={3}>
                  <Badge
                    bg="whiteAlpha.200"
                    color="white"
                    borderRadius="full"
                    px={3}
                    py={1}
                    fontSize="xs"
                    fontWeight="600"
                    backdropFilter="blur(8px)"
                    border="1px solid whiteAlpha.300"
                  >
                    ⭐ {USER.tier}
                  </Badge>
                  <Badge
                    bg="teal.500"
                    color="white"
                    borderRadius="full"
                    px={3}
                    py={1}
                    fontSize="xs"
                  >
                    {USER.loyaltyPoints.toLocaleString()} pts
                  </Badge>
                </HStack>
                <Heading
                  color="white"
                  fontSize={{ base: "2xl", md: "4xl" }}
                  fontWeight="800"
                  lineHeight="1.15"
                  maxW="560px"
                  mb={3}
                >
                  Welcome back,
                  <br />
                  <Text as="span" color="green.300">
                    {USER.name.split(" ")[0]}.
                  </Text>{" "}
                  Ready to roll?
                </Heading>
                <Text
                  color="whiteAlpha.800"
                  fontSize={{ base: "sm", md: "md" }}
                  maxW="440px"
                  mb={7}
                  fontWeight="300"
                >
                  You have 1 active rental and{" "}
                  {USER.loyaltyPoints.toLocaleString()} loyalty points. Your
                  Gold status gives you priority booking and free upgrades.
                </Text>
                <HStack spacing={{ base: 2, md: 3 }} flexWrap="nowrap">
                  <Button
                    bg="white"
                    color="teal.800"
                    size={{ base: "sm", md: "md" }}
                    borderRadius="xl"
                    fontWeight="700"
                    _hover={{ bg: "green.50", transform: "translateY(-2px)" }}
                    transition="all 0.2s"
                    onClick={() => router.push("/customer/fleet")}
                  >
                    🚗 Book a Car
                  </Button>
                  <Button
                    variant="outline"
                    borderColor="whiteAlpha.600"
                    color="white"
                    size={{ base: "sm", md: "md" }}
                    borderRadius="xl"
                    fontWeight="600"
                    backdropFilter="blur(8px)"
                    _hover={{ bg: "whiteAlpha.200" }}
                    transition="all 0.2s"
                  >
                    View Active Rental →
                  </Button>
                </HStack>
              </Box>
            </Box>

            {/* ── STATS ─────────────────────────────────────────────────── */}
            <SimpleGrid columns={{ base: 2, lg: 4 }} spacing={4}>
              {stats.map((s, i) => (
                <Box key={s.label} className={`fu${i}`}>
                  <KpiCard {...s} />
                </Box>
              ))}
            </SimpleGrid>

            {/* ── DRIVE GREEN AD CARD ───────────────────────────────────── */}
            <Box className="fu4">
              <DriveGreenAdCard discount="10%" promoCode="DRIVE10" />
            </Box>

            {/* ── FLEET + SIDEBAR ───────────────────────────────────────── */}
            <Grid templateColumns={{ base: "1fr", xl: "1fr 320px" }} gap={6}>
              <VStack spacing={6} align="stretch">
                {/* Fleet */}
                <Box className="fu5">
                  <Flex
                    align="center"
                    justify="space-between"
                    mb={5}
                    flexWrap="wrap"
                    gap={3}
                  >
                    <Box>
                      <Text fontSize="15px" fontWeight="800" color={L.text}>
                        Available Fleet
                      </Text>
                      <Text fontSize="12px" color={L.muted} mt={0.5}>
                        Hand-picked vehicles ready for your next trip
                      </Text>
                    </Box>
                    <HStack spacing={1.5}>
                      {categories.map((c) => (
                        <Box
                          key={c}
                          className={`filter-btn${filter === c ? " active" : ""}`}
                          onClick={() => setFilter(c)}
                          style={{ cursor: "pointer" }}
                        >
                          {c}
                        </Box>
                      ))}
                    </HStack>
                  </Flex>

                  <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing={4}>
                    {filtered.map((car) => (
                      <Box
                        key={car.name}
                        className="fleet-card"
                        bg={L.card}
                        borderRadius="20px"
                        border="1px solid"
                        borderColor={car.available ? L.cardBorder : L.border}
                        boxShadow={L.shadow}
                        overflow="hidden"
                        opacity={car.available ? 1 : 0.72}
                      >
                        {/* image */}
                        <Box
                          overflow="hidden"
                          h={{ base: "200px", md: "170px" }}
                          position="relative"
                        >
                          <Image
                            src={car.img}
                            w="100%"
                            h="100%"
                            objectFit="cover"
                            className="fleet-img"
                          />

                          {/* badge */}
                          {car.badge && (
                            <Box
                              position="absolute"
                              top={3}
                              left={3}
                              px={2.5}
                              py={1}
                              borderRadius="8px"
                              bg={L.accentGlow3}
                              border="1px solid"
                              borderColor={L.borderMid}
                              backdropFilter="blur(6px)"
                            >
                              <Text
                                fontSize="10px"
                                fontWeight="700"
                                color={L.accentLight}
                                letterSpacing=".04em"
                              >
                                {car.badge}
                              </Text>
                            </Box>
                          )}

                          {/* unavailable overlay */}
                          {!car.available && (
                            <Box
                              position="absolute"
                              inset={0}
                              bg="rgba(244,247,244,0.6)"
                              backdropFilter="blur(2px)"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Box
                                px={3}
                                py={1.5}
                                bg={L.card}
                                borderRadius="10px"
                                border="1px solid"
                                borderColor={L.border}
                                boxShadow={L.shadow}
                              >
                                <Text
                                  fontSize="11px"
                                  fontWeight="700"
                                  color={L.muted}
                                >
                                  Unavailable
                                </Text>
                              </Box>
                            </Box>
                          )}
                        </Box>

                        {/* body */}
                        <Box p={4}>
                          {/* corner accent */}
                          <Box
                            position="absolute"
                            top={0}
                            left={0}
                            w="50px"
                            h="50px"
                            bg={`radial-gradient(circle at top left, ${L.accentGlow}, transparent 70%)`}
                            pointerEvents="none"
                          />

                          <Text
                            fontWeight="800"
                            fontSize="14px"
                            color={L.text}
                            mb={0.5}
                          >
                            {car.name}
                          </Text>
                          <Text fontSize="11px" color={L.muted} mb={3}>
                            {car.category}
                          </Text>

                          {/* specs */}
                          <HStack spacing={1.5} mb={4} flexWrap="wrap">
                            {[
                              `${car.seats} seats`,
                              car.fuel,
                              car.transmission,
                            ].map((f) => (
                              <Box
                                key={f}
                                px={2}
                                py={0.5}
                                bg={L.accentGlow}
                                borderRadius="6px"
                                border="1px solid"
                                borderColor={L.border}
                              >
                                <Text
                                  fontSize="10px"
                                  fontWeight="600"
                                  color={L.textSub}
                                >
                                  {f}
                                </Text>
                              </Box>
                            ))}
                          </HStack>

                          <Flex justify="space-between" align="flex-end">
                            <Box>
                              <Text fontSize="10px" color={L.subtle} mb={0.5}>
                                From
                              </Text>
                              <Text
                                fontWeight="800"
                                fontSize="16px"
                                color={L.accentLight}
                                letterSpacing="-0.02em"
                              >
                                KSh {car.price.toLocaleString()}
                              </Text>
                              <Text fontSize="10px" color={L.subtle}>
                                per day
                              </Text>
                            </Box>
                            <VStack spacing={1.5} align="flex-end">
                              <HStack
                                spacing={1}
                                px={2}
                                py={0.5}
                                bg={L.goldBg}
                                borderRadius="6px"
                                border="1px solid"
                                borderColor={L.goldBorder}
                              >
                                <Icon
                                  as={FiStar}
                                  boxSize="10px"
                                  color={L.gold}
                                />
                                <Text
                                  fontSize="10px"
                                  fontWeight="700"
                                  color={L.gold}
                                >
                                  {car.rating}
                                </Text>
                                <Text fontSize="10px" color={L.subtle}>
                                  ({car.reviews})
                                </Text>
                              </HStack>
                              <Button
                                size="sm"
                                h="32px"
                                px={4}
                                bg={car.available ? L.accentGlow2 : L.border}
                                color={car.available ? L.accentLight : L.muted}
                                borderRadius="10px"
                                fontSize="11px"
                                fontWeight="700"
                                border="1px solid"
                                borderColor={
                                  car.available ? L.borderMid : L.border
                                }
                                isDisabled={!car.available}
                                _hover={{ bg: L.accentGlow3 }}
                                onClick={() => handleBook(car)}
                              >
                                Book Now
                              </Button>
                            </VStack>
                          </Flex>
                        </Box>
                      </Box>
                    ))}
                  </SimpleGrid>
                </Box>

                {/* Recent Bookings */}
                <Box className="fu6">
                  <Card noPad overflow="hidden">
                    <Flex
                      px={{ base: 5, md: 7 }}
                      py={5}
                      align="center"
                      justify="space-between"
                      borderBottom="1px solid"
                      borderColor={L.border}
                    >
                      <Box>
                        <Text fontSize="15px" fontWeight="800" color={L.text}>
                          Recent Bookings
                        </Text>
                        <Text fontSize="12px" color={L.muted} mt={0.5}>
                          Your last {PAST_BOOKINGS.length} trips
                        </Text>
                      </Box>
                      <Box
                        px={3}
                        py={1.5}
                        bg={L.accentGlow2}
                        borderRadius="10px"
                        border="1px solid"
                        borderColor={L.borderMid}
                        cursor="pointer"
                      >
                        <Text
                          fontSize="11px"
                          fontWeight="700"
                          color={L.accentLight}
                        >
                          View All →
                        </Text>
                      </Box>
                    </Flex>

                    <Box overflowX="auto">
                      <Table variant="unstyled" size="sm">
                        <Thead>
                          <Tr bg={L.bg}>
                            {["Ref", "Vehicle", "Dates", "Total", "Status"].map(
                              (h) => (
                                <Th
                                  key={h}
                                  py={3}
                                  px={{ base: 4, md: 6 }}
                                  fontSize="10px"
                                  fontWeight="700"
                                  color={L.muted}
                                  textTransform="uppercase"
                                  letterSpacing=".1em"
                                  borderBottom="1px solid"
                                  borderColor={L.border}
                                >
                                  {h}
                                </Th>
                              ),
                            )}
                          </Tr>
                        </Thead>
                        <Tbody>
                          {PAST_BOOKINGS.map((b) => (
                            <Tr
                              key={b.ref}
                              className="booking-row"
                              borderBottom="1px solid"
                              borderColor={L.border}
                            >
                              <Td
                                py={4}
                                px={{ base: 4, md: 6 }}
                                borderColor="transparent"
                              >
                                <Text
                                  fontSize="11px"
                                  fontWeight="700"
                                  color={L.accentLight}
                                  fontFamily="monospace"
                                >
                                  {b.ref}
                                </Text>
                              </Td>
                              <Td
                                py={4}
                                px={{ base: 4, md: 6 }}
                                borderColor="transparent"
                              >
                                <Text
                                  fontSize="13px"
                                  fontWeight="700"
                                  color={L.text}
                                >
                                  {b.car}
                                </Text>
                              </Td>
                              <Td
                                py={4}
                                px={{ base: 4, md: 6 }}
                                borderColor="transparent"
                                display={{ base: "none", md: "table-cell" }}
                              >
                                <Text fontSize="12px" color={L.muted}>
                                  {b.dates}
                                </Text>
                              </Td>
                              <Td
                                py={4}
                                px={{ base: 4, md: 6 }}
                                borderColor="transparent"
                              >
                                <Text
                                  fontSize="13px"
                                  fontWeight="800"
                                  color={L.orange}
                                >
                                  {b.total}
                                </Text>
                              </Td>
                              <Td
                                py={4}
                                px={{ base: 4, md: 6 }}
                                borderColor="transparent"
                              >
                                <Box
                                  px={2.5}
                                  py={1}
                                  bg={L.accentGlow2}
                                  borderRadius="8px"
                                  border="1px solid"
                                  borderColor={L.borderMid}
                                  display="inline-flex"
                                  alignItems="center"
                                  gap={1.5}
                                >
                                  <Icon
                                    as={FiCheck}
                                    boxSize="9px"
                                    color={L.accentLight}
                                  />
                                  <Text
                                    fontSize="10px"
                                    fontWeight="700"
                                    color={L.accentLight}
                                  >
                                    {b.status}
                                  </Text>
                                </Box>
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </Box>
                  </Card>
                </Box>
              </VStack>

              {/* ── SIDEBAR ─────────────────────────────────────────────── */}
              <VStack
                spacing={5}
                align="stretch"
                display={{ base: "none", xl: "flex" }}
              >
                {/* Loyalty */}
                <Box
                  borderRadius="20px"
                  overflow="hidden"
                  boxShadow="0 8px 32px rgba(30,110,30,0.18)"
                  border="1px solid"
                  borderColor={L.borderMid}
                >
                  <Box
                    bg="linear-gradient(135deg, #154a15 0%, #2d7d2d 60%, #4a9e4a 100%)"
                    p={6}
                    color="white"
                  >
                    <Flex justify="space-between" align="flex-start" mb={4}>
                      <Box>
                        <Text
                          fontSize="10px"
                          color="rgba(255,255,255,0.65)"
                          fontWeight="700"
                          textTransform="uppercase"
                          letterSpacing=".1em"
                          mb={1}
                        >
                          Loyalty Program
                        </Text>
                        <Text fontSize="16px" fontWeight="800">
                          ⭐ {USER.tier}
                        </Text>
                      </Box>
                      <Circle
                        size="48px"
                        bg="rgba(255,255,255,0.15)"
                        border="1px solid rgba(255,255,255,0.2)"
                      >
                        <Text fontSize="22px">🏆</Text>
                      </Circle>
                    </Flex>

                    <Text
                      fontSize="32px"
                      fontWeight="800"
                      lineHeight="1"
                      mb={0.5}
                    >
                      {USER.loyaltyPoints.toLocaleString()}
                    </Text>
                    <Text fontSize="12px" color="rgba(255,255,255,0.65)" mb={4}>
                      points · Next tier at 3,000
                    </Text>

                    {/* custom progress */}
                    <Box className="progress-track">
                      <Box
                        className="progress-fill"
                        style={{ width: `${pct}%` }}
                      />
                    </Box>
                    <Flex justify="space-between" mt={2}>
                      <Text fontSize="10px" color="rgba(255,255,255,0.55)">
                        Gold
                      </Text>
                      <Text fontSize="10px" color="rgba(255,255,255,0.55)">
                        {pct}% to Platinum
                      </Text>
                    </Flex>
                  </Box>

                  {/* redeemable row */}
                  <Box
                    bg={L.card}
                    px={5}
                    py={4}
                    borderTop="1px solid"
                    borderColor={L.borderMid}
                  >
                    <Flex align="center" gap={3}>
                      <Circle
                        size="32px"
                        bg={L.goldBg}
                        border="1px solid"
                        borderColor={L.goldBorder}
                      >
                        <Icon as={FiStar} boxSize={3.5} color={L.gold} />
                      </Circle>
                      <Box flex={1}>
                        <Text fontSize="12px" fontWeight="700" color={L.text}>
                          Redeem Points
                        </Text>
                        <Text fontSize="10px" color={L.muted}>
                          2,450 pts ≈ 1 free day rental
                        </Text>
                      </Box>
                      <Icon as={FiChevronRight} boxSize={4} color={L.subtle} />
                    </Flex>
                  </Box>
                </Box>

                {/* Support */}
                <Card p="5">
                  <Text fontWeight="800" fontSize="14px" color={L.text} mb={4}>
                    Need Help?
                  </Text>
                  <VStack spacing={1.5} align="stretch">
                    {[
                      {
                        icon: FiPhone,
                        label: "Call Support",
                        sub: "+254 800 123 456",
                        accent: L.accentLight,
                        bg: L.accentGlow2,
                      },
                      {
                        icon: FiMessageSquare,
                        label: "Live Chat",
                        sub: "Avg. 2 min response",
                        accent: L.blue,
                        bg: L.blueBg,
                      },
                      {
                        icon: FiAlertCircle,
                        label: "Roadside Assist",
                        sub: "24/7 emergency line",
                        accent: L.red,
                        bg: L.redBg,
                      },
                    ].map((s) => (
                      <Flex
                        key={s.label}
                        className="support-row"
                        align="center"
                        p={3}
                        gap={3}
                      >
                        <Circle
                          size="34px"
                          bg={s.bg}
                          border="1px solid"
                          borderColor={`${s.accent}22`}
                          flexShrink={0}
                        >
                          <Icon as={s.icon} boxSize={3.5} color={s.accent} />
                        </Circle>
                        <Box flex={1}>
                          <Text fontSize="13px" fontWeight="700" color={L.text}>
                            {s.label}
                          </Text>
                          <Text fontSize="11px" color={L.muted}>
                            {s.sub}
                          </Text>
                        </Box>
                        <Icon
                          as={FiChevronRight}
                          boxSize={3.5}
                          color={L.subtle}
                        />
                      </Flex>
                    ))}
                  </VStack>
                </Card>

                {/* Profile */}
                <Card p="5">
                  <HStack spacing={3} mb={4}>
                    <Avatar size="md" src={USER.avatar} name={USER.name} />
                    <Box>
                      <Text fontWeight="800" fontSize="14px" color={L.text}>
                        {USER.name}
                      </Text>
                      <Text fontSize="11px" color={L.muted}>
                        {USER.email}
                      </Text>
                    </Box>
                  </HStack>

                  <Box h="1px" bg={L.border} mb={4} />

                  <VStack spacing={2.5} align="stretch" mb={4}>
                    {[
                      { l: "Member Since", v: USER.memberSince },
                      { l: "Phone", v: USER.phone },
                      { l: "Total Rentals", v: `${USER.totalRentals} trips` },
                    ].map((r) => (
                      <Flex key={r.l} justify="space-between" align="center">
                        <Text fontSize="11px" color={L.muted}>
                          {r.l}
                        </Text>
                        <Text
                          fontSize="12px"
                          fontWeight="700"
                          color={L.textSub}
                        >
                          {r.v}
                        </Text>
                      </Flex>
                    ))}
                  </VStack>

                  <Button
                    w="100%"
                    h="36px"
                    fontSize="12px"
                    fontWeight="700"
                    bg={L.accentGlow2}
                    color={L.accentLight}
                    borderRadius="12px"
                    border="1px solid"
                    borderColor={L.borderMid}
                    leftIcon={<Icon as={FiEdit} boxSize={3.5} />}
                    _hover={{ bg: L.accentGlow3 }}
                    transition="all .2s"
                  >
                    Edit Profile
                  </Button>
                </Card>
              </VStack>
            </Grid>
          </VStack>
        </Container>

        {/* ── BOOKING MODAL ─────────────────────────────────────────────── */}
        <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
          <ModalOverlay bg="rgba(17,26,17,0.55)" backdropFilter="blur(4px)" />
          <ModalContent
            bg={L.card}
            borderRadius="24px"
            border="1px solid"
            borderColor={L.cardBorder}
            boxShadow="0 32px 80px rgba(0,0,0,0.18)"
            mx={4}
            overflow="hidden"
          >
            {/* green top bar */}
            <Box
              h="4px"
              bg="linear-gradient(90deg, #1e6e1e, #2d8c2d, #52b852)"
            />

            <Box px={7} pt={6} pb={3}>
              <ModalCloseButton
                top={5}
                right={5}
                color={L.muted}
                _hover={{ bg: L.accentGlow, color: L.text }}
                borderRadius="10px"
              />
              <HStack spacing={3} mb={1}>
                <Circle
                  size="36px"
                  bg={L.accentGlow2}
                  border="1px solid"
                  borderColor={L.borderMid}
                >
                  <Icon as={FiCalendar} boxSize={4} color={L.accentLight} />
                </Circle>
                <Box>
                  <Text
                    fontSize="10px"
                    fontWeight="700"
                    color={L.muted}
                    textTransform="uppercase"
                    letterSpacing=".1em"
                  >
                    Booking Request
                  </Text>
                  <Text fontSize="16px" fontWeight="800" color={L.text}>
                    {selectedCar?.name || "Select Vehicle"}
                  </Text>
                </Box>
              </HStack>
            </Box>

            <ModalBody px={7} pb={7} pt={2}>
              <VStack spacing={4}>
                <Grid templateColumns="1fr 1fr" gap={4} w="100%">
                  {[
                    { label: "Pick-up Date", type: "date" },
                    { label: "Return Date", type: "date" },
                  ].map((f) => (
                    <FormControl key={f.label}>
                      <FormLabel
                        fontSize="11px"
                        fontWeight="700"
                        color={L.muted}
                        textTransform="uppercase"
                        letterSpacing=".08em"
                        mb={1.5}
                      >
                        {f.label}
                      </FormLabel>
                      <Input
                        type={f.type}
                        h="42px"
                        fontSize="13px"
                        bg={L.bg}
                        border="1px solid"
                        borderColor={L.border}
                        borderRadius="12px"
                        color={L.text}
                        _focus={{
                          borderColor: L.borderMid,
                          boxShadow: `0 0 0 3px ${L.accentGlow2}`,
                        }}
                      />
                    </FormControl>
                  ))}
                </Grid>

                <FormControl>
                  <FormLabel
                    fontSize="11px"
                    fontWeight="700"
                    color={L.muted}
                    textTransform="uppercase"
                    letterSpacing=".08em"
                    mb={1.5}
                  >
                    Pick-up Location
                  </FormLabel>
                  <Select
                    h="42px"
                    fontSize="13px"
                    fontWeight="600"
                    bg={L.bg}
                    border="1px solid"
                    borderColor={L.border}
                    borderRadius="12px"
                    color={L.text}
                    _focus={{
                      borderColor: L.borderMid,
                      boxShadow: `0 0 0 3px ${L.accentGlow2}`,
                    }}
                  >
                    <option>Nairobi CBD Office</option>
                    <option>JKIA Airport</option>
                    <option>Westlands Branch</option>
                    <option>Karen Branch</option>
                  </Select>
                </FormControl>

                {/* member benefit notice */}
                <Box
                  w="100%"
                  p={4}
                  bg={L.accentGlow}
                  borderRadius="14px"
                  border="1px solid"
                  borderColor={L.borderMid}
                >
                  <HStack spacing={3}>
                    <Circle
                      size="30px"
                      bg={L.accentGlow2}
                      border="1px solid"
                      borderColor={L.borderMid}
                      flexShrink={0}
                    >
                      <Icon as={FiStar} boxSize={3.5} color={L.accentLight} />
                    </Circle>
                    <Text fontSize="12px" color={L.textSub}>
                      <Text as="span" fontWeight="700" color={L.accentLight}>
                        Gold Member:{" "}
                      </Text>
                      Free airport pickup and priority processing on every
                      booking.
                    </Text>
                  </HStack>
                </Box>

                <Button
                  w="100%"
                  h="46px"
                  fontWeight="800"
                  fontSize="14px"
                  borderRadius="14px"
                  color="white"
                  bg="linear-gradient(135deg, #1e6e1e, #2d8c2d)"
                  boxShadow="0 4px 16px rgba(30,110,30,0.3)"
                  rightIcon={<Icon as={FiArrowRight} boxSize={4} />}
                  _hover={{
                    boxShadow: "0 8px 24px rgba(30,110,30,0.35)",
                    transform: "translateY(-1px)",
                  }}
                  transition="all .2s"
                  onClick={onClose}
                >
                  Confirm Booking
                </Button>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>

      <MobileBottomNav />
    </>
  );
}
