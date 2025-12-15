import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordService } from '../../services/reset-password.service';
import { ResetPassword } from '../../models/reset-password.model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetObj: ResetPassword = new ResetPassword();
  isLoading = false;
  message = '';
  showPassword = false;

  constructor(
    private route: ActivatedRoute,
    private resetService: ResetPasswordService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.resetObj.email = params['email'];
      this.resetObj.emailToken = params['code']?.replace(/ /g, '+');
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (!this.resetObj.newPassword || !this.resetObj.confirmPassword) {
      this.message = 'Please fill all fields';
      return;
    }

    this.isLoading = true;
    this.message = '';

    this.resetService.resetPassword(this.resetObj).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.message = res.message || 'Password reset successful!';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: () => {
        this.isLoading = false;
        this.message = 'Something went wrong. Try again.';
      }
    });
  }
}
