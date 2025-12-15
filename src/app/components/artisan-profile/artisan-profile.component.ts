import { Component, OnInit } from '@angular/core';
import { ArtisanProfile } from 'src/app/models/artisan-profile.model';
import { ArtisanProfileService } from 'src/app/services/artisan-profile.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-artisan-profile',
  templateUrl: './artisan-profile.component.html',
  styleUrls: ['./artisan-profile.component.css']
})
export class ArtisanProfileComponent implements OnInit {

  artisan!: ArtisanProfile;

  constructor(
    private profileService: ArtisanProfileService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const artisanId = this.authService.getUserId();
    if (!artisanId) {
      alert('User not logged in ❌');
      return;
    }

    this.loadProfile(artisanId);
  }

  loadProfile(artisanId: string) {
    this.profileService.getProfile(artisanId).subscribe({
      next: (res) => {
        this.artisan = res;
        console.log("Loaded artisan profile:", this.artisan);
      },
      error: (err) => {
        console.error("Failed to load profile", err);
      }
    });
  }

  onPhotoSelected(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    this.profileService.uploadPhoto(file).subscribe({
      next: (res) => {
        if (res.photoUrl) {
          const dto = {
            fullName: this.artisan.fullName,
            serviceType: this.artisan.serviceTypeId,
            location: this.artisan.locationName,
            photoUrl: res.photoUrl
          };

          this.profileService.updateProfile(this.artisan.id, dto).subscribe({
            next: () => {
              this.artisan.photoUrl = res.photoUrl;
              console.log("Photo updated successfully");
            }
          });
        }
      }
    });
  }
}
