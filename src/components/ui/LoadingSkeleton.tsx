'use client';

import { Skeleton, Stack, Box, SimpleGrid } from '@chakra-ui/react';

export const LoadingSkeleton = ({ type }: { type: 'table' | 'cards' | 'page' }) => {
  if (type === 'table') {
    return (
      <Stack spacing={4}>
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} h="60px" borderRadius="12px" />
        ))}
      </Stack>
    );
  }

  if (type === 'cards') {
    return (
      <SimpleGrid columns={[1, 2, 4]} spacing={6}>
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} h="140px" borderRadius="16px" />
        ))}
      </SimpleGrid>
    );
  }

  return (
    <Box>
      <Skeleton h="100px" mb={8} borderRadius="16px" />
      <SimpleGrid columns={[1, 2, 4]} spacing={6} mb={8}>
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} h="120px" borderRadius="16px" />
        ))}
      </SimpleGrid>
      <Skeleton h="400px" borderRadius="24px" />
    </Box>
  );
};
