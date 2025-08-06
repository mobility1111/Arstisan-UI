import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtisanService } from 'src/app/services/artisan.service';
import { Artisan } from 'src/app/models/artisan.model';

@Component({
  selector: 'app-artisan-by-location',
  templateUrl: './artisan-by-location.component.html'
})
export class ArtisanByLocationComponent implements OnInit {
  artisans: Artisan[] = [];

  constructor(
    private route: ActivatedRoute,
    private artisanService: ArtisanService
  ) { }

  ngOnInit(): void {
    const locationId = this.route.snapshot.paramMap.get('locationId');
    if (locationId) {
      this.artisanService.getArtisansByLocation(locationId).subscribe(data => {
        this.artisans = data;
      });
    }
  }
}
