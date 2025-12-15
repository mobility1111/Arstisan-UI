export interface Job {
  id: string;
  description: string;
  status: string;

  customer?: {
    id: string;
    fullName: string;
  };

  artisan?: {
    id: string;
    fullName: string;
  };

  preferredDate: string;
  artisanCharge?: number;
}
