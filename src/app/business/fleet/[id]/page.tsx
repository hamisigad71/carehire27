"use client";

import {
  Box,
  Flex,
  SimpleGrid,
  Text,
  Heading,
  Icon,
  VStack,
  Badge,
  Button,
  HStack,
  Grid,
  GridItem,
  Image,
} from "@chakra-ui/react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  FiTruck,
  FiSettings,
  FiCalendar,
  FiMapPin,
  FiInfo,
  FiActivity,
  FiArrowRight,
  FiEdit,
  FiTrash2,
  FiDollarSign,
} from "react-icons/fi";
import { useColorTokens } from "@/hooks/useColorTokens";
import { formatCurrency, formatDate } from "@/utils/format";
import { useParams } from "next/navigation";

export default function VehicleDetailsPage() {
  const { id } = useParams();
  const tokens = useColorTokens();

  // Mock data for demonstration
  const vehicle = {
    id: id || "V-1001",
    name: "Tesla Model 3",
    type: "Electric",
    license: "ABC-1234",
    status: "Available",
    price: 150,
    year: 2024,
    color: "Midnight Silver",
    transmission: "Automatic",
    mileage: "4,200 mi",
    fuel: "100% (Full)",
    nextService: "Apr 15, 2026",
  };

  return (
    <Box>
      <PageHeader
        title={vehicle.name}
        subtitle={`ID: ${vehicle.id} • ${vehicle.license}`}
        breadcrumbs={[
          { label: "Business", href: "/business" },
          { label: "Fleet", href: "/business/fleet" },
          { label: vehicle.name, href: `/business/fleet/${vehicle.id}` },
        ]}
        actionLabel="Edit Vehicle"
        actionIcon={<FiEdit />}
      />

      <SimpleGrid columns={[1, 2, 4]} spacing={6} mb={10}>
        <StatCard
          label="Daily Rate"
          value={formatCurrency(vehicle.price)}
          trend={0}
          icon={FiDollarSign as any}
        />
        <StatCard
          label="Current Status"
          value={vehicle.status}
          trend={0}
          icon={FiActivity as any}
        />
        <StatCard
          label="Mileage"
          value={vehicle.mileage}
          trend={1.2}
          icon={FiMapPin as any}
        />
        <StatCard
          label="Next Service"
          value="35 Days"
          trend={0}
          icon={FiSettings as any}
        />
      </SimpleGrid>

      <Grid templateColumns={["1fr", "1fr", "repeat(3, 1fr)"]} spacing={10}>
        <GridItem colSpan={[1, 1, 2]}>
          <Box
            bg={tokens.cardBg}
            p={8}
            borderRadius="24px"
            boxShadow={tokens.shadow}
            border="1px solid"
            borderColor={tokens.border}
          >
            <Heading fontSize="18px" fontWeight="700" mb={6}>
              Technical Specifications
            </Heading>
            <SimpleGrid columns={[1, 2]} spacing={6}>
              <Box>
                <Text
                  fontSize="11px"
                  fontWeight="600"
                  color={tokens.textSubtle}
                  textTransform="uppercase"
                  letterSpacing="widest"
                  mb={1}
                >
                  Model Year
                </Text>
                <Text fontSize="15px" fontWeight="600">
                  {vehicle.year}
                </Text>
              </Box>
              <Box>
                <Text
                  fontSize="11px"
                  fontWeight="600"
                  color={tokens.textSubtle}
                  textTransform="uppercase"
                  letterSpacing="widest"
                  mb={1}
                >
                  Exterior Color
                </Text>
                <Text fontSize="15px" fontWeight="600">
                  {vehicle.color}
                </Text>
              </Box>
              <Box>
                <Text
                  fontSize="11px"
                  fontWeight="600"
                  color={tokens.textSubtle}
                  textTransform="uppercase"
                  letterSpacing="widest"
                  mb={1}
                >
                  Transmission
                </Text>
                <Text fontSize="15px" fontWeight="600">
                  {vehicle.transmission}
                </Text>
              </Box>
              <Box>
                <Text
                  fontSize="11px"
                  fontWeight="600"
                  color={tokens.textSubtle}
                  textTransform="uppercase"
                  letterSpacing="widest"
                  mb={1}
                >
                  Fuel / Battery
                </Text>
                <Text fontSize="15px" fontWeight="600">
                  {vehicle.fuel}
                </Text>
              </Box>
              <Box>
                <Text
                  fontSize="11px"
                  fontWeight="600"
                  color={tokens.textSubtle}
                  textTransform="uppercase"
                  letterSpacing="widest"
                  mb={1}
                >
                  Next Scheduled Service
                </Text>
                <Text fontSize="15px" fontWeight="600" color={tokens.warning}>
                  {vehicle.nextService}
                </Text>
              </Box>
            </SimpleGrid>

            {/* Divider Replacement */}
            <Box my={8} h="1px" bg={tokens.border} opacity={0.3} />

            <Heading fontSize="18px" fontWeight="700" mb={4}>
              Maintenance Logs
            </Heading>
            <VStack spacing={4} align="stretch">
              {[1, 2].map((i) => (
                <Flex
                  key={i}
                  p={4}
                  borderRadius="12px"
                  bg={tokens.cardBg2}
                  align="center"
                  justify="space-between"
                >
                  <HStack spacing={4}>
                    <Box
                      boxSize="40px"
                      bg={tokens.accentGlow}
                      borderRadius="full"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon as={FiSettings} color={tokens.accent} />
                    </Box>
                    <Box>
                      <Text fontSize="14px" fontWeight="600">
                        Standard Oil & Filter Change
                      </Text>
                      <Text fontSize="12px" color={tokens.textMuted}>
                        Mar 02, 2026 • Certified Tech
                      </Text>
                    </Box>
                  </HStack>
                  <Text fontWeight="700" color={tokens.textPrimary}>
                    $124.00
                  </Text>
                </Flex>
              ))}
            </VStack>
          </Box>
        </GridItem>

        <GridItem>
          <VStack spacing={6} align="stretch">
            <Box
              bg={tokens.cardBg}
              p={6}
              borderRadius="24px"
              boxShadow={tokens.shadow}
              border="1px solid"
              borderColor={tokens.border}
            >
              <Heading fontSize="18px" fontWeight="700" mb={4}>
                Quick Actions
              </Heading>
              <VStack spacing={3} align="stretch">
                <Button
                  variant="outline"
                  borderColor={tokens.border}
                  h="50px"
                  borderRadius="12px"
                  leftIcon={<FiCalendar />}
                >
                  <Text>View Schedule</Text>
                </Button>
                <Button
                  variant="outline"
                  borderColor={tokens.border}
                  h="50px"
                  borderRadius="12px"
                  leftIcon={<FiSettings />}
                >
                  <Text>Log Maintenance</Text>
                </Button>
                <Button
                  variant="ghost"
                  color={tokens.danger}
                  _hover={{ bg: "red.50" }}
                  h="50px"
                  borderRadius="12px"
                  leftIcon={<FiTrash2 />}
                >
                  <Text>Delete Vehicle</Text>
                </Button>
              </VStack>
            </Box>

            <Box
              bg={tokens.accent}
              p={6}
              borderRadius="24px"
              boxShadow={tokens.shadow}
              color="white"
              position="relative"
              overflow="hidden"
            >
              <Box
                position="absolute"
                top="-20px"
                right="-20px"
                boxSize="100px"
                bg="whiteAlpha.200"
                borderRadius="full"
              />
              <Icon as={FiTruck} boxSize={8} mb={4} />
              <Text fontSize="16px" fontWeight="700" mb={1}>
                Available for Rent
              </Text>
              <Text fontSize="12px" opacity={0.8} mb={6}>
                This vehicle is currently in top condition and ready for
                customer bookings.
              </Text>
              <Button
                bg="white"
                color={tokens.accent}
                w="full"
                borderRadius="12px"
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                }}
              >
                Assign to Customer
              </Button>
            </Box>
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
}

