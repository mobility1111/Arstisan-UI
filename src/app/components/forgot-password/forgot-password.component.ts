import { Component } from '@angular/core';
import { ResetPasswordService } from '../../services/reset-password.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  isLoading = false;

  constructor(private resetService: ResetPasswordService) {}

  onSubmit() {
    if (!this.email) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'Please enter your email',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });
      return;
    }

    this.isLoading = true;

    this.resetService.sendResetPasswordLink(this.email).subscribe({
      next: (res) => {
        this.isLoading = false;
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: res.message || 'Password reset link has been sent to your email 📧',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
      },
      error: () => {
        this.isLoading = false;
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Something went wrong. Try again ❌',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
      }
    });
  }
}
