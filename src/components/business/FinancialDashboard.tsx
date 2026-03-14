"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Icon,
  Circle,
  Grid,
  Image,
} from "@chakra-ui/react";
import {
  FiDollarSign,
  FiTrendingUp,
  FiDownload,
  FiCalendar,
  FiFileText,
  FiBarChart2,
  FiCreditCard,
  FiArrowUp,
  FiArrowDown,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiSmartphone,
  FiActivity,
  FiZap,
  FiPieChart,
  FiRefreshCw,
  FiPackage,
} from "react-icons/fi";

// ─── LIGHT TOKENS (original palette) ─────────────────────────────────────────
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

    .kpi-card {
      transition: transform .28s cubic-bezier(.22,1,.36,1), box-shadow .28s ease;
    }
    .kpi-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 16px 48px rgba(0,0,0,0.1) !important;
    }

    .tab-pill {
      cursor: pointer;
      transition: all .2s ease;
      border-radius: 12px;
    }
    .tab-pill:hover:not(.active) {
      background: ${L.accentGlow} !important;
      color: ${L.textSub} !important;
    }
    .tab-pill.active {
      background: ${L.accentGlow2} !important;
      color: ${L.accentLight} !important;
      box-shadow: inset 0 0 0 1px ${L.borderMid};
    }

    .bar-col {
      transition: filter .2s ease;
      transform-origin: bottom;
    }
    .bar-col:hover { filter: brightness(1.08); }

    .row-hover {
      transition: background .15s ease, transform .15s ease;
    }
    .row-hover:hover {
      background: ${L.accentGlow} !important;
      transform: translateX(4px);
    }

    .dl-btn {
      transition: all .22s ease !important;
    }
    .dl-btn:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 10px 28px rgba(30,110,30,0.22) !important;
    }

    .period-btn {
      cursor: pointer;
      transition: all .2s ease;
      border-radius: 10px;
      font-weight: 700;
      font-size: 12px;
    }
    .period-btn.active {
      background: ${L.accentGlow2};
      color: ${L.accentLight};
      box-shadow: inset 0 0 0 1px ${L.borderMid};
    }
    .period-btn:not(.active):hover {
      background: ${L.accentGlow};
      color: ${L.textSub};
    }

    .refresh-icon { transition: transform .3s ease; }
    .refresh-icon:hover { transform: rotate(180deg); cursor: pointer; }

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
  `}</style>
);

// ─── DEMO DATA ────────────────────────────────────────────────────────────────
const DEMO_REVENUE = [
  { name: "October", revenue: 320000 },
  { name: "November", revenue: 410000 },
  { name: "December", revenue: 380000 },
  { name: "January", revenue: 450000 },
  { name: "February", revenue: 390000 },
  { name: "March", revenue: 488000 },
];

const DEMO_VEHICLE_REV = [
  { vehicle: "Mercedes GLE 450", revenue: 168000, bookings: 7, trend: 14.2 },
  { vehicle: "Range Rover Sport", revenue: 130000, bookings: 5, trend: 8.7 },
  { vehicle: "Toyota Prado 2024", revenue: 85000, bookings: 9, trend: 5.1 },
  { vehicle: "VW Tiguan", revenue: 62000, bookings: 8, trend: -2.3 },
  { vehicle: "Toyota Camry", revenue: 43000, bookings: 11, trend: 11.8 },
];

const DEMO_PAYMENTS = { paid: 38, pending: 6, failed: 2, totalAmount: 488000 };

const PAYMENT_METHODS = [
  {
    method: "M-Pesa",
    icon: FiSmartphone,
    amount: 292800,
    pct: 60,
    color: L.accentLight,
    bg: L.accentGlow2,
    border: L.borderMid,
  },
  {
    method: "Card Payment",
    icon: FiCreditCard,
    amount: 156200,
    pct: 32,
    color: L.blue,
    bg: L.blueBg,
    border: L.blueBorder,
  },
  {
    method: "Bank Transfer",
    icon: FiDollarSign,
    amount: 39000,
    pct: 8,
    color: L.teal,
    bg: L.tealBg,
    border: L.tealBorder,
  },
];

const REPORTS = [
  {
    icon: FiBarChart2,
    title: "Revenue Report",
    desc: "Detailed revenue analysis and trends",
    period: "Last 30 days",
    color: L.accentLight,
    bg: L.accentGlow2,
    border: L.borderMid,
  },
  {
    icon: FiTrendingUp,
    title: "Performance Report",
    desc: "Vehicle and fleet performance metrics",
    period: "Last 30 days",
    color: L.blue,
    bg: L.blueBg,
    border: L.blueBorder,
  },
  {
    icon: FiCalendar,
    title: "Tax Report",
    desc: "Financial report for tax purposes",
    period: "Last quarter",
    color: L.gold,
    bg: L.goldBg,
    border: L.goldBorder,
  },
  {
    icon: FiFileText,
    title: "Booking Report",
    desc: "All bookings with payment breakdown",
    period: "This month",
    color: L.purple,
    bg: L.purpleBg,
    border: L.purpleBorder,
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function fmt(n: number) {
  if (n >= 1_000_000) return `KSh ${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `KSh ${(n / 1_000).toFixed(0)}K`;
  return `KSh ${n.toLocaleString()}`;
}
function fmtShort(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return `${n}`;
}

