// Mock API Layer for Business Portal
// In production, these would connect to real API endpoints

import {
  Vehicle,
  Booking,
  Customer,
  BusinessMetrics,
} from "@/context/BusinessContext";

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const businessApi = {
  // ============ VEHICLES ============

  vehicles: {
    // Get all vehicles
    async getAll() {
      await delay(500);
      return { success: true };
    },

    // Get vehicle by ID
    async getById(id: string) {
      await delay(300);
      return { success: true, data: { id } };
    },

    // Create vehicle
    async create(vehicle: Omit<Vehicle, "id">) {
      await delay(400);
      return {
        success: true,
        data: {
          ...vehicle,
          id: `V${Date.now()}`,
        },
      };
    },

    // Update vehicle
    async update(id: string, updates: Partial<Vehicle>) {
      await delay(400);
      return { success: true, data: { ...updates, id } };
    },

    // Delete vehicle
    async delete(id: string) {
      await delay(300);
      return { success: true };
    },

    // Update vehicle status
    async updateStatus(
      id: string,
      status: "available" | "rented" | "maintenance",
    ) {
      await delay(300);
      return { success: true, data: { id, status } };
    },

    // Bulk update vehicles
    async bulkUpdate(vehicleIds: string[], updates: Partial<Vehicle>) {
      await delay(500);
      return {
        success: true,
        data: { updated: vehicleIds.length },
      };
    },

    // Get maintenance records
    async getMaintenanceHistory(id: string) {
      await delay(400);
      return {
        success: true,
        data: [
          {
            id: "M001",
            date: "2025-02-15",
            type: "Oil Change",
            cost: 2500,
            notes: "Regular maintenance",
          },
          {
            id: "M002",
            date: "2025-01-20",
            type: "Tire Replacement",
            cost: 8000,
            notes: "Worn tires",
          },
        ],
      };
    },

    // Schedule maintenance
    async scheduleMaintenance(
      id: string,
      data: { type: string; date: string; notes: string },
    ) {
      await delay(300);
      return {
        success: true,
        data: { id: `M${Date.now()}`, vehicleId: id, ...data },
      };
    },
  },

  // ============ BOOKINGS ============

  bookings: {
    // Get all bookings
    async getAll() {
      await delay(500);
      return { success: true };
    },

    // Get bookings by status
    async getByStatus(status: Booking["status"]) {
      await delay(400);
      return { success: true, data: [] };
    },

    // Get booking by ID
    async getById(id: string) {
      await delay(300);
      return { success: true, data: { id } };
    },

    // Create booking
    async create(booking: Omit<Booking, "id" | "createdAt">) {
      await delay(500);
      return {
        success: true,
        data: {
          ...booking,
          id: `BK-${Date.now()}`,
          createdAt: new Date().toISOString(),
        },
      };
    },

    // Update booking
    async update(id: string, updates: Partial<Booking>) {
      await delay(400);
      return { success: true, data: { ...updates, id } };
    },

    // Cancel booking
    async cancel(id: string) {
      await delay(300);
      return { success: true, data: { id, status: "cancelled" } };
    },

    // Extend booking (add more days)
    async extend(id: string, newEndDate: string) {
      await delay(400);
      return {
        success: true,
        data: { id, endDate: newEndDate },
      };
    },

    // Complete booking
    async complete(id: string) {
      await delay(300);
      return {
        success: true,
        data: { id, status: "completed" },
      };
    },

    // Get bookings by vehicle
    async getByVehicle(vehicleId: string) {
      await delay(400);
      return { success: true, data: [] };
    },

    // Get bookings by customer
    async getByCustomer(customerId: string) {
      await delay(400);
      return { success: true, data: [] };
    },

    // Get availability for vehicle
    async getAvailability(
      vehicleId: string,
      startDate: string,
      endDate: string,
    ) {
      await delay(500);
      return { success: true, data: { available: true } };
    },

    // Generate invoice
    async generateInvoice(bookingId: string) {
      await delay(600);
      return {
        success: true,
        data: {
          invoiceId: `INV-${Date.now()}`,
          bookingId,
          pdfUrl: "https://example.com/invoice.pdf",
        },
      };
    },
  },

  // ============ CUSTOMERS ============

  customers: {
    // Get all customers
    async getAll() {
      await delay(500);
      return { success: true };
    },

    // Get customer by ID
    async getById(id: string) {
      await delay(300);
      return { success: true, data: { id } };
    },

    // Create customer
    async create(customer: Omit<Customer, "id">) {
      await delay(400);
      return {
        success: true,
        data: {
          ...customer,
          id: `C${Date.now()}`,
        },
      };
    },

    // Update customer
    async update(id: string, updates: Partial<Customer>) {
      await delay(400);
      return { success: true, data: { ...updates, id } };
    },

    // Delete customer
    async delete(id: string) {
      await delay(300);
      return { success: true };
    },

    // Get customer rental history
    async getRentalHistory(id: string) {
      await delay(500);
      return { success: true, data: [] };
    },

    // Add loyalty points
    async addLoyaltyPoints(id: string, points: number) {
      await delay(300);
      return {
        success: true,
        data: { id, pointsAdded: points },
      };
    },
  },

  // ============ METRICS & DASHBOARD ============

  metrics: {
    // Get dashboard metrics
    async getDashboard() {
      await delay(800);
      return {
        success: true,
        data: {
          totalVehicles: 4,
          availableVehicles: 2,
          activeRentals: 2,
          totalRevenue: 265300,
          monthlyRevenue: 79590,
          totalCustomers: 3,
          fleetUtilization: 50,
          avgDailyRate: 8175,
          pendingMaintenance: 1,
          expiringInsurance: 0,
        },
      };
    },

    // Get revenue data
    async getRevenueStats(period: "week" | "month" | "year") {
      await delay(600);
      const data =
        period === "week"
          ? [
              { date: "Mon", revenue: 25000 },
              { date: "Tue", revenue: 35200 },
              { date: "Wed", revenue: 28500 },
              { date: "Thu", revenue: 42100 },
              { date: "Fri", revenue: 38900 },
              { date: "Sat", revenue: 45600 },
              { date: "Sun", revenue: 32000 },
            ]
          : period === "month"
            ? [
                { date: "Week 1", revenue: 125000 },
                { date: "Week 2", revenue: 132000 },
                { date: "Week 3", revenue: 118500 },
                { date: "Week 4", revenue: 128300 },
              ]
            : [
                { date: "Jan", revenue: 380000 },
                { date: "Feb", revenue: 420000 },
                { date: "Mar", revenue: 395000 },
                { date: "Apr", revenue: 410000 },
                { date: "May", revenue: 450000 },
                { date: "Jun", revenue: 480000 },
              ];
      return { success: true, data };
    },

    // Get vehicle utilization
    async getVehicleUtilization() {
      await delay(600);
      return {
        success: true,
        data: [
          { vehicle: "Tesla Model 3", utilization: 85 },
          { vehicle: "BMW X5", utilization: 92 },
          { vehicle: "Mercedes C-Class", utilization: 45 },
          { vehicle: "Range Rover Sport", utilization: 78 },
        ],
      };
    },

    // Get revenue by vehicle
    async getRevenueByVehicle() {
      await delay(600);
      return {
        success: true,
        data: [
          { vehicle: "BMW X5", revenue: 118300 },
          { vehicle: "Tesla Model 3", revenue: 65200 },
          { vehicle: "Range Rover Sport", revenue: 82100 },
          { vehicle: "Mercedes C-Class", revenue: 28800 },
        ],
      };
    },

    // Get top customers
    async getTopCustomers(limit: number = 5) {
      await delay(500);
      return {
        success: true,
        data: [
          { name: "John Doe", rentals: 12, spent: 145000 },
          { name: "Sarah Smith", rentals: 8, spent: 98500 },
          { name: "Mike Johnson", rentals: 5, spent: 62300 },
        ],
      };
    },

    // Get payment status
    async getPaymentStatus() {
      await delay(500);
      return {
        success: true,
        data: {
          paid: 8,
          pending: 2,
          failed: 0,
          totalAmount: 285300,
        },
      };
    },
  },

  // ============ REPORTS ============

  reports: {
    // Generate revenue report
    async generateRevenueReport(startDate: string, endDate: string) {
      await delay(1000);
      return {
        success: true,
        data: {
          reportId: `RPT-${Date.now()}`,
          period: `${startDate} to ${endDate}`,
          totalRevenue: 265300,
          totalBookings: 10,
          averageBookingValue: 26530,
          topVehicle: "BMW X5",
          topCustomer: "John Doe",
        },
      };
    },

    // Generate fleet report
    async generateFleetReport() {
      await delay(1000);
      return {
        success: true,
        data: {
          reportId: `FLT-${Date.now()}`,
          totalVehicles: 4,
          availableVehicles: 2,
          rentedVehicles: 1,
          maintenanceVehicles: 1,
          totalMileage: 68600,
          overallCondition: "Good",
        },
      };
    },

    // Generate maintenance report
    async generateMaintenanceReport() {
      await delay(1000);
      return {
        success: true,
        data: {
          reportId: `MNT-${Date.now()}`,
          totalMaintenance: 8,
          totalCost: 32500,
          averageCostPerVehicle: 8125,
          pendingMaintenance: 1,
          lastServiceDate: "2025-03-11",
        },
      };
    },

    // Export data
    async exportData(format: "csv" | "pdf") {
      await delay(1500);
      return {
        success: true,
        data: {
          downloadUrl: `https://example.com/export_${Date.now()}.${format}`,
          fileName: `business_report.${format}`,
        },
      };
    },
  },

  // ============ SETTINGS & CONFIG ============

  settings: {
    // Get business settings
    async getSettings() {
      await delay(300);
      return {
        success: true,
        data: {
          companyName: "My Car Rental",
          email: "hello@carrentalco.com",
          phone: "+254 712 345 678",
          location: "Nairobi CBD",
          serviceType: "car-rental",
          currency: "KES",
          timezone: "Africa/Nairobi",
        },
      };
    },

    // Update business settings
    async updateSettings(settings: Record<string, any>) {
      await delay(400);
      return { success: true, data: settings };
    },

    // Get payment methods
    async getPaymentMethods() {
      await delay(300);
      return {
        success: true,
        data: [
          { id: "PM001", type: "M-Pesa", isActive: true },
          { id: "PM002", type: "Card", isActive: true },
          { id: "PM003", type: "Bank Transfer", isActive: false },
        ],
      };
    },

    // Add staff member
    async addStaff(staff: { name: string; email: string; role: string }) {
      await delay(400);
      return {
        success: true,
        data: {
          id: `S${Date.now()}`,
          ...staff,
        },
      };
    },

    // Get staff list
    async getStaffList() {
      await delay(500);
      return {
        success: true,
        data: [
          {
            id: "S001",
            name: "Alice Manager",
            email: "alice@company.com",
            role: "Manager",
          },
          {
            id: "S002",
            name: "Bob Assistant",
            email: "bob@company.com",
            role: "Assistant",
          },
        ],
      };
    },
  },
};
