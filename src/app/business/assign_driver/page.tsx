"use client";

import {
  Box,
  Flex,
  VStack,
  HStack,
  SimpleGrid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Heading,
  Avatar,
  Text,
  useToast,
  Icon,
  Badge,
} from "@chakra-ui/react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FiSave, FiUserCheck, FiTruck, FiMapPin } from "react-icons/fi";
import { useColorTokens } from "@/hooks/useColorTokens";

export default function AssignDriverPage() {
  const tokens = useColorTokens();
  const toast = useToast();

  return (
    <Box maxW="1000px">
      <PageHeader
        title="Assign Driver"
        subtitle="Allocate verified drivers to pending vehicle bookings."
        breadcrumbs={[
          { label: "Business", href: "/business" },
          { label: "Operations", href: "/business/fleet" },
          { label: "Assign Driver", href: "/business/assign_driver" },
        ]}
      />

      <SimpleGrid columns={[1, 1, 3]} spacing={10}>
        <GridItem
          colSpan={[1, 1, 2]}
          bg={tokens.cardBg}
          p={8}
          borderRadius="24px"
          boxShadow={tokens.shadow}
          border="1px solid"
          borderColor={tokens.border}
        >
          <VStack spacing={8} align="stretch">
            <Box>
              <Heading fontSize="18px" fontWeight="700" mb={6}>
                Assignment Details
              </Heading>
              <SimpleGrid columns={[1, 2]} spacing={6}>
                <FormControl isRequired>
                  <FormLabel
                    fontSize="12px"
                    fontWeight="700"
                    color={tokens.textMuted}
                    textTransform="uppercase"
                  >
                    Select Booking
                  </FormLabel>
                  <Select
                    placeholder="Select Booking ID"
                    _focus={{ borderColor: tokens.accent }}
                  >
                    <option>BK-1008 (Tesla Model 3)</option>
                    <option>BK-1012 (BMW i7)</option>
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel
                    fontSize="12px"
                    fontWeight="700"
                    color={tokens.textMuted}
                    textTransform="uppercase"
                  >
                    Select Driver
                  </FormLabel>
                  <Select
                    placeholder="Available Drivers"
                    _focus={{ borderColor: tokens.accent }}
                  >
                    <option>Robert Fox (Verified)</option>
                    <option>Jane Cooper (Verified)</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel
                    fontSize="12px"
                    fontWeight="700"
                    color={tokens.textMuted}
                    textTransform="uppercase"
                  >
                    Start Location
                  </FormLabel>
                  <Input
                    placeholder="Pickup Point"
                    _focus={{ borderColor: tokens.accent }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel
                    fontSize="12px"
                    fontWeight="700"
                    color={tokens.textMuted}
                    textTransform="uppercase"
                  >
                    Reporting Time
                  </FormLabel>
                  <Input type="time" _focus={{ borderColor: tokens.accent }} />
                </FormControl>
              </SimpleGrid>
            </Box>

            <Flex
              justify="flex-end"
              pt={4}
              borderTop="1px solid"
              borderColor={tokens.border}
            >
              <Button
                bg={tokens.accent}
                color="white"
                leftIcon={<FiUserCheck />}
                px={10}
                _hover={{ opacity: 0.9 }}
              >
                Confirm Assignment
              </Button>
            </Flex>
          </VStack>
        </GridItem>

        <Box
          bg={tokens.cardBg}
          p={6}
          borderRadius="24px"
          boxShadow={tokens.shadow}
          border="1px solid"
          borderColor={tokens.border}
        >
          <Heading fontSize="16px" fontWeight="700" mb={6}>
            Live Driver Status
          </Heading>
          <VStack spacing={6} align="stretch">
            {[
              { name: "Robert Fox", status: "Available", color: "emerald" },
              { name: "Jane Cooper", status: "On Trip", color: "blue" },
              { name: "Cody Fisher", status: "Available", color: "emerald" },
            ].map((d) => (
              <Flex key={d.name} align="center" justify="space-between">
                <HStack spacing={3}>
                  <Avatar size="xs" name={d.name} />
                  <Text fontSize="14px" fontWeight="600">
                    {d.name}
                  </Text>
                </HStack>
                <Badge
                  colorScheme={d.color}
                  variant="subtle"
                  fontSize="10px"
                  px={2}
                  borderRadius="full"
                >
                  {d.status}
                </Badge>
              </Flex>
            ))}
          </VStack>
        </Box>
      </SimpleGrid>
    </Box>
  );
}
