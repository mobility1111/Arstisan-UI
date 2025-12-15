import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArtisanProfileService } from 'src/app/services/artisan-profile.service';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-artisan-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  profileForm!: FormGroup;
  artisanId!: string;

  constructor(
    private fb: FormBuilder,
    private profileService: ArtisanProfileService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      fullName: ['', Validators.required],
      serviceType: [''],
      location: [''],
      photoUrl: ['']
    });

    this.artisanId = this.authService.getUserId()!;
    this.loadProfile();
  }

  loadProfile() {
    this.profileService.getProfile(this.artisanId).subscribe(res => {
      this.profileForm.patchValue({
        fullName: res.fullName,
        serviceType: res.serviceTypeId,
        location: res.locationId,
        photoUrl: res.photoUrl
      });
    });
  }

saveProfile(): void {
  if (this.profileForm.invalid) {
    this.alert("Please complete all required fields ❌", "error");
    this.profileForm.markAllAsTouched();
    return;
  }

  const payload = { ...this.profileForm.value };

  this.profileService.updateProfile(this.artisanId, payload).subscribe({
    next: () => {
      // 🔥 Update auth service so header refreshes instantly
      this.authService.updateLoggedInUser({
        fullName: payload.fullName
      });

      this.alert("Your profile has been updated successfully 🎉", "success");
    },
    error: (err) => {
      console.error("Profile update failed:", err);
      this.alert("Unable to update profile at the moment ❌", "error");
    }
  });
}


  onPhotoSelected(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    this.profileService.uploadPhoto(file).subscribe(res => {
      if (res.photoUrl) {
        this.profileForm.patchValue({ photoUrl: res.photoUrl });
      }
    });
  }

  alert(message: string, type: any) {
    Swal.fire({
      icon: type,
      title: message,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000
    });
  }
}
