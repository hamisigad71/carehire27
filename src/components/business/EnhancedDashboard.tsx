"use client";

import React, { useState, useEffect } from "react";
import {
  Box, Container, Grid, Heading, Text, VStack, HStack,
  Card, CardBody, Button, Badge, Table, Thead, Tbody,
  Tr, Th, Td, SimpleGrid, Progress, Icon, Spinner,
  Flex, Image, Circle, Divider, Stat, StatLabel,
  StatNumber, StatHelpText, Spacer,
} from "@chakra-ui/react";
import { FiTrendingUp, FiUsers, FiCalendar, FiAlertCircle, FiCheckCircle, FiClock, FiDollarSign, FiArrowUp, FiArrowDown, FiMoreHorizontal, FiActivity, FiMapPin, FiStar, FiShield, FiBarChart2, FiEye } from "react-icons/fi";
import { useBusinessContext } from "@/context/BusinessContext";
import { businessApi } from "@/api/business";
import { useColorTokens } from "@/hooks/useColorTokens";
import { FaCar } from "react-icons/fa";

// ─── LIGHT MODE TOKENS ────────────────────────────────────────────────────────
const L = {
  bg:          "#f4f7f4",
  pageBg:      "#eef2ee",
  card:        "#ffffff",
  cardBorder:  "rgba(34,102,34,0.1)",
  accent:      "#1e6e1e",
  accentLight: "#2d8c2d",
  accentGlow:  "rgba(30,110,30,0.08)",
  accentGlow2: "rgba(30,110,30,0.14)",
  text:        "#111a11",
  textSub:     "#3a4d3a",
  muted:       "#6b7f6b",
  subtle:      "#9aaa9a",
  border:      "rgba(0,0,0,0.07)",
  gold:        "#b07d0a",
  goldBg:      "rgba(176,125,10,0.1)",
  blue:        "#1a56a0",
  blueBg:      "rgba(26,86,160,0.08)",
  red:         "#c0392b",
  redBg:       "rgba(192,57,43,0.08)",
  orange:      "#c05c00",
  orangeBg:    "rgba(192,92,0,0.08)",
  shadow:      "0 1px 12px rgba(0,0,0,0.06)",
  shadowMd:    "0 4px 24px rgba(0,0,0,0.09)",
  shadowLg:    "0 12px 48px rgba(0,0,0,0.12)",
};

// ─── INLINE STYLES ────────────────────────────────────────────────────────────
const Styles = () => (
  <style>{`
    .kpi-card {
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }
    .kpi-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 16px 48px rgba(0,0,0,0.12) !important;
    }
    .booking-row {
      transition: background 0.15s ease;
    }
    .booking-row:hover { background: rgba(30,110,30,0.04) !important; }

    .alert-item {
      transition: transform 0.2s ease;
    }
    .alert-item:hover { transform: translateX(4px); }

    .rev-bar-fill {
      transition: width 0.8s cubic-bezier(.25,.46,.45,.94);
    }
    .util-fill {
      transition: width 0.8s cubic-bezier(.25,.46,.45,.94);
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .fu  { animation: fadeUp 0.5s ease both; }
    .fu1 { animation: fadeUp 0.5s 0.05s ease both; }
    .fu2 { animation: fadeUp 0.5s 0.10s ease both; }
    .fu3 { animation: fadeUp 0.5s 0.15s ease both; }
    .fu4 { animation: fadeUp 0.5s 0.20s ease both; }
    .fu5 { animation: fadeUp 0.5s 0.25s ease both; }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    .spin { animation: spin 0.9s linear infinite; }
  `}</style>
);

// ─── INTERFACES ───────────────────────────────────────────────────────────────
interface KPIMetric {
  label: string;
  value: string | number;
  icon: React.ElementType;
  trend?: string;
  trendUp?: boolean;
  accent: string;
  accentBg: string;
  subText?: string;
}

// ─── TREND BADGE ──────────────────────────────────────────────────────────────
function TrendBadge({ up, text }: { up?: boolean; text?: string }) {
  if (!text) return null;
  return (
    <HStack spacing={1}
      bg={up === false ? L.redBg : L.accentGlow2}
      borderRadius="full" px={2.5} py={0.5}>
      <Icon as={up === false ? FiArrowDown : FiArrowUp}
        boxSize="10px"
        color={up === false ? L.red : L.accentLight} />
      <Text fontSize="11px" fontWeight="700"
        color={up === false ? L.red : L.accentLight}>
        {text}
      </Text>
    </HStack>
  );
}

