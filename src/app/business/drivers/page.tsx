'use client';

import { Box, Flex, Text, Button, Icon, HStack, SimpleGrid, Heading, Avatar } from '@chakra-ui/react';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { DataTable } from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { FiPlus, FiUsers, FiAward, FiCheckCircle, FiClock } from 'react-icons/fi';
import { useColorTokens } from '@/hooks/useColorTokens';
import { formatCurrency } from '@/utils/format';

const stats = [
  { label: 'Total Drivers', value: '45', trend: 2.1, icon: FiUsers },
  { label: 'On Duty', value: '28', trend: 5.4, icon: FiCheckCircle },
  { label: 'Offline', value: '12', trend: -1.2, icon: FiClock },
  { label: 'Top Rated', value: '15', trend: 8.5, icon: FiAward },
];

const drivers = [
  { id: 'D-3001', name: 'Robert Fox', license: 'TX-99221', rating: 4.8, status: 'Active', earnings: 4500 },
  { id: 'D-3002', name: 'Jane Cooper', license: 'CA-88123', rating: 4.9, status: 'Active', earnings: 5200 },
  { id: 'D-3003', name: 'Cody Fisher', license: 'NY-77341', rating: 4.5, status: 'Offline', earnings: 3800 },
  { id: 'D-3004', name: 'Esther Howard', license: 'FL-66122', rating: 4.7, status: 'Active', earnings: 4100 },
  { id: 'D-3005', name: 'Jenny Wilson', license: 'WA-55111', rating: 4.2, status: 'Maintenance', earnings: 2900 },
];

const columns: any[] = [
  { 
    header: 'Driver', 
    accessor: (row: any) => (
      <HStack spacing={3}>
        <Box boxSize="40px" borderRadius="full" bg="gray.100" display="flex" alignItems="center" justifyContent="center">
           <Icon as={FiUsers} color="gray.400" />
        </Box>
        <Box>
          <Text fontWeight="600">{row.name}</Text>
          <Text fontSize="12px" color="gray.500">ID: {row.id}</Text>
        </Box>
      </HStack>
    ) 
  },
  { header: 'License Number', accessor: 'license' },
  { 
    header: 'Rating', 
    accessor: (row: any) => (
        <HStack spacing={1}>
            <Icon as={FiAward} color="yellow.400" />
            <Text fontWeight="600">{row.rating}</Text>
        </HStack>
    ),
    isSortable: true 
  },
  { 
    header: 'Total Earnings', 
    accessor: (row: any) => <Text fontWeight="700">{formatCurrency(row.earnings)}</Text>,
    isSortable: true
  },
  { 
    header: 'Status', 
    accessor: (row: any) => <StatusBadge status={row.status} /> 
  },
];

export default function DriversPage() {
  const tokens = useColorTokens();

  return (
    <Box>
      <PageHeader 
        title="Driver Management"
        subtitle="Manage fleet drivers and monitor performance."
        breadcrumbs={[
            { label: 'Business', href: '/business' },
            { label: 'Drivers', href: '/business/drivers' }
        ]}
        actionLabel="Hire Driver"
        actionIcon={<FiPlus />}
        onAction={() => window.location.href = '/business/drivers/new'}
      />

      <SimpleGrid columns={[1, 2, 4]} spacing={6} mb={10}>
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </SimpleGrid>

      <Box bg={tokens.cardBg} p={6} borderRadius="24px" boxShadow={tokens.shadow} border="1px solid" borderColor={tokens.border}>
        <Flex justify="space-between" align="center" mb={6}>
            <Box>
              <Heading fontSize="18px" fontWeight="700">All Drivers</Heading>
              <Text fontSize="13px" color={tokens.textMuted}>Comprehensive database of verified drivers</Text>
            </Box>
            <HStack spacing={2}>
              <Button size="sm" variant="outline" borderColor={tokens.border}>Filter</Button>
              <Button size="sm" variant="outline" borderColor={tokens.border}>Export CSV</Button>
            </HStack>
        </Flex>
        <DataTable columns={columns} data={drivers} onRowClick={(d) => window.location.href = `/business/drivers/${d.id}`} />
      </Box>
    </Box>
  );
}
