"use client";

import React, { useState, useMemo } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Button,
  Badge,
  Input,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
  FormControl,
  FormLabel,
  Flex,
  Circle,
  Checkbox,
} from "@chakra-ui/react";
import {
  FiSearch,
  FiMoreVertical,
  FiEdit,
  FiX,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiUsers,
  FiCalendar,
  FiFilter,
  FiArrowUp,
  FiArrowDown,
  FiActivity,
  FiTrendingUp,
} from "react-icons/fi";
import { useBusinessContext, Booking } from "@/context/BusinessContext";

// ─── TOKENS (identical to FinancialDashboard) ────────────────────────────────
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

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
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

    .kpi-card {
      transition: transform .28s cubic-bezier(.22,1,.36,1), box-shadow .28s ease;
    }
    .kpi-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 16px 48px rgba(0,0,0,0.1) !important;
    }

    .booking-row {
      transition: background .15s ease, transform .15s ease;
    }
    .booking-row:hover {
      background: ${L.accentGlow} !important;
    }

    .filter-input::placeholder { color: ${L.subtle}; }
    .filter-input:focus {
      border-color: ${L.borderMid} !important;
      box-shadow: 0 0 0 3px ${L.accentGlow2} !important;
    }

    .filter-select:focus {
      border-color: ${L.borderMid} !important;
      box-shadow: 0 0 0 3px ${L.accentGlow2} !important;
    }

    .action-menu-btn {
      transition: background .15s ease !important;
      border-radius: 8px !important;
    }
    .action-menu-btn:hover {
      background: ${L.accentGlow2} !important;
    }

    .bulk-cancel-btn {
      transition: all .2s ease !important;
    }
    .bulk-cancel-btn:hover {
      transform: translateY(-1px) !important;
      box-shadow: 0 6px 20px rgba(192,57,43,0.2) !important;
    }

    .status-badge {
      font-size: 11px !important;
      font-weight: 700 !important;
      letter-spacing: .04em !important;
      border-radius: 8px !important;
      padding: 3px 9px !important;
    }

    .progress-track {
      background: ${L.accentGlow};
      border-radius: 99px;
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      border-radius: 99px;
      transition: width .8s cubic-bezier(.22,1,.36,1);
    }

    .modal-overlay-custom {
      backdrop-filter: blur(4px) !important;
    }
  `}</style>
);

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function fmt(n: number) {
  if (n >= 1_000_000) return `KES ${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `KES ${(n / 1_000).toFixed(0)}K`;
  return `KES ${n.toLocaleString()}`;
}

// ─── CARD ─────────────────────────────────────────────────────────────────────
function Card({
  children,
  p = "7",
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
      p={noPad ? 0 : { base: 5, md: p }}
      position="relative"
      overflow="hidden"
      className={className}
      {...rest}
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        w="60px"
        h="60px"
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
  sub,
  icon,
  accent,
  accentBg,
  trend,
  trendUp,
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ElementType;
  accent: string;
  accentBg: string;
  trend?: string;
  trendUp?: boolean;
}) {
  return (
    <Card className="kpi-card" p="6">
      <Flex justify="space-between" align="center" mb={5}>
        <Circle size="42px" bg={accentBg}>
          <Icon as={icon} boxSize={4.5} color={accent} />
        </Circle>
        {trend && (
          <HStack
            spacing={1.5}
            bg={trendUp === false ? L.redBg : L.accentGlow2}
            borderRadius="full"
            px={2.5}
            py={1}
            border="1px solid"
            borderColor={trendUp === false ? L.redBorder : L.borderMid}
          >
            <Icon
              as={trendUp === false ? FiArrowDown : FiArrowUp}
              boxSize="9px"
              color={trendUp === false ? L.red : L.accentLight}
            />
            <Text
              fontSize="10px"
              fontWeight="700"
              color={trendUp === false ? L.red : L.accentLight}
            >
              {trend}
            </Text>
          </HStack>
        )}
      </Flex>
      <Text
        fontSize={{ base: "22px", md: "26px" }}
        fontWeight="800"
        color={L.text}
        letterSpacing="-0.03em"
        lineHeight="1"
        mb={1}
      >
        {value}
      </Text>
      <Text fontSize="12px" fontWeight="600" color={L.muted} mb={0.5}>
        {label}
      </Text>
      <Text fontSize="11px" color={L.subtle}>
        {sub}
      </Text>
      <Box
        mt={4}
        h="2px"
        bg={L.accentGlow}
        borderRadius="full"
        overflow="hidden"
      >
        <Box
          h="100%"
          borderRadius="full"
          bg={accent}
          style={{ width: "55%", opacity: 0.45 }}
        />
      </Box>
    </Card>
  );
}

