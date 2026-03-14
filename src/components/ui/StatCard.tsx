'use client';

import { Box, Flex, Text, Icon } from '@chakra-ui/react';
import { useColorTokens } from '@/hooks/useColorTokens';
import { IconType } from 'react-icons';

interface StatCardProps {
  label: string;
  value: string | number;
  trend: number;
  icon: IconType;
}

export const StatCard = ({ label, value, trend, icon }: StatCardProps) => {
  const tokens = useColorTokens();
  const isPositive = trend > 0;

  return (
    <Box
      bg={tokens.cardBg} border="1px solid" borderColor={tokens.border}
      borderRadius="16px" p={6}
      boxShadow={tokens.shadow} transition="all 0.25s ease"
      _hover={{ boxShadow: tokens.shadowHover, transform: 'translateY(-2px)', borderColor: tokens.accent }}
      cursor="default"
    >
      <Flex justify="space-between" align="flex-start">
        <Box>
          <Text fontSize="11px" fontWeight="600" letterSpacing="0.10em"
                textTransform="uppercase" color={tokens.textMuted} mb={1}>
            {label}
          </Text>
          <Text fontSize="28px" fontWeight="700" letterSpacing="-0.03em" color={tokens.textPrimary}>
            {value}
          </Text>
          <Text fontSize="12px" color={isPositive ? tokens.success : tokens.danger} mt={1} fontWeight="500">
            {isPositive ? '↑' : '↓'} {Math.abs(trend)}% vs last month
          </Text>
        </Box>
        <Box bg={tokens.accentGlow} borderRadius="12px" p={3}>
          <Icon as={icon} boxSize={5} color={tokens.accent} />
        </Box>
      </Flex>
    </Box>
  );
};
