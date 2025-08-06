export interface Job {
  id: string;
  serviceType: string;
  description: string;
  customerId: string;
  customerName: string;
  artisanId?: string;
  artisanName?: string;
  location: string;
  amount?: number;
  status: string;
  requestDate: Date;
}
