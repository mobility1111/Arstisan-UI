import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../services/job.service';


@Component({
  selector: 'app-job-complete',
  templateUrl: './job-complete.component.html',
  styleUrls: ['./job-complete.component.css']
})
export class JobCompleteComponent implements OnInit {

  jobId!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.jobId = this.route.snapshot.params['id'];
  }

completeJob() {
  this.jobService.markJobCompleted(this.jobId).subscribe({
    next: () => {
      alert("Job marked as completed");
      this.router.navigate(['/admin/jobs']);
    },
    error: err => {
      console.error(err);
      alert("Failed to mark job as completed");
    }
  });
}

}
