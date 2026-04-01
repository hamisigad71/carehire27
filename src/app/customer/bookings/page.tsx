'use client';

import { useState, useEffect } from 'react';
import {
  Box, Container, Heading, Text, VStack, Button, Icon, SimpleGrid,
  Flex, Image, HStack, Circle, Center, Spinner, Grid,
} from '@chakra-ui/react';
import {
  FiClock, FiCheckCircle, FiChevronRight, FiMapPin, FiCalendar,
  FiDollarSign, FiInbox, FiArrowRight, FiActivity, FiAlertCircle,
  FiPhone, FiStar, FiTrendingUp,
} from 'react-icons/fi';
import { formatCurrency } from '@/utils/format';
import { useRouter } from 'next/navigation';
import { Vehicle } from '@/types';

// ─── TOKENS ───────────────────────────────────────────────────────────────────
const L = {
  bg:           '#f4f7f4',
  card:         '#ffffff',
  cardBorder:   'rgba(30,110,30,0.1)',
  accent:       '#1e6e1e',
  accentLight:  '#2d8c2d',
  accentGlow:   'rgba(30,110,30,0.08)',
  accentGlow2:  'rgba(30,110,30,0.14)',
  accentGlow3:  'rgba(30,110,30,0.22)',
  text:         '#111a11',
  textSub:      '#3a4d3a',
  muted:        '#6b7f6b',
  subtle:       '#9aaa9a',
  border:       'rgba(0,0,0,0.07)',
  borderMid:    'rgba(30,110,30,0.15)',
  shadow:       '0 1px 12px rgba(0,0,0,0.06)',
  shadowMd:     '0 4px 24px rgba(0,0,0,0.09)',
  shadowGreen:  '0 8px 32px rgba(30,110,30,0.14)',
  bg2:          '#eef3ee',
  blue:         '#1a56a0',
  blueBg:       'rgba(26,86,160,0.08)',
  blueBorder:   'rgba(26,86,160,0.18)',
  gold:         '#b07d0a',
  goldBg:       'rgba(176,125,10,0.08)',
  goldBorder:   'rgba(176,125,10,0.18)',
  red:          '#c0392b',
  redBg:        'rgba(192,57,43,0.07)',
  redBorder:    'rgba(192,57,43,0.18)',
  orange:       '#c05c00',
  orangeBg:     'rgba(192,92,0,0.08)',
  orangeBorder: 'rgba(192,92,0,0.18)',
  purple:       '#6d28d9',
  purpleBg:     'rgba(109,40,217,0.08)',
  purpleBorder: 'rgba(109,40,217,0.18)',
  green:        '#15803d',
  greenBg:      'rgba(21,128,61,0.08)',
  greenBorder:  'rgba(21,128,61,0.2)',
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

    .booking-card {
      transition: transform .28s cubic-bezier(.22,1,.36,1), box-shadow .28s ease, border-color .2s ease;
    }
    .booking-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 16px 48px rgba(0,0,0,0.09) !important;
      border-color: ${L.borderMid} !important;
    }

    .details-btn {
      transition: all .2s ease !important;
    }
    .details-btn:hover {
      background: ${L.accentGlow2} !important;
      color: ${L.accentLight} !important;
      transform: translateX(3px);
    }

    .stat-mini {
      transition: background .15s ease;
    }
    .stat-mini:hover {
      background: ${L.accentGlow} !important;
    }

    .empty-btn {
      transition: all .22s cubic-bezier(.22,1,.36,1) !important;
    }
    .empty-btn:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 10px 28px rgba(30,110,30,0.25) !important;
    }
  `}</style>
);

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function statusConfig(status: string) {
  switch (status) {
    case 'Active':
      return { color: L.accentLight, bg: L.accentGlow2, border: L.borderMid,    icon: FiActivity,     label: 'Active'    };
    case 'Pending':
      return { color: L.orange,      bg: L.orangeBg,    border: L.orangeBorder, icon: FiClock,        label: 'Pending'   };
    case 'Completed':
      return { color: L.muted,       bg: 'rgba(0,0,0,0.04)', border: L.border,  icon: FiCheckCircle,  label: 'Completed' };
    case 'Cancelled':
      return { color: L.red,         bg: L.redBg,       border: L.redBorder,    icon: FiAlertCircle,  label: 'Cancelled' };
    default:
      return { color: L.muted,       bg: L.accentGlow,  border: L.border,       icon: FiClock,        label: status      };
  }
}

function serviceConfig(service?: string) {
  if (service === 'Hire') return { color: L.purple, bg: L.purpleBg, border: L.purpleBorder, label: 'Chauffeur' };
  return { color: L.blue,   bg: L.blueBg,   border: L.blueBorder,   label: 'Self-Drive' };
}

// ─── CARD WRAPPER ─────────────────────────────────────────────────────────────
function Card({ children, className = '', p = '7', noPad = false, ...rest }: any) {
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
        position="absolute" top={0} left={0} w="56px" h="56px"
        bg={`radial-gradient(circle at top left, ${L.accentGlow2}, transparent 70%)`}
        pointerEvents="none" zIndex={0}
      />
      <Box position="relative" zIndex={1}>{children}</Box>
    </Box>
  );
}

// ─── META ITEM ────────────────────────────────────────────────────────────────
function MetaItem({ icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <Box
      className="stat-mini"
      px={3} py={2.5}
      bg={L.bg}
      borderRadius="12px"
      border="1px solid"
      borderColor={L.border}
    >
      <HStack spacing={2} mb={1}>
        <Icon as={icon} boxSize={3.5} color={L.accentLight} />
        <Text fontSize="10px" fontWeight="700" color={L.muted}
          textTransform="uppercase" letterSpacing=".08em">
          {label}
        </Text>
      </HStack>
      <Text fontSize="13px" fontWeight="700" color={L.text} noOfLines={1}>{value}</Text>
    </Box>
  );
}

// ─── SUMMARY STATS ────────────────────────────────────────────────────────────
const SUMMARY = [
  { label: 'Total Trips',    value: '3',         icon: FiCalendar,   accent: L.accentLight, bg: L.accentGlow2 },
  { label: 'Active Rentals', value: '1',         icon: FiActivity,   accent: L.accentLight, bg: L.accentGlow2 },
  { label: 'Amount Spent',   value: 'KSh 3,300', icon: FiDollarSign, accent: L.gold,        bg: L.goldBg      },
  { label: 'Loyalty Pts',    value: '2,450',     icon: FiStar,       accent: L.gold,        bg: L.goldBg      },
];

// ─── BOOKING DATA ─────────────────────────────────────────────────────────────
const bookingData = [
  {
    id: 'B-7721', vehicleId: 'V-1001', status: 'Active',
    pickup: 'Mar 10, 2026', return: 'Mar 13, 2026', total: 450,
    location: 'Nairobi CBD Office', service: 'Rent', days: 3,
  },
  {
    id: 'B-7722', vehicleId: 'V-1002', status: 'Pending',
    pickup: 'Mar 15, 2026', return: 'Mar 18, 2026', total: 1500,
    location: 'JKIA Airport', service: 'Hire', days: 3,
  },
  {
    id: 'B-7640', vehicleId: 'V-1009', status: 'Completed',
    pickup: 'Feb 15, 2026', return: 'Feb 18, 2026', total: 1350,
    location: 'Westlands Branch', service: 'Rent', days: 3,
  },
];

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function CustomerBookingsPage() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await fetch('/api/vehicles');
        if (res.ok) setVehicles(await res.json());
      } catch (err) {
        console.error('Bookings fetch failed:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  const getVehicle = (id: string) => vehicles.find(v => v.id === id);

  return (
    <>
      <Styles />
      <Box minH="100vh" bg={L.bg} py={{ base: 6, md: 10 }}>
        <Container maxW="1060px" px={{ base: 4, md: 6 }}>
          <VStack spacing={7} align="stretch">

            {/* ── PAGE HEADER ──────────────────────────────────────────── */}
            <Box className="fu">
              <HStack spacing={2} mb={2}>
                <Box w="6px" h="6px" borderRadius="full" bg={L.accentLight} />
                <Text fontSize="11px" fontWeight="700" color={L.accentLight}
                  textTransform="uppercase" letterSpacing=".1em">
                  My Account
                </Text>
              </HStack>
              <Heading
                fontSize={{ base: '26px', md: '32px' }}
                fontWeight="900"
                color={L.text}
                letterSpacing="-0.03em"
                lineHeight="1.1"
              >
                My{' '}
                <Text as="span" color={L.accentLight}>Rentals</Text>
              </Heading>
              <Text fontSize="13px" color={L.muted} mt={1}>
                Track your active trips and view past experiences
              </Text>
            </Box>

            {/* ── SUMMARY STRIP ────────────────────────────────────────── */}
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={3} className="fu1">
              {SUMMARY.map(s => (
                <Card key={s.label} p="5">
                  <Flex justify="space-between" align="center" mb={3}>
                    <Text fontSize="10px" fontWeight="700" color={L.muted}
                      textTransform="uppercase" letterSpacing=".08em">
                      {s.label}
                    </Text>
                    <Circle size="30px" bg={s.bg}>
                      <Icon as={s.icon} boxSize={3.5} color={s.accent} />
                    </Circle>
                  </Flex>
                  <Text fontSize={{ base: '20px', md: '22px' }} fontWeight="900"
                    color={L.text} letterSpacing="-0.03em" lineHeight="1">
                    {s.value}
                  </Text>
                  <Box mt={3} h="2px" bg={L.accentGlow} borderRadius="full" overflow="hidden">
                    <Box h="100%" borderRadius="full" bg={s.accent} style={{ width: '55%', opacity: 0.4 }} />
                  </Box>
                </Card>
              ))}
            </SimpleGrid>

            {/* ── BOOKINGS LIST ─────────────────────────────────────────── */}
            <Box className="fu2">
              {loading ? (
                <Center py={20}>
                  <VStack spacing={3}>
                    <Circle size="52px" bg={L.accentGlow2} border="1px solid" borderColor={L.borderMid}>
                      <Spinner color={L.accentLight} thickness="3px" />
                    </Circle>
                    <Text fontSize="13px" fontWeight="600" color={L.muted}>Loading your bookings…</Text>
                  </VStack>
                </Center>
              ) : bookingData.length > 0 ? (
                <VStack spacing={4} align="stretch">
                  {bookingData.map((booking, i) => {
                    const vehicle     = getVehicle(booking.vehicleId);
                    const sc          = statusConfig(booking.status);
                    const svc         = serviceConfig(booking.service);
                    const isActive    = booking.status === 'Active';

                    return (
                      <Card key={booking.id} className="booking-card" noPad>

                        {/* active top bar */}
                        {isActive && (
                          <Box h="3px" bg={`linear-gradient(90deg, ${L.accent}, ${L.accentLight}, ${L.accentGlow3})`} />
                        )}

                        <Box p={{ base: 5, md: 6 }}>
                          <Flex
                            direction={{ base: 'column', md: 'row' }}
                            align={{ base: 'stretch', md: 'flex-start' }}
                            gap={5}
                          >
                            {/* vehicle image */}
                            <Box
                              w={{ base: '100%', md: '140px' }}
                              h={{ base: '180px', md: '140px' }}
                              borderRadius="14px"
                              overflow="hidden"
                              flexShrink={0}
                              border="1px solid"
                              borderColor={L.cardBorder}
                              position="relative"
                            >
                              <Image
                                src={vehicle?.image || 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=280&fit=crop'}
                                alt={vehicle?.name || 'Vehicle'}
                                w="100%" h="100%"
                                objectFit="cover"
                                style={{ transition: 'transform .4s ease' }}
                              />
                              {/* service badge over image */}
                              <Box
                                position="absolute" bottom={2} left={2}
                                px={2} py={0.5}
                                bg="rgba(255,255,255,0.9)"
                                borderRadius="7px"
                                border="1px solid"
                                borderColor={svc.border}
                                sx={{ backdropFilter: 'blur(6px)' }}
                              >
                                <Text fontSize="9px" fontWeight="800" color={svc.color}
                                  textTransform="uppercase" letterSpacing=".06em">
                                  {svc.label}
                                </Text>
                              </Box>
                            </Box>

                            {/* content */}
                            <Box flex={1} minW={0}>
                              {/* top row */}
                              <Flex align="center" justify="space-between" mb={2} flexWrap="wrap" gap={2}>
                                <HStack spacing={2}>
                                  <Text
                                    fontSize="11px" fontWeight="700" color={L.muted}
                                    fontFamily="monospace"
                                  >
                                    {booking.id}
                                  </Text>
                                </HStack>

                                {/* status pill */}
                                <HStack
                                  spacing={1.5} px={2.5} py={1}
                                  bg={sc.bg} borderRadius="8px"
                                  border="1px solid" borderColor={sc.border}
                                >
                                  <Icon as={sc.icon} boxSize="10px" color={sc.color} />
                                  <Text fontSize="10px" fontWeight="800" color={sc.color}
                                    textTransform="uppercase" letterSpacing=".06em">
                                    {sc.label}
                                  </Text>
                                </HStack>
                              </Flex>

                              {/* vehicle name */}
                              <Text
                                fontSize={{ base: '17px', md: '19px' }}
                                fontWeight="900"
                                color={L.text}
                                letterSpacing="-0.02em"
                                lineHeight="1.2"
                                mb={4}
                                noOfLines={1}
                              >
                                {vehicle?.name || 'Loading…'}
                              </Text>

                              {/* meta grid */}
                              <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={2.5} mb={4}>
                                <MetaItem icon={FiCalendar} label="Duration"
                                  value={`${booking.pickup} → ${booking.return}`} />
                                <MetaItem icon={FiMapPin}   label="Pickup"
                                  value={booking.location} />
                                <MetaItem icon={FiDollarSign} label="Total"
                                  value={formatCurrency(booking.total)} />
                              </SimpleGrid>

                              {/* bottom row */}
                              <Flex align="center" justify="space-between" flexWrap="wrap" gap={3}>
                                <HStack spacing={2}>
                                  <Box w="6px" h="6px" borderRadius="full"
                                    bg={isActive ? L.accentLight : L.subtle} />
                                  <Text fontSize="12px" fontWeight="600" color={L.muted}>
                                    {booking.days} days · {booking.service === 'Hire' ? 'With driver' : 'Self-drive'}
                                  </Text>
                                </HStack>

                                <Button
                                  className="details-btn"
                                  size="sm" h="34px" px={4}
                                  bg={L.bg}
                                  color={L.accentLight}
                                  borderRadius="10px"
                                  fontSize="12px"
                                  fontWeight="700"
                                  border="1px solid"
                                  borderColor={L.borderMid}
                                  rightIcon={<Icon as={FiChevronRight} boxSize={3.5} />}
                                  _hover={{}}
                                  onClick={() => router.push(`/customer/fleet/${booking.vehicleId}`)}
                                >
                                  View Details
                                </Button>
                              </Flex>
                            </Box>
                          </Flex>
                        </Box>
                      </Card>
                    );
                  })}
                </VStack>
              ) : (
                /* empty state */
                <Card p="12">
                  <VStack spacing={5} align="center" textAlign="center">
                    <Circle size="72px" bg={L.accentGlow2} border="1px solid" borderColor={L.borderMid}>
                      <Icon as={FiInbox} boxSize={7} color={L.accentLight} />
                    </Circle>
                    <Box>
                      <Text fontSize="18px" fontWeight="800" color={L.text} mb={1}>
                        No bookings yet
                      </Text>
                      <Text fontSize="13px" color={L.muted} maxW="340px">
                        You haven't rented any vehicles yet. Browse our premium fleet to start your journey.
                      </Text>
                    </Box>
                    <Button
                      className="empty-btn"
                      h="46px" px={8}
                      bg={`linear-gradient(135deg, ${L.accent}, ${L.accentLight})`}
                      color="white"
                      borderRadius="14px"
                      fontSize="14px"
                      fontWeight="800"
                      boxShadow="0 4px 16px rgba(30,110,30,0.25)"
                      rightIcon={<Icon as={FiArrowRight} boxSize={4} />}
                      _hover={{}}
                      onClick={() => router.push('/customer/fleet')}
                    >
                      Browse Fleet
                    </Button>
                  </VStack>
                </Card>
              )}
            </Box>

            {/* ── SUPPORT STRIP ────────────────────────────────────────── */}
            <Box className="fu3">
              <Box
                position="relative"
                borderRadius="20px"
                overflow="hidden"
                bg={`linear-gradient(135deg, ${L.accent} 0%, ${L.accentLight} 55%, #3a9c3a 100%)`}
                boxShadow={L.shadowGreen}
                border="1px solid"
                borderColor={L.borderMid}
                px={{ base: 6, md: 8 }}
                py={{ base: 6, md: 7 }}
              >
                {/* grid texture */}
                <Box
                  position="absolute" top={0} right={0} bottom={0} left={0}
                  opacity={0.06}
                  bgImage="linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)"
                  bgSize="44px 44px"
                  pointerEvents="none"
                />
                <Box
                  position="absolute" top="-40px" right="-30px"
                  w="180px" h="180px" borderRadius="full"
                  bg="radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 65%)"
                  pointerEvents="none"
                />

                <Flex
                  align={{ base: 'flex-start', md: 'center' }}
                  justify="space-between"
                  direction={{ base: 'column', md: 'row' }}
                  gap={5}
                  position="relative"
                  zIndex={1}
                >
                  <Box>
                    <HStack spacing={2} mb={2}>
                      <Icon as={FiPhone} boxSize={3.5} color="rgba(255,255,255,0.75)" />
                      <Text fontSize="11px" fontWeight="700" color="rgba(255,255,255,0.75)"
                        textTransform="uppercase" letterSpacing=".1em">
                        Concierge Support
                      </Text>
                    </HStack>
                    <Text fontSize={{ base: '16px', md: '18px' }} fontWeight="800"
                      color="white" letterSpacing="-0.02em" mb={1}>
                      Need help with a booking?
                    </Text>
                    <Text fontSize="13px" color="rgba(255,255,255,0.65)" maxW="400px">
                      Our elite team is available 24/7 for changes, extensions, and special requests.
                    </Text>
                  </Box>

                  <Button
                    h="44px" px={6}
                    bg="rgba(255,255,255,0.15)"
                    color="white"
                    borderRadius="12px"
                    fontSize="13px"
                    fontWeight="700"
                    border="1px solid rgba(255,255,255,0.25)"
                    rightIcon={<Icon as={FiArrowRight} boxSize={4} />}
                    sx={{ backdropFilter: 'blur(8px)', flexShrink: 0 }}
                    _hover={{ bg: 'rgba(255,255,255,0.22)' }}
                    transition="all .15s ease"
                  >
                    Contact Support
                  </Button>
                </Flex>

                <Box position="absolute" bottom={0} left={0} right={0} h="1px"
                  bg="linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)" />
              </Box>
            </Box>

          </VStack>
        </Container>
      </Box>
    </>
  );
}