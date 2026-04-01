'use client';

import {
  Box, Container, Heading, Text, VStack, Button, Icon, SimpleGrid,
  Flex, HStack, Grid, GridItem, Avatar, Switch, IconButton, Circle,
} from '@chakra-ui/react';
import {
  FiUser, FiCamera, FiEdit2, FiShield, FiBell, FiLogOut,
  FiCreditCard, FiAward, FiCheckCircle, FiMail, FiPhone,
  FiCalendar, FiMapPin, FiChevronRight, FiLock, FiActivity,
  FiStar, FiAlertCircle,
} from 'react-icons/fi';
import { useState } from 'react';

const L = {
  bg:'#f4f7f4', card:'#ffffff', cardBorder:'rgba(30,110,30,0.1)',
  accent:'#1e6e1e', accentLight:'#2d8c2d',
  accentGlow:'rgba(30,110,30,0.08)', accentGlow2:'rgba(30,110,30,0.14)', accentGlow3:'rgba(30,110,30,0.22)',
  text:'#111a11', textSub:'#3a4d3a', muted:'#6b7f6b', subtle:'#9aaa9a',
  border:'rgba(0,0,0,0.07)', borderMid:'rgba(30,110,30,0.15)',
  shadow:'0 1px 12px rgba(0,0,0,0.06)', shadowMd:'0 4px 24px rgba(0,0,0,0.09)',
  shadowGreen:'0 8px 32px rgba(30,110,30,0.14)', bg2:'#eef3ee',
  blue:'#1a56a0', blueBg:'rgba(26,86,160,0.08)',
  gold:'#b07d0a', goldBg:'rgba(176,125,10,0.08)', goldBorder:'rgba(176,125,10,0.2)',
  red:'#c0392b', redBg:'rgba(192,57,43,0.07)', redBorder:'rgba(192,57,43,0.18)',
  green:'#15803d', greenBg:'rgba(21,128,61,0.08)', greenBorder:'rgba(21,128,61,0.2)',
  orange:'#c05c00', orangeBg:'rgba(192,92,0,0.08)',
};

