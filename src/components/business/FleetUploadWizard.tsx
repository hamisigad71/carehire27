"use client";

import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  FormControl,
  FormLabel,
  Input,
  Select,
  Grid,
  Icon,
  useToast,
  Progress,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Circle,
  Divider,
  SimpleGrid,
  Spacer,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useColorTokens } from "@/hooks/useColorTokens";
import { useState, useRef } from "react";
import { FiUpload, FiCheck, FiAlertCircle, FiDownload, FiPlus, FiTrash2, FiArrowRight, FiInfo, FiCheckCircle, FiFile, FiX, FiStar, FiShield, FiCalendar, FiUsers, FiZap } from "react-icons/fi";
import { PageHeader } from "@/components/ui/PageHeader";
import { FaCar } from "react-icons/fa";

// ─── LIGHT TOKENS ─────────────────────────────────────────────────────────────
const L = {
  bg: "#f4f7f4",
  card: "#ffffff",
  cardBorder: "rgba(30,110,30,0.12)",
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
  blue: "#1a56a0",
  blueBg: "rgba(26,86,160,0.08)",
  red: "#c0392b",
  redBg: "rgba(192,57,43,0.08)",
  gold: "#b07d0a",
  goldBg: "rgba(176,125,10,0.1)",
};

// ─── STYLES ───────────────────────────────────────────────────────────────────
const Styles = () => (
  <style>{`
    @keyframes fadeUp {
      from { opacity:0; transform:translateY(14px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    @keyframes shimmer {
      0%   { background-position: -400px 0; }
      100% { background-position:  400px 0; }
    }
    @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:.5;} }

    .fu  { animation: fadeUp .5s ease both; }
    .fu1 { animation: fadeUp .5s .07s ease both; }
    .fu2 { animation: fadeUp .5s .14s ease both; }
    .fu3 { animation: fadeUp .5s .21s ease both; }

    .field-input {
      transition: border-color .2s ease, box-shadow .2s ease !important;
    }
    .field-input:focus {
      border-color: ${L.accentLight} !important;
      box-shadow: 0 0 0 3px rgba(30,110,30,0.12) !important;
      outline: none !important;
    }
    .field-input:hover { border-color: rgba(30,110,30,0.4) !important; }

    .tab-selected {
      background: ${L.accentGlow2} !important;
      color: ${L.accentLight} !important;
      border-color: ${L.cardBorder} !important;
    }

    .upload-zone {
      transition: all .25s ease;
      cursor: pointer;
    }
    .upload-zone:hover {
      border-color: ${L.accentLight} !important;
      background: ${L.accentGlow} !important;
    }
    .upload-zone.dragover {
      border-color: ${L.accentLight} !important;
      background: ${L.accentGlow2} !important;
      transform: scale(1.01);
    }

    .add-btn {
      transition: all .22s cubic-bezier(.25,.46,.45,.94) !important;
    }
    .add-btn:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 10px 28px rgba(30,110,30,0.32) !important;
    }

    .vehicle-row { transition: background .15s ease; }
    .vehicle-row:hover { background: rgba(30,110,30,0.03) !important; }

    .publish-btn {
      transition: all .22s ease !important;
    }
    .publish-btn:hover:not(:disabled) {
      transform: translateY(-2px) !important;
      box-shadow: 0 12px 32px rgba(30,110,30,0.4) !important;
    }

    .checklist-item { transition: transform .15s ease; }
    .checklist-item:hover { transform: translateX(3px); }

    .step-dot { transition: all .3s ease; }

    .progress-bar {
      background: linear-gradient(90deg, ${L.accent}, ${L.accentLight}, #52b852);
      background-size: 400px 100%;
      animation: shimmer 1.5s linear infinite;
    }
  `}</style>
);

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface Vehicle {
  brand: string;
  model: string;
  year: number;
  licensePlate: string;
  seats: number;
  transmission: string;
  fuelType: string;
  price: number;
}

