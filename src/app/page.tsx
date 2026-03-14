"use client";

import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  Button,
  Icon,
  SimpleGrid,
  Container,
  Badge,
  Divider,
  Spacer,
} from "@chakra-ui/react";
import { FiArrowRight, FiBriefcase, FiUser } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useColorTokens } from "@/hooks/useColorTokens";
import { useLoading } from "@/context/LoadingContext";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const tokens = useColorTokens();
  const { setIsLoading } = useLoading();

  // Add animation styles
  useEffect(() => {
    if (!document.getElementById("portal-animations")) {
      const style = document.createElement("style");
      style.id = "portal-animations";
      style.textContent = `
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .portal-card {
          animation: slideInUp 0.6s ease-out forwards;
        }
        .portal-card:nth-child(1) { animation-delay: 0.1s; }
        .portal-card:nth-child(2) { animation-delay: 0.2s; }
        .icon-float {
          animation: float 3s ease-in-out infinite;
        }
        .gradient-bg {
          background-size: 200% 200%;
          animation: gradientShift 6s ease infinite;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <Box minH="100vh" bg={tokens.pageBg} position="relative" overflow="hidden">
      {/* Animated background elements */}
      <Box
        position="absolute"
        top={-200}
        right={-100}
        w="400px"
        h="400px"
        borderRadius="full"
        bg="linear-gradient(135deg, rgba(74, 158, 74, 0.1) 0%, rgba(74, 158, 74, 0) 70%)"
        filter="blur(40px)"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        bottom={-150}
        left={-100}
        w="350px"
        h="350px"
        borderRadius="full"
        bg="linear-gradient(135deg, rgba(13, 56, 13, 0.08) 0%, rgba(13, 56, 13, 0) 70%)"
        filter="blur(40px)"
        pointerEvents="none"
      />

      <Container
        maxW="container.xl"
        position="relative"
        py={{ base: 16, md: 24 }}
      >
        <VStack spacing={{ base: 12, md: 16 }}>
          {/* Header Section */}
          <VStack spacing={{ base: 4, md: 6 }} textAlign="center" w="full">
            <VStack spacing={2}>
              <Badge
                colorScheme="green"
                px={4}
                py={1.5}
                borderRadius="full"
                fontSize="11px"
                fontWeight="700"
                textTransform="uppercase"
                letterSpacing="0.08em"
                bg="green.100"
                color="green.800"
              >
                Welcome to Elite CarHire
              </Badge>

              <Heading
                fontSize={{ base: "28px", sm: "36px", md: "48px", lg: "56px" }}
                fontWeight="900"
                lineHeight="1.1"
                letterSpacing="-0.02em"
              >
                Select Your
                <br />
                <Text
                  as="span"
                  bgGradient="linear(to-r, green.400, green.600)"
                  bgClip="text"
                >
                  Portal Access
                </Text>
              </Heading>
            </VStack>

            <Text
              color={tokens.textMuted}
              fontSize={{ base: "14px", md: "16px" }}
              maxW="600px"
              fontWeight="400"
              lineHeight="1.8"
            >
              Choose your role and unlock advanced tools for vehicle management,
              fleet operations, or seamless rental bookings.
            </Text>
          </VStack>

          {/* Portal Cards Grid */}
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={{ base: 4, md: 6 }}
            w="full"
            maxW="900px"
            mx="auto"
          >
            {/* Business Portal Card */}
            <Box
              className="portal-card"
              bg={tokens.cardBg}
              borderRadius="24px"
              border="1px solid"
              borderColor={tokens.border}
              overflow="hidden"
              transition="all 0.4s cubic-bezier(0.23, 1, 0.320, 1)"
              cursor="pointer"
              position="relative"
              role="group"
              _hover={{
                borderColor: "green.500",
                boxShadow: "0 20px 60px rgba(74, 158, 74, 0.15)",
                transform: "translateY(-12px) scale(1.02)",
              }}
              onClick={() => {
                setIsLoading(true);
                router.push("/business/dashboard");
              }}
            >
              {/* Top accent bar */}
              <Box h="4px" bgGradient="linear(to-r, green.400, green.600)" />

              <VStack spacing={6} p={{ base: 6, md: 7 }} align="start" h="full">
                {/* Icon Container */}
                <Flex
                  w={16}
                  h={16}
                  borderRadius="16px"
                  bg="linear-gradient(135deg, rgba(74, 158, 74, 0.15) 0%, rgba(74, 158, 74, 0.05) 100%)"
                  align="center"
                  justify="center"
                  className="icon-float"
                  transition="all 0.3s"
                  _groupHover={{
                    bg: "linear-gradient(135deg, rgba(74, 158, 74, 0.25) 0%, rgba(74, 158, 74, 0.1) 100%)",
                  }}
                >
                  <Icon as={FiBriefcase} boxSize={8} color="green.600" />
                </Flex>

                {/* Content */}
                <Box>
                  <Heading
                    fontSize={{ base: "20px", md: "24px" }}
                    fontWeight="800"
                    mb={2}
                    letterSpacing="-0.01em"
                  >
                    Business Portal
                  </Heading>
                  <Text
                    fontSize={{ base: "13px", md: "14px" }}
                    color={tokens.textMuted}
                    lineHeight="1.6"
                    mb={4}
                  >
                    Streamline fleet management, track vehicle operations,
                    analyze bookings, and optimize revenue with powerful
                    business analytics.
                  </Text>

                  {/* Features */}
                  <VStack align="start" spacing={2} mb={4}>
                    {[
                      "Fleet Management",
                      "Analytics Dashboard",
                      "Revenue Tracking",
                    ].map((feature) => (
                      <Flex
                        key={feature}
                        align="center"
                        fontSize="12px"
                        color="gray.600"
                      >
                        <Box
                          w={1.5}
                          h={1.5}
                          borderRadius="full"
                          bg="green.500"
                          mr={2}
                        />
                        {feature}
                      </Flex>
                    ))}
                  </VStack>
                </Box>

                <Spacer />

                {/* Button */}
                <Button
                  w="full"
                  bg="linear-gradient(135deg, green.500 0%, green.600 100%)"
                  color="white"
                  fontWeight="700"
                  borderRadius="12px"
                  fontSize={{ base: "13px", md: "14px" }}
                  py={6}
                  rightIcon={<FiArrowRight />}
                  transition="all 0.3s"
                  _hover={{
                    boxShadow: "0 10px 30px rgba(74, 158, 74, 0.3)",
                    transform: "translateY(-2px)",
                  }}
                  _active={{ transform: "scale(0.98)" }}
                >
                  Access Dashboard
                </Button>
              </VStack>
            </Box>

            {/* Customer Portal Card */}
            <Box
              className="portal-card"
              bg={tokens.cardBg}
              borderRadius="24px"
              border="1px solid"
              borderColor={tokens.border}
              overflow="hidden"
              transition="all 0.4s cubic-bezier(0.23, 1, 0.320, 1)"
              cursor="pointer"
              position="relative"
              _hover={{
                borderColor: "teal.500",
                boxShadow: "0 20px 60px rgba(15, 107, 107, 0.15)",
                transform: "translateY(-12px) scale(1.02)",
              }}
              onClick={() => {
                setIsLoading(true);
                router.push("/customer");
              }}
              group
            >
              {/* Top accent bar */}
              <Box h="4px" bgGradient="linear(to-r, teal.400, teal.600)" />

              <VStack spacing={6} p={{ base: 6, md: 7 }} align="start" h="full">
                {/* Icon Container */}
                <Flex
                  w={16}
                  h={16}
                  borderRadius="16px"
                  bg="linear-gradient(135deg, rgba(15, 107, 107, 0.15) 0%, rgba(15, 107, 107, 0.05) 100%)"
                  align="center"
                  justify="center"
                  className="icon-float"
                  transition="all 0.3s"
                  _groupHover={{
                    bg: "linear-gradient(135deg, rgba(15, 107, 107, 0.25) 0%, rgba(15, 107, 107, 0.1) 100%)",
                  }}
                >
                  <Icon as={FiUser} boxSize={8} color="teal.600" />
                </Flex>

                {/* Content */}
                <Box>
                  <Heading
                    fontSize={{ base: "20px", md: "24px" }}
                    fontWeight="800"
                    mb={2}
                    letterSpacing="-0.01em"
                  >
                    Customer Portal
                  </Heading>
                  <Text
                    fontSize={{ base: "13px", md: "14px" }}
                    color={tokens.textMuted}
                    lineHeight="1.6"
                    mb={4}
                  >
                    Browse premium vehicles, secure instant bookings, manage
                    your reservations, and track rental history with ease.
                  </Text>

                  {/* Features */}
                  <VStack align="start" spacing={2} mb={4}>
                    {["Vehicle Browse", "Quick Booking", "Loyalty Program"].map(
                      (feature) => (
                        <Flex
                          key={feature}
                          align="center"
                          fontSize="12px"
                          color="gray.600"
                        >
                          <Box
                            w={1.5}
                            h={1.5}
                            borderRadius="full"
                            bg="teal.500"
                            mr={2}
                          />
                          {feature}
                        </Flex>
                      ),
                    )}
                  </VStack>
                </Box>

                <Spacer />

                {/* Button */}
                <Button
                  w="full"
                  bg="linear-gradient(135deg, teal.500 0%, teal.600 100%)"
                  color="white"
                  fontWeight="700"
                  borderRadius="12px"
                  fontSize={{ base: "13px", md: "14px" }}
                  py={6}
                  rightIcon={<FiArrowRight />}
                  transition="all 0.3s"
                  _hover={{
                    boxShadow: "0 10px 30px rgba(15, 107, 107, 0.3)",
                    transform: "translateY(-2px)",
                  }}
                  _active={{ transform: "scale(0.98)" }}
                >
                  Enter Portal
                </Button>
              </VStack>
            </Box>
          </SimpleGrid>

          {/* Footer Info */}
          <Divider my={4} opacity={0.3} />
          <VStack spacing={2} textAlign="center">
            <Text fontSize="12px" color={tokens.textMuted} fontWeight="500">
              🚗 Elite CarHire Platform • Global Vehicle Rental Solutions
            </Text>
            <Text fontSize="11px" color={tokens.textMuted} opacity={0.7}>
              Enterprise-grade security • Real-time tracking • 24/7 support
            </Text>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
