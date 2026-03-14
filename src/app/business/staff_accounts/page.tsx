'use client';

import { Box, Flex, Text, Button, Icon, HStack, SimpleGrid, Heading, Avatar, Switch } from '@chakra-ui/react';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { DataTable } from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { FiPlus, FiUsers, FiShield, FiUserCheck, FiLock } from 'react-icons/fi';
import { useColorTokens } from '@/hooks/useColorTokens';

const stats = [
  { label: 'Total Staff', value: '24', trend: 0, icon: FiUsers },
  { label: 'Active Admins', value: '5', trend: 0, icon: FiShield },
  { label: 'Ops Team', value: '12', trend: 0, icon: FiUserCheck },
  { label: 'Permissions', value: 'Active', trend: 0, icon: FiLock },
];

const staff = [
  { id: 'S-7001', name: 'James Wilson', email: 'james@elite.com', role: 'Super Admin', status: 'Active', lastActive: '2 mins ago' },
  { id: 'S-7002', name: 'Emma Thompson', email: 'emma@elite.com', role: 'Fleet Manager', status: 'Active', lastActive: '1 hour ago' },
  { id: 'S-7003', name: 'Chris Evans', email: 'chris@elite.com', role: 'Customer Support', status: 'Active', lastActive: 'Yesterday' },
  { id: 'S-7004', name: 'Olivia Martinez', email: 'olivia@elite.com', role: 'Finance Officer', status: 'Inactive', lastActive: '3 days ago' },
  { id: 'S-7005', name: 'Liam Hall', email: 'liam@elite.com', role: 'Fleet Manager', status: 'Active', lastActive: '12 mins ago' },
];

const columns = [
  { 
    header: 'Staff Member', 
    accessor: (row: any) => (
      <HStack spacing={3}>
        <Avatar size="sm" name={row.name} />
        <Box>
          <Text fontWeight="600">{row.name}</Text>
          <Text fontSize="12px" color="gray.500">{row.email}</Text>
        </Box>
      </HStack>
    ) 
  },
  { header: 'Access Role', accessor: 'role' },
  { header: 'Last Active', accessor: 'lastActive' },
  { 
    header: 'Account Status', 
    accessor: (row: any) => (
        <HStack spacing={4}>
            <StatusBadge status={row.status} />
            <Switch size="sm" colorScheme="brand" isChecked={row.status === 'Active'} />
        </HStack>
    ) 
  },
];

export default function StaffPage() {
  const tokens = useColorTokens();

  return (
    <Box>
      <PageHeader 
        title="Staff Accounts"
        subtitle="Manage administrative access and team members."
        breadcrumbs={[
            { label: 'Business', href: '/business' },
            { label: 'Staff', href: '/business/staff_accounts' }
        ]}
        actionLabel="Invite Member"
        actionIcon={<FiPlus />}
      />

      <SimpleGrid columns={[1, 2, 4]} spacing={6} mb={10}>
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </SimpleGrid>

      <Box bg={tokens.cardBg} p={6} borderRadius="24px" boxShadow={tokens.shadow} border="1px solid" borderColor={tokens.border}>
        <Flex justify="space-between" align="center" mb={6}>
            <Box>
              <Heading fontSize="18px" fontWeight="700">Team Members</Heading>
              <Text fontSize="13px" color={tokens.textMuted}>Manage roles and platform permissions</Text>
            </Box>
            <HStack spacing={2}>
              <Button size="sm" variant="outline" borderColor={tokens.border}>Audit Log</Button>
              <Button size="sm" variant="outline" borderColor={tokens.border}>Filter</Button>
            </HStack>
        </Flex>
        <DataTable columns={columns} data={staff} onRowClick={(s) => console.log('Staff Details', s)} />
      </Box>
    </Box>
  );
}