const SAMPLE: Vehicle[] = [
  {
    brand: "Tesla",
    model: "Model 3",
    year: 2023,
    licensePlate: "KAB-123A",
    seats: 5,
    transmission: "Auto",
    fuelType: "Electric",
    price: 5000,
  },
  {
    brand: "BMW",
    model: "X5",
    year: 2023,
    licensePlate: "KAB-124B",
    seats: 7,
    transmission: "Auto",
    fuelType: "Petrol",
    price: 8500,
  },
  {
    brand: "Mercedes",
    model: "C-Class",
    year: 2022,
    licensePlate: "KAB-125C",
    seats: 5,
    transmission: "Auto",
    fuelType: "Petrol",
    price: 7200,
  },
];

const BLANK: Partial<Vehicle> = {
  brand: "",
  model: "",
  year: new Date().getFullYear(),
  licensePlate: "",
  seats: 5,
  transmission: "Auto",
  fuelType: "Petrol",
  price: 5000,
};

// ─── FIELD LABEL ─────────────────────────────────────────────────────────────
function FL({ children, required }: { children: string; required?: boolean }) {
  return (
    <FormLabel
      fontSize="11px"
      fontWeight="700"
      color={L.muted}
      textTransform="uppercase"
      letterSpacing="0.09em"
      mb={1.5}
    >
      {children}
      {required && (
        <Text as="span" color={L.red} ml={0.5}>
          *
        </Text>
      )}
    </FormLabel>
  );
}

// ─── STYLED INPUT ─────────────────────────────────────────────────────────────
function FInput(props: any) {
  return (
    <Input
      className="field-input"
      h="44px"
      bg={L.inputBg}
      border="1px solid"
      borderColor={L.inputBorder}
      borderRadius="12px"
      fontSize="14px"
      color={L.text}
      _placeholder={{ color: L.subtle }}
      _focus={{}}
      {...props}
    />
  );
}

function FSelect({ children, ...props }: any) {
  return (
    <Select
      className="field-input"
      h="44px"
      bg={L.inputBg}
      border="1px solid"
      borderColor={L.inputBorder}
      borderRadius="12px"
      fontSize="14px"
      color={L.text}
      _focus={{}}
      {...props}
    >
      {children}
    </Select>
  );
}

