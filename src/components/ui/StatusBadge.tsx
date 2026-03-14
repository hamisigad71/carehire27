'use client';

import { Badge } from '@chakra-ui/react';
import { useColorTokens } from '@/hooks/useColorTokens';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const tokens = useColorTokens();

  const getStatusConfig = () => {
    const s = status.toLowerCase();
    if (s.includes('available') || s.includes('active') || s.includes('completed')) {
      return { color: tokens.success, bg: 'rgba(0,168,85,0.1)' };
    }
    if (s.includes('maintenance') || s.includes('warning') || s.includes('pending')) {
      return { color: tokens.warning, bg: 'rgba(214,158,46,0.1)' };
    }
    if (s.includes('rented') || s.includes('cancelled') || s.includes('danger')) {
      return { color: tokens.danger, bg: 'rgba(229,62,62,0.1)' };
    }
    return { color: tokens.textMuted, bg: tokens.cardBg2 };
  };

  const config = getStatusConfig();

  return (
   <Badge
  px="3"
  py="1"
  borderRadius="full"
  fontSize="11px"
  fontWeight="semibold"
  letterSpacing="0.04em"
  textTransform="capitalize"
  color={config.color}
  bg={config.bg}
  border="1px solid"
  borderColor={config.color}
>
  {status}
</Badge>
  );
};
