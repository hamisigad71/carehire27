"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  licensePlate: string;
  year: number;
  seats: number;
  transmission: "auto" | "manual";
  fuelType: string;
  dailyRate: number;
  status: "available" | "rented" | "maintenance";
  mileage: number;
  lastService: string;
  nextService: string;
  insurance: string;
  image?: string;
}

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  vehicleId: string;
  vehicleName: string;
  startDate: string;
  endDate: string;
  status: "pending" | "active" | "completed" | "cancelled";
  totalDays: number;
  dailyRate: number;
  totalAmount: number;
  paymentStatus: "pending" | "paid" | "failed";
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalRentals: number;
  totalSpent: number;
  loyaltyPoints: number;
  joinedDate: string;
  rating: number;
}

export interface BusinessMetrics {
  totalVehicles: number;
  availableVehicles: number;
  activeRentals: number;
  totalRevenue: number;
  monthlyRevenue: number;
  totalCustomers: number;
  fleetUtilization: number;
  avgDailyRate: number;
  pendingMaintenance: number;
  expiringInsurance: number;
}

interface BusinessContextType {
  // State
  vehicles: Vehicle[];
  bookings: Booking[];
  customers: Customer[];
  metrics: BusinessMetrics;
  loading: boolean;
  error: string | null;

  // Vehicle Actions
  addVehicle: (vehicle: Omit<Vehicle, "id">) => void;
  updateVehicle: (id: string, vehicle: Partial<Vehicle>) => void;
  deleteVehicle: (id: string) => void;
  getVehicleById: (id: string) => Vehicle | undefined;

  // Booking Actions
  createBooking: (booking: Omit<Booking, "id" | "createdAt">) => void;
  updateBooking: (id: string, booking: Partial<Booking>) => void;
  cancelBooking: (id: string) => void;
  getBookingById: (id: string) => Booking | undefined;
  getBookingsByVehicle: (vehicleId: string) => Booking[];
  getBookingsByCustomer: (customerId: string) => Booking[];

  // Customer Actions
  addCustomer: (customer: Omit<Customer, "id">) => void;
  updateCustomer: (id: string, customer: Partial<Customer>) => void;
  getCustomerById: (id: string) => Customer | undefined;

  // Metrics
  refreshMetrics: () => void;
  getRevenueByDate: () => Array<{ date: string; revenue: number }>;
  getRevenueByVehicle: () => Array<{ vehicle: string; revenue: number }>;

  // Filters
  filterBookingsByStatus: (status: Booking["status"]) => Booking[];
  filterVehiclesByStatus: (status: Vehicle["status"]) => Vehicle[];
}

const BusinessContext = createContext<BusinessContextType | undefined>(
  undefined,
);

// Mock data
const mockVehicles: Vehicle[] = [
  {
    id: "V001",
    brand: "Tesla",
    model: "Model 3",
    licensePlate: "KAB-123A",
    year: 2023,
    seats: 5,
    transmission: "auto",
    fuelType: "Electric",
    dailyRate: 5000,
    status: "available",
    mileage: 12500,
    lastService: "2025-02-15",
    nextService: "2025-05-15",
    insurance: "2027-03-13",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=400",
  },
  {
    id: "V002",
    brand: "BMW",
    model: "X5",
    licensePlate: "KAB-124B",
    year: 2023,
    seats: 7,
    transmission: "auto",
    fuelType: "Petrol",
    dailyRate: 8500,
    status: "rented",
    mileage: 15800,
    lastService: "2025-02-01",
    nextService: "2025-04-01",
    insurance: "2026-06-13",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400",
  },
  {
    id: "V003",
    brand: "Mercedes",
    model: "C-Class",
    licensePlate: "KAB-125C",
    year: 2022,
    seats: 5,
    transmission: "auto",
    fuelType: "Petrol",
    dailyRate: 7200,
    status: "maintenance",
    mileage: 32100,
    lastService: "2025-03-11",
    nextService: "2025-06-11",
    insurance: "2026-01-13",
    image: "https://images.unsplash.com/photo-1606320945062-85d5a305b9b1?w=400",
  },
  {
    id: "V004",
    brand: "Range Rover",
    model: "Sport",
    licensePlate: "KAB-126D",
    year: 2023,
    seats: 7,
    transmission: "auto",
    fuelType: "Petrol",
    dailyRate: 12000,
    status: "available",
    mileage: 8200,
    lastService: "2025-02-28",
    nextService: "2025-05-28",
    insurance: "2027-02-13",
    image: "https://images.unsplash.com/photo-1606664515524-2dab6c3f1201?w=400",
  },
];