export default function CustomerProfilePage() {
  const [activeNav, setActiveNav] = useState('personal');

  const NAV = [
    { id:'personal', icon:FiUser, label:'Personal Info' },
    { id:'payments', icon:FiCreditCard, label:'Payments' },
    { id:'notifications', icon:FiBell, label:'Notifications' },
    { id:'security', icon:FiShield, label:'Security' },
  ];

  const STATS = [
    { label:'Rentals', value:'18', icon:FiActivity, color:L.accentLight, bg:L.accentGlow2 },
    { label:'Points', value:'2,450', icon:FiStar, color:L.gold, bg:L.goldBg },
    { label:'Member', value:'Mar 22', icon:FiCalendar, color:L.blue, bg:L.blueBg },
  ];

  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        .fu  { animation:fadeUp .5s ease both }
        .fu1 { animation:fadeUp .5s .07s ease both }
        .fu2 { animation:fadeUp .5s .14s ease both }
        .nav-item { transition:background .15s ease; cursor:pointer; border-radius:14px }
        .nav-item:hover { background:${L.accentGlow} !important }
        .nav-item.on { background:${L.accentGlow2} !important; box-shadow:inset 0 0 0 1px ${L.borderMid} }
        .frow { transition:background .15s ease; border-radius:14px; border:1px solid ${L.border}; background:${L.bg} }
        .frow:hover { background:${L.accentGlow} !important }
        .prow { transition:background .15s ease; border-radius:14px; padding:14px 16px }
        .prow:hover { background:${L.accentGlow} !important }
        .srow { transition:background .15s ease; border-radius:14px; border:1px solid ${L.border}; background:${L.bg} }
        .srow:hover { background:${L.accentGlow} !important }
        .savebtn { transition:all .22s cubic-bezier(.22,1,.36,1) !important }
        .savebtn:hover { transform:translateY(-2px) !important; box-shadow:0 12px 32px rgba(30,110,30,0.28) !important }
        .signout { transition:background .15s ease; cursor:pointer; border-radius:12px }
        .signout:hover { background:${L.redBg} !important }
        .statbox { transition:transform .2s ease,box-shadow .2s ease }
        .statbox:hover { transform:translateY(-3px); box-shadow:0 8px 24px rgba(0,0,0,0.08) !important }
      `}</style>

      <Box minH="100vh" bg={L.bg} py={{ base:6, md:10 }}>
        <Container maxW="1060px" px={{ base:4, md:6 }}>
          <VStack align="stretch" spacing={6}>

            {/* Header */}
            <Box className="fu">
              <HStack spacing={2} mb={1}>
                <Box w="7px" h="7px" borderRadius="full" bg={L.accentLight} />
                <Text fontSize="11px" fontWeight="700" color={L.accentLight} textTransform="uppercase" letterSpacing=".12em">Account Settings</Text>
              </HStack>
              <Heading fontSize={{ base:'26px', md:'34px' }} fontWeight="900" color={L.text} letterSpacing="-0.03em" lineHeight="1.1">My Profile</Heading>
              <Text fontSize="13px" color={L.muted} mt={1}>Manage your identity, security preferences and notification settings</Text>
            </Box>

            <Grid templateColumns={{ base:'1fr', lg:'272px 1fr' }} gap={5}>

              {/* Sidebar */}
              <Box className="fu1">
                <VStack spacing={4} align="stretch">

                  {/* Profile card */}
                  <Box bg={L.card} borderRadius="20px" border="1px solid" borderColor={L.cardBorder} boxShadow={L.shadow} p={{ base:5, md:6 }} position="relative" overflow="hidden">
                    <Box position="absolute" top={0} left={0} w="60px" h="60px" bg={`radial-gradient(circle at top left,${L.accentGlow2},transparent 70%)`} pointerEvents="none" zIndex={0} />
                    <VStack spacing={4} align="center" position="relative" zIndex={1}>

                      {/* Avatar */}
                      <Box position="relative">
                        <Box borderRadius="26px" overflow="hidden" w="84px" h="84px" border="3px solid" borderColor={L.borderMid} boxShadow={L.shadowGreen}>
                          <Avatar size="full" name="John Doe" src="https://i.pinimg.com/736x/ec/24/1b/ec241b8218d6fa02be5e76dea9d0e3ce.jpg" borderRadius="0" />
                        </Box>
                        <IconButton aria-label="Change photo" icon={<Icon as={FiCamera} boxSize={3} />}
                          position="absolute" bottom="-5px" right="-5px" w="26px" h="26px" minW="26px" size="xs"
                          bg={L.accentLight} color="white" borderRadius="9px" border="2px solid white" _hover={{ bg:L.accent }} />
                      </Box>

                      {/* Name */}
                      <Box textAlign="center">
                        <Text fontSize="16px" fontWeight="800" color={L.text} mb={1.5}>John Doe</Text>
                        <Flex display="inline-flex" alignItems="center" px={3} py={1} bg={L.goldBg} borderRadius="full" border="1px solid" borderColor={L.goldBorder}>
                          <Icon as={FiAward} boxSize={3} color={L.gold} mr={1.5} />
                          <Text fontSize="10px" fontWeight="800" color={L.gold} textTransform="uppercase" letterSpacing=".08em">Elite Gold Member</Text>
                        </Flex>
                      </Box>

                      {/* Quick stats */}
                      <SimpleGrid columns={3} spacing={2} w="full">
                        {STATS.map(s => (
                          <Box key={s.label} className="statbox" bg={L.bg} borderRadius="12px" border="1px solid" borderColor={L.border} boxShadow={L.shadow} p={2.5} textAlign="center">
                            <Icon as={s.icon} boxSize={3.5} color={s.color} mb={1} />
                            <Text fontSize="13px" fontWeight="800" color={L.text} lineHeight="1">{s.value}</Text>
                            <Text fontSize="9px" color={L.muted} mt={0.5}>{s.label}</Text>
                          </Box>
                        ))}
                      </SimpleGrid>
                    </VStack>
                  </Box>

                  {/* Nav */}
                  <Box bg={L.card} borderRadius="20px" border="1px solid" borderColor={L.cardBorder} boxShadow={L.shadow} p={3} position="relative" overflow="hidden">
                    <Box position="absolute" top={0} left={0} w="60px" h="60px" bg={`radial-gradient(circle at top left,${L.accentGlow2},transparent 70%)`} pointerEvents="none" zIndex={0} />
                    <VStack spacing={1} align="stretch" position="relative" zIndex={1}>
                      {NAV.map(n => (
                        <Flex key={n.id} className={`nav-item${activeNav===n.id?' on':''}`}
                          align="center" justify="space-between" px={4} py={3} onClick={() => setActiveNav(n.id)}>
                          <HStack spacing={3}>
                            <Circle size="30px" bg={activeNav===n.id ? L.accentGlow3 : L.bg} border="1px solid" borderColor={activeNav===n.id ? L.borderMid : L.border}>
                              <Icon as={n.icon} boxSize={3.5} color={activeNav===n.id ? L.accentLight : L.muted} />
                            </Circle>
                            <Text fontSize="13px" fontWeight="700" color={activeNav===n.id ? L.accentLight : L.muted}>{n.label}</Text>
                          </HStack>
                          <Icon as={FiChevronRight} boxSize={3.5} color={activeNav===n.id ? L.accentLight : L.subtle} />
                        </Flex>
                      ))}
                    </VStack>

                    <Box h="1px" bg={L.border} my={3} mx={2} />

                    <Flex className="signout" align="center" px={4} py={3} position="relative" zIndex={1}>
                      <Circle size="30px" bg={L.redBg} border="1px solid" borderColor={L.redBorder} mr={3}>
                        <Icon as={FiLogOut} boxSize={3.5} color={L.red} />
                      </Circle>
                      <Text fontSize="13px" fontWeight="700" color={L.red}>Sign Out</Text>
                    </Flex>
                  </Box>
                </VStack>
              </Box>

              {/* Main content */}
              <Box className="fu2">
                <VStack spacing={5} align="stretch">

                  {/* Personal Identity */}
                  <Box bg={L.card} borderRadius="20px" border="1px solid" borderColor={L.cardBorder} boxShadow={L.shadow} p={{ base:5, md:7 }} position="relative" overflow="hidden">
                    <Box position="absolute" top={0} left={0} w="60px" h="60px" bg={`radial-gradient(circle at top left,${L.accentGlow2},transparent 70%)`} pointerEvents="none" zIndex={0} />
                    <Box position="relative" zIndex={1}>
                      <Flex align="center" justify="space-between" mb={5}>
                        <Box>
                          <Text fontSize="15px" fontWeight="800" color={L.text}>Personal Identity</Text>
                          <Text fontSize="12px" color={L.muted} mt={0.5}>Your verified account information</Text>
                        </Box>
                        <Button size="sm" h="34px" px={4} bg={L.accentGlow2} color={L.accentLight} borderRadius="10px" fontWeight="700" fontSize="12px" border="1px solid" borderColor={L.borderMid} leftIcon={<Icon as={FiEdit2} boxSize={3.5} />} _hover={{ bg:L.accentGlow3 }} transition="all .2s">Edit</Button>
                      </Flex>

                      <SimpleGrid columns={{ base:1, md:2 }} spacing={3} mb={3}>
                        {[
                          { icon:FiUser,   label:'Full Name',    value:'John Doe' },
                          { icon:FiMail,   label:'Email',        value:'john.doe@example.com' },
                          { icon:FiPhone,  label:'Phone Number', value:'+1 (555) 000-1234' },
                          { icon:FiMapPin, label:'Location',     value:'Nairobi, Kenya' },
                        ].map(f => (
                          <Box key={f.label} className="frow" px={4} py={3.5}>
                            <HStack spacing={3}>
                              <Circle size="34px" bg={L.accentGlow2} border="1px solid" borderColor={L.borderMid} sx={{ flexShrink:0 }}>
                                <Icon as={f.icon} boxSize={3.5} color={L.accentLight} />
                              </Circle>
                              <Box flex={1} minW={0}>
                                <Text fontSize="10px" fontWeight="700" color={L.muted} textTransform="uppercase" letterSpacing=".08em" mb={0.5}>{f.label}</Text>
                                <Text fontSize="14px" fontWeight="700" color={L.text} noOfLines={1}>{f.value}</Text>
                              </Box>
                            </HStack>
                          </Box>
                        ))}
                      </SimpleGrid>

                      {/* verified row */}
                      <Box px={4} py={3.5} borderRadius="14px" bg={L.greenBg} border="1px solid" borderColor={L.greenBorder}>
                        <Flex align="center" justify="space-between">
                          <HStack spacing={3}>
                            <Circle size="34px" bg="rgba(21,128,61,0.15)" border="1px solid" borderColor={L.greenBorder}>
                              <Icon as={FiShield} boxSize={3.5} color={L.green} />
                            </Circle>
                            <Box>
                              <Text fontSize="13px" fontWeight="800" color={L.green}>Identity Verified</Text>
                              <Text fontSize="11px" color={L.green} opacity={0.8}>Passport verified · 14 Jan 2025</Text>
                            </Box>
                          </HStack>
                          <Box px={2.5} py={1} bg="rgba(21,128,61,0.12)" borderRadius="8px" border="1px solid" borderColor={L.greenBorder}>
                            <Text fontSize="10px" fontWeight="800" color={L.green} textTransform="uppercase" letterSpacing=".06em">✓ Active</Text>
                          </Box>
                        </Flex>
                      </Box>
                    </Box>
                  </Box>

                  {/* Loyalty */}
                  <Box borderRadius="20px" overflow="hidden" boxShadow={L.shadowGreen} border="1px solid" borderColor={L.borderMid}>
                    <Box bg="linear-gradient(135deg,#1e6e1e 0%,#2d8c2d 55%,#3a9c3a 100%)" px={{ base:5, md:7 }} py={5} position="relative" overflow="hidden">
                      <Box position="absolute" top={0} right={0} bottom={0} left={0} opacity={0.07} bgImage="linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)" bgSize="40px 40px" pointerEvents="none" />
                      <Flex align="center" justify="space-between" position="relative" zIndex={1}>
                        <Box>
                          <Text fontSize="10px" fontWeight="700" color="rgba(255,255,255,0.65)" textTransform="uppercase" letterSpacing=".12em" mb={1}>Loyalty Balance</Text>
                          <Text fontSize="28px" fontWeight="900" color="white" lineHeight="1" letterSpacing="-0.03em">2,450 pts</Text>
                          <Text fontSize="12px" color="rgba(255,255,255,0.65)" mt={1}>≈ 1 free rental day · Platinum at 3,000</Text>
                        </Box>
                        <Box textAlign="right">
                          <Circle size="52px" bg="rgba(255,255,255,0.15)" border="1px solid rgba(255,255,255,0.2)">
                            <Text fontSize="24px">🏆</Text>
                          </Circle>
                          <Text fontSize="10px" color="rgba(255,255,255,0.7)" mt={1.5} fontWeight="700">GOLD TIER</Text>
                        </Box>
                      </Flex>
                      <Box mt={4} h="5px" bg="rgba(255,255,255,0.2)" borderRadius="full" overflow="hidden">
                        <Box h="100%" borderRadius="full" bg="linear-gradient(90deg,rgba(168,212,168,0.9),white)" style={{ width:'82%' }} />
                      </Box>
                      <Flex justify="space-between" mt={1.5}>
                        <Text fontSize="10px" color="rgba(255,255,255,0.55)">Gold (2,450)</Text>
                        <Text fontSize="10px" color="rgba(255,255,255,0.55)">Platinum (3,000)</Text>
                      </Flex>
                    </Box>
                  </Box>

                  {/* Preferences */}
                  <Box bg={L.card} borderRadius="20px" border="1px solid" borderColor={L.cardBorder} boxShadow={L.shadow} p={{ base:5, md:7 }} position="relative" overflow="hidden">
                    <Box position="absolute" top={0} left={0} w="60px" h="60px" bg={`radial-gradient(circle at top left,${L.accentGlow2},transparent 70%)`} pointerEvents="none" zIndex={0} />
                    <Box position="relative" zIndex={1}>
                      <Text fontSize="15px" fontWeight="800" color={L.text} mb={1}>Preferences</Text>
                      <Text fontSize="12px" color={L.muted} mb={4}>Control how and when we reach you</Text>
                      <VStack spacing={0} align="stretch" divider={<Box h="1px" bg={L.border} />}>
                        {[
                          { label:'Email Notifications', sub:'Receive booking confirmations and rental updates', checked:true  },
                          { label:'SMS Alerts',          sub:'Get real-time trip status directly on your phone', checked:false },
                          { label:'Biometric Sign-In',   sub:'Use Face ID or Fingerprint for faster access',    checked:true  },
                          { label:'Marketing Emails',    sub:'Exclusive offers, new vehicles and loyalty promotions', checked:false },
                        ].map(p => (
                          <Flex key={p.label} className="prow" justify="space-between" align="center">
                            <Box flex={1} mr={4}>
                              <Text fontSize="14px" fontWeight="700" color={L.text}>{p.label}</Text>
                              <Text fontSize="12px" color={L.muted} mt={0.5}>{p.sub}</Text>
                            </Box>
                            <Switch defaultChecked={p.checked}
                              sx={{ '& .chakra-switch__track[data-checked]':{ background:L.accentLight } }}
                              size="md" />
                          </Flex>
                        ))}
                      </VStack>
                    </Box>
                  </Box>

                  {/* Security */}
                  <Box bg={L.card} borderRadius="20px" border="1px solid" borderColor={L.cardBorder} boxShadow={L.shadow} p={{ base:5, md:7 }} position="relative" overflow="hidden">
                    <Box position="absolute" top={0} left={0} w="60px" h="60px" bg={`radial-gradient(circle at top left,${L.accentGlow2},transparent 70%)`} pointerEvents="none" zIndex={0} />
                    <Box position="relative" zIndex={1}>
                      <Flex align="center" justify="space-between" mb={5}>
                        <Box>
                          <Text fontSize="15px" fontWeight="800" color={L.text}>Security</Text>
                          <Text fontSize="12px" color={L.muted} mt={0.5}>Protect your account</Text>
                        </Box>
                        <Box px={2.5} py={1} bg={L.greenBg} borderRadius="8px" border="1px solid" borderColor={L.greenBorder}>
                          <Text fontSize="10px" fontWeight="800" color={L.green}>Secure</Text>
                        </Box>
                      </Flex>
                      <VStack spacing={2.5} align="stretch">
                        {[
                          { icon:FiLock,        label:'Password',        value:'Last changed 30 days ago',  warn:false },
                          { icon:FiShield,      label:'Two-Factor Auth', value:'Enabled via SMS',           warn:false },
                          { icon:FiActivity,    label:'Active Sessions', value:'2 devices signed in',       warn:true  },
                          { icon:FiAlertCircle, label:'Login History',   value:'Last login: Today, 9:41am', warn:false },
                        ].map(r => (
                          <Flex key={r.label} className="srow" align="center" px={4} py={3}>
                            <Circle size="34px" bg={r.warn ? L.orangeBg : L.greenBg} border="1px solid" borderColor={r.warn ? 'rgba(192,92,0,0.2)' : L.greenBorder} mr={3} sx={{ flexShrink:0 }}>
                              <Icon as={r.icon} boxSize={3.5} color={r.warn ? L.orange : L.green} />
                            </Circle>
                            <Box flex={1}>
                              <Text fontSize="13px" fontWeight="700" color={L.text}>{r.label}</Text>
                              <Text fontSize="11px" color={L.muted}>{r.value}</Text>
                            </Box>
                            <Icon as={FiChevronRight} boxSize={3.5} color={L.subtle} />
                          </Flex>
                        ))}
                      </VStack>
                    </Box>
                  </Box>

                  {/* Save */}
                  <Flex gap={3} flexWrap="wrap">
                    <Button className="savebtn" h="50px" px={8} bg="linear-gradient(135deg,#1e6e1e,#2d8c2d)" color="white" borderRadius="14px" fontSize="14px" fontWeight="800" boxShadow="0 4px 16px rgba(30,110,30,0.25)" leftIcon={<Icon as={FiCheckCircle} boxSize={4} />} _hover={{}} _active={{ transform:'scale(0.98)' }}>
                      Save Changes
                    </Button>
                    <Button h="50px" px={6} bg={L.bg} color={L.muted} borderRadius="14px" fontSize="14px" fontWeight="700" border="1px solid" borderColor={L.border} _hover={{ bg:L.accentGlow, color:L.accentLight, borderColor:L.borderMid }} transition="all .2s">
                      Discard
                    </Button>
                  </Flex>

                </VStack>
              </Box>
            </Grid>
          </VStack>
        </Container>
      </Box>
    </>
  );
}