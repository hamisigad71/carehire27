'use client';

import { Box, SimpleGrid, Heading, Text, VStack, Progress, Flex, Icon, Button, HStack, Badge } from '@chakra-ui/react';
import { PageHeader } from '@/components/ui/PageHeader';
import { FiTrendingUp, FiTrendingDown, FiDollarSign, FiCalendar, FiArrowRight } from 'react-icons/fi';
import { useColorTokens } from '@/hooks/useColorTokens';
import { formatCurrency } from '@/utils/format';

export default function BookingGrowthPage() {
  const tokens = useColorTokens();

  return (
    <Box>
      <PageHeader 
        title="Booking Growth Trends"
        subtitle="Historical growth analysis and predictive market forecasting."
        breadcrumbs={[
            { label: 'Business', href: '/business' },
            { label: 'Analytics', href: '/business/booking_growth_trends' }
        ]}
      />

      <SimpleGrid columns={[1, 1, 2]} spacing={8} mb={10}>
         <Box bg={tokens.cardBg} p={8} borderRadius="24px" boxShadow={tokens.shadow} border="1px solid" borderColor={tokens.border}>
            <Flex justify="space-between" align="center" mb={10}>
               <Box>
                  <Heading fontSize="18px" fontWeight="700">Quarterly Growth</Heading>
                  <Text fontSize="13px" color={tokens.textMuted}>Revenue vs. Booking Volume</Text>
               </Box>
               <Badge colorScheme="brand" px={3} py={1} borderRadius="full">+24.5% YoY</Badge>
            </Flex>
            <Flex direction="column" h="240px" justify="center" align="center" bg={tokens.cardBg2} borderRadius="20px" border="1px dashed" borderColor={tokens.border}>
               <Icon as={FiTrendingUp} boxSize={12} color={tokens.accent} opacity={0.3} mb={4} />
               <Text fontSize="14px" fontWeight="600" color={tokens.textSubtle}>Growth Visualization Pipeline</Text>
            </Flex>
         </Box>

         <VStack spacing={8} align="stretch">
            <Box bg={tokens.cardBg} p={8} borderRadius="24px" boxShadow={tokens.shadow} border="1px solid" borderColor={tokens.border}>
               <Heading fontSize="16px" fontWeight="700" mb={6}>Key Performance Indicators</Heading>
               <VStack spacing={6} align="stretch">
                  <Box>
                     <Flex justify="space-between" mb={2}>
                        <Text fontSize="13px" fontWeight="600">New Customer Acquisition</Text>
                        <Text fontSize="13px" color={tokens.success}>+12.4%</Text>
                     </Flex>
                     <Progress value={65} colorScheme="brand" size="xs" borderRadius="full" />
                  </Box>
                  <Box>
                     <Flex justify="space-between" mb={2}>
                        <Text fontSize="13px" fontWeight="600">Returning Renter Rate</Text>
                        <Text fontSize="13px" color={tokens.accent}>58%</Text>
                     </Flex>
                     <Progress value={58} colorScheme="blue" size="xs" borderRadius="full" />
                  </Box>
                  <Box>
                     <Flex justify="space-between" mb={2}>
                        <Text fontSize="13px" fontWeight="600">Booking Conversion Rate</Text>
                        <Text fontSize="13px" color={tokens.warning}>4.2%</Text>
                     </Flex>
                     <Progress value={42} colorScheme="orange" size="xs" borderRadius="full" />
                  </Box>
               </VStack>
            </Box>
         </VStack>
      </SimpleGrid>

      <SimpleGrid columns={[1, 1, 3]} spacing={8}>
         {[
            { label: 'Economy Growth', val: '+15%', color: 'emerald' },
            { label: 'Luxury Growth', val: '+42%', color: 'brand' },
            { label: 'SUV Growth', val: '+8%', color: 'blue' },
         ].map((item) => (
            <Box key={item.label} bg={tokens.cardBg} p={6} borderRadius="24px" border="1px solid" borderColor={tokens.border}>
               <Text fontSize="11px" fontWeight="700" color={tokens.textMuted} textTransform="uppercase" mb={2}>{item.label}</Text>
               <Flex align="center">
                  <Heading fontSize="24px" fontWeight="800" mr={3}>{item.val}</Heading>
                  <Icon as={FiTrendingUp} color={`${item.color}.500`} />
               </Flex>
            </Box>
         ))}
      </SimpleGrid>
    </Box>
  );
}
