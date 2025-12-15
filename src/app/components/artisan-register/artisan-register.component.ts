import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceTypeService } from 'src/app/services/service-type.service';
import { LocationService } from 'src/app/services/location.service';
import { ServiceType } from 'src/app/models/service-type.model';
import { Location } from 'src/app/models/location.model';
import { Router } from '@angular/router';

interface PasswordPolicy {
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireDigit: boolean;
  requireSpecialCharacter: boolean;
  requiredLength: number;
}

@Component({
  selector: 'app-artisan-register',
  templateUrl: './artisan-register.component.html',
  styleUrls: ['./artisan-register.component.css']
})
export class ArtisanRegisterComponent implements OnInit {
  registerForm: FormGroup;
  isSubmitting = false;
  message = '';
  serviceTypes: ServiceType[] = [];
  locations: Location[] = [];
  photoUrl: string = '';
  selectedFile: File | null = null;
  
  // Properties for file display
  selectedFileName: string = '';
  selectedFileSize: string = '';
  
  // Property for password visibility toggle
  showPassword: boolean = false;
  
  // Password policy from backend
  passwordPolicy!: PasswordPolicy;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private serviceTypeService: ServiceTypeService,
    private locationService: LocationService,
    private router: Router 
  ) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      serviceTypeId: ['', Validators.required],
      locationId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadServiceTypes();
    this.fetchLocations();
    this.loadPasswordPolicy();
  }

  loadPasswordPolicy() {
    this.authService.getPasswordPolicy().subscribe({
      next: (policy: PasswordPolicy) => {
        this.passwordPolicy = policy;
      },
      error: (err) => {
        console.error('Failed to load password policy:', err);
      }
    });
  }

  loadServiceTypes() {
    this.serviceTypeService.getServiceTypes().subscribe(data => {
      this.serviceTypes = data;
    });
  }

  fetchLocations() {
    this.locationService.getLocations().subscribe({
      next: (data) => this.locations = data,
      error: (err) => console.error('Error fetching locations:', err)
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      
      // Update file display properties
      this.selectedFileName = this.selectedFile.name;
      this.selectedFileSize = this.formatFileSize(this.selectedFile.size);
    }
  }

  // Method to toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Password validation methods
  hasMinLength(): boolean {
    const password = this.registerForm.get('password')?.value || '';
    return password.length >= (this.passwordPolicy?.requiredLength || 0);
  }

  hasUppercase(): boolean {
    const password = this.registerForm.get('password')?.value || '';
    return /[A-Z]/.test(password);
  }

  hasLowercase(): boolean {
    const password = this.registerForm.get('password')?.value || '';
    return /[a-z]/.test(password);
  }

  hasNumber(): boolean {
    const password = this.registerForm.get('password')?.value || '';
    return /\d/.test(password);
  }

  hasSpecialChar(): boolean {
    const password = this.registerForm.get('password')?.value || '';
    return /[^a-zA-Z0-9]/.test(password);
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

  // Calculate password strength percentage
  getPasswordStrength(): number {
    const password = this.registerForm.get('password')?.value || '';
    if (!password) return 0;
    
    let strength = 0;
    const maxCriteria = 5;
    
    if (this.hasMinLength()) strength++;
    if (this.hasUppercase()) strength++;
    if (this.hasLowercase()) strength++;
    if (this.hasNumber()) strength++;
    if (this.hasSpecialChar()) strength++;
    
    return (strength / maxCriteria) * 100;
  }

  getPasswordStrengthText(): string {
    const strength = this.getPasswordStrength();
    
    if (strength === 0) return '';
    if (strength <= 20) return 'Very Weak';
    if (strength <= 40) return 'Weak';
    if (strength <= 60) return 'Fair';
    if (strength <= 80) return 'Good';
    return 'Strong';
  }

  getPasswordStrengthClass(): string {
    const strength = this.getPasswordStrength();
    
    if (strength <= 20) return 'very-weak';
    if (strength <= 40) return 'weak';
    if (strength <= 60) return 'fair';
    if (strength <= 80) return 'good';
    return 'strong';
  }

  // Helper method to format file size
  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  registerArtisan() {
    if (this.registerForm.invalid || !this.selectedFile) {
      this.message = 'Please fill all required fields and select a photo.';
      return;
    }

    if (!this.isPasswordValid()) {
      this.message = 'Password does not meet the security requirements.';
      return;
    }

    this.isSubmitting = true;
    this.message = ''; // Clear any previous messages

    // Step 1: Upload the photo
    const formData = new FormData();
    formData.append('file', this.selectedFile as Blob);

    this.authService.uploadPhoto(formData).subscribe({
      next: (res) => {
        this.photoUrl = res.photoUrl;

        // Step 2: Submit artisan registration
        const artisan = {
          ...this.registerForm.value,
          photoUrl: this.photoUrl
        };

        this.authService.registerArtisan(artisan).subscribe({
          next: () => {
            this.message = 'Registration successful! Welcome to our artisan community!';
            this.isSubmitting = false;
            this.resetForm();

            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
          },
          error: (err) => {
            console.error(err);
            this.message = err.error?.message || 'An error occurred during registration. Please try again.';
            this.isSubmitting = false;
          }
        });
      },
      error: (err) => {
        console.error('Photo upload failed:', err);
        this.message = 'Failed to upload photo. Please try again.';
        this.isSubmitting = false;
      }
    });
  }

  // Helper method to reset form and file selection
  private resetForm() {
    this.registerForm.reset();
    this.selectedFile = null;
    this.photoUrl = '';
    this.selectedFileName = '';
    this.selectedFileSize = '';
  }
}