'use client';

import { Box, Flex, Text, Button, Icon, HStack, SimpleGrid, Heading, VStack, Progress } from '@chakra-ui/react';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { FiTrendingUp, FiTrendingDown, FiDollarSign, FiBarChart2, FiPieChart } from 'react-icons/fi';
import { useColorTokens } from '@/hooks/useColorTokens';
import { formatCurrency } from '@/utils/format';

const stats = [
  { label: 'Monthly Revenue', value: formatCurrency(42500), trend: 15.2, icon: FiTrendingUp },
  { label: 'Monthly Expenses', value: formatCurrency(12800), trend: -4.5, icon: FiTrendingDown },
  { label: 'Net Profit', value: formatCurrency(29700), trend: 18.4, icon: FiDollarSign },
  { label: 'Avg. Profit/Car', value: formatCurrency(450), trend: 2.1, icon: FiBarChart2 },
];

export default function ReportsPage() {
  const tokens = useColorTokens();

  return (
    <Box>
      <PageHeader 
        title="Revenue & Analytics"
        subtitle="Detailed financial performance and business insights."
        breadcrumbs={[
            { label: 'Business', href: '/business' },
            { label: 'Reports', href: '/business/reports' }
        ]}
        actionLabel="Generate PDF"
        actionIcon={<FiBarChart2 />}
      />

      <SimpleGrid columns={[1, 2, 4]} spacing={6} mb={10}>
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </SimpleGrid>

      <SimpleGrid columns={[1, 1, 2]} spacing={8}>
         <Box bg={tokens.cardBg} p={8} borderRadius="24px" boxShadow={tokens.shadow} border="1px solid" borderColor={tokens.border}>
            <Heading fontSize="18px" fontWeight="700" mb={6}>Revenue by Category</Heading>
            <VStack spacing={6} align="stretch">
               <Box>
                  <Flex justify="space-between" mb={2}>
                     <Text fontSize="14px" fontWeight="600">Economy Class</Text>
                     <Text fontSize="14px" color={tokens.textMuted}>35% • {formatCurrency(14875)}</Text>
                  </Flex>
                  <Progress value={35} colorScheme="brand" size="sm" borderRadius="full" />
               </Box>
               <Box>
                  <Flex justify="space-between" mb={2}>
                     <Text fontSize="14px" fontWeight="600">Luxury / Premium</Text>
                     <Text fontSize="14px" color={tokens.textMuted}>45% • {formatCurrency(19125)}</Text>
                  </Flex>
                  <Progress value={45} colorScheme="brand" size="sm" borderRadius="full" />
               </Box>
               <Box>
                  <Flex justify="space-between" mb={2}>
                     <Text fontSize="14px" fontWeight="600">SUVs & Vans</Text>
                     <Text fontSize="14px" color={tokens.textMuted}>20% • {formatCurrency(8500)}</Text>
                  </Flex>
                  <Progress value={20} colorScheme="brand" size="sm" borderRadius="full" />
               </Box>
            </VStack>
         </Box>

         <Box bg={tokens.cardBg} p={8} borderRadius="24px" boxShadow={tokens.shadow} border="1px solid" borderColor={tokens.border}>
            <Heading fontSize="18px" fontWeight="700" mb={6}>Monthly Growth</Heading>
            <Flex direction="column" align="center" justify="center" h="200px">
               <Icon as={FiTrendingUp} boxSize={20} color={tokens.accentGlow} opacity={0.3} mb={4} />
               <Text fontSize="24px" fontWeight="700" color={tokens.accent}>+24.5%</Text>
               <Text fontSize="14px" color={tokens.textMuted}>Year-over-year revenue growth</Text>
            </Flex>
         </Box>
      </SimpleGrid>
    </Box>
  );
}