// ─── STATUS CONFIG ────────────────────────────────────────────────────────────
function getStatusConfig(status: string) {
  switch (status) {
    case "active":
      return {
        color: L.accentLight,
        bg: L.accentGlow2,
        border: L.borderMid,
        label: "Active",
      };
    case "pending":
      return {
        color: L.blue,
        bg: L.blueBg,
        border: L.blueBorder,
        label: "Pending",
      };
    case "completed":
      return {
        color: L.muted,
        bg: "rgba(0,0,0,0.04)",
        border: L.border,
        label: "Completed",
      };
    case "cancelled":
      return {
        color: L.red,
        bg: L.redBg,
        border: L.redBorder,
        label: "Cancelled",
      };
    default:
      return {
        color: L.muted,
        bg: L.accentGlow,
        border: L.border,
        label: status,
      };
  }
}

function getPaymentConfig(status: string) {
  switch (status) {
    case "paid":
      return { color: L.accentLight, bg: L.accentGlow2, border: L.borderMid };
    case "pending":
      return { color: L.orange, bg: L.orangeBg, border: L.orangeBorder };
    case "failed":
      return { color: L.red, bg: L.redBg, border: L.redBorder };
    default:
      return { color: L.muted, bg: L.accentGlow, border: L.border };
  }
}

function StatusPill({
  label,
  color,
  bg,
  border,
}: {
  label: string;
  color: string;
  bg: string;
  border: string;
}) {
  return (
    <Box
      display="inline-flex"
      alignItems="center"
      px={2.5}
      py={1}
      borderRadius="8px"
      bg={bg}
      border="1px solid"
      borderColor={border}
    >
      <Text
        fontSize="11px"
        fontWeight="700"
        color={color}
        textTransform="capitalize"
        letterSpacing=".04em"
      >
        {label}
      </Text>
    </Box>
  );
}

