import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArtisanProfile, UpdateArtisanProfile } from '../models/artisan-profile.model';
import { environment } from './environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ArtisanProfileService {

  private baseUrl = `${environment.baseApiUrl}/api/auth`;  // ✔ NOW VALID

  constructor(private http: HttpClient) {}

  getProfile(artisanId: string): Observable<ArtisanProfile> {
    return this.http.get<ArtisanProfile>(`${this.baseUrl}/artisan-profile/${artisanId}`);
  }

  updateProfile(artisanId: string, dto: UpdateArtisanProfile): Observable<any> {
    return this.http.put(`${this.baseUrl}/artisan-profile/${artisanId}`, dto);
  }

  uploadPhoto(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.baseUrl}/upload-photo`, formData);
  }
}
