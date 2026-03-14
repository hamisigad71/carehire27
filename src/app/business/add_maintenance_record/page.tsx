'use client';

import { 
  Box, Flex, VStack, SimpleGrid, FormControl, 
  FormLabel, Input, Select, Button, Heading, 
  Textarea, useToast, Icon 
} from '@chakra-ui/react';
import { PageHeader } from '@/components/ui/PageHeader';
import { FiSave, FiTool, FiCalendar, FiDollarSign } from 'react-icons/fi';
import { useColorTokens } from '@/hooks/useColorTokens';

export default function AddMaintenanceRecordPage() {
  const tokens = useColorTokens();
  const toast = useToast();

  const handleSave = () => {
    toast({ title: 'Record Logged', status: 'success', duration: 2000 });
  };

  return (
    <Box maxW="1000px">
      <PageHeader 
        title="Log Maintenance Record"
        subtitle="Document new service, repair, or inspection details."
        breadcrumbs={[
            { label: 'Business', href: '/business' },
            { label: 'Fleet', href: '/business/fleet' },
            { label: 'Add Maintenance', href: '/business/add_maintenance_record' }
        ]}
      />

      <Box bg={tokens.cardBg} p={8} borderRadius="24px" boxShadow={tokens.shadow} border="1px solid" borderColor={tokens.border}>
         <VStack spacing={8} align="stretch">
            <Box>
               <Heading fontSize="18px" fontWeight="700" mb={6}>Service Information</Heading>
               <SimpleGrid columns={[1, 2]} spacing={6}>
                  <FormControl isRequired>
                     <FormLabel fontSize="12px" fontWeight="700" color={tokens.textMuted} textTransform="uppercase">Select Vehicle</FormLabel>
                     <Select placeholder="Vehicle (License Plate)" _focus={{ borderColor: tokens.accent }}>
                        <option>Tesla Model 3 (ABC-1234)</option>
                        <option>BMW i7 (LUX-777)</option>
                     </Select>
                  </FormControl>
                  <FormControl isRequired>
                     <FormLabel fontSize="12px" fontWeight="700" color={tokens.textMuted} textTransform="uppercase">Service Type</FormLabel>
                     <Select placeholder="Category" _focus={{ borderColor: tokens.accent }}>
                        <option>Scheduled Maintenance</option>
                        <option>Emergency Repair</option>
                        <option>Inspection / Safety Check</option>
                        <option>Body Work / Detailing</option>
                     </Select>
                  </FormControl>
                  <FormControl isRequired>
                     <FormLabel fontSize="12px" fontWeight="700" color={tokens.textMuted} textTransform="uppercase">Service Date</FormLabel>
                     <Input type="date" _focus={{ borderColor: tokens.accent }} />
                  </FormControl>
                  <FormControl>
                     <FormLabel fontSize="12px" fontWeight="700" color={tokens.textMuted} textTransform="uppercase">Cost (USD)</FormLabel>
                     <Input type="number" placeholder="0.00" _focus={{ borderColor: tokens.accent }} />
                  </FormControl>
               </SimpleGrid>
            </Box>

            <FormControl>
               <FormLabel fontSize="12px" fontWeight="700" color={tokens.textMuted} textTransform="uppercase">Technician / Shop Details</FormLabel>
               <Input placeholder="Shop name or technician ID" _focus={{ borderColor: tokens.accent }} />
            </FormControl>

            <FormControl>
               <FormLabel fontSize="12px" fontWeight="700" color={tokens.textMuted} textTransform="uppercase">Work Summary</FormLabel>
               <Textarea placeholder="Describe the parts replaced or work performed..." rows={5} _focus={{ borderColor: tokens.accent }} />
            </FormControl>

            <Flex justify="flex-end" pt={4} borderTop="1px solid" borderColor={tokens.border}>
               <Button bg={tokens.accent} color="white" leftIcon={<FiTool />} px={10} h="50px" borderRadius="12px" onClick={handleSave}>
                  Save Maintenance Log
               </Button>
            </Flex>
         </VStack>
      </Box>
    </Box>
  );
}
