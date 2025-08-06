import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceTypeService } from 'src/app/services/service-type.service';
import { LocationService } from 'src/app/services/location.service';
import { ServiceType } from 'src/app/models/service-type.model';
import { Location } from 'src/app/models/location.model';
import { Router } from '@angular/router';

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
  
  // New properties for file display
  selectedFileName: string = '';
  selectedFileSize: string = '';

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
            this.message = 'An error occurred during registration. Please try again.';
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