// ─── KPI CARD ─────────────────────────────────────────────────────────────────
function KpiCard({ kpi }: { kpi: KPIMetric }) {
  return (
    <Box className="kpi-card" bg={L.card} borderRadius="20px"
      border="1px solid" borderColor={L.cardBorder}
      boxShadow={L.shadow} p={5}>
      <Flex justify="space-between" align="flex-start" mb={4}>
        <Circle size="44px" bg={kpi.accentBg}>
          <Icon as={kpi.icon} boxSize={5} color={kpi.accent} />
        </Circle>
        <Icon as={FiMoreHorizontal} color={L.subtle} boxSize={4} cursor="pointer" />
      </Flex>
      <Text fontSize="28px" fontWeight="800" color={L.text}
        letterSpacing="-0.03em" lineHeight="1" mb={1}>
        {kpi.value}
      </Text>
      <Text fontSize="12px" fontWeight="600" color={L.muted} mb={3}>
        {kpi.label}
      </Text>
      <TrendBadge up={kpi.trendUp} text={kpi.trend} />
    </Box>
  );
}

// ─── SECTION HEADER ───────────────────────────────────────────────────────────
function SectionHeader({ title, sub, action }: { title: string; sub?: string; action?: string }) {
  return (
    <Flex align="center" justify="space-between" mb={5} flexWrap="wrap" gap={2}>
      <Box>
        <Text fontSize="16px" fontWeight="800" color={L.text} letterSpacing="-0.01em">{title}</Text>
        {sub && <Text fontSize="12px" color={L.muted} mt={0.5}>{sub}</Text>}
      </Box>
      {action && (
        <Button size="xs" variant="ghost" color={L.accentLight} fontWeight="700"
          _hover={{ bg: L.accentGlow }} borderRadius="full" px={3}>
          {action} →
        </Button>
      )}
    </Flex>
  );
}

// ─── REVENUE BAR CHART ────────────────────────────────────────────────────────
function RevenueChart({ data }: { data: any[] }) {
  const max = Math.max(...(data.map(d => d.revenue || 0)), 1);
  const months = data.length > 0 ? data : [
    { name: "Oct", revenue: 320000 },
    { name: "Nov", revenue: 410000 },
    { name: "Dec", revenue: 380000 },
    { name: "Jan", revenue: 450000 },
    { name: "Feb", revenue: 390000 },
    { name: "Mar", revenue: 480000 },
  ];

  return (
    <Box>
      {/* Bar chart */}
      <Flex align="flex-end" justify="space-between" h="140px" mb={3} px={1}>
        {months.map((d, i) => {
          const pct = Math.round(((d.revenue || 0) / max) * 100);
          const isLast = i === months.length - 1;
          return (
            <Flex key={i} flexDir="column" align="center" flex={1} px={1} h="100%" justify="flex-end">
              <Text fontSize="10px" fontWeight="700" color={isLast ? L.accentLight : L.subtle} mb={1}>
                {isLast ? `KSh ${((d.revenue||0)/1000).toFixed(0)}K` : ""}
              </Text>
              <Box
                w="100%" borderRadius="8px 8px 0 0"
                bg={isLast
                  ? `linear-gradient(180deg, ${L.accentLight}, ${L.accent})`
                  : "rgba(30,110,30,0.15)"}
                border={isLast ? "none" : `1px solid rgba(30,110,30,0.1)`}
                style={{ height: `${Math.max(pct, 8)}%` }}
                position="relative"
                className="rev-bar-fill"
                transition="all 0.3s ease"
                _hover={{ bg: isLast ? undefined : "rgba(30,110,30,0.25)" }}
                cursor="pointer"
              />
            </Flex>
          );
        })}
      </Flex>
      {/* X labels */}
      <Flex justify="space-between" px={1}>
        {months.map((d, i) => (
          <Text key={i} flex={1} textAlign="center" fontSize="10px"
            fontWeight="600" color={i === months.length - 1 ? L.accent : L.subtle}>
            {d.name}
          </Text>
        ))}
      </Flex>
    </Box>
  );
}