// ─── STATS ROW ────────────────────────────────────────────────────────────────
function StatsRow({ count }: { count: number }) {
  const stats = [
    { label: "Added", value: count, color: L.accentLight, icon: FaCar },
    { label: "Fuel Mix", value: "Auto", color: L.blue, icon: FiZap },
    {
      label: "Avg Rate",
      value: count ? "KSh 6.5K" : "—",
      color: L.gold,
      icon: FiStar,
    },
    {
      label: "Status",
      value: count ? "Ready" : "Pending",
      color: count ? L.accentLight : L.muted,
      icon: FiCheckCircle,
    },
  ];
  return (
    <SimpleGrid columns={{ base: 2, md: 4 }} spacing={3} mb={6}>
      {stats.map((s, i) => (
        <Box
          key={i}
          bg={L.card}
          borderRadius="16px"
          border="1px solid"
          borderColor={L.cardBorder}
          boxShadow={L.shadow}
          p={4}
        >
          <HStack spacing={2.5} mb={2}>
            <Circle size="32px" bg={L.accentGlow}>
              <Icon as={s.icon} boxSize={3.5} color={s.color} />
            </Circle>
            <Text fontSize="11px" fontWeight="600" color={L.muted}>
              {s.label}
            </Text>
          </HStack>
          <Text
            fontSize="22px"
            fontWeight="800"
            color={s.color}
            letterSpacing="-0.02em"
            lineHeight="1"
          >
            {s.value}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  );
}

// ─── MANUAL FORM ─────────────────────────────────────────────────────────────
function ManualForm({
  form,
  setForm,
  onAdd,
}: {
  form: Partial<Vehicle>;
  setForm: (v: Partial<Vehicle>) => void;
  onAdd: () => void;
}) {
  const set = (k: string, v: any) => setForm({ ...form, [k]: v });

  return (
    <VStack spacing={4} align="stretch">
      {/* Info banner */}
      <HStack
        spacing={3}
        bg={L.accentGlow}
        border="1px solid"
        borderColor={L.cardBorder}
        borderRadius="14px"
        px={4}
        py={3}
      >
        <Circle size="28px" bg={L.accentGlow2}>
          <Icon as={FiInfo} color={L.accentLight} boxSize={3.5} />
        </Circle>
        <Text fontSize="12px" color={L.textSub} lineHeight="1.6">
          Add vehicles one by one. All vehicles can be edited later from your
          fleet dashboard.
        </Text>
      </HStack>

      {/* Brand + Model */}
      <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr" }} gap={4}>
        <FormControl isRequired>
          <FL required>Brand</FL>
          <FInput
            placeholder="e.g., Toyota, BMW"
            value={form.brand || ""}
            onChange={(e: any) => set("brand", e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FL required>Model</FL>
          <FInput
            placeholder="e.g., X5, Prado"
            value={form.model || ""}
            onChange={(e: any) => set("model", e.target.value)}
          />
        </FormControl>
      </Grid>

      {/* Year + Plate */}
      <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr" }} gap={4}>
        <FormControl isRequired>
          <FL required>Year</FL>
          <FInput
            type="number"
            value={form.year || ""}
            onChange={(e: any) => set("year", parseInt(e.target.value))}
          />
        </FormControl>
        <FormControl isRequired>
          <FL required>License Plate</FL>
          <FInput
            placeholder="KAB-123A"
            value={form.licensePlate || ""}
            onChange={(e: any) =>
              set("licensePlate", e.target.value.toUpperCase())
            }
          />
        </FormControl>
      </Grid>

      {/* Seats + Transmission + Fuel */}
      <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr 1fr" }} gap={4}>
        <FormControl>
          <FL>Seats</FL>
          <FInput
            type="number"
            value={form.seats || 5}
            onChange={(e: any) => set("seats", parseInt(e.target.value))}
          />
        </FormControl>
        <FormControl>
          <FL>Transmission</FL>
          <FSelect
            value={form.transmission}
            onChange={(e: any) => set("transmission", e.target.value)}
          >
            <option>Auto</option>
            <option>Manual</option>
          </FSelect>
        </FormControl>
        <FormControl>
          <FL>Fuel Type</FL>
          <FSelect
            value={form.fuelType}
            onChange={(e: any) => set("fuelType", e.target.value)}
          >
            <option>Petrol</option>
            <option>Diesel</option>
            <option>Hybrid</option>
            <option>Electric</option>
          </FSelect>
        </FormControl>
      </Grid>

      {/* Daily Rate */}
      <FormControl isRequired>
        <FL required>Daily Rate (KSh)</FL>
        <InputGroup>
          <InputLeftElement h="44px" pl={3}>
            <Text fontSize="13px" fontWeight="700" color={L.muted}>
              KSh
            </Text>
          </InputLeftElement>
          <Input
            className="field-input"
            h="44px"
            bg={L.inputBg}
            border="1px solid"
            borderColor={L.inputBorder}
            borderRadius="12px"
            fontSize="14px"
            color={L.text}
            pl="52px"
            type="number"
            placeholder="5,000"
            _placeholder={{ color: L.subtle }}
            _focus={{}}
            value={form.price || ""}
            onChange={(e: any) => set("price", parseFloat(e.target.value))}
          />
        </InputGroup>
      </FormControl>

      <Button
        className="add-btn"
        h="50px"
        bg={L.accent}
        color="white"
        borderRadius="14px"
        fontWeight="700"
        fontSize="15px"
        leftIcon={<Icon as={FiPlus} boxSize={4} />}
        _hover={{ bg: L.accentLight }}
        boxShadow="0 4px 16px rgba(30,110,30,0.28)"
        onClick={onAdd}
      >
        Add Vehicle to Fleet
      </Button>
    </VStack>
  );
}

// ─── BULK UPLOAD TAB ─────────────────────────────────────────────────────────
function BulkUploadTab({
  progress,
  loading,
  onDownload,
  onUpload,
}: {
  progress: number;
  loading: boolean;
  onDownload: () => void;
  onUpload: () => void;
}) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<string | null>(null);

  return (
    <VStack spacing={5} align="stretch">
      {/* Info */}
      <HStack
        spacing={3}
        bg={L.accentGlow}
        border="1px solid"
        borderColor={L.cardBorder}
        borderRadius="14px"
        px={4}
        py={3}
      >
        <Circle size="28px" bg={L.accentGlow2}>
          <Icon as={FiInfo} color={L.accentLight} boxSize={3.5} />
        </Circle>
        <VStack align="start" spacing={0.5}>
          <Text fontSize="12px" fontWeight="700" color={L.textSub}>
            Bulk upload via CSV
          </Text>
          <Text fontSize="11px" color={L.muted}>
            Download the template, fill it in, and upload to add multiple
            vehicles at once.
          </Text>
        </VStack>
      </HStack>

      {/* Download template */}
      <Button
        h="46px"
        variant="outline"
        fontWeight="700"
        fontSize="14px"
        borderColor={L.cardBorder}
        color={L.textSub}
        borderRadius="14px"
        leftIcon={<Icon as={FiDownload} boxSize={4} color={L.accentLight} />}
        _hover={{
          bg: L.accentGlow,
          borderColor: L.accentLight,
          color: L.accentLight,
        }}
        onClick={onDownload}
      >
        Download CSV Template
      </Button>

      {/* Drop zone */}
      <Box
        className={`upload-zone${dragging ? " dragover" : ""}`}
        border="2px dashed"
        borderColor={file ? L.accentLight : L.cardBorder}
        bg={file ? L.accentGlow : L.inputBg}
        borderRadius="18px"
        p={{ base: 8, md: 10 }}
        textAlign="center"
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const f = e.dataTransfer.files[0];
          if (f) setFile(f.name);
        }}
        onClick={() => {
          const inp = document.createElement("input");
          inp.type = "file";
          inp.accept = ".csv";
          inp.onchange = (e: any) => {
            const f = e.target.files[0];
            if (f) setFile(f.name);
          };
          inp.click();
        }}
      >
        {file ? (
          <VStack spacing={3}>
            <Circle size="56px" bg={L.accentGlow2}>
              <Icon as={FiFile} boxSize={6} color={L.accentLight} />
            </Circle>
            <Text fontSize="14px" fontWeight="700" color={L.accentLight}>
              {file}
            </Text>
            <Button
              size="xs"
              variant="ghost"
              color={L.red}
              fontWeight="600"
              leftIcon={<Icon as={FiX} boxSize={3} />}
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
              }}
            >
              Remove
            </Button>
          </VStack>
        ) : (
          <VStack spacing={3}>
            <Circle size="56px" bg={L.accentGlow}>
              <Icon as={FiUpload} boxSize={6} color={L.accentLight} />
            </Circle>
            <Box>
              <Text fontSize="14px" fontWeight="700" color={L.textSub} mb={1}>
                Drop your CSV file here
              </Text>
              <Text fontSize="12px" color={L.muted}>
                or click to browse · .csv format only
              </Text>
            </Box>
          </VStack>
        )}
      </Box>

      {/* Progress */}
      {progress > 0 && progress < 100 && (
        <VStack spacing={2} align="stretch">
          <HStack justify="space-between">
            <Text fontSize="12px" fontWeight="700" color={L.textSub}>
              Uploading…
            </Text>
            <Text fontSize="12px" fontWeight="700" color={L.accentLight}>
              {progress}%
            </Text>
          </HStack>
          <Box h="6px" bg={L.accentGlow} borderRadius="full" overflow="hidden">
            <Box
              className="progress-bar"
              h="100%"
              borderRadius="full"
              style={{ width: `${progress}%` }}
            />
          </Box>
        </VStack>
      )}

      {progress === 100 && (
        <HStack
          spacing={2}
          bg={L.accentGlow}
          border="1px solid"
          borderColor={L.cardBorder}
          borderRadius="12px"
          px={4}
          py={3}
        >
          <Circle size="24px" bg={L.accentGlow2}>
            <Icon as={FiCheckCircle} color={L.accentLight} boxSize={3.5} />
          </Circle>
          <Text fontSize="13px" fontWeight="700" color={L.accentLight}>
            Upload complete — 3 vehicles added!
          </Text>
        </HStack>
      )}

      <Button
        className="add-btn"
        h="50px"
        bg={L.accent}
        color="white"
        borderRadius="14px"
        fontWeight="700"
        fontSize="15px"
        leftIcon={<Icon as={FiUpload} boxSize={4} />}
        isLoading={loading}
        loadingText="Uploading…"
        _hover={{ bg: L.accentLight }}
        boxShadow="0 4px 16px rgba(30,110,30,0.28)"
        onClick={onUpload}
      >
        Simulate CSV Upload (Demo)
      </Button>
    </VStack>
  );
}

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────
function Sidebar({
  count,
  loading,
  onPublish,
}: {
  count: number;
  loading: boolean;
  onPublish: () => void;
}) {
  const checklist = [
    { done: count > 0, label: "Add vehicles to fleet" },
    { done: false, label: "Upload vehicle photos" },
    { done: false, label: "Set insurance details" },
    { done: false, label: "Configure availability" },
  ];

  return (
    <VStack spacing={5} align="stretch">
      {/* Summary card */}
      <Box
        bg={L.card}
        borderRadius="20px"
        border="1px solid"
        borderColor={L.cardBorder}
        boxShadow={L.shadow}
        overflow="hidden"
      >
        {/* Header strip */}
        <Box
          bg={`linear-gradient(135deg, ${L.accent}, ${L.accentLight})`}
          px={5}
          py={4}
        >
          <Text
            fontSize="11px"
            color="rgba(255,255,255,0.65)"
            fontWeight="700"
            textTransform="uppercase"
            letterSpacing="0.1em"
            mb={1}
          >
            Fleet Summary
          </Text>
          <Text fontSize="38px" fontWeight="800" color="white" lineHeight="1">
            {count}
          </Text>
          <Text fontSize="12px" color="rgba(255,255,255,0.7)">
            vehicle{count !== 1 ? "s" : ""} added
          </Text>
        </Box>

        {/* Status pill */}
        <Box px={5} py={4}>
          <HStack
            spacing={2.5}
            bg={count > 0 ? L.accentGlow : L.inputBg}
            border="1px solid"
            borderColor={count > 0 ? L.cardBorder : L.border}
            borderRadius="12px"
            px={4}
            py={3}
            mb={4}
          >
            <Circle
              size="28px"
              bg={count > 0 ? L.accentGlow2 : "rgba(0,0,0,0.05)"}
            >
              <Icon
                as={count > 0 ? FiCheckCircle : FiAlertCircle}
                color={count > 0 ? L.accentLight : L.subtle}
                boxSize={3.5}
              />
            </Circle>
            <Box>
              <Text
                fontSize="12px"
                fontWeight="700"
                color={count > 0 ? L.accentLight : L.textSub}
              >
                {count > 0 ? "Ready to publish!" : "Not ready yet"}
              </Text>
              <Text fontSize="11px" color={L.muted}>
                {count > 0
                  ? "Your fleet can go live"
                  : "Add at least 1 vehicle"}
              </Text>
            </Box>
          </HStack>

          {/* Checklist */}
          <VStack spacing={2.5} align="stretch" mb={5}>
            <Text
              fontSize="11px"
              fontWeight="700"
              color={L.muted}
              textTransform="uppercase"
              letterSpacing="0.08em"
              mb={0.5}
            >
              Setup Checklist
            </Text>
            {checklist.map((item, i) => (
              <HStack key={i} className="checklist-item" spacing={2.5}>
                <Circle
                  size="22px"
                  bg={item.done ? L.accentGlow2 : L.inputBg}
                  border="1px solid"
                  borderColor={item.done ? L.accentLight : L.border}
                >
                  {item.done ? (
                    <Icon as={FiCheck} color={L.accentLight} boxSize="10px" />
                  ) : (
                    <Box w="6px" h="6px" borderRadius="full" bg={L.subtle} />
                  )}
                </Circle>
                <Text
                  fontSize="12px"
                  fontWeight={item.done ? "700" : "500"}
                  color={item.done ? L.accentLight : L.muted}
                  textDecoration={item.done ? "none" : "none"}
                >
                  {item.label}
                </Text>
              </HStack>
            ))}
          </VStack>

          <Button
            className="publish-btn"
            w="100%"
            h="48px"
            bg={count > 0 ? L.accent : L.subtle}
            color="white"
            borderRadius="14px"
            fontWeight="700"
            fontSize="14px"
            rightIcon={<Icon as={FiArrowRight} boxSize={4} />}
            isDisabled={count === 0}
            isLoading={loading}
            loadingText="Publishing…"
            boxShadow={count > 0 ? "0 4px 16px rgba(30,110,30,0.28)" : "none"}
            _hover={{ bg: count > 0 ? L.accentLight : undefined }}
            _disabled={{ opacity: 0.6, cursor: "not-allowed" }}
            onClick={onPublish}
          >
            Publish Fleet
          </Button>
        </Box>
      </Box>

      {/* Tips card */}
      <Box
        bg={L.card}
        borderRadius="20px"
        border="1px solid"
        borderColor={L.cardBorder}
        boxShadow={L.shadow}
        p={5}
      >
        <Text
          fontSize="12px"
          fontWeight="700"
          color={L.muted}
          textTransform="uppercase"
          letterSpacing="0.08em"
          mb={3}
        >
          Quick Tips
        </Text>
        <VStack spacing={3} align="stretch">
          {[
            { icon: FiStar, text: "Adding photos increases bookings by 3x" },
            { icon: FiShield, text: "Always verify insurance before listing" },
            {
              icon: FiCalendar,
              text: "Set service schedules to avoid downtime",
            },
          ].map((t, i) => (
            <HStack key={i} spacing={3} align="flex-start">
              <Circle size="28px" bg={L.accentGlow} flexShrink={0}>
                <Icon as={t.icon} color={L.accentLight} boxSize={3} />
              </Circle>
              <Text fontSize="12px" color={L.muted} lineHeight="1.6">
                {t.text}
              </Text>
            </HStack>
          ))}
        </VStack>
      </Box>
    </VStack>
  );
}

