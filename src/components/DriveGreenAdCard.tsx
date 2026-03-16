"use client";

import { Box, Flex, HStack, VStack, Text, Button, Image, Badge, Card, CardBody, Grid, Heading, Icon } from "@chakra-ui/react";
import { FaApple } from "react-icons/fa";
import { SiGoogleplay } from "react-icons/si";

// ─── COLOR TOKENS ─────────────────────────────────────────────────────────────
const L = {
  bg: "#f4f7f4",
  card: "#ffffff",
  accent: "#1e6e1e",
  accentLight: "#2d8c2d",
  accentGlow: "rgba(30,110,30,0.08)",
  accentGlow2: "rgba(30,110,30,0.14)",
  text: "#111a11",
  textSub: "#3a4d3a",
  muted: "#6b7f6b",
  subtle: "#9aaa9a",
  border: "rgba(0,0,0,0.07)",
  borderMid: "rgba(30,110,30,0.15)",
  shadow: "0 1px 12px rgba(0,0,0,0.06)",
  shadowMd: "0 4px 24px rgba(0,0,0,0.09)",
};

// ─── STYLES ───────────────────────────────────────────────────────────────────
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

    @keyframes cardFadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    [role="region"] {
      animation: cardFadeUp 0.6s ease both;
    }
  `}</style>
);

// ─── COMPONENT ────────────────────────────────────────────────────────────────
interface DriveGreenAdCardProps {
  appStoreUrl?: string;
  playStoreUrl?: string;
  promoCode?: string;
  discount?: string;
}

export function DriveGreenAdCard({
  appStoreUrl = "#",
  playStoreUrl = "#",
  promoCode = "DRIVE10",
  discount = "10%",
}: DriveGreenAdCardProps) {
  return (
    <Card
      bg={L.card}
      border="1px solid"
      borderColor={L.borderMid}
      boxShadow={L.shadowMd}
      borderRadius={{ base: "16px", sm: "20px", md: "24px" }}
      overflow="hidden"
    >
      <CardBody p={0}>
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} minH="260px">
          {/* LEFT SIDE */}
          <VStack
            align="stretch"
            justify="space-between"
            p={{ base: 5, md: 8 }}
            bg={L.card}
            spacing={6}
          >
            {/* Top Section */}
            <VStack align="flex-start" spacing={4}>
              {/* Logo */}
              <HStack spacing={2.5}>
                <Box
                  w="36px"
                  h="36px"
                  bg={L.accentGlow}
                  borderRadius="10px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="18px"
                >
                  🚘
                </Box>
                <Heading
                  as="h3"
                  size="sm"
                  fontWeight="800"
                  color={L.text}
                  letterSpacing="-0.02em"
                >
                  Drive<span style={{ color: L.accent }}>Green</span>
                </Heading>
              </HStack>

              {/* Tag */}
              <Badge
                bg={L.accentGlow2}
                color={L.accent}
                borderRadius="full"
                px={3}
                py={1}
                fontSize="10px"
                fontWeight="700"
                textTransform="uppercase"
                letterSpacing=".08em"
              >
                New User Offer
              </Badge>

              {/* Headline */}
              <Heading
                as="h2"
                size="xl"
                fontSize={{ base: "24px", sm: "28px", md: "32px" }}
                fontWeight="800"
                color={L.text}
                letterSpacing="-0.03em"
                lineHeight="1.2"
              >
                Download. Register.{" "}
                <Text as="span" color={L.accent} display="block">
                  Save big.
                </Text>
              </Heading>

              {/* Description */}
              <Text
                fontSize={{ base: "12px", sm: "13px" }}
                color={L.textSub}
                lineHeight="1.6"
                maxW="280px"
              >
                Join Kenya's premium car hire platform and get an exclusive
                discount on your very first booking.
              </Text>
            </VStack>

            {/* Bottom Section */}
            <VStack align="stretch" spacing={4} w="100%">
              {/* Offer Box */}
              <Box
                bg={L.accentGlow}
                border="1px solid"
                borderColor={L.accentGlow2}
                borderRadius="16px"
                p={4}
              >
                <HStack spacing={2} align="flex-start">
                  <Heading
                    as="div"
                    fontSize={{ base: "28px", sm: "32px" }}
                    fontWeight="800"
                    color={L.accent}
                    lineHeight="1"
                  >
                    {discount}
                  </Heading>
                  <Text
                    fontSize={{ base: "13px", sm: "14px" }}
                    fontWeight="700"
                    color={L.accentLight}
                    pt={1}
                  >
                    OFF
                  </Text>
                </HStack>
                <Text fontSize="12px" color={L.textSub} mt={2} fontWeight="500">
                  Your first hire — no minimum spend
                </Text>
                <HStack
                  mt={3}
                  bg="white"
                  px={2.5}
                  py={1.5}
                  borderRadius="8px"
                  border="1px dashed"
                  borderColor={L.accent}
                  w="fit-content"
                  spacing={1.5}
                >
                  <Text
                    fontSize="10px"
                    fontWeight="700"
                    color={L.muted}
                    textTransform="uppercase"
                  >
                    Promo
                  </Text>
                  <Text
                    fontSize="12px"
                    fontWeight="800"
                    color={L.accent}
                    letterSpacing=".08em"
                  >
                    {promoCode}
                  </Text>
                </HStack>
              </Box>

              {/* Buttons */}
              <HStack spacing={2} w="100%">
                <Button
                  as="a"
                  href={appStoreUrl}
                  bg={L.accent}
                  color="white"
                  fontWeight="700"
                  fontSize={{ base: "12px", sm: "13px" }}
                  borderRadius="12px"
                  h={{ base: "36px", sm: "40px" }}
                  flex={1}
                  _hover={{ bg: L.accentLight, transform: "translateY(-2px)" }}
                  transition="all 0.2s"
                  leftIcon={<Icon as={FaApple} boxSize={{ base: "14px", sm: "16px" }} />}
                >
                  App Store
                </Button>
                <Button
                  as="a"
                  href={playStoreUrl}
                  bg="white"
                  color={L.accent}
                  border="1px solid"
                  borderColor={L.accentGlow2}
                  fontWeight="700"
                  fontSize={{ base: "12px", sm: "13px" }}
                  borderRadius="12px"
                  h={{ base: "36px", sm: "40px" }}
                  flex={1}
                  _hover={{ bg: L.accentGlow, transform: "translateY(-2px)" }}
                  transition="all 0.2s"
                  leftIcon={<Icon as={SiGoogleplay} boxSize={{ base: "14px", sm: "16px" }} />}
                >
                  Google Play
                </Button>
              </HStack>
            </VStack>
          </VStack>

          {/* RIGHT SIDE - IMAGE (hidden on mobile) */}
          <Box
            display={{ base: "none", md: "block" }}
            overflow="hidden"
            position="relative"
          >
            <Image
              src="/pasted_image_0.png"
              alt="DriveGreen App"
              w="100%"
              h="100%"
              objectFit="cover"
              filter="brightness(0.8) saturate(1.1)"
            />
            <Box
              position="absolute"
              inset={0}
              bg="linear-gradient(135deg, rgba(30,110,30,0.2) 0%, transparent 60%)"
            />
          </Box>
        </Grid>
      </CardBody>

      {/* Footer */}
      <Flex
        bg="#fafcfa"
        p={{ base: 3, sm: 4 }}
        borderTop="1px solid"
        borderColor={L.borderMid}
        justify="space-between"
        align="center"
        flexWrap="wrap"
        gap={3}
      >
        <HStack spacing={2}>
          <HStack spacing={0.5}>
            {[0, 1, 2, 3, 4].map((i) => (
              <Text key={i} color="#f5a623" fontSize="12px">
                ★
              </Text>
            ))}
          </HStack>
          <Text fontSize="11px" color={L.muted} fontWeight="500">
            4.8 · 2,400+ reviews
          </Text>
        </HStack>
        <Text fontSize="10px" color={L.subtle} fontWeight="500">
          T&Cs apply
        </Text>
      </Flex>
    </Card>
  );
}