const mockBookings: Booking[] = [
  {
    id: "BK-001",
    customerId: "C001",
    customerName: "John Doe",
    vehicleId: "V001",
    vehicleName: "Tesla Model 3",
    startDate: "2026-03-12",
    endDate: "2026-03-17",
    status: "active",
    totalDays: 5,
    dailyRate: 5000,
    totalAmount: 25000,
    paymentStatus: "paid",
    createdAt: "2026-03-10",
  },
  {
    id: "BK-002",
    customerId: "C002",
    customerName: "Sarah Smith",
    vehicleId: "V002",
    vehicleName: "BMW X5",
    startDate: "2026-03-13",
    endDate: "2026-03-20",
    status: "active",
    totalDays: 7,
    dailyRate: 8500,
    totalAmount: 59500,
    paymentStatus: "paid",
    createdAt: "2026-03-10",
  },
  {
    id: "BK-003",
    customerId: "C003",
    customerName: "Mike Johnson",
    vehicleId: "V004",
    vehicleName: "Range Rover Sport",
    startDate: "2026-03-14",
    endDate: "2026-03-16",
    status: "pending",
    totalDays: 2,
    dailyRate: 12000,
    totalAmount: 24000,
    paymentStatus: "pending",
    createdAt: "2026-03-11",
  },
  {
    id: "BK-004",
    customerId: "C001",
    customerName: "John Doe",
    vehicleId: "V003",
    vehicleName: "Mercedes C-Class",
    startDate: "2026-03-01",
    endDate: "2026-03-05",
    status: "completed",
    totalDays: 4,
    dailyRate: 7200,
    totalAmount: 28800,
    paymentStatus: "paid",
    createdAt: "2026-02-28",
  },
];

const mockCustomers: Customer[] = [
  {
    id: "C001",
    name: "John Doe",
    email: "john@example.com",
    phone: "+254 712 345 678",
    totalRentals: 12,
    totalSpent: 145000,
    loyaltyPoints: 2450,
    joinedDate: "2024-06-15",
    rating: 4.8,
  },
  {
    id: "C002",
    name: "Sarah Smith",
    email: "sarah@example.com",
    phone: "+254 722 456 789",
    totalRentals: 8,
    totalSpent: 98500,
    loyaltyPoints: 1850,
    joinedDate: "2024-09-20",
    rating: 4.9,
  },
  {
    id: "C003",
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "+254 733 567 890",
    totalRentals: 5,
    totalSpent: 62300,
    loyaltyPoints: 950,
    joinedDate: "2024-12-01",
    rating: 4.7,
  },
];

const calculateMetrics = (
  vehicles: Vehicle[],
  bookings: Booking[],
): BusinessMetrics => {
  const activeRentals = bookings.filter((b) => b.status === "active").length;
  const totalRevenue = bookings
    .filter((b) => b.status === "completed" || b.status === "active")
    .reduce((sum, b) => sum + b.totalAmount, 0);

  return {
    totalVehicles: vehicles.length,
    availableVehicles: vehicles.filter((v) => v.status === "available").length,
    activeRentals,
    totalRevenue,
    monthlyRevenue: totalRevenue * 0.3, // Approximation
    totalCustomers: mockCustomers.length,
    fleetUtilization: (activeRentals / vehicles.length) * 100,
    avgDailyRate:
      vehicles.reduce((sum, v) => sum + v.dailyRate, 0) / vehicles.length,
    pendingMaintenance: vehicles.filter((v) => v.status === "maintenance")
      .length,
    expiringInsurance: vehicles.filter(
      (v) =>
        new Date(v.insurance) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    ).length,
  };
};

