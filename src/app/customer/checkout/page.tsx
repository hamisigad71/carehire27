"use client";

import { Suspense } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Button,
  Icon,
  SimpleGrid,
  Flex,
  Image,
  Badge,
  HStack,
  Grid,
  GridItem,
  Divider,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Center,
  Spinner,
  Circle,
} from "@chakra-ui/react";
import {
  FiShield,
  FiUploadCloud,
  FiLock,
  FiCheckCircle,
  FiCreditCard,
  FiChevronRight,
  FiBriefcase,
  FiActivity,
  FiFileText,
  FiAlertCircle,
  FiArrowRight,
  FiZap,
} from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Vehicle } from "@/types";
import { formatCurrency } from "@/utils/format";

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
  shadowGreen: "0 8px 32px rgba(30,110,30,0.18)",
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
  green: "#15803d",
  greenBg: "rgba(21,128,61,0.08)",
  greenBorder: "rgba(21,128,61,0.2)",
};

// ─── STYLES ───────────────────────────────────────────────────────────────────
const Styles = () => (
  <style>{`
    @keyframes fadeUp {
      from { opacity:0; transform:translateY(14px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes pulse-ring {
      0%,100% { box-shadow: 0 0 0 0 rgba(30,110,30,0); }
      50%      { box-shadow: 0 0 0 6px rgba(30,110,30,0.12); }
    }
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }

    .fu  { animation: fadeUp .45s ease both; }
    .fu1 { animation: fadeUp .45s .06s ease both; }
    .fu2 { animation: fadeUp .45s .12s ease both; }
    .fu3 { animation: fadeUp .45s .18s ease both; }

    .step-active {
      animation: pulse-ring 2.5s ease-in-out infinite;
    }

    .upload-zone {
      transition: border-color .2s ease, background .2s ease, transform .2s ease;
    }
    .upload-zone:hover {
      border-color: ${L.accentLight} !important;
      background: ${L.accentGlow} !important;
      transform: translateY(-2px);
    }

    .upload-zone.done {
      border-color: ${L.green} !important;
      background: ${L.greenBg} !important;
    }

    .payment-option {
      transition: border-color .2s ease, background .2s ease, box-shadow .2s ease;
      cursor: pointer;
    }
    .payment-option:hover {
      border-color: ${L.borderMid} !important;
      box-shadow: ${L.shadow} !important;
    }
    .payment-option.selected {
      border-color: ${L.accentLight} !important;
      background: ${L.accentGlow} !important;
      box-shadow: 0 4px 20px rgba(30,110,30,0.12) !important;
    }

    .cta-btn {
      transition: all .22s cubic-bezier(.22,1,.36,1) !important;
    }
    .cta-btn:hover:not(:disabled) {
      transform: translateY(-2px) !important;
      box-shadow: 0 12px 32px rgba(30,110,30,0.28) !important;
    }

    .summary-card {
      position: sticky;
      top: 24px;
    }

    .progress-line {
      transition: width .6s cubic-bezier(.22,1,.36,1);
    }
  `}</style>
);

