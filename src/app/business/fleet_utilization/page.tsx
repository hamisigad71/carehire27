'use client';

import { Box, SimpleGrid, Heading, Text, VStack, Progress, Flex, Icon, Button, HStack } from '@chakra-ui/react';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { DataTable } from '@/components/ui/DataTable';
import { FiTrendingUp, FiActivity, FiArrowUpRight, FiDownload, FiBarChart2 } from 'react-icons/fi';
import { useColorTokens } from '@/hooks/useColorTokens';
import { formatCurrency } from '@/utils/format';

export default function FleetUtilizationPage() {
  const tokens = useColorTokens();

  const mockUtilizationData = [
    { id: 'V-1001', name: 'Tesla Model 3', utilization: '94%', activeDays: 28, revenue: 4200 },
    { id: 'V-1002', name: 'BMW i7', utilization: '42%', activeDays: 12, revenue: 5400 },
    { id: 'V-1003', name: 'Range Rover', utilization: '78%', activeDays: 22, revenue: 6600 },
    { id: 'V-1004', name: 'Porsche Taycan', utilization: '15%', activeDays: 4, revenue: 2000 },
    { id: 'V-1005', name: 'Mercedes EQS', utilization: '88%', activeDays: 26, revenue: 12400 },
  ];

  const columns = [
    { header: 'Vehicle', accessor: 'name' },
    { 
      header: 'Utilization Rate', 
      accessor: (row: any) => (
        <HStack spacing={4} w="200px">
          <Progress value={parseInt(row.utilization)} colorScheme="brand" size="xs" borderRadius="full" flex={1} />
          <Text fontWeight="600" fontSize="13px">{row.utilization}</Text>
        </HStack>
      )
    },
    { header: 'Active Days (30d)', accessor: 'activeDays' },
    { header: 'Revenue Generated', accessor: (row: any) => formatCurrency(row.revenue) },
  ];

  return (
    <Box>
      <PageHeader 
        title="Fleet Utilization"
        subtitle="Analyze asset performance and rental efficiency metrics."
        breadcrumbs={[
            { label: 'Business', href: '/business' },
            { label: 'Fleet', href: '/business/fleet' },
            { label: 'Utilization', href: '/business/fleet_utilization' }
        ]}
        actionLabel="Download Stats"
        actionIcon={<FiDownload />}
      />

      <SimpleGrid columns={[1, 2, 4]} spacing={6} mb={10}>
        <StatCard label="Avg. Utilization" value="76.4%" trend={5.2} icon={FiActivity as any} />
        <StatCard label="Idle Assets" value="12" trend={-2.1} icon={FiBarChart2 as any} />
        <StatCard label="Peak Demand" value="Weekends" trend={0} icon={FiTrendingUp as any} />
        <StatCard label="Asset Efficiency" value="High" trend={1.4} icon={FiArrowUpRight as any} />
      </SimpleGrid>

      <Box bg={tokens.cardBg} p={8} borderRadius="24px" boxShadow={tokens.shadow} border="1px solid" borderColor={tokens.border}>
        <Heading fontSize="18px" fontWeight="700" mb={6}>Individual Vehicle Performance</Heading>
        <DataTable columns={columns} data={mockUtilizationData} />
      </Box>
    </Box>
  );
}
