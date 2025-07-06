export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  type: 'customer' | 'provider';
  verified: boolean;
  rating?: number;
  location: {
    city: string;
    address: string;
    coordinates?: [number, number];
  };
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: ServiceCategory;
  price: {
    min: number;
    max: number;
    currency: string;
    type: 'fixed' | 'hourly' | 'quote';
  };
  duration: number; // in minutes
  image?: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  services: Service[];
}

export interface ServiceProvider {
  id: string;
  user: User;
  services: Service[];
  skills: string[];
  experience: number; // in years
  rating: number;
  totalJobs: number;
  availability: {
    days: string[];
    hours: {
      start: string;
      end: string;
    };
  };
  verified: boolean;
  documents: {
    id: boolean;
    background: boolean;
    skills: boolean;
  };
}

export interface Booking {
  id: string;
  customer: User;
  provider: ServiceProvider;
  service: Service;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  scheduledDate: string;
  scheduledTime: string;
  address: string;
  notes?: string;
  price: number;
  paymentMethod: 'mobile_money' | 'card' | 'cash';
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  booking: Booking;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: string;
}