import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtisanService } from 'src/app/services/artisan.service';
import { JobService } from '../services/job.service';


@Component({
  selector: 'app-job-assign',
  templateUrl: './job-assign.component.html',
  styleUrls: ['./job-assign.component.css']
})
export class JobAssignComponent implements OnInit {

  jobId!: string;
  artisans: any[] = [];
  selectedArtisan = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService,
    private artisanService: ArtisanService
  ) {}

  ngOnInit(): void {
    this.jobId = this.route.snapshot.params['id'];
    this.loadArtisans();
  }

  loadArtisans() {
    this.artisanService.getArtisans().subscribe({
      next: res => this.artisans = res,
      error: err => console.error(err)
    });
  }

  assign() {
    if (!this.selectedArtisan) {
      alert('Please select an artisan');
      return;
    }

    this.jobService.assignArtisan(this.jobId, this.selectedArtisan).subscribe({
      next: () => {
        alert('Artisan assigned successfully!');
        this.router.navigate(['/admin/jobs']);
      },
      error: err => {
        console.error(err);
        alert('Failed to assign artisan');
      }
    });
  }

}
