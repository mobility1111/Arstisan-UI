
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Artisan } from '../models/artisan.model';
import { Customer } from '../models/customer.model';
import { AuthResponse } from '../models/auth-response.model';
import { LoginRequest } from '../models/login-request.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://localhost:7225/api/auth';
  //private loggedInUserSubject = new BehaviorSubject<any>(this.getDecodedToken());
  private loggedInUserSubject = new BehaviorSubject<any>(null);
  private refreshTokenTimer?: Subscription;


constructor(private http: HttpClient) {
  const existingToken = this.getToken();
  if (existingToken) {
    const decodedUser = this.decodeToken(existingToken);
    this.loggedInUserSubject.next(decodedUser);
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
  return JSON.parse(atob(payload));
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



}



















// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Artisan } from '../models/artisan.model';
// import { Customer } from '../models/customer.model';
// import { Observable } from 'rxjs';
// import { AuthResponse } from '../models/auth-response.model';
// import { LoginRequest } from '../models/login-request.model';


// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   private baseUrl = 'https://localhost:7225/api/auth';

//   constructor(private http: HttpClient) { }

//   registerArtisan(artisan: Artisan): Observable<AuthResponse> {
//     return this.http.post<AuthResponse>(`${this.baseUrl}/register-artisan`, artisan);
//   }

//   registerCustomer(customer: Customer): Observable<AuthResponse> {
//     return this.http.post<AuthResponse>(`${this.baseUrl}/register-customer`, customer);
//   }

// login(credentials: LoginRequest): Observable<AuthResponse> {
//   return this.http.post<AuthResponse>('https://localhost:7225/api/auth/login', credentials);
// }

//    saveToken(token: string) {
//     localStorage.setItem('token', token);
//   }

//   getToken(): string | null {
//     return localStorage.getItem('token');
//   }

//   isLoggedIn(): boolean {
//     return !!localStorage.getItem('token');
//   }

//   logout() {
//     localStorage.removeItem('token');
//   }

// uploadPhoto(formData: FormData) {
//   return this.http.post<{ photoUrl: string }>(
//     'https://localhost:7225/api/auth/uploads/photo', 
//     formData
//   );
// }

// }

