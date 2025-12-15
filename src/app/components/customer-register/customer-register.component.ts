import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { AuthService } from 'src/app/services/auth.service';

interface PasswordPolicy {
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireDigit: boolean;
  requireSpecialCharacter: boolean;
  requiredLength: number;
}

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.css']
})
export class CustomerRegisterComponent implements OnInit {
  registerForm: FormGroup;
  isSubmitting = false;
  message = '';

  // Password policy
  passwordPolicy!: PasswordPolicy;

  // Password visibility toggle
  showPassword: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService,   private router: Router  ) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      location: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadPasswordPolicy();
  }

  loadPasswordPolicy() {
    this.authService.getPasswordPolicy().subscribe({
      next: (policy) => (this.passwordPolicy = policy),
      error: (err) => console.error("Failed to load password policy:", err)
    });
  }

  // Toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Password validation helpers
  private get password(): string {
    return this.registerForm.get('password')?.value || '';
  }

  hasMinLength(): boolean {
    return this.password.length >= (this.passwordPolicy?.requiredLength || 0);
  }

  hasUppercase(): boolean {
    return /[A-Z]/.test(this.password);
  }

  hasLowercase(): boolean {
    return /[a-z]/.test(this.password);
  }

  hasNumber(): boolean {
    return /\d/.test(this.password);
  }

  hasSpecialChar(): boolean {
    return /[^a-zA-Z0-9]/.test(this.password);
  }

  isPasswordValid(): boolean {
    if (!this.passwordPolicy) return false;

    return (
      this.hasMinLength() &&
      (!this.passwordPolicy.requireUppercase || this.hasUppercase()) &&
      (!this.passwordPolicy.requireLowercase || this.hasLowercase()) &&
      (!this.passwordPolicy.requireDigit || this.hasNumber()) &&
      (!this.passwordPolicy.requireSpecialCharacter || this.hasSpecialChar())
    );
  }

  // Strength meter
  getPasswordStrength(): number {
    if (!this.password) return 0;

    let strength = 0;
    const max = 5;

    if (this.hasMinLength()) strength++;
    if (this.hasUppercase()) strength++;
    if (this.hasLowercase()) strength++;
    if (this.hasNumber()) strength++;
    if (this.hasSpecialChar()) strength++;

    return (strength / max) * 100;
  }

  getPasswordStrengthText(): string {
    const s = this.getPasswordStrength();
    if (s === 0) return '';
    if (s <= 20) return 'Very Weak';
    if (s <= 40) return 'Weak';
    if (s <= 60) return 'Fair';
    if (s <= 80) return 'Good';
    return 'Strong';
  }

  getPasswordStrengthClass(): string {
    const s = this.getPasswordStrength();
    if (s <= 20) return 'very-weak';
    if (s <= 40) return 'weak';
    if (s <= 60) return 'fair';
    if (s <= 80) return 'good';
    return 'strong';
  }

 registerCustomer() {
  if (this.registerForm.invalid) {
    this.message = "Please fill all fields properly.";
    return;
  }

  if (!this.isPasswordValid()) {
    this.message = "Password does not meet the security requirements.";
    return;
  }

  this.isSubmitting = true;
  const customer: Customer = this.registerForm.value;

  this.authService.registerCustomer(customer).subscribe({
    next: () => {
      this.message = 'Registration successful!';
      this.isSubmitting = false;
      this.registerForm.reset();

      // Redirect to login page
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1000);
    },
    error: (err) => {
      console.error(err);
      this.message = 'An error occurred. Please try again.';
      this.isSubmitting = false;
    }
  });
}

}
