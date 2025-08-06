import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Artisan } from 'src/app/models/artisan.model';
import { ArtisanService } from 'src/app/services/artisan.service';

@Component({
  selector: 'app-artisan-list',
  templateUrl: './artisan-list.component.html',
  styleUrls: ['./artisan-list.component.css']
})
export class ArtisanListComponent implements OnInit {
  artisans: Artisan[] = [];

  constructor(
    private artisanService: ArtisanService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const serviceTypeId = params['serviceTypeId'];
      if (serviceTypeId) {
        this.getFilteredArtisans(serviceTypeId);
      } else {
        this.getAllArtisans();
      }
    });
  }

  getFilteredArtisans(serviceTypeId: string) {
    this.artisanService.getArtisansByServiceType(serviceTypeId).subscribe(data => {
      this.artisans = data;
    });
  }

  getAllArtisans() {
    this.artisanService.getArtisans().subscribe(data => {
      this.artisans = data;
    });
  }
}
