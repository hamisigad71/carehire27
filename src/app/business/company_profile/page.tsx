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
  Avatar,
  VStack,
} from "@chakra-ui/react";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  FiGlobe,
  FiMapPin,
  FiMail,
  FiPhone,
  FiEdit,
  FiClock,
} from "react-icons/fi";
import { useColorTokens } from "@/hooks/useColorTokens";

export default function CompanyProfilePage() {
  const tokens = useColorTokens();

  return (
    <Box maxW="1000px">
      <PageHeader
        title="Company Profile"
        subtitle="Manage your business identity and contact information."
        breadcrumbs={[
          { label: "Business", href: "/business" },
          { label: "Profile", href: "/business/company_profile" },
        ]}
        actionLabel="Update Profile"
        actionIcon={<FiEdit />}
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
          <Flex
            direction={["column", "row"]}
            align={["center", "flex-start"]}
            gap={8}
          >
            <Avatar
              size="2xl"
              name="Elite Car Hire"
              src=""
              borderRadius="24px"
              border="4px solid"
              borderColor={tokens.accentGlow}
            />
            <Box flex={1}>
              <Heading fontSize="24px" fontWeight="700" mb={1}>
                Elite Car Hire Ltd.
              </Heading>
              <Text fontSize="14px" color={tokens.textMuted} mb={4}>
                Premium Vehicle Rental & Concierge Services
              </Text>
              <HStack
                spacing={4}
                textTransform="uppercase"
                fontSize="10px"
                fontWeight="700"
                letterSpacing="widest"
                color={tokens.accent}
              >
                <Badge
                  bg={tokens.accentGlow}
                  color={tokens.accent}
                  px={3}
                  py={1}
                  borderRadius="full"
                >
                  Verified Business
                </Badge>
                <Badge
                  bg="blue.50"
                  color="blue.500"
                  px={3}
                  py={1}
                  borderRadius="full"
                >
                  Established 2024
                </Badge>
              </HStack>
            </Box>
          </Flex>
        </Box>

        <SimpleGrid columns={[1, 1, 2]} spacing={8}>
          <Box
            bg={tokens.cardBg}
            p={8}
            borderRadius="24px"
            boxShadow={tokens.shadow}
            border="1px solid"
            borderColor={tokens.border}
          >
            <Heading fontSize="18px" fontWeight="700" mb={6}>
              Contact Information
            </Heading>
            <VStack spacing={6} align="stretch">
              <Flex align="center">
                <Icon as={FiGlobe} color={tokens.accent} boxSize={5} mr={4} />
                <Box>
                  <Text
                    fontSize="11px"
                    fontWeight="600"
                    color={tokens.textSubtle}
                    textTransform="uppercase"
                  >
                    Website
                  </Text>
                  <Text fontSize="14px" fontWeight="600">
                    www.elitecarhire.com
                  </Text>
                </Box>
              </Flex>
              <Flex align="center">
                <Icon as={FiMail} color={tokens.accent} boxSize={5} mr={4} />
                <Box>
                  <Text
                    fontSize="11px"
                    fontWeight="600"
                    color={tokens.textSubtle}
                    textTransform="uppercase"
                  >
                    Business Email
                  </Text>
                  <Text fontSize="14px" fontWeight="600">
                    hello@elitecarhire.com
                  </Text>
                </Box>
              </Flex>
              <Flex align="center">
                <Icon as={FiPhone} color={tokens.accent} boxSize={5} mr={4} />
                <Box>
                  <Text
                    fontSize="11px"
                    fontWeight="600"
                    color={tokens.textSubtle}
                    textTransform="uppercase"
                  >
                    Phone Number
                  </Text>
                  <Text fontSize="14px" fontWeight="600">
                    +1 (888) 555-ELITE
                  </Text>
                </Box>
              </Flex>
              <Flex align="center">
                <Icon as={FiMapPin} color={tokens.accent} boxSize={5} mr={4} />
                <Box>
                  <Text
                    fontSize="11px"
                    fontWeight="600"
                    color={tokens.textSubtle}
                    textTransform="uppercase"
                  >
                    Headquarters
                  </Text>
                  <Text fontSize="14px" fontWeight="600">
                    777 Luxury Blvd, Beverly Hills, CA 90210
                  </Text>
                </Box>
              </Flex>
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
              Business Hours
            </Heading>
            <VStack spacing={4} align="stretch">
              {[
                { day: "Monday - Friday", hours: "08:00 AM - 08:00 PM" },
                { day: "Saturday", hours: "09:00 AM - 06:00 PM" },
                { day: "Sunday", hours: "Closed" },
              ].map((item, idx) => (
                <Flex key={idx} justify="space-between" align="center">
                  <Flex align="center">
                    <Icon as={FiClock} color={tokens.accent} mr={3} />
                    <Text fontSize="14px" fontWeight="600">
                      {item.day}
                    </Text>
                  </Flex>
                  <Text fontSize="14px" color={tokens.textMuted}>
                    {item.hours}
                  </Text>
                </Flex>
              ))}
            </VStack>
          </Box>
        </SimpleGrid>
      </VStack>
    </Box>
  );
}

import { Badge } from "@chakra-ui/react";
