"use client";

import {
  Box,
  Flex,
  VStack,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Heading,
  Text,
  useToast,
  Icon,
} from "@chakra-ui/react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FiSave, FiUserPlus, FiArrowRight } from "react-icons/fi";
import { useColorTokens } from "@/hooks/useColorTokens";

export default function AddCustomerPage() {
  const tokens = useColorTokens();
  const toast = useToast();

  const handleSave = () => {
    toast({
      title: "Customer Created",
      description: "Successfully added new customer to the database.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  };

  return (
    <Box maxW="1000px">
      <PageHeader
        title="Add New Customer"
        subtitle="Manually register a new client in the CRM system."
        breadcrumbs={[
          { label: "Business", href: "/business" },
          { label: "Customers", href: "/business/customers" },
          { label: "Add Customer", href: "/business/add_customer" },
        ]}
      />

      <Box
        bg={tokens.cardBg}
        p={8}
        borderRadius="24px"
        boxShadow={tokens.shadow}
        border="1px solid"
        borderColor={tokens.border}
      >
        <VStack spacing={10} align="stretch">
          <Box>
            <Heading fontSize="18px" fontWeight="700" mb={6}>
              Primary Contact Information
            </Heading>
            <SimpleGrid columns={[1, 2]} spacing={6}>
              <FormControl isRequired>
                <FormLabel
                  fontSize="12px"
                  fontWeight="700"
                  color={tokens.textMuted}
                  textTransform="uppercase"
                >
                  Full Name
                </FormLabel>
                <Input
                  placeholder="e.g. John Doe"
                  _focus={{ borderColor: tokens.accent }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel
                  fontSize="12px"
                  fontWeight="700"
                  color={tokens.textMuted}
                  textTransform="uppercase"
                >
                  Email Address
                </FormLabel>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  _focus={{ borderColor: tokens.accent }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel
                  fontSize="12px"
                  fontWeight="700"
                  color={tokens.textMuted}
                  textTransform="uppercase"
                >
                  Phone Number
                </FormLabel>
                <Input
                  placeholder="+1 555-0101"
                  _focus={{ borderColor: tokens.accent }}
                />
              </FormControl>
              <FormControl>
                <FormLabel
                  fontSize="12px"
                  fontWeight="700"
                  color={tokens.textMuted}
                  textTransform="uppercase"
                >
                  Date of Birth
                </FormLabel>
                <Input type="date" _focus={{ borderColor: tokens.accent }} />
              </FormControl>
            </SimpleGrid>
          </Box>

          <Box>
            <Heading fontSize="18px" fontWeight="700" mb={6}>
              Account Configuration
            </Heading>
            <SimpleGrid columns={[1, 3]} spacing={6}>
              <FormControl>
                <FormLabel
                  fontSize="12px"
                  fontWeight="700"
                  color={tokens.textMuted}
                  textTransform="uppercase"
                >
                  Customer Tier
                </FormLabel>
                <Select
                  defaultValue="Standard"
                  _focus={{ borderColor: tokens.accent }}
                >
                  <option>Standard</option>
                  <option>VIP Gold</option>
                  <option>Enterprise</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel
                  fontSize="12px"
                  fontWeight="700"
                  color={tokens.textMuted}
                  textTransform="uppercase"
                >
                  Currency
                </FormLabel>
                <Select
                  defaultValue="USD"
                  _focus={{ borderColor: tokens.accent }}
                >
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel
                  fontSize="12px"
                  fontWeight="700"
                  color={tokens.textMuted}
                  textTransform="uppercase"
                >
                  Verified Status
                </FormLabel>
                <Select
                  defaultValue="Pending"
                  _focus={{ borderColor: tokens.accent }}
                >
                  <option>Pending</option>
                  <option>Verified</option>
                </Select>
              </FormControl>
            </SimpleGrid>
          </Box>

          <Flex
            justify="flex-end"
            pt={6}
            borderTop="1px solid"
            borderColor={tokens.border}
          >
            <Button
              bg={tokens.accent}
              color="white"
              leftIcon={<FiUserPlus />}
              px={12}
              h="55px"
              borderRadius="14px"
              onClick={handleSave}
            >
              Create Customer Account
            </Button>
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
}
