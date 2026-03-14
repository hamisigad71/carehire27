"use client";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  Stepper,
  Text,
  VStack,
  HStack,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Card,
  CardBody,
  useToast,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useColorTokens } from "@/hooks/useColorTokens";

const steps = [
  { title: "Business Info", description: "Tell us about your business" },
  { title: "Service Type", description: "What services do you offer?" },
  { title: "Fleet Setup", description: "Configure your fleet" },
  { title: "Pricing", description: "Set up your pricing model" },
  { title: "Review", description: "Review and confirm" },
];

interface FormData {
  businessName: string;
  location: string;
  email: string;
  phone: string;
  serviceType: string;
  fleetSize: string;
  pricingModel: string;
  dailyRate: string;
}

export const SetupWizard = () => {
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const tokens = useColorTokens();
  const [formData, setFormData] = useState<FormData>({
    businessName: "",
    location: "",
    email: "",
    phone: "",
    serviceType: "car-rental",
    fleetSize: "10-25",
    pricingModel: "daily",
    dailyRate: "5000",
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((s) => s + 1);
    }
  };

  const validateStep = (currentStep: number): boolean => {
    switch (currentStep) {
      case 0:
        if (!formData.businessName.trim()) {
          toast({
            title: "Error",
            description: "Please enter your business name",
            status: "error",
          });
          return false;
        }
        if (!formData.location.trim()) {
          toast({
            title: "Error",
            description: "Please enter your location",
            status: "error",
          });
          return false;
        }
        return true;
      case 1:
        return !!formData.serviceType;
      case 2:
        return !!formData.fleetSize;
      case 3:
        if (!formData.dailyRate || parseFloat(formData.dailyRate) <= 0) {
          toast({
            title: "Error",
            description: "Please enter a valid daily rate",
            status: "error",
          });
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "Success",
        description: "Business setup completed successfully!",
        status: "success",
      });

      // Store setup data in localStorage for demo
      localStorage.setItem("businessSetup", JSON.stringify(formData));

      // Redirect to fleet upload
      router.push("/business/onboarding/fleet-upload");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to complete setup",
        status: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <VStack spacing={5} align="stretch">
            <Text fontSize="14px" color={tokens.textMuted}>
              Let's start by getting to know your business
            </Text>
            <FormControl isRequired>
              <FormLabel fontSize="14px" fontWeight="600">
                Business Name
              </FormLabel>
              <Input
                placeholder="e.g., Premium Car Rentals Nairobi"
                value={formData.businessName}
                onChange={(e) =>
                  handleInputChange("businessName", e.target.value)
                }
                borderRadius="12px"
                size="lg"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontSize="14px" fontWeight="600">
                Location
              </FormLabel>
              <Input
                placeholder="e.g., Nairobi, Kenya"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                borderRadius="12px"
                size="lg"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontSize="14px" fontWeight="600">
                Email
              </FormLabel>
              <Input
                type="email"
                placeholder="contact@yourbusiness.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                borderRadius="12px"
                size="lg"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontSize="14px" fontWeight="600">
                Phone Number
              </FormLabel>
              <Input
                placeholder="+254 XXX XXX XXX"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                borderRadius="12px"
                size="lg"
              />
            </FormControl>
          </VStack>
        );

      case 1:
        return (
          <VStack spacing={5} align="stretch">
            <Text fontSize="14px" color={tokens.textMuted}>
              What type of service would you like to offer?
            </Text>
            <RadioGroup
              value={formData.serviceType}
              onChange={(value) => handleInputChange("serviceType", value)}
            >
              <Stack spacing={4}>
                {[
                  {
                    value: "car-rental",
                    label: "Car Rental",
                    desc: "Daily or weekly car rental service",
                  },
                  {
                    value: "ride-hire",
                    label: "Ride-for-Hire",
                    desc: "Hourly or on-demand driver service",
                  },
                  {
                    value: "premium",
                    label: "Premium Chauffeur",
                    desc: "Luxury vehicles with professional drivers",
                  },
                  {
                    value: "delivery",
                    label: "Cargo/Delivery",
                    desc: "Vehicles for cargo and delivery services",
                  },
                ].map((option) => (
                  <Card
                    key={option.value}
                    borderWidth="2px"
                    borderColor={
                      formData.serviceType === option.value
                        ? "green.500"
                        : "gray.200"
                    }
                    cursor="pointer"
                    transition="all 0.2s"
                    _hover={{
                      borderColor: "green.300",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    }}
                  >
                    <CardBody>
                      <HStack spacing={3}>
                        <Radio value={option.value} />
                        <VStack align="start" spacing={0.5}>
                          <Text fontWeight="600">{option.label}</Text>
                          <Text fontSize="12px" color={tokens.textMuted}>
                            {option.desc}
                          </Text>
                        </VStack>
                      </HStack>
                    </CardBody>
                  </Card>
                ))}
              </Stack>
            </RadioGroup>
          </VStack>
        );

      case 2:
        return (
          <VStack spacing={5} align="stretch">
            <Text fontSize="14px" color={tokens.textMuted}>
              How many vehicles will you start with?
            </Text>
            <RadioGroup
              value={formData.fleetSize}
              onChange={(value) => handleInputChange("fleetSize", value)}
            >
              <Stack spacing={3}>
                {[
                  { value: "1-5", label: "1-5 vehicles" },
                  { value: "5-10", label: "5-10 vehicles" },
                  { value: "10-25", label: "10-25 vehicles" },
                  { value: "25-50", label: "25-50 vehicles" },
                  { value: "50-100", label: "50-100 vehicles" },
                  { value: "100+", label: "100+ vehicles" },
                ].map((option) => (
                  <HStack key={option.value} spacing={3}>
                    <Radio value={option.value} />
                    <Text fontSize="14px">{option.label}</Text>
                  </HStack>
                ))}
              </Stack>
            </RadioGroup>
          </VStack>
        );

      case 3:
        return (
          <VStack spacing={5} align="stretch">
            <Text fontSize="14px" color={tokens.textMuted}>
              Set your initial pricing
            </Text>
            <RadioGroup
              value={formData.pricingModel}
              onChange={(value) => handleInputChange("pricingModel", value)}
              mb={4}
            >
              <Stack spacing={3}>
                {[
                  { value: "daily", label: "Daily Rate" },
                  { value: "hourly", label: "Hourly Rate" },
                  { value: "distance", label: "Distance-based" },
                ].map((option) => (
                  <HStack key={option.value} spacing={3}>
                    <Radio value={option.value} />
                    <Text fontSize="14px">{option.label}</Text>
                  </HStack>
                ))}
              </Stack>
            </RadioGroup>

            <FormControl isRequired>
              <FormLabel fontSize="14px" fontWeight="600">
                {formData.pricingModel === "daily"
                  ? "Daily Rate (KSh)"
                  : formData.pricingModel === "hourly"
                    ? "Hourly Rate (KSh)"
                    : "Per KM Rate (KSh)"}
              </FormLabel>
              <Input
                type="number"
                placeholder="Enter rate"
                value={formData.dailyRate}
                onChange={(e) => handleInputChange("dailyRate", e.target.value)}
                borderRadius="12px"
                size="lg"
              />
              <Text fontSize="11px" color={tokens.textMuted} mt={2}>
                You can adjust this later in settings
              </Text>
            </FormControl>
          </VStack>
        );

      case 4:
        return (
          <VStack spacing={5} align="stretch">
            <Text fontSize="14px" color={tokens.textMuted} mb={4}>
              Review your setup information
            </Text>
            <Grid templateColumns="1fr 1fr" gap={4} fontSize="14px">
              <Box>
                <Text fontWeight="600" color={tokens.textMuted} mb={1}>
                  Business Name
                </Text>
                <Text fontWeight="500">{formData.businessName}</Text>
              </Box>
              <Box>
                <Text fontWeight="600" color={tokens.textMuted} mb={1}>
                  Location
                </Text>
                <Text fontWeight="500">{formData.location}</Text>
              </Box>
              <Box>
                <Text fontWeight="600" color={tokens.textMuted} mb={1}>
                  Service Type
                </Text>
                <Text fontWeight="500" textTransform="capitalize">
                  {formData.serviceType.replace("-", " ")}
                </Text>
              </Box>
              <Box>
                <Text fontWeight="600" color={tokens.textMuted} mb={1}>
                  Fleet Size
                </Text>
                <Text fontWeight="500">{formData.fleetSize} vehicles</Text>
              </Box>
            </Grid>
            <Box
              bg="blue.50"
              border="1px solid"
              borderColor="blue.200"
              borderRadius="12px"
              p={4}
            >
              <Text fontSize="13px" color="blue.900" lineHeight="1.6">
                ✓ Everything looks good! Click below to proceed to fleet setup.
              </Text>
            </Box>
          </VStack>
        );

      default:
        return null;
    }
  };

  return (
    <Box minH="100vh" bg="gray.50" py={10}>
      <Box maxW="800px" mx="auto" px={4}>
        {/* Header */}
        <VStack spacing={8} align="stretch">
          <VStack spacing={2} textAlign="center">
            <Heading fontSize="32px" fontWeight="800">
              Welcome to Your Business Portal
            </Heading>
            <Text fontSize="16px" color={tokens.textMuted}>
              Let's set up your business in just a few minutes
            </Text>
          </VStack>

          {/* Stepper */}
          <Box
            bg="white"
            p={6}
            borderRadius="16px"
            boxShadow="0 2px 8px rgba(0,0,0,0.06)"
          >
            <Stepper index={step} colorScheme="green">
              <HStack spacing={[2, 4]} justify="space-between">
                {steps.map((s, idx) => (
                  <HStack key={idx} spacing={2} flex={1}>
                    <StepIndicator>
                      <StepStatus
                        complete={<StepIcon />}
                        incomplete={<StepNumber />}
                        active={<StepNumber />}
                      />
                    </StepIndicator>
                    {idx < steps.length - 1 && (
                      <StepSeparator flex={1} bg="gray.200" />
                    )}
                  </HStack>
                ))}
              </HStack>
            </Stepper>
          </Box>

          {/* Content */}
          <Box
            bg="white"
            p={8}
            borderRadius="16px"
            boxShadow="0 2px 8px rgba(0,0,0,0.06)"
          >
            <VStack spacing={6} align="stretch">
              <VStack spacing={1} align="stretch">
                <Heading fontSize="22px" fontWeight="700">
                  {steps[step].title}
                </Heading>
                <Text fontSize="13px" color={tokens.textMuted}>
                  {steps[step].description}
                </Text>
              </VStack>

              {/* Step Content */}
              <Box minH="300px">{renderStepContent()}</Box>

              {/* Navigation */}
              <HStack spacing={3} justify="space-between" pt={4}>
                <Button
                  variant="outline"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  isDisabled={step === 0}
                  size="lg"
                >
                  Back
                </Button>
                <HStack spacing={2}>
                  {step < steps.length - 1 ? (
                    <Button
                      bg="green.600"
                      color="white"
                      onClick={handleNext}
                      size="lg"
                      _hover={{ bg: "green.700" }}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      bg="green.600"
                      color="white"
                      onClick={handleSubmit}
                      isDisabled={isLoading}
                      size="lg"
                      _hover={{ bg: "green.700" }}
                    >
                      {isLoading ? <Spinner size="sm" /> : "Complete Setup"}
                    </Button>
                  )}
                </HStack>
              </HStack>
            </VStack>
          </Box>

          {/* Progress */}
          <Center>
            <Text fontSize="12px" color={tokens.textMuted}>
              Step {step + 1} of {steps.length}
            </Text>
          </Center>
        </VStack>
      </Box>
    </Box>
  );
};
