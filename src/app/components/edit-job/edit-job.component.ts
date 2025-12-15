import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from '../services/job.service';


@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css']
})
export class EditJobComponent implements OnInit {

  jobId!: string;
  jobForm!: FormGroup;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService
  ) { }

  ngOnInit(): void {
    this.jobId = this.route.snapshot.params['id'];

    this.jobForm = this.fb.group({
      description: ['', Validators.required],
      preferredDate: ['', Validators.required],
      category: ['', Validators.required],
      location: ['', Validators.required],
      notes: ['']
    });

    this.loadJob();
  }

  loadJob() {
    this.jobService.getJobById(this.jobId).subscribe(job => {
      this.jobForm.patchValue(job);
      this.loading = false;
    });
  }

  updateJob() {
    if (this.jobForm.invalid) return;

    this.jobService.updateJob(this.jobId, this.jobForm.value).subscribe({
      next: _ => {
        alert("Job updated successfully");
        this.router.navigate(['/customer/jobs']);
      },
      error: err => {
        alert("Failed to update job");
        console.error(err);
      }
    });
  }
}