// ─── HERO STRIP ───────────────────────────────────────────────────────────────
function Hero() {
  const today = new Date().toLocaleDateString("en-KE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <Box
      className="fu"
      position="relative"
      overflow="hidden"
      borderRadius="24px"
      mb={8}
      minH={{ base: "140px", md: "165px" }}
      bg="linear-gradient(135deg, #1e6e1e 0%, #2d8c2d 55%, #52b852 100%)"
      boxShadow="0 16px 56px rgba(30,110,30,0.22), inset 0 1px 0 rgba(255,255,255,0.15)"
    >
      {/* grid */}
      <Box
        position="absolute"
        inset={0}
        opacity={0.07}
        bgImage="linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)"
        bgSize="44px 44px"
        pointerEvents="none"
      />
      {/* orbs */}
      <Box
        position="absolute"
        top="-60px"
        left="-40px"
        w="260px"
        h="260px"
        bg="radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 65%)"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        bottom="-40px"
        right="15%"
        w="180px"
        h="180px"
        bg="radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 65%)"
        pointerEvents="none"
      />

      <Box
        position="relative"
        zIndex={2}
        px={{ base: 6, md: 10 }}
        py={{ base: 6, md: 8 }}
      >
        <HStack spacing={2} mb={3}>
          <Box
            w="7px"
            h="7px"
            borderRadius="full"
            bg="rgba(255,255,255,0.85)"
          />
          <Text
            fontSize="11px"
            fontWeight="700"
            color="rgba(255,255,255,0.85)"
            textTransform="uppercase"
            letterSpacing=".12em"
          >
            Booking Management
          </Text>
          <Box w="1px" h="12px" bg="rgba(255,255,255,0.3)" />
          <Text fontSize="11px" color="rgba(255,255,255,0.6)">
            {today}
          </Text>
        </HStack>

        <Heading
          fontSize={{ base: "20px", md: "28px" }}
          fontWeight="800"
          color="white"
          letterSpacing="-0.02em"
          mb={1}
          lineHeight="1.15"
        >
          Customer Bookings
        </Heading>
        <Text fontSize="13px" color="rgba(255,255,255,0.65)">
          View, manage and track all rental bookings
        </Text>
      </Box>

      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        h="1px"
        bg="linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)"
      />
    </Box>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export const BookingManagement = () => {
  const { bookings, updateBooking, cancelBooking } = useBusinessContext();
  const toast = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedBookings, setSelectedBookings] = useState<Set<string>>(
    new Set(),
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [extendDays, setExtendDays] = useState("1");

  // ── filter ──────────────────────────────────────────────────────────────────
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchesSearch =
        b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.vehicleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || b.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [bookings, searchTerm, statusFilter]);

  // ── stats ───────────────────────────────────────────────────────────────────
  const stats = useMemo(
    () => ({
      total: bookings.length,
      active: bookings.filter((b) => b.status === "active").length,
      pending: bookings.filter((b) => b.status === "pending").length,
      revenue: bookings
        .filter((b) => b.status === "active" || b.status === "completed")
        .reduce((s, b) => s + b.totalAmount, 0),
    }),
    [bookings],
  );

  // ── selection ───────────────────────────────────────────────────────────────
  const toggleOne = (id: string) => {
    const s = new Set(selectedBookings);
    s.has(id) ? s.delete(id) : s.add(id);
    setSelectedBookings(s);
  };
  const toggleAll = (checked: boolean) => {
    setSelectedBookings(
      checked ? new Set(filteredBookings.map((b) => b.id)) : new Set(),
    );
  };

  // ── actions ─────────────────────────────────────────────────────────────────
  const handleBulkCancel = () => {
    selectedBookings.forEach((id) => cancelBooking(id));
    toast({
      title: `Cancelled ${selectedBookings.size} booking(s)`,
      status: "success",
      duration: 3000,
    });
    setSelectedBookings(new Set());
  };

  const handleExtendBooking = () => {
    if (!selectedBooking) return;
    const newEnd = new Date(selectedBooking.endDate);
    newEnd.setDate(newEnd.getDate() + parseInt(extendDays));
    const extra = selectedBooking.dailyRate * parseInt(extendDays);
    updateBooking(selectedBooking.id, {
      endDate: newEnd.toISOString().split("T")[0],
      totalDays: selectedBooking.totalDays + parseInt(extendDays),
      totalAmount: selectedBooking.totalAmount + extra,
    });
    toast({
      title: `Extended by ${extendDays} day(s)`,
      status: "success",
      duration: 3000,
    });
    setExtendDays("1");
    onClose();
  };

  const handleComplete = (id: string) => {
    updateBooking(id, { status: "completed" });
    toast({
      title: "Booking marked as completed",
      status: "success",
      duration: 3000,
    });
  };

  const allSelected =
    selectedBookings.size === filteredBookings.length &&
    filteredBookings.length > 0;

  return (
    <>
      <Styles />
      <Box bg={L.bg} minH="100vh" py={{ base: 5, md: 8 }}>
        <Container maxW="1400px" px={{ base: 4, md: 6, lg: 8 }}>
          {/* HERO */}
          <Hero />

          {/* KPI CARDS */}
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={4} mb={7}>
            <Box className="fu">
              <KpiCard
                label="Total Bookings"
                value={String(stats.total)}
                sub="All time"
                icon={FiCalendar}
                accent={L.accentLight}
                accentBg={L.accentGlow2}
                trend="+4"
                trendUp
              />
            </Box>
            <Box className="fu1">
              <KpiCard
                label="Active Now"
                value={String(stats.active)}
                sub="In progress"
                icon={FiActivity}
                accent={L.teal}
                accentBg={L.tealBg}
                trend="Live"
                trendUp
              />
            </Box>
            <Box className="fu2">
              <KpiCard
                label="Pending"
                value={String(stats.pending)}
                sub="Awaiting approval"
                icon={FiClock}
                accent={L.blue}
                accentBg={L.blueBg}
                trend="Review"
              />
            </Box>
            <Box className="fu3">
              <KpiCard
                label="Revenue"
                value={fmt(stats.revenue)}
                sub="From bookings"
                icon={FiDollarSign}
                accent={L.orange}
                accentBg={L.orangeBg}
                trend="+12%"
                trendUp
              />
            </Box>
          </SimpleGrid>

          {/* FILTERS */}
          <Box className="fu4" mb={5}>
            <Card p="5">
              <Flex gap={3} flexWrap="wrap" align="center">
                {/* search */}
                <Box
                  position="relative"
                  flex={{ base: "1 1 100%", md: "1 1 280px" }}
                  maxW={{ md: "320px" }}
                >
                  <Box
                    position="absolute"
                    left={3}
                    top="50%"
                    transform="translateY(-50%)"
                    zIndex={1}
                  >
                    <Icon as={FiSearch} boxSize={4} color={L.subtle} />
                  </Box>
                  <Input
                    className="filter-input"
                    placeholder="Search customer, vehicle, booking ID…"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    pl={9}
                    h="38px"
                    fontSize="13px"
                    bg={L.bg}
                    border="1px solid"
                    borderColor={L.border}
                    borderRadius="12px"
                    color={L.text}
                    _focus={{ outline: "none" }}
                  />
                </Box>

                {/* status filter */}
                <Box position="relative" w={{ base: "100%", sm: "180px" }}>
                  <Box
                    position="absolute"
                    left={3}
                    top="50%"
                    transform="translateY(-50%)"
                    zIndex={1}
                  >
                    <Icon as={FiFilter} boxSize={3.5} color={L.subtle} />
                  </Box>
                  <Select
                    className="filter-select"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    pl={8}
                    h="38px"
                    fontSize="13px"
                    fontWeight="600"
                    bg={L.bg}
                    border="1px solid"
                    borderColor={L.border}
                    borderRadius="12px"
                    color={L.text}
                    _focus={{ outline: "none" }}
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </Select>
                </Box>

                <Box flex={1} />

                {/* result count */}
                <Box
                  px={3}
                  py={1.5}
                  bg={L.accentGlow2}
                  borderRadius="10px"
                  border="1px solid"
                  borderColor={L.borderMid}
                >
                  <Text fontSize="12px" fontWeight="700" color={L.accentLight}>
                    {filteredBookings.length} booking
                    {filteredBookings.length !== 1 ? "s" : ""}
                  </Text>
                </Box>
              </Flex>

              {/* bulk action bar */}
              {selectedBookings.size > 0 && (
                <Flex
                  mt={4}
                  pt={4}
                  borderTop="1px solid"
                  borderColor={L.border}
                  align="center"
                  justify="space-between"
                  gap={3}
                  flexWrap="wrap"
                >
                  <HStack spacing={2.5}>
                    <Box w="7px" h="7px" borderRadius="full" bg={L.blue} />
                    <Text fontSize="13px" fontWeight="700" color={L.text}>
                      {selectedBookings.size} booking
                      {selectedBookings.size !== 1 ? "s" : ""} selected
                    </Text>
                  </HStack>
                  <Button
                    className="bulk-cancel-btn"
                    size="sm"
                    h="34px"
                    px={4}
                    bg={L.redBg}
                    color={L.red}
                    borderRadius="10px"
                    fontWeight="700"
                    fontSize="12px"
                    border="1px solid"
                    borderColor={L.redBorder}
                    leftIcon={<Icon as={FiX} boxSize={3.5} />}
                    onClick={handleBulkCancel}
                    _hover={{ bg: "rgba(192,57,43,0.12)" }}
                  >
                    Cancel Selected
                  </Button>
                </Flex>
              )}
            </Card>
          </Box>

          {/* BOOKINGS TABLE */}
          <Box className="fu5">
            <Card noPad overflow="hidden">
              {/* table header */}
              <Flex
                px={{ base: 5, md: 7 }}
                py={5}
                align="center"
                justify="space-between"
                borderBottom="1px solid"
                borderColor={L.border}
                gap={3}
                flexWrap="wrap"
              >
                <Box>
                  <Text fontSize="15px" fontWeight="800" color={L.text}>
                    All Bookings
                  </Text>
                  <Text fontSize="12px" color={L.muted} mt={0.5}>
                    Showing {filteredBookings.length} of {stats.total} bookings
                  </Text>
                </Box>
              </Flex>

              {filteredBookings.length > 0 ? (
                <Box overflowX="auto">
                  <Table variant="unstyled" size="sm">
                    <Thead>
                      <Tr bg={L.bg}>
                        <Th
                          py={3}
                          px={{ base: 4, md: 5 }}
                          borderBottom="1px solid"
                          borderColor={L.border}
                          w="40px"
                        >
                          <Checkbox
                            isChecked={allSelected}
                            onChange={(e) => toggleAll(e.target.checked)}
                            colorScheme="green"
                            borderColor={L.borderMid}
                          />
                        </Th>
                        {[
                          "Booking ID",
                          "Customer",
                          "Vehicle",
                          "Dates",
                          "Days",
                          "Amount",
                          "Status",
                          "Payment",
                          "Actions",
                        ].map((h) => (
                          <Th
                            key={h}
                            py={3}
                            px={{ base: 3, md: 4 }}
                            fontSize="10px"
                            fontWeight="700"
                            color={L.muted}
                            textTransform="uppercase"
                            letterSpacing=".1em"
                            borderBottom="1px solid"
                            borderColor={L.border}
                            whiteSpace="nowrap"
                          >
                            {h}
                          </Th>
                        ))}
                      </Tr>
                    </Thead>
                    <Tbody>
                      {filteredBookings.map((booking, i) => {
                        const sc = getStatusConfig(booking.status);
                        const pc = getPaymentConfig(booking.paymentStatus);
                        const isSelected = selectedBookings.has(booking.id);
                        return (
                          <Tr
                            key={booking.id}
                            className="booking-row"
                            borderBottom="1px solid"
                            borderColor={L.border}
                            bg={isSelected ? L.accentGlow : "transparent"}
                          >
                            {/* checkbox */}
                            <Td
                              py={4}
                              px={{ base: 4, md: 5 }}
                              borderColor="transparent"
                            >
                              <Checkbox
                                isChecked={isSelected}
                                onChange={() => toggleOne(booking.id)}
                                colorScheme="green"
                                borderColor={L.borderMid}
                              />
                            </Td>

                            {/* booking id */}
                            <Td
                              py={4}
                              px={{ base: 3, md: 4 }}
                              borderColor="transparent"
                            >
                              <Text
                                fontSize="12px"
                                fontWeight="700"
                                color={L.accentLight}
                                fontFamily="monospace"
                              >
                                {booking.id}
                              </Text>
                            </Td>

                            {/* customer */}
                            <Td
                              py={4}
                              px={{ base: 3, md: 4 }}
                              borderColor="transparent"
                            >
                              <HStack spacing={2.5}>
                                <Circle
                                  size="30px"
                                  bg={L.accentGlow2}
                                  flexShrink={0}
                                >
                                  <Text
                                    fontSize="11px"
                                    fontWeight="800"
                                    color={L.accentLight}
                                  >
                                    {booking.customerName
                                      .charAt(0)
                                      .toUpperCase()}
                                  </Text>
                                </Circle>
                                <Box>
                                  <Text
                                    fontSize="13px"
                                    fontWeight="700"
                                    color={L.text}
                                    whiteSpace="nowrap"
                                  >
                                    {booking.customerName}
                                  </Text>
                                  <Text fontSize="10px" color={L.muted}>
                                    {booking.customerId}
                                  </Text>
                                </Box>
                              </HStack>
                            </Td>

                            {/* vehicle */}
                            <Td
                              py={4}
                              px={{ base: 3, md: 4 }}
                              borderColor="transparent"
                            >
                              <Text
                                fontSize="13px"
                                fontWeight="600"
                                color={L.textSub}
                                whiteSpace="nowrap"
                              >
                                {booking.vehicleName}
                              </Text>
                            </Td>

                            {/* dates */}
                            <Td
                              py={4}
                              px={{ base: 3, md: 4 }}
                              borderColor="transparent"
                            >
                              <Box>
                                <Text
                                  fontSize="12px"
                                  fontWeight="600"
                                  color={L.text}
                                >
                                  {new Date(
                                    booking.startDate,
                                  ).toLocaleDateString("en-KE", {
                                    day: "2-digit",
                                    month: "short",
                                  })}
                                </Text>
                                <Text fontSize="10px" color={L.muted}>
                                  →{" "}
                                  {new Date(booking.endDate).toLocaleDateString(
                                    "en-KE",
                                    { day: "2-digit", month: "short" },
                                  )}
                                </Text>
                              </Box>
                            </Td>

                            {/* days */}
                            <Td
                              py={4}
                              px={{ base: 3, md: 4 }}
                              borderColor="transparent"
                            >
                              <Box
                                px={2.5}
                                py={1}
                                bg={L.accentGlow}
                                borderRadius="8px"
                                border="1px solid"
                                borderColor={L.border}
                                display="inline-block"
                              >
                                <Text
                                  fontSize="12px"
                                  fontWeight="700"
                                  color={L.textSub}
                                >
                                  {booking.totalDays}d
                                </Text>
                              </Box>
                            </Td>

                            {/* amount */}
                            <Td
                              py={4}
                              px={{ base: 3, md: 4 }}
                              borderColor="transparent"
                            >
                              <Text
                                fontSize="13px"
                                fontWeight="800"
                                color={L.orange}
                              >
                                {fmt(booking.totalAmount)}
                              </Text>
                            </Td>

                            {/* status */}
                            <Td
                              py={4}
                              px={{ base: 3, md: 4 }}
                              borderColor="transparent"
                            >
                              <StatusPill {...sc} />
                            </Td>

                            {/* payment */}
                            <Td
                              py={4}
                              px={{ base: 3, md: 4 }}
                              borderColor="transparent"
                            >
                              <StatusPill
                                label={booking.paymentStatus}
                                color={pc.color}
                                bg={pc.bg}
                                border={pc.border}
                              />
                            </Td>

                            {/* actions */}
                            <Td
                              py={4}
                              px={{ base: 3, md: 4 }}
                              borderColor="transparent"
                            >
                              <Menu>
                                <MenuButton
                                  as={Button}
                                  size="sm"
                                  h="32px"
                                  w="32px"
                                  className="action-menu-btn"
                                  variant="ghost"
                                  p={0}
                                  _hover={{ bg: L.accentGlow2 }}
                                >
                                  <Icon
                                    as={FiMoreVertical}
                                    boxSize={4}
                                    color={L.muted}
                                  />
                                </MenuButton>
                                <MenuList
                                  bg={L.card}
                                  border="1px solid"
                                  borderColor={L.cardBorder}
                                  borderRadius="14px"
                                  boxShadow={L.shadowMd}
                                  p={1.5}
                                  minW="160px"
                                >
                                  {booking.status === "active" && (
                                    <>
                                      <MenuItem
                                        borderRadius="10px"
                                        fontSize="13px"
                                        fontWeight="600"
                                        color={L.text}
                                        _hover={{
                                          bg: L.accentGlow2,
                                          color: L.accentLight,
                                        }}
                                        icon={
                                          <Icon as={FiEdit} boxSize={3.5} />
                                        }
                                        onClick={() => {
                                          setSelectedBooking(booking);
                                          onOpen();
                                        }}
                                      >
                                        Extend Booking
                                      </MenuItem>
                                      <MenuItem
                                        borderRadius="10px"
                                        fontSize="13px"
                                        fontWeight="600"
                                        color={L.text}
                                        _hover={{
                                          bg: L.accentGlow2,
                                          color: L.accentLight,
                                        }}
                                        icon={
                                          <Icon
                                            as={FiCheckCircle}
                                            boxSize={3.5}
                                          />
                                        }
                                        onClick={() =>
                                          handleComplete(booking.id)
                                        }
                                      >
                                        Mark Completed
                                      </MenuItem>
                                    </>
                                  )}
                                  {booking.status === "pending" && (
                                    <MenuItem
                                      borderRadius="10px"
                                      fontSize="13px"
                                      fontWeight="600"
                                      color={L.accentLight}
                                      _hover={{ bg: L.accentGlow2 }}
                                      icon={
                                        <Icon
                                          as={FiCheckCircle}
                                          boxSize={3.5}
                                        />
                                      }
                                      onClick={() =>
                                        updateBooking(booking.id, {
                                          status: "active",
                                        })
                                      }
                                    >
                                      Approve Booking
                                    </MenuItem>
                                  )}
                                  {(booking.status === "active" ||
                                    booking.status === "pending") && (
                                    <MenuItem
                                      borderRadius="10px"
                                      fontSize="13px"
                                      fontWeight="600"
                                      color={L.red}
                                      _hover={{ bg: L.redBg }}
                                      icon={<Icon as={FiX} boxSize={3.5} />}
                                      onClick={() => cancelBooking(booking.id)}
                                    >
                                      Cancel Booking
                                    </MenuItem>
                                  )}
                                </MenuList>
                              </Menu>
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </Box>
              ) : (
                <Flex
                  direction="column"
                  justify="center"
                  align="center"
                  minH="220px"
                  gap={3}
                >
                  <Circle size="52px" bg={L.accentGlow2}>
                    <Icon as={FiCalendar} boxSize={5} color={L.accentLight} />
                  </Circle>
                  <Text fontSize="14px" fontWeight="700" color={L.muted}>
                    No bookings found
                  </Text>
                  <Text fontSize="12px" color={L.subtle}>
                    Try adjusting your search or filter
                  </Text>
                </Flex>
              )}
            </Card>
          </Box>
        </Container>
      </Box>

      {/* ── EXTEND BOOKING MODAL ───────────────────────────────────────────── */}
      <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
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
          {/* modal header accent */}
          <Box h="4px" bg="linear-gradient(90deg, #1e6e1e, #2d8c2d, #52b852)" />

          <ModalHeader px={7} pt={6} pb={2}>
            <HStack spacing={3}>
              <Circle size="36px" bg={L.accentGlow2}>
                <Icon as={FiEdit} boxSize={4} color={L.accentLight} />
              </Circle>
              <Box>
                <Text fontSize="16px" fontWeight="800" color={L.text}>
                  Extend Booking
                </Text>
                <Text fontSize="11px" color={L.muted} fontWeight="500">
                  Add more days to this rental
                </Text>
              </Box>
            </HStack>
          </ModalHeader>
          <ModalCloseButton
            top={5}
            right={5}
            color={L.muted}
            _hover={{ bg: L.accentGlow, color: L.text }}
            borderRadius="10px"
          />

          <ModalBody px={7} py={5}>
            {selectedBooking && (
              <VStack spacing={4} align="stretch">
                {/* current booking info */}
                <Box
                  p={4}
                  bg={L.bg}
                  borderRadius="14px"
                  border="1px solid"
                  borderColor={L.border}
                >
                  <Text
                    fontSize="11px"
                    fontWeight="700"
                    color={L.muted}
                    textTransform="uppercase"
                    letterSpacing=".08em"
                    mb={2}
                  >
                    Current Booking
                  </Text>
                  <Text
                    fontSize="14px"
                    fontWeight="800"
                    color={L.text}
                    mb={0.5}
                  >
                    {selectedBooking.vehicleName}
                  </Text>
                  <HStack spacing={4}>
                    <Text fontSize="12px" color={L.muted}>
                      Customer:{" "}
                      <Text as="span" fontWeight="700" color={L.textSub}>
                        {selectedBooking.customerName}
                      </Text>
                    </Text>
                    <Text fontSize="12px" color={L.muted}>
                      Ends:{" "}
                      <Text as="span" fontWeight="700" color={L.textSub}>
                        {new Date(selectedBooking.endDate).toLocaleDateString(
                          "en-KE",
                          { day: "2-digit", month: "short", year: "numeric" },
                        )}
                      </Text>
                    </Text>
                  </HStack>
                </Box>

                {/* extend by selector */}
                <FormControl>
                  <FormLabel
                    fontSize="13px"
                    fontWeight="700"
                    color={L.textSub}
                    mb={2}
                  >
                    Extend by (days)
                  </FormLabel>
                  <Select
                    value={extendDays}
                    onChange={(e) => setExtendDays(e.target.value)}
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
                    <option value="1">1 day</option>
                    <option value="2">2 days</option>
                    <option value="3">3 days</option>
                    <option value="7">1 week</option>
                    <option value="14">2 weeks</option>
                    <option value="30">1 month</option>
                  </Select>
                </FormControl>

                {/* cost preview */}
                <Box
                  p={4}
                  bg={L.accentGlow}
                  borderRadius="14px"
                  border="1px solid"
                  borderColor={L.borderMid}
                >
                  <Flex justify="space-between" align="center" mb={2}>
                    <Text fontSize="12px" fontWeight="700" color={L.muted}>
                      Additional Cost
                    </Text>
                    <Text fontSize="18px" fontWeight="800" color={L.orange}>
                      {fmt(selectedBooking.dailyRate * parseInt(extendDays))}
                    </Text>
                  </Flex>
                  <Box h="1px" bg={L.borderMid} mb={2} />
                  <Flex justify="space-between">
                    <Text fontSize="11px" color={L.muted}>
                      New total
                    </Text>
                    <Text
                      fontSize="13px"
                      fontWeight="700"
                      color={L.accentLight}
                    >
                      {fmt(
                        selectedBooking.totalAmount +
                          selectedBooking.dailyRate * parseInt(extendDays),
                      )}
                    </Text>
                  </Flex>
                </Box>
              </VStack>
            )}
          </ModalBody>

          <ModalFooter
            px={7}
            py={5}
            borderTop="1px solid"
            borderColor={L.border}
            gap={3}
          >
            <Button
              variant="ghost"
              onClick={onClose}
              h="40px"
              px={5}
              fontSize="13px"
              fontWeight="700"
              color={L.muted}
              borderRadius="12px"
              _hover={{ bg: L.accentGlow, color: L.text }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleExtendBooking}
              h="40px"
              px={6}
              bg={`linear-gradient(135deg, ${L.accent}, ${L.accentLight})`}
              color="white"
              fontSize="13px"
              fontWeight="700"
              borderRadius="12px"
              boxShadow="0 4px 16px rgba(30,110,30,0.3)"
              _hover={{
                boxShadow: "0 8px 24px rgba(30,110,30,0.35)",
                transform: "translateY(-1px)",
              }}
              transition="all .2s ease"
            >
              Confirm Extension
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
