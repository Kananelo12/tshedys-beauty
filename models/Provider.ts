import { ObjectId } from 'mongodb';

export interface IProvider {
  _id?: ObjectId;
  name: string;
  email: string;
  phone: string;
  timezone: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProviderWithoutPassword {
  _id: ObjectId;
  name: string;
  email: string;
  phone: string;
  timezone: string;
  createdAt: Date;
  updatedAt: Date;
}
