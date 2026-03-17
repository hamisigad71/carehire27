"use client";

import React, { useState, useMemo } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
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
  Checkbox,
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
  Textarea,
  Flex,
  Circle,
  Divider,
  InputGroup,
  InputLeftElement,
  Spacer,
  Image,
  Grid,
} from "@chakra-ui/react";
import { FiSearch, FiFilter, FiMoreVertical, FiEdit, FiTrash2, FiCalendar, FiAlertTriangle, FiDownload, FiPlus, FiChevronDown, FiShield, FiActivity, FiCheckCircle, FiClock, FiAlertCircle, FiEye, FiX } from "react-icons/fi";
import { useBusinessContext, Vehicle } from "@/context/BusinessContext";
import { useColorTokens } from "@/hooks/useColorTokens";
import { FaCar } from "react-icons/fa";

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
  blue: "#1a56a0",
  blueBg: "rgba(26,86,160,0.08)",
  gold: "#b07d0a",
  goldBg: "rgba(176,125,10,0.1)",
  red: "#c0392b",
  redBg: "rgba(192,57,43,0.08)",
  orange: "#c05c00",
  orangeBg: "rgba(192,92,0,0.08)",
  inputBg: "#f8faf8",
  inputBorder: "rgba(30,110,30,0.2)",
};

// ─── STYLES ───────────────────────────────────────────────────────────────────
const Styles = () => (
  <style>{`
    @keyframes fadeUp {
      from { opacity:0; transform:translateY(14px); }
      to   { opacity:1; transform:translateY(0); }
    }
    .fu  { animation: fadeUp .5s ease both; }
    .fu1 { animation: fadeUp .5s .06s ease both; }
    .fu2 { animation: fadeUp .5s .12s ease both; }

    .fleet-row { transition: background 0.15s ease; }
    .fleet-row:hover { background: rgba(30,110,30,0.03) !important; }

    .stat-card { transition: transform 0.22s ease, box-shadow 0.22s ease; }
    .stat-card:hover { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(0,0,0,0.1) !important; }

    .action-btn { transition: all 0.18s ease !important; }
    .action-btn:hover { transform: translateY(-1px) !important; }

    .filter-select, .search-input {
      transition: border-color 0.2s ease, box-shadow 0.2s ease !important;
    }
    .filter-select:focus, .search-input:focus {
      border-color: ${L.accentLight} !important;
      box-shadow: 0 0 0 3px rgba(30,110,30,0.12) !important;
    }

    .bulk-bar {
      animation: fadeUp 0.3s ease both;
    }
  `}</style>
);

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface MaintenanceRecord {
  id: string;
  date: string;
  type: string;
  cost: number;
  notes: string;
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function getStatusStyle(status: string) {
  switch (status) {
    case "available":
      return {
        color: L.accentLight,
        bg: L.accentGlow2,
        dot: L.accentLight,
        label: "Available",
      };
    case "rented":
      return { color: L.blue, bg: L.blueBg, dot: L.blue, label: "On Rent" };
    case "maintenance":
      return {
        color: L.orange,
        bg: L.orangeBg,
        dot: L.orange,
        label: "Service",
      };
    default:
      return { color: L.muted, bg: L.accentGlow, dot: L.muted, label: status };
  }
}

function getInsuranceStyle(dateStr: string) {
  const days = Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86400000);
  if (days < 0) return { label: "Expired", color: L.red, bg: L.redBg };
  if (days < 30)
    return { label: "Expiring Soon", color: L.orange, bg: L.orangeBg };
  return { label: "Active", color: L.accentLight, bg: L.accentGlow2 };
}

