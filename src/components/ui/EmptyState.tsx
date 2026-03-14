'use client';

import { Flex, Box, Text, Icon, VStack, Button } from '@chakra-ui/react';
import { FiInbox } from 'react-icons/fi';
import { useColorTokens } from '@/hooks/useColorTokens';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState = ({ title, description, actionLabel, onAction }: EmptyStateProps) => {
  const tokens = useColorTokens();

  return (
    <Flex 
        direction="column" align="center" justify="center" py={20} px={6}
        bg={tokens.cardBg} border="2px dashed" borderColor={tokens.border}
        borderRadius="24px" textAlign="center"
    >
      <Box 
        bg={tokens.cardBg2} borderRadius="full" p={6} mb={6}
        boxShadow={tokens.shadow}
      >
        <Icon as={FiInbox} boxSize={12} color={tokens.textSubtle} />
      </Box>
      <VStack spacing={2} maxW="400px">
        <Text fontSize="18px" fontWeight="700" color={tokens.textPrimary}>
            {title}
        </Text>
        <Text fontSize="14px" color={tokens.textMuted}>
            {description}
        </Text>
      </VStack>
      {actionLabel && (
        <Button 
            mt={8} colorScheme="brand" bg={tokens.accent} color="white"
            px={8} borderRadius="12px" onClick={onAction}
            _hover={{ opacity: 0.9, transform: 'translateY(-1px)' }}
        >
            {actionLabel}
        </Button>
      )}
    </Flex>
  );
};
