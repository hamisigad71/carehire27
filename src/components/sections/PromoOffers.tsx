"use client";

import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  HStack,
  VStack,
  Image,
  Badge,
} from "@chakra-ui/react";
import { useColorTokens } from "@/hooks/useColorTokens";
import { FiArrowRight } from "react-icons/fi";

interface PromotionalOffer {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  discount: string;
  image: string;
  badge: string;
  cta: string;
  promoCode: string;
  ctaLink: string;
}

interface PromoOffersProps {
  offers?: PromotionalOffer[];
}

export const PromoOffers = ({ offers = [] }: PromoOffersProps) => {
  const tokens = useColorTokens();

  const defaultOffers: PromotionalOffer[] = [
    {
      id: "1",
      title: "Premium Mobility.",
      subtitle: "Unbeatable Value.",
      description:
        "Book any premium vehicle today and enjoy exclusive benefits. Includes complimentary airport transfers, loyalty rewards, and 24/7 concierge support.",
      discount: "40%",
      image:
        "https://i.pinimg.com/1200x/2b/f2/5e/2bf25e33f3c1108363a4c96fbac8ad6a.jpg",
      badge: "LIMITED TIME DEALS",
      cta: "BOOK NOW",
      promoCode: "PREMIUM40",
      ctaLink: "/customer/fleet",
    },
    {
      id: "2",
      title: "Weekend Getaway.",
      subtitle: "Special Rates.",
      description:
        "Rent an SUV or Luxury vehicle for your weekend adventure. Perfect for family trips with spacious interiors and advanced safety features.",
      discount: "25%",
      image:
        "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&q=80&w=800",
      badge: "WEEKEND SPECIAL",
      cta: "EXPLORE OFFERS",
      promoCode: "WEEKEND25",
      ctaLink: "/customer/fleet",
    },
  ];

  const displayOffers = offers.length > 0 ? offers : defaultOffers;

  return (
    <>
      {displayOffers.map((offer, idx) => (
        <Box key={offer.id}>
          <Box
            position="fixed"
            right={0}
            top={0}
            w={["50%", "55%"]}
            h="100vh"
            display={["none", "block"]}
            zIndex={5}
          >
            <Image
              src={offer.image}
              alt={offer.title}
              w="full"
              h="full"
              objectFit="cover"
            />
          </Box>

          <Box
            position="relative"
            w="100vw"
            ml="calc(-50vw + 50%)"
            px={[4, 6, 8]}
            pb={[12, 16]}
            overflow="visible"
          >
            {/* Main Hero Section - Two columns: Text left, Image right */}
            <Box
              bg={`linear-gradient(135deg, #1ABC9C 0%, #0B8B6E 100%)`}
              borderRadius={["0px", "24px"]}
              overflow="visible"
              position="relative"
              minH={["350px", "450px"]}
              boxShadow={[
                "0 0 0 rgba(0, 0, 0, 0)",
                "0 20px 60px rgba(0, 0, 0, 0.15)",
              ]}
              display="flex"
            >
              {/* Decorative shapes */}
              <Box
                position="absolute"
                top={-40}
                left={-40}
                w="200px"
                h="200px"
                borderRadius="full"
                bg="rgba(255, 255, 255, 0.05)"
              />
              <Box
                position="absolute"
                bottom={-60}
                left={-60}
                w="250px"
                h="250px"
                borderRadius="full"
                bg="rgba(255, 255, 255, 0.03)"
              />

              {/* Content - Left side (50-55%) */}
              <VStack
                align="flex-start"
                spacing={6}
                position="relative"
                zIndex={2}
                p={[6, 8]}
                h="100%"
                justify="center"
                flex={["0 0 100%", "0 0 50%"]}
              >
                <Badge
                  bg="rgba(255, 255, 255, 0.25)"
                  color="white"
                  fontSize="10px"
                  fontWeight="800"
                  px={3}
                  py={1}
                  borderRadius="6px"
                  letterSpacing="0.5px"
                  textTransform="uppercase"
                  backdropFilter="blur(10px)"
                >
                  {offer.badge}
                </Badge>

                <Heading
                  as="h2"
                  fontSize={["28px", "44px"]}
                  color="white"
                  fontWeight="900"
                  lineHeight="1.1"
                  letterSpacing="-0.5px"
                  textAlign={["left", "left"]}
                >
                  {offer.title}
                  <br />
                  <Text as="span" color="rgba(255, 255, 255, 0.95)">
                    {offer.subtitle}
                  </Text>
                </Heading>

                <Text
                  fontSize={["13px", "15px"]}
                  color="rgba(255, 255, 255, 0.9)"
                  lineHeight="1.6"
                  fontWeight="500"
                >
                  {offer.description}
                </Text>

                <HStack spacing={4} pt={2} w="full" flexWrap="wrap">
                  <Button
                    bg="white"
                    color="#1ABC9C"
                    fontWeight="800"
                    fontSize="12px"
                    letterSpacing="0.5px"
                    px={6}
                    py={5}
                    borderRadius="10px"
                    rightIcon={<FiArrowRight />}
                    _hover={{
                      bg: "rgba(255, 255, 255, 0.96)",
                      transform: "translateX(4px)",
                      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
                    }}
                    transition="all 0.3s ease"
                    textTransform="uppercase"
                  >
                    {offer.cta}
                  </Button>

                  <HStack spacing={2}>
                    <Text
                      fontSize="11px"
                      color="rgba(255, 255, 255, 0.7)"
                      fontWeight="600"
                    >
                      Code:
                    </Text>
                    <Text
                      fontSize="12px"
                      fontWeight="900"
                      color="white"
                      bg="rgba(255, 255, 255, 0.15)"
                      px={3}
                      py={1}
                      borderRadius="6px"
                      letterSpacing="0.5px"
                      backdropFilter="blur(10px)"
                    >
                      {offer.promoCode}
                    </Text>
                  </HStack>
                </HStack>
              </VStack>

              {/* Discount Badge - Top Right */}
              <Badge
                position="absolute"
                top={6}
                right={6}
                bg="white"
                color="#1ABC9C"
                fontSize={["14px", "18px"]}
                fontWeight="900"
                px={5}
                py={2}
                borderRadius="12px"
                boxShadow="0 8px 24px rgba(0, 0, 0, 0.2)"
                zIndex={3}
              >
                -{offer.discount}
              </Badge>
            </Box>
          </Box>
        </Box>
      ))}
    </>
  );
};
