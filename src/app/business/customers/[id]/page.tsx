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
  Avatar,
  Progress,
  Divider,
} from "@chakra-ui/react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiEdit,
} from "react-icons/fi";
import { useColorTokens } from "@/hooks/useColorTokens";
import { formatCurrency, formatDate } from "@/utils/format";
import { useParams } from "next/navigation";

export default function CustomerProfilePage() {
  const { id } = useParams();
  const tokens = useColorTokens();

  const customer = {
    id: id || "C-2001",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 555-0101",
    address: "123 Luxury Ln, Beverly Hills, CA",
    joined: "Jan 12, 2024",
    totalSpent: 12500,
    totalRentals: 15,
    status: "Active",
    tier: "VIP Gold",
  };

  return (
    <Box>
      <PageHeader
        title={customer.name}
        subtitle={`Customer ID: ${customer.id} • ${customer.tier}`}
        breadcrumbs={[
          { label: "Business", href: "/business" },
          { label: "Customers", href: "/business/customers" },
          { label: customer.name, href: `/business/customers/${customer.id}` },
        ]}
        actionLabel="Edit Profile"
        actionIcon={<FiEdit />}
      />

      <SimpleGrid columns={[1, 2, 4]} spacing={6} mb={10}>
        <StatCard
          label="Total Spent"
          value={formatCurrency(customer.totalSpent)}
          trend={12}
          icon={FiDollarSign as any}
        />
        <StatCard
          label="Total Rentals"
          value={customer.totalRentals}
          trend={5}
          icon={FiCalendar as any}
        />
        <StatCard
          label="Loyalty Tier"
          value={customer.tier}
          trend={0}
          icon={FiAward as any}
        />
        <StatCard
          label="Account Age"
          value="2.1 Years"
          trend={0}
          icon={FiClock as any}
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
            Personal Information
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
                Email Address
              </Text>
              <HStack>
                <Icon as={FiMail} color={tokens.accent} />
                <Text fontWeight="600">{customer.email}</Text>
              </HStack>
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
              <HStack>
                <Icon as={FiPhone} color={tokens.accent} />
                <Text fontWeight="600">{customer.phone}</Text>
              </HStack>
            </Box>
            <GridItem colSpan={2}>
              <Text
                fontSize="11px"
                fontWeight="700"
                color={tokens.textMuted}
                textTransform="uppercase"
                letterSpacing="widest"
                mb={1}
              >
                Residential Address
              </Text>
              <HStack>
                <Icon as={FiMapPin} color={tokens.accent} />
                <Text fontWeight="600">{customer.address}</Text>
              </HStack>
            </GridItem>
          </SimpleGrid>

          <Divider my={10} opacity={0.1} />

          <Heading fontSize="18px" fontWeight="700" mb={6}>
            Recent Rental History
          </Heading>
          <VStack spacing={4} align="stretch">
            {[
              {
                vehicle: "Tesla Model 3",
                date: "Mar 01 - Mar 05",
                status: "Completed",
                cost: 750,
              },
              {
                vehicle: "Range Rover Sport",
                date: "Feb 12 - Feb 15",
                status: "Completed",
                cost: 1200,
              },
            ].map((item, idx) => (
              <Flex
                key={idx}
                p={4}
                borderRadius="16px"
                bg={tokens.cardBg2}
                align="center"
                justify="space-between"
              >
                <Box>
                  <Text fontWeight="700" fontSize="14px">
                    {item.vehicle}
                  </Text>
                  <Text fontSize="12px" color={tokens.textMuted}>
                    {item.date}
                  </Text>
                </Box>
                <HStack spacing={4}>
                  <StatusBadge status={item.status} />
                  <Text fontWeight="700">{formatCurrency(item.cost)}</Text>
                </HStack>
              </Flex>
            ))}
          </VStack>
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
            <Avatar size="xl" name={customer.name} mb={4} />
            <Heading fontSize="20px" fontWeight="700">
              {customer.name}
            </Heading>
            <Text fontSize="13px" color={tokens.textMuted} mb={4}>
              Member since {customer.joined}
            </Text>
            <StatusBadge status={customer.status} />
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
              Account Status
            </Heading>
            <VStack spacing={4} align="stretch">
              <Box>
                <Flex justify="space-between" mb={2}>
                  <Text fontSize="12px" fontWeight="600">
                    Verification Level
                  </Text>
                  <Text fontSize="12px" color={tokens.success}>
                    Verified
                  </Text>
                </Flex>
                <Progress
                  value={100}
                  colorScheme="brand"
                  size="xs"
                  borderRadius="full"
                />
              </Box>
              <Box>
                <Flex justify="space-between" mb={2}>
                  <Text fontSize="12px" fontWeight="600">
                    License Validity
                  </Text>
                  <Text fontSize="12px" color={tokens.warning}>
                    Exp 3m
                  </Text>
                </Flex>
                <Progress
                  value={75}
                  colorScheme="yellow"
                  size="xs"
                  borderRadius="full"
                />
              </Box>
            </VStack>
            <Button
              w="full"
              mt={6}
              variant="outline"
              size="sm"
              borderColor={tokens.border}
            >
              View Documents
            </Button>
          </Box>
        </VStack>
      </Grid>
    </Box>
  );
}

import { FiAward } from "react-icons/fi";
