'use client';

import { 
  Box, Container, VStack, Heading, Text, Button, Icon, 
  Flex, Image, HStack, Divider, SimpleGrid
} from '@chakra-ui/react';
import { FiCheckCircle, FiCalendar, FiArrowRight, FiFileText, FiDownload, FiMapPin } from 'react-icons/fi';
import { useColorTokens } from '@/hooks/useColorTokens';
import { useRouter } from 'next/navigation';
import { formatCurrency } from '@/utils/format';

export default function CheckoutSuccessPage() {
  const tokens = useColorTokens();
  const router = useRouter();

  return (
    <Box py={[10, 20]}>
      <Container maxW="800px">
        <VStack spacing={12} textAlign="center">
          {/* Success Header */}
          <VStack spacing={6}>
            <Box 
              bg={tokens.successGlow} p={6} borderRadius="full" 
              boxShadow={`0 0 50px ${tokens.success}20`}
            >
              <Icon as={FiCheckCircle} boxSize={16} color={tokens.success} />
            </Box>
            <Box>
              <Heading fontSize={['32px', '48px']} fontWeight="800" letterSpacing="-0.04em" mb={4}>
                Rental <Text as="span" color={tokens.accent}>Confirmed</Text>!
              </Heading>
              <Text fontSize="18px" color={tokens.textMuted} maxW="600px">
                Your identity has been verified and your booking is secured. Get ready to hit the road with our elite service.
              </Text>
            </Box>
          </VStack>

          {/* Booking Summary Card */}
          <Box 
            w="full" bg={tokens.cardBg} p={10} borderRadius="32px" border="1px solid" borderColor={tokens.border}
            boxShadow={tokens.shadow} textAlign="left"
          >
             <Flex direction={['column', 'row']} justify="space-between" align={['start', 'center']} mb={8}>
                <Box>
                   <Text fontSize="12px" fontWeight="700" color={tokens.textSubtle} textTransform="uppercase" mb={1}>Booking ID</Text>
                   <Text fontSize="20px" fontWeight="800">#ELITE-7721-39</Text>
                </Box>
                <Badge colorScheme="brand" px={4} py={1} borderRadius="full" mt={[4, 0]}>Verifed Rental</Badge>
             </Flex>

             <SimpleGrid columns={[1, 2]} spacing={8} mb={8}>
                <HStack spacing={4}>
                   <Box bg={tokens.accentGlow} p={3} borderRadius="16px">
                      <Icon as={FiCalendar} color={tokens.accent} />
                   </Box>
                   <Box>
                      <Text fontSize="11px" fontWeight="700" color={tokens.textSubtle} textTransform="uppercase">Rental Dates</Text>
                      <Text fontWeight="700">Mar 10 - Mar 13, 2026</Text>
                   </Box>
                </HStack>
                <HStack spacing={4}>
                   <Box bg={tokens.accentGlow} p={3} borderRadius="16px">
                      <Icon as={FiMapPin} color={tokens.accent} />
                   </Box>
                   <Box>
                      <Text fontSize="11px" fontWeight="700" color={tokens.textSubtle} textTransform="uppercase">Pickup Point</Text>
                      <Text fontWeight="700">Main HQ, Beverly Hills</Text>
                   </Box>
                </HStack>
             </SimpleGrid>

             <Divider borderColor={tokens.border} opacity={0.3} mb={8} />

             <Flex justify="space-between" align="center">
                <HStack spacing={4}>
                   <Button variant="outline" borderColor={tokens.border} leftIcon={<FiDownload />} borderRadius="14px">
                      Download Receipt
                   </Button>
                   <Button variant="ghost" color={tokens.accent} leftIcon={<FiFileText />}>
                      View Agreement
                   </Button>
                </HStack>
                <Box textAlign="right">
                   <Text fontSize="12px" color={tokens.textMuted} fontWeight="600">Total Paid</Text>
                   <Text fontSize="24px" fontWeight="800" color={tokens.accent}>{formatCurrency(450)}</Text>
                </Box>
             </Flex>
          </Box>

          {/* Next Steps */}
          <VStack spacing={4} w="full">
             <Button 
                w="full" h="64px" bg={tokens.accent} color="white" borderRadius="20px" fontSize="18px"
                rightIcon={<FiArrowRight />}
                onClick={() => router.push('/customer/bookings')}
                _hover={{ opacity: 0.9, transform: 'translateY(-2px)' }}
             >
                Go to My Rentals
             </Button>
             <Button variant="link" color={tokens.textMuted} onClick={() => router.push('/customer')}>
                Return to Home
             </Button>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
