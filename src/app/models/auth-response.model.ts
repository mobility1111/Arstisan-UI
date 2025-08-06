export interface AuthResponse {
  id: string;
  fullName: string;
  email: string;
  role: string;
  photoUrl?: string;
  token: string; // if using JWT
}
