'use client';

import { Box, Flex, Text, Button, Icon, HStack, SimpleGrid, Heading, VStack, Badge, Grid, GridItem } from '@chakra-ui/react';
import { PageHeader } from '@/components/ui/PageHeader';
import { FiShield, FiCheck, FiX, FiLock, FiSettings, FiUsers, FiActivity } from 'react-icons/fi';
import { useColorTokens } from '@/hooks/useColorTokens';

const roles = [
  { name: 'Super Admin', users: 5, color: 'purple' },
  { name: 'Fleet Manager', users: 8, color: 'blue' },
  { name: 'Finance Admin', users: 3, color: 'emerald' },
  { name: 'Support Rep', users: 12, color: 'orange' },
];

const permissions = [
  { group: 'Fleet Management', items: ['View Fleet', 'Add/Edit Vehicles', 'Manage Maintenance', 'Assign Drivers'] },
  { group: 'Customer CRM', items: ['View Customers', 'Add/Edit Customers', 'Manage Profiles', 'View History'] },
  { group: 'Bookings', items: ['View Reservations', 'Create Bookings', 'Edit Bookings', 'Cancel Rentals'] },
  { group: 'Finance', items: ['View Revenue', 'Manage Invoices', 'Process Refunds', 'Export Data'] },
];

export default function RolesPage() {
  const tokens = useColorTokens();

  return (
    <Box>
      <PageHeader 
        title="Role Management"
        subtitle="Define and assign system-wide access permissions."
        breadcrumbs={[
            { label: 'Business', href: '/business' },
            { label: 'Roles', href: '/business/role_management' }
        ]}
        actionLabel="Create Role"
        actionIcon={<FiShield />}
      />

      <Grid templateColumns={['1fr', '1fr', '320px 1fr']} gap={10}>
         <Box pos="sticky" top="100px" h="fit-content">
            <Heading fontSize="18px" fontWeight="700" mb={6}>Active Roles</Heading>
            <VStack spacing={4} align="stretch">
               {roles.map((role) => (
                 <Box 
                    key={role.name} p={4} borderRadius="16px" bg={tokens.cardBg} 
                    border="1px solid" borderColor={tokens.border} cursor="pointer"
                    transition="all 0.2s" _hover={{ borderColor: tokens.accent, boxShadow: tokens.shadow }}
                 >
                    <Flex justify="space-between" align="center">
                       <VStack align="start" spacing={0}>
                          <Text fontWeight="700" fontSize="14px">{role.name}</Text>
                          <Text fontSize="12px" color={tokens.textMuted}>{role.users} Member{role.users !== 1 ? 's' : ''}</Text>
                       </VStack>
                       <Icon as={FiShield} color={tokens.accent} />
                    </Flex>
                 </Box>
               ))}
            </VStack>
         </Box>

         <Box bg={tokens.cardBg} p={8} borderRadius="24px" boxShadow={tokens.shadow} border="1px solid" borderColor={tokens.border}>
            <Flex justify="space-between" align="center" mb={10}>
               <Box>
                  <Heading fontSize="18px" fontWeight="700">Role Permissions: Super Admin</Heading>
                  <Text fontSize="14px" color={tokens.textMuted}>Full administrative access to all system modules and data.</Text>
               </Box>
               <Button variant="outline" borderColor={tokens.border} size="sm">Edit Base Permissions</Button>
            </Flex>

            <VStack spacing={10} align="stretch">
               {permissions.map((group) => (
                 <Box key={group.group}>
                    <Text fontSize="11px" fontWeight="700" textTransform="uppercase" letterSpacing="widest" color={tokens.accent} mb={4}>
                       {group.group}
                    </Text>
                    <SimpleGrid columns={[1, 2]} spacing={4}>
                       {group.items.map((perm) => (
                         <Flex key={perm} p={4} borderRadius="12px" bg={tokens.cardBg2} align="center" justify="space-between">
                            <Text fontSize="14px" fontWeight="600">{perm}</Text>
                            <Box boxSize="20px" bg={tokens.accent} borderRadius="6px" display="flex" align="center" justify="center">
                               <Icon as={FiCheck} color="white" boxSize={3} />
                            </Box>
                         </Flex>
                       ))}
                    </SimpleGrid>
                 </Box>
               ))}
            </VStack>

            <Flex justify="flex-end" mt={10} pt={6} borderTop="1px solid" borderColor={tokens.border}>
               <HStack spacing={4}>
                  <Button variant="ghost" colorScheme="gray">Discard Changes</Button>
                  <Button bg={tokens.accent} color="white" px={8} _hover={{ opacity: 0.9 }}>Save Permissions</Button>
               </HStack>
            </Flex>
         </Box>
      </Grid>
    </Box>
  );
}
