"use client";

import {
  Box,
  Flex,
  VStack,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Heading,
  Text,
  useToast,
  Icon,
  Progress,
  HStack,
} from "@chakra-ui/react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FiPlus, FiCalendar, FiUser, FiShield, FiSave } from "react-icons/fi";
import { useColorTokens } from "@/hooks/useColorTokens";
import { FaCar } from "react-icons/fa";

export default function CreateBookingPage() {
  const tokens = useColorTokens();
  const toast = useToast();

  return (
    <Box maxW="1000px">
      <PageHeader
        title="Create New Booking"
        subtitle="Manually register a vehicle rental for a customer."
        breadcrumbs={[
          { label: "Business", href: "/business" },
          { label: "Bookings", href: "/business/bookings" },
          { label: "Create", href: "/business/create_booking" },
        ]}
      />

      <Box
        bg={tokens.cardBg}
        p={8}
        borderRadius="24px"
        boxShadow={tokens.shadow}
        border="1px solid"
        borderColor={tokens.border}
      >
        <VStack spacing={10} align="stretch">
          <Box>
            <Heading fontSize="18px" fontWeight="700" mb={6}>
              Booking Core Details
            </Heading>
            <SimpleGrid columns={[1, 2]} spacing={6}>
              <FormControl isRequired>
                <FormLabel
                  fontSize="12px"
                  fontWeight="700"
                  color={tokens.textMuted}
                  textTransform="uppercase"
                >
                  Customer
                </FormLabel>
                <Select
                  placeholder="Select Existing or 'Walk-in'"
                  _focus={{ borderColor: tokens.accent }}
                >
                  <option>John Doe (VIP)</option>
                  <option>Sarah Smith</option>
                  <option>+ New Walk-in</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel
                  fontSize="12px"
                  fontWeight="700"
                  color={tokens.textMuted}
                  textTransform="uppercase"
                >
                  Select Vehicle
                </FormLabel>
                <Select
                  placeholder="Select Available Vehicle"
                  _focus={{ borderColor: tokens.accent }}
                >
                  <option>Tesla Model 3 (Available)</option>
                  <option>Mercedes EQS (Available)</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel
                  fontSize="12px"
                  fontWeight="700"
                  color={tokens.textMuted}
                  textTransform="uppercase"
                >
                  Pickup Date
                </FormLabel>
                <Input type="date" _focus={{ borderColor: tokens.accent }} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel
                  fontSize="12px"
                  fontWeight="700"
                  color={tokens.textMuted}
                  textTransform="uppercase"
                >
                  Drop-off Date
                </FormLabel>
                <Input type="date" _focus={{ borderColor: tokens.accent }} />
              </FormControl>
            </SimpleGrid>
          </Box>

          <Box>
            <Heading fontSize="18px" fontWeight="700" mb={6}>
              Optional Services
            </Heading>
            <SimpleGrid columns={[1, 1, 3]} spacing={6}>
              <Box
                p={4}
                borderRadius="16px"
                bg={tokens.cardBg2}
                border="1px solid"
                borderColor={tokens.border}
              >
                <HStack mb={2}>
                  <Icon as={FiShield} color={tokens.accent} />
                  <Text fontWeight="600" fontSize="14px">
                    Full Insurance
                  </Text>
                </HStack>
                <Text fontSize="12px" color={tokens.textMuted} mb={4}>
                  $25.00 / day protection.
                </Text>
                <Button
                  size="xs"
                  variant="outline"
                  colorScheme="brand"
                  borderRadius="full"
                >
                  Include
                </Button>
              </Box>
              <Box
                p={4}
                borderRadius="16px"
                bg={tokens.cardBg2}
                border="1px solid"
                borderColor={tokens.border}
              >
                <HStack mb={2}>
                  <Icon as={FiUser} color={tokens.accent} />
                  <Text fontWeight="600" fontSize="14px">
                    Private Driver
                  </Text>
                </HStack>
                <Text fontSize="12px" color={tokens.textMuted} mb={4}>
                  Professional chauffeur service.
                </Text>
                <Button
                  size="xs"
                  variant="outline"
                  colorScheme="brand"
                  borderRadius="full"
                >
                  Include
                </Button>
              </Box>
              <Box
                p={4}
                borderRadius="16px"
                bg={tokens.cardBg2}
                border="1px solid"
                borderColor={tokens.border}
              >
                <HStack mb={2}>
                  <Icon as={FaCar} color={tokens.accent} />
                  <Text fontWeight="600" fontSize="14px">
                    Home Delivery
                  </Text>
                </HStack>
                <Text fontSize="12px" color={tokens.textMuted} mb={4}>
                  Vehicle delivered to door.
                </Text>
                <Button
                  size="xs"
                  variant="outline"
                  colorScheme="brand"
                  borderRadius="full"
                >
                  Include
                </Button>
              </Box>
            </SimpleGrid>
          </Box>

          <Flex
            justify="flex-end"
            pt={6}
            borderTop="1px solid"
            borderColor={tokens.border}
          >
            <Button
              bg={tokens.accent}
              color="white"
              leftIcon={<FiSave />}
              px={12}
              h="55px"
              borderRadius="14px"
            >
              Generate Booking
            </Button>
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
}
