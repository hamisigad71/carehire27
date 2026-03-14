'use client';

import { Box, Container } from '@chakra-ui/react';
import { useColorTokens } from '@/hooks/useColorTokens';

interface PageWrapperProps {
  children: React.ReactNode;
}

export const PageWrapper = ({ children }: PageWrapperProps) => {
  const tokens = useColorTokens();

  return (
    <Box as="main" flex={1} bg={tokens.pageBg} minH="100vh" py={8} px={[4, 6, 10]}>
      <Container maxW="1440px" p={0}>
        {children}
      </Container>
    </Box>
  );
};