// ─── SUB: STAT CARDS ──────────────────────────────────────────────────────────
function StatCards({ vehicles }: { vehicles: Vehicle[] }) {
  const total = vehicles.length;
  const available = vehicles.filter((v) => v.status === "available").length;
  const rented = vehicles.filter((v) => v.status === "rented").length;
  const maintenance = vehicles.filter((v) => v.status === "maintenance").length;

  const stats = [
    {
      label: "Total Fleet",
      value: total,
      icon: FaCar,
      accent: L.accentLight,
      bg: L.accentGlow2,
    },
    {
      label: "Available",
      value: available,
      icon: FiCheckCircle,
      accent: L.accentLight,
      bg: L.accentGlow,
    },
    {
      label: "On Rent",
      value: rented,
      icon: FiActivity,
      accent: L.blue,
      bg: L.blueBg,
    },
    {
      label: "In Service",
      value: maintenance,
      icon: FiAlertCircle,
      accent: L.orange,
      bg: L.orangeBg,
    },
  ];

  return (
    <Flex gap={4} mb={6} flexWrap="wrap">
      {stats.map((s, i) => (
        <Box
          key={i}
          className="stat-card fu"
          bg={L.card}
          borderRadius="18px"
          border="1px solid"
          borderColor={L.cardBorder}
          boxShadow={L.shadow}
          p={5}
          flex={{ base: "calc(50% - 8px)", md: "calc(25% - 12px)" }}
        >
          <Flex justify="space-between" align="flex-start" mb={3}>
            <Circle size="38px" bg={s.bg}>
              <Icon as={s.icon} boxSize={4} color={s.accent} />
            </Circle>
          </Flex>
          <Text
            fontSize={{ base: "26px", md: "30px" }}
            fontWeight="800"
            color={L.text}
            letterSpacing="-0.03em"
            lineHeight="1"
          >
            {s.value}
          </Text>
          <Text fontSize="12px" fontWeight="600" color={L.muted} mt={1}>
            {s.label}
          </Text>
        </Box>
      ))}
    </Flex>
  );
}

// ─── SUB: STATUS PILL ─────────────────────────────────────────────────────────
function StatusPill({ status }: { status: string }) {
  const s = getStatusStyle(status);
  return (
    <HStack
      spacing={1.5}
      bg={s.bg}
      borderRadius="full"
      px={2.5}
      py={1}
      display="inline-flex"
    >
      <Box w="6px" h="6px" borderRadius="full" bg={s.dot} />
      <Text fontSize="11px" fontWeight="700" color={s.color}>
        {s.label}
      </Text>
    </HStack>
  );
}

// ─── SUB: INSURANCE PILL ──────────────────────────────────────────────────────
function InsurancePill({ date }: { date: string }) {
  const s = getInsuranceStyle(date);
  return (
    <Box bg={s.bg} borderRadius="full" px={2.5} py={1} display="inline-block">
      <Text fontSize="11px" fontWeight="700" color={s.color}>
        {s.label}
      </Text>
    </Box>
  );
}

