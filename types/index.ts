export interface Service {
  _id: string;
  name: string;
  duration: number; // in minutes
  price: number;
  description: string;
}

export interface Provider {
  _id: string;
  name: string;
  email: string;
  phone: string;
  timezone: string;
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
  status: 'pending' | 'confirmed' | 'rejected' | 'cancelled';
  isHouseCall: boolean;
  houseCallFee: number;
  transportCost: number;
  createdAt: Date;
  expiresAt: Date;
  actionToken: string;
}