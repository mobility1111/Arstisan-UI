import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResetPassword } from '../models/reset-password.model';
import { Observable } from 'rxjs';
import { environment } from './environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  private baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  // Step 1: User enters email → backend sends reset email
  sendResetPasswordLink(email: string): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/api/auth/send-reset-email/${email}`, {});
  }
    sendResetPsswordLink(email: string){
     return this.http.post<any>(`${this.baseApiUrl}/api/auth/send-reset-email/${email}`, {});
  }


  // Step 2: User sets new password
  resetPassword(resetPasswordObj: ResetPassword): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/api/auth/reset-password`, resetPasswordObj);
  }
}
