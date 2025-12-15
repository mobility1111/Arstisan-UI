import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../services/job.service';


@Component({
  selector: 'app-job-set-charge',
  templateUrl: './job-charge.component.html',
  styleUrls: ['./job-charge.component.css']
})
export class JobChargeComponent implements OnInit {

  jobId!: string;
  amount!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.jobId = this.route.snapshot.params['id'];
  }

  setCharge() {
    if (!this.amount || this.amount <= 0) {
      alert("Enter a valid amount");
      return;
    }

    this.jobService.setCharge(this.jobId, this.amount).subscribe({
      next: () => {
        alert("Charge set successfully!");
        this.router.navigate(['/admin/jobs']);
      },
      error: err => {
        console.error(err);
        alert("Failed to set charge");
      }
    });
  }
}
