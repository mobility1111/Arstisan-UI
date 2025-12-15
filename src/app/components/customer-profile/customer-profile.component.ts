import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {
  
  customer!: Customer;

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerService.getProfile().subscribe({
      next: (profile) => this.customer = profile,
      error: () => alert('Failed to load profile')
    });
  }

  editProfile() {
    this.router.navigate(['/edit-profile']);
  }

  changePassword() {
    this.router.navigate(['/change-password']);
  }
}
