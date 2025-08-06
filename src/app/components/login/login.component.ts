import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/models/login-request.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData: LoginRequest = {
    email: '',
    password: ''
  };

  message: string = '';
  isSubmitting: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (!this.loginData.email || !this.loginData.password) {
      this.message = 'Please fill in all fields.';
      return;
    }

    this.isSubmitting = true;
    this.message = '';

    this.authService.login(this.loginData).subscribe({
      next: (res) => {
        console.log('Login successful:', res);

        this.message = 'Login successful!';

        // Save token to localStorage
        this.authService.saveToken(res.token);

        // Decode token immediately
        const decoded = this.authService.decodeToken(res.token);
        console.log('Decoded Token:', decoded);

        // Optionally save user's full name to localStorage (so HeaderComponent can access it)
        localStorage.setItem('fullName', decoded.fullName);
        localStorage.setItem('role', decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);

        this.isSubmitting = false;

        // Redirect based on role
        const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        if (role === 'Artisan') {
          this.router.navigate(['/artisan-dashboard']);
        } else if (role === 'Customer') {
          this.router.navigate(['/landing']);
        } else {
          this.router.navigate(['/']); // fallback
        }
      },
      error: (err) => {
        console.error(err);
        this.message = 'Invalid credentials!';
        this.isSubmitting = false;
      }
    });
  }
}
