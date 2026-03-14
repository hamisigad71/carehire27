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
  Grid,
  GridItem,
  Badge,
  SimpleGrid,
} from "@chakra-ui/react";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  FiFileText,
  FiDownload,
  FiCheckCircle,
  FiAlertCircle,
  FiCamera,
  FiUser,
} from "react-icons/fi";
import { useColorTokens } from "@/hooks/useColorTokens";

export default function InspectionReportDetailsPage() {
  const tokens = useColorTokens();

  return (
    <Box maxW="1000px">
      <PageHeader
        title="Inspection Details: INSP-7721"
        subtitle="Tesla Model 3 • Verified on Mar 10, 2026"
        breadcrumbs={[
          { label: "Business", href: "/business" },
          { label: "Fleet", href: "/business/fleet" },
          {
            label: "Inspection Detail",
            href: "/business/inspection_report_details",
          },
        ]}
        actionLabel="Download PDF"
        actionIcon={<FiDownload />}
      />

      <Grid templateColumns={["1fr", "1fr", "1fr 320px"]} gap={10}>
        <Box
          bg={tokens.cardBg}
          p={8}
          borderRadius="24px"
          boxShadow={tokens.shadow}
          border="1px solid"
          borderColor={tokens.border}
        >
          <Heading fontSize="18px" fontWeight="700" mb={8}>
            Full Assessment Checklist
          </Heading>

          <VStack spacing={10} align="stretch">
            <Box>
              <Text
                fontSize="11px"
                fontWeight="700"
                color={tokens.accent}
                textTransform="uppercase"
                letterSpacing="widest"
                mb={4}
              >
                Mechanical & Engine
              </Text>
              <SimpleGrid columns={[1, 2]} spacing={4}>
                {[
                  "Oil Levels",
                  "Brake Fluid",
                  "Engine Cooling",
                  "Battery Health",
                ].map((item) => (
                  <Flex
                    key={item}
                    p={4}
                    borderRadius="12px"
                    bg={tokens.cardBg2}
                    align="center"
                    justify="space-between"
                  >
                    <Text fontSize="14px" fontWeight="600">
                      {item}
                    </Text>
                    <Icon as={FiCheckCircle} color="emerald.500" />
                  </Flex>
                ))}
              </SimpleGrid>
            </Box>

            <Box>
              <Text
                fontSize="11px"
                fontWeight="700"
                color={tokens.accent}
                textTransform="uppercase"
                letterSpacing="widest"
                mb={4}
              >
                Exterior Integrity
              </Text>
              <SimpleGrid columns={[1, 2]} spacing={4}>
                {["Front Bumper", "Left Wing Mirror", "Alloy Wheels"].map(
                  (item) => (
                    <Flex
                      key={item}
                      p={4}
                      borderRadius="12px"
                      bg={tokens.cardBg2}
                      align="center"
                      justify="space-between"
                    >
                      <Text fontSize="14px" fontWeight="600">
                        {item}
                      </Text>
                      <Icon as={FiCheckCircle} color="emerald.500" />
                    </Flex>
                  ),
                )}
                <Flex
                  p={4}
                  borderRadius="12px"
                  bg="red.50"
                  align="center"
                  justify="space-between"
                  border="1px solid"
                  borderColor="red.100"
                >
                  <Text fontSize="14px" fontWeight="600" color="red.700">
                    Rear Tailgate
                  </Text>
                  <HStack>
                    <Text fontSize="10px" color="red.500" fontWeight="700">
                      MINOR DENT
                    </Text>
                    <Icon as={FiAlertCircle} color="red.500" />
                  </HStack>
                </Flex>
              </SimpleGrid>
            </Box>

            <Box>
              <Heading fontSize="16px" fontWeight="700" mb={4}>
                Photographic Evidence
              </Heading>
              <SimpleGrid columns={[2, 4]} spacing={4}>
                {[1, 2, 3, 4].map((i) => (
                  <Box
                    key={i}
                    h="120px"
                    bg={tokens.cardBg2}
                    borderRadius="12px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    border="1px dashed"
                    borderColor={tokens.border}
                  >
                    <Icon as={FiCamera} color={tokens.textSubtle} />
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
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
            <Heading fontSize="16px" fontWeight="700" mb={6}>
              Inspector Info
            </Heading>
            <Flex align="center">
              <Box
                boxSize="40px"
                bg={tokens.accentGlow}
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mr={4}
              >
                <Icon as={FiUser} color={tokens.accent} />
              </Box>
              <Box>
                <Text fontWeight="700" fontSize="14px">
                  Mark Stevenson
                </Text>
                <Text fontSize="12px" color={tokens.textMuted}>
                  Staff ID: ST-0021
                </Text>
              </Box>
            </Flex>
            <Divider my={6} opacity={0.1} />
            <VStack align="stretch" spacing={2}>
              <Text
                fontSize="10px"
                fontWeight="700"
                color={tokens.textMuted}
                textTransform="uppercase"
              >
                Signature Status
              </Text>
              <Badge
                alignSelf="flex-start"
                colorScheme="emerald"
                borderRadius="full"
              >
                Digitally Signed
              </Badge>
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
            <Heading fontSize="16px" fontWeight="700" mb={4}>
              Actions
            </Heading>
            <VStack align="stretch" spacing={3}>
              <Button
                size="sm"
                variant="outline"
                colorScheme="brand"
                borderRadius="12px"
              >
                Flag for Repair
              </Button>
              <Button
                size="sm"
                variant="ghost"
                colorScheme="gray"
                borderRadius="12px"
              >
                Print Report
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Grid>
    </Box>
  );
}
