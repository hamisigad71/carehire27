"use client";

import {
  Box,
  SimpleGrid,
  Heading,
  Text,
  VStack,
  Progress,
  Flex,
  Icon,
  Button,
  HStack,
  Badge,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  FiTrendingUp,
  FiGlobe,
  FiTarget,
  FiAward,
  FiPieChart,
} from "react-icons/fi";
import { useColorTokens } from "@/hooks/useColorTokens";

export default function RefinedCompanyProfilePage() {
  const tokens = useColorTokens();

  return (
    <Box>
      <PageHeader
        title="Refined Business Identity"
        subtitle="Brand positioning, vision statements, and market reach."
        breadcrumbs={[
          { label: "Business", href: "/business" },
          { label: "Profile", href: "/business/company_profile" },
          {
            label: "Refined Identity",
            href: "/business/refined_company_profile",
          },
        ]}
      />

      <Grid templateColumns={["1fr", "1fr", "1fr 380px"]} gap={10}>
        <VStack spacing={10} align="stretch">
          <Box
            bg={tokens.cardBg}
            p={10}
            borderRadius="32px"
            boxShadow={tokens.shadow}
            border="1px solid"
            borderColor={tokens.border}
          >
            <VStack spacing={6} align="start">
              <Badge colorScheme="brand" px={4} py={1} borderRadius="full">
                Strategic Vision
              </Badge>
              <Heading fontSize="32px" fontWeight="800" letterSpacing="-0.03em">
                To redefine global mobility through sustainable luxury rentals.
              </Heading>
              <Text color={tokens.textMuted} fontSize="18px" lineHeight="1.6">
                We don't just rent cars; we provide experiences. Our refined
                brand identity focuses on zero-emission performance and
                white-glove service standards across every touchpoint.
              </Text>
            </VStack>
          </Box>

          <SimpleGrid columns={[1, 2]} spacing={6}>
            <Box
              bg={tokens.cardBg}
              p={8}
              borderRadius="24px"
              border="1px solid"
              borderColor={tokens.border}
            >
              <Icon as={FiTarget} boxSize={8} color={tokens.accent} mb={4} />
              <Heading fontSize="18px" fontWeight="700" mb={2}>
                Mission 2030
              </Heading>
              <Text fontSize="14px" color={tokens.textMuted}>
                Converting 100% of our fleet to electric and hydrogen power by
                the end of the decade.
              </Text>
            </Box>
            <Box
              bg={tokens.cardBg}
              p={8}
              borderRadius="24px"
              border="1px solid"
              borderColor={tokens.border}
            >
              <Icon as={FiAward} boxSize={8} color={tokens.accent} mb={4} />
              <Heading fontSize="18px" fontWeight="700" mb={2}>
                Core Values
              </Heading>
              <Text fontSize="14px" color={tokens.textMuted}>
                Integrity, Innovation, and Interconnectivity are the pillars of
                our operational excellence.
              </Text>
            </Box>
          </SimpleGrid>
        </VStack>

        <Box
          bg={tokens.cardBg}
          p={8}
          borderRadius="24px"
          boxShadow={tokens.shadow}
          border="1px solid"
          borderColor={tokens.border}
          h="fit-content"
        >
          <Heading fontSize="16px" fontWeight="700" mb={8}>
            Market Reach
          </Heading>
          <VStack spacing={6} align="stretch">
            <Box>
              <Flex justify="space-between" mb={2}>
                <Text fontSize="13px" fontWeight="600">
                  EMEA Market Share
                </Text>
                <Text fontSize="13px" color={tokens.accent}>
                  12.5%
                </Text>
              </Flex>
              <Progress
                value={45}
                colorScheme="brand"
                size="xs"
                borderRadius="full"
              />
            </Box>
            <Box>
              <Flex justify="space-between" mb={2}>
                <Text fontSize="13px" fontWeight="600">
                  Customer NPS Score
                </Text>
                <Text fontSize="13px" color={tokens.success}>
                  8.9 / 10
                </Text>
              </Flex>
              <Progress
                value={89}
                colorScheme="emerald"
                size="xs"
                borderRadius="full"
              />
            </Box>
            <Box
              my={4}
              borderTop="1px solid"
              borderColor={tokens.border}
              opacity={0.1}
            />
            <Button
              leftIcon={<FiGlobe />}
              w="full"
              bg={tokens.accent}
              color="white"
              borderRadius="12px"
            >
              View Regional data
            </Button>
          </VStack>
        </Box>
      </Grid>
    </Box>
  );
}
