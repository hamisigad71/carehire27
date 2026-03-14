'use client';

import { Box, Flex, Text, Button, Icon, HStack, SimpleGrid, Heading, Avatar } from '@chakra-ui/react';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { DataTable } from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { FiPlus, FiUsers, FiUserCheck, FiUserPlus, FiShoppingBag } from 'react-icons/fi';
import { useColorTokens } from '@/hooks/useColorTokens';
import { formatCurrency, formatNumber } from '@/utils/format';

const stats = [
  { label: 'Total Customers', value: '1,240', trend: 5.2, icon: FiUsers },
  { label: 'Active Renters', value: '382', trend: 8.4, icon: FiUserCheck },
  { label: 'New This Month', value: '45', trend: -2.1, icon: FiUserPlus },
  { label: 'Avg. LTV', value: formatCurrency(2450), trend: 3.2, icon: FiShoppingBag },
];

const customers = [
  { id: 'C-2001', name: 'John Doe', email: 'john@example.com', phone: '+1 555-0101', rentals: 12, spent: 4500, status: 'Active' },
  { id: 'C-2002', name: 'Sarah Smith', email: 'sarah@example.com', phone: '+1 555-0102', rentals: 5, spent: 2200, status: 'Active' },
  { id: 'C-2003', name: 'Mike Johnson', email: 'mike@example.com', phone: '+1 555-0103', rentals: 28, spent: 15400, status: 'VIP' },
  { id: 'C-2004', name: 'Alice Wong', email: 'alice@example.com', phone: '+1 555-0104', rentals: 1, spent: 350, status: 'New' },
  { id: 'C-2005', name: 'David Brown', email: 'david@example.com', phone: '+1 555-0105', rentals: 0, spent: 0, status: 'Inactive' },
];

const columns: any[] = [
  { 
    header: 'Customer', 
    accessor: (row: any) => (
      <HStack spacing={3}>
        <Box boxSize="40px" borderRadius="full" bg="gray.100" display="flex" alignItems="center" justifyContent="center">
           <Icon as={FiUsers} color="gray.400" />
        </Box>
        <Box>
          <Text fontWeight="600">{row.name}</Text>
          <Text fontSize="12px" color="gray.500">{row.email}</Text>
        </Box>
      </HStack>
    ) 
  },
  { header: 'Phone', accessor: 'phone' },
  { header: 'Rentals', accessor: 'rentals', isSortable: true },
  { 
    header: 'Total Spent', 
    accessor: (row: any) => <Text fontWeight="700">{formatCurrency(row.spent)}</Text>,
    isSortable: true
  },
  { 
    header: 'Status', 
    accessor: (row: any) => <StatusBadge status={row.status} /> 
  },
];

export default function CustomersPage() {
  const tokens = useColorTokens();

  return (
    <Box>
      <PageHeader 
        title="Customer CRM"
        subtitle="Manage your customer database and rental history."
        breadcrumbs={[
            { label: 'Business', href: '/business' },
            { label: 'Customers', href: '/business/customers' }
        ]}
        actionLabel="Add Customer"
        actionIcon={<FiPlus />}
        onAction={() => window.location.href = '/business/customers/new'}
      />

      <SimpleGrid columns={[1, 2, 4]} spacing={6} mb={10}>
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </SimpleGrid>

      <Box bg={tokens.cardBg} p={6} borderRadius="24px" boxShadow={tokens.shadow} border="1px solid" borderColor={tokens.border}>
        <Flex justify="space-between" align="center" mb={6}>
            <Box>
              <Heading fontSize="18px" fontWeight="700">Customer List</Heading>
              <Text fontSize="13px" color={tokens.textMuted}>View and search your customer profiles</Text>
            </Box>
            <HStack spacing={2}>
              <Button size="sm" variant="outline" borderColor={tokens.border}>Filter</Button>
              <Button size="sm" variant="outline" borderColor={tokens.border}>Export CSV</Button>
            </HStack>
        </Flex>
        <DataTable columns={columns} data={customers} onRowClick={(c) => window.location.href = `/business/customers/${c.id}`} />
      </Box>
    </Box>
  );
}
