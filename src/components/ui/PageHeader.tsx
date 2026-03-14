'use client';

import { 
  Box, Flex, Text, Breadcrumb, BreadcrumbItem, 
  BreadcrumbLink, Heading, Button, HStack 
} from '@chakra-ui/react';
import { FiChevronRight } from 'react-icons/fi';
import { useColorTokens } from '@/hooks/useColorTokens';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs: { label: string; href: string }[];
  actionLabel?: string;
  onAction?: () => void;
  actionIcon?: any;
}

export const PageHeader = ({ 
  title, subtitle, breadcrumbs, actionLabel, onAction, actionIcon 
}: PageHeaderProps) => {
  const tokens = useColorTokens();

  return (
    <Box mb={8} pb={6} borderBottom="1px solid" borderColor={tokens.border}>
      <Breadcrumb 
        spacing="8px" separator={<FiChevronRight color={tokens.textSubtle} />}
        mb={2} fontSize="12px" color={tokens.textSubtle}
      >
        {breadcrumbs.map((bc, idx) => (
          <BreadcrumbItem key={idx}>
            <BreadcrumbLink 
                href={bc.href} transition="all 0.2s"
                _hover={{ color: tokens.accent, textDecoration: 'none' }}
            >
              {bc.label}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>

      <Flex justify="space-between" align="center">
        <Box>
          <Heading 
            fontSize="24px" fontWeight="700" letterSpacing="-0.02em" color={tokens.textPrimary}
          >
            {title}
          </Heading>
          {subtitle && (
            <Text fontSize="14px" color={tokens.textMuted} mt={1}>
              {subtitle}
            </Text>
          )}
        </Box>
        {actionLabel && (
          <Button
            leftIcon={actionIcon} colorScheme="brand" bg={tokens.accent} 
            color="white" px={6} size="md" onClick={onAction}
            boxShadow={tokens.accentGlow} _hover={{ opacity: 0.9, transform: 'translateY(-1px)' }}
          >
            {actionLabel}
          </Button>
        )}
      </Flex>
    </Box>
  );
};
