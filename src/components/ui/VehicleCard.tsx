"use client";

import {
  Box,
  Flex,
  Text,
  Icon,
  Image,
  Badge,
  Button,
  VStack,
  HStack,
  Circle,
  Grid,
} from "@chakra-ui/react";
import {
  FiMapPin,
  FiInfo,
  FiUsers,
  FiZap,
  FiArrowRight,
  FiStar,
  FiShield,
  FiCheck,
} from "react-icons/fi";
import { useColorTokens } from "@/hooks/useColorTokens";
import { formatCurrency } from "@/utils/format";
import { StatusBadge } from "./StatusBadge";
import { useRouter } from "next/navigation";

// ─── INLINE STYLES ────────────────────────────────────────────────────────────
// Drop this once in your global CSS / layout if preferred
const cardStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');

  .v-card {
    transition: transform 0.32s cubic-bezier(.25,.46,.45,.94),
                box-shadow 0.32s ease,
                border-color 0.25s ease;
  }
  .v-card:hover { transform: translateY(-8px); }
  .v-card:hover .v-card-img { transform: scale(1.07); }
  .v-card-img  { transition: transform 0.5s ease; }

  .v-btn-primary {
    transition: all 0.22s cubic-bezier(.25,.46,.45,.94) !important;
    position: relative;
    overflow: hidden;
  }
  .v-btn-primary::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transform: translateX(-100%);
    transition: transform 0.5s ease;
  }
  .v-btn-primary:hover::after { transform: translateX(100%); }
  .v-btn-primary:hover { transform: translateY(-2px) !important; box-shadow: 0 12px 32px rgba(45,125,45,0.2) !important; }
  .v-btn-primary:active { transform: translateY(0) !important; }

  .v-chip { transition: background 0.2s ease; }
  .v-chip:hover { background: rgba(45,125,45,0.12) !important; }
