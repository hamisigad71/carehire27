"use client";

import {
  Box,
  Flex,
  Text,
  Button,
  Icon,
  HStack,
  SimpleGrid,
  Heading,
} from "@chakra-ui/react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  FiDollarSign,
  FiLogOut,
  FiLogIn,
  FiRepeat,
  FiDownload,
} from "react-icons/fi";
import { useColorTokens } from "@/hooks/useColorTokens";
import { formatCurrency, formatDate } from "@/utils/format";

const transactions = [
  {
    id: "TX-9001",
    type: "Credit",
    amount: 450,
    category: "Booking Payment",
    date: "Mar 10, 2026",
    method: "Visa •••• 4242",
  },
  {
    id: "TX-9002",
    type: "Debit",
    amount: 120,
    category: "Fuel Reimbursement",
    date: "Mar 09, 2026",
    method: "Bank Transfer",
  },
  {
    id: "TX-9003",
    type: "Credit",
    amount: 1200,
    category: "Booking Payment",
    date: "Mar 09, 2026",
    method: "PayPal",
  },
  {
    id: "TX-9004",
    type: "Debit",
    amount: 45,
    category: "Toll Fees",
    date: "Mar 08, 2026",
    method: "Auto-Pay",
  },
  {
    id: "TX-9005",
    type: "Credit",
    amount: 300,
    category: "Security Deposit",
    date: "Mar 08, 2026",
    method: "Visa •••• 1111",
  },
];

const columns: any[] = [
  { header: "TX ID", accessor: "id", isSortable: true },
  {
    header: "Type",
    accessor: (row: any) => (
      <HStack spacing={2}>
        <Icon
          as={row.type === "Credit" ? FiLogIn : FiLogOut}
          color={row.type === "Credit" ? "emerald.500" : "red.500"}
        />
        <Text fontWeight="600">{row.type}</Text>
      </HStack>
    ),
  },
  { header: "Category", accessor: "category" },
  {
    header: "Amount",
    accessor: (row: any) => (
      <Text
        fontWeight="700"
        color={row.type === "Credit" ? "emerald.600" : "red.600"}
      >
        {row.type === "Credit" ? "+" : "-"}
        {formatCurrency(row.amount)}
      </Text>
    ),
  },
  { header: "Date", accessor: "date" },
  { header: "Method", accessor: "method" },
];

export default function TransactionHistoryPage() {
  const tokens = useColorTokens();

  return (
    <Box>
      <PageHeader
        title="Transaction History"
        subtitle="Complete audit trail of all financial movements."
        breadcrumbs={[
          { label: "Business", href: "/business" },
          { label: "Finance", href: "/business/finance_dashboard" },
          { label: "Transactions", href: "/business/transaction_history" },
        ]}
        actionLabel="Download Ledger"
        actionIcon={<FiDownload />}
      />

      <SimpleGrid columns={[1, 2, 4]} spacing={6} mb={10}>
        <StatCard
          label="Total Inflow"
          value={formatCurrency(124500)}
          trend={12.5}
          icon={FiLogIn as any}
        />
        <StatCard
          label="Total Outflow"
          value={formatCurrency(42000)}
          trend={-2.1}
          icon={FiLogOut as any}
        />
        <StatCard
          label="Net Movement"
          value={formatCurrency(82500)}
          trend={8.4}
          icon={FiRepeat as any}
        />
        <StatCard
          label="Pending TX"
          value="5"
          trend={0}
          icon={FiClock as any}
        />
      </SimpleGrid>

      <Box
        bg={tokens.cardBg}
        p={6}
        borderRadius="24px"
        boxShadow={tokens.shadow}
        border="1px solid"
        borderColor={tokens.border}
      >
        <Flex justify="space-between" align="center" mb={6}>
          <Box>
            <Heading fontSize="18px" fontWeight="700">
              Financial Ledger
            </Heading>
            <Text fontSize="13px" color={tokens.textMuted}>
              Detailed log of credits, debits, and refunds
            </Text>
          </Box>
          <Button size="sm" variant="outline" borderColor={tokens.border}>
            Filter by Date
          </Button>
        </Flex>
        <DataTable columns={columns} data={transactions} />
      </Box>
    </Box>
  );
}

import { FiClock } from "react-icons/fi";
