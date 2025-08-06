import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/models/customer.model';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.css']
})
export class CustomerRegisterComponent implements OnInit {
  registerForm: FormGroup;
  isSubmitting = false;
  message = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      location: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  registerCustomer() {
    if (this.registerForm.invalid) return;

    this.isSubmitting = true;
    const customer: Customer = this.registerForm.value;

    this.authService.registerCustomer(customer).subscribe({
      next: (res) => {
        this.message = 'Registration successful!';
        this.isSubmitting = false;
        this.registerForm.reset();
      },
      error: (err) => {
        console.error(err);
        this.message = 'An error occurred. Please try again.';
        this.isSubmitting = false;
      }
    });
  }
}