// ─── UTILIZATION LIST ─────────────────────────────────────────────────────────
function UtilizationList({ data }: { data: any[] }) {
  const items = data.length > 0 ? data : [
    { vehicle: "Mercedes GLE 450",  utilization: 92 },
    { vehicle: "Toyota Prado 2024", utilization: 78 },
    { vehicle: "Range Rover Sport", utilization: 85 },
    { vehicle: "VW Tiguan",         utilization: 61 },
    { vehicle: "Toyota Camry",      utilization: 95 },
  ];

  return (
    <VStack spacing={3.5} align="stretch">
      {items.slice(0, 5).map((item, i) => {
        const u = item.utilization;
        const color = u >= 85 ? L.accentLight : u >= 65 ? L.blue : L.orange;
        return (
          <Box key={i}>
            <Flex justify="space-between" mb={1.5}>
              <Text fontSize="12px" fontWeight="600" color={L.textSub} noOfLines={1} flex={1} mr={2}>
                {item.vehicle}
              </Text>
              <Text fontSize="12px" fontWeight="800" color={color}>{u}%</Text>
            </Flex>
            <Box h="6px" bg={L.pageBg} borderRadius="full" overflow="hidden">
              <Box
                className="util-fill"
                h="100%" borderRadius="full"
                bg={u >= 85
                  ? `linear-gradient(90deg, ${L.accent}, ${L.accentLight})`
                  : u >= 65 ? L.blue : L.orange}
                style={{ width: `${u}%` }}
              />
            </Box>
          </Box>
        );
      })}
    </VStack>
  );
}

// ─── BOOKING ROW ─────────────────────────────────────────────────────────────
function BookingRow({ booking }: { booking: any }) {
  const statusMap: Record<string, { color: string; bg: string; label: string }> = {
    active:    { color: L.accentLight, bg: L.accentGlow2,  label: "Active"    },
    pending:   { color: L.blue,        bg: L.blueBg,        label: "Pending"   },
    completed: { color: L.muted,       bg: L.pageBg,        label: "Done"      },
    cancelled: { color: L.red,         bg: L.redBg,         label: "Cancelled" },
  };
  const s = statusMap[booking.status] || statusMap.pending;

  return (
    <Tr className="booking-row">
      <Td py={3} borderColor={L.border}>
        <VStack align="start" spacing={0}>
          <Text fontSize="13px" fontWeight="700" color={L.text}>{booking.vehicleName}</Text>
          <Text fontSize="11px" color={L.muted}>{booking.id}</Text>
        </VStack>
      </Td>
      <Td py={3} borderColor={L.border}>
        <Text fontSize="13px" fontWeight="600" color={L.textSub}>{booking.customerName}</Text>
      </Td>
      <Td py={3} borderColor={L.border} display={{ base: "none", md: "table-cell" }}>
        <Text fontSize="12px" color={L.muted}>
          {new Date(booking.endDate).toLocaleDateString("en-KE", { day: "numeric", month: "short" })}
        </Text>
      </Td>
      <Td py={3} borderColor={L.border}>
        <Text fontSize="13px" fontWeight="700" color={L.text}>
          KSh {(booking.totalAmount || 0).toLocaleString()}
        </Text>
      </Td>
      <Td py={3} borderColor={L.border}>
        <Box bg={s.bg} borderRadius="full" px={2.5} py={0.5} display="inline-block">
          <Text fontSize="11px" fontWeight="700" color={s.color}>{s.label}</Text>
        </Box>
      </Td>
    </Tr>
  );
}

// ─── ALERT ITEM ───────────────────────────────────────────────────────────────
function AlertItem({
  icon, title, desc, accent, bg,
}: { icon: React.ElementType; title: string; desc: string; accent: string; bg: string }) {
  return (
    <HStack className="alert-item" spacing={3} p={3.5}
      bg={bg} borderRadius="14px" border="1px solid"
      borderColor={`${accent}22`} align="flex-start">
      <Circle size="32px" bg={`${accent}18`} flexShrink={0}>
        <Icon as={icon} boxSize={3.5} color={accent} />
      </Circle>
      <Box>
        <Text fontSize="13px" fontWeight="700" color={L.text} mb={0.5}>{title}</Text>
        <Text fontSize="11px" color={L.muted} lineHeight="1.5">{desc}</Text>
      </Box>
    </HStack>
  );
}

