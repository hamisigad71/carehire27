'use client';

import { Box, Flex, Text, Button, Icon, HStack, SimpleGrid, Heading, VStack, Progress } from '@chakra-ui/react';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { FiSettings, FiTool, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { useColorTokens } from '@/hooks/useColorTokens';

export default function MaintenanceDashboardPage() {
  const tokens = useColorTokens();

  const maintenanceStats = [
    { label: 'Vehicles in Shop', value: '8', trend: 2, icon: FiTool },
    { label: 'Scheduled Service', value: '14', trend: 5, icon: FiSettings },
    { label: 'Critical Alerts', value: '2', trend: -1, icon: FiAlertCircle },
    { label: 'Health Score', value: '94/100', trend: 1.2, icon: FiCheckCircle },
  ];

  return (
    <Box>
      <PageHeader 
        title="Maintenance Center"
        subtitle="Monitor fleet health and manage service schedules."
        breadcrumbs={[
            { label: 'Business', href: '/business' },
            { label: 'Maintenance', href: '/business/maintenance_dashboard' }
        ]}
        actionLabel="Log Service"
        actionIcon={<FiPlus />}
      />

      <SimpleGrid columns={[1, 2, 4]} spacing={6} mb={10}>
        {maintenanceStats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </SimpleGrid>

      <SimpleGrid columns={[1, 1, 2]} spacing={8}>
         <Box bg={tokens.cardBg} p={8} borderRadius="24px" boxShadow={tokens.shadow} border="1px solid" borderColor={tokens.border}>
            <Heading fontSize="18px" fontWeight="700" mb={6}>Recent Service Records</Heading>
            <VStack spacing={4} align="stretch">
               {[
                 { vehicle: 'Tesla Model 3', task: 'Brake Pad Replacement', date: 'Mar 08', cost: 450 },
                 { vehicle: 'BMW i7', task: 'Software Update', date: 'Mar 07', cost: 0 },
                 { vehicle: 'Range Rover', task: 'Tire Rotation', date: 'Mar 05', cost: 180 },
               ].map((item, idx) => (
                 <Flex key={idx} p={4} borderRadius="12px" bg={tokens.cardBg2} align="center" justify="space-between">
                    <Box>
                       <Text fontSize="14px" fontWeight="600">{item.vehicle}</Text>
                       <Text fontSize="12px" color={tokens.textMuted}>{item.task} • {item.date}</Text>
                    </Box>
                    <Text fontWeight="700" fontSize="14px">${item.cost}</Text>
                 </Flex>
               ))}
            </VStack>
         </Box>

         <Box bg={tokens.cardBg} p={8} borderRadius="24px" boxShadow={tokens.shadow} border="1px solid" borderColor={tokens.border}>
            <Heading fontSize="18px" fontWeight="700" mb={6}>Fleet Health Overview</Heading>
            <VStack spacing={6} align="stretch">
               <Box>
                  <Flex justify="space-between" mb={2}>
                     <Text fontSize="14px" fontWeight="600">Optimal Condition</Text>
                     <Text fontSize="14px" color={tokens.textMuted}>84%</Text>
                  </Flex>
                  <Progress value={84} colorScheme="brand" size="sm" borderRadius="full" />
               </Box>
               <Box>
                  <Flex justify="space-between" mb={2}>
                     <Text fontSize="14px" fontWeight="600">Minor Service Due</Text>
                     <Text fontSize="14px" color={tokens.textMuted}>12%</Text>
                  </Flex>
                  <Progress value={12} colorScheme="yellow" size="sm" borderRadius="full" />
               </Box>
               <Box>
                  <Flex justify="space-between" mb={2}>
                     <Text fontSize="14px" fontWeight="600">Immediate Attention</Text>
                     <Text fontSize="14px" color={tokens.textMuted}>4%</Text>
                  </Flex>
                  <Progress value={4} colorScheme="red" size="sm" borderRadius="full" />
               </Box>
            </VStack>
         </Box>
      </SimpleGrid>
    </Box>
  );
}

import { FiPlus } from 'react-icons/fi';
