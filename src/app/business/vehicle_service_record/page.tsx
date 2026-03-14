'use client';

import { Box, Flex, Text, Button, Icon, HStack, SimpleGrid, Heading, VStack, Progress } from '@chakra-ui/react';
import { PageHeader } from '@/components/ui/PageHeader';
import { DataTable } from '@/components/ui/DataTable';
import { FiSettings, FiTool, FiCalendar, FiClock, FiFileText } from 'react-icons/fi';
import { useColorTokens } from '@/hooks/useColorTokens';
import { formatCurrency } from '@/utils/format';

const serviceRecords = [
  { id: 'SR-4001', vehicle: 'Tesla Model 3', service: 'Full Diagnostics', cost: 120, date: 'Mar 10, 2026', technician: 'Mark Smith', status: 'Completed' },
  { id: 'SR-4002', vehicle: 'BMW i7', service: 'Tire Rotation', cost: 80, date: 'Mar 08, 2026', technician: 'Lisa Wong', status: 'Completed' },
  { id: 'SR-4003', vehicle: 'Range Rover', service: 'Brake Inspection', cost: 45, date: 'Mar 05, 2026', technician: 'Mark Smith', status: 'Completed' },
  { id: 'SR-4004', vehicle: 'Tesla Model 3', service: 'Interior Detailing', cost: 150, date: 'Feb 28, 2026', technician: 'CleanPro Ltd', status: 'Completed' },
];

const columns = [
  { header: 'Record ID', accessor: 'id', isSortable: true },
  { header: 'Vehicle', accessor: 'vehicle', isSortable: true },
  { header: 'Service Performed', accessor: 'service' },
  { 
    header: 'Cost', 
    accessor: (row: any) => <Text fontWeight="700">{formatCurrency(row.cost)}</Text> 
  },
  { header: 'Date', accessor: 'date' },
  { header: 'Technician', accessor: 'technician' },
];

export default function VehicleServiceRecordPage() {
  const tokens = useColorTokens();

  return (
    <Box>
      <PageHeader 
        title="Vehicle Service History"
        subtitle="Comprehensive log of all maintenance and repair activities."
        breadcrumbs={[
            { label: 'Business', href: '/business' },
            { label: 'Fleet', href: '/business/fleet' },
            { label: 'Service Records', href: '/business/vehicle_service_record' }
        ]}
        actionLabel="Export Records"
        actionIcon={<FiFileText />}
      />

      <SimpleGrid columns={[1, 2, 4]} spacing={6} mb={10}>
         <Box bg={tokens.cardBg} p={6} borderRadius="24px" border="1px solid" borderColor={tokens.border}>
            <Text fontSize="12px" fontWeight="700" color={tokens.textMuted} textTransform="uppercase" mb={2}>Service Count (30d)</Text>
            <Heading fontSize="28px" fontWeight="800">24</Heading>
         </Box>
         <Box bg={tokens.cardBg} p={6} borderRadius="24px" border="1px solid" borderColor={tokens.border}>
            <Text fontSize="12px" fontWeight="700" color={tokens.textMuted} textTransform="uppercase" mb={2}>Total Maintenance Spend</Text>
            <Heading fontSize="28px" fontWeight="800" color={tokens.accent}>{formatCurrency(4200)}</Heading>
         </Box>
         <Box bg={tokens.cardBg} p={6} borderRadius="24px" border="1px solid" borderColor={tokens.border}>
            <Text fontSize="12px" fontWeight="700" color={tokens.textMuted} textTransform="uppercase" mb={2}>Scheduled Next 7d</Text>
            <Heading fontSize="28px" fontWeight="800" color={tokens.warning}>5</Heading>
         </Box>
         <Box bg={tokens.cardBg} p={6} borderRadius="24px" border="1px solid" borderColor={tokens.border}>
            <Text fontSize="12px" fontWeight="700" color={tokens.textMuted} textTransform="uppercase" mb={2}>Fleet Health</Text>
            <Heading fontSize="28px" fontWeight="800" color="emerald.500">96.5%</Heading>
         </Box>
      </SimpleGrid>

      <Box bg={tokens.cardBg} p={8} borderRadius="24px" boxShadow={tokens.shadow} border="1px solid" borderColor={tokens.border}>
         <Flex justify="space-between" align="center" mb={8}>
            <Box>
               <Heading fontSize="18px" fontWeight="700">Detailed Service Ledger</Heading>
               <Text fontSize="13px" color={tokens.textMuted}>Filter by vehicle or technician for specific logs</Text>
            </Box>
            <HStack spacing={2}>
               <Button size="sm" variant="outline" borderColor={tokens.border}>Filter</Button>
            </HStack>
         </Flex>
         <DataTable columns={columns} data={serviceRecords} />
      </Box>
    </Box>
  );
}
