import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/models/login-request.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

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

  showPassword: boolean = false;
  resetPasswordEmail: string = '';
isValidResetEmail: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    if (!this.loginData.email || !this.loginData.password) {
      this.showAlert('Please fill in all fields.', 'warning');
      return;
    }

    this.isSubmitting = true;
    this.message = '';

    this.authService.login(this.loginData).subscribe({
      next: (res) => {
        console.log('Login successful:', res);
        this.showAlert('Login successful! 🎉', 'success');

        // Save token
        this.authService.saveToken(res.token);

        // Decode token
        const decoded = this.authService.decodeToken(res.token);
        console.log('Decoded Token:', decoded);

        // Save user info
        localStorage.setItem('fullName', decoded.fullName);
        const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        localStorage.setItem('role', role);

        this.isSubmitting = false;

        // 👇 Updated redirect logic to include Admin
        if (role === 'Artisan') {
          this.router.navigate(['/artisan-dashboard']);
        } else if (role === 'Customer') {
          this.router.navigate(['/landing']);
        } else if (role === 'Admin') {
          this.router.navigate(['/admin-dashboard']); // ⬅ Add your admin dashboard route
        } else {
          this.router.navigate(['/']); // fallback
        }
      },
      error: (err) => {
        console.error(err);
        this.showAlert('Invalid credentials! ❌', 'error');
        this.isSubmitting = false;
      }
    });
  }

  private showAlert(message: string, type: 'success' | 'error' | 'warning'): void {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: type,
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      customClass: {
        popup: 'compact-swal'
      }
    });
  }

  // Validate email format
validateResetEmail(email: string) {
  const pattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  this.isValidResetEmail = pattern.test(email);
}

// Send reset password link
sendResetLink() {
  if (!this.isValidResetEmail) {
    this.showAlert('Invalid email address ⚠️', 'warning');
    return;
  }

  this.authService.sendResetPasswordLink(this.resetPasswordEmail).subscribe({
    next: () => {
      this.showAlert('Reset link sent! 📧 Check your inbox.', 'success');
      this.resetPasswordEmail = '';

      // Close modal
      const closeBtn = document.querySelector('#forgotPasswordModal .btn-close') as HTMLElement;
      closeBtn?.click();
    },
    error: () => {
      this.showAlert('Something went wrong ❌', 'error');
    }
  });
}

}
