'use client';

import { 
  Box, Flex, Text, Icon, IconButton, HStack, 
  Spinner, Stack, Skeleton, VStack 
} from '@chakra-ui/react';
import { FiChevronUp, FiChevronDown, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useColorTokens } from '@/hooks/useColorTokens';
import { useState } from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  isSortable?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  onRowClick?: (item: T) => void;
}

export const DataTable = <T extends { id: string | number }>({ 
  columns, data, isLoading, onRowClick 
}: DataTableProps<T>) => {
  const tokens = useColorTokens();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (isLoading) {
    return (
      <Stack spacing={4}>
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} h="60px" borderRadius="12px" />
        ))}
      </Stack>
    );
  }

  return (
    <Box 
      bg={tokens.cardBg} border="1px solid" borderColor={tokens.border} 
      borderRadius="16px" overflow="hidden" boxShadow={tokens.shadow}
    >
      <Box overflowX="auto">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: tokens.cardBg2 }}>
              {columns.map((col, idx) => (
                <th 
                  key={idx}
                  style={{
                    padding: '16px',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.10em',
                    color: tokens.textMuted,
                    borderBottom: `1px solid ${tokens.border}`,
                    textAlign: 'left'
                  }}
                >
                  <Flex align="center">
                    {col.header}
                    {col.isSortable && (
                      <VStack spacing={0} ml={2} color={tokens.textSubtle}>
                        <Icon as={FiChevronUp} boxSize={2} />
                        <Icon as={FiChevronDown} boxSize={2} />
                      </VStack>
                    )}
                  </Flex>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr 
                key={item.id}
                onClick={() => onRowClick?.(item)}
                style={{
                  cursor: onRowClick ? 'pointer' : 'default',
                  transition: 'all 0.2s',
                  backgroundColor: tokens.cardBg,
                }}
                onMouseEnter={(e) => {
                  if (onRowClick) e.currentTarget.style.backgroundColor = tokens.tableHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = tokens.cardBg;
                }}
              >
                {columns.map((col, idx) => (
                  <td 
                    key={idx}
                    style={{
                      padding: '16px',
                      fontSize: '14px',
                      color: tokens.textPrimary,
                      borderBottom: `1px solid ${tokens.border}`
                    }}
                  >
                    {typeof col.accessor === 'function' 
                      ? col.accessor(item) 
                      : (item[col.accessor] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Box>

      {/* Pagination */}
      <Flex 
        px={6} py={4} align="center" justify="space-between" 
        bg={tokens.sidebarBg} borderTop="1px solid" borderColor={tokens.border}
      >
        <Text fontSize="13px" color={tokens.textMuted}>
          Showing <Text as="span" fontWeight="600" color={tokens.textPrimary}>1</Text> to 
          <Text as="span" fontWeight="600" color={tokens.textPrimary}> {data.length} </Text> 
          of <Text as="span" fontWeight="600" color={tokens.textPrimary}>{data.length}</Text> entries
        </Text>
        <HStack spacing={2}>
          <IconButton
            aria-label="Prev" size="sm" variant="ghost"
            isDisabled border="1px solid" borderColor={tokens.border}
            icon={<FiChevronLeft />}
          />
          <IconButton
            aria-label="Next" size="sm" variant="ghost"
            isDisabled border="1px solid" borderColor={tokens.border}
            icon={<FiChevronRight />}
          />
        </HStack>
      </Flex>
    </Box>
  );
};
