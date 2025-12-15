
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Artisan } from '../models/artisan.model';
import { Customer } from '../models/customer.model';
import { AuthResponse } from '../models/auth-response.model';
import { LoginRequest } from '../models/login-request.model';
import { ResetPassword } from '../models/reset-password.model';

export interface PasswordPolicy {
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireDigit: boolean;
  requireSpecialCharacter: boolean;
  requiredLength: number;
}




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://localhost:7225/api/auth';
  //private loggedInUserSubject = new BehaviorSubject<any>(this.getDecodedToken());
  private loggedInUserSubject = new BehaviorSubject<any>(null);
  private refreshTokenTimer?: Subscription;


constructor(private http: HttpClient) {
  const savedUser = localStorage.getItem('loggedInUser');

  if (savedUser) {
    this.loggedInUserSubject.next(JSON.parse(savedUser));
  } else {
    const token = this.getToken();
    if (token) {
      const decoded = this.decodeToken(token);

      const userObj = {
        id: decoded.sub,
        email: decoded.email,
        fullName: decoded.fullName,
        role: decoded.role   // normalized role
      };

      this.loggedInUserSubject.next(userObj);
      localStorage.setItem('loggedInUser', JSON.stringify(userObj));
    }
  }
}


  // Artisan Registration
  registerArtisan(artisan: Artisan): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register-artisan`, artisan);
  }

  // Customer Registration
  registerCustomer(customer: Customer): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register-customer`, customer);
  }

  // Login + store token + user info
login(credentials: LoginRequest): Observable<AuthResponse> {
  return new Observable(observer => {
    this.http.post<AuthResponse>(`${this.baseUrl}/login`, credentials)
      .subscribe({
        next: (res) => {
          // Save token
          this.saveToken(res.token);

          // Save user details
          const userData = {
            id: res.id,
            fullName: res.fullName,
            email: res.email,
            role: res.role
          };

          localStorage.setItem('loggedInUser', JSON.stringify(userData));
          this.loggedInUserSubject.next(userData); // <-- IMPORTANT

          // Also keep individual items
          localStorage.setItem('userId', res.id);
          localStorage.setItem('userFullName', res.fullName);
          localStorage.setItem('userEmail', res.email);
          localStorage.setItem('userRole', res.role);

          observer.next(res);
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
  });
}


  // Photo upload
  uploadPhoto(formData: FormData): Observable<{ photoUrl: string }> {
    return this.http.post<{ photoUrl: string }>(
      `${this.baseUrl}/uploads/photo`,
      formData
    );
  }


  saveToken(token: string) {
    localStorage.setItem('token', token);
    const decoded = this.decodeToken(token);
    this.loggedInUserSubject.next(decoded);
    this.startTokenTimer(token);
  }

  // Auto-refresh timer
  startTokenTimer(token: string) {
    const decoded: any = this.decodeToken(token);
    if (!decoded || !decoded.exp) return;

    const expiryTime = decoded.exp * 1000; // convert to ms
    const now = Date.now();
    const refreshTime = expiryTime - now - (60 * 1000); // 1 min before expiry

    // Clear any existing timer
    this.stopTokenTimer();

    // Start a new timer
    this.refreshTokenTimer = new Observable(subscriber => {
      const timeout = setTimeout(() => {
        this.refreshToken().subscribe({
          next: (res) => {
            if (res?.token) {
              this.saveToken(res.token);
              localStorage.setItem('refreshToken', res.refreshToken);
            } else {
              this.logout();
            }
            subscriber.complete();
          },
          error: () => {
            this.logout();
            subscriber.complete();
          }
        });
      }, refreshTime);

      return () => clearTimeout(timeout);
    }).subscribe();
  }

  stopTokenTimer() {
    if (this.refreshTokenTimer) {
      this.refreshTokenTimer.unsubscribe();
      this.refreshTokenTimer = undefined;
    }
  }


  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('userFullName');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userRole');
  localStorage.removeItem('loggedInUser');


  this.stopTokenTimer();
  this.loggedInUserSubject.next(null);  // <-- this was missing
}


  // Retrieve logged-in user info
  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

    getLoggedInUser(): Observable<any> {
    return this.loggedInUserSubject.asObservable();
  }

  getUserEmail(): string | null {
    return localStorage.getItem('userEmail');
  }

  getUserFullName(): string | null {
    return localStorage.getItem('userFullName');
  }

decodeToken(token: string): any {
  if (!token) return null;
  const payload = token.split('.')[1];
  const decoded = JSON.parse(atob(payload));

  // Normalize role
  const roleKey = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
  if (decoded[roleKey]) {
    decoded.role = decoded[roleKey];  // set readable key
  }

  return decoded;
}


getDecodedToken(): any {
  const token = this.getToken();
  if (!token) return null;
  const payload = token.split('.')[1];
  return JSON.parse(atob(payload));
}

refreshToken(): Observable<any> {
  const oldToken = this.getToken();
  const refreshToken = localStorage.getItem('refreshToken');

  if (!oldToken || !refreshToken) {
    return new Observable(observer => {
      observer.error('No token or refresh token found');
    });
  }

  return this.http.post<any>(`${this.baseUrl}/refresh-token`, {
    token: oldToken,
    refreshToken: refreshToken
  });
}

  getPasswordPolicy(): Observable<PasswordPolicy> {
    return this.http.get<PasswordPolicy>(`${this.baseUrl}/password-policy`);
  }

 updateLoggedInUser(updated: any) {
  const user = this.loggedInUserSubject.value;

  if (user) {
    const newUser = { ...user, ...updated };

    // 🔥 Update BehaviorSubject
    this.loggedInUserSubject.next(newUser);

    // 🔥 Update localStorage so refresh keeps new name
    localStorage.setItem('loggedInUser', JSON.stringify(newUser));
  }
}

    sendResetPasswordLink(email: string){
     return this.http.post<any>(`${this.baseUrl}/api/auth/send-reset-email/${email}`, {});
  }

    sendResetPsswordLink(email: string){
     return this.http.post<any>(`${this.baseUrl}/api/auth/send-reset-email/${email}`, {});
  }


  // Step 2: User sets new password
  resetPassword(resetPasswordObj: ResetPassword): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/auth/reset-password`, resetPasswordObj);
  }


}