// ─── CARD ─────────────────────────────────────────────────────────────────────
function Card({ children, p = "7", className = "", ...rest }: any) {
  return (
    <Box
      bg={L.card}
      borderRadius="20px"
      border="1px solid"
      borderColor={L.cardBorder}
      boxShadow={L.shadow}
      p={{ base: 5, md: p }}
      position="relative"
      overflow="hidden"
      className={className}
      {...rest}
    >
      {/* subtle top-left accent */}
      <Box
        position="absolute"
        top={0}
        left={0}
        w="60px"
        h="60px"
        bg={`radial-gradient(circle at top left, ${L.accentGlow2}, transparent 70%)`}
        pointerEvents="none"
      />
      {children}
    </Box>
  );
}

// ─── SECTION HEADER ───────────────────────────────────────────────────────────
function SH({
  title,
  sub,
  action,
}: {
  title: string;
  sub?: string;
  action?: React.ReactNode;
}) {
  return (
    <Flex align="flex-start" justify="space-between" mb={5} gap={3}>
      <Box>
        <Text fontSize="15px" fontWeight="800" color={L.text}>
          {title}
        </Text>
        {sub && (
          <Text fontSize="12px" color={L.muted} mt={0.5}>
            {sub}
          </Text>
        )}
      </Box>
      {action}
    </Flex>
  );
}

