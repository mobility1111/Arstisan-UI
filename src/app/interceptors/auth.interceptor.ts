import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    // Attach token if available
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // If 401 Unauthorized — attempt to refresh token
        if (error.status === 401) {
          return this.authService.refreshToken().pipe(
            switchMap((res: any) => {
              // Save new token and refreshToken
              this.authService.saveToken(res.token);
              localStorage.setItem('refreshToken', res.refreshToken);

              // Retry original request with new token
              const newReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${res.token}`
                }
              });

              return next.handle(newReq);
            }),
            catchError(err => {
              // If refresh also fails, logout user
              this.authService.logout();
              return throwError(() => err);
            })
          );
        }

        return throwError(() => error);
      })
    );
  }
}
