"use client";

import {
  Box,
  Flex,
  Text,
  Button,
  Icon,
  HStack,
  SimpleGrid,
  Heading,
  VStack,
  Badge,
} from "@chakra-ui/react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FiCreditCard, FiZap, FiPackage, FiCheck } from "react-icons/fi";
import { useColorTokens } from "@/hooks/useColorTokens";
import { formatCurrency } from "@/utils/format";

export default function SubscriptionPage() {
  const tokens = useColorTokens();

  return (
    <Box maxW="1000px">
      <PageHeader
        title="Subscription Management"
        subtitle="Manage your platform plan and billing details."
        breadcrumbs={[
          { label: "Business", href: "/business" },
          { label: "Subscription", href: "/business/subscription_management" },
        ]}
      />

      <Box
        bg={tokens.cardBg}
        p={8}
        borderRadius="24px"
        boxShadow={tokens.shadow}
        border="1px solid"
        borderColor={tokens.border}
        mb={10}
      >
        <Flex justify="space-between" align="center">
          <Box>
            <Badge
              bg={tokens.accentGlow}
              color={tokens.accent}
              px={3}
              py={1}
              borderRadius="full"
              mb={2}
              textTransform="uppercase"
              fontSize="10px"
            >
              Current Plan
            </Badge>
            <Heading fontSize="28px" fontWeight="700">
              Enterprise Fleet Pro
            </Heading>
            <Text fontSize="14px" color={tokens.textMuted} mt={1}>
              Billed annually • Next renewal: Jan 15, 2027
            </Text>
          </Box>
          <VStack align="flex-end" spacing={1}>
            <Text fontSize="32px" fontWeight="800" color={tokens.accent}>
              $2,499
              <Text as="span" fontSize="14px" fontWeight="500">
                {" "}
                / year
              </Text>
            </Text>
            <Button variant="outline" size="sm" borderColor={tokens.border}>
              Manage Billing
            </Button>
          </VStack>
        </Flex>
      </Box>

      <SimpleGrid columns={[1, 1, 3]} spacing={8}>
        <Box
          bg={tokens.cardBg}
          p={6}
          borderRadius="20px"
          border="1px solid"
          borderColor={tokens.border}
        >
          <Heading fontSize="16px" fontWeight="700" mb={6}>
            Plan Features
          </Heading>
          <VStack align="stretch" spacing={4}>
            {[
              "Unlimited Vehicles",
              "Full Staff RBAC",
              "Advanced Analytics",
              "Priority Support",
              "API Access",
            ].map((f) => (
              <Flex key={f} align="center">
                <Icon as={FiCheck} color={tokens.accent} mr={3} />
                <Text fontSize="14px" fontWeight="500">
                  {f}
                </Text>
              </Flex>
            ))}
          </VStack>
        </Box>

        <Box
          bg={tokens.cardBg}
          p={6}
          borderRadius="20px"
          border="1px solid"
          borderColor={tokens.border}
        >
          <Heading fontSize="16px" fontWeight="700" mb={6}>
            Usage Limits
          </Heading>
          <VStack align="stretch" spacing={6}>
            <Box>
              <Flex justify="space-between" mb={2}>
                <Text fontSize="13px" fontWeight="600">
                  Vehicles Used
                </Text>
                <Text fontSize="13px" color={tokens.textMuted}>
                  124 / ∞
                </Text>
              </Flex>
              <Progress
                value={30}
                colorScheme="brand"
                size="xs"
                borderRadius="full"
              />
            </Box>
            <Box>
              <Flex justify="space-between" mb={2}>
                <Text fontSize="13px" fontWeight="600">
                  Monthly Bookings
                </Text>
                <Text fontSize="13px" color={tokens.textMuted}>
                  1,240 / 5,000
                </Text>
              </Flex>
              <Progress
                value={25}
                colorScheme="brand"
                size="xs"
                borderRadius="full"
              />
            </Box>
          </VStack>
        </Box>

        <Box
          bg={tokens.cardBg}
          p={6}
          borderRadius="20px"
          border="1px solid"
          borderColor={tokens.border}
        >
          <Heading fontSize="16px" fontWeight="700" mb={6}>
            Payment Method
          </Heading>
          <Flex align="center" mb={6}>
            <Box
              boxSize="40px"
              bg={tokens.cardBg2}
              borderRadius="8px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              mr={3}
            >
              <Icon as={FiCreditCard} color={tokens.accent} />
            </Box>
            <Box>
              <Text fontSize="14px" fontWeight="700">
                Visa •••• 4242
              </Text>
              <Text fontSize="12px" color={tokens.textMuted}>
                Expires 12/28
              </Text>
            </Box>
          </Flex>
          <Button
            w="full"
            variant="outline"
            size="sm"
            borderColor={tokens.border}
          >
            Update Card
          </Button>
        </Box>
      </SimpleGrid>
    </Box>
  );
}
