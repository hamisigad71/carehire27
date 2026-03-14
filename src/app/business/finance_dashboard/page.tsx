'use client';

import { 
  Box, Flex, Text, Button, Icon, HStack, 
  SimpleGrid, Heading, VStack, Progress 
} from '@chakra-ui/react';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { DataTable } from '@/components/ui/DataTable';
import { FiDollarSign, FiTrendingUp, FiPieChart, FiBarChart2 } from 'react-icons/fi';
import { useColorTokens } from '@/hooks/useColorTokens';
import { formatCurrency } from '@/utils/format';

export default function FinanceDashboardPage() {
  const tokens = useColorTokens();

  const financeStats = [
    { label: 'Annual Revenue', value: formatCurrency(654000), trend: 18.2, icon: FiDollarSign },
    { label: 'Profit Margin', value: '32%', trend: 4.5, icon: FiTrendingUp },
    { label: 'Operating Cost', value: formatCurrency(142000), trend: -2.1, icon: FiPieChart },
    { label: 'Avg. Transaction', value: formatCurrency(920), trend: 1.4, icon: FiBarChart2 },
  ];

  return (
    <Box>
      <PageHeader 
        title="Finance Dashboard"
        subtitle="Real-time financial monitoring and performance tracking."
        breadcrumbs={[
            { label: 'Business', href: '/business' },
            { label: 'Finance', href: '/business/finance_dashboard' }
        ]}
        actionLabel="Export Statements"
      />

      <SimpleGrid columns={[1, 2, 4]} spacing={6} mb={10}>
        {financeStats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </SimpleGrid>

      <SimpleGrid columns={[1, 1, 2]} spacing={8}>
         <Box bg={tokens.cardBg} p={8} borderRadius="24px" boxShadow={tokens.shadow} border="1px solid" borderColor={tokens.border}>
            <Heading fontSize="18px" fontWeight="700" mb={6}>Revenue Channels</Heading>
            <VStack spacing={6} align="stretch">
               <Box>
                  <Flex justify="space-between" mb={2}>
                     <Text fontSize="14px" fontWeight="600">Online Bookings</Text>
                     <Text fontSize="14px" color={tokens.textMuted}>72%</Text>
                  </Flex>
                  <Progress value={72} colorScheme="brand" size="sm" borderRadius="full" />
               </Box>
               <Box>
                  <Flex justify="space-between" mb={2}>
                     <Text fontSize="14px" fontWeight="600">Corporate Contracts</Text>
                     <Text fontSize="14px" color={tokens.textMuted}>18%</Text>
                  </Flex>
                  <Progress value={18} colorScheme="blue" size="sm" borderRadius="full" />
               </Box>
               <Box>
                  <Flex justify="space-between" mb={2}>
                     <Text fontSize="14px" fontWeight="600">Walk-in Customers</Text>
                     <Text fontSize="14px" color={tokens.textMuted}>10%</Text>
                  </Flex>
                  <Progress value={10} colorScheme="orange" size="sm" borderRadius="full" />
               </Box>
            </VStack>
         </Box>
         
         <Box bg={tokens.cardBg} p={8} borderRadius="24px" boxShadow={tokens.shadow} border="1px solid" borderColor={tokens.border}>
            <Heading fontSize="18px" fontWeight="700" mb={6}>Capital Allocation</Heading>
            <Flex direction="column" justify="center" h="200px" align="center">
                <Text fontSize="48px" fontWeight="700" color={tokens.accent}>$2.4M</Text>
                <Text fontSize="14px" color={tokens.textMuted} textTransform="uppercase" letterSpacing="widest">Total Asset Value</Text>
            </Flex>
         </Box>
      </SimpleGrid>
    </Box>
  );
}
