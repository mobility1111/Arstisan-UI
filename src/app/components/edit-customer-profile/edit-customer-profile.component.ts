import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';

import { Router } from '@angular/router';
import { UpdateCustomerRequest } from 'src/app/models/DTOs/UpdateCustomerRequest';

@Component({
  selector: 'app-edit-customer-profile',
  templateUrl: './edit-customer-profile.component.html',
  styleUrls: ['./edit-customer-profile.component.css']
})
export class EditCustomerProfileComponent implements OnInit {

  model: UpdateCustomerRequest = {
    fullName: '',
    phoneNumber: ''
  };

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerService.getProfile().subscribe({
      next: (profile) => {
        this.model.fullName = profile.fullName;
        this.model.phoneNumber = profile.phoneNumber ?? '';
      }
    });
  }

  save() {
    this.customerService.updateProfile(this.model).subscribe({
      next: () => {
        alert('Profile updated successfully');
        this.router.navigate(['/profile']);
      },
      error: () => alert('Failed to update profile')
    });
  }
}
