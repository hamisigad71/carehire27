"use client";

import {
  Box,
  Flex,
  Text,
  Button,
  Icon,
  HStack,
  VStack,
  SimpleGrid,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Checkbox,
  Grid,
  Circle,
  Badge,
  Divider,
  Spacer,
  Progress,
  useToast,
} from "@chakra-ui/react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FiCheckSquare, FiCamera, FiAlertCircle, FiSave, FiUser, FiCalendar, FiCheck, FiX, FiMinus, FiUpload, FiFileText, FiShield, FiInfo, FiArrowRight, FiCheckCircle, FiImage } from "react-icons/fi";
import { useColorTokens } from "@/hooks/useColorTokens";
import { useState } from "react";
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
  red: "#c0392b",
  redBg: "rgba(192,57,43,0.08)",
  orange: "#c05c00",
  orangeBg: "rgba(192,92,0,0.1)",
  gold: "#b07d0a",
  goldBg: "rgba(176,125,10,0.1)",
  blue: "#1a56a0",
  blueBg: "rgba(26,86,160,0.08)",
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

    .field-input {
      transition: border-color .2s ease, box-shadow .2s ease !important;
    }
    .field-input:focus {
      border-color: ${L.accentLight} !important;
      box-shadow: 0 0 0 3px rgba(30,110,30,0.12) !important;
      outline: none !important;
    }
    .field-input:hover { border-color: rgba(30,110,30,0.4) !important; }

    .check-row {
      transition: background .15s ease, transform .15s ease;
    }
    .check-row:hover { background: rgba(30,110,30,0.04) !important; transform: translateX(3px); }

    .upload-zone {
      transition: all .25s ease;
      cursor: pointer;
    }
    .upload-zone:hover {
      border-color: ${L.accentLight} !important;
      background: ${L.accentGlow} !important;
    }
    .upload-zone.drag { 
      border-color: ${L.accentLight} !important;
      background: ${L.accentGlow2} !important;
    }

    .submit-btn {
      transition: all .22s cubic-bezier(.25,.46,.45,.94) !important;
    }
    .submit-btn:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 12px 32px rgba(30,110,30,0.38) !important;
    }

    .rating-btn { transition: all .18s ease; }
    .rating-btn:hover { transform: scale(1.08); }

    .section-card {
      transition: box-shadow .2s ease;
    }
    .section-card:hover { box-shadow: 0 6px 28px rgba(0,0,0,0.09) !important; }
  `}</style>
);

// ─── TYPES ────────────────────────────────────────────────────────────────────
type Rating = "good" | "fair" | "poor" | null;

interface CheckItem {
  label: string;
  rating: Rating;
  note: string;
}

interface Section {
  title: string;
  icon: React.ElementType;
  color: string;
  items: CheckItem[];
}

const RATING_CONFIG = {
  good: {
    label: "Good",
    bg: L.accentGlow2,
    border: L.accentLight,
    text: L.accentLight,
    icon: FiCheck,
  },
  fair: {
    label: "Fair",
    bg: L.goldBg,
    border: L.gold,
    text: L.gold,
    icon: FiMinus,
  },
  poor: { label: "Poor", bg: L.redBg, border: L.red, text: L.red, icon: FiX },
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

// ─── SECTION HEADER ───────────────────────────────────────────────────────────
function SectionCard({
  children,
  title,
  icon,
  accent,
  step,
}: {
  children: React.ReactNode;
  title: string;
  icon: React.ElementType;
  accent: string;
  step: number;
}) {
  return (
    <Box
      className="section-card"
      bg={L.card}
      borderRadius="20px"
      border="1px solid"
      borderColor={L.cardBorder}
      boxShadow={L.shadow}
    >
      {/* Top accent bar */}
      <Box
        h="3px"
        bg={`linear-gradient(90deg, ${accent}, transparent)`}
        borderRadius="20px 20px 0 0"
      />
      <Box p={{ base: 5, md: 7 }}>
        <HStack spacing={3} mb={6}>
          <Circle
            size="36px"
            bg={`${accent}18`}
            border="1px solid"
            borderColor={`${accent}30`}
          >
            <Icon as={icon} boxSize={4} color={accent} />
          </Circle>
          <Box>
            <Text
              fontSize="15px"
              fontWeight="800"
              color={L.text}
              letterSpacing="-0.01em"
            >
              {title}
            </Text>
          </Box>
          <Spacer />
          <Circle size="26px" bg={L.accentGlow2}>
            <Text fontSize="10px" fontWeight="800" color={L.accentLight}>
              {step}
            </Text>
          </Circle>
        </HStack>
        {children}
      </Box>
    </Box>
  );
}

// ─── RATING BUTTONS ──────────────────────────────────────────────────────────
function RatingButtons({
  value,
  onChange,
}: {
  value: Rating;
  onChange: (r: Rating) => void;
}) {
  return (
    <HStack spacing={1.5}>
      {(
        Object.entries(RATING_CONFIG) as [Rating, typeof RATING_CONFIG.good][]
      ).map(([key, cfg]) => (
        <Button
          key={key}
          className="rating-btn"
          size="xs"
          h="26px"
          px={2.5}
          borderRadius="8px"
          border="1px solid"
          borderColor={value === key ? cfg.border : L.border}
          bg={value === key ? cfg.bg : "transparent"}
          color={value === key ? cfg.text : L.subtle}
          fontWeight="700"
          fontSize="10px"
          onClick={() => onChange(value === key ? null : (key as Rating))}
          _hover={{ borderColor: cfg.border, color: cfg.text, bg: cfg.bg }}
        >
          <Icon as={cfg.icon} boxSize="10px" mr={1} />
          {cfg.label}
        </Button>
      ))}
    </HStack>
  );
}

// ─── CHECK ROW ────────────────────────────────────────────────────────────────
function CheckRow({
  item,
  index,
  onChange,
}: {
  item: CheckItem;
  index: number;
  onChange: (updates: Partial<CheckItem>) => void;
}) {
  const [showNote, setShowNote] = useState(false);
  const r = item.rating;
  const rowBg =
    r === "good"
      ? "rgba(30,110,30,0.03)"
      : r === "fair"
        ? "rgba(176,125,10,0.04)"
        : r === "poor"
          ? "rgba(192,57,43,0.04)"
          : "transparent";

  return (
    <Box>
      <Flex
        className="check-row"
        align="center"
        px={4}
        py={3}
        borderRadius="14px"
        bg={rowBg}
        border="1px solid"
        borderColor={r ? `${RATING_CONFIG[r].border}30` : "transparent"}
        gap={3}
        flexWrap={{ base: "wrap", md: "nowrap" }}
      >
        {/* Index */}
        <Circle size="22px" bg={L.accentGlow} flexShrink={0}>
          <Text fontSize="9px" fontWeight="800" color={L.accentLight}>
            {index + 1}
          </Text>
        </Circle>

        {/* Label */}
        <Text
          fontSize="13px"
          fontWeight="600"
          color={L.text}
          flex={1}
          minW="120px"
        >
          {item.label}
        </Text>

        {/* Rating buttons */}
        <RatingButtons
          value={item.rating}
          onChange={(rating) => onChange({ rating })}
        />

        {/* Note toggle */}
        <Button
          size="xs"
          variant="ghost"
          color={L.subtle}
          h="26px"
          px={2}
          borderRadius="8px"
          fontWeight="600"
          fontSize="10px"
          _hover={{ bg: L.accentGlow, color: L.accentLight }}
          onClick={() => setShowNote((p) => !p)}
        >
          <Icon as={FiFileText} boxSize={3} mr={1} />
          Note
        </Button>
      </Flex>

      {/* Inline note */}
      {showNote && (
        <Box px={4} pb={2} pt={1}>
          <Input
            className="field-input"
            h="36px"
            bg={L.inputBg}
            border="1px solid"
            borderColor={L.inputBorder}
            borderRadius="10px"
            fontSize="12px"
            color={L.text}
            placeholder="Add a note for this item…"
            _placeholder={{ color: L.subtle }}
            _focus={{}}
            value={item.note}
            onChange={(e) => onChange({ note: e.target.value })}
          />
        </Box>
      )}
    </Box>
  );
}

// ─── PROGRESS SUMMARY ─────────────────────────────────────────────────────────
function InspectionProgress({ sections }: { sections: Section[] }) {
  const all = sections.flatMap((s) => s.items);
  const done = all.filter((i) => i.rating !== null).length;
  const good = all.filter((i) => i.rating === "good").length;
  const fair = all.filter((i) => i.rating === "fair").length;
  const poor = all.filter((i) => i.rating === "poor").length;
  const pct = all.length ? Math.round((done / all.length) * 100) : 0;

  return (
    <Box
      bg={L.card}
      borderRadius="20px"
      border="1px solid"
      borderColor={L.cardBorder}
      boxShadow={L.shadow}
      overflow="hidden"
      mb={6}
    >
      <Box
        bg={`linear-gradient(135deg, ${L.accent}, ${L.accentLight})`}
        px={6}
        py={5}
      >
        <HStack justify="space-between" mb={3}>
          <Text fontSize="13px" fontWeight="700" color="rgba(255,255,255,0.75)">
            Inspection Progress
          </Text>
          <Text fontSize="26px" fontWeight="800" color="white">
            {pct}%
          </Text>
        </HStack>
        <Box
          h="6px"
          bg="rgba(255,255,255,0.2)"
          borderRadius="full"
          overflow="hidden"
        >
          <Box
            h="100%"
            borderRadius="full"
            bg="white"
            style={{ width: `${pct}%`, transition: "width .5s ease" }}
          />
        </Box>
        <Text fontSize="11px" color="rgba(255,255,255,0.6)" mt={1.5}>
          {done} of {all.length} items rated
        </Text>
      </Box>
      <HStack spacing={0} width="100%">
        {[
          { label: "Good", value: good, color: L.accentLight },
          { label: "Fair", value: fair, color: L.gold },
          { label: "Poor", value: poor, color: L.red },
        ].map((s, idx) => (
          <Box
            key={s.label}
            textAlign="center"
            py={3}
            flex={1}
            borderRight={idx < 2 ? "1px solid" : "none"}
            borderRightColor={L.border}
          >
            <Text fontSize="20px" fontWeight="800" color={s.color}>
              {s.value}
            </Text>
            <Text fontSize="10px" fontWeight="600" color={L.muted}>
              {s.label}
            </Text>
          </Box>
        ))}
      </HStack>
    </Box>
  );
}

// ─── IMAGE UPLOAD ZONE ────────────────────────────────────────────────────────
function ImageUploadZone({
  files,
  onAdd,
}: {
  files: string[];
  onAdd: (name: string) => void;
}) {
  const [drag, setDrag] = useState(false);
  const angles = [
    "Front",
    "Rear",
    "Driver Side",
    "Passenger Side",
    "Interior",
    "Engine Bay",
  ];

  return (
    <VStack spacing={4} align="stretch">
      {/* Angle grid */}
      <SimpleGrid columns={{ base: 2, sm: 3 }} spacing={3}>
        {angles.map((angle, i) => {
          const uploaded = files[i];
          return (
            <Box
              key={angle}
              h="80px"
              borderRadius="14px"
              overflow="hidden"
              border="1px dashed"
              borderColor={uploaded ? L.accentLight : L.cardBorder}
              bg={uploaded ? L.accentGlow : L.inputBg}
              display="flex"
              flexDir="column"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
              position="relative"
              _hover={{ borderColor: L.accentLight, bg: L.accentGlow }}
              transition="all .2s ease"
              onClick={() => onAdd(angle)}
            >
              {uploaded ? (
                <>
                  <Circle size="28px" bg={L.accentGlow2} mb={1}>
                    <Icon
                      as={FiCheckCircle}
                      color={L.accentLight}
                      boxSize={4}
                    />
                  </Circle>
                  <Text fontSize="10px" fontWeight="700" color={L.accentLight}>
                    {angle}
                  </Text>
                </>
              ) : (
                <>
                  <Icon as={FiImage} color={L.subtle} boxSize={5} mb={1} />
                  <Text fontSize="10px" fontWeight="600" color={L.muted}>
                    {angle}
                  </Text>
                </>
              )}
            </Box>
          );
        })}
      </SimpleGrid>

      {/* Drop zone */}
      <Box
        className={`upload-zone${drag ? " drag" : ""}`}
        border="2px dashed"
        borderColor={L.cardBorder}
        borderRadius="16px"
        py={8}
        textAlign="center"
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          const f = e.dataTransfer.files[0];
          if (f) onAdd(f.name);
        }}
        onClick={() => {
          const inp = document.createElement("input");
          inp.type = "file";
          inp.accept = "image/*";
          inp.multiple = true;
          inp.onchange = (e: any) => {
            Array.from(e.target.files || []).forEach((f: any) => onAdd(f.name));
          };
          inp.click();
        }}
      >
        <VStack spacing={2}>
          <Circle size="48px" bg={L.accentGlow}>
            <Icon as={FiUpload} color={L.accentLight} boxSize={5} />
          </Circle>
          <Text fontSize="13px" fontWeight="700" color={L.textSub}>
            Drop images here or click to upload
          </Text>
          <Text fontSize="11px" color={L.muted}>
            JPG, PNG, WEBP · Max 10MB each
          </Text>
          {files.length > 0 && (
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
              {files.length} photo{files.length !== 1 ? "s" : ""} added
            </Badge>
          )}
        </VStack>
      </Box>
    </VStack>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function VehicleInspectionPage() {
  const tokens = useColorTokens();
  const toast = useToast();

  const [images, setImages] = useState<string[]>([]);
  const [overall, setOverall] = useState<Rating>(null);

  const initItems = (labels: string[]): CheckItem[] =>
    labels.map((label) => ({ label, rating: null, note: "" }));

  const [sections, setSections] = useState<Section[]>([
    {
      title: "Exterior Condition",
      icon: FaCar,
      color: L.accentLight,
      items: initItems([
        "Body Panels & Paint",
        "Tires & Wheels",
        "Lights & Indicators",
        "Windshield & Glass",
        "Bumpers & Trim",
        "Door Handles & Locks",
      ]),
    },
    {
      title: "Interior Condition",
      icon: FiCheckSquare,
      color: L.blue,
      items: initItems([
        "Upholstery & Carpets",
        "Dashboard & Electronics",
        "AC & Climate Control",
        "Safety Equipment",
        "Seat Belts & Airbags",
        "Mirrors & Visibility",
      ]),
    },
    {
      title: "Mechanical & Safety",
      icon: FiShield,
      color: L.gold,
      items: initItems([
        "Engine & Fluid Levels",
        "Brakes & Brake Fluid",
        "Steering & Suspension",
        "Battery & Charging",
        "Horn & Signals",
        "Spare Tyre & Tools",
      ]),
    },
  ]);

  const updateItem = (si: number, ii: number, updates: Partial<CheckItem>) => {
    setSections((prev) => {
      const next = [...prev];
      next[si] = {
        ...next[si],
        items: next[si].items.map((item, idx) =>
          idx === ii ? { ...item, ...updates } : item,
        ),
      };
      return next;
    });
  };

  const handleSave = () => {
    const all = sections.flatMap((s) => s.items);
    const done = all.filter((i) => i.rating !== null).length;
    if (done < all.length / 2) {
      toast({
        title: "Please complete at least half the checklist",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    toast({
      title: "Inspection report submitted ✓",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <>
      <Styles />
      <Box bg={L.bg} minH="100vh" pb={12}>
        <PageHeader
          title="Vehicle Inspection Report"
          subtitle="Digital inspection log for fleet safety and compliance."
          breadcrumbs={[
            { label: "Business", href: "/business" },
            { label: "Fleet", href: "/business/fleet" },
            { label: "Inspection", href: "/business/vehicle_inspection_form" },
          ]}
        />

        <Box
          maxW="1080px"
          px={{ base: 4, md: 6, lg: 8 }}
          py={{ base: 4, md: 6 }}
        >
          <Grid
            templateColumns={{ base: "1fr", xl: "1fr 300px" }}
            gap={6}
            alignItems="flex-start"
          >
            {/* ── LEFT: Main form ── */}
            <VStack spacing={5} align="stretch">
              {/* ── SECTION 1: Vehicle & Inspector ── */}
              <SectionCard
                title="Vehicle & Inspector"
                icon={FaCar}
                accent={L.accentLight}
                step={1}
              >
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
                  <FormControl isRequired>
                    <FL required>Vehicle</FL>
                    <FSelect placeholder="Select Vehicle">
                      <option>Tesla Model 3 — KAB-123A</option>
                      <option>BMW X5 — KAB-124B</option>
                      <option>Mercedes GLE — KDD-345A</option>
                      <option>Toyota Prado — KDD-892Z</option>
                    </FSelect>
                  </FormControl>
                  <FormControl isRequired>
                    <FL required>Inspector Name</FL>
                    <FInput placeholder="Full name" />
                  </FormControl>
                  <FormControl isRequired>
                    <FL required>Inspection Date</FL>
                    <FInput type="date" />
                  </FormControl>
                  <FormControl>
                    <FL>Odometer (km)</FL>
                    <FInput type="number" placeholder="e.g. 18,500" />
                  </FormControl>
                  <FormControl>
                    <FL>Inspection Type</FL>
                    <FSelect>
                      <option>Pre-rental</option>
                      <option>Post-rental</option>
                      <option>Routine</option>
                      <option>Damage Report</option>
                    </FSelect>
                  </FormControl>
                  <FormControl>
                    <FL>Fuel Level</FL>
                    <FSelect>
                      <option>Full (100%)</option>
                      <option>Three-quarter (75%)</option>
                      <option>Half (50%)</option>
                      <option>Quarter (25%)</option>
                      <option>Empty</option>
                    </FSelect>
                  </FormControl>
                </SimpleGrid>
              </SectionCard>

              {/* ── SECTIONS 2–4: Checklists ── */}
              {sections.map((section, si) => (
                <SectionCard
                  key={si}
                  title={section.title}
                  icon={section.icon}
                  accent={section.color}
                  step={si + 2}
                >
                  {/* Legend */}
                  <HStack spacing={3} mb={4} flexWrap="wrap">
                    <Text fontSize="11px" color={L.muted} fontWeight="600">
                      Rate each item:
                    </Text>
                    {Object.entries(RATING_CONFIG).map(([key, cfg]) => (
                      <HStack key={key} spacing={1}>
                        <Icon as={cfg.icon} color={cfg.text} boxSize={3} />
                        <Text fontSize="11px" fontWeight="600" color={cfg.text}>
                          {cfg.label}
                        </Text>
                      </HStack>
                    ))}
                  </HStack>

                  <VStack spacing={1} align="stretch">
                    {section.items.map((item, ii) => (
                      <CheckRow
                        key={ii}
                        item={item}
                        index={ii}
                        onChange={(updates) => updateItem(si, ii, updates)}
                      />
                    ))}
                  </VStack>

                  {/* Section completion indicator */}
                  <Box mt={4}>
                    <HStack justify="space-between" mb={1.5}>
                      <Text fontSize="10px" fontWeight="700" color={L.muted}>
                        Section completion
                      </Text>
                      <Text
                        fontSize="10px"
                        fontWeight="700"
                        color={section.color}
                      >
                        {section.items.filter((i) => i.rating !== null).length}/
                        {section.items.length}
                      </Text>
                    </HStack>
                    <Box
                      h="4px"
                      bg={L.accentGlow}
                      borderRadius="full"
                      overflow="hidden"
                    >
                      <Box
                        h="100%"
                        borderRadius="full"
                        bg={section.color}
                        style={{
                          width: `${(section.items.filter((i) => i.rating !== null).length / section.items.length) * 100}%`,
                          transition: "width .4s ease",
                        }}
                      />
                    </Box>
                  </Box>
                </SectionCard>
              ))}

              {/* ── SECTION 5: Images ── */}
              <SectionCard
                title="Photos & Evidence"
                icon={FiCamera}
                accent={L.blue}
                step={5}
              >
                <HStack
                  spacing={2}
                  mb={4}
                  bg={L.blueBg}
                  border="1px solid"
                  borderColor="rgba(26,86,160,0.15)"
                  borderRadius="12px"
                  px={4}
                  py={3}
                >
                  <Icon as={FiInfo} color={L.blue} boxSize={3.5} />
                  <Text fontSize="12px" color={L.blue} fontWeight="600">
                    Minimum 4 angles required — Front, Rear, Driver Side,
                    Passenger Side
                  </Text>
                </HStack>
                <ImageUploadZone
                  files={images}
                  onAdd={(name) => setImages((p) => [...p, name])}
                />
              </SectionCard>

              {/* ── SECTION 6: Overall & Notes ── */}
              <SectionCard
                title="Overall Assessment & Notes"
                icon={FiFileText}
                accent={L.orange}
                step={6}
              >
                <VStack spacing={5} align="stretch">
                  {/* Overall condition */}
                  <Box>
                    <Text
                      fontSize="12px"
                      fontWeight="700"
                      color={L.muted}
                      textTransform="uppercase"
                      letterSpacing="0.09em"
                      mb={3}
                    >
                      Overall Vehicle Condition
                    </Text>
                    <HStack spacing={3} flexWrap="wrap">
                      {(
                        Object.entries(RATING_CONFIG) as [
                          Rating,
                          typeof RATING_CONFIG.good,
                        ][]
                      ).map(([key, cfg]) => (
                        <Button
                          key={key}
                          h="44px"
                          px={6}
                          borderRadius="12px"
                          fontWeight="700"
                          fontSize="13px"
                          border="2px solid"
                          borderColor={overall === key ? cfg.border : L.border}
                          bg={overall === key ? cfg.bg : "transparent"}
                          color={overall === key ? cfg.text : L.muted}
                          leftIcon={<Icon as={cfg.icon} boxSize={4} />}
                          onClick={() =>
                            setOverall(overall === key ? null : (key as Rating))
                          }
                          _hover={{
                            borderColor: cfg.border,
                            color: cfg.text,
                            bg: cfg.bg,
                          }}
                          transition="all .2s ease"
                        >
                          {cfg.label}
                        </Button>
                      ))}
                    </HStack>
                  </Box>

                  <Divider borderColor={L.border} />

                  {/* Notes */}
                  <FormControl>
                    <FL>Damage Notes & Observations</FL>
                    <Textarea
                      className="field-input"
                      placeholder="Describe any scratches, dents, mechanical issues, or safety concerns found during inspection…"
                      rows={4}
                      bg={L.inputBg}
                      border="1px solid"
                      borderColor={L.inputBorder}
                      borderRadius="14px"
                      fontSize="14px"
                      color={L.text}
                      resize="none"
                      _placeholder={{ color: L.subtle }}
                      _focus={{}}
                    />
                  </FormControl>

                  {/* Inspector sign-off */}
                  <FormControl>
                    <FL>Inspector Signature / ID</FL>
                    <FInput placeholder="Employee ID or digital signature reference" />
                  </FormControl>
                </VStack>
              </SectionCard>

              {/* ── SUBMIT BAR ── */}
              <Box
                bg={L.card}
                borderRadius="20px"
                border="1px solid"
                borderColor={L.cardBorder}
                boxShadow={L.shadow}
                px={{ base: 5, md: 7 }}
                py={5}
              >
                <Flex
                  align="center"
                  justify="space-between"
                  flexWrap="wrap"
                  gap={4}
                >
                  <Box>
                    <Text fontSize="14px" fontWeight="800" color={L.text}>
                      Ready to submit?
                    </Text>
                    <Text fontSize="12px" color={L.muted} mt={0.5}>
                      Review all sections before submitting. This cannot be
                      undone.
                    </Text>
                  </Box>
                  <HStack spacing={3}>
                    <Button
                      h="48px"
                      px={6}
                      variant="outline"
                      borderColor={L.cardBorder}
                      color={L.muted}
                      borderRadius="14px"
                      fontWeight="700"
                      fontSize="13px"
                      _hover={{
                        bg: L.accentGlow,
                        borderColor: L.accentLight,
                        color: L.accentLight,
                      }}
                    >
                      Save Draft
                    </Button>
                    <Button
                      className="submit-btn"
                      h="48px"
                      px={8}
                      bg={L.accent}
                      color="white"
                      borderRadius="14px"
                      fontWeight="700"
                      fontSize="14px"
                      leftIcon={<Icon as={FiCheckCircle} boxSize={4} />}
                      rightIcon={<Icon as={FiArrowRight} boxSize={4} />}
                      boxShadow="0 4px 16px rgba(30,110,30,0.3)"
                      _hover={{ bg: L.accentLight }}
                      onClick={handleSave}
                    >
                      Submit Report
                    </Button>
                  </HStack>
                </Flex>
              </Box>
            </VStack>

            {/* ── RIGHT: Sticky sidebar ── */}
            <Box position={{ xl: "sticky" }} top={{ xl: "24px" }}>
              <VStack spacing={4} align="stretch">
                <InspectionProgress sections={sections} />

                {/* Quick legend */}
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
                    mb={4}
                  >
                    Rating Guide
                  </Text>
                  <VStack spacing={3} align="stretch">
                    {Object.entries(RATING_CONFIG).map(([key, cfg]) => (
                      <HStack
                        key={key}
                        spacing={3}
                        p={3}
                        borderRadius="12px"
                        bg={cfg.bg}
                        border="1px solid"
                        borderColor={`${cfg.border}30`}
                      >
                        <Circle size="28px" bg={`${cfg.border}20`}>
                          <Icon as={cfg.icon} color={cfg.text} boxSize={3.5} />
                        </Circle>
                        <Box>
                          <Text
                            fontSize="12px"
                            fontWeight="700"
                            color={cfg.text}
                          >
                            {cfg.label}
                          </Text>
                          <Text fontSize="11px" color={L.muted}>
                            {key === "good"
                              ? "No issues, fully functional"
                              : key === "fair"
                                ? "Minor wear, monitor closely"
                                : "Needs immediate attention"}
                          </Text>
                        </Box>
                      </HStack>
                    ))}
                  </VStack>
                </Box>

                {/* Tips */}
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
                    Inspector Tips
                  </Text>
                  <VStack spacing={2.5} align="stretch">
                    {[
                      "Check tires in good lighting",
                      "Test all lights & indicators",
                      "Start engine and listen for sounds",
                      "Document any pre-existing damage with photos",
                    ].map((tip, i) => (
                      <HStack key={i} spacing={2.5} align="flex-start">
                        <Circle
                          size="18px"
                          bg={L.accentGlow2}
                          flexShrink={0}
                          mt={0.5}
                        >
                          <Text
                            fontSize="8px"
                            fontWeight="800"
                            color={L.accentLight}
                          >
                            {i + 1}
                          </Text>
                        </Circle>
                        <Text fontSize="12px" color={L.muted} lineHeight="1.6">
                          {tip}
                        </Text>
                      </HStack>
                    ))}
                  </VStack>
                </Box>
              </VStack>
            </Box>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