export const BusinessProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState(() =>
    calculateMetrics(vehicles, bookings),
  );

  // Vehicle Actions
  const addVehicle = useCallback(
    (vehicle: Omit<Vehicle, "id">) => {
      const newVehicle = { ...vehicle, id: `V${Date.now()}` };
      setVehicles((prev) => [...prev, newVehicle]);
      setMetrics(calculateMetrics([...vehicles, newVehicle], bookings));
    },
    [vehicles, bookings],
  );

  const updateVehicle = useCallback(
    (id: string, updates: Partial<Vehicle>) => {
      setVehicles((prev) =>
        prev.map((v) => (v.id === id ? { ...v, ...updates } : v)),
      );
      const updated = vehicles.map((v) =>
        v.id === id ? { ...v, ...updates } : v,
      );
      setMetrics(calculateMetrics(updated, bookings));
    },
    [vehicles, bookings],
  );

  const deleteVehicle = useCallback(
    (id: string) => {
      setVehicles((prev) => prev.filter((v) => v.id !== id));
      const filtered = vehicles.filter((v) => v.id !== id);
      setMetrics(calculateMetrics(filtered, bookings));
    },
    [vehicles, bookings],
  );

  const getVehicleById = useCallback(
    (id: string) => vehicles.find((v) => v.id === id),
    [vehicles],
  );

  // Booking Actions
  const createBooking = useCallback(
    (booking: Omit<Booking, "id" | "createdAt">) => {
      const newBooking = {
        ...booking,
        id: `BK-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      setBookings((prev) => [...prev, newBooking]);
      setMetrics(calculateMetrics(vehicles, [...bookings, newBooking]));
    },
    [vehicles, bookings],
  );

  const updateBooking = useCallback(
    (id: string, updates: Partial<Booking>) => {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, ...updates } : b)),
      );
      const updated = bookings.map((b) =>
        b.id === id ? { ...b, ...updates } : b,
      );
      setMetrics(calculateMetrics(vehicles, updated));
    },
    [vehicles, bookings],
  );

  const cancelBooking = useCallback(
    (id: string) => {
      updateBooking(id, { status: "cancelled" });
    },
    [updateBooking],
  );

  const getBookingById = useCallback(
    (id: string) => bookings.find((b) => b.id === id),
    [bookings],
  );

  const getBookingsByVehicle = useCallback(
    (vehicleId: string) => bookings.filter((b) => b.vehicleId === vehicleId),
    [bookings],
  );

  const getBookingsByCustomer = useCallback(
    (customerId: string) => bookings.filter((b) => b.customerId === customerId),
    [bookings],
  );

  // Customer Actions
  const addCustomer = useCallback((customer: Omit<Customer, "id">) => {
    const newCustomer = { ...customer, id: `C${Date.now()}` };
    setCustomers((prev) => [...prev, newCustomer]);
  }, []);

  const updateCustomer = useCallback(
    (id: string, updates: Partial<Customer>) => {
      setCustomers((prev) =>
        prev.map((c) => (c.id === id ? { ...c, ...updates } : c)),
      );
    },
    [],
  );

  const getCustomerById = useCallback(
    (id: string) => customers.find((c) => c.id === id),
    [customers],
  );

  // Metrics & Filters
  const refreshMetrics = useCallback(() => {
    setMetrics(calculateMetrics(vehicles, bookings));
  }, [vehicles, bookings]);

  const getRevenueByDate = useCallback(() => {
    const revenueMap: Record<string, number> = {};
    bookings
      .filter((b) => b.status === "completed" || b.status === "active")
      .forEach((b) => {
        revenueMap[b.startDate] =
          (revenueMap[b.startDate] || 0) + b.totalAmount;
      });
    return Object.entries(revenueMap).map(([date, revenue]) => ({
      date,
      revenue,
    }));
  }, [bookings]);

  const getRevenueByVehicle = useCallback(() => {
    const revenueMap: Record<string, number> = {};
    const vehicleNames: Record<string, string> = {};
    bookings
      .filter((b) => b.status === "completed" || b.status === "active")
      .forEach((b) => {
        revenueMap[b.vehicleId] =
          (revenueMap[b.vehicleId] || 0) + b.totalAmount;
        vehicleNames[b.vehicleId] = b.vehicleName;
      });
    return Object.entries(revenueMap).map(([vehicleId, revenue]) => ({
      vehicle: vehicleNames[vehicleId],
      revenue,
    }));
  }, [bookings]);

  const filterBookingsByStatus = useCallback(
    (status: Booking["status"]) => bookings.filter((b) => b.status === status),
    [bookings],
  );

  const filterVehiclesByStatus = useCallback(
    (status: Vehicle["status"]) => vehicles.filter((v) => v.status === status),
    [vehicles],
  );

  const value: BusinessContextType = {
    vehicles,
    bookings,
    customers,
    metrics,
    loading,
    error,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    getVehicleById,
    createBooking,
    updateBooking,
    cancelBooking,
    getBookingById,
    getBookingsByVehicle,
    getBookingsByCustomer,
    addCustomer,
    updateCustomer,
    getCustomerById,
    refreshMetrics,
    getRevenueByDate,
    getRevenueByVehicle,
    filterBookingsByStatus,
    filterVehiclesByStatus,
  };

  return (
    <BusinessContext.Provider value={value}>
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusinessContext = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error("useBusinessContext must be used within BusinessProvider");
  }
  return context;
};
