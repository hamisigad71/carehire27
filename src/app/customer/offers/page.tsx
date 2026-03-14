'use client';

import { useState, useEffect } from 'react';
import {
  Box, Container, Heading, Text, VStack, Button, Icon, SimpleGrid,
  Flex, Image, Badge, HStack, Grid, GridItem, Divider,
  Tag, TagLabel, TagLeftIcon, Circle, Spacer, Progress,
  extendTheme, ChakraProvider,
} from '@chakra-ui/react';
import {
  FiPercent, FiZap, FiTruck, FiGift, FiClock, FiCheckCircle,
  FiArrowRight, FiShield, FiStar, FiAward, FiCopy, FiCheck,
} from 'react-icons/fi';

// ─── FONTS & ANIMATIONS ───────────────────────────────────────────────────────
const Styles = ({ isDark = false }) => {
  const bgColor = isDark ? '#0a0f0a' : '#f8faf8';
  const scrollTrack = isDark ? '#0a0f0a' : '#f0f5f0';
  const scrollThumb = isDark ? '#2d7d2d' : '#2d7d2d';
  
  return (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600&display=swap');

    *, *::before, *::after { box-sizing: border-box; }

    body { background: ${bgColor}; }

    @keyframes fadeUp   { from { opacity:0; transform:translateY(28px);  } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn   { from { opacity:0; }                               to { opacity:1; } }
    @keyframes floatY   { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(-12px); } }
    @keyframes spinSlow { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
    @keyframes ticker   { 0% { transform:translateX(0); } 100% { transform:translateX(-50%); } }
    @keyframes shimmer  { 0% { background-position:-400px 0; } 100% { background-position:400px 0; } }
    @keyframes pulse    { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
    @keyframes countUp  { from { opacity:0; transform:scale(0.8); } to { opacity:1; transform:scale(1); } }

    .fu  { animation: fadeUp  0.7s ease both; }
    .fu1 { animation: fadeUp  0.7s 0.1s ease both; }
    .fu2 { animation: fadeUp  0.7s 0.2s ease both; }
    .fu3 { animation: fadeUp  0.7s 0.3s ease both; }
    .fu4 { animation: fadeUp  0.7s 0.4s ease both; }
    .fi  { animation: fadeIn  0.8s 0.5s ease both; }

    .float { animation: floatY 4s ease-in-out infinite; }
    .spin  { animation: spinSlow 18s linear infinite; }
    .pulse-dot { animation: pulse 1.8s ease-in-out infinite; }

    .offer-card {
      transition: transform 0.3s cubic-bezier(.25,.46,.45,.94), box-shadow 0.3s ease;
      cursor: pointer;
    }
    .offer-card:hover {
      transform: translateY(-10px) scale(1.01);
      box-shadow: 0 32px 80px rgba(45,125,45,0.25) !important;
    }
    .offer-card:hover .card-img { transform: scale(1.07); }
    .card-img { transition: transform 0.5s ease; }

    .code-box {
      background: repeating-linear-gradient(
        90deg, transparent, transparent 4px, rgba(255,255,255,0.03) 4px, rgba(255,255,255,0.03) 8px
      );
      transition: all 0.2s ease;
    }
    .code-box:hover { background-color: rgba(45,125,45,0.15); }

    .benefit-item { transition: transform 0.2s ease; }
    .benefit-item:hover { transform: translateX(6px); }

    .ticker-wrap { overflow: hidden; white-space: nowrap; }
    .ticker-inner { display: inline-flex; gap: 0; animation: ticker 28s linear infinite; }

    .btn-primary {
      transition: all 0.25s cubic-bezier(.25,.46,.45,.94) !important;
    }
    .btn-primary:hover {
      transform: translateY(-3px) !important;
      box-shadow: 0 16px 40px rgba(45,125,45,0.4) !important;
    }
    .btn-primary:active { transform: translateY(0) !important; }

    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: ${scrollTrack}; }
    ::-webkit-scrollbar-thumb { background: ${scrollThumb}; border-radius: 99px; }
  `}</style>
  );
};

// ─── THEME ────────────────────────────────────────────────────────────────────
const theme = extendTheme({
  fonts: { heading: "'Syne', sans-serif", body: "'DM Sans', sans-serif" },
  styles: { global: { body: { bg: '#f8faf8', color: '#1a1a1a' } } },
});

// ─── TOKENS: LIGHT MODE (PRIMARY) ─────────────────────────────────────────────
const T_LIGHT = {
  bg:          '#f8faf8',
  card:        '#ffffff',
  cardBorder:  'rgba(45,125,45,0.12)',
  cardLight:   '#f0f5f0',
  accent:      '#2d7d2d',
  accentBright:'#219e2d',
  accentGlow:  'rgba(45,125,45,0.08)',
  accentGlow2: 'rgba(45,125,45,0.05)',
  text:        '#1a1a1a',
  muted:       'rgba(26,26,26,0.6)',
  subtle:      'rgba(26,26,26,0.4)',
  gold:        '#b8860b',
  goldGlow:    'rgba(184,134,11,0.12)',
  danger:      '#dc2626',
};

// ─── TOKENS: DARK MODE (ALTERNATIVE) ──────────────────────────────────────────
const T_DARK = {
  bg:          '#0a0f0a',
  card:        '#111811',
  cardBorder:  'rgba(45,125,45,0.18)',
  cardLight:   '#141c14',
  accent:      '#2d7d2d',
  accentBright:'#4a9e4a',
  accentGlow:  'rgba(45,125,45,0.15)',
  accentGlow2: 'rgba(74,158,74,0.08)',
  text:        '#f0f5f0',
  muted:       'rgba(240,245,240,0.55)',
  subtle:      'rgba(240,245,240,0.3)',
  gold:        '#d4a843',
  goldGlow:    'rgba(212,168,67,0.15)',
  danger:      '#e05252',
};

// Default to light mode
const T = T_LIGHT;

// ─── TOKEN TYPE ───────────────────────────────────────────────────────────────
type TokenType = typeof T_LIGHT;

// ─── DATA ─────────────────────────────────────────────────────────────────────
const FLASH = {
  title:    'Elite Chauffeur Experience',
  discount: '40%',
  code:     'LUXDRIVE40',
  desc:     'Book any S-Class or Rolls Royce for a minimum of 48 hours and enjoy our premium chauffeur service. Includes VIP airport lounge access and complimentary refreshments.',
  img:      'https://images.unsplash.com/photo-1563720223185-11003d516935?w=900&h=600&fit=crop',
  endHours: 5, endMins: 23, endSecs: 45,
};

const OFFERS = [
  {
    title:   'Seasonal Escape',
    desc:    'Get up to 25% off on all luxury SUVs this weekend. Valid on all Nairobi routes.',
    code:    'WKND25',
    expiry:  'Valid until Mar 31',
    img:     'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=700&h=460&fit=crop',
    tag:     'Seasonal',
    scheme:  'blue',
    saving:  'Save up to KSh 3,750',
  },
  {
    title:   'First Ride Bonus',
    desc:    'New to DriveKE? Enjoy a flat KSh 5,000 discount on your first premium booking.',
    code:    'DRIVE500',
    expiry:  'New Users Only',
    img:     'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=700&h=460&fit=crop',
    tag:     'Welcome',
    scheme:  'green',
    saving:  'KSh 5,000 off first ride',
  },
  {
    title:   'Business Elite',
    desc:    'Complimentary chauffeur upgrade for all corporate bookings over 5 consecutive days.',
    code:    'BIZUP',
    expiry:  'Business Accounts',
    img:     'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=700&h=460&fit=crop',
    tag:     'Upgrade',
    scheme:  'purple',
    saving:  'Free chauffeur (worth KSh 12k)',
  },
];

const BENEFITS = [
  { icon: FiStar,    title: 'Priority Fleet Access',  detail: 'First pick on new additions — before public release.', color: T.gold },
  { icon: FiShield,  title: 'Zero Security Deposit',  detail: 'Gold & Platinum members skip the deposit entirely.',   color: T.accentBright },
  { icon: FiZap,     title: 'Instant Approval',        detail: 'Verified members bypass the queue, every time.',       color: '#60a5fa' },
  { icon: FiGift,    title: 'Birthday Surprise',       detail: "A free day's rental on your birthday, every year.",    color: '#f472b6' },
];

const TIERS = [
  { name: 'Silver',   pts: '0–999',    color: '#9ca3af', perks: ['5% off rentals', 'Newsletter deals'] },
  { name: 'Gold',     pts: '1000–2499',color: T.gold,    perks: ['10% off', 'Zero deposit', 'Priority booking'] },
  { name: 'Platinum', pts: '2500+',    color: '#e2e8f0', perks: ['20% off', 'Free chauffeur', 'Lounge access', 'Birthday rental'] },
];

const TICKER_ITEMS = [
  '🚗 WKND25 — 25% OFF SUVS',
  '⚡ FLASH DEAL: 40% OFF CHAUFFEUR',
  '🎁 NEW USER: KSh 5,000 OFF',
  '🏆 EARN DOUBLE POINTS THIS MARCH',
  '✈️ FREE JKIA PICKUP WITH BIZUP',
];

// ─── COUNTDOWN ────────────────────────────────────────────────────────────────
function useCountdown(h: number, m: number, s: number) {
  const [time, setTime] = useState({ h, m, s });
  useEffect(() => {
    const id = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev;
        if (s > 0) return { h, m, s: s - 1 };
        if (m > 0) return { h, m: m - 1, s: 59 };
        if (h > 0) return { h: h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

// ─── COPY CODE ────────────────────────────────────────────────────────────────
function CodeBox({ code, T }: { code: string; T: TokenType }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Flex
      className="code-box"
      align="center" justify={{ base: 'center', sm: 'space-between' }} flexDirection={{ base: 'column', sm: 'row' }}
      border="1.5px dashed" borderColor={T.cardBorder}
      borderRadius="16px" px={{ base: 4, sm: 5 }} py={{ base: 4, sm: 3 }} cursor="pointer"
      bg={T.accentGlow2} onClick={copy}
      _hover={{ borderColor: T.accentBright }}
      transition="all 0.2s" gap={{ base: 3, sm: 0 }}
    >
      <Box textAlign={{ base: 'center', sm: 'left' }}>
        <Text fontSize="9px" fontWeight="700" color={T.subtle} letterSpacing="0.12em" mb="1px">PROMO CODE</Text>
        <Text fontWeight="800" fontSize="15px" color={T.accentBright} letterSpacing="0.08em">{code}</Text>
      </Box>
      <Circle size="32px" bg={copied ? T.accentGlow : T.accentGlow2} border="1px solid" borderColor={T.cardBorder} flexShrink={0}>
        <Icon as={copied ? FiCheck : FiCopy} boxSize={3.5} color={copied ? T.accentBright : T.muted} />
      </Circle>
    </Flex>
  );
}

// ─── TICKER ───────────────────────────────────────────────────────────────────
function Ticker({ T }: { T: TokenType }) {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <Box bg={T.accent} py={2.5} overflow="hidden">
      <div className="ticker-wrap">
        <div className="ticker-inner">
          {items.map((item, i) => (
            <Text key={i} fontSize="12px" fontWeight="700" color="white"
              letterSpacing="0.06em" px={10} display="inline-block">
              {item}
            </Text>
          ))}
        </div>
      </div>
    </Box>
  );
}

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
function HeroSection({ T }: { T: TokenType }) {
  return (
    <Box
      position="relative" overflow="hidden" pt={{ base: 16, md: 24 }} pb={{ base: 24, md: 36 }}
      bg={T.bg}
    >
      {/* Grid pattern overlay */}
      <Box
        position="absolute" inset={0} opacity={0.04}
        bgImage="linear-gradient(rgba(74,158,74,1) 1px, transparent 1px), linear-gradient(90deg, rgba(74,158,74,1) 1px, transparent 1px)"
        bgSize="60px 60px"
      />

      {/* Glowing orbs */}
      <Box position="absolute" top="-120px" right="-80px" w="500px" h="500px"
        bg="radial-gradient(circle, rgba(45,125,45,0.25) 0%, transparent 70%)"
        className="float" style={{ animationDelay: '0s' }} />
      <Box position="absolute" bottom="-100px" left="-60px" w="400px" h="400px"
        bg="radial-gradient(circle, rgba(45,125,45,0.15) 0%, transparent 70%)" />

      {/* Spinning ring */}
      <Box position="absolute" top="60px" right="120px" className="spin" display={{ base: 'none', xl: 'block' }}>
        <Circle size="180px" border="1px solid" borderColor={T.cardBorder} />
        <Circle size="140px" border="1px dashed" borderColor="rgba(45,125,45,0.2)"
          position="absolute" top="20px" left="20px" />
      </Box>

      <Container maxW="1200px" position="relative" zIndex={2}>
        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={16} alignItems="center">
          <VStack align={{ base: 'center', lg: 'start' }} spacing={{ base: 4, md: 7 }} px={{ base: 5, md: 0 }}>
            <HStack className="fu" spacing={3}>
              <Box className="pulse-dot" w="8px" h="8px" borderRadius="full" bg={T.accentBright} />
              <Text fontSize="12px" fontWeight="700" color={T.accentBright} letterSpacing="0.15em"
                textTransform="uppercase">
                Exclusive Member Offers
              </Text>
            </HStack>

            <Heading className="fu1" fontSize={{ base: '34px', md: '58px', lg: '68px' }}
              fontWeight="800" lineHeight="1.05" letterSpacing="-0.03em" color={T.text} textAlign={{ base: 'center', lg: 'left' }} px={{ base: 5, md: 0 }}>
              Premium <br />
              Mobility.{' '}
              <Text as="span"
                bgGradient="linear(135deg, #4a9e4a, #72b872)"
                bgClip="text">
                Unbeatable
              </Text>
              <br />Value.
            </Heading>

            <Text className="fu2" fontSize="17px" color={T.muted} maxW="480px" lineHeight="1.75" fontWeight="300" textAlign={{ base: 'center', lg: 'left' }}>
              Discover offers designed for our most valued clients — from seasonal discounts to loyalty rewards that grow with every journey.
            </Text>

            <HStack className="fu3" spacing={4} flexWrap="wrap" flexDirection={{ base: 'column', sm: 'row' }} w={{ base: '100%', sm: 'auto' }}>
              <Button className="btn-primary" bg={T.accent} color="white" h="54px" px={10}
                borderRadius="16px" fontWeight="700" fontSize="15px" w={{ base: '100%', sm: 'auto' }}
                rightIcon={<Icon as={FiArrowRight} />}
                _hover={{ bg: T.accentBright }}>
                Browse All Offers
              </Button>
              <Button variant="outline" borderColor={T.cardBorder} color={T.text} h="54px" px={8}
                borderRadius="16px" fontWeight="600" fontSize="15px" w={{ base: '100%', sm: 'auto' }}
                _hover={{ bg: T.accentGlow, borderColor: T.accentBright }}>
                View My Rewards
              </Button>
            </HStack>

            {/* Mini stats */}
            <HStack className="fu4" spacing={8} pt={2}>
              {([['12+', 'Active Deals'], ['KSh 50K', 'Max Savings'], ['3 Tiers', 'Loyalty Levels']] as const).map(([n, l]) => (
                <Box key={l}>
                  <Text fontSize="22px" fontWeight="800" color={T.accentBright}
                    fontFamily="'Syne', sans-serif">{n}</Text>
                  <Text fontSize="11px" color={T.subtle} fontWeight="500">{l}</Text>
                </Box>
              ))}
            </HStack>
          </VStack>

          {/* Right image block */}
          <Box className="fi" position="relative" display={{ base: 'none', lg: 'block' }}>
            <Box borderRadius="40px" overflow="hidden" border="1px solid" borderColor={T.cardBorder}
              boxShadow="0 40px 100px rgba(0,0,0,0.6)">
              <Image
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=900&h=600&fit=crop"
                w="100%" objectFit="cover" />
            </Box>
            {/* Floating badge */}
            <Box position="absolute" top="-16px" right="-16px" bg={T.card} border="1px solid"
              borderColor={T.cardBorder} borderRadius="24px" px={5} py={4} boxShadow="xl">
              <Text fontSize="11px" color={T.subtle} fontWeight="600" mb="2px">THIS MONTH</Text>
              <Text fontSize="26px" fontWeight="900" color={T.accentBright} fontFamily="'Syne', sans-serif">
                3 Deals
              </Text>
              <Text fontSize="10px" color={T.muted}>active campaigns</Text>
            </Box>
            {/* Bottom floating card */}
            <Box position="absolute" bottom="-20px" left="-20px" bg={T.card} border="1px solid"
              borderColor={T.cardBorder} borderRadius="24px" px={5} py={4} boxShadow="xl">
              <HStack spacing={3}>
                <Circle size="40px" bg={T.goldGlow} border="1px solid" borderColor={T.gold}>
                  <Icon as={FiAward} color={T.gold} boxSize={4} />
                </Circle>
                <Box>
                  <Text fontWeight="700" fontSize="14px">Gold Member</Text>
                  <Text fontSize="11px" color={T.muted}>2,450 pts accumulated</Text>
                </Box>
              </HStack>
            </Box>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

// ─── FLASH DEAL ───────────────────────────────────────────────────────────────
function FlashDeal({ T }: { T: TokenType }) {
  const { h, m, s } = useCountdown(FLASH.endHours, FLASH.endMins, FLASH.endSecs);
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <Container maxW="1200px" mt="-60px" position="relative" zIndex={10}>
      <Box
        bg={T.card} borderRadius="40px" overflow="hidden"
        border="1px solid" borderColor={T.cardBorder}
        boxShadow="0 40px 100px rgba(0,0,0,0.5)"
      >
        {/* Top accent strip */}
        <Box h="3px" bgGradient="linear(90deg, #154a15, #4a9e4a, #72b872, #4a9e4a, #154a15)" />

        <Grid templateColumns={{ base: '1fr', lg: '1.1fr 1fr' }} minH={{ lg: '420px' }}>
          {/* Right image - shown on top on mobile */}
          <Box position="relative" overflow="hidden" h={{ base: '220px', lg: 'auto' }} order={{ base: -1, lg: 2 }}>
            <Image className="card-img" src={FLASH.img} w="100%" h="100%" objectFit="cover" />
            {/* Discount badge */}
            <Box position="absolute" top={{ base: 3, lg: 8 }} right={{ base: 3, lg: 8 }}
              bg={T.accent} borderRadius="50%" w={{ base: '64px', lg: '90px' }} h={{ base: '64px', lg: '90px' }}
              display="flex" alignItems="center" justifyContent="center" flexDir="column"
              boxShadow="0 8px 32px rgba(45,125,45,0.5)">
              <Text fontSize={{ base: '16px', lg: '28px' }} fontWeight="900" color="white" lineHeight="1">
                -{FLASH.discount}
              </Text>
            </Box>
          </Box>

          {/* Left content */}
          <Box p={{ base: 5, md: 12 }} display="flex" flexDir="column" justifyContent="center" order={{ base: 0, lg: 1 }}>
            <HStack mb={{ base: 4, md: 6 }} spacing={3} flexWrap="wrap">
              <HStack bg={T.accentGlow} border="1px solid" borderColor={T.cardBorder}
                px={4} py={1.5} borderRadius="full" spacing={2}>
                <Icon as={FiZap} color={T.accentBright} boxSize={3.5} />
                <Text fontSize="11px" fontWeight="800" color={T.accentBright} letterSpacing="0.1em">
                  FLASH DEAL
                </Text>
              </HStack>
              <HStack spacing={1.5}>
                <Box className="pulse-dot" w="7px" h="7px" borderRadius="full" bg={T.danger} />
                <Text fontSize="12px" fontWeight="600" color={T.danger}>ENDS SOON</Text>
              </HStack>
            </HStack>

            <Heading fontSize={{ base: '22px', md: '40px' }} fontWeight="800"
              letterSpacing="-0.03em" lineHeight="1.15" mb={2}>
              {FLASH.title}
            </Heading>
            <Text fontSize={{ base: '36px', md: '64px' }} fontWeight="800" color={T.accentBright}
              fontFamily="'Syne', sans-serif" lineHeight="1" mb={5}>
              {FLASH.discount} OFF
            </Text>

            <Text color={T.muted} fontSize={{ base: '13px', md: '15px' }} lineHeight="1.75" mb={{ base: 5, md: 7 }} maxW="460px">
              {FLASH.desc}
            </Text>

            {/* Countdown */}
            <HStack spacing={3} mb={{ base: 5, md: 7 }}>
              {([['Hours', pad(h)], ['Minutes', pad(m)], ['Seconds', pad(s)]] as const).map(([label, val]) => (
                <Box key={label} textAlign="center">
                  <Box bg={T.cardLight} border="1px solid" borderColor={T.cardBorder}
                    borderRadius="16px" w={{ base: '52px', md: '76px' }} h={{ base: '52px', md: '72px' }}
                    display="flex" alignItems="center" justifyContent="center">
                    <Text fontSize={{ base: '18px', md: '28px' }} fontWeight="800"
                      fontFamily="'Syne', sans-serif" color={T.text}>{val}</Text>
                  </Box>
                  <Text fontSize="9px" color={T.subtle} fontWeight="600" mt={1.5}
                    letterSpacing="0.08em" textTransform="uppercase">{label}</Text>
                </Box>
              ))}
            </HStack>

            <HStack flexDirection="row" spacing={{ base: 2, sm: 4 }} w="100%" flexWrap="wrap">
              <Button className="btn-primary" bg={T.accent} color="white" h="54px" px={{ base: 6, sm: 10 }}
                borderRadius="16px" fontWeight="700" fontSize="15px" flex={{ base: 1, sm: 'auto' }}
                rightIcon={<Icon as={FiArrowRight} />}
                _hover={{ bg: T.accentBright }}>
                Book with Chauffeur
              </Button>
              <Box flex={{ base: 1, sm: 'auto' }} minW={{ base: '120px', sm: 'auto' }}>
                <CodeBox code={FLASH.code} T={T} />
              </Box>
            </HStack>
          </Box>
        </Grid>
      </Box>
    </Container>
  );
}

// ─── OFFER CARDS ──────────────────────────────────────────────────────────────
function OfferCard({ offer, index, T }: { offer: typeof OFFERS[0]; index: number; T: TokenType }) {
  const SCHEME_MAP = {
    blue:   { bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.3)', text: '#60a5fa' },
    green:  { bg: T.accentGlow,            border: T.cardBorder,           text: T.accentBright },
    purple: { bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.3)', text: '#a78bfa' },
  };
  const sc = SCHEME_MAP[offer.scheme as keyof typeof SCHEME_MAP] || SCHEME_MAP.green;
  return (
    <Box className="offer-card" bg={T.card} borderRadius="32px" overflow="hidden"
      border="1px solid" borderColor={T.cardBorder}
      style={{ animationDelay: `${index * 0.1}s` }}>
      {/* Image */}
      <Box h="220px" overflow="hidden" position="relative">
        <Image className="card-img" src={offer.img} w="100%" h="100%" objectFit="cover" />
        <Box position="absolute" inset={0}
          bg="linear-gradient(180deg, transparent 40%, rgba(17,24,17,0.7) 100%)" />
        <Box position="absolute" top={4} left={4}>
          <Box bg={sc.bg} border="1px solid" borderColor={sc.border}
            borderRadius="full" px={3} py={1}>
            <Text fontSize="10px" fontWeight="800" color={sc.text} letterSpacing="0.1em"
              textTransform="uppercase">{offer.tag}</Text>
          </Box>
        </Box>
        <Box position="absolute" bottom={4} left={4}>
          <Text fontSize="11px" fontWeight="600" color="rgba(255,255,255,0.6)">{offer.saving}</Text>
        </Box>
      </Box>

      {/* Body */}
      <Box p={6}>
        <Heading fontSize="20px" fontWeight="800" mb={2} letterSpacing="-0.02em">{offer.title}</Heading>
        <Text fontSize="13px" color={T.muted} lineHeight="1.7" mb={4} noOfLines={2}>
          {offer.desc}
        </Text>

        <Text fontSize="10px" fontWeight="600" color={T.subtle} letterSpacing="0.08em" mb={2}>
          {offer.expiry}
        </Text>

        <CodeBox code={offer.code} T={T} />

        <Button mt={4} w="100%" variant="ghost" color={sc.text} borderRadius="14px"
          border="1px solid" borderColor={T.cardBorder} fontWeight="700" fontSize="13px"
          rightIcon={<Icon as={FiArrowRight} />}
          _hover={{ bg: sc.bg, borderColor: sc.border }}>
          View Details
        </Button>
      </Box>
    </Box>
  );
}

// ─── LOYALTY PROGRAM ──────────────────────────────────────────────────────────
function LoyaltySection({ T }: { T: TokenType }) {
  return (
    <Box bg={T.card} border="1px solid" borderColor={T.cardBorder} borderRadius="48px"
      overflow="hidden" position="relative">
      {/* Top strip */}
      <Box h="3px" bgGradient="linear(90deg, transparent, #d4a843, #f5d680, #d4a843, transparent)" />

      <Box p={{ base: 8, md: 14 }}>
        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={16} alignItems="center">
          {/* Left */}
          <VStack align="start" spacing={8}>
            <Box>
              <HStack mb={4} spacing={2}>
                <Icon as={FiAward} color={T.gold} boxSize={5} />
                <Text fontSize="12px" fontWeight="700" color={T.gold} letterSpacing="0.12em"
                  textTransform="uppercase">Loyalty Program</Text>
              </HStack>
              <Heading fontSize={{ base: '32px', md: '46px' }} fontWeight="800"
                letterSpacing="-0.03em" lineHeight="1.1" mb={4}>
                The{' '}
                <Text as="span" bgGradient="linear(135deg, #d4a843, #f5d680)" bgClip="text">
                  Elite Rewards
                </Text>
                <br />Program
              </Heading>
              <Text color={T.muted} fontSize="16px" lineHeight="1.8" fontWeight="300">
                Every kilometre earns you more. Your loyalty unlocks a world of exclusive benefits — from zero deposits to complimentary upgrades and birthday surprises.
              </Text>
            </Box>

            <VStack align="start" spacing={4} w="100%">
              {BENEFITS.map((b, i) => (
                <Flex key={i} className="benefit-item" align="center" w="100%"
                  p={4} borderRadius="20px" bg={T.accentGlow2}
                  border="1px solid" borderColor={T.cardBorder}>
                  <Circle size="44px" bg={T.cardLight} border="1px solid" borderColor={T.cardBorder} mr={4}>
                    <Icon as={b.icon} color={b.color} boxSize={4.5} />
                  </Circle>
                  <Box flex={1}>
                    <Text fontWeight="700" fontSize="15px">{b.title}</Text>
                    <Text fontSize="12px" color={T.muted}>{b.detail}</Text>
                  </Box>
                  <Icon as={FiArrowRight} color={T.subtle} boxSize={4} />
                </Flex>
              ))}
            </VStack>

            <Button className="btn-primary" bg={T.gold} color={T.bg} h="58px" px={12}
              borderRadius="20px" fontWeight="800" fontSize="15px"
              _hover={{ bg: '#e6b84e' }}>
              Join Elite Rewards →
            </Button>
          </VStack>

          {/* Right: tiers + image */}
          <VStack spacing={5} align="stretch">
            <Box position="relative">
              <Box borderRadius="32px" overflow="hidden" border="1px solid" borderColor={T.cardBorder}>
                <Image
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=500&fit=crop"
                  w="100%" objectFit="cover" h="260px" />
                <Box position="absolute" inset={0} bg="linear-gradient(180deg, transparent 40%, rgba(17,24,17,0.85) 100%)"
                  borderRadius="32px" />
              </Box>

              {/* Floating status card */}
              <Box position="absolute" bottom={-5} right={5} bg={T.card}
                border="1px solid" borderColor={T.cardBorder}
                borderRadius="20px" px={5} py={4} boxShadow="0 20px 60px rgba(0,0,0,0.5)">
                <HStack spacing={3}>
                  <Circle size="44px" bg={T.goldGlow} border="1px solid" borderColor={T.gold}>
                    <Icon as={FiAward} color={T.gold} boxSize={5} />
                  </Circle>
                  <Box>
                    <Text fontWeight="800" fontSize="16px">Platinum Card</Text>
                    <Text fontSize="11px" color={T.muted}>Tier Status: Elite Active</Text>
                  </Box>
                </HStack>
              </Box>
            </Box>

            {/* Tier cards */}
            <SimpleGrid columns={3} spacing={3} mt={6}>
              {TIERS.map((tier) => (
                <Box key={tier.name} p={4} bg={T.cardLight} borderRadius="20px"
                  border="1px solid" borderColor={T.cardBorder}
                  position="relative" overflow="hidden">
                  <Box position="absolute" top={0} left={0} right={0} h="2px"
                    bg={tier.color} opacity={0.7} />
                  <Circle size="32px" bg={`${tier.color}22`} mb={2} border="1px solid"
                    borderColor={`${tier.color}44`}>
                    <Icon as={FiAward} color={tier.color} boxSize={3.5} />
                  </Circle>
                  <Text fontWeight="800" fontSize="13px" color={tier.color} mb={0.5}>{tier.name}</Text>
                  <Text fontSize="10px" color={T.subtle} mb={2}>{tier.pts} pts</Text>
                  <VStack align="start" spacing={1}>
                    {tier.perks.map(p => (
                      <HStack key={p} spacing={1.5}>
                        <Icon as={FiCheckCircle} color={T.accentBright} boxSize={2.5} />
                        <Text fontSize="10px" color={T.muted}>{p}</Text>
                      </HStack>
                    ))}
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </Grid>
      </Box>
    </Box>
  );
}

// ─── BOTTOM CTA ───────────────────────────────────────────────────────────────
function BottomCTA({ T }: { T: TokenType }) {
  return (
    <Box position="relative" overflow="hidden" borderRadius="40px"
      bg={T.accent} p={{ base: 10, md: 16 }} textAlign="center">
      <Box position="absolute" top="-80px" right="-80px" w="350px" h="350px"
        bg="whiteAlpha.100" borderRadius="full" />
      <Box position="absolute" bottom="-60px" left="-60px" w="280px" h="280px"
        bg="whiteAlpha.100" borderRadius="full" />
      <VStack position="relative" zIndex={1} spacing={6}>
        <Badge bg="whiteAlpha.200" color="white" px={4} py={1.5} borderRadius="full"
          fontSize="11px" fontWeight="700" letterSpacing="0.1em">
          LIMITED TIME
        </Badge>
        <Heading fontSize={{ base: '28px', md: '44px' }} color="white" fontWeight="800"
          letterSpacing="-0.03em" maxW="600px" lineHeight="1.15">
          Don't miss out on this month's exclusive fleet deals
        </Heading>
        <Text color="whiteAlpha.800" fontSize="16px" maxW="440px" fontWeight="300">
          Over 12 active campaigns — savings that disappear by April 1st.
        </Text>
        <HStack spacing={4} flexWrap="wrap" justify="center">
          <Button bg="white" color={T.accent} h="56px" px={12} borderRadius="18px"
            fontWeight="800" fontSize="15px"
            _hover={{ bg: '#f0f5f0', transform: 'translateY(-2px)' }} transition="all 0.2s">
            Explore All Offers
          </Button>
          <Button variant="outline" borderColor="whiteAlpha.500" color="white" h="56px" px={10}
            borderRadius="18px" fontWeight="600" fontSize="15px"
            _hover={{ bg: 'whiteAlpha.200' }}>
            View My Rewards
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
function OffersPageContent({ T, isDark, toggleTheme }: { T: TokenType; isDark: boolean; toggleTheme: () => void }) {
  return (
    <>
      <Styles isDark={isDark} />
      <Box bg={T.bg} minH="100vh" pb={24} transition="background-color 0.3s ease">
        <Ticker T={T} />
        <HeroSection T={T} />
        <FlashDeal T={T} />

        <Container maxW="1200px" mt={20}>
          <VStack spacing={16} align="stretch">

            {/* Active Campaigns */}
            <Box>
              <Flex alignItems="flex-end" justify="space-between" mb={8} flexWrap="wrap" gap={4}>
                <Box>
                  <Text fontSize="12px" fontWeight="700" color={T.accentBright}
                    letterSpacing="0.12em" textTransform="uppercase" mb={2}>
                    Active Campaigns
                  </Text>
                  <Heading fontSize={{ base: '28px', md: '36px' }} fontWeight="800"
                    letterSpacing="-0.03em">
                    Choose Your Offer
                  </Heading>
                  <Text color={T.muted} fontSize="15px" mt={1}>
                    Tap any code to copy it instantly
                  </Text>
                </Box>
                <HStack spacing={3}>
                  <Button variant="ghost" color={T.accentBright} fontWeight="600" fontSize="14px"
                    rightIcon={<Icon as={FiArrowRight} />}
                    _hover={{ bg: T.accentGlow }}>
                    See all deals
                  </Button>
                  <Button
                    onClick={toggleTheme}
                    bg={isDark ? T.card : T.cardLight}
                    border="1px solid"
                    borderColor={T.cardBorder}
                    px={4}
                    py={2}
                    borderRadius="full"
                    fontSize="12px"
                    fontWeight="700"
                    color={T.text}
                    _hover={{ bg: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}
                    title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  >
                    {isDark ? '🌙 Dark' : '☀️ Light'}
                  </Button>
                </HStack>
              </Flex>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {OFFERS.map((offer, i) => <OfferCard key={i} offer={offer} index={i} T={T} />)}
              </SimpleGrid>
            </Box>

            {/* Loyalty Program */}
            <LoyaltySection T={T} />

            {/* CTA */}
            <BottomCTA T={T} />

          </VStack>
        </Container>
      </Box>
    </>
  );
}

export default function OffersPage() {
  const [isDark, setIsDark] = useState(false);
  const T = isDark ? T_DARK : T_LIGHT;
  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ChakraProvider theme={theme}>
      <OffersPageContent T={T} isDark={isDark} toggleTheme={toggleTheme} />
    </ChakraProvider>
  );
}