`;

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface VehicleCardProps {
  id: string;
  name: string;
  type: string;
  license: string;
  price: number;
  status: string;
  image?: string;
  year?: number;
  seats?: number;
  transmission?: string;
  mileage?: string;
  condition?: string;
  fuelType?: string;
  rating?: number;
  reviewCount?: number;
  isCustomer?: boolean;
  driverAvailable?: boolean;
  branch?: string;
}

// ─── SPEC CHIP ────────────────────────────────────────────────────────────────
function SpecChip({ icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <HStack
      className="v-chip"
      spacing={1.5}
      bg="rgba(45,125,45,0.08)"
      border="1px solid"
      borderColor="rgba(45,125,45,0.25)"
      borderRadius="full"
      px={3}
      py={1.5}
    >
      <Icon as={icon} boxSize="11px" color="green.600" />
      <Text
        fontSize="10px"
        fontWeight="700"
        color="gray.700"
        letterSpacing="0.04em"
      >
        {label}
      </Text>
    </HStack>
  );
}

// ─── STAT BLOCK ───────────────────────────────────────────────────────────────
function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <Box
      bg="linear-gradient(135deg, rgba(245,245,245,0.6) 0%, rgba(250,250,250,0.8) 100%)"
      border="1px solid"
      borderColor="rgba(200,200,200,0.4)"
      borderRadius="14px"
      px={3}
      py={2.5}
      flex={1}
    >
      <Text
        fontSize="9px"
        fontWeight="700"
        color="gray.500"
        textTransform="uppercase"
        letterSpacing="0.1em"
        mb={0.5}
      >
        {label}
      </Text>
      <Text fontSize="13px" fontWeight="700" color="gray.900">
        {value}
      </Text>
    </Box>
  );
}

// ─── MAIN CARD ────────────────────────────────────────────────────────────────
export const VehicleCard = ({
  id,
  name,
  type,
  license,
  price,
  status,
  image,
  year = 2023,
  seats = 5,
  transmission = "Auto",
  mileage = "12K km",
  condition = "Excellent",
  fuelType = "Petrol",
  rating = 4.9,
  reviewCount = 48,
  isCustomer = false,
  driverAvailable = false,
  branch = "Nairobi CBD",
}: VehicleCardProps) => {
  const tokens = useColorTokens();
  const router = useRouter();

  const defaultImage =
    "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&h=500&fit=crop";

  const isAvailable = status?.toLowerCase() === "available";

  return (
    <>
      <style>{cardStyles}</style>

      <Box
        className="v-card"
        bg="white"
        border="1px solid"
        borderColor="rgba(200,200,200,0.4)"
        borderRadius="28px"
        overflow="hidden"
        position="relative"
        role="group"
        _hover={{
          borderColor: "rgba(74,158,74,0.6)",
        }}
      >
        {/* ── TOP ACCENT LINE ── */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          h="2px"
          zIndex={5}
          bg={
            isAvailable
              ? "linear-gradient(90deg, transparent, #4a9e4a, #72b872, #4a9e4a, transparent)"
              : "linear-gradient(90deg, transparent, #888, transparent)"
          }
        />

        {/* ── IMAGE ZONE ── */}
        <Box
          position="relative"
          h={{ base: "180px", md: "200px" }}
          overflow="hidden"
        >
          {/* Type badge */}
          <Box position="absolute" top={3} left={3} zIndex={3}>
            <Box
              bg="rgba(255,255,255,0.95)"
              backdropFilter="blur(12px)"
              border="1px solid"
              borderColor="rgba(74,158,74,0.3)"
              borderRadius="full"
              px={3}
              py={1}
            >
              <Text
                fontSize="9px"
                fontWeight="800"
                color="green.600"
                letterSpacing="0.12em"
                textTransform="uppercase"
              >
                {type}
              </Text>
            </Box>
          </Box>

          {/* Status top-right */}
          <Box position="absolute" top={3} right={3} zIndex={3}>
            <StatusBadge status={status} />
          </Box>

          {/* Car image */}
          <Image
            className="v-card-img"
            src={image || defaultImage}
            alt={name}
            w="100%"
            h="100%"
            objectFit="cover"
            objectPosition="center 55%"
          />

          {/* Bottom gradient */}
          <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            h="55%"
            display="none"
          />

          {/* Car shadow */}
          <Box
            position="absolute"
            bottom="6px"
            left="15%"
            right="15%"
            h="20px"
            bg="rgba(0,0,0,0.12)"
            borderRadius="full"
            filter="blur(12px)"
            zIndex={0}
          />

          {/* Bottom overlay info */}
          <HStack
            position="absolute"
            bottom={3}
            left={4}
            right={4}
            justify="space-between"
            zIndex={2}
          >
            <HStack spacing={1.5}>
              <Icon as={FiMapPin} color="white" boxSize="11px" />
              <Text fontSize="11px" fontWeight="600" color="white">
                {branch}
              </Text>
            </HStack>
            {/* Rating */}
            <HStack
              spacing={1}
              bg="rgba(255,255,255,0.95)"
              backdropFilter="blur(8px)"
              borderRadius="full"
              px={2.5}
              py={1}
              border="1px solid rgba(200,200,200,0.3)"
            >
              <Icon as={FiStar} color="yellow.500" boxSize="10px" />
              <Text fontSize="11px" fontWeight="700" color="gray.900">
                {rating}
              </Text>
              <Text fontSize="10px" color="gray.600">
                ({reviewCount})
              </Text>
            </HStack>
          </HStack>
        </Box>

        {/* ── BODY ── */}
        <VStack
          px={{ base: 3.5, md: 5 }}
          pt={{ base: 2.5, md: 4 }}
          pb={{ base: 3, md: 5 }}
          align="stretch"
          spacing={{ base: 2, md: 4 }}
        >
          {/* Title row */}
          <Box>
            <Flex justify="space-between" align="flex-start" mb={1}>
              <Text
                fontSize={{ base: "15px", md: "17px" }}
                fontWeight="800"
                color="gray.900"
                letterSpacing="-0.02em"
                noOfLines={1}
                flex={1}
                mr={2}
                fontFamily="'Syne', sans-serif"
              >
                {name}
              </Text>
              <Box
                bg="rgba(74,158,74,0.08)"
                border="1px solid"
                borderColor="rgba(74,158,74,0.25)"
                borderRadius="8px"
                px={2}
                py={0.5}
              >
                <Text
                  fontSize="10px"
                  fontWeight="700"
                  color="green.700"
                  letterSpacing="0.06em"
                >
                  {license}
                </Text>
              </Box>
            </Flex>
            <HStack spacing={1.5} flexWrap="wrap">
              <Text fontSize="11px" color="gray.600" fontWeight="500">
                {year}
              </Text>
              <Text fontSize="11px" color="gray.400">
                ·
              </Text>
              <Text fontSize="11px" color="gray.600">
                {seats} Seats
              </Text>
              <Text fontSize="11px" color="gray.400">
                ·
              </Text>
              <Text fontSize="11px" color="gray.600">
                {transmission}
              </Text>
              <Text fontSize="11px" color="gray.400">
                ·
              </Text>
              <Text fontSize="11px" color="gray.600">
                {fuelType}
              </Text>
            </HStack>
          </Box>

          {/* Spec chips */}
          <HStack spacing={2} flexWrap="wrap">
            <SpecChip icon={FiZap} label={mileage} />
            <SpecChip icon={FiShield} label={condition} />
            {driverAvailable && (
              <SpecChip icon={FiUsers} label="Driver Avail." />
            )}
          </HStack>

          {/* Stat blocks - Compressed on mobile */}
          <Grid templateColumns={{ base: "1fr 1fr", md: "1fr 1fr 1fr" }} gap={2}>
            <StatBlock label="Year" value={String(year)} />
            <StatBlock label="Seats" value={`${seats}`} />
            <Box display={{ base: "none", md: "block" }}>
              <StatBlock label="Gearbox" value={transmission} />
            </Box>
          </Grid>

          {/* Divider */}
          <Box h="1px" bg="rgba(200,200,200,0.3)" />

          {/* Price + driver badge */}
          <Flex align="flex-end" justify="space-between">
            <Box>
              <Text
                fontSize={{ base: "22px", md: "26px" }}
                fontWeight="800"
                color="green.600"
                letterSpacing="-0.03em"
                lineHeight="1"
                fontFamily="'Syne', sans-serif"
              >
                {formatCurrency(price)}
              </Text>
              <Text fontSize="11px" color="gray.600" fontWeight="500" mt={0.5}>
                per day · incl. insurance
              </Text>
            </Box>

            {isCustomer && driverAvailable && (
              <HStack
                spacing={1.5}
                bg="rgba(74,158,74,0.1)"
                border="1px solid"
                borderColor="rgba(74,158,74,0.3)"
                borderRadius="full"
                px={3}
                py={1.5}
              >
                <Icon as={FiCheck} color="green.600" boxSize="11px" />
                <Text fontSize="10px" fontWeight="700" color="green.600">
                  Driver Ready
                </Text>
              </HStack>
            )}
          </Flex>

          {/* CTA Buttons */}
          <HStack spacing={2.5} pt={0.5}>
            <Button
              flex={1}
              h={{ base: "42px", md: "46px" }}
              variant="ghost"
              color="gray.700"
              borderRadius="14px"
              fontSize="12px"
              fontWeight="700"
              border="1px solid"
              borderColor="rgba(200,200,200,0.5)"
              leftIcon={<Icon as={FiInfo} boxSize={3.5} />}
              onClick={() =>
                router.push(
                  isCustomer
                    ? `/customer/fleet/${id}`
                    : `/business/fleet/${id}`,
                )
              }
              _hover={{
                bg: "rgba(74,158,74,0.06)",
                borderColor: "rgba(74,158,74,0.4)",
                color: "gray.900",
              }}
              transition="all 0.2s ease"
            >
              Details
            </Button>

            <Button
              className="v-btn-primary"
              flex={2}
              h={{ base: "42px", md: "46px" }}
              bg="linear-gradient(135deg, #2d7d2d, #4a9e4a)"
              color="white"
              borderRadius="14px"
              fontSize="13px"
              fontWeight="700"
              rightIcon={<Icon as={FiArrowRight} boxSize={3.5} />}
              onClick={() =>
                router.push(
                  isCustomer
                    ? `/customer/checkout?type=rent&vehicleId=${id}`
                    : `/business/fleet/${id}`,
                )
              }
              isDisabled={!isAvailable}
              _hover={{ opacity: 1 }}
              _disabled={{ opacity: 0.4, cursor: "not-allowed" }}
            >
              {isCustomer ? "Rent Now" : "Manage"}
            </Button>
          </HStack>
        </VStack>
      </Box>
    </>
  );
};
