import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceType } from '../models/service-type.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceTypeService {
  private apiUrl = 'https://localhost:7225/api/ServiceType';

  constructor(private http: HttpClient) { }

  getServiceTypes(): Observable<ServiceType[]> {
    return this.http.get<ServiceType[]>(this.apiUrl);
  }

  addServiceType(serviceType: ServiceType): Observable<ServiceType> {
    return this.http.post<ServiceType>(this.apiUrl, serviceType);
  }
}