// ─── CARD ─────────────────────────────────────────────────────────────────────
function Card({ children, p = "8", className = "", ...rest }: any) {
  return (
    <Box
      bg={L.card}
      borderRadius="24px"
      border="1px solid"
      borderColor={L.cardBorder}
      boxShadow={L.shadow}
      p={{ base: 5, md: p }}
      position="relative"
      overflow="hidden"
      className={className}
      {...rest}
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        w="64px"
        h="64px"
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

// ─── STEP TRACKER ─────────────────────────────────────────────────────────────
function StepTracker({ step, steps }: { step: number; steps: any[] }) {
  return (
    <Card p="6" className="fu">
      {/* desktop */}
      <HStack
        spacing={0}
        w="full"
        align="flex-start"
        display={{ base: "none", md: "flex" }}
      >
        {steps.map((s, idx) => {
          const done = step > s.n;
          const active = step === s.n;
          const pending = step < s.n;
          return (
            <Box key={s.n} flex={1} position="relative">
              {/* connector */}
              {idx < steps.length - 1 && (
                <Box
                  position="absolute"
                  top="28px"
                  left="50%"
                  w="100%"
                  h="2px"
                  bg={done ? L.accentLight : L.border}
                  zIndex={0}
                  sx={{ transition: "background .5s ease" }}
                />
              )}

              <VStack spacing={3} align="center" position="relative" zIndex={1}>
                {/* circle */}
                <Box
                  w="56px"
                  h="56px"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bg={done ? L.accentLight : active ? L.card : L.bg}
                  border="2px solid"
                  borderColor={
                    done ? L.accentLight : active ? L.accentLight : L.border
                  }
                  boxShadow={active ? `0 0 0 4px ${L.accentGlow2}` : "none"}
                  className={active ? "step-active" : ""}
                  sx={{ transition: "all .4s ease" }}
                >
                  {done ? (
                    <Icon as={FiCheckCircle} boxSize={5} color="white" />
                  ) : (
                    <Box
                      color={active ? L.accentLight : L.subtle}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Image
                        src={s.iconSrc}
                        alt={s.title}
                        boxSize="40px"
                        color={active ? L.accentLight : L.subtle}
                        filter={
                          active
                            ? "drop-shadow(0 0 2px rgba(45,140,45,0.3))"
                            : ""
                        }
                      />
                    </Box>
                  )}
                </Box>

                {/* label */}
                <Box textAlign="center">
                  <Text
                    fontSize="12px"
                    fontWeight="700"
                    color={done || active ? L.text : L.subtle}
                    textTransform="uppercase"
                    letterSpacing=".08em"
                  >
                    {s.title}
                  </Text>
                  {active && (
                    <Box
                      mt={1}
                      px={2}
                      py={0.5}
                      bg={L.accentGlow2}
                      borderRadius="full"
                      border="1px solid"
                      borderColor={L.borderMid}
                    >
                      <Text
                        fontSize="10px"
                        fontWeight="700"
                        color={L.accentLight}
                        textTransform="uppercase"
                        letterSpacing=".06em"
                      >
                        Active
                      </Text>
                    </Box>
                  )}
                </Box>
              </VStack>
            </Box>
          );
        })}
      </HStack>

      {/* mobile — compact */}
      <Box display={{ base: "flex", md: "none" }} alignItems="center">
        <HStack spacing={2} flex={1}>
          {steps.map((s) => (
            <Box
              key={s.n}
              flex={1}
              h="4px"
              borderRadius="full"
              bg={step >= s.n ? L.accentLight : L.border}
              sx={{ transition: "background .4s ease" }}
            />
          ))}
        </HStack>
        <Box ml={4}>
          <Text fontSize="12px" fontWeight="700" color={L.accentLight}>
            {step}/{steps.length}
          </Text>
          <Text fontSize="11px" color={L.muted}>
            {steps[step - 1]?.title}
          </Text>
        </Box>
      </Box>

      {/* step label row */}
      <Flex
        mt={5}
        px={4}
        py={2.5}
        bg={L.accentGlow}
        borderRadius="12px"
        border="1px solid"
        borderColor={L.borderMid}
        align="center"
      >
        <Box w="7px" h="7px" borderRadius="full" bg={L.accentLight} mr={2.5} />
        <Text fontSize="13px" fontWeight="600" color={L.text}>
          Step {step} of {steps.length}:{" "}
          <Text as="span" fontWeight="800" color={L.accentLight}>
            {steps[step - 1]?.title} Verification
          </Text>
        </Text>
      </Flex>
    </Card>
  );
}

// ─── UPLOAD ZONE ──────────────────────────────────────────────────────────────
function UploadZone({
  file,
  label,
  required = false,
  onClick,
}: {
  file: File | null;
  label: string;
  required?: boolean;
  onClick: () => void;
}) {
  return (
    <Box
      className={`upload-zone${file ? " done" : ""}`}
      p={5}
      border="2px dashed"
      borderColor={file ? L.green : L.border}
      borderRadius="18px"
      bg={file ? L.greenBg : L.bg}
      cursor="pointer"
      textAlign="center"
      onClick={onClick}
    >
      <Circle
        size="44px"
        bg={file ? L.greenBg : L.accentGlow2}
        border="1px solid"
        borderColor={file ? L.greenBorder : L.borderMid}
        mx="auto"
        mb={3}
      >
        <Icon
          as={file ? FiCheckCircle : FiUploadCloud}
          boxSize={5}
          color={file ? L.green : L.accentLight}
        />
      </Circle>
      <Text
        fontSize="13px"
        fontWeight="700"
        color={file ? L.green : L.text}
        mb={1}
      >
        {file ? file.name : label}
      </Text>
      {required && !file && (
        <Box
          display="inline-block"
          px={2}
          py={0.5}
          bg={L.accentGlow2}
          borderRadius="6px"
          border="1px solid"
          borderColor={L.borderMid}
          mt={1}
        >
          <Text fontSize="10px" fontWeight="700" color={L.accentLight}>
            Required
          </Text>
        </Box>
      )}
      {file && (
        <Box
          display="inline-block"
          px={2}
          py={0.5}
          bg={L.greenBg}
          borderRadius="6px"
          border="1px solid"
          borderColor={L.greenBorder}
          mt={1}
        >
          <Text fontSize="10px" fontWeight="700" color={L.green}>
            ✓ Uploaded
          </Text>
        </Box>
      )}
    </Box>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
function CheckoutPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceType = searchParams.get("type") || "rent";
  const vehicleId = searchParams.get("vehicleId") || "V-1001";
  const driverFee = serviceType === "hire" ? 150 : 0;

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await fetch("/api/vehicles");
        if (res.ok) {
          const data: Vehicle[] = await res.json();
          setVehicle(data.find((v) => v.id === vehicleId) || data[0]);
        }
      } catch (err) {
        console.error("Checkout fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [vehicleId]);

  const [files, setFiles] = useState<{
    idFront: File | null;
    idBack: File | null;
    license: File | null;
  }>({ idFront: null, idBack: null, license: null });

  const idFrontRef = useRef<HTMLInputElement>(null);
  const idBackRef = useRef<HTMLInputElement>(null);
  const licenseRef = useRef<HTMLInputElement>(null);

  const handleFileUpload =
    (type: "idFront" | "idBack" | "license") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) setFiles((prev) => ({ ...prev, [type]: file }));
    };

  const handleNextStep = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (step < 4) setStep(step + 1);
      else router.push("/customer/checkout/success");
    }, 1500);
  };

  const steps = [
    {
      n: 1,
      title: "Identity",
      iconSrc: "/icons/identity.svg",
    },
    {
      n: 2,
      title: "Biometrics",
      iconSrc: "/icons/biometric.svg",
    },
    {
      n: 3,
      title: "Guarantee",
      iconSrc: "/icons/guarantee.svg",
    },
    {
      n: 4,
      title: "Payment",
      iconSrc: "/icons/payment.svg",
    },
  ];

  const deposit = Math.max(
    vehicle?.price ? Math.round(vehicle.price * 3 * 0.25) : 500,
    300,
  );
  const rentalFee = vehicle?.price ? vehicle.price * 3 : 450;

  return (
    <>
      <Styles />
      <Box minH="100vh" bg={L.bg} py={{ base: 6, md: 10 }}>
        <Container maxW="1060px" px={{ base: 4, md: 6 }}>
          <VStack spacing={6} align="stretch">
            {/* ── STEP TRACKER ─────────────────────────────────────────── */}
            <StepTracker step={step} steps={steps} />

            {/* ── MAIN GRID ────────────────────────────────────────────── */}
            <Grid templateColumns={{ base: "1fr", lg: "1fr 320px" }} gap={6}>
              {/* LEFT — step content */}
              <GridItem>
                <Box
                  className="fu1"
                  bg={L.card}
                  borderRadius="24px"
                  border="1px solid"
                  borderColor={L.cardBorder}
                  boxShadow={L.shadow}
                  p={{ base: 6, md: 8 }}
                  minH="460px"
                  position="relative"
                  overflow="hidden"
                >
                  {/* corner glow */}
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    w="72px"
                    h="72px"
                    bg={`radial-gradient(circle at top left, ${L.accentGlow2}, transparent 70%)`}
                    pointerEvents="none"
                    zIndex={0}
                  />

                  {/* processing overlay */}
                  {isProcessing && (
                    <Center
                      position="absolute"
                      top={0}
                      right={0}
                      bottom={0}
                      left={0}
                      bg="rgba(255,255,255,0.88)"
                      sx={{ backdropFilter: "blur(4px)" }}
                      zIndex={10}
                      borderRadius="24px"
                    >
                      <VStack spacing={4}>
                        <Circle
                          size="64px"
                          bg={L.accentGlow2}
                          border="2px solid"
                          borderColor={L.borderMid}
                        >
                          <Spinner
                            size="lg"
                            color={L.accentLight}
                            thickness="3px"
                          />
                        </Circle>
                        <Text
                          fontSize="14px"
                          fontWeight="700"
                          color={L.accentLight}
                        >
                          Verifying…
                        </Text>
                        <Text fontSize="12px" color={L.muted}>
                          Securing your data
                        </Text>
                      </VStack>
                    </Center>
                  )}

                  <Box position="relative" zIndex={1}>
                    {/* ── STEP 1 — Identity ─────────────────────────── */}
                    {step === 1 && (
                      <VStack spacing={7} align="stretch">
                        <Box>
                          <HStack spacing={3} mb={2}>
                            <Circle
                              size="36px"
                              bg={L.accentGlow2}
                              border="1px solid"
                              borderColor={L.borderMid}
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Image
                                src="/icons/identity.svg"
                                alt="Identity"
                                boxSize={5}
                                color={L.accentLight}
                              />
                            </Circle>
                            <Box>
                              <Heading
                                fontSize="20px"
                                fontWeight="800"
                                color={L.text}
                              >
                                Identity Verification
                              </Heading>
                              <Text fontSize="12px" color={L.muted}>
                                Step 1 of 4
                              </Text>
                            </Box>
                          </HStack>
                          <Text fontSize="13px" color={L.muted} mt={1}>
                            Upload a government-issued ID to confirm your
                            identity. All documents are encrypted end-to-end.
                          </Text>
                        </Box>

                        {/* hidden inputs */}
                        <input
                          type="file"
                          hidden
                          ref={idFrontRef}
                          onChange={handleFileUpload("idFront")}
                          accept="image/*,.pdf"
                        />
                        <input
                          type="file"
                          hidden
                          ref={idBackRef}
                          onChange={handleFileUpload("idBack")}
                          accept="image/*,.pdf"
                        />
                        <input
                          type="file"
                          hidden
                          ref={licenseRef}
                          onChange={handleFileUpload("license")}
                          accept="image/*,.pdf"
                        />

                        <SimpleGrid
                          columns={{ base: 1, sm: 2, md: 3 }}
                          spacing={4}
                        >
                          <UploadZone
                            file={files.idFront}
                            label="ID / Passport Front"
                            onClick={() => idFrontRef.current?.click()}
                          />
                          <UploadZone
                            file={files.idBack}
                            label="ID / Passport Back"
                            onClick={() => idBackRef.current?.click()}
                          />
                          {serviceType === "rent" && (
                            <UploadZone
                              file={files.license}
                              label="Driver's License"
                              required
                              onClick={() => licenseRef.current?.click()}
                            />
                          )}
                        </SimpleGrid>

                        {/* security note */}
                        <Flex
                          align="center"
                          bg={L.accentGlow}
                          border="1px solid"
                          borderColor={L.borderMid}
                          borderRadius="14px"
                          px={4}
                          py={3}
                          gap={3}
                        >
                          <Circle
                            size="30px"
                            bg={L.accentGlow2}
                            border="1px solid"
                            borderColor={L.borderMid}
                            sx={{ flexShrink: 0 }}
                          >
                            <Icon
                              as={FiLock}
                              boxSize={3.5}
                              color={L.accentLight}
                            />
                          </Circle>
                          <Text fontSize="12px" color={L.textSub}>
                            <Text
                              as="span"
                              fontWeight="700"
                              color={L.accentLight}
                            >
                              256-bit encrypted.{" "}
                            </Text>
                            Documents are only used for identity verification
                            and never stored beyond your session.
                          </Text>
                        </Flex>
                      </VStack>
                    )}

                    {/* ── STEP 2 — Biometrics ───────────────────────── */}
                    {step === 2 && (
                      <VStack spacing={7} align="center" textAlign="center">
                        <Box>
                          <HStack spacing={3} mb={2} justify="center">
                            <Circle
                              size="36px"
                              bg={L.accentGlow2}
                              border="1px solid"
                              borderColor={L.borderMid}
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Image
                                src="/icons/biometric.svg"
                                alt="Biometric"
                                boxSize={5}
                                color={L.accentLight}
                              />
                            </Circle>
                            <Box textAlign="left">
                              <Heading
                                fontSize="20px"
                                fontWeight="800"
                                color={L.text}
                              >
                                Biometric Face Match
                              </Heading>
                              <Text fontSize="12px" color={L.muted}>
                                Step 2 of 4
                              </Text>
                            </Box>
                          </HStack>
                          <Text fontSize="13px" color={L.muted}>
                            Authenticate your rental using your device's
                            biometric sensors.
                          </Text>
                        </Box>

                        {/* face frame */}
                        <Box position="relative" display="inline-block">
                          {/* outer glow ring */}
                          <Box
                            position="absolute"
                            top="-8px"
                            right="-8px"
                            bottom="-8px"
                            left="-8px"
                            borderRadius="full"
                            border="2px solid"
                            borderColor={L.borderMid}
                            bg={L.accentGlow}
                          />
                          <Box
                            w="200px"
                            h="200px"
                            borderRadius="full"
                            border="3px solid"
                            borderColor={L.accentLight}
                            overflow="hidden"
                            position="relative"
                            boxShadow={`0 0 0 6px ${L.accentGlow2}, ${L.shadowGreen}`}
                          >
                            <Image
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=400&h=400&q=80"
                              w="100%"
                              h="100%"
                              objectFit="cover"
                              borderRadius="full"
                            />
                            {/* scan overlay */}
                            <Box
                              position="absolute"
                              top={0}
                              right={0}
                              bottom={0}
                              left={0}
                              bg="linear-gradient(180deg, rgba(30,110,30,0.08) 0%, transparent 50%, rgba(30,110,30,0.08) 100%)"
                              borderRadius="full"
                            />
                          </Box>
                          {/* corner markers */}
                          {[
                            {
                              top: "8px",
                              left: "8px",
                              borderTop: "3px solid",
                              borderLeft: "3px solid",
                            },
                            {
                              top: "8px",
                              right: "8px",
                              borderTop: "3px solid",
                              borderRight: "3px solid",
                            },
                            {
                              bottom: "8px",
                              left: "8px",
                              borderBottom: "3px solid",
                              borderLeft: "3px solid",
                            },
                            {
                              bottom: "8px",
                              right: "8px",
                              borderBottom: "3px solid",
                              borderRight: "3px solid",
                            },
                          ].map((style, i) => (
                            <Box
                              key={i}
                              position="absolute"
                              w="20px"
                              h="20px"
                              borderColor={L.accentLight}
                              {...style}
                            />
                          ))}
                        </Box>

                        <Box
                          px={4}
                          py={2}
                          bg={L.accentGlow2}
                          borderRadius="10px"
                          border="1px solid"
                          borderColor={L.borderMid}
                        >
                          <Text
                            fontSize="13px"
                            fontWeight="700"
                            color={L.accentLight}
                          >
                            Align your face within the frame
                          </Text>
                        </Box>

                        <Button
                          variant="outline"
                          borderColor={L.borderMid}
                          color={L.accentLight}
                          h="46px"
                          px={7}
                          borderRadius="14px"
                          fontWeight="700"
                          fontSize="13px"
                          leftIcon={<Icon as={FiActivity} boxSize={4} />}
                          _hover={{
                            bg: L.accentGlow,
                            borderColor: L.accentLight,
                          }}
                          transition="all .2s"
                        >
                          Use Device Biometrics
                        </Button>
                      </VStack>
                    )}

                    {/* ── STEP 3 — Guarantee ────────────────────────── */}
                    {step === 3 && (
                      <VStack spacing={7} align="stretch">
                        <Box>
                          <HStack spacing={3} mb={2}>
                            <Circle
                              size="36px"
                              bg={L.accentGlow2}
                              border="1px solid"
                              borderColor={L.borderMid}
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Image
                                src="/icons/guarantee.svg"
                                alt="Guarantee"
                                boxSize={5}
                                color={L.accentLight}
                              />
                            </Circle>
                            <Box>
                              <Heading
                                fontSize="20px"
                                fontWeight="800"
                                color={L.text}
                              >
                                Security Guarantee
                              </Heading>
                              <Text fontSize="12px" color={L.muted}>
                                Step 3 of 4
                              </Text>
                            </Box>
                          </HStack>
                          <Text fontSize="13px" color={L.muted}>
                            A temporary pre-authorisation hold will be placed on
                            your account and automatically released after a
                            damage-free inspection.
                          </Text>
                        </Box>

                        {/* deposit card */}
                        <Box
                          bg={L.bg}
                          borderRadius="18px"
                          border="1px solid"
                          borderColor={L.cardBorder}
                          overflow="hidden"
                        >
                          {/* top bar */}
                          <Box
                            px={6}
                            py={4}
                            bg="linear-gradient(135deg, #1e6e1e, #2d8c2d)"
                            borderRadius="18px 18px 0 0"
                          >
                            <Flex justify="space-between" align="center">
                              <HStack spacing={2.5}>
                                <Icon
                                  as={FiShield}
                                  boxSize={4}
                                  color="rgba(255,255,255,0.8)"
                                />
                                <Text
                                  fontSize="13px"
                                  fontWeight="700"
                                  color="white"
                                >
                                  Refundable Security Deposit
                                </Text>
                              </HStack>
                              <Text
                                fontWeight="800"
                                fontSize="22px"
                                color="white"
                              >
                                {formatCurrency(deposit)}
                              </Text>
                            </Flex>
                          </Box>

                          {/* details */}
                          <VStack
                            align="stretch"
                            spacing={0}
                            divider={<Box h="1px" bg={L.border} />}
                            px={6}
                            py={4}
                          >
                            {[
                              "Held for 24 hours after vehicle return",
                              "Standard for luxury and premium vehicle rentals",
                              "Auto-released upon damage-free inspection",
                              "Full refund to original payment method within 3–5 days",
                            ].map((item) => (
                              <HStack key={item} spacing={3} py={2.5}>
                                <Circle
                                  size="22px"
                                  bg={L.greenBg}
                                  border="1px solid"
                                  borderColor={L.greenBorder}
                                  sx={{ flexShrink: 0 }}
                                >
                                  <Icon
                                    as={FiCheckCircle}
                                    boxSize={3}
                                    color={L.green}
                                  />
                                </Circle>
                                <Text fontSize="13px" color={L.textSub}>
                                  {item}
                                </Text>
                              </HStack>
                            ))}
                          </VStack>
                        </Box>

                        {/* notice */}
                        <Flex
                          align="center"
                          bg={L.goldBg}
                          border="1px solid"
                          borderColor={L.goldBorder}
                          borderRadius="14px"
                          px={4}
                          py={3}
                          gap={3}
                        >
                          <Circle
                            size="30px"
                            bg="rgba(176,125,10,0.12)"
                            border="1px solid"
                            borderColor={L.goldBorder}
                            sx={{ flexShrink: 0 }}
                          >
                            <Icon
                              as={FiAlertCircle}
                              boxSize={3.5}
                              color={L.gold}
                            />
                          </Circle>
                          <Text fontSize="12px" color={L.textSub}>
                            <Text as="span" fontWeight="700" color={L.gold}>
                              Note:{" "}
                            </Text>
                            This is a hold, not a charge. Your card will not be
                            debited unless damages are reported.
                          </Text>
                        </Flex>
                      </VStack>
                    )}

                    {/* ── STEP 4 — Payment ──────────────────────────── */}
                    {step === 4 && (
                      <VStack spacing={7} align="stretch">
                        <Box>
                          <HStack spacing={3} mb={2}>
                            <Circle
                              size="36px"
                              bg={L.accentGlow2}
                              border="1px solid"
                              borderColor={L.borderMid}
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Image
                                src="/icons/payment.svg"
                                alt="Payment"
                                boxSize={5}
                                color={L.accentLight}
                              />
                            </Circle>
                            <Box>
                              <Heading
                                fontSize="20px"
                                fontWeight="800"
                                color={L.text}
                              >
                                Secure Payment
                              </Heading>
                              <Text fontSize="12px" color={L.muted}>
                                Step 4 of 4 · Final step
                              </Text>
                            </Box>
                          </HStack>
                          <Text fontSize="13px" color={L.muted}>
                            Choose your preferred payment method to complete the
                            booking.
                          </Text>
                        </Box>

                        <VStack spacing={3} align="stretch">
                          {/* selected card */}
                          <Box
                            className="payment-option selected"
                            p={5}
                            border="2px solid"
                            borderColor={L.accentLight}
                            borderRadius="18px"
                            bg={L.accentGlow}
                          >
                            <Flex justify="space-between" align="center">
                              <HStack spacing={4}>
                                <Circle
                                  size="42px"
                                  bg={L.accentGlow2}
                                  border="1px solid"
                                  borderColor={L.borderMid}
                                >
                                  <Icon
                                    as={FiCreditCard}
                                    boxSize={4.5}
                                    color={L.accentLight}
                                  />
                                </Circle>
                                <Box>
                                  <Text
                                    fontWeight="700"
                                    fontSize="14px"
                                    color={L.text}
                                  >
                                    Digital Credit Card
                                  </Text>
                                  <Text fontSize="12px" color={L.muted}>
                                    •••• •••• •••• 7721
                                  </Text>
                                </Box>
                              </HStack>
                              <Circle size="24px" bg={L.accentLight}>
                                <Icon
                                  as={FiCheckCircle}
                                  boxSize={3.5}
                                  color="white"
                                />
                              </Circle>
                            </Flex>
                          </Box>

                          {/* inactive option */}
                          <Box
                            className="payment-option"
                            p={5}
                            border="1px solid"
                            borderColor={L.border}
                            borderRadius="18px"
                            bg={L.bg}
                            opacity={0.65}
                          >
                            <HStack spacing={4}>
                              <Circle
                                size="42px"
                                bg={L.bg2}
                                border="1px solid"
                                borderColor={L.border}
                              >
                                <Icon
                                  as={FiBriefcase}
                                  boxSize={4.5}
                                  color={L.subtle}
                                />
                              </Circle>
                              <Box>
                                <Text
                                  fontWeight="600"
                                  fontSize="14px"
                                  color={L.muted}
                                >
                                  Corporate Billing
                                </Text>
                                <Text fontSize="12px" color={L.subtle}>
                                  Pending authorisation
                                </Text>
                              </Box>
                            </HStack>
                          </Box>
                        </VStack>

                        {/* security seal row */}
                        <Flex
                          align="center"
                          bg={L.accentGlow}
                          border="1px solid"
                          borderColor={L.borderMid}
                          borderRadius="14px"
                          px={4}
                          py={3}
                          gap={4}
                          flexWrap="wrap"
                        >
                          {[
                            { icon: FiShield, label: "SSL Secured" },
                            { icon: FiLock, label: "256-bit Encrypt" },
                            { icon: FiZap, label: "Instant Confirm" },
                          ].map((s) => (
                            <HStack key={s.label} spacing={1.5}>
                              <Icon
                                as={s.icon}
                                boxSize={3.5}
                                color={L.accentLight}
                              />
                              <Text
                                fontSize="11px"
                                fontWeight="700"
                                color={L.accentLight}
                              >
                                {s.label}
                              </Text>
                            </HStack>
                          ))}
                        </Flex>
                      </VStack>
                    )}

                    {/* ── CTA BUTTON ────────────────────────────────── */}
                    <Box mt={8}>
                      <Button
                        className="cta-btn"
                        w="full"
                        h="56px"
                        bg="linear-gradient(135deg, #1e6e1e, #2d8c2d)"
                        color="white"
                        borderRadius="16px"
                        fontSize="15px"
                        fontWeight="800"
                        onClick={handleNextStep}
                        rightIcon={
                          <Icon
                            as={step === 4 ? FiCheckCircle : FiArrowRight}
                            boxSize={4.5}
                          />
                        }
                        boxShadow="0 6px 24px rgba(30,110,30,0.25)"
                        _hover={{}}
                        _active={{ transform: "translateY(1px)" }}
                        isLoading={isProcessing}
                        loadingText="Verifying…"
                      >
                        {step === 4
                          ? "Confirm & Secure Rental"
                          : `Continue to ${steps[step]?.title || "Next Step"}`}
                      </Button>

                      {step < 4 && (
                        <Text
                          textAlign="center"
                          fontSize="11px"
                          color={L.subtle}
                          mt={3}
                        >
                          Your progress is saved automatically
                        </Text>
                      )}
                    </Box>
                  </Box>
                </Box>
              </GridItem>

              {/* RIGHT — booking summary */}
              <GridItem>
                <Box className="summary-card fu2">
                  <Card p="6">
                    {/* header */}
                    <Flex align="center" justify="space-between" mb={5}>
                      <Text fontSize="15px" fontWeight="800" color={L.text}>
                        Booking Summary
                      </Text>
                      <Box
                        px={2.5}
                        py={1}
                        bg={L.accentGlow2}
                        borderRadius="8px"
                        border="1px solid"
                        borderColor={L.borderMid}
                      >
                        <Text
                          fontSize="10px"
                          fontWeight="700"
                          color={L.accentLight}
                          textTransform="uppercase"
                        >
                          {serviceType === "rent"
                            ? "Self-Drive"
                            : "With Driver"}
                        </Text>
                      </Box>
                    </Flex>

                    {/* vehicle */}
                    <Flex align="center" mb={5} gap={3}>
                      <Box
                        w="64px"
                        h="64px"
                        borderRadius="14px"
                        overflow="hidden"
                        flexShrink={0}
                        border="1px solid"
                        borderColor={L.cardBorder}
                      >
                        <Image
                          src={
                            vehicle?.image ||
                            "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=200"
                          }
                          alt={vehicle?.name || "Vehicle"}
                          w="100%"
                          h="100%"
                          objectFit="cover"
                        />
                      </Box>
                      <Box>
                        <Text
                          fontWeight="800"
                          fontSize="14px"
                          color={L.text}
                          noOfLines={1}
                        >
                          {vehicle?.name || "Loading…"}
                        </Text>
                        <Text fontSize="11px" color={L.muted} mt={0.5}>
                          3-Day Rental
                        </Text>
                        <Box
                          display="inline-block"
                          mt={1}
                          px={2}
                          py={0.5}
                          bg={L.accentGlow2}
                          borderRadius="6px"
                          border="1px solid"
                          borderColor={L.borderMid}
                        >
                          <Text
                            fontSize="10px"
                            fontWeight="700"
                            color={L.accentLight}
                          >
                            Confirmed
                          </Text>
                        </Box>
                      </Box>
                    </Flex>

                    <Box h="1px" bg={L.border} mb={5} />

                    {/* line items */}
                    <VStack spacing={3} align="stretch" mb={5}>
                      {[
                        {
                          label: "Rental Fee (3 days)",
                          value: formatCurrency(rentalFee),
                          color: L.text,
                        },
                        ...(serviceType === "hire"
                          ? [
                              {
                                label: "Chauffeur Service",
                                value: formatCurrency(driverFee),
                                color: L.text,
                              },
                            ]
                          : []),
                        {
                          label: "Insurance (VIP)",
                          value: "FREE",
                          color: L.green,
                        },
                        ...(step >= 3
                          ? [
                              {
                                label: "Security Hold",
                                value: formatCurrency(deposit),
                                color: L.muted,
                              },
                            ]
                          : []),
                      ].map((item) => (
                        <Flex
                          key={item.label}
                          justify="space-between"
                          align="center"
                        >
                          <Text fontSize="13px" color={L.muted}>
                            {item.label}
                          </Text>
                          <Text
                            fontSize="13px"
                            fontWeight="700"
                            color={item.color}
                          >
                            {item.value}
                          </Text>
                        </Flex>
                      ))}
                    </VStack>

                    {/* total */}
                    <Box
                      p={4}
                      bg="linear-gradient(135deg, #1e6e1e, #2d8c2d)"
                      borderRadius="14px"
                      mb={5}
                    >
                      <Flex justify="space-between" align="center">
                        <Text
                          fontSize="13px"
                          fontWeight="700"
                          color="rgba(255,255,255,0.8)"
                        >
                          Grand Total
                        </Text>
                        <Text
                          fontSize="22px"
                          fontWeight="800"
                          color="white"
                          letterSpacing="-0.03em"
                        >
                          {formatCurrency(rentalFee + driverFee)}
                        </Text>
                      </Flex>
                      {step >= 3 && (
                        <Text
                          fontSize="10px"
                          color="rgba(255,255,255,0.55)"
                          mt={1}
                        >
                          + {formatCurrency(deposit)} refundable hold
                        </Text>
                      )}
                    </Box>

                    {/* step progress indicators */}
                    <Box>
                      <Text
                        fontSize="11px"
                        fontWeight="700"
                        color={L.muted}
                        textTransform="uppercase"
                        letterSpacing=".08em"
                        mb={3}
                      >
                        Checkout Progress
                      </Text>
                      <VStack spacing={2} align="stretch">
                        {steps.map((s) => {
                          const done = step > s.n;
                          const active = step === s.n;
                          return (
                            <Flex key={s.n} align="center" gap={2.5}>
                              <Circle
                                size="20px"
                                bg={
                                  done
                                    ? L.accentLight
                                    : active
                                      ? L.accentGlow2
                                      : L.bg
                                }
                                border="1px solid"
                                borderColor={
                                  done
                                    ? L.accentLight
                                    : active
                                      ? L.borderMid
                                      : L.border
                                }
                                sx={{ flexShrink: 0 }}
                              >
                                {done ? (
                                  <Icon
                                    as={FiCheckCircle}
                                    boxSize="10px"
                                    color="white"
                                  />
                                ) : (
                                  <Text
                                    fontSize="9px"
                                    fontWeight="800"
                                    color={active ? L.accentLight : L.subtle}
                                  >
                                    {s.n}
                                  </Text>
                                )}
                              </Circle>
                              <Text
                                fontSize="12px"
                                fontWeight={active ? "700" : "500"}
                                color={done || active ? L.textSub : L.subtle}
                                flex={1}
                              >
                                {s.title}
                              </Text>
                              {done && (
                                <Text
                                  fontSize="10px"
                                  fontWeight="700"
                                  color={L.green}
                                >
                                  Done
                                </Text>
                              )}
                              {active && (
                                <Text
                                  fontSize="10px"
                                  fontWeight="700"
                                  color={L.accentLight}
                                >
                                  Active
                                </Text>
                              )}
                            </Flex>
                          );
                        })}
                      </VStack>
                    </Box>
                  </Card>
                </Box>
              </GridItem>
            </Grid>
          </VStack>
        </Container>
      </Box>
    </>
  );
}

// ─── EXPORT WITH SUSPENSE ─────────────────────────────────────────────────────
export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <Center minH="100vh" bg="#f4f7f4">
          <VStack spacing={4}>
            <Spinner size="lg" color="#2d8c2d" thickness="3px" />
            <Text color="#3a4d3a" fontSize="14px" fontWeight="600">
              Loading checkout...
            </Text>
          </VStack>
        </Center>
      }
    >
      <CheckoutPageContent />
    </Suspense>
  );
}
