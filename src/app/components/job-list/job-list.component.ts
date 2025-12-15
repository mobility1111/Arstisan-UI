import { Component, OnInit } from '@angular/core';

import { Job } from 'src/app/models/job.model';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  jobRequests: Job[] = [];

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.jobService.getMyJobs().subscribe({
      next: (data: Job[]) => {
        this.jobRequests = data;
      },
      error: (err: any) => {
        console.error("Failed to load jobs", err);
      }
    });
  }
}
