import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth-response.model';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = 'https://localhost:5001/api/auth';

  constructor(private http: HttpClient) { }

  registerCustomer(customer: Customer): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register-customer`, customer);
  }
}
