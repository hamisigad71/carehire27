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
  Switch,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  FiSettings,
  FiBell,
  FiShield,
  FiGlobe,
  FiDatabase,
  FiMail,
} from "react-icons/fi";
import { useColorTokens } from "@/hooks/useColorTokens";

export default function SettingsPage() {
  const tokens = useColorTokens();

  return (
    <Box maxW="1000px">
      <PageHeader
        title="Platform Settings"
        subtitle="Configure your business rules and platform preferences."
        breadcrumbs={[
          { label: "Business", href: "/business" },
          { label: "Settings", href: "/business/settings" },
        ]}
      />

      <VStack spacing={8} align="stretch">
        <Box
          bg={tokens.cardBg}
          p={8}
          borderRadius="24px"
          boxShadow={tokens.shadow}
          border="1px solid"
          borderColor={tokens.border}
        >
          <Heading fontSize="18px" fontWeight="700" mb={6}>
            General Configurations
          </Heading>
          <SimpleGrid columns={[1, 2]} spacing={6}>
            <FormControl>
              <FormLabel
                fontSize="12px"
                fontWeight="600"
                color={tokens.textMuted}
                textTransform="uppercase"
              >
                Platform Name
              </FormLabel>
              <Input
                defaultValue="Elite Car Hire"
                _focus={{
                  borderColor: tokens.accent,
                  boxShadow: tokens.accentGlow,
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel
                fontSize="12px"
                fontWeight="600"
                color={tokens.textMuted}
                textTransform="uppercase"
              >
                Support Email
              </FormLabel>
              <Input
                defaultValue="support@elite.com"
                _focus={{
                  borderColor: tokens.accent,
                  boxShadow: tokens.accentGlow,
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel
                fontSize="12px"
                fontWeight="600"
                color={tokens.textMuted}
                textTransform="uppercase"
              >
                Default Currency
              </FormLabel>
              <Select
                defaultValue="USD"
                _focus={{
                  borderColor: tokens.accent,
                  boxShadow: tokens.accentGlow,
                }}
              >
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel
                fontSize="12px"
                fontWeight="600"
                color={tokens.textMuted}
                textTransform="uppercase"
              >
                Timezone
              </FormLabel>
              <Select
                defaultValue="UTC"
                _focus={{
                  borderColor: tokens.accent,
                  boxShadow: tokens.accentGlow,
                }}
              >
                <option>Pacific Time (PT)</option>
                <option>Eastern Time (ET)</option>
                <option>UTC / GMT</option>
              </Select>
            </FormControl>
          </SimpleGrid>
        </Box>

        <Box
          bg={tokens.cardBg}
          p={8}
          borderRadius="24px"
          boxShadow={tokens.shadow}
          border="1px solid"
          borderColor={tokens.border}
        >
          <Heading fontSize="18px" fontWeight="700" mb={6}>
            Notification Preferences
          </Heading>
          <VStack spacing={4} align="stretch">
            {[
              {
                label: "New Booking Email",
                desc: "Notify admins when a new customer makes a reservation.",
              },
              {
                label: "Maintenance Alerts",
                desc: "Get notified when vehicles are due for service or inspection.",
              },
              {
                label: "Financial Reports",
                desc: "Receive weekly automated revenue and expense summaries.",
              },
              {
                label: "System Updates",
                desc: "Get updates on platform improvements and security patches.",
              },
            ].map((item, idx) => (
              <Flex key={idx} justify="space-between" align="center" py={2}>
                <Box>
                  <Text fontSize="14px" fontWeight="600">
                    {item.label}
                  </Text>
                  <Text fontSize="12px" color={tokens.textMuted}>
                    {item.desc}
                  </Text>
                </Box>
                <Switch colorScheme="brand" isChecked defaultChecked />
              </Flex>
            ))}
          </VStack>
        </Box>

        <Box
          bg={tokens.cardBg}
          p={8}
          borderRadius="24px"
          boxShadow={tokens.shadow}
          border="1px solid"
          borderColor={tokens.border}
        >
          <Heading fontSize="18px" fontWeight="700" mb={6}>
            Data & Security
          </Heading>
          <SimpleGrid columns={[1, 1, 2]} spacing={6}>
            <Box
              p={4}
              borderRadius="16px"
              bg={tokens.cardBg2}
              border="1px solid"
              borderColor={tokens.border}
            >
              <Flex align="center" mb={3}>
                <Icon as={FiDatabase} color={tokens.accent} mr={2} />
                <Text fontWeight="700" fontSize="14px">
                  Data Retention
                </Text>
              </Flex>
              <Text fontSize="12px" color={tokens.textMuted} mb={4}>
                Define how long historical booking data is stored on the
                platform.
              </Text>
              <Select size="sm" defaultValue="2y" bg={tokens.cardBg}>
                <option value="1y">1 Year</option>
                <option value="2y">2 Years</option>
                <option value="5y">5 Years</option>
              </Select>
            </Box>
            <Box
              p={4}
              borderRadius="16px"
              bg={tokens.cardBg2}
              border="1px solid"
              borderColor={tokens.border}
            >
              <Flex align="center" mb={3}>
                <Icon as={FiShield} color={tokens.accent} mr={2} />
                <Text fontWeight="700" fontSize="14px">
                  Two-Factor Auth
                </Text>
              </Flex>
              <Text fontSize="12px" color={tokens.textMuted} mb={4}>
                Enforce 2FA for all administrative staff accounts for extra
                security.
              </Text>
              <Button size="sm" w="full" bg={tokens.accent} color="white">
                Enable 2FA
              </Button>
            </Box>
          </SimpleGrid>
        </Box>
      </VStack>
    </Box>
  );
}
