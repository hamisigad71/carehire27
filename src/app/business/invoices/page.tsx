'use client';

import { Box, Flex, Text, Button, Icon, HStack, SimpleGrid, Heading } from '@chakra-ui/react';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { DataTable } from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { FiFileText, FiDownload, FiDollarSign, FiClock, FiCheckSquare } from 'react-icons/fi';
import { useColorTokens } from '@/hooks/useColorTokens';
import { formatCurrency, formatDate } from '@/utils/format';

const stats = [
  { label: 'Total Invoiced', value: formatCurrency(124500), trend: 12.2, icon: FiDollarSign },
  { label: 'Paid Invoices', value: formatCurrency(98200), trend: 15.4, icon: FiCheckSquare },
  { label: 'Outstanding', value: formatCurrency(26300), trend: -5.1, icon: FiClock },
  { label: 'Avg. Invoice', value: formatCurrency(850), trend: 2.5, icon: FiFileText },
];

const invoices = [
  { id: 'INV-5001', customer: 'John Doe', amount: 750, date: 'Mar 10, 2026', due: 'Mar 25, 2026', status: 'Paid' },
  { id: 'INV-5002', customer: 'Sarah Smith', amount: 1800, date: 'Mar 09, 2026', due: 'Mar 24, 2026', status: 'Pending' },
  { id: 'INV-5003', customer: 'Mike Johnson', amount: 900, date: 'Mar 08, 2026', due: 'Mar 23, 2026', status: 'Paid' },
  { id: 'INV-5004', customer: 'Alice Wong', amount: 2500, date: 'Mar 07, 2026', due: 'Mar 22, 2026', status: 'Overdue' },
  { id: 'INV-5005', customer: 'David Brown', amount: 1920, date: 'Mar 06, 2026', due: 'Mar 21, 2026', status: 'Paid' },
];

const columns: any[] = [
  { header: 'Invoice ID', accessor: 'id', isSortable: true },
  { header: 'Customer', accessor: 'customer', isSortable: true },
  { 
    header: 'Amount', 
    accessor: (row: any) => <Text fontWeight="700">{formatCurrency(row.amount)}</Text>,
    isSortable: true
  },
  { header: 'Issue Date', accessor: 'date' },
  { header: 'Due Date', accessor: 'due' },
  { 
    header: 'Status', 
    accessor: (row: any) => <StatusBadge status={row.status} /> 
  },
];

export default function InvoicesPage() {
  const tokens = useColorTokens();

  return (
    <Box>
      <PageHeader 
        title="Invoices & Billing"
        subtitle="Manage customer billing and track payments."
        breadcrumbs={[
            { label: 'Business', href: '/business' },
            { label: 'Invoices', href: '/business/invoices' }
        ]}
        actionLabel="Export All"
        actionIcon={<FiDownload />}
      />

      <SimpleGrid columns={[1, 2, 4]} spacing={6} mb={10}>
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </SimpleGrid>

      <Box bg={tokens.cardBg} p={6} borderRadius="24px" boxShadow={tokens.shadow} border="1px solid" borderColor={tokens.border}>
        <Flex justify="space-between" align="center" mb={6}>
            <Box>
              <Heading fontSize="18px" fontWeight="700">Recent Invoices</Heading>
              <Text fontSize="13px" color={tokens.textMuted}>Detailed record of all billing activities</Text>
            </Box>
            <HStack spacing={2}>
              <Button size="sm" variant="outline" borderColor={tokens.border}>Filter</Button>
              <Button size="sm" variant="outline" borderColor={tokens.border}>Batch Print</Button>
            </HStack>
        </Flex>
        <DataTable columns={columns} data={invoices} onRowClick={(i) => console.log('Invoice Details', i)} />
      </Box>
    </Box>
  );
}
