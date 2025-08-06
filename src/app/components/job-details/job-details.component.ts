import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../services/job.service';
import { Job } from 'src/app/models/job.model';
import { ArtisanService } from 'src/app/services/artisan.service';
import { Artisan } from 'src/app/models/artisan.model';


@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html'
})
export class JobDetailsComponent implements OnInit {

  job!: Job;
  jobId!: string;
  availableArtisans: Artisan[] = [];
  selectedArtisanId: string = '';
  artisanCharge: number = 0;
  commissionRate = 500;  // Flat commission or you can make it dynamic

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private artisanService: ArtisanService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.jobId = this.route.snapshot.paramMap.get('id')!;
    this.loadJobDetails();
  }

  loadJobDetails() {
    this.jobService.getJob(this.jobId).subscribe(res => {
      this.job = res;
      this.loadAvailableArtisans();
    });
  }

  loadAvailableArtisans() {
    this.artisanService.getArtisans().subscribe(res => {
      // Filter artisans based on job service and location
      this.availableArtisans = res.filter(artisan =>
        artisan.serviceId.toLowerCase() === this.job.serviceType.toLowerCase() &&
        artisan.locationId.toLowerCase() === this.job.location.toLowerCase()
      );
    });
  }

  computeTotal(): number {
    return this.artisanCharge + this.commissionRate;
  }

  assignArtisan() {
    if (!this.selectedArtisanId || this.artisanCharge <= 0) {
      alert('Please select an artisan and enter a valid charge.');
      return;
    }

    this.jobService.assignArtisanToJob(this.jobId, this.selectedArtisanId, this.artisanCharge)
      .subscribe(() => {
        alert('Artisan assigned successfully!');
        this.loadJobDetails();  // Refresh job details
      });
  }

  updateJobStatus() {
    this.jobService.updateJobStatus(this.jobId, this.job.status).subscribe(() => {
      alert('Job status updated!');
    });
  }
}
