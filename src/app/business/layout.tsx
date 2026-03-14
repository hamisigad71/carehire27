'use client';

import { Flex, Box } from '@chakra-ui/react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';
import { PageWrapper } from '@/components/layout/PageWrapper';

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
  return (
    <Flex h="screen" bg="gray.50" overflow="hidden">
      <Sidebar />
      <Flex flex={1} direction="column" overflowY="auto">
        <Topbar />
        <PageWrapper>
          {children}
        </PageWrapper>
      </Flex>
    </Flex>
  );
}
