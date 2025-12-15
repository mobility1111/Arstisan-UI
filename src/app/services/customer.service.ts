import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth-response.model';
import { Customer } from '../models/customer.model';
import { ChangePasswordRequest } from '../models/DTOs/change-password.dto';
import { UpdateCustomerRequest } from '../models/DTOs/UpdateCustomerRequest';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = `${environment.baseApiUrl}/api/customer`;

  constructor(private http: HttpClient) {}

  registerCustomer(customer: Customer): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register-customer`, customer);
  }

  getProfile(): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/profile`);
  }

  getAllCustomers(): Observable<Customer[]> {
  return this.http.get<Customer[]>(`${this.baseUrl}/all`);
}


  updateProfile(dto: UpdateCustomerRequest): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, dto);
  }

  changePassword(dto: ChangePasswordRequest): Observable<any> {
    return this.http.put(`${this.baseUrl}/change-password`, dto);
  }
}
