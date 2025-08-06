import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Artisan } from '../models/artisan.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtisanService {

  private apiUrl = 'https://localhost:7225/api/artisan';

  constructor(private http: HttpClient) {}

  // Get all artisans
  getArtisans(): Observable<Artisan[]> {
    return this.http.get<Artisan[]>(this.apiUrl);
  }

  // Get artisan by Id
  getArtisan(id: string): Observable<Artisan> {
    return this.http.get<Artisan>(`${this.apiUrl}/${id}`);
  }

  // Register artisan (if you want to register artisans through this service too)
  registerArtisan(artisan: Artisan): Observable<any> {
    return this.http.post(`${this.apiUrl}`, artisan);
  }

  // Update artisan details
  updateArtisan(id: string, artisan: Artisan): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, artisan);
  }

  // Delete artisan
  deleteArtisan(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Optionally get featured artisans if backend has a specific endpoint
  getFeaturedArtisans(): Observable<Artisan[]> {
    return this.http.get<Artisan[]>(`${this.apiUrl}/featured`);
  }

  getArtisansByServiceType(serviceTypeId: string): Observable<Artisan[]> {
  return this.http.get<Artisan[]>(`${this.apiUrl}/by-service-type/${serviceTypeId}`);
}

getArtisansByLocation(locationId: string): Observable<Artisan[]> {
  return this.http.get<Artisan[]>(`${this.apiUrl}/by-location/${locationId}`);
}


}
