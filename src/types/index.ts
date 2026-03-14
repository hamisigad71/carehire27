import { IconType } from "react-icons";

export interface NavItem {
  label: string;
  icon: IconType;
  href: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export interface Vehicle {
  id: string;
  name: string;
  type: string;
  status:
    | "Available"
    | "Rented"
    | "Maintenance"
    | "Active"
    | "Pending"
    | "Completed";
  license: string;
  price: number;
  image: string;
  images: string[];
  year: number;
  seats: number;
  transmission: "Manual" | "Automatic" | "Auto";
  mileage: string;
  condition: string;
  fuelType?: "Petrol" | "Diesel" | "Electric" | "Hybrid";
  description?: string;
  features?: { icon: string; label: string }[];
  specifications?: { label: string; value: string }[];
  rating?: number;
  reviewCount?: number;
  driverAvailable?: boolean;
}

export interface Booking {
  id: string;
  customerName: string;
  vehicleName: string;
  startDate: string;
  endDate: string;
  status: "Active" | "Completed" | "Cancelled";
  totalAmount: number;
}

export interface Stat {
  label: string;
  value: string | number;
  trend: number;
  icon: IconType;
}