// ─── HERO STRIP ───────────────────────────────────────────────────────────────
function HeroStrip({ metrics }: { metrics: any }) {
  return (
    <Box
      position="relative" overflow="hidden" borderRadius="24px"
      mb={7} minH={{ base: "160px", md: "180px" }}
      bg={`linear-gradient(135deg, ${L.accent} 0%, #3a9e3a 60%, #52b852 100%)`}
    >
      {/* Grid overlay */}
      <Box position="absolute" inset={0} opacity={0.06}
        bgImage="linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)"
        bgSize="40px 40px" />
      {/* Orb */}
      <Box position="absolute" top="-60px" right="-60px" w="280px" h="280px"
        bg="radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)" />

      {/* Car image right side */}
      <Box position="absolute" right={0} bottom={0} top={0}
        w={{ base: "160px", md: "320px" }} overflow="hidden"
        display={{ base: "none", sm: "block" }}>
        <Image
          src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=700&h=380&fit=crop&crop=center"
          w="100%" h="100%" objectFit="cover" objectPosition="center 60%"
          style={{ filter: "brightness(0.75) contrast(1.05)" }}
        />
        <Box position="absolute" inset={0}
          bg="linear-gradient(90deg, rgba(30,110,30,0.9) 0%, rgba(30,110,30,0.5) 40%, transparent 100%)" />
      </Box>

      {/* Content */}
      <Box position="relative" zIndex={2} px={{ base: 6, md: 10 }} py={{ base: 6, md: 8 }}>
        <Badge bg="rgba(255,255,255,0.2)" color="white" borderRadius="full"
          px={3} py={1} fontSize="11px" fontWeight="700" mb={3}
          border="1px solid rgba(255,255,255,0.25)">
          Business Dashboard
        </Badge>
        <Heading fontSize={{ base: "22px", md: "30px" }} color="white"
          fontWeight="800" letterSpacing="-0.02em" mb={1}>
          Good morning! Here's your overview.
        </Heading>
        <Text fontSize={{ base: "13px", md: "14px" }} color="rgba(255,255,255,0.75)" fontWeight="400">
          {new Date().toLocaleDateString("en-KE", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </Text>

        {/* Quick metrics */}
        <HStack spacing={{ base: 4, md: 8 }} mt={5} flexWrap="wrap">
          {[
            { l: "Fleet Utilisation", v: `${(metrics?.fleetUtilization || 0).toFixed(0)}%` },
            { l: "Revenue MTD",       v: `KSh ${((metrics?.totalRevenue || 0) / 1000).toFixed(0)}K` },
            { l: "Active Rentals",    v: metrics?.activeRentals || 0 },
          ].map(({ l, v }) => (
            <Box key={l}>
              <Text fontSize="20px" fontWeight="800" color="white" lineHeight="1">{v}</Text>
              <Text fontSize="11px" color="rgba(255,255,255,0.65)" mt={0.5}>{l}</Text>
            </Box>
          ))}
        </HStack>
      </Box>
    </Box>
  );
}

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────
export const EnhancedDashboard = () => {
  const { metrics, vehicles, bookings } = useBusinessContext();
  const colors = useColorTokens();

  const [revenueData, setRevenueData]           = useState<any[]>([]);
  const [vehicleUtilization, setVehicleUtilization] = useState<any[]>([]);
  const [loading, setLoading]                   = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [revenue, utilization] = await Promise.all([
          businessApi.metrics.getRevenueStats("month"),
          businessApi.metrics.getVehicleUtilization(),
        ]);
        setRevenueData(revenue.data);
        setVehicleUtilization(utilization.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const activeBookings  = bookings.filter(b => b.status === "active");
  const pendingBookings = bookings.filter(b => b.status === "pending");
  const allBookings     = bookings.slice(0, 8);

  const kpis: KPIMetric[] = [
    {
      label: "Available Vehicles",
      value: metrics.availableVehicles,
      icon: FaCar,
      accent: L.accentLight,
      accentBg: L.accentGlow2,
      trend: `of ${metrics.totalVehicles} total`,
      trendUp: true,
    },
    {
      label: "Active Rentals",
      value: metrics.activeRentals,
      icon: FiCalendar,
      accent: L.blue,
      accentBg: L.blueBg,
      trend: "+2 this week",
      trendUp: true,
    },
    {
      label: "Total Customers",
      value: metrics.totalCustomers,
      icon: FiUsers,
      accent: "#0e7b7b",
      accentBg: "rgba(14,123,123,0.08)",
      trend: "2 new this month",
      trendUp: true,
    },
    {
      label: "Revenue (MTD)",
      value: `KSh ${((metrics.totalRevenue || 0) / 1000).toFixed(0)}K`,
      icon: FiDollarSign,
      accent: L.gold,
      accentBg: L.goldBg,
      trend: "+12% vs last month",
      trendUp: true,
    },
    {
      label: "Fleet Utilization",
      value: `${(metrics.fleetUtilization || 0).toFixed(0)}%`,
      icon: FiActivity,
      accent: "#7c3aed",
      accentBg: "rgba(124,58,237,0.08)",
      trend: "Optimal range",
      trendUp: true,
    },
    {
      label: "Pending Maintenance",
      value: metrics.pendingMaintenance || 0,
      icon: FiAlertCircle,
      accent: L.red,
      accentBg: L.redBg,
      trend: metrics.pendingMaintenance > 0 ? "Needs attention" : "All clear",
      trendUp: metrics.pendingMaintenance === 0,
    },
  ];

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="400px" bg={L.bg}>
        <VStack spacing={3}>
          <Box w="36px" h="36px" border="3px solid" borderColor={L.accent}
            borderTopColor="transparent" borderRadius="full" className="spin" />
          <Text fontSize="13px" color={L.muted} fontWeight="600">Loading dashboard…</Text>
        </VStack>
      </Flex>
    );
  }

  return (
    <>
      <Styles />
      <Box bg={L.bg} minH="100vh" py={{ base: 5, md: 8 }}>
        <Container maxW="1400px" px={{ base: 4, md: 6, lg: 8 }}>

          {/* ── HERO STRIP ── */}
          <HeroStrip metrics={metrics} />

          {/* ── KPI GRID ── */}
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={4} mb={7}>
            {kpis.map((kpi, i) => (
              <Box key={i} className={`fu${i}`}>
                <KpiCard kpi={kpi} />
              </Box>
            ))}
          </SimpleGrid>

          {/* ── CHARTS ROW ── */}
          <Grid templateColumns={{ base: "1fr", lg: "3fr 2fr" }} gap={5} mb={6}>

            {/* Revenue */}
            <Box className="fu1" bg={L.card} borderRadius="20px" border="1px solid"
              borderColor={L.border} boxShadow={L.shadow} p={{ base: 5, md: 6 }}>
              <Flex align="center" justify="space-between" mb={5}>
                <Box>
                  <Text fontSize="15px" fontWeight="800" color={L.text}>Monthly Revenue</Text>
                  <Text fontSize="12px" color={L.muted} mt={0.5}>Last 6 months performance</Text>
                </Box>
                <HStack spacing={2}>
                  <TrendBadge up={true} text="+12%" />
                  <Circle size="32px" bg={L.accentGlow2} cursor="pointer">
                    <Icon as={FiBarChart2} boxSize={4} color={L.accentLight} />
                  </Circle>
                </HStack>
              </Flex>
              <RevenueChart data={revenueData} />
            </Box>

            {/* Utilization */}
            <Box className="fu2" bg={L.card} borderRadius="20px" border="1px solid"
              borderColor={L.border} boxShadow={L.shadow} p={{ base: 5, md: 6 }}>
              <SectionHeader title="Fleet Utilization" sub="Top vehicles by usage" action="View all" />
              <UtilizationList data={vehicleUtilization} />
            </Box>
          </Grid>

          {/* ── BOOKINGS + ALERTS ROW ── */}
          <Grid templateColumns={{ base: "1fr", lg: "3fr 2fr" }} gap={5} mb={6}>

            {/* Bookings table */}
            <Box className="fu3" bg={L.card} borderRadius="20px" border="1px solid"
              borderColor={L.border} boxShadow={L.shadow} overflow="hidden">
              <Flex align="center" justify="space-between" px={{ base: 5, md: 6 }} pt={5} pb={3}>
                <Box>
                  <Text fontSize="15px" fontWeight="800" color={L.text}>Recent Bookings</Text>
                  <Text fontSize="12px" color={L.muted} mt={0.5}>
                    {activeBookings.length} active · {pendingBookings.length} pending
                  </Text>
                </Box>
                <Button size="xs" bg={L.accentGlow2} color={L.accentLight}
                  borderRadius="full" px={3} fontWeight="700" fontSize="11px"
                  _hover={{ bg: "rgba(30,110,30,0.2)" }}>
                  View All
                </Button>
              </Flex>

              <Box overflowX="auto">
                <Table size="sm" variant="simple">
                  <Thead>
                    <Tr bg={L.pageBg}>
                      <Th fontSize="10px" color={L.muted} fontWeight="700"
                        borderColor={L.border} py={3} textTransform="uppercase"
                        letterSpacing="0.08em">Vehicle</Th>
                      <Th fontSize="10px" color={L.muted} fontWeight="700"
                        borderColor={L.border} textTransform="uppercase"
                        letterSpacing="0.08em">Customer</Th>
                      <Th fontSize="10px" color={L.muted} fontWeight="700"
                        borderColor={L.border} textTransform="uppercase"
                        letterSpacing="0.08em" display={{ base: "none", md: "table-cell" }}>
                        Return
                      </Th>
                      <Th fontSize="10px" color={L.muted} fontWeight="700"
                        borderColor={L.border} textTransform="uppercase"
                        letterSpacing="0.08em">Amount</Th>
                      <Th fontSize="10px" color={L.muted} fontWeight="700"
                        borderColor={L.border} textTransform="uppercase"
                        letterSpacing="0.08em">Status</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {allBookings.length > 0 ? (
                      allBookings.map(b => <BookingRow key={b.id} booking={b} />)
                    ) : (
                      // Fallback demo rows
                      [
                        { id: "BK-001", vehicleName: "Mercedes GLE 450",  customerName: "James Kariuki",  endDate: "2025-03-18", totalAmount: 42000, status: "active"    },
                        { id: "BK-002", vehicleName: "Toyota Prado 2024", customerName: "Amara Ochieng",  endDate: "2025-03-20", totalAmount: 28000, status: "pending"   },
                        { id: "BK-003", vehicleName: "Range Rover Sport", customerName: "David Mwangi",   endDate: "2025-03-15", totalAmount: 65000, status: "active"    },
                        { id: "BK-004", vehicleName: "VW Tiguan",         customerName: "Cynthia Njeri",  endDate: "2025-03-22", totalAmount: 18000, status: "pending"   },
                        { id: "BK-005", vehicleName: "Toyota Camry",      customerName: "Peter Otieno",   endDate: "2025-03-10", totalAmount: 21000, status: "completed" },
                      ].map(b => <BookingRow key={b.id} booking={b} />)
                    )}
                  </Tbody>
                </Table>
              </Box>
            </Box>

            {/* Alerts & Notices */}
            <Box className="fu4" bg={L.card} borderRadius="20px" border="1px solid"
              borderColor={L.border} boxShadow={L.shadow} p={{ base: 5, md: 6 }}>
              <SectionHeader title="Alerts & Notices" sub="Items requiring attention" />

              <VStack spacing={3} align="stretch">
                {(metrics.pendingMaintenance || 0) > 0 && (
                  <AlertItem icon={FiAlertCircle} accent={L.red} bg={L.redBg}
                    title="Maintenance Required"
                    desc={`${metrics.pendingMaintenance} vehicle(s) are due for service.`} />
                )}
                {pendingBookings.length > 0 && (
                  <AlertItem icon={FiClock} accent={L.blue} bg={L.blueBg}
                    title="Pending Confirmations"
                    desc={`${pendingBookings.length} booking(s) awaiting your approval.`} />
                )}
                {(metrics.expiringInsurance || 0) > 0 && (
                  <AlertItem icon={FiShield} accent={L.orange} bg={L.orangeBg}
                    title="Insurance Expiring"
                    desc={`${metrics.expiringInsurance} vehicle(s) expire within 30 days.`} />
                )}
                {(metrics.pendingMaintenance || 0) === 0 &&
                  pendingBookings.length === 0 &&
                  (metrics.expiringInsurance || 0) === 0 && (
                  <AlertItem icon={FiCheckCircle} accent={L.accentLight} bg={L.accentGlow}
                    title="All Systems Operational"
                    desc="No alerts or issues. Your fleet is running smoothly." />
                )}

                {/* Fleet snapshot */}
                <Box mt={2} p={4} bg={L.pageBg} borderRadius="16px"
                  border="1px solid" borderColor={L.border}>
                  <Text fontSize="12px" fontWeight="700" color={L.muted}
                    textTransform="uppercase" letterSpacing="0.08em" mb={3}>
                    Fleet Snapshot
                  </Text>
                  <SimpleGrid columns={2} spacing={3}>
                    {[
                      { l: "Total Fleet",  v: metrics.totalVehicles   || 0,  c: L.text        },
                      { l: "On Road",      v: metrics.activeRentals   || 0,  c: L.accentLight },
                      { l: "Available",    v: metrics.availableVehicles || 0, c: L.blue       },
                      { l: "In Service",   v: metrics.pendingMaintenance || 0, c: L.red       },
                    ].map(({ l, v, c }) => (
                      <Box key={l} textAlign="center" bg={L.card} p={3}
                        borderRadius="12px" border="1px solid" borderColor={L.border}>
                        <Text fontSize="22px" fontWeight="800" color={c} lineHeight="1">{v}</Text>
                        <Text fontSize="10px" color={L.muted} fontWeight="600" mt={0.5}>{l}</Text>
                      </Box>
                    ))}
                  </SimpleGrid>
                </Box>
              </VStack>
            </Box>
          </Grid>

          {/* ── BOTTOM: FLEET PHOTO STRIP ── */}
          <Box className="fu5" bg={L.card} borderRadius="20px" border="1px solid"
            borderColor={L.border} boxShadow={L.shadow} overflow="hidden" mb={4}>
            <Flex align="center" justify="space-between" px={{ base: 5, md: 6 }} py={4}>
              <Box>
                <Text fontSize="15px" fontWeight="800" color={L.text}>Featured Fleet</Text>
                <Text fontSize="12px" color={L.muted} mt={0.5}>Your top-performing vehicles this month</Text>
              </Box>
              <Button size="xs" variant="ghost" color={L.accentLight} fontWeight="700"
                _hover={{ bg: L.accentGlow }} borderRadius="full">
                Manage Fleet →
              </Button>
            </Flex>
            <Flex gap={0} overflowX="auto"
              sx={{ "&::-webkit-scrollbar": { h: "4px" }, "&::-webkit-scrollbar-thumb": { bg: L.accentGlow2, borderRadius: "full" } }}>
              {[
                { name: "Mercedes GLE 450",  plate: "KDD 345A", img: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=400&h=260&fit=crop", revenue: "KSh 84K", util: 92 },
                { name: "Range Rover Sport", plate: "KCB 210X", img: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=260&fit=crop", revenue: "KSh 130K", util: 85 },
                { name: "Toyota Prado 2024", plate: "KDD 892Z", img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=260&fit=crop", revenue: "KSh 56K", util: 78 },
                { name: "VW Tiguan",         plate: "KBZ 441P", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=260&fit=crop", revenue: "KSh 36K", util: 61 },
              ].map((v, i) => (
                <Box key={i} flexShrink={0} w={{ base: "220px", md: "25%" }} position="relative"
                  borderRight="1px solid" borderColor={L.border}
                  _last={{ borderRight: "none" }}
                  overflow="hidden" cursor="pointer"
                  role="group">
                  <Box h="140px" overflow="hidden">
                    <Image src={v.img} w="100%" h="100%" objectFit="cover"
                      transition="transform 0.4s ease"
                      _groupHover={{ transform: "scale(1.06)" }} />
                    <Box position="absolute" top={0} left={0} right={0} h="140px"
                      bg="linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.5) 100%)" />
                    <Box position="absolute" top={3} right={3}
                      bg="rgba(255,255,255,0.9)" backdropFilter="blur(8px)"
                      borderRadius="full" px={2} py={0.5}>
                      <Text fontSize="9px" fontWeight="800" color={L.accentLight}>{v.util}%</Text>
                    </Box>
                  </Box>
                  <Box p={4} bg={L.card}>
                    <Text fontSize="13px" fontWeight="800" color={L.text} noOfLines={1}>{v.name}</Text>
                    <Flex justify="space-between" align="center" mt={1}>
                      <Text fontSize="10px" color={L.muted}>{v.plate}</Text>
                      <Text fontSize="12px" fontWeight="700" color={L.accentLight}>{v.revenue}</Text>
                    </Flex>
                  </Box>
                </Box>
              ))}
            </Flex>
          </Box>

        </Container>
      </Box>
    </>
  );
};