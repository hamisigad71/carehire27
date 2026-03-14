'use client';

import { 
  Box, Container, Heading, Text, VStack, Button, Icon, SimpleGrid, 
  Flex, Image, Badge, HStack, Grid, GridItem, Divider, Avatar, 
  FormControl, FormLabel, Input, Switch, IconButton
} from '@chakra-ui/react';
import { 
  FiUser, FiMail, FiPhone, FiMapPin, FiCamera, FiEdit2, 
  FiShield, FiBell, FiLogOut, FiCreditCard, FiAward
} from 'react-icons/fi';
import { useColorTokens } from '@/hooks/useColorTokens';

export default function CustomerProfilePage() {
  const tokens = useColorTokens();

  return (
    <Box py={[10, 16]}>
      <Container maxW="1000px">
        <VStack align="start" spacing={12}>
          <Box>
            <Heading fontSize={['32px', '40px']} fontWeight="800" letterSpacing="-0.02em" mb={2}>
              Account <Text as="span" color={tokens.accent}>Profile</Text>
            </Heading>
            <Text color={tokens.textMuted}>Manage your personal identity, security, and preferences</Text>
          </Box>

          <Grid templateColumns={["1fr", "1fr", "300px 1fr"]} gap={12} w="full">
            {/* Sidebar / Photo Column */}
            <GridItem>
              <VStack spacing={8} align="center">
                 <Box position="relative">
                    <Avatar 
                       size="2xl" name="John Doe" 
                       src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                       borderRadius="40px" border="4px solid" borderColor={tokens.accentGlow}
                    />
                    <IconButton
                       aria-label="Change photo" icon={<FiCamera />}
                       position="absolute" bottom={0} right={0} 
                       bg={tokens.accent} color="white" borderRadius="14px"
                       _hover={{ opacity: 0.9 }}
                    />
                 </Box>
                 <Box textAlign="center">
                    <Heading fontSize="24px" fontWeight="700">John Doe</Heading>
                    <HStack spacing={1} justify="center" mt={2} color={tokens.accent}>
                       <Icon as={FiAward} />
                       <Text fontSize="12px" fontWeight="800" textTransform="uppercase">Elite Gold Member</Text>
                    </HStack>
                 </Box>

                 <VStack spacing={2} w="full">
                    <Button 
                       w="full" variant="ghost" justifyContent="start" h="54px" borderRadius="14px"
                       leftIcon={<FiUser />} color={tokens.accent} bg={tokens.accentGlow}
                    >
                       Personal Info
                    </Button>
                    <Button 
                       w="full" variant="ghost" justifyContent="start" h="54px" borderRadius="14px"
                       leftIcon={<FiCreditCard />} color={tokens.textMuted}
                    >
                       Payments
                    </Button>
                    <Button 
                       w="full" variant="ghost" justifyContent="start" h="54px" borderRadius="14px"
                       leftIcon={<FiBell />} color={tokens.textMuted}
                    >
                       Notifications
                    </Button>
                    <Button 
                       w="full" variant="ghost" justifyContent="start" h="54px" borderRadius="14px"
                       leftIcon={<FiShield />} color={tokens.textMuted}
                    >
                       Security
                    </Button>
                 </VStack>

                 <Button 
                    variant="ghost" color={tokens.danger} leftIcon={<FiLogOut />} 
                    w="full" justifyContent="start" mt={4}
                 >
                    Sign Out
                 </Button>
              </VStack>
            </GridItem>

            {/* Main Content Column */}
            <GridItem>
              <Box 
                bg={tokens.cardBg} p={10} borderRadius="32px" border="1px solid" borderColor={tokens.border}
                boxShadow={tokens.shadow}
              >
                 <VStack spacing={10} align="stretch">
                    <Box>
                       <Flex justify="space-between" align="center" mb={6}>
                          <Heading fontSize="18px">Personal Identity</Heading>
                          <Button size="sm" variant="outline" borderColor={tokens.border} leftIcon={<FiEdit2 />}>Edit</Button>
                       </Flex>
                       <SimpleGrid columns={[1, 2]} spacing={6}>
                          <FormControl>
                             <FormLabel fontSize="11px" fontWeight="700" color={tokens.textSubtle} textTransform="uppercase">Full Name</FormLabel>
                             <Input variant="filled" bg={tokens.pageBg} h="50px" borderRadius="14px" defaultValue="John Doe" readOnly />
                          </FormControl>
                          <FormControl>
                             <FormLabel fontSize="11px" fontWeight="700" color={tokens.textSubtle} textTransform="uppercase">Email Address</FormLabel>
                             <Input variant="filled" bg={tokens.pageBg} h="50px" borderRadius="14px" defaultValue="john.doe@example.com" readOnly />
                          </FormControl>
                          <FormControl>
                             <FormLabel fontSize="11px" fontWeight="700" color={tokens.textSubtle} textTransform="uppercase">Phone Number</FormLabel>
                             <Input variant="filled" bg={tokens.pageBg} h="50px" borderRadius="14px" defaultValue="+1 (555) 000-1234" readOnly />
                          </FormControl>
                          <FormControl>
                             <FormLabel fontSize="11px" fontWeight="700" color={tokens.textSubtle} textTransform="uppercase">Identity Verified</FormLabel>
                             <Flex h="50px" align="center" bg={tokens.successGlow} px={4} borderRadius="14px" border="1px solid" borderColor={tokens.success}>
                                <Icon as={FiShield} color={tokens.success} mr={2} />
                                <Text fontSize="14px" fontWeight="700" color={tokens.success}>Passport Verified</Text>
                             </Flex>
                          </FormControl>
                       </SimpleGrid>
                    </Box>

                    <Divider borderColor={tokens.border} opacity={0.3} />

                    <Box>
                       <Heading fontSize="18px" mb={6}>Preferences</Heading>
                       <VStack spacing={6} align="stretch">
                          <Flex justify="space-between" align="center">
                             <Box>
                                <Text fontWeight="600" fontSize="15px">Email Notifications</Text>
                                <Text fontSize="13px" color={tokens.textMuted}>Receive updates about your upcoming rentals</Text>
                             </Box>
                             <Switch colorScheme="brand" defaultChecked size="lg" />
                          </Flex>
                          <Flex justify="space-between" align="center">
                             <Box>
                                <Text fontWeight="600" fontSize="15px">SMS Alerts</Text>
                                <Text fontSize="13px" color={tokens.textMuted}>Get real-time trip status on your phone</Text>
                             </Box>
                             <Switch colorScheme="brand" size="lg" />
                          </Flex>
                          <Flex justify="space-between" align="center">
                             <Box>
                                <Text fontWeight="600" fontSize="15px">Biometric Sign-In</Text>
                                <Text fontSize="13px" color={tokens.textMuted}>Use FaceID or Fingerprint for faster access</Text>
                             </Box>
                             <Switch colorScheme="brand" defaultChecked size="lg" />
                          </Flex>
                       </VStack>
                    </Box>

                    <Box pt={4}>
                       <Button bg={tokens.accent} color="white" h="54px" px={10} borderRadius="16px" _hover={{ opacity: 0.9 }}>
                          Save Changes
                       </Button>
                    </Box>
                 </VStack>
              </Box>
            </GridItem>
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
}
