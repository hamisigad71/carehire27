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
  Divider,
  Avatar,
  Progress,
} from "@chakra-ui/react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  FiUsers,
  FiAward,
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiEdit,
  FiShield,
  FiStar,
} from "react-icons/fi";
import { useColorTokens } from "@/hooks/useColorTokens";
import { formatCurrency } from "@/utils/format";
import { useParams } from "next/navigation";

export default function DriverProfilePage() {
  const { id } = useParams();
  const tokens = useColorTokens();

  const driver = {
    id: id || "D-3001",
    name: "Robert Fox",
    email: "robert.fox@elite.com",
    phone: "+1 555-0202",
    license: "TX-99221 (Class A)",
    joined: "Feb 15, 2024",
    totalEarnings: 82500,
    totalTripCount: 450,
    rating: 4.85,
    status: "On Duty",
  };

  return (
    <Box>
      <PageHeader
        title={driver.name}
        subtitle={`Driver ID: ${driver.id} • ${driver.status}`}
        breadcrumbs={[
          { label: "Business", href: "/business" },
          { label: "Drivers", href: "/business/drivers" },
          { label: driver.name, href: `/business/drivers/${driver.id}` },
        ]}
        actionLabel="Edit Profile"
        actionIcon={<FiEdit />}
      />

      <SimpleGrid columns={[1, 2, 4]} spacing={6} mb={10}>
        <StatCard
          label="Total Earnings"
          value={formatCurrency(driver.totalEarnings)}
          trend={8.2}
          icon={FiDollarSign as any}
        />
        <StatCard
          label="Life-time Trips"
          value={driver.totalTripCount}
          trend={12}
          icon={FiCalendar as any}
        />
        <StatCard
          label="Avg. Rating"
          value={driver.rating}
          trend={0.1}
          icon={FiStar as any}
        />
        <StatCard
          label="Success Rate"
          value="99.2%"
          trend={0}
          icon={FiShield as any}
        />
      </SimpleGrid>

      <Grid templateColumns={["1fr", "1fr", "1fr 340px"]} gap={10}>
        <Box
          bg={tokens.cardBg}
          p={8}
          borderRadius="24px"
          boxShadow={tokens.shadow}
          border="1px solid"
          borderColor={tokens.border}
        >
          <Heading fontSize="18px" fontWeight="700" mb={8}>
            Driver Credentials
          </Heading>
          <SimpleGrid columns={[1, 2]} spacing={8}>
            <Box>
              <Text
                fontSize="11px"
                fontWeight="700"
                color={tokens.textMuted}
                textTransform="uppercase"
                letterSpacing="widest"
                mb={1}
              >
                Business Email
              </Text>
              <Text fontWeight="600">{driver.email}</Text>
            </Box>
            <Box>
              <Text
                fontSize="11px"
                fontWeight="700"
                color={tokens.textMuted}
                textTransform="uppercase"
                letterSpacing="widest"
                mb={1}
              >
                Phone Number
              </Text>
              <Text fontWeight="600">{driver.phone}</Text>
            </Box>
            <Box>
              <Text
                fontSize="11px"
                fontWeight="700"
                color={tokens.textMuted}
                textTransform="uppercase"
                letterSpacing="widest"
                mb={1}
              >
                License Information
              </Text>
              <Text fontWeight="600">{driver.license}</Text>
            </Box>
            <Box>
              <Text
                fontSize="11px"
                fontWeight="700"
                color={tokens.textMuted}
                textTransform="uppercase"
                letterSpacing="widest"
                mb={1}
              >
                Member Since
              </Text>
              <Text fontWeight="600">{driver.joined}</Text>
            </Box>
          </SimpleGrid>

          <Divider my={10} opacity={0.1} />

          <Heading fontSize="18px" fontWeight="700" mb={6}>
            Performance Metrics
          </Heading>
          <SimpleGrid columns={[1, 3]} spacing={6}>
            {[
              { label: "On-Time Rate", value: "98%", color: "brand" },
              { label: "Cust. Approval", value: "96%", color: "blue" },
              { label: "Safety Score", value: "100%", color: "emerald" },
            ].map((metric) => (
              <Box
                key={metric.label}
                p={6}
                borderRadius="16px"
                bg={tokens.cardBg2}
                textAlign="center"
              >
                <Text
                  fontSize="10px"
                  fontWeight="700"
                  color={tokens.textMuted}
                  textTransform="uppercase"
                  mb={2}
                >
                  {metric.label}
                </Text>
                <Text fontSize="24px" fontWeight="800" color={tokens.accent}>
                  {metric.value}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        <VStack spacing={6} align="stretch">
          <Box
            bg={tokens.cardBg}
            p={6}
            borderRadius="24px"
            boxShadow={tokens.shadow}
            border="1px solid"
            borderColor={tokens.border}
            textAlign="center"
          >
            <Avatar size="xl" name={driver.name} mb={4} src="" />
            <Heading fontSize="20px" fontWeight="700">
              {driver.name}
            </Heading>
            <Text fontSize="13px" color={tokens.textMuted} mb={4}>
              Primary Fleet Operator
            </Text>
            <StatusBadge status={driver.status} />
          </Box>

          <Box
            bg={tokens.cardBg}
            p={6}
            borderRadius="24px"
            boxShadow={tokens.shadow}
            border="1px solid"
            borderColor={tokens.border}
          >
            <Heading fontSize="16px" fontWeight="700" mb={4}>
              Upcoming Schedule
            </Heading>
            <VStack spacing={4} align="stretch">
              <Box
                p={4}
                borderRadius="12px"
                bg={tokens.cardBg2}
                borderLeft="4px solid"
                borderLeftColor={tokens.accent}
              >
                <Text fontSize="13px" fontWeight="700">
                  BK-1008 • Tesla Model 3
                </Text>
                <Text fontSize="11px" color={tokens.textMuted}>
                  Today, 02:00 PM - 06:00 PM
                </Text>
              </Box>
              <Box p={4} borderRadius="12px" bg={tokens.cardBg2}>
                <Text fontSize="13px" fontWeight="700">
                  BK-1012 • Land Rover
                </Text>
                <Text fontSize="11px" color={tokens.textMuted}>
                  Tomorrow, 09:00 AM
                </Text>
              </Box>
            </VStack>
            <Button
              w="full"
              mt={6}
              bg={tokens.accent}
              color="white"
              size="sm"
              _hover={{ opacity: 0.9 }}
            >
              Assign Trip
            </Button>
          </Box>
        </VStack>
      </Grid>
    </Box>
  );
}
