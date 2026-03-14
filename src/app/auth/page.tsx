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

    .panel-switch { transition: all .45s cubic-bezier(.25,.46,.45,.94); }

    .input-field { transition: all .2s ease !important; }

    .btn-main {
      transition: all .25s cubic-bezier(.25,.46,.45,.94) !important;
      position: relative;
      overflow: hidden;
    }
    .btn-main:hover { transform: translateY(-3px) !important; }
    .btn-main:active { transform: translateY(0) !important; }

    .btn-google { transition: all .2s ease !important; }
    .btn-google:hover { transform: translateY(-2px) !important; }

    .strength-bar { transition: width .4s ease, background .4s ease; }
    .feature-card { transition: transform .2s ease; }
    .feature-card:hover { transform: translateY(-4px); }
    .tab-pill { transition: all .25s ease; cursor: pointer; }

    .divider-line { transition: background-color .2s ease; }
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
        bg="#ffffff" border="1px solid" borderColor="rgba(30,110,30,0.1)"
        borderRadius="20px" overflow="hidden" mx={4}
        boxShadow="0 24px 64px rgba(0,0,0,0.18)"
      >
        <Box h="4px" bg="linear-gradient(90deg, #1e6e1e, #2d8c2d, #52b852)" />

        <ModalHeader bg="#eef3ee" borderBottom="1px solid" borderColor="rgba(0,0,0,0.07)" px={7} py={5}>
          <Text fontSize="20px" fontWeight="800" color="#111a11" letterSpacing="-0.02em">
            Select your portal
          </Text>
          <Text fontSize="13px" color="#6b7f6b" mt={1}>Choose where you'd like to go</Text>
        </ModalHeader>
        <ModalCloseButton top={4} right={5} color="#9aaa9a" borderRadius="8px"
          _hover={{ bg: "rgba(30,110,30,0.08)", color: "#111a11" }} />

        <ModalBody px={5} py="20px 20px 26px 20px">
          <VStack spacing={3} align="stretch">

            {/* Business Portal */}
            <Box
              as="button" w="100%" textAlign="left" p={5} borderRadius="16px"
              bg="#ffffff" border="1px solid" borderColor="rgba(0,0,0,0.07)"
              cursor="pointer" transition="all 0.2s ease"
              onClick={() => handlePortalSelect("business")}
              _hover={{ borderColor: "#2d8c2d", bg: "rgba(30,110,30,0.05)" }}
            >
              <HStack spacing={3.5} mb={2.5} align="center">
                <Box w="44px" h="44px" borderRadius="12px" flexShrink={0}
                  bg="rgba(30,110,30,0.1)" border="1px solid" borderColor="rgba(30,110,30,0.18)"
                  display="flex" alignItems="center" justifyContent="center"
                  fontSize="22px" lineHeight="1">
                  💼
                </Box>
                <Text flex={1} fontSize="15px" fontWeight="800" color="#111a11">
                  Business Portal
                </Text>
                <Icon as={FiChevronRight} boxSize={4} color="#9aaa9a" />
              </HStack>
              <Text fontSize="13px" color="#6b7f6b" pl="58px" lineHeight="1.55" mb={3}>
                Manage fleet, bookings, and revenue
              </Text>
              <HStack spacing={1.5} pl="58px" flexWrap="wrap">
                {["Fleet", "Bookings", "Revenue"].map(tag => (
                  <Box key={tag} px={2.25} py={0.5} borderRadius="6px"
                    bg="rgba(30,110,30,0.1)" border="1px solid" borderColor="rgba(30,110,30,0.18)">
                    <Text fontSize="11px" fontWeight="700" color="#2d8c2d">{tag}</Text>
                  </Box>
                ))}
              </HStack>
            </Box>

            {/* Customer Portal */}
            <Box
              as="button" w="100%" textAlign="left" p={5} borderRadius="16px"
              bg="#ffffff" border="1px solid" borderColor="rgba(0,0,0,0.07)"
              cursor="pointer" transition="all 0.2s ease"
              onClick={() => handlePortalSelect("customer")}
              _hover={{ borderColor: "#1a56a0", bg: "rgba(26,86,160,0.05)" }}
            >
              <HStack spacing={3.5} mb={2.5} align="center">
                <Box w="44px" h="44px" borderRadius="12px" flexShrink={0}
                  bg="rgba(26,86,160,0.08)" border="1px solid" borderColor="rgba(26,86,160,0.18)"
                  display="flex" alignItems="center" justifyContent="center"
                  fontSize="22px" lineHeight="1">
                  🚗
                </Box>
                <Text flex={1} fontSize="15px" fontWeight="800" color="#111a11">
                  Customer Portal
                </Text>
                <Icon as={FiChevronRight} boxSize={4} color="#9aaa9a" />
              </HStack>
              <Text fontSize="13px" color="#6b7f6b" pl="58px" lineHeight="1.55" mb={3}>
                Book vehicles and manage your rentals
              </Text>
              <HStack spacing={1.5} pl="58px" flexWrap="wrap">
                {["Browse", "Book", "Track"].map(tag => (
                  <Box key={tag} px={2.25} py={0.5} borderRadius="6px"
                    bg="rgba(26,86,160,0.08)" border="1px solid" borderColor="rgba(26,86,160,0.18)">
                    <Text fontSize="11px" fontWeight="700" color="#1a56a0">{tag}</Text>
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
  const features = [
    { icon: FiZap, text: "Instant booking confirmation" },
    { icon: FiShield, text: "Zero deposit for Gold members" },
    { icon: FiStar, text: "Earn loyalty points every trip" },
  ];

  const isDark = tokens.pageBg === "#0a0f0d";
  const gradColor = isDark ? "#00cc66" : "#00a855";

  return (
    <Box
      position="relative"
      overflow="hidden"
      bg={
        isDark
          ? "linear-gradient(160deg, #0d380d 0%, #154a15 40%, #1e6e1e 100%)"
          : "linear-gradient(160deg, #e6fffa 0%, #d4eee9 40%, #c2e8de 100%)"
      }
      display={{ base: "none", lg: "flex" }}
      flexDir="column"
      justifyContent="space-between"
      p={{ lg: 10, xl: 14 }}
      minH="100vh"
    >
      {/* Grid pattern */}
      <Box
        position="absolute"
        inset={0}
        opacity={isDark ? 0.06 : 0.04}
        bgImage={`linear-gradient(${isDark ? "rgba(0,255,136,1)" : "rgba(0,168,85,1)"} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? "rgba(0,255,136,1)" : "rgba(0,168,85,1)"} 1px, transparent 1px)`}
        bgSize="48px 48px"
      />

      {/* Orbs */}
      <Box
        position="absolute"
        top="-100px"
        right="-80px"
        w="400px"
        h="400px"
        bg={
          isDark
            ? "radial-gradient(circle, rgba(0,255,136,0.25) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(0,168,85,0.2) 0%, transparent 70%)"
        }
        className="float"
      />
      <Box
        position="absolute"
        bottom="-80px"
        left="-60px"
        w="350px"
        h="350px"
        bg={
          isDark
            ? "radial-gradient(circle, rgba(0,255,136,0.15) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(0,168,85,0.15) 0%, transparent 70%)"
        }
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

      {/* Main copy */}
      <VStack align="start" spacing={8} position="relative" zIndex={2}>
        <Box>
          <Badge
            bg={isDark ? "rgba(0,255,136,0.15)" : "rgba(0,168,85,0.15)"}
            color={gradColor}
            borderRadius="full"
            px={3}
            py={1}
            fontSize="11px"
            fontWeight="700"
            mb={5}
            border={`1px solid ${isDark ? "rgba(0,255,136,0.3)" : "rgba(0,168,85,0.3)"}`}
          >
            {isLogin ? "👋 Welcome back" : "🚀 Join DriveKE today"}
          </Badge>
          <Heading
            fontSize={{ lg: "36px", xl: "46px" }}
            color={isDark ? "white" : "#0a0f0d"}
            fontWeight="800"
            lineHeight="1.1"
            letterSpacing="-0.03em"
            mb={4}
          >
            {isLogin
              ? "Your next\nadventure\nawaits."
              : "Premium rides.\nLoyalty\nrewards."}
          </Heading>
          <Text
            color={isDark ? "rgba(255,255,255,0.6)" : "rgba(10,15,13,0.6)"}
            fontSize="15px"
            lineHeight="1.8"
            fontWeight="300"
            maxW="340px"
          >
            {isLogin
              ? "Sign in to access your bookings, loyalty points, and exclusive member deals."
              : "Create your account and unlock access to Kenya's finest fleet with member-only pricing."}
          </Text>
        </Box>

        {/* Feature list */}
        <VStack align="start" spacing={4}>
          {features.map((f, i) => (
            <HStack key={i} spacing={3} className="feature-card">
              <Box
                w="36px"
                h="36px"
                bg={isDark ? "rgba(0,255,136,0.1)" : "rgba(0,168,85,0.1)"}
                borderRadius="50%"
                border={`1px solid ${isDark ? "rgba(0,255,136,0.2)" : "rgba(0,168,85,0.2)"}`}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={f.icon} color={gradColor} boxSize={4} />
              </Box>
              <Text
                fontSize="14px"
                color={isDark ? "rgba(255,255,255,0.8)" : "rgba(10,15,13,0.8)"}
                fontWeight="500"
              >
                {f.text}
              </Text>
            </HStack>
          ))}
        </VStack>

        {/* Car image */}
        <Box
          borderRadius="2xl"
          overflow="hidden"
          border={`1px solid ${isDark ? "rgba(0,255,136,0.2)" : "rgba(0,168,85,0.15)"}`}
          boxShadow={
            isDark
              ? "0 24px 60px rgba(0,0,0,0.4)"
              : "0 8px 24px rgba(0,0,0,0.08)"
          }
          w="100%"
          className="fi"
        >
          <Image
            src="https://images.unsplash.com/photo-1619362280286-f1f8fd5032ed?w=800&h=400&fit=crop"
            w="100%"
            h="200px"
            objectFit="cover"
            style={{ filter: isDark ? "brightness(0.85)" : "brightness(1)" }}
          />
          <Box
            bg={isDark ? "rgba(0,255,136,0.05)" : "rgba(0,168,85,0.05)"}
            px={5}
            py={4}
            borderTop={`1px solid ${isDark ? "rgba(0,255,136,0.1)" : "rgba(0,168,85,0.1)"}`}
          >
            <HStack justify="space-between">
              <Box>
                <Text fontSize="11px" color={tokens.textMuted} fontWeight="600">
                  FLEET AVERAGE
                </Text>
                <Text
                  fontSize="15px"
                  color={isDark ? "white" : "#0a0f0d"}
                  fontWeight="700"
                >
                  KSh 6,500 / day
                </Text>
              </Box>
              <HStack spacing={1}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Icon key={s} as={FiStar} color="#f6c90e" boxSize={3} />
                ))}
                <Text fontSize="12px" color={tokens.textMuted} ml={1}>
                  4.9
                </Text>
              </HStack>
            </HStack>
          </Box>
        </Box>
      </VStack>

      {/* Bottom */}
      <Text
        fontSize="12px"
        color={tokens.textSubtle}
        position="relative"
        zIndex={2}
      >
        © 2025 DriveKE · Premium Car Hire across Kenya
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
      onOpen(); // Open portal selector after validation
    }, 1000);
  };

  return (
    <>
      <VStack spacing={6} align="stretch" className="si">
        {/* Header */}
        <Box mb={2}>
          <Heading
            fontSize={{ base: "26px", md: "32px" }}
            fontWeight="800"
            letterSpacing="-0.03em"
            mb={1.5}
            color={tokens.textPrimary}
          >
            Sign in to your account
          </Heading>
          <Text fontSize="14px" color={tokens.textMuted}>
            Don't have an account?{" "}
            <Text
              as="span"
              color={tokens.accent}
              fontWeight="600"
              cursor="pointer"
              onClick={onSwitch}
              _hover={{ textDecoration: "underline" }}
            >
              Create one free →
            </Text>
          </Text>
        </Box>

        {/* Google */}
        <Button
          className="btn-google"
          h="52px"
          bg={tokens.cardBg2}
          border="1px solid"
          borderColor={tokens.border}
          borderRadius="16px"
          fontWeight="600"
          fontSize="14px"
          color={tokens.textPrimary}
          leftIcon={<FcGoogle size={20} />}
          _hover={{ bg: tokens.cardBg }}
        >
          Continue with Google
        </Button>

        {/* Divider */}
        <HStack spacing={3}>
          <Box flex={1} h="1px" bg={tokens.border} className="divider-line" />
          <Text fontSize="12px" color={tokens.textSubtle} fontWeight="500">
            or sign in with email
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
            mb={2}
          >
            Email Address
          </FormLabel>
          <InputGroup>
            <InputLeftElement h="52px" pl={1}>
              <Icon as={FiMail} color={tokens.textSubtle} boxSize={4} />
            </InputLeftElement>
            <Input
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              h="52px"
              bg={tokens.cardBg2}
              border="1px solid"
              borderColor={tokens.border}
              borderRadius="14px"
              fontSize="15px"
              color={tokens.textPrimary}
              _placeholder={{ color: tokens.textSubtle }}
              _focus={{ outline: "none", borderColor: tokens.accent }}
            />
          </InputGroup>
          <FormErrorMessage fontSize="12px" color={tokens.danger}>
            {errors.email}
          </FormErrorMessage>
        </FormControl>

        {/* Password */}
        <FormControl isInvalid={!!errors.pw}>
          <HStack justify="space-between" mb={2}>
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
              color={tokens.accent}
              fontWeight="600"
              cursor="pointer"
              _hover={{ textDecoration: "underline" }}
            >
              Forgot password?
            </Text>
          </HStack>
          <InputGroup>
            <InputLeftElement h="52px" pl={1}>
              <Icon as={FiLock} color={tokens.textSubtle} boxSize={4} />
            </InputLeftElement>
            <Input
              className="input-field"
              type={showPw ? "text" : "password"}
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="••••••••"
              h="52px"
              bg={tokens.cardBg2}
              border="1px solid"
              borderColor={tokens.border}
              borderRadius="14px"
              fontSize="15px"
              color={tokens.textPrimary}
              _placeholder={{ color: tokens.textSubtle }}
              _focus={{ outline: "none", borderColor: tokens.accent }}
            />
            <InputRightElement
              h="52px"
              pr={2}
              cursor="pointer"
              onClick={() => setShowPw(!showPw)}
            >
              <Icon
                as={showPw ? FiEyeOff : FiEye}
                color={tokens.textSubtle}
                boxSize={4}
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage fontSize="12px" color={tokens.danger}>
            {errors.pw}
          </FormErrorMessage>
        </FormControl>

        {/* Remember me */}
        <HStack>
          <Checkbox size="md" colorScheme="green" borderColor={tokens.border}>
            <Text fontSize="13px" color={tokens.textMuted}>
              Remember me for 30 days
            </Text>
          </Checkbox>
        </HStack>

        {/* Submit */}
        <Button
          className="btn-main"
          h="54px"
          bg={tokens.accent}
          color={tokens.accent === "#00a855" ? "#ffffff" : "#0a0f0d"}
          borderRadius="16px"
          fontWeight="700"
          fontSize="15px"
          rightIcon={<Icon as={FiArrowRight} />}
          isLoading={loading}
          loadingText="Signing in…"
          _hover={{ opacity: 0.9 }}
          onClick={handleSubmit}
        >
          Sign In
        </Button>

        {/* Trust row */}
        <HStack justify="center" spacing={5} pt={1} flexWrap="wrap">
          {[
            { icon: FiShield, text: "SSL Secured" },
            { icon: FiCheck, text: "No hidden fees" },
            { icon: FiStar, text: "Rated 4.9/5" },
          ].map(({ icon, text }) => (
            <HStack key={text} spacing={1.5}>
              <Icon as={icon} color={tokens.accent} boxSize={3} />
              <Text fontSize="11px" color={tokens.textSubtle} fontWeight="500">
                {text}
              </Text>
            </HStack>
          ))}
        </HStack>
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
      onOpen(); // Open portal selector after validation
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
              _hover={{ color: tokens.accent }}
              transition="color .2s"
            >
              <Icon as={FiChevronLeft} boxSize={4} color={tokens.textMuted} />
              <Text fontSize="13px" color={tokens.textMuted} fontWeight="600">
                Back
              </Text>
            </HStack>
          )}
          <Heading
            fontSize={{ base: "24px", md: "30px" }}
            fontWeight="800"
            letterSpacing="-0.03em"
            mb={1.5}
            color={tokens.textPrimary}
          >
            {step === 1 ? "Create your account" : "Set your password"}
          </Heading>
          <Text fontSize="14px" color={tokens.textMuted}>
            Already have an account?{" "}
            <Text
              as="span"
              color={tokens.accent}
              fontWeight="600"
              cursor="pointer"
              onClick={onSwitch}
              _hover={{ textDecoration: "underline" }}
            >
              Sign in →
            </Text>
          </Text>
        </Box>

        {/* Step indicator */}
        <HStack spacing={2}>
          {[1, 2].map((s) => (
            <Box
              key={s}
              flex={1}
              h="3px"
              borderRadius="full"
              bg={s <= step ? tokens.accent : tokens.border}
              transition="background .4s ease"
            />
          ))}
        </HStack>
        <Text
          fontSize="11px"
          color={tokens.textSubtle}
          fontWeight="600"
          mt={-2}
        >
          STEP {step} OF 2
        </Text>

        {step === 1 ? (
          <>
            {/* Google */}
            <Button
              className="btn-google"
              h="50px"
              bg={tokens.cardBg2}
              border="1px solid"
              borderColor={tokens.border}
              borderRadius="14px"
              fontWeight="600"
              fontSize="14px"
              color={tokens.textPrimary}
              leftIcon={<FcGoogle size={18} />}
              _hover={{ bg: tokens.cardBg }}
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
              <Text fontSize="11px" color={tokens.textSubtle}>
                or fill in your details
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
                  mb={1.5}
                >
                  First Name
                </FormLabel>
                <InputGroup>
                  <InputLeftElement h="50px" pl={1}>
                    <Icon as={FiUser} color={tokens.textSubtle} boxSize={4} />
                  </InputLeftElement>
                  <Input
                    className="input-field"
                    h="50px"
                    bg={tokens.cardBg2}
                    border="1px solid"
                    borderColor={tokens.border}
                    borderRadius="13px"
                    fontSize="14px"
                    color={tokens.textPrimary}
                    placeholder="James"
                    _placeholder={{ color: tokens.textSubtle }}
                    _focus={{ outline: "none", borderColor: tokens.accent }}
                    value={form.firstName}
                    onChange={(e) => set("firstName", e.target.value)}
                  />
                </InputGroup>
                <FormErrorMessage fontSize="11px" color={tokens.danger}>
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
                  mb={1.5}
                >
                  Last Name
                </FormLabel>
                <Input
                  className="input-field"
                  h="50px"
                  bg={tokens.cardBg2}
                  border="1px solid"
                  borderColor={tokens.border}
                  borderRadius="13px"
                  fontSize="14px"
                  color={tokens.textPrimary}
                  placeholder="Kariuki"
                  _placeholder={{ color: tokens.textSubtle }}
                  _focus={{ outline: "none", borderColor: tokens.accent }}
                  value={form.lastName}
                  onChange={(e) => set("lastName", e.target.value)}
                />
                <FormErrorMessage fontSize="11px" color={tokens.danger}>
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
                mb={1.5}
              >
                Email Address
              </FormLabel>
              <InputGroup>
                <InputLeftElement h="50px" pl={1}>
                  <Icon as={FiMail} color={tokens.textSubtle} boxSize={4} />
                </InputLeftElement>
                <Input
                  className="input-field"
                  h="50px"
                  bg={tokens.cardBg2}
                  border="1px solid"
                  borderColor={tokens.border}
                  borderRadius="13px"
                  fontSize="14px"
                  color={tokens.textPrimary}
                  placeholder="james@email.com"
                  _placeholder={{ color: tokens.textSubtle }}
                  _focus={{ outline: "none", borderColor: tokens.accent }}
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                />
              </InputGroup>
              <FormErrorMessage fontSize="11px" color={tokens.danger}>
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
                mb={1.5}
              >
                Phone Number
              </FormLabel>
              <InputGroup>
                <InputLeftElement h="50px" pl={1}>
                  <Icon as={FiPhone} color={tokens.textSubtle} boxSize={4} />
                </InputLeftElement>
                <Input
                  className="input-field"
                  h="50px"
                  bg={tokens.cardBg2}
                  border="1px solid"
                  borderColor={tokens.border}
                  borderRadius="13px"
                  fontSize="14px"
                  color={tokens.textPrimary}
                  placeholder="+254 712 345 678"
                  _placeholder={{ color: tokens.textSubtle }}
                  _focus={{ outline: "none", borderColor: tokens.accent }}
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                />
              </InputGroup>
              <FormErrorMessage fontSize="11px" color={tokens.danger}>
                {errors.phone}
              </FormErrorMessage>
            </FormControl>

            <Button
              className="btn-main"
              h="52px"
              bg={tokens.accent}
              color={tokens.accent === "#00a855" ? "#ffffff" : "#0a0f0d"}
              borderRadius="15px"
              fontWeight="700"
              fontSize="15px"
              rightIcon={<Icon as={FiArrowRight} />}
              _hover={{ opacity: 0.9 }}
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
                mb={1.5}
              >
                Password
              </FormLabel>
              <InputGroup>
                <InputLeftElement h="50px" pl={1}>
                  <Icon as={FiLock} color={tokens.textSubtle} boxSize={4} />
                </InputLeftElement>
                <Input
                  className="input-field"
                  type={showPw ? "text" : "password"}
                  h="50px"
                  bg={tokens.cardBg2}
                  border="1px solid"
                  borderColor={tokens.border}
                  borderRadius="13px"
                  fontSize="14px"
                  color={tokens.textPrimary}
                  placeholder="Min. 8 characters"
                  _placeholder={{ color: tokens.textSubtle }}
                  _focus={{ outline: "none", borderColor: tokens.accent }}
                  value={form.password}
                  onChange={(e) => set("password", e.target.value)}
                />
                <InputRightElement
                  h="50px"
                  pr={2}
                  cursor="pointer"
                  onClick={() => setShowPw(!showPw)}
                >
                  <Icon
                    as={showPw ? FiEyeOff : FiEye}
                    color={tokens.textSubtle}
                    boxSize={4}
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage fontSize="11px" color={tokens.danger}>
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
                  <Text fontSize="11px" color={strength.color} fontWeight="600">
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
                mb={1.5}
              >
                Confirm Password
              </FormLabel>
              <InputGroup>
                <InputLeftElement h="50px" pl={1}>
                  <Icon as={FiLock} color={tokens.textSubtle} boxSize={4} />
                </InputLeftElement>
                <Input
                  className="input-field"
                  type={showConf ? "text" : "password"}
                  h="50px"
                  bg={tokens.cardBg2}
                  border="1px solid"
                  borderColor={tokens.border}
                  borderRadius="13px"
                  fontSize="14px"
                  color={tokens.textPrimary}
                  placeholder="Re-enter password"
                  _placeholder={{ color: tokens.textSubtle }}
                  _focus={{ outline: "none", borderColor: tokens.accent }}
                  value={form.confirm}
                  onChange={(e) => set("confirm", e.target.value)}
                />
                <InputRightElement
                  h="50px"
                  pr={2}
                  cursor="pointer"
                  onClick={() => setShowConf(!showConf)}
                >
                  <Icon
                    as={showConf ? FiEyeOff : FiEye}
                    color={tokens.textSubtle}
                    boxSize={4}
                  />
                </InputRightElement>
              </InputGroup>
              {form.confirm && form.confirm === form.password && (
                <HStack mt={1.5} spacing={1.5}>
                  <Icon as={FiCheck} color={tokens.accent} boxSize={3} />
                  <Text fontSize="11px" color={tokens.accent} fontWeight="600">
                    Passwords match
                  </Text>
                </HStack>
              )}
              <FormErrorMessage fontSize="11px" color={tokens.danger}>
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
                mb={1.5}
              >
                ID / Licence Type
              </FormLabel>
              <Select
                h="50px"
                bg={tokens.cardBg2}
                border="1px solid"
                borderColor={tokens.border}
                borderRadius="13px"
                fontSize="14px"
                color={form.idType ? tokens.textPrimary : tokens.textSubtle}
                _focus={{ borderColor: tokens.accent, outline: "none" }}
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
                isChecked={form.agree}
                onChange={(e) => set("agree", e.target.checked)}
              >
                <Text fontSize="13px" color={tokens.textMuted} lineHeight="1.6">
                  I agree to DriveKE's{" "}
                  <Text as="span" color={tokens.accent} cursor="pointer">
                    Terms of Service
                  </Text>{" "}
                  and{" "}
                  <Text as="span" color={tokens.accent} cursor="pointer">
                    Privacy Policy
                  </Text>
                </Text>
              </Checkbox>
              <FormErrorMessage fontSize="11px" color={tokens.danger}>
                {errors.agree}
              </FormErrorMessage>
            </FormControl>

            <Button
              className="btn-main"
              h="52px"
              bg={tokens.accent}
              color={tokens.accent === "#00a855" ? "#ffffff" : "#0a0f0d"}
              borderRadius="15px"
              fontWeight="700"
              fontSize="15px"
              rightIcon={<Icon as={FiCheck} />}
              isLoading={loading}
              loadingText="Creating account…"
              _hover={{ opacity: 0.9 }}
              onClick={handleSubmit}
            >
              Create Account
            </Button>

            {/* Trust */}
            <HStack justify="center" spacing={4} pt={1} flexWrap="wrap">
              {[
                { icon: FiShield, text: "Your data is safe" },
                { icon: FiCheck, text: "Free to join" },
                { icon: FiZap, text: "Instant access" },
              ].map(({ icon, text }) => (
                <HStack key={text} spacing={1.5}>
                  <Icon as={icon} color={tokens.accent} boxSize={3} />
                  <Text
                    fontSize="11px"
                    color={tokens.textSubtle}
                    fontWeight="500"
                  >
                    {text}
                  </Text>
                </HStack>
              ))}
            </HStack>
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
          color={tokens.accent}
          _hover={{ bg: tokens.cardBg2 }}
        >
          {colorMode === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
        </Button>
      </Box>

      <Grid templateColumns={{ base: "1fr", lg: "480px 1fr" }} minH="100vh">
        {/* Left decorative panel — desktop only */}
        <LeftPanel mode={mode} tokens={tokens} />

        {/* Right form panel */}
        <Flex
          direction="column"
          justify="center"
          align="center"
          bg={tokens.pageBg}
          px={{ base: 5, sm: 8, md: 12, lg: 10, xl: 16 }}
          py={{ base: 8, lg: 12 }}
          minH="100vh"
        >
          <Box w="100%" maxW={{ base: "100%", sm: "440px", lg: "420px" }}>
            {/* Mobile theme toggle */}
            <HStack
              justify="flex-end"
              mb={3}
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
                color={tokens.accent}
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
              spacing={1}
              bg={tokens.cardBg2}
              p={1}
              borderRadius="16px"
              border="1px solid"
              borderColor={tokens.border}
              display={{ base: "flex", lg: "none" }}
              mb={2}
            >
              {["login", "signup"].map((m) => (
                <Box
                  key={m}
                  flex={1}
                  textAlign="center"
                  py={2.5}
                  borderRadius="13px"
                  className="tab-pill"
                  bg={mode === m ? tokens.accent : "transparent"}
                  onClick={() => setMode(m)}
                >
                  <Text
                    fontSize="13px"
                    fontWeight="700"
                    color={
                      mode === m
                        ? tokens.accent === "#00a855"
                          ? "white"
                          : "#0a0f0d"
                        : tokens.textMuted
                    }
                  >
                    {m === "login" ? "Sign In" : "Sign Up"}
                  </Text>
                </Box>
              ))}
            </HStack>

            {/* Form card */}
            <Box
              bg={tokens.cardBg}
              borderRadius={{ base: "24px", md: "32px" }}
              border="1px solid"
              borderColor={tokens.border}
              p={{ base: 6, sm: 8, md: 10 }}
              boxShadow={tokens.shadow}
            >
              {mode === "login" ? (
                <LoginForm onSwitch={() => setMode("signup")} tokens={tokens} />
              ) : (
                <SignupForm onSwitch={() => setMode("login")} tokens={tokens} />
              )}
            </Box>

            {/* Bottom note */}
            <Text
              textAlign="center"
              fontSize="12px"
              color={tokens.textSubtle}
              mt={6}
              px={4}
            >
              By continuing, you agree to our{" "}
              <Text as="span" color={tokens.accent} cursor="pointer">
                Terms
              </Text>{" "}
              and{" "}
              <Text as="span" color={tokens.accent} cursor="pointer">
                Privacy Policy
              </Text>
              . DriveKE is registered in Kenya.
            </Text>
          </Box>
        </Flex>
      </Grid>
    </Box>
  );
}
