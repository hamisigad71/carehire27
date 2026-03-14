'use client';

import { 
  Box, Flex, VStack, SimpleGrid, FormControl, 
  FormLabel, Input, Select, Button, Text, Heading, 
  Textarea, Icon, HStack, useToast
} from '@chakra-ui/react';
import { PageHeader } from '@/components/ui/PageHeader';
import { FiSave, FiX, FiCheckCircle, FiCalendar } from 'react-icons/fi';
import { useColorTokens } from '@/hooks/useColorTokens';

export default function AddVehiclePage() {
  const tokens = useColorTokens();
  const toast = useToast();

  const handleSave = () => {
    toast({
      title: 'Vehicle Added',
      description: "Successfully added new vehicle to the fleet inventory.",
      status: 'success',
      duration: 2000,
    });
  };

  return (
    <Box maxW="1000px" mx="auto">
      <PageHeader 
        title="Add New Vehicle"
        subtitle="Register a new vehicle into the fleet management system."
        breadcrumbs={[
            { label: 'Business', href: '/business' },
            { label: 'Fleet', href: '/business/fleet' },
            { label: 'Add Vehicle', href: '/business/fleet/add' }
        ]}
      />

      <Box 
        bg={tokens.cardBg} p={8} borderRadius="24px" 
        boxShadow={tokens.shadow} border="1px solid" borderColor={tokens.border}
      >
        <VStack spacing={8} align="stretch">
          <Box>
            <Heading fontSize="18px" fontWeight="700" mb={4}>Vehicle Information</Heading>
            <SimpleGrid columns={[1, 2]} spacing={6}>
              <FormControl isRequired>
                <FormLabel fontSize="12px" fontWeight="600" color={tokens.textMuted} textTransform="uppercase">Vehicle Model</FormLabel>
                <Input placeholder="e.g. Tesla Model 3" _focus={{ borderColor: tokens.accent, boxShadow: tokens.accentGlow }} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize="12px" fontWeight="600" color={tokens.textMuted} textTransform="uppercase">License Plate</FormLabel>
                <Input placeholder="e.g. ABC-1234" _focus={{ borderColor: tokens.accent, boxShadow: tokens.accentGlow }} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize="12px" fontWeight="600" color={tokens.textMuted} textTransform="uppercase">Vehicle Type</FormLabel>
                <Select placeholder="Select type" _focus={{ borderColor: tokens.accent, boxShadow: tokens.accentGlow }}>
                  <option>Electric</option>
                  <option>Luxury Sedan</option>
                  <option>SUV</option>
                  <option>Sports Car</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize="12px" fontWeight="600" color={tokens.textMuted} textTransform="uppercase">Daily Rate (USD)</FormLabel>
                <Input type="number" placeholder="0.00" _focus={{ borderColor: tokens.accent, boxShadow: tokens.accentGlow }} />
              </FormControl>
            </SimpleGrid>
          </Box>

          <Box>
            <Heading fontSize="18px" fontWeight="700" mb={4}>Technical Details</Heading>
            <SimpleGrid columns={[1, 2, 3]} spacing={6}>
              <FormControl>
                <FormLabel fontSize="12px" fontWeight="600" color={tokens.textMuted} textTransform="uppercase">Year</FormLabel>
                <Input type="number" placeholder="2024" _focus={{ borderColor: tokens.accent, boxShadow: tokens.accentGlow }} />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="12px" fontWeight="600" color={tokens.textMuted} textTransform="uppercase">Color</FormLabel>
                <Input placeholder="e.g. Midnight Silver" _focus={{ borderColor: tokens.accent, boxShadow: tokens.accentGlow }} />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="12px" fontWeight="600" color={tokens.textMuted} textTransform="uppercase">Transmission</FormLabel>
                <Select placeholder="Select" _focus={{ borderColor: tokens.accent, boxShadow: tokens.accentGlow }}>
                  <option>Automatic</option>
                  <option>Manual</option>
                </Select>
              </FormControl>
            </SimpleGrid>
          </Box>

          <FormControl>
            <FormLabel fontSize="12px" fontWeight="600" color={tokens.textMuted} textTransform="uppercase">Description / Notes</FormLabel>
            <Textarea placeholder="Additional vehicle details..." rows={4} _focus={{ borderColor: tokens.accent, boxShadow: tokens.accentGlow }} />
          </FormControl>

          <Flex justify="flex-end" pt={4} borderTop="1px solid" borderColor={tokens.border}>
            <HStack spacing={4}>
              <Button variant="ghost" color={tokens.textMuted}>
                 <HStack spacing={2}><FiX /> <Text>Cancel</Text></HStack>
              </Button>
              <Button 
                bg={tokens.accent} color="white" px={8}
                onClick={handleSave} _hover={{ opacity: 0.9 }}
                borderRadius="12px" h="48px"
              >
                 <HStack spacing={2}><FiSave /> <Text>Save Vehicle</Text></HStack>
              </Button>
            </HStack>
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
}
