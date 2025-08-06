import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { Location } from 'src/app/models/location.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html'
})
export class LocationListComponent implements OnInit {
  locations: Location[] = [];

  constructor(
    private locationService: LocationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.locationService.getLocations().subscribe({
      next: (data) => {
        // Optional: filter out any locations with missing ID
        this.locations = data.filter(loc => !!loc.id);
      },
      error: (err) => {
        console.error('Failed to load locations:', err);
      }
    });
  }

  viewArtisans(locationId: string | undefined): void {
    if (!locationId) {
      console.warn('No location ID provided for artisan navigation.');
      return;
    }

    this.router.navigate(['/artisans-by-location', locationId]);
  }
}
