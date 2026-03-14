'use client';

import { useState, useEffect } from 'react';
import { 
  Box, Container, Heading, Text, VStack, Button, Icon, SimpleGrid, 
  Flex, Image, Badge, HStack, Grid, GridItem, Divider, Spinner, Center
} from '@chakra-ui/react';
import { 
  FiClock, FiCheckCircle, FiChevronRight, FiMapPin, FiCalendar, 
  FiDollarSign, FiInbox, FiTruck, FiArrowRight 
} from 'react-icons/fi';
import { useColorTokens } from '@/hooks/useColorTokens';
import { formatCurrency } from '@/utils/format';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { useRouter } from 'next/navigation';
import { Vehicle } from '@/types';

export default function CustomerBookingsPage() {
  const tokens = useColorTokens();
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await fetch('/api/vehicles');
        if (res.ok) {
          const data = await res.json();
          setVehicles(data);
        }
      } catch (err) {
        console.error('Bookings page fetch failed:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  const bookingData = [
    {
      id: 'B-7721',
      vehicleId: 'V-1001',
      status: 'Active',
      pickup: 'Mar 10, 2026',
      return: 'Mar 13, 2026',
      total: 450,
      location: 'Beverly Hills HQ',
      service: 'Rent'
    },
    {
      id: 'B-7722',
      vehicleId: 'V-1002',
      status: 'Pending',
      pickup: 'Mar 15, 2026',
      return: 'Mar 18, 2026',
      total: 1500,
      location: 'Main Branch',
      service: 'Hire'
    },
    {
      id: 'B-7640',
      vehicleId: 'V-1009',
      status: 'Completed',
      pickup: 'Feb 15, 2026',
      return: 'Feb 18, 2026',
      total: 1350,
      location: 'Los Angeles Airport'
    }
  ];

  const getVehicle = (id: string) => vehicles.find(v => v.id === id);

  return (
    <Box py={[10, 16]}>
      <Container maxW="1000px">
        <VStack align="start" spacing={10}>
          <Box>
            <Heading fontSize={['32px', '40px']} fontWeight="800" letterSpacing="-0.02em" mb={2}>
              My <Text as="span" color={tokens.accent}>Rentals</Text>
            </Heading>
            <Text color={tokens.textMuted}>Track your active trips and view past experiences</Text>
          </Box>

          <Box w="full">
            <VStack spacing={6} align="stretch">
              {loading ? (
                <Center py={20}>
                  <Spinner color={tokens.accent} size="xl" thickness="4px" />
                </Center>
              ) : bookingData.length > 0 ? (
                bookingData.map((booking) => {
                  const vehicle = getVehicle(booking.vehicleId);
                  return (
                    <Box 
                      key={booking.id} bg={tokens.cardBg} p={6} borderRadius="32px" border="1px solid" borderColor={tokens.border}
                      boxShadow={tokens.shadow} transition="all 0.3s"
                      _hover={{ transform: 'translateY(-4px)', borderColor: tokens.accent }}
                    >
                      <Flex direction={['column', 'row']} align={['stretch', 'center']} gap={6}>
                        <Image 
                          src={vehicle?.image || 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=400'} 
                          alt={vehicle?.name || 'Vehicle'} boxSize={['full', '140px']} 
                          borderRadius="24px" objectFit="cover" mb={[4, 0]} mr={[0, 6]}
                        />
                        
                        <Box flex={1}>
                          <Flex justify="space-between" align="center" mb={2}>
                             <HStack spacing={2}>
                                <Text fontSize="12px" fontWeight="700" color={tokens.textMuted}>{booking.id}</Text>
                                <Badge colorScheme={booking.service === 'Hire' ? 'purple' : 'brand'} fontSize="10px">
                                   {booking.service === 'Hire' ? 'Chauffeur' : 'Self-Drive'}
                                </Badge>
                             </HStack>
                             <StatusBadge status={booking.status} />
                          </Flex>
                          <Heading fontSize="22px" fontWeight="700" mb={4}>{vehicle?.name || 'Loading...'}</Heading>
                          
                          <SimpleGrid columns={[1, 3]} spacing={4}>
                             <HStack spacing={2}>
                                <Icon as={FiCalendar} color={tokens.accent} />
                                <Box>
                                   <Text fontSize="11px" fontWeight="600" color={tokens.textSubtle} textTransform="uppercase">Duration</Text>
                                   <Text fontSize="13px" fontWeight="700">{booking.pickup} - {booking.return}</Text>
                                </Box>
                             </HStack>
                             <HStack spacing={2}>
                                <Icon as={FiMapPin} color={tokens.accent} />
                                <Box>
                                   <Text fontSize="11px" fontWeight="600" color={tokens.textSubtle} textTransform="uppercase">Pickup</Text>
                                   <Text fontSize="13px" fontWeight="700">{booking.location}</Text>
                                </Box>
                             </HStack>
                             <HStack spacing={2}>
                                <Icon as={FiDollarSign} color={tokens.accent} />
                                <Box>
                                   <Text fontSize="11px" fontWeight="600" color={tokens.textSubtle} textTransform="uppercase">Total</Text>
                                   <Text fontSize="13px" fontWeight="700">{formatCurrency(booking.total)}</Text>
                                </Box>
                             </HStack>
                          </SimpleGrid>
                        </Box>
  
                        <Button 
                          ml={[0, 6]} mt={[6, 0]} variant="ghost" color={tokens.accent} 
                          rightIcon={<FiChevronRight />} borderRadius="14px"
                          onClick={() => router.push(`/customer/fleet/${booking.vehicleId}`)}
                        >
                          Details
                        </Button>
                      </Flex>
                    </Box>
                  );
                })
              ) : (
                <Box py={20} textAlign="center">
                   <Icon as={FiInbox} boxSize={16} color={tokens.textMuted} mb={6} />
                   <Heading fontSize="24px" mb={2}>No bookings found</Heading>
                   <Text color={tokens.textMuted} mb={8}>You haven't rented any vehicles yet. Let's start your journey.</Text>
                   <Button 
                      bg={tokens.accent} color="white" px={10} borderRadius="18px" h="54px"
                      onClick={() => router.push('/customer/fleet')}
                    >
                      Browse Fleet
                   </Button>
                </Box>
              )}
            </VStack>
          </Box>

          {/* Need Help CTA */}
          <Box 
            w="full" bg={tokens.cardBg2} p={8} borderRadius="32px" border="1px dashed" borderColor={tokens.border}
            textAlign="center"
          >
             <VStack spacing={4}>
                <Heading fontSize="20px">Need help with a booking?</Heading>
                <Text color={tokens.textMuted} fontSize="14px">Our elite concierge team is available 24/7 to assist with changes or special requests.</Text>
                <Button size="sm" variant="link" color={tokens.accent} rightIcon={<FiArrowRight />}>Contact Support</Button>
             </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
