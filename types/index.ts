export interface Service {
  _id: string;
  name: string;
  duration?: number; // in minutes (optional)
  price: number;
  category?: string;
  description: string;
}

export interface Provider {
  _id: string;
  name: string;
  email: string;
  phone: string;
  timezone: string;
  password?: string; // Optional for client-side, required in database
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Booking {
  _id: string;
  providerId: string;
  serviceId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  startDateTime: Date;
  endDateTime: Date;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  isHouseCall: boolean;
  houseCallFee: number;
  transportCost: number;
  createdAt: Date;
  expiresAt: Date;
  actionToken: string;
  providerActionAt?: Date;
}