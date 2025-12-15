import { Component } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { ChangePasswordRequest } from 'src/app/models/DTOs/change-password.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  model: ChangePasswordRequest = {
    currentPassword: '',
    newPassword: ''
  };

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  changePassword() {
    this.customerService.changePassword(this.model).subscribe({
      next: () => {
        alert('Password changed successfully');
        this.router.navigate(['/profile']);
      },
      error: () => alert('Failed to change password')
    });
  }
}
