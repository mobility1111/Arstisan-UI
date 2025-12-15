import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/models/job.model';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-admin-job-list',
  templateUrl: './admin-job-list.component.html',
  styleUrls: ['./admin-job-list.component.css']
})
export class AdminJobListComponent implements OnInit {
  jobs: Job[] = [];
  loading = true;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs() {
    this.jobService.getAllJobs().subscribe({
      next: res => {
        this.jobs = res;
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  // Helper method to get pending count for header stats
  getPendingCount(): number {
    return this.jobs.filter(job => 
      job.status === 'Pending' || 
      job.status === 'AwaitingCustomerConfirmation' ||
      job.status === 'Assigned'
    ).length;
  }

  // Helper method to get completed count for header stats
  getCompletedCount(): number {
    return this.jobs.filter(job => 
      job.status === 'Completed' || 
      job.status === 'CustomerConfirmed'
    ).length;
  }
}