// ─── SUB: EMPTY STATE ─────────────────────────────────────────────────────────
function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <Flex direction="column" align="center" justify="center" py={16} gap={3}>
      <Circle size="64px" bg={L.accentGlow}>
        <Icon as={FaCar} boxSize={7} color={L.accentLight} />
      </Circle>
      <Text fontSize="16px" fontWeight="700" color={L.text}>
        No vehicles found
      </Text>
      <Text fontSize="13px" color={L.muted}>
        Try adjusting your search or filters
      </Text>
      <Button
        size="sm"
        variant="ghost"
        color={L.accentLight}
        onClick={onClear}
        fontWeight="700"
        _hover={{ bg: L.accentGlow }}
      >
        Clear filters
      </Button>
    </Flex>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export const AdvancedFleetManagement = () => {
  const { vehicles, updateVehicle, deleteVehicle } = useBusinessContext();
  const toast = useToast();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [maintenanceHistory, setMaintenanceHistory] = useState<
    Record<string, MaintenanceRecord[]>
  >({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeVehicle, setActiveVehicle] = useState<Vehicle | null>(null);
  const [form, setForm] = useState({ type: "", date: "", cost: "", notes: "" });
  const setF = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const filtered = useMemo(
    () =>
      vehicles.filter((v) => {
        const q = search.toLowerCase();
        const matchQ =
          v.brand.toLowerCase().includes(q) ||
          v.model.toLowerCase().includes(q) ||
          v.licensePlate.toLowerCase().includes(q);
        return matchQ && (statusFilter === "all" || v.status === statusFilter);
      }),
    [vehicles, search, statusFilter],
  );

  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  };

  const toggleAll = (checked: boolean) => {
    setSelected(checked ? new Set(filtered.map((v) => v.id)) : new Set());
  };

  const bulkStatus = (status: Vehicle["status"]) => {
    selected.forEach((id) => updateVehicle(id, { status }));
    toast({
      title: `Updated ${selected.size} vehicle(s)`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setSelected(new Set());
  };

  const handleDelete = (id: string) => {
    deleteVehicle(id);
    toast({
      title: "Vehicle removed",
      status: "success",
      duration: 2500,
      isClosable: true,
    });
  };

  const handleSchedule = () => {
    if (!activeVehicle || !form.type || !form.date) {
      toast({
        title: "Please complete required fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setMaintenanceHistory((prev) => ({
      ...prev,
      [activeVehicle.id]: [
        ...(prev[activeVehicle.id] || []),
        {
          id: `M${Date.now()}`,
          date: form.date,
          type: form.type,
          cost: parseInt(form.cost) || 0,
          notes: form.notes,
        },
      ],
    }));
    updateVehicle(activeVehicle.id, { status: "maintenance" });
    toast({
      title: "Maintenance scheduled",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setForm({ type: "", date: "", cost: "", notes: "" });
    onClose();
  };

  // Demo data fallback
  const displayVehicles: Vehicle[] =
    filtered.length > 0
      ? filtered
      : [
          {
            id: "v1",
            brand: "Mercedes",
            model: "GLE 450",
            year: 2024,
            licensePlate: "KDD 345A",
            status: "available",
            dailyRate: 12000,
            mileage: 18500,
            seats: 5,
            insurance: "2025-12-01",
            nextService: "2025-04-15",
            lastService: "2024-12-15",
            transmission: "auto",
            fuelType: "Petrol",
          },
          {
            id: "v2",
            brand: "Toyota",
            model: "Prado 2024",
            year: 2024,
            licensePlate: "KDD 892Z",
            status: "rented",
            dailyRate: 8500,
            mileage: 22000,
            seats: 7,
            insurance: "2025-11-20",
            nextService: "2025-05-01",
            lastService: "2024-11-10",
            transmission: "auto",
            fuelType: "Diesel",
          },
          {
            id: "v3",
            brand: "Range Rover",
            model: "Sport",
            year: 2023,
            licensePlate: "KCB 210X",
            status: "maintenance",
            dailyRate: 18000,
            mileage: 31000,
            seats: 5,
            insurance: "2025-03-20",
            nextService: "2025-03-18",
            lastService: "2024-10-20",
            transmission: "auto",
            fuelType: "Diesel",
          },
          {
            id: "v4",
            brand: "VW",
            model: "Tiguan",
            year: 2023,
            licensePlate: "KBZ 441P",
            status: "available",
            dailyRate: 7800,
            mileage: 15200,
            seats: 5,
            insurance: "2025-09-30",
            nextService: "2025-06-10",
            lastService: "2024-09-15",
            transmission: "auto",
            fuelType: "Petrol",
          },
          {
            id: "v5",
            brand: "Toyota",
            model: "Camry 2024",
            year: 2024,
            licensePlate: "KDD 109F",
            status: "rented",
            dailyRate: 6500,
            mileage: 9800,
            seats: 5,
            insurance: "2026-01-15",
            nextService: "2025-07-20",
            lastService: "2025-01-10",
            transmission: "auto",
            fuelType: "Hybrid",
          },
        ];

  const allChecked =
    selected.size === displayVehicles.length && displayVehicles.length > 0;
  const someChecked = selected.size > 0 && !allChecked;

  return (
    <>
      <Styles />
      <Box bg={L.bg} minH="100vh" py={{ base: 5, md: 8 }}>
        <Container maxW="1400px" px={{ base: 4, md: 6, lg: 8 }}>
          {/* ── PAGE HEADER ── */}
          <Flex
            align="flex-start"
            justify="space-between"
            mb={7}
            flexDir={{ base: "column", md: "row" }}
            gap={4}
            className="fu"
          >
            <Box>
              <HStack spacing={3} mb={1}>
                <Circle size="40px" bg={L.accentGlow2}>
                  <Icon as={FaCar} boxSize={5} color={L.accentLight} />
                </Circle>
                <Heading
                  fontSize={{ base: "22px", md: "28px" }}
                  fontWeight="800"
                  color={L.text}
                  letterSpacing="-0.02em"
                >
                  Fleet Management
                </Heading>
              </HStack>
              <Text fontSize="13px" color={L.muted} ml="52px">
                Manage vehicles, maintenance schedules, and fleet operations
              </Text>
            </Box>

            <HStack spacing={3} flexShrink={0}>
              <Button
                className="action-btn"
                size="sm"
                variant="outline"
                fontWeight="700"
                fontSize="13px"
                borderColor={L.cardBorder}
                color={L.muted}
                borderRadius="12px"
                leftIcon={<Icon as={FiDownload} boxSize={3.5} />}
                _hover={{
                  bg: L.accentGlow,
                  borderColor: L.accentLight,
                  color: L.accentLight,
                }}
              >
                Export
              </Button>
              <Button
                className="action-btn"
                size="sm"
                bg={L.accent}
                color="white"
                fontWeight="700"
                fontSize="13px"
                borderRadius="12px"
                leftIcon={<Icon as={FiPlus} boxSize={3.5} />}
                _hover={{ bg: L.accentLight, transform: "translateY(-2px)" }}
                boxShadow="0 4px 16px rgba(30,110,30,0.3)"
              >
                Add Vehicle
              </Button>
            </HStack>
          </Flex>

          {/* ── STAT CARDS ── */}
          <StatCards vehicles={displayVehicles} />

          {/* ── FILTERS BAR ── */}
          <Box
            className="fu1"
            bg={L.card}
            borderRadius="20px"
            border="1px solid"
            borderColor={L.cardBorder}
            boxShadow={L.shadow}
            p={{ base: 4, md: 5 }}
            mb={5}
          >
            <Flex gap={3} flexWrap="wrap" align="center">
              {/* Search */}
              <InputGroup
                flex={{ base: "1 1 100%", md: "1 1 260px" }}
                maxW={{ md: "320px" }}
              >
                <InputLeftElement h="44px" pl={2} pointerEvents="none">
                  <Icon as={FiSearch} color={L.subtle} boxSize={4} />
                </InputLeftElement>
                <Input
                  className="search-input"
                  placeholder="Search brand, model, plate…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  h="44px"
                  bg={L.inputBg}
                  border="1px solid"
                  borderColor={L.inputBorder}
                  borderRadius="12px"
                  fontSize="13px"
                  color={L.text}
                  _placeholder={{ color: L.subtle }}
                  _focus={{ outline: "none" }}
                />
              </InputGroup>

              {/* Status filter */}
              <Select
                className="filter-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                h="44px"
                bg={L.inputBg}
                border="1px solid"
                borderColor={L.inputBorder}
                borderRadius="12px"
                fontSize="13px"
                color={L.text}
                w={{ base: "100%", sm: "180px" }}
                _focus={{ outline: "none" }}
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="rented">On Rent</option>
                <option value="maintenance">In Service</option>
              </Select>

              <Spacer display={{ base: "none", md: "block" }} />

              {/* Results count */}
              <Text
                fontSize="12px"
                color={L.muted}
                fontWeight="600"
                flexShrink={0}
              >
                {displayVehicles.length} vehicle
                {displayVehicles.length !== 1 ? "s" : ""} found
              </Text>
            </Flex>

            {/* Bulk action bar */}
            {selected.size > 0 && (
              <Flex
                className="bulk-bar"
                mt={4}
                pt={4}
                borderTop="1px solid"
                borderColor={L.border}
                align="center"
                justify="space-between"
                flexWrap="wrap"
                gap={3}
              >
                <HStack spacing={2}>
                  <Circle size="26px" bg={L.accentGlow2}>
                    <Text
                      fontSize="11px"
                      fontWeight="800"
                      color={L.accentLight}
                    >
                      {selected.size}
                    </Text>
                  </Circle>
                  <Text fontSize="13px" fontWeight="600" color={L.text}>
                    selected
                  </Text>
                  <Button
                    size="xs"
                    variant="ghost"
                    color={L.muted}
                    onClick={() => setSelected(new Set())}
                    _hover={{ color: L.red }}
                  >
                    <Icon as={FiX} boxSize={3} />
                  </Button>
                </HStack>
                <HStack spacing={2} flexWrap="wrap">
                  {[
                    {
                      label: "Mark Available",
                      status: "available" as Vehicle["status"],
                      color: L.accentLight,
                      bg: L.accentGlow2,
                    },
                    {
                      label: "Mark On Rent",
                      status: "rented" as Vehicle["status"],
                      color: L.blue,
                      bg: L.blueBg,
                    },
                    {
                      label: "Mark In Service",
                      status: "maintenance" as Vehicle["status"],
                      color: L.orange,
                      bg: L.orangeBg,
                    },
                  ].map(({ label, status, color, bg }) => (
                    <Button
                      key={label}
                      size="sm"
                      bg={bg}
                      color={color}
                      fontWeight="700"
                      fontSize="12px"
                      borderRadius="10px"
                      border="1px solid"
                      borderColor={`${color}30`}
                      _hover={{ opacity: 0.85 }}
                      onClick={() => bulkStatus(status)}
                    >
                      {label}
                    </Button>
                  ))}
                </HStack>
              </Flex>
            )}
          </Box>

          {/* ── FLEET TABLE ── */}
          <Box
            className="fu2"
            bg={L.card}
            borderRadius="20px"
            border="1px solid"
            borderColor={L.cardBorder}
            boxShadow={L.shadow}
            overflow="hidden"
          >
            {/* Table header */}
            <Flex
              px={{ base: 5, md: 6 }}
              py={4}
              align="center"
              justify="space-between"
              borderBottom="1px solid"
              borderColor={L.border}
            >
              <Text fontSize="15px" fontWeight="800" color={L.text}>
                Vehicles
                <Text
                  as="span"
                  fontSize="12px"
                  fontWeight="600"
                  color={L.muted}
                  ml={2}
                >
                  ({displayVehicles.length})
                </Text>
              </Text>
              <HStack spacing={2}>
                <Button
                  size="xs"
                  variant="ghost"
                  color={L.muted}
                  fontWeight="600"
                  leftIcon={<Icon as={FiFilter} boxSize={3} />}
                  _hover={{ bg: L.accentGlow }}
                >
                  Filters
                </Button>
              </HStack>
            </Flex>

            {displayVehicles.length > 0 ? (
              <Box overflowX="auto">
                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr bg={L.bg}>
                      <Th w="40px" borderColor={L.border} py={3}>
                        <Checkbox
                          isChecked={allChecked}
                          isIndeterminate={someChecked}
                          onChange={(e) => toggleAll(e.target.checked)}
                          colorScheme="green"
                          borderColor={L.subtle}
                        />
                      </Th>
                      {[
                        "Vehicle",
                        "Plate",
                        "Status",
                        "Daily Rate",
                        "Mileage",
                        "Insurance",
                        "Next Service",
                        "",
                      ].map((h) => (
                        <Th
                          key={h}
                          borderColor={L.border}
                          py={3}
                          fontSize="10px"
                          fontWeight="700"
                          color={L.muted}
                          textTransform="uppercase"
                          letterSpacing="0.08em"
                          whiteSpace="nowrap"
                          display={
                            h === "Next Service"
                              ? { base: "none", xl: "table-cell" }
                              : undefined
                          }
                        >
                          {h}
                        </Th>
                      ))}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {displayVehicles.map((v) => (
                      <Tr
                        key={v.id}
                        className="fleet-row"
                        borderBottom="1px solid"
                        borderColor={L.border}
                        bg={
                          selected.has(v.id)
                            ? "rgba(30,110,30,0.04)"
                            : "transparent"
                        }
                      >
                        <Td borderColor={L.border} py={4}>
                          <Checkbox
                            isChecked={selected.has(v.id)}
                            onChange={() => toggleOne(v.id)}
                            colorScheme="green"
                            borderColor={L.subtle}
                          />
                        </Td>

                        {/* Vehicle name */}
                        <Td borderColor={L.border} py={4} minW="180px">
                          <HStack spacing={3}>
                            <Circle
                              size="36px"
                              bg={L.accentGlow}
                              flexShrink={0}
                            >
                              <Icon
                                as={FaCar}
                                boxSize={4}
                                color={L.accentLight}
                              />
                            </Circle>
                            <Box>
                              <Text
                                fontSize="13px"
                                fontWeight="700"
                                color={L.text}
                                whiteSpace="nowrap"
                              >
                                {v.brand} {v.model}
                              </Text>
                              <Text fontSize="11px" color={L.muted}>
                                {v.year} · {v.seats} seats · {v.transmission}
                              </Text>
                            </Box>
                          </HStack>
                        </Td>

                        {/* Plate */}
                        <Td borderColor={L.border} py={4}>
                          <Box
                            bg={L.bg}
                            border="1px solid"
                            borderColor={L.border}
                            borderRadius="8px"
                            px={2.5}
                            py={1}
                            display="inline-block"
                          >
                            <Text
                              fontSize="12px"
                              fontWeight="700"
                              color={L.textSub}
                              letterSpacing="0.05em"
                            >
                              {v.licensePlate}
                            </Text>
                          </Box>
                        </Td>

                        {/* Status */}
                        <Td borderColor={L.border} py={4}>
                          <StatusPill status={v.status} />
                        </Td>

                        {/* Rate */}
                        <Td borderColor={L.border} py={4} whiteSpace="nowrap">
                          <Text fontSize="13px" fontWeight="700" color={L.text}>
                            KSh {v.dailyRate.toLocaleString()}
                          </Text>
                          <Text fontSize="10px" color={L.muted}>
                            per day
                          </Text>
                        </Td>

                        {/* Mileage */}
                        <Td borderColor={L.border} py={4}>
                          <Text
                            fontSize="13px"
                            color={L.textSub}
                            fontWeight="600"
                          >
                            {v.mileage.toLocaleString()} km
                          </Text>
                        </Td>

                        {/* Insurance */}
                        <Td borderColor={L.border} py={4}>
                          <InsurancePill date={v.insurance} />
                        </Td>

                        {/* Next service — hidden on smaller screens */}
                        <Td
                          borderColor={L.border}
                          py={4}
                          display={{ base: "none", xl: "table-cell" }}
                        >
                          <HStack spacing={1.5}>
                            <Icon as={FiClock} color={L.subtle} boxSize={3} />
                            <Text fontSize="12px" color={L.muted}>
                              {new Date(v.nextService).toLocaleDateString(
                                "en-KE",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "2-digit",
                                },
                              )}
                            </Text>
                          </HStack>
                        </Td>

                        {/* Actions */}
                        <Td borderColor={L.border} py={4}>
                          <Menu>
                            <MenuButton
                              as={Button}
                              size="sm"
                              variant="ghost"
                              color={L.subtle}
                              borderRadius="10px"
                              px={2}
                              _hover={{
                                bg: L.accentGlow,
                                color: L.accentLight,
                              }}
                            >
                              <Icon as={FiMoreVertical} boxSize={4} />
                            </MenuButton>
                            <MenuList
                              bg={L.card}
                              border="1px solid"
                              borderColor={L.cardBorder}
                              boxShadow={L.shadowMd}
                              borderRadius="14px"
                              p={1.5}
                              minW="180px"
                            >
                              <MenuItem
                                fontSize="13px"
                                fontWeight="600"
                                color={L.text}
                                icon={
                                  <Icon as={FiCalendar} color={L.accentLight} />
                                }
                                borderRadius="10px"
                                _hover={{ bg: L.accentGlow }}
                                onClick={() => {
                                  setActiveVehicle(v);
                                  onOpen();
                                }}
                              >
                                Schedule Maintenance
                              </MenuItem>
                              <MenuItem
                                fontSize="13px"
                                fontWeight="600"
                                color={L.text}
                                icon={<Icon as={FiEye} color={L.blue} />}
                                borderRadius="10px"
                                _hover={{ bg: L.blueBg }}
                              >
                                View Details
                              </MenuItem>
                              <MenuItem
                                fontSize="13px"
                                fontWeight="600"
                                color={L.text}
                                icon={<Icon as={FiEdit} color={L.gold} />}
                                borderRadius="10px"
                                _hover={{ bg: L.goldBg }}
                              >
                                Edit Vehicle
                              </MenuItem>
                              <Divider my={1.5} borderColor={L.border} />
                              <MenuItem
                                fontSize="13px"
                                fontWeight="600"
                                color={L.red}
                                icon={<Icon as={FiTrash2} color={L.red} />}
                                borderRadius="10px"
                                _hover={{ bg: L.redBg }}
                                onClick={() => handleDelete(v.id)}
                              >
                                Remove Vehicle
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            ) : (
              <EmptyState
                onClear={() => {
                  setSearch("");
                  setStatusFilter("all");
                }}
              />
            )}

            {/* Table footer */}
            {displayVehicles.length > 0 && (
              <Flex
                px={{ base: 5, md: 6 }}
                py={3.5}
                align="center"
                justify="space-between"
                borderTop="1px solid"
                borderColor={L.border}
                flexWrap="wrap"
                gap={2}
              >
                <Text fontSize="12px" color={L.muted}>
                  Showing {displayVehicles.length} of{" "}
                  {vehicles.length || displayVehicles.length} vehicles
                </Text>
                <HStack spacing={1}>
                  {["1", "2", "3"].map((p) => (
                    <Button
                      key={p}
                      size="xs"
                      borderRadius="8px"
                      fontWeight="700"
                      bg={p === "1" ? L.accentGlow2 : "transparent"}
                      color={p === "1" ? L.accentLight : L.muted}
                      border="1px solid"
                      borderColor={p === "1" ? L.cardBorder : "transparent"}
                      _hover={{ bg: L.accentGlow }}
                    >
                      {p}
                    </Button>
                  ))}
                </HStack>
              </Flex>
            )}
          </Box>
        </Container>
      </Box>

      {/* ── MAINTENANCE MODAL ── */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "full", md: "lg" }}
        isCentered
      >
        <ModalOverlay backdropFilter="blur(6px)" bg="blackAlpha.400" />
        <ModalContent
          bg={L.card}
          borderRadius={{ base: "0", md: "24px" }}
          border="1px solid"
          borderColor={L.cardBorder}
          boxShadow="0 32px 80px rgba(0,0,0,0.2)"
          mx={{ base: 0, md: 4 }}
        >
          {/* Modal header */}
          <Box
            bg={`linear-gradient(135deg, ${L.accent}, ${L.accentLight})`}
            px={6}
            pt={6}
            pb={5}
            borderRadius={{ base: "0", md: "24px 24px 0 0" }}
          >
            <ModalCloseButton color="white" top={4} right={4} />
            <HStack spacing={3} mb={1}>
              <Circle size="36px" bg="rgba(255,255,255,0.18)">
                <Icon as={FiCalendar} color="white" boxSize={4} />
              </Circle>
              <Box>
                <Text
                  fontSize="11px"
                  color="rgba(255,255,255,0.65)"
                  fontWeight="600"
                  textTransform="uppercase"
                  letterSpacing="0.1em"
                >
                  Schedule Service
                </Text>
                <Text fontSize="17px" fontWeight="800" color="white">
                  {activeVehicle?.brand} {activeVehicle?.model}
                </Text>
              </Box>
            </HStack>
          </Box>

          <ModalBody pt={6} pb={4} px={6}>
            <VStack spacing={5} align="stretch">
              <FormControl isRequired>
                <FormLabel
                  fontSize="12px"
                  fontWeight="700"
                  color={L.muted}
                  textTransform="uppercase"
                  letterSpacing="0.08em"
                  mb={2}
                >
                  Service Type
                </FormLabel>
                <Select
                  className="filter-select"
                  h="46px"
                  bg={L.inputBg}
                  border="1px solid"
                  borderColor={L.inputBorder}
                  borderRadius="12px"
                  fontSize="14px"
                  color={L.text}
                  placeholder="Select service type"
                  value={form.type}
                  onChange={(e) => setF("type", e.target.value)}
                  _focus={{ outline: "none" }}
                >
                  <option>Oil Change</option>
                  <option>Tyre Replacement</option>
                  <option>Battery Check</option>
                  <option>General Inspection</option>
                  <option>Brake Service</option>
                  <option>AC Service</option>
                  <option>Full Repair</option>
                </Select>
              </FormControl>

              <Grid templateColumns="1fr 1fr" gap={4}>
                <FormControl isRequired>
                  <FormLabel
                    fontSize="12px"
                    fontWeight="700"
                    color={L.muted}
                    textTransform="uppercase"
                    letterSpacing="0.08em"
                    mb={2}
                  >
                    Service Date
                  </FormLabel>
                  <Input
                    type="date"
                    h="46px"
                    bg={L.inputBg}
                    border="1px solid"
                    borderColor={L.inputBorder}
                    borderRadius="12px"
                    fontSize="14px"
                    color={L.text}
                    value={form.date}
                    onChange={(e) => setF("date", e.target.value)}
                    _focus={{
                      outline: "none",
                      borderColor: L.accentLight,
                      boxShadow: `0 0 0 3px rgba(30,110,30,0.12)`,
                    }}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel
                    fontSize="12px"
                    fontWeight="700"
                    color={L.muted}
                    textTransform="uppercase"
                    letterSpacing="0.08em"
                    mb={2}
                  >
                    Est. Cost (KSh)
                  </FormLabel>
                  <Input
                    type="number"
                    placeholder="0"
                    h="46px"
                    bg={L.inputBg}
                    border="1px solid"
                    borderColor={L.inputBorder}
                    borderRadius="12px"
                    fontSize="14px"
                    color={L.text}
                    value={form.cost}
                    onChange={(e) => setF("cost", e.target.value)}
                    _focus={{
                      outline: "none",
                      borderColor: L.accentLight,
                      boxShadow: `0 0 0 3px rgba(30,110,30,0.12)`,
                    }}
                  />
                </FormControl>
              </Grid>

              <FormControl>
                <FormLabel
                  fontSize="12px"
                  fontWeight="700"
                  color={L.muted}
                  textTransform="uppercase"
                  letterSpacing="0.08em"
                  mb={2}
                >
                  Notes
                </FormLabel>
                <Textarea
                  placeholder="Describe the work to be done…"
                  rows={3}
                  bg={L.inputBg}
                  border="1px solid"
                  borderColor={L.inputBorder}
                  borderRadius="12px"
                  fontSize="14px"
                  color={L.text}
                  value={form.notes}
                  onChange={(e) => setF("notes", e.target.value)}
                  resize="none"
                  _focus={{
                    outline: "none",
                    borderColor: L.accentLight,
                    boxShadow: `0 0 0 3px rgba(30,110,30,0.12)`,
                  }}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter px={6} pb={6} pt={2} gap={3}>
            <Button
              flex={1}
              h="46px"
              variant="outline"
              borderColor={L.cardBorder}
              color={L.muted}
              borderRadius="14px"
              fontWeight="700"
              fontSize="14px"
              onClick={onClose}
              _hover={{ bg: L.bg }}
            >
              Cancel
            </Button>
            <Button
              flex={2}
              h="46px"
              bg={L.accent}
              color="white"
              borderRadius="14px"
              fontWeight="700"
              fontSize="14px"
              leftIcon={<Icon as={FiCalendar} boxSize={4} />}
              onClick={handleSchedule}
              _hover={{ bg: L.accentLight, transform: "translateY(-2px)" }}
              boxShadow="0 4px 16px rgba(30,110,30,0.3)"
              transition="all 0.2s ease"
            >
              Confirm Maintenance
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
