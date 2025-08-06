export interface Artisan {
  id?: string;
  fullName: string;
  email: string;
  password: string;
  serviceId: string;         // Link to ServiceType
  serviceName?: string;      // Optional, for displaying service name
  photoUrl: string;
  rating?: number;
  locationId: string;        // Link to Location
  locationName?: string;     // Optional, for displaying location name
  role?: string;
   serviceType: string; // from backend DTO
  location: string;    // from backend DTO
}
