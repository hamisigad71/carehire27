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
  List,
  ListItem,
  ListIcon,
  Divider,
} from "@chakra-ui/react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { FiCalendar, FiClock, FiDollarSign, FiEdit, FiCheckCircle, FiMapPin, FiUser, FiInfo, FiFileText } from "react-icons/fi";
import { useColorTokens } from "@/hooks/useColorTokens";
import { formatCurrency, formatDate } from "@/utils/format";
import { useParams } from "next/navigation";

export default function BookingDetailsPage() {
  const { id } = useParams();
  const tokens = useColorTokens();

  const booking = {
    id: (Array.isArray(id) ? id[0] : id) || "BK-1001",
    customer: "John Doe",
    vehicle: "Tesla Model 3",
    license: "ABC-1234",
    start: "Mar 10, 2026",
    end: "Mar 15, 2026",
    status: "Active",
    total: 750,
    deposit: 200,
    insurance: "Elite Full Protection",
    pickup: "Beverly Hills Hub",
    dropoff: "LAX Terminal 4",
  };

  return (
    <Box>
      <PageHeader
        title={booking.id}
        subtitle={`${booking.customer} • ${booking.vehicle}`}
        breadcrumbs={[
          { label: "Business", href: "/business" },
          { label: "Bookings", href: "/business/bookings" },
          { label: booking.id, href: `/business/bookings/${booking.id}` },
        ]}
        actionLabel="Modify Reservation"
        actionIcon={<FiEdit />}
      />

      <SimpleGrid columns={[1, 2, 4]} spacing={6} mb={10}>
        <StatCard
          label="Booking Total"
          value={formatCurrency(booking.total)}
          trend={0}
          icon={FiDollarSign as any}
        />
        <StatCard
          label="Rental Duration"
          value="5 Days"
          trend={0}
          icon={FiClock as any}
        />
        <StatCard
          label="Security Deposit"
          value={formatCurrency(booking.deposit)}
          trend={0}
          icon={FiShield as any}
        />
        <StatCard
          label="Payment Status"
          value="Settled"
          trend={0}
          icon={FiCheckCircle as any}
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
            Reservation Details
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
                Start Date
              </Text>
              <HStack>
                <Icon as={FiCalendar} color={tokens.accent} />
                <Text fontWeight="600">{booking.start}</Text>
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
                End Date
              </Text>
              <HStack>
                <Icon as={FiCalendar} color={tokens.accent} />
                <Text fontWeight="600">{booking.end}</Text>
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
                Pickup Location
              </Text>
              <HStack>
                <Icon as={FiMapPin} color={tokens.accent} />
                <Text fontWeight="600">{booking.pickup}</Text>
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
                Drop-off Location
              </Text>
              <HStack>
                <Icon as={FiMapPin} color={tokens.accent} />
                <Text fontWeight="600">{booking.dropoff}</Text>
              </HStack>
            </Box>
          </SimpleGrid>

          <Divider my={10} opacity={0.1} />

          <Heading fontSize="18px" fontWeight="700" mb={6}>
            Costs & Charges
          </Heading>
          <VStack spacing={4} align="stretch">
            <Flex justify="space-between" fontSize="14px">
              <Text color={tokens.textMuted}>
                Standard Daily Rate ($150 x 5 Days)
              </Text>
              <Text fontWeight="600">$750.00</Text>
            </Flex>
            <Flex justify="space-between" fontSize="14px">
              <Text color={tokens.textMuted}>
                Elite Full Protection Insurance
              </Text>
              <Text fontWeight="600">$0.00 (Incl.)</Text>
            </Flex>
            <Flex justify="space-between" fontSize="14px">
              <Text color={tokens.textMuted}>Service Fees & Taxes</Text>
              <Text fontWeight="600">$0.00 (Incl.)</Text>
            </Flex>
            <Divider opacity={0.1} my={2} />
            <Flex justify="space-between" fontSize="18px" fontWeight="800">
              <Text>Total Amount Paid</Text>
              <Text color={tokens.accent}>$750.00</Text>
            </Flex>
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
          >
            <Heading fontSize="18px" fontWeight="700" mb={4}>
              Entity Information
            </Heading>
            <VStack spacing={6} align="stretch">
              <Flex align="center">
                <Avatar size="sm" name={booking.customer} mr={3} />
                <Box>
                  <Text
                    fontSize="11px"
                    fontWeight="700"
                    color={tokens.textMuted}
                    textTransform="uppercase"
                  >
                    Customer
                  </Text>
                  <Text fontSize="14px" fontWeight="700" color={tokens.accent}>
                    {booking.customer}
                  </Text>
                </Box>
              </Flex>
              <Flex align="center">
                <Box
                  boxSize="32px"
                  bg={tokens.accentGlow}
                  borderRadius="8px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mr={3}
                >
                  <Icon as={FaCar} color={tokens.accent} />
                </Box>
                <Box>
                  <Text
                    fontSize="11px"
                    fontWeight="700"
                    color={tokens.textMuted}
                    textTransform="uppercase"
                  >
                    Vehicle
                  </Text>
                  <Text fontSize="14px" fontWeight="700">
                    {booking.vehicle}
                  </Text>
                </Box>
              </Flex>
              <Box>
                <Text
                  fontSize="11px"
                  fontWeight="700"
                  color={tokens.textMuted}
                  textTransform="uppercase"
                  mb={2}
                >
                  Insurance Plan
                </Text>
                <Badge
                  bg="emerald.50"
                  color="emerald.500"
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="10px"
                >
                  {booking.insurance}
                </Badge>
              </Box>
            </VStack>
          </Box>

          <Box
            bg={tokens.cardBg}
            p={6}
            borderRadius="24px"
            boxShadow={tokens.shadow}
            border="1px solid"
            borderColor={tokens.border}
          >
            <Heading fontSize="18px" fontWeight="700" mb={4}>
              Documentation
            </Heading>
            <VStack spacing={3} align="stretch">
              <Button
                leftIcon={<FiFileText />}
                variant="ghost"
                size="sm"
                justifyContent="flex-start"
                color={tokens.textMuted}
              >
                Rental Contract.pdf
              </Button>
              <Button
                leftIcon={<FiFileText />}
                variant="ghost"
                size="sm"
                justifyContent="flex-start"
                color={tokens.textMuted}
              >
                Inspection Report.pdf
              </Button>
              <Button
                leftIcon={<FiFileText />}
                variant="ghost"
                size="sm"
                justifyContent="flex-start"
                color={tokens.textMuted}
              >
                Payment Receipt.pdf
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Grid>
    </Box>
  );
}

import { FiShield } from "react-icons/fi";
import { FaCar } from "react-icons/fa";
