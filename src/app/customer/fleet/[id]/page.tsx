'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Box, Container, Heading, Text, VStack, Button, Icon, SimpleGrid, 
  Flex, Image, Badge, HStack, Grid, GridItem, Divider, 
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, FormControl, FormLabel, Input,
  InputGroup, InputLeftElement, Spinner, Center
} from '@chakra-ui/react';
import { 
  FiMapPin, FiCalendar, FiChevronRight, FiUsers, FiCpu, 
  FiZap, FiShield, FiStar, FiActivity, FiArrowRight, FiAlertCircle 
} from 'react-icons/fi';
import { useColorTokens } from '@/hooks/useColorTokens';
import { formatCurrency } from '@/utils/format';
import { Vehicle } from '@/types';
import { PremiumIcon } from '@/components/ui/PremiumIcon';

// Helper to map icon names to components
const IconMap: Record<string, any> = {
  FiUsers, FiCpu, FiZap, FiActivity
};

export default function CustomerVehicleDetailsPage() {
  const { id } = useParams();
  const tokens = useColorTokens();
  const router = useRouter();
  
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [serviceType, setServiceType] = useState('rent'); // 'rent' or 'hire'
  const driverFee = 50;

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await fetch('/api/vehicles');
        if (!response.ok) throw new Error('Failed to fetch');
        const data: Vehicle[] = await response.json();
        const found = data.find(v => v.id === id);
        if (!found) throw new Error('Vehicle not found');
        setVehicle(found);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching vehicle details');
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [id]);

  if (loading) return (
    <Center h="100vh">
      <VStack spacing={4}>
        <Spinner size="xl" color={tokens.accent} thickness="4px" />
        <Text fontWeight="600">Loading vehicle details...</Text>
      </VStack>
    </Center>
  );

  if (error || !vehicle) return (
    <Center h="100vh">
      <VStack spacing={6}>
        <Icon as={FiAlertCircle} color="red.400" boxSize={12} />
        <VStack spacing={2}>
           <Heading size="md">Unable to load vehicle</Heading>
           <Text color={tokens.textMuted}>{error || 'The vehicle could not be found.'}</Text>
        </VStack>
        <Button onClick={() => router.push('/customer/fleet')} variant="outline">Back to Fleet</Button>
      </VStack>
    </Center>
  );

  const totalPrice = (vehicle.price + (serviceType === 'hire' ? driverFee : 0)) * 3;

  return (
    <Box py={[6, 10]}>
      <Container maxW="1200px">
        <Breadcrumb 
          spacing="8px" 
          separator={<Icon as={FiChevronRight} color={tokens.textSubtle} />}
          fontSize="12px" fontWeight="600" color={tokens.textMuted}
          mb={8}
        >
          <BreadcrumbItem>
            <BreadcrumbLink href="/customer">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/customer/fleet">Fleet</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">{vehicle.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Grid templateColumns={["1fr", "1fr", "1fr 400px"]} gap={12}>
          <GridItem>
            {/* Gallery Section */}
            <VStack spacing={6} align="stretch">
              <Box borderRadius="40px" overflow="hidden" boxShadow={tokens.shadow} border="1px solid" borderColor={tokens.border}>
                <Image src={vehicle.images?.[0] || vehicle.image} alt={vehicle.name} w="full" h={['300px', '500px']} objectFit="cover" />
              </Box>
              {vehicle.images && vehicle.images.length > 1 && (
                <SimpleGrid columns={3} spacing={4}>
                  {vehicle.images.slice(1).map((img, idx) => (
                    <Box key={idx} borderRadius="24px" overflow="hidden" border="1px solid" borderColor={tokens.border}>
                      <Image src={img} alt={`${vehicle.name} ${idx + 2}`} w="full" h="120px" objectFit="cover" />
                    </Box>
                  ))}
                </SimpleGrid>
              )}

              {/* Info Section */}
              <Box py={6}>
                <HStack spacing={2} mb={4}>
                   <Badge colorScheme="brand" borderRadius="full" px={3}>{vehicle.type}</Badge>
                   <HStack spacing={1} color="yellow.400">
                      <Icon as={FiStar} fill="currentColor" />
                      <Text fontWeight="700" color={tokens.textPrimary}>4.9</Text>
                      <Text color={tokens.textMuted} fontSize="14px">(124 reviews)</Text>
                   </HStack>
                </HStack>
                <Heading fontSize={['32px', '48px']} fontWeight="800" letterSpacing="-0.02em" mb={4}>
                   {vehicle.name}
                </Heading>
                <Text color={tokens.textMuted} fontSize="18px" lineHeight="1.6" mb={8}>
                  {vehicle.description || `Experience the ultimate in ${vehicle.type.toLowerCase()} performance and luxury with the ${vehicle.name}. Designed for excellence and comfort.`}
                </Text>

                {vehicle.features && vehicle.features.length > 0 && (
                  <>
                    <Heading fontSize="20px" fontWeight="700" mb={6}>Key Features</Heading>
                    <SimpleGrid columns={[2, 2, 4]} spacing={6} mb={10}>
                        {vehicle.features.map((feat, idx) => (
                          <VStack key={idx} align="start" p={4} bg={tokens.cardBg} borderRadius="20px" border="1px solid" borderColor={tokens.border} spacing={3}>
                             <PremiumIcon query={feat.label} size="20px" color={tokens.accent} />
                             <Text fontWeight="600" fontSize="14px">{feat.label}</Text>
                          </VStack>
                       ))}
                    </SimpleGrid>
                  </>
                )}

                <Divider mb={10} borderColor={tokens.border} opacity={0.3} />

                {vehicle.specifications && vehicle.specifications.length > 0 && (
                  <>
                    <Heading fontSize="20px" fontWeight="700" mb={6}>Specifications</Heading>
                    <SimpleGrid columns={[1, 2]} spacing={8}>
                       {vehicle.specifications.map((spec, idx) => (
                          <Flex key={idx} justify="space-between" borderBottom="1px solid" borderColor={tokens.border} pb={4}>
                             <Text color={tokens.textMuted} fontWeight="500">{spec.label}</Text>
                             <Text fontWeight="700" color={tokens.textPrimary}>{spec.value}</Text>
                          </Flex>
                       ))}
                    </SimpleGrid>
                  </>
                )}
              </Box>
            </VStack>
          </GridItem>

          {/* Booking Widget Section */}
          <GridItem>
            <Box 
              position="sticky" top="100px" 
              bg={tokens.cardBg} p={8} borderRadius="32px" border="1px solid" borderColor={tokens.border}
              boxShadow="0 30px 60px rgba(0,0,0,0.1)"
            >
               <VStack spacing={6} align="stretch" mb={8}>
                  <Box>
                    <Text fontSize="12px" fontWeight="700" color={tokens.textMuted} textTransform="uppercase" mb={3}>Select Service</Text>
                    <SimpleGrid columns={2} spacing={4}>
                       <Box 
                          p={4} borderRadius="20px" border="2px solid" 
                          borderColor={serviceType === 'rent' ? tokens.accent : tokens.border}
                          bg={serviceType === 'rent' ? tokens.accentGlow : 'transparent'}
                          cursor="pointer" onClick={() => setServiceType('rent')}
                          transition="all 0.2s"
                       >
                          <VStack spacing={1} align="center">
                             <Icon as={FiCpu} color={serviceType === 'rent' ? tokens.accent : tokens.textMuted} />
                             <Text fontSize="13px" fontWeight="700">Self-Drive</Text>
                             <Text fontSize="11px" color={tokens.textSubtle}>Rent</Text>
                          </VStack>
                       </Box>
                       <Box 
                          p={4} borderRadius="20px" border="2px solid" 
                          borderColor={serviceType === 'hire' ? tokens.accent : tokens.border}
                          bg={serviceType === 'hire' ? tokens.accentGlow : 'transparent'}
                          cursor="pointer" onClick={() => setServiceType('hire')}
                          transition="all 0.2s"
                       >
                          <VStack spacing={1} align="center">
                             <Icon as={FiUsers} color={serviceType === 'hire' ? tokens.accent : tokens.textMuted} />
                             <Text fontSize="13px" fontWeight="700">With Driver</Text>
                             <Text fontSize="11px" color={tokens.textSubtle}>Hire</Text>
                          </VStack>
                       </Box>
                    </SimpleGrid>
                  </Box>

                  <Flex justify="space-between" align="baseline">
                     <Box>
                        <Text fontSize="14px" fontWeight="600" color={tokens.textMuted}>Rate</Text>
                        <Text fontSize="32px" fontWeight="800" color={tokens.accent}>
                           {formatCurrency(vehicle.price + (serviceType === 'hire' ? driverFee : 0))}
                           <Text as="span" fontSize="16px" color={tokens.textMuted} fontWeight="600"> / day</Text>
                        </Text>
                     </Box>
                     <Icon as={FiShield} color={tokens.success} boxSize={6} />
                  </Flex>
               </VStack>

               <VStack spacing={6} align="stretch" mb={8}>
                  <FormControl>
                     <FormLabel fontSize="12px" fontWeight="700" color={tokens.textMuted} textTransform="uppercase">Pickup Location</FormLabel>
                     <InputGroup>
                        <InputLeftElement h="full" pointerEvents="none">
                           <Icon as={FiMapPin} color={tokens.accent} />
                        </InputLeftElement>
                        <Input 
                           h="54px" borderRadius="14px" bg={tokens.pageBg} border="1px solid" borderColor={tokens.border}
                           defaultValue="Main HQ, Beverly Hills"
                        />
                     </InputGroup>
                  </FormControl>

                  <FormControl>
                     <FormLabel fontSize="12px" fontWeight="700" color={tokens.textMuted} textTransform="uppercase">Rental Period</FormLabel>
                     <HStack spacing={2}>
                        <InputGroup>
                           <InputLeftElement h="full"><Icon as={FiCalendar} color={tokens.accent} /></InputLeftElement>
                           <Input h="54px" borderRadius="14px" bg={tokens.pageBg} border="1px solid" borderColor={tokens.border} placeholder="Start" />
                        </InputGroup>
                        <InputGroup>
                           <InputLeftElement h="full"><Icon as={FiCalendar} color={tokens.accent} /></InputLeftElement>
                           <Input h="54px" borderRadius="14px" bg={tokens.pageBg} border="1px solid" borderColor={tokens.border} placeholder="End" />
                        </InputGroup>
                     </HStack>
                  </FormControl>
               </VStack>

                <VStack spacing={4} mb={8}>
                  <Flex justify="space-between" w="full">
                     <Text color={tokens.textMuted} fontSize="15px">Duration</Text>
                     <Text fontWeight="600">3 Days</Text>
                  </Flex>
                  <Flex justify="space-between" w="full">
                     <Text color={tokens.textMuted} fontSize="15px">Service Type</Text>
                     <Text fontWeight="600">{serviceType === 'rent' ? 'Self-Drive' : 'With Driver'}</Text>
                  </Flex>
                  {serviceType === 'hire' && (
                    <Flex justify="space-between" w="full">
                       <Text color={tokens.textMuted} fontSize="15px">Driver Fee (3 days)</Text>
                       <Text fontWeight="600">{formatCurrency(driverFee * 3)}</Text>
                    </Flex>
                  )}
                  <Divider borderColor={tokens.border} opacity={0.3} />
                  <Flex justify="space-between" w="full" align="center">
                     <Text fontWeight="700" fontSize="18px">Total Amount</Text>
                     <Text fontWeight="800" fontSize="24px" color={tokens.accent}>
                        {formatCurrency(totalPrice)}
                     </Text>
                  </Flex>
               </VStack>

               <Button 
                  w="full" h="64px" bg={tokens.accent} color="white" borderRadius="20px" fontSize="18px"
                  boxShadow={`0 10px 30px ${tokens.accent}30`}
                  rightIcon={<FiArrowRight />}
                  onClick={() => router.push(`/customer/checkout?type=${serviceType}&vehicleId=${vehicle.id}`)}
                  _hover={{ opacity: 0.9, transform: 'translateY(-2px)' }}
               >
                  Book This Vehicle
               </Button>
               
               <Text textAlign="center" mt={6} fontSize="13px" color={tokens.textSubtle}>
                  You won't be charged yet. No credit card required to request verification.
               </Text>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}
