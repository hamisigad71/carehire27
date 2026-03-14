"use client";

import {
  Box,
  Flex,
  Text,
  Heading,
  Icon,
  VStack,
  Button,
  HStack,
  SimpleGrid,
  Switch,
  Grid,
  GridItem,
  Badge,
} from "@chakra-ui/react";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  FiLock,
  FiShield,
  FiCheck,
  FiX,
  FiActivity,
  FiUsers,
  FiDollarSign,
} from "react-icons/fi";
import { useColorTokens } from "@/hooks/useColorTokens";

const modulePermissions = [
  {
    module: "Fleet & Inventory",
    perms: [
      "Create Vehicles",
      "Archive Fleet",
      "Bulk Edit Pricing",
      "Export VIN Data",
    ],
  },
  {
    module: "Financial Controls",
    perms: [
      "Issue Refunds",
      "Override Pricing",
      "Delete Invoices",
      "View P&L Reports",
    ],
  },
  {
    module: "Staff Management",
    perms: [
      "Hire Admins",
      "Edit Permissions",
      "Audit System Logs",
      "Deactivate Accounts",
    ],
  },
];

export default function EditStaffPermissionsPage() {
  const tokens = useColorTokens();

  return (
    <Box>
      <PageHeader
        title="Admin Security Controls"
        subtitle="Manage sensitive platform permissions and security overrides."
        breadcrumbs={[
          { label: "Business", href: "/business" },
          { label: "Staff Recovery", href: "/business/staff_accounts" },
          { label: "Permissions", href: "/business/edit_staff_permissions" },
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
          <Heading fontSize="18px" fontWeight="700" mb={8}>
            Granular Permission Overrides
          </Heading>

          <VStack spacing={10} align="stretch">
            {modulePermissions.map((group) => (
              <Box key={group.module}>
                <Text
                  fontSize="11px"
                  fontWeight="700"
                  color={tokens.accent}
                  textTransform="uppercase"
                  letterSpacing="widest"
                  mb={6}
                >
                  {group.module}
                </Text>
                <VStack spacing={4} align="stretch">
                  {group.perms.map((perm) => (
                    <Flex
                      key={perm}
                      p={4}
                      borderRadius="16px"
                      bg={tokens.cardBg2}
                      align="center"
                      justify="space-between"
                    >
                      <HStack spacing={4}>
                        <Icon as={FiShield} boxSize={4} color="gray.400" />
                        <Text fontSize="14px" fontWeight="600">
                          {perm}
                        </Text>
                      </HStack>
                      <Switch colorScheme="brand" size="md" />
                    </Flex>
                  ))}
                </VStack>
              </Box>
            ))}
          </VStack>

          <Flex
            justify="flex-end"
            mt={10}
            pt={6}
            borderTop="1px solid"
            borderColor={tokens.border}
          >
            <HStack spacing={4}>
              <Button variant="ghost">Cancel</Button>
              <Button
                bg={tokens.accent}
                color="white"
                px={10}
                borderRadius="12px"
                _hover={{ opacity: 0.9 }}
              >
                Deploy Overrides
              </Button>
            </HStack>
          </Flex>
        </GridItem>

        <Box>
          <Box
            bg={tokens.cardBg}
            p={8}
            borderRadius="24px"
            boxShadow={tokens.shadow}
            border="1px solid"
            borderColor={tokens.border}
            mb={8}
          >
            <Heading fontSize="16px" fontWeight="700" mb={6}>
              Security Status
            </Heading>
            <VStack spacing={6} align="stretch">
              <Box>
                <Text
                  fontSize="11px"
                  fontWeight="700"
                  color={tokens.textMuted}
                  textTransform="uppercase"
                  mb={2}
                >
                  Master Lock
                </Text>
                <Flex align="center" justify="space-between">
                  <Text fontSize="13px" fontWeight="600">
                    Restricted Mode
                  </Text>
                  <Badge colorScheme="emerald" borderRadius="full">
                    LOCKED
                  </Badge>
                </Flex>
              </Box>
              <Box>
                <Text
                  fontSize="11px"
                  fontWeight="700"
                  color={tokens.textMuted}
                  textTransform="uppercase"
                  mb={2}
                >
                  Audit Trail
                </Text>
                <Text fontSize="13px" fontWeight="600" mb={4}>
                  Last change by Admin (2h ago)
                </Text>
                <Button
                  size="xs"
                  variant="outline"
                  borderColor={tokens.border}
                  w="full"
                >
                  View History
                </Button>
              </Box>
            </VStack>
          </Box>

          <Box
            bg={tokens.cardBg}
            p={8}
            borderRadius="24px"
            boxShadow={tokens.shadow}
            border="1px solid"
            borderColor={tokens.border}
            borderTop="4px solid"
            borderTopColor={tokens.danger}
          >
            <Icon as={FiLock} color={tokens.danger} boxSize={8} mb={4} />
            <Heading fontSize="18px" fontWeight="700" mb={2}>
              Privileged Access
            </Heading>
            <Text fontSize="14px" color={tokens.textMuted}>
              Modifying these settings impacts core financial and operational
              data security.
            </Text>
          </Box>
        </Box>
      </SimpleGrid>
    </Box>
  );
}
