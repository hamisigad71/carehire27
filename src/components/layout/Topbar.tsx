'use client';

import { 
  Flex, Box, Input, Icon,
  IconButton, HStack, Badge, Text, useColorMode,
  InputGroup, InputLeftElement
} from '@chakra-ui/react';
import { FiSearch, FiBell, FiMoon, FiSun, FiSettings, FiUser } from 'react-icons/fi';
import { useColorTokens } from '@/hooks/useColorTokens';

export const Topbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const tokens = useColorTokens();

  return (
    <Flex
      as="header" align="center" justify="space-between" px={8} py={4}
      bg={tokens.sidebarBg} borderBottom="1px solid" borderColor={tokens.border}
      position="sticky" top={0} zIndex={5}
    >
      <Box w="300px">
        <InputGroup size="sm">
          <InputLeftElement pointerEvents="none">
            <FiSearch color={tokens.textMuted} />
          </InputLeftElement>
          <Input
            placeholder="Search fleet, bookings..."
            bg={tokens.cardBg2} border="none" borderRadius="8px"
            _placeholder={{ color: tokens.textSubtle, fontSize: '13px' }}
            _focus={{ boxShadow: `0 0 0 1px ${tokens.accent}` }}
          />
        </InputGroup>
      </Box>

      <HStack spacing={4}>
        <IconButton
          aria-label="Toggle Theme" size="sm" variant="ghost" 
          onClick={toggleColorMode} transition="all 0.2s" color={tokens.textMuted}
          _hover={{ bg: tokens.sidebarActive, color: tokens.accent }}
          icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
        />
        
        <Box position="relative">
          <IconButton
            aria-label="Notifications" size="sm" variant="ghost"
            color={tokens.textMuted} transition="all 0.2s"
            _hover={{ bg: tokens.sidebarActive, color: tokens.accent }}
            icon={<FiBell />}
          />
          <Badge
            position="absolute" top="6px" right="6px" w="8px" h="8px" 
            bg={tokens.accent} borderRadius="full" border="2px solid" borderColor={tokens.sidebarBg}
          />
        </Box>

        <HStack spacing={3} pl={4} borderLeft="1px solid" borderColor={tokens.border}>
          <Box textAlign="right" display={{ base: 'none', md: 'block' }}>
            <Text fontSize="12px" fontWeight="600" color={tokens.textPrimary}>Admin User</Text>
            <Text fontSize="10px" color={tokens.textMuted} fontWeight="500">Fleet Operations</Text>
          </Box>
          <Box boxSize="32px" borderRadius="full" bg="gray.100" display="flex" alignItems="center" justifyContent="center">
             <Icon as={FiUser} boxSize={4} color="gray.400" />
          </Box>
        </HStack>
      </HStack>
    </Flex>
  );
};