// ─── KPI CARD ─────────────────────────────────────────────────────────────────
function KpiCard({
  label,
  value,
  subValue,
  icon,
  accent,
  accentBg,
  trend,
  trendUp,
}: {
  label: string;
  value: string;
  subValue?: string;
  icon: React.ElementType;
  accent: string;
  accentBg: string;
  trend: string;
  trendUp?: boolean;
}) {
  return (
    <Card className="kpi-card" p="6">
      <Flex justify="space-between" align="center" mb={5}>
        <Circle size="42px" bg={accentBg}>
          <Icon as={icon} boxSize={4.5} color={accent} />
        </Circle>
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
            {trend.split(" ")[0]}
          </Text>
        </HStack>
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
      {subValue && (
        <Text fontSize="11px" color={L.muted} mb={1.5}>
          {subValue}
        </Text>
      )}
      <Text fontSize="12px" fontWeight="600" color={L.muted}>
        {label}
      </Text>

      {/* decorative bottom bar */}
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
          style={{ width: "60%", opacity: 0.45 }}
        />
      </Box>
    </Card>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero({ total, net }: { total: number; net: number }) {
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
      minH={{ base: "180px", md: "215px" }}
      bg="linear-gradient(135deg, #1e6e1e 0%, #2d8c2d 55%, #52b852 100%)"
      boxShadow="0 16px 56px rgba(30,110,30,0.22), inset 0 1px 0 rgba(255,255,255,0.15)"
    >
      {/* subtle grid */}
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
        w="280px"
        h="280px"
        bg="radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 65%)"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        bottom="-50px"
        right="20%"
        w="200px"
        h="200px"
        bg="radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 65%)"
        pointerEvents="none"
      />

      {/* car */}
      <Box
        position="absolute"
        right={0}
        top={0}
        bottom={0}
        w={{ base: "130px", md: "320px" }}
        display={{ base: "none", sm: "block" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1563720223185-11003d516935?w=700&h=380&fit=crop"
          w="100%"
          h="100%"
          objectFit="cover"
          objectPosition="center 55%"
          style={{ filter: "brightness(0.55) contrast(1.05)" }}
        />
        <Box
          position="absolute"
          inset={0}
          bg="linear-gradient(90deg, rgba(30,110,30,0.95) 0%, rgba(30,110,30,0.6) 45%, transparent 100%)"
        />
      </Box>

      {/* content */}
      <Box
        position="relative"
        zIndex={2}
        px={{ base: 6, md: 10 }}
        py={{ base: 7, md: 9 }}
      >
        <HStack spacing={2} mb={4}>
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
            Financial Dashboard
          </Text>
          <Box w="1px" h="12px" bg="rgba(255,255,255,0.3)" />
          <Text fontSize="11px" color="rgba(255,255,255,0.6)">
            {today}
          </Text>
        </HStack>

        <Heading
          fontSize={{ base: "22px", md: "30px" }}
          fontWeight="800"
          color="white"
          letterSpacing="-0.02em"
          mb={1}
          lineHeight="1.15"
        >
          Revenue Overview
        </Heading>
        <Text fontSize="13px" color="rgba(255,255,255,0.65)" mb={6}>
          Current period financial performance
        </Text>

        <HStack spacing={{ base: 6, md: 12 }} flexWrap="wrap" gap={3}>
          {[
            { l: "Total Revenue", v: fmt(total) },
            { l: "Net Revenue", v: fmt(net) },
            { l: "Growth MTD", v: "+12.4%" },
            { l: "Transactions", v: "46" },
          ].map(({ l, v }) => (
            <Box key={l}>
              <Text
                fontSize={{ base: "18px", md: "22px" }}
                fontWeight="800"
                color="white"
                lineHeight="1"
              >
                {v}
              </Text>
              <Text fontSize="11px" color="rgba(255,255,255,0.6)" mt={0.5}>
                {l}
              </Text>
            </Box>
          ))}
        </HStack>
      </Box>

      {/* bottom shimmer */}
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

// ─── BAR CHART ────────────────────────────────────────────────────────────────
function BarChart({ data }: { data: typeof DEMO_REVENUE }) {
  const max = Math.max(...data.map((d) => d.revenue), 1);
  const avg = data.reduce((s, d) => s + d.revenue, 0) / data.length;

  return (
    <Box>
      <Flex align="flex-end" h="160px" mb={3} gap={2.5} position="relative">
        {/* avg line */}
        <Box
          position="absolute"
          left={0}
          right={0}
          style={{ bottom: `${(avg / max) * 160}px` }}
          borderTop="1px dashed"
          borderColor={L.accentGlow3}
          pointerEvents="none"
        >
          <Text
            fontSize="9px"
            fontWeight="700"
            color={L.accentLight}
            position="absolute"
            right={0}
            top={-4}
          >
            avg
          </Text>
        </Box>

        {data.map((d, i) => {
          const pct = (d.revenue / max) * 100;
          const isLast = i === data.length - 1;
          const isPeak = d.revenue === max;
          return (
            <Flex
              key={i}
              flexDir="column"
              align="center"
              flex={1}
              h="100%"
              justify="flex-end"
            >
              {isPeak && (
                <Text
                  fontSize="9px"
                  fontWeight="700"
                  color={L.accentLight}
                  mb={1.5}
                >
                  {fmtShort(d.revenue)}
                </Text>
              )}
              <Box
                className="bar-col"
                w="100%"
                borderRadius="8px 8px 0 0"
                position="relative"
                overflow="hidden"
                border="1px solid"
                borderBottomWidth={0}
                borderColor={isLast ? L.accentLight : L.border}
                bg={isLast ? "transparent" : L.accentGlow}
                style={{
                  height: `${Math.max(pct, 5)}%`,
                  transition: "height .7s cubic-bezier(.22,1,.36,1)",
                }}
              >
                {isLast && (
                  <Box
                    position="absolute"
                    inset={0}
                    bg={`linear-gradient(180deg, rgba(45,140,45,0.15) 0%, rgba(30,110,30,0.5) 100%)`}
                  />
                )}
              </Box>
            </Flex>
          );
        })}
      </Flex>

      <Flex gap={2.5}>
        {data.map((d, i) => (
          <Text
            key={i}
            flex={1}
            textAlign="center"
            fontSize="10px"
            fontWeight={i === data.length - 1 ? "700" : "500"}
            color={i === data.length - 1 ? L.accentLight : L.subtle}
          >
            {d.name.slice(0, 3)}
          </Text>
        ))}
      </Flex>
    </Box>
  );
}

// ─── REVENUE TAB ─────────────────────────────────────────────────────────────
function RevenueTab({
  period,
  setPeriod,
  data,
}: {
  period: string;
  setPeriod: (p: "week" | "month" | "year") => void;
  data: typeof DEMO_REVENUE;
}) {
  const max = Math.max(...data.map((d) => d.revenue), 1);
  const total = data.reduce((s, d) => s + d.revenue, 0);

  return (
    <Grid templateColumns={{ base: "1fr", lg: "7fr 4fr" }} gap={5}>
      <Card p="7">
        <Flex
          align="center"
          justify="space-between"
          mb={6}
          flexWrap="wrap"
          gap={3}
        >
          <Box>
            <Text fontSize="15px" fontWeight="800" color={L.text}>
              Revenue Trend
            </Text>
            <Text fontSize="12px" color={L.muted} mt={0.5}>
              Monthly performance breakdown
            </Text>
          </Box>
          <HStack spacing={1}>
            {(["week", "month", "year"] as const).map((p) => (
              <Box
                key={p}
                className={`period-btn${period === p ? " active" : ""}`}
                px={3}
                py={1.5}
                color={period === p ? L.accentLight : L.muted}
                onClick={() => setPeriod(p)}
              >
                {p === "week" ? "7D" : p === "month" ? "30D" : "1Y"}
              </Box>
            ))}
          </HStack>
        </Flex>

        <BarChart data={data} />

        <Flex
          mt={5}
          pt={5}
          borderTop="1px solid"
          borderColor={L.border}
          gap={6}
          flexWrap="wrap"
        >
          {[
            { l: "Period Total", v: fmt(total) },
            { l: "Peak Month", v: fmt(max) },
            { l: "MoM Growth", v: "+12.4%" },
          ].map(({ l, v }) => (
            <Box key={l}>
              <Text fontSize="11px" color={L.muted} mb={1}>
                {l}
              </Text>
              <Text fontSize="14px" fontWeight="800" color={L.text}>
                {v}
              </Text>
            </Box>
          ))}
        </Flex>
      </Card>

      <Card p="6">
        <SH title="Period Detail" sub="Revenue by time slot" />
        <VStack spacing={4} align="stretch">
          {data.map((d, i) => {
            const pct = Math.round((d.revenue / max) * 100);
            const isLatest = i === data.length - 1;
            return (
              <Box key={i}>
                <Flex justify="space-between" align="center" mb={1.5}>
                  <HStack spacing={2}>
                    {isLatest && (
                      <Box
                        w="6px"
                        h="6px"
                        borderRadius="full"
                        bg={L.accentLight}
                        flexShrink={0}
                      />
                    )}
                    <Text
                      fontSize="12px"
                      fontWeight={isLatest ? "700" : "600"}
                      color={isLatest ? L.text : L.textSub}
                    >
                      {d.name}
                    </Text>
                  </HStack>
                  <Text
                    fontSize="12px"
                    fontWeight="800"
                    color={isLatest ? L.accentLight : L.textSub}
                  >
                    {fmtShort(d.revenue)}
                  </Text>
                </Flex>
                <Box h="5px" className="progress-track">
                  <Box
                    className="progress-fill"
                    bg={
                      isLatest
                        ? `linear-gradient(90deg, ${L.accent}, ${L.accentLight})`
                        : L.accentGlow3
                    }
                    style={{ width: `${pct}%` }}
                  />
                </Box>
              </Box>
            );
          })}
        </VStack>
      </Card>
    </Grid>
  );
}

// ─── VEHICLE TAB ─────────────────────────────────────────────────────────────
const vehicleColors = [L.accentLight, L.blue, L.gold, L.purple, L.teal];

function VehicleRevenueTab({
  data,
  total,
}: {
  data: typeof DEMO_VEHICLE_REV;
  total: number;
}) {
  return (
    <Card p="0" overflow="hidden">
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
            Revenue by Vehicle
          </Text>
          <Text fontSize="12px" color={L.muted} mt={0.5}>
            Top earning vehicles this period
          </Text>
        </Box>
        <Button
          size="xs"
          h="32px"
          px={4}
          bg={L.accentGlow2}
          color={L.accentLight}
          borderRadius="full"
          fontWeight="700"
          fontSize="11px"
          border="1px solid"
          borderColor={L.borderMid}
          leftIcon={<Icon as={FiDownload} boxSize={3} />}
          _hover={{ bg: L.accentGlow3 }}
        >
          Export CSV
        </Button>
      </Flex>

      <Box overflowX="auto">
        <Table variant="unstyled" size="sm">
          <Thead>
            <Tr bg={L.bg}>
              {[
                "#",
                "Vehicle",
                "Revenue",
                "Bookings",
                "Market Share",
                "Trend",
              ].map((h) => (
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
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item, i) => {
              const pct =
                total > 0 ? ((item.revenue / total) * 100).toFixed(1) : "0";
              const color = vehicleColors[i % vehicleColors.length];
              const isUp = item.trend >= 0;
              return (
                <Tr
                  key={i}
                  className="row-hover"
                  borderBottom="1px solid"
                  borderColor={L.border}
                >
                  <Td py={4} px={{ base: 4, md: 6 }} borderColor="transparent">
                    <Circle size="22px" bg={L.accentGlow2}>
                      <Text
                        fontSize="9px"
                        fontWeight="800"
                        color={L.accentLight}
                      >
                        {i + 1}
                      </Text>
                    </Circle>
                  </Td>
                  <Td py={4} px={{ base: 4, md: 6 }} borderColor="transparent">
                    <HStack spacing={3}>
                      <Box
                        w="3px"
                        h="32px"
                        borderRadius="full"
                        bg={color}
                        flexShrink={0}
                      />
                      <Text fontSize="13px" fontWeight="700" color={L.text}>
                        {item.vehicle}
                      </Text>
                    </HStack>
                  </Td>
                  <Td py={4} px={{ base: 4, md: 6 }} borderColor="transparent">
                    <Text fontSize="13px" fontWeight="800" color={color}>
                      {fmt(item.revenue)}
                    </Text>
                  </Td>
                  <Td py={4} px={{ base: 4, md: 6 }} borderColor="transparent">
                    <Box
                      px={2.5}
                      py={1}
                      bg={L.accentGlow}
                      borderRadius="8px"
                      border="1px solid"
                      borderColor={L.border}
                      display="inline-block"
                    >
                      <Text fontSize="12px" fontWeight="700" color={L.textSub}>
                        {item.bookings} trips
                      </Text>
                    </Box>
                  </Td>
                  <Td
                    py={4}
                    px={{ base: 4, md: 6 }}
                    borderColor="transparent"
                    minW="140px"
                  >
                    <HStack spacing={2.5}>
                      <Box flex={1} h="5px" className="progress-track">
                        <Box
                          className="progress-fill"
                          bg={color}
                          style={{ width: `${pct}%`, opacity: 0.75 }}
                        />
                      </Box>
                      <Text
                        fontSize="11px"
                        fontWeight="700"
                        color={L.textSub}
                        minW="36px"
                      >
                        {pct}%
                      </Text>
                    </HStack>
                  </Td>
                  <Td py={4} px={{ base: 4, md: 6 }} borderColor="transparent">
                    <HStack
                      spacing={1.5}
                      px={2.5}
                      py={1}
                      borderRadius="8px"
                      bg={isUp ? L.accentGlow2 : L.redBg}
                      border="1px solid"
                      borderColor={isUp ? L.borderMid : L.redBorder}
                      w="fit-content"
                    >
                      <Icon
                        as={isUp ? FiArrowUp : FiArrowDown}
                        boxSize="9px"
                        color={isUp ? L.accentLight : L.red}
                      />
                      <Text
                        fontSize="10px"
                        fontWeight="700"
                        color={isUp ? L.accentLight : L.red}
                      >
                        {Math.abs(item.trend).toFixed(1)}%
                      </Text>
                    </HStack>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </Card>
  );
}

// ─── PAYMENT TAB ─────────────────────────────────────────────────────────────
function PaymentTab({ stats }: { stats: typeof DEMO_PAYMENTS }) {
  const statusItems = [
    {
      label: "Paid",
      count: stats.paid,
      amount: stats.totalAmount * 0.8,
      icon: FiCheckCircle,
      accent: L.accentLight,
      bg: L.accentGlow2,
      border: L.borderMid,
    },
    {
      label: "Pending",
      count: stats.pending,
      amount: stats.totalAmount * 0.15,
      icon: FiClock,
      accent: L.orange,
      bg: L.orangeBg,
      border: L.orangeBorder,
    },
    {
      label: "Failed",
      count: stats.failed,
      amount: 0,
      icon: FiAlertCircle,
      accent: L.red,
      bg: L.redBg,
      border: L.redBorder,
    },
  ];
  const total = stats.paid + stats.pending + stats.failed;
  const rate = Math.round((stats.paid / total) * 100);

  return (
    <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={5}>
      <Card p="7">
        <SH title="Payment Overview" sub="Current period breakdown" />
        <VStack spacing={3} align="stretch" mb={5}>
          {statusItems.map((s, i) => (
            <Flex
              key={i}
              align="center"
              p={4}
              borderRadius="16px"
              bg={s.bg}
              border="1px solid"
              borderColor={s.border}
              gap={4}
            >
              <Circle size="40px" bg={`${s.accent}18`}>
                <Icon as={s.icon} color={s.accent} boxSize={4} />
              </Circle>
              <Box flex={1}>
                <Flex justify="space-between" align="center">
                  <Text
                    fontSize="12px"
                    fontWeight="700"
                    color={s.accent}
                    textTransform="uppercase"
                    letterSpacing=".08em"
                  >
                    {s.label}
                  </Text>
                  <Text fontSize="13px" fontWeight="700" color={L.textSub}>
                    {fmt(s.amount)}
                  </Text>
                </Flex>
                <Text
                  fontSize="24px"
                  fontWeight="800"
                  color={s.accent}
                  lineHeight="1.2"
                  mt={0.5}
                >
                  {s.count}
                  <Text
                    as="span"
                    fontSize="12px"
                    fontWeight="500"
                    color={s.accent}
                    ml={1}
                  >
                    transactions
                  </Text>
                </Text>
              </Box>
            </Flex>
          ))}
        </VStack>

        <Box
          p={4}
          bg={L.bg}
          borderRadius="14px"
          border="1px solid"
          borderColor={L.border}
        >
          <Flex justify="space-between" align="center" mb={3}>
            <Text fontSize="12px" fontWeight="700" color={L.muted}>
              Collection Rate
            </Text>
            <Text fontSize="18px" fontWeight="800" color={L.accentLight}>
              {rate}%
            </Text>
          </Flex>
          <Box h="8px" className="progress-track">
            <Box
              className="progress-fill"
              bg={`linear-gradient(90deg, ${L.accent}, ${L.accentLight})`}
              style={{ width: `${rate}%` }}
            />
          </Box>
          <Flex justify="space-between" mt={2}>
            <Text fontSize="10px" color={L.muted}>
              {stats.paid} collected
            </Text>
            <Text fontSize="10px" color={L.muted}>
              {stats.pending + stats.failed} outstanding
            </Text>
          </Flex>
        </Box>
      </Card>

      <Card p="7">
        <SH title="Payment Methods" sub="How customers are paying" />
        <VStack spacing={3.5} align="stretch">
          {PAYMENT_METHODS.map((pm, i) => (
            <Box
              key={i}
              p={4}
              bg={pm.bg}
              borderRadius="16px"
              border="1px solid"
              borderColor={pm.border}
            >
              <Flex justify="space-between" align="center" mb={3}>
                <HStack spacing={3}>
                  <Circle size="34px" bg={`${pm.color}18`}>
                    <Icon as={pm.icon} color={pm.color} boxSize={3.5} />
                  </Circle>
                  <Box>
                    <Text fontSize="13px" fontWeight="700" color={L.text}>
                      {pm.method}
                    </Text>
                    <Text fontSize="11px" color={L.muted}>
                      {pm.pct}% of total
                    </Text>
                  </Box>
                </HStack>
                <Text fontSize="14px" fontWeight="800" color={pm.color}>
                  {fmt(pm.amount)}
                </Text>
              </Flex>
              <Box
                h="6px"
                bg={`${pm.color}18`}
                borderRadius="full"
                overflow="hidden"
              >
                <Box
                  h="100%"
                  borderRadius="full"
                  bg={pm.color}
                  style={{
                    width: `${pm.pct}%`,
                    transition: "width .8s cubic-bezier(.22,1,.36,1)",
                  }}
                />
              </Box>
            </Box>
          ))}
        </VStack>

        {/* volume split */}
        <Box
          mt={5}
          p={4}
          bg={L.bg}
          borderRadius="14px"
          border="1px solid"
          borderColor={L.border}
        >
          <Text fontSize="12px" fontWeight="700" color={L.muted} mb={3}>
            Volume Split
          </Text>
          <HStack spacing={0} h="10px" borderRadius="full" overflow="hidden">
            {PAYMENT_METHODS.map((pm, i) => (
              <Box
                key={i}
                h="100%"
                bg={pm.color}
                style={{ width: `${pm.pct}%`, opacity: 0.8 }}
              />
            ))}
          </HStack>
          <HStack spacing={4} mt={3} flexWrap="wrap">
            {PAYMENT_METHODS.map((pm, i) => (
              <HStack key={i} spacing={1.5}>
                <Box w="8px" h="8px" borderRadius="full" bg={pm.color} />
                <Text fontSize="10px" color={L.muted}>
                  {pm.method}
                </Text>
              </HStack>
            ))}
          </HStack>
        </Box>
      </Card>
    </Grid>
  );
}

// ─── REPORTS TAB ─────────────────────────────────────────────────────────────
function ReportsTab() {
  return (
    <VStack spacing={5} align="stretch">
      <Card p="0" overflow="hidden">
        <Flex
          px={{ base: 5, md: 7 }}
          py={5}
          align="center"
          justify="space-between"
          borderBottom="1px solid"
          borderColor={L.border}
          gap={3}
        >
          <Box>
            <Text fontSize="15px" fontWeight="800" color={L.text}>
              Generate Reports
            </Text>
            <Text fontSize="12px" color={L.muted} mt={0.5}>
              Download financial reports for any period
            </Text>
          </Box>
          <Circle
            size="32px"
            bg={L.accentGlow2}
            border="1px solid"
            borderColor={L.borderMid}
            cursor="pointer"
          >
            <Icon
              as={FiRefreshCw}
              boxSize={3.5}
              color={L.accentLight}
              className="refresh-icon"
            />
          </Circle>
        </Flex>

        <VStack spacing={0} align="stretch">
          {REPORTS.map((r, i) => (
            <Flex
              key={i}
              className="row-hover"
              align="center"
              px={{ base: 5, md: 7 }}
              py={5}
              gap={4}
              flexWrap="wrap"
              borderBottom={i < REPORTS.length - 1 ? "1px solid" : "none"}
              borderColor={L.border}
            >
              <Circle
                size="44px"
                bg={r.bg}
                flexShrink={0}
                border="1px solid"
                borderColor={r.border}
              >
                <Icon as={r.icon} boxSize={4.5} color={r.color} />
              </Circle>
              <Box flex={1} minW="180px">
                <Text fontSize="14px" fontWeight="800" color={L.text} mb={0.5}>
                  {r.title}
                </Text>
                <Text fontSize="12px" color={L.muted}>
                  {r.desc}
                </Text>
              </Box>
              <Box
                bg={r.bg}
                borderRadius="full"
                px={3}
                py={1}
                border="1px solid"
                borderColor={r.border}
              >
                <Text
                  fontSize="10px"
                  fontWeight="700"
                  color={r.color}
                  textTransform="uppercase"
                  letterSpacing=".08em"
                >
                  {r.period}
                </Text>
              </Box>
              <Button
                className="dl-btn"
                size="sm"
                h="36px"
                px={4}
                bg={r.bg}
                color={r.color}
                borderRadius="12px"
                fontWeight="700"
                fontSize="12px"
                border="1px solid"
                borderColor={r.border}
                leftIcon={<Icon as={FiDownload} boxSize={3.5} />}
                _hover={{ opacity: 0.9 }}
                flexShrink={0}
              >
                Download
              </Button>
            </Flex>
          ))}
        </VStack>
      </Card>

      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
        {[
          {
            label: "Reports Generated",
            value: "24",
            icon: FiFileText,
            color: L.accentLight,
            bg: L.accentGlow2,
          },
          {
            label: "Last Export",
            value: "Today",
            icon: FiZap,
            color: L.blue,
            bg: L.blueBg,
          },
          {
            label: "Tax Reports",
            value: "4",
            icon: FiPieChart,
            color: L.gold,
            bg: L.goldBg,
          },
          {
            label: "Scheduled",
            value: "2",
            icon: FiCalendar,
            color: L.purple,
            bg: L.purpleBg,
          },
        ].map((s, i) => (
          <Card key={i} p="5" textAlign="center">
            <Circle size="38px" bg={s.bg} mx="auto" mb={3}>
              <Icon as={s.icon} boxSize={4} color={s.color} />
            </Circle>
            <Text
              fontSize="24px"
              fontWeight="800"
              color={s.color}
              lineHeight="1"
            >
              {s.value}
            </Text>
            <Text fontSize="11px" fontWeight="600" color={L.muted} mt={1.5}>
              {s.label}
            </Text>
          </Card>
        ))}
      </SimpleGrid>
    </VStack>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export const FinancialDashboard = () => {
  const [period, setPeriod] = useState<"week" | "month" | "year">("month");
  const [activeTab, setActiveTab] = useState(0);

  const totalRevenue = 488000;
  const netRevenue = totalRevenue * 0.85;
  const avgBooking = 24400;
  const payStats = DEMO_PAYMENTS;
  const rate = Math.round(
    (payStats.paid / (payStats.paid + payStats.pending + payStats.failed)) *
      100,
  );

  const TABS = [
    { label: "Revenue Analysis", icon: FiBarChart2 },
    { label: "By Vehicle", icon: FiPackage },
    { label: "Payments", icon: FiCreditCard },
    { label: "Reports", icon: FiFileText },
  ];

  return (
    <>
      <Styles />
      <Box bg={L.bg} minH="100vh" py={{ base: 5, md: 8 }}>
        <Container maxW="1400px" px={{ base: 4, md: 6, lg: 8 }}>
          {/* HERO */}
          <Hero total={totalRevenue} net={netRevenue} />

          {/* KPIs */}
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={4} mb={7}>
            <Box className="fu">
              <KpiCard
                label="Total Revenue"
                value={fmt(totalRevenue)}
                icon={FiDollarSign}
                accent={L.accentLight}
                accentBg={L.accentGlow2}
                trend="+12% vs last month"
                trendUp
              />
            </Box>
            <Box className="fu1">
              <KpiCard
                label="Net Revenue"
                value={fmt(netRevenue)}
                subValue="After 15% commission"
                icon={FiTrendingUp}
                accent={L.blue}
                accentBg={L.blueBg}
                trend="+8.2%"
                trendUp
              />
            </Box>
            <Box className="fu2">
              <KpiCard
                label="Avg Booking Value"
                value={fmt(avgBooking)}
                icon={FiCreditCard}
                accent={L.gold}
                accentBg={L.goldBg}
                trend="+5.1%"
                trendUp
              />
            </Box>
            <Box className="fu3">
              <KpiCard
                label="Collection Rate"
                value={`${rate}%`}
                subValue={`${payStats.paid} paid · ${payStats.pending} pending`}
                icon={FiActivity}
                accent={L.purple}
                accentBg={L.purpleBg}
                trend="+3%"
                trendUp
              />
            </Box>
          </SimpleGrid>

          {/* TABS */}
          <Box
            className="fu4"
            mb={5}
            bg={L.card}
            borderRadius="20px"
            border="1px solid"
            borderColor={L.cardBorder}
            boxShadow={L.shadow}
          >
            <Flex
              px={3}
              py={2.5}
              gap={1}
              overflowX="auto"
              sx={{ "&::-webkit-scrollbar": { h: "0px" } }}
            >
              {TABS.map((tab, i) => (
                <Flex
                  key={tab.label}
                  className={`tab-pill${activeTab === i ? " active" : ""}`}
                  align="center"
                  gap={2}
                  px={{ base: 3, md: 4 }}
                  py={2.5}
                  color={activeTab === i ? L.accentLight : L.muted}
                  onClick={() => setActiveTab(i)}
                  whiteSpace="nowrap"
                >
                  <Icon as={tab.icon} boxSize={3.5} />
                  <Text fontSize="13px" fontWeight="700">
                    {tab.label}
                  </Text>
                </Flex>
              ))}
            </Flex>
          </Box>

          {/* CONTENT */}
          <Box>
            {activeTab === 0 && (
              <RevenueTab
                period={period}
                setPeriod={setPeriod}
                data={DEMO_REVENUE}
              />
            )}
            {activeTab === 1 && (
              <VehicleRevenueTab data={DEMO_VEHICLE_REV} total={totalRevenue} />
            )}
            {activeTab === 2 && <PaymentTab stats={payStats} />}
            {activeTab === 3 && <ReportsTab />}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default FinancialDashboard;