// ─── VEHICLE TABLE ────────────────────────────────────────────────────────────
function VehicleTable({
  vehicles,
  onRemove,
}: {
  vehicles: Vehicle[];
  onRemove: (i: number) => void;
}) {
  if (vehicles.length === 0) return null;

  return (
    <Box mt={8} className="fu3">
      <Flex align="center" justify="space-between" mb={4}>
        <Box>
          <Text
            fontSize="16px"
            fontWeight="800"
            color={L.text}
            letterSpacing="-0.01em"
          >
            Your Vehicles
            <Text
              as="span"
              fontSize="13px"
              fontWeight="600"
              color={L.muted}
              ml={2}
            >
              ({vehicles.length})
            </Text>
          </Text>
          <Text fontSize="12px" color={L.muted} mt={0.5}>
            Review before publishing
          </Text>
        </Box>
        <Badge
          bg={L.accentGlow2}
          color={L.accentLight}
          borderRadius="full"
          px={3}
          py={1}
          fontSize="11px"
          fontWeight="700"
          border="1px solid"
          borderColor={L.cardBorder}
        >
          ✓ {vehicles.length} Ready
        </Badge>
      </Flex>

      <Box
        bg={L.card}
        borderRadius="20px"
        border="1px solid"
        borderColor={L.cardBorder}
        boxShadow={L.shadow}
        overflow="hidden"
      >
        <Box overflowX="auto">
          <Table variant="simple" size="sm">
            <Thead>
              <Tr bg={L.bg}>
                {[
                  "#",
                  "Vehicle",
                  "Plate",
                  "Year",
                  "Specs",
                  "Daily Rate",
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
                  >
                    {h}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {vehicles.map((v, i) => (
                <Tr
                  key={i}
                  className="vehicle-row"
                  borderBottom="1px solid"
                  borderColor={L.border}
                >
                  <Td borderColor={L.border} py={3.5}>
                    <Circle size="24px" bg={L.accentGlow2}>
                      <Text
                        fontSize="10px"
                        fontWeight="800"
                        color={L.accentLight}
                      >
                        {i + 1}
                      </Text>
                    </Circle>
                  </Td>
                  <Td borderColor={L.border} py={3.5}>
                    <HStack spacing={2.5}>
                      <Circle size="34px" bg={L.accentGlow}>
                        <Icon
                          as={FaCar}
                          boxSize={3.5}
                          color={L.accentLight}
                        />
                      </Circle>
                      <Box>
                        <Text fontSize="13px" fontWeight="700" color={L.text}>
                          {v.brand} {v.model}
                        </Text>
                        <Text fontSize="11px" color={L.muted}>
                          {v.fuelType}
                        </Text>
                      </Box>
                    </HStack>
                  </Td>
                  <Td borderColor={L.border} py={3.5}>
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
                        fontSize="11px"
                        fontWeight="700"
                        color={L.textSub}
                        letterSpacing="0.04em"
                      >
                        {v.licensePlate}
                      </Text>
                    </Box>
                  </Td>
                  <Td borderColor={L.border} py={3.5}>
                    <Text fontSize="13px" color={L.textSub} fontWeight="600">
                      {v.year}
                    </Text>
                  </Td>
                  <Td borderColor={L.border} py={3.5}>
                    <HStack spacing={1.5} flexWrap="wrap">
                      {[`${v.seats} seats`, v.transmission].map((s) => (
                        <Box
                          key={s}
                          bg={L.accentGlow}
                          borderRadius="full"
                          px={2}
                          py={0.5}
                        >
                          <Text
                            fontSize="10px"
                            fontWeight="600"
                            color={L.accentLight}
                          >
                            {s}
                          </Text>
                        </Box>
                      ))}
                    </HStack>
                  </Td>
                  <Td borderColor={L.border} py={3.5}>
                    <Text
                      fontSize="13px"
                      fontWeight="800"
                      color={L.accentLight}
                    >
                      KSh {v.price.toLocaleString()}
                    </Text>
                    <Text fontSize="10px" color={L.muted}>
                      / day
                    </Text>
                  </Td>
                  <Td borderColor={L.border} py={3.5}>
                    <Button
                      size="xs"
                      variant="ghost"
                      color={L.subtle}
                      borderRadius="8px"
                      _hover={{ bg: L.redBg, color: L.red }}
                      onClick={() => onRemove(i)}
                    >
                      <Icon as={FiTrash2} boxSize={3.5} />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export const FleetUploadWizard = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [form, setForm] = useState<Partial<Vehicle>>(BLANK);
  const toast = useToast();
  const router = useRouter();

  const handleAdd = () => {
    if (!form.brand || !form.model || !form.licensePlate) {
      toast({
        title: "Missing required fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setVehicles((prev) => [...prev, form as Vehicle]);
    setForm({ ...BLANK });
    toast({
      title: `${form.brand} ${form.model} added ✓`,
      status: "success",
      duration: 2500,
      isClosable: true,
    });
  };

  const handleRemove = (i: number) => {
    setVehicles((prev) => prev.filter((_, idx) => idx !== i));
  };

  const handleBulkUpload = async () => {
    setLoading(true);
    setProgress(0);
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise((r) => setTimeout(r, 180));
    }
    setVehicles((prev) => [...prev, ...SAMPLE]);
    setLoading(false);
    toast({
      title: "3 sample vehicles uploaded ✓",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDownload = () => {
    toast({
      title: "CSV template downloading…",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handlePublish = async () => {
    if (!vehicles.length) {
      toast({
        title: "Add at least one vehicle first",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    toast({
      title: `${vehicles.length} vehicles published!`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    localStorage.setItem("businessVehicles", JSON.stringify(vehicles));
    router.push("/business/dashboard");
  };

  return (
    <>
      <Styles />
      <Box bg={L.bg} minH="100vh">
        <PageHeader
          title="Fleet Setup"
          subtitle="Add your vehicles to the platform"
          breadcrumbs={[
            { label: "Business", href: "/business" },
            { label: "Fleet Setup", href: "/business/onboarding/fleet-upload" },
          ]}
        />

        <Box
          maxW="1300px"
          mx="auto"
          px={{ base: 4, md: 6, lg: 8 }}
          py={{ base: 6, md: 8 }}
        >
          {/* Stats */}
          <StatsRow count={vehicles.length} />

          <Grid templateColumns={{ base: "1fr", lg: "3fr 1.1fr" }} gap={6}>
            {/* ── LEFT: Tabs ── */}
            <Box className="fu1">
              <Box
                bg={L.card}
                borderRadius="24px"
                border="1px solid"
                borderColor={L.cardBorder}
                boxShadow={L.shadow}
                overflow="hidden"
              >
                {/* Tab header */}
                <Flex
                  borderBottom="1px solid"
                  borderColor={L.border}
                  px={2}
                  pt={2}
                >
                  {["Manual Add", "Bulk CSV Upload"].map((label, i) => (
                    <Box
                      key={label}
                      as="button"
                      px={5}
                      py={3.5}
                      fontSize="13px"
                      fontWeight="700"
                      color={L.muted}
                      borderRadius="12px 12px 0 0"
                      position="relative"
                      cursor="pointer"
                      bg="transparent"
                      border="none"
                      outline="none"
                      _focus={{ outline: "none" }}
                      onClick={() => {}}
                      sx={{
                        "&[aria-selected=true]": {
                          color: L.accentLight,
                          bg: L.accentGlow,
                          borderBottom: `2px solid ${L.accentLight}`,
                        },
                      }}
                    >
                      {label}
                    </Box>
                  ))}
                </Flex>

                <Tabs variant="unstyled" colorScheme="green">
                  <TabList display="none" />
                  <Box px={{ base: 5, md: 7 }}>
                    {/* Custom visible tabs */}
                    <Flex
                      borderBottom="1px solid"
                      borderColor={L.border}
                      mx={{ base: -5, md: -7 }}
                      px={{ base: 5, md: 7 }}
                      pt={5}
                      mb={6}
                      gap={1}
                    >
                      {["✏️  Manual Add", "📋  Bulk CSV Upload"].map(
                        (label, i) => (
                          <Tabs key={label}>
                            <TabList>
                              <Tab
                                fontSize="13px"
                                fontWeight="700"
                                color={L.muted}
                                borderRadius="10px 10px 0 0"
                                px={5}
                                py={2.5}
                                _selected={{
                                  color: L.accentLight,
                                  bg: L.accentGlow2,
                                  borderBottom: `2px solid ${L.accentLight}`,
                                }}
                              >
                                {label}
                              </Tab>
                            </TabList>
                          </Tabs>
                        ),
                      )}
                    </Flex>
                  </Box>

                  <TabPanels>
                    <TabPanel
                      px={{ base: 5, md: 7 }}
                      pb={{ base: 6, md: 7 }}
                      pt={0}
                    >
                      <ManualForm
                        form={form}
                        setForm={setForm}
                        onAdd={handleAdd}
                      />
                    </TabPanel>
                    <TabPanel
                      px={{ base: 5, md: 7 }}
                      pb={{ base: 6, md: 7 }}
                      pt={0}
                    >
                      <BulkUploadTab
                        progress={progress}
                        loading={loading}
                        onDownload={handleDownload}
                        onUpload={handleBulkUpload}
                      />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
            </Box>

            {/* ── RIGHT: Sidebar ── */}
            <Box className="fu2">
              <Sidebar
                count={vehicles.length}
                loading={loading}
                onPublish={handlePublish}
              />
            </Box>
          </Grid>

          {/* ── Vehicle Table ── */}
          <VehicleTable vehicles={vehicles} onRemove={handleRemove} />
        </Box>
      </Box>
    </>
  );
};
