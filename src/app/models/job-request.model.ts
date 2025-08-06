export interface JobRequest {
  id?: string;
  customerId?: string;     // new addition
  customerName: string;
  phoneNumber: string;
  location: string;
  serviceType: string;
  description: string;
  preferredDate: Date;
}
