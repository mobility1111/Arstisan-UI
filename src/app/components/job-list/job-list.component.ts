import { Component, OnInit } from '@angular/core';
import { JobRequestService } from 'src/app/services/job-request.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  jobRequests: any[] = [];

  constructor(private jobRequestService: JobRequestService) {}

  ngOnInit() {
    this.loadJobRequests();
  }

  loadJobRequests() {
    this.jobRequestService.getJobRequests().subscribe({
      next: (data) => {
        this.jobRequests = data;
      },
      error: (err) => {
        console.error('Failed to load job requests:', err);
      }
    });
  }
}
