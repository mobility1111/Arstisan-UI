import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtisanService } from 'src/app/services/artisan.service';
import { Artisan } from 'src/app/models/artisan.model';

@Component({
  selector: 'app-artisan-details',
  templateUrl: './artisan-details.component.html',
  styleUrls: ['./artisan-details.component.css']
})
export class ArtisanDetailsComponent implements OnInit {
  artisanId!: string;
  artisan?: Artisan;

  constructor(
    private route: ActivatedRoute,
    private artisanService: ArtisanService
  ) {}

  ngOnInit(): void {
    this.artisanId = this.route.snapshot.paramMap.get('id')!;
    this.fetchArtisan();
  }

  fetchArtisan(): void {
    this.artisanService.getArtisan(this.artisanId).subscribe({
      next: (res) => {
        this.artisan = res;
      },
      error: (err) => {
        console.error('Error fetching artisan details:', err);
      }
    });
  }
}
