import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-customer-confirm-job',
  templateUrl: './customer-confirm-job.component.html',
  styleUrls: ['./customer-confirm-job.component.css']
})
export class CustomerConfirmJobComponent implements OnInit {
  jobId!: string;
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    // Get job ID from URL
    const id = this.route.snapshot.paramMap.get('id');
    
    console.log('🆔 Raw ID from route:', id);
    console.log('🔍 Route params:', this.route.snapshot.params);
    console.log('🔍 Query params:', this.route.snapshot.queryParams);
    
    if (!id) {
      this.errorMessage = 'No job ID provided in the URL.';
      console.error('❌ No job ID found in route');
      return;
    }

    // Validate GUID format
    const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!guidRegex.test(id)) {
      this.errorMessage = 'Invalid job ID format. Expected a GUID.';
      console.error('❌ Invalid GUID format:', id);
      return;
    }

    this.jobId = id;
    console.log('✅ Valid job ID set:', this.jobId);
  }

  confirmJob() {
    if (!this.jobId) {
      this.errorMessage = 'Job ID is missing.';
      return;
    }

    console.log('📤 Confirming job with ID:', this.jobId);
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.jobService.customerConfirmJob(this.jobId).subscribe({
      next: (response) => {
        console.log('✅ Job confirmed successfully:', response);
        this.successMessage = 'You have successfully confirmed the job!';
        this.errorMessage = '';
        this.loading = false;

        setTimeout(() => {
          this.router.navigate(['/customer/jobs']);
        }, 1500);
      },
      error: (err) => {
        console.error('❌ Error confirming job:', err);
        console.error('Error status:', err.status);
        console.error('Error body:', err.error);
        
        this.successMessage = '';
        
        // Handle different error types
        if (err.status === 400) {
          this.errorMessage = err.error?.message || 'Bad request. Job may not be in the correct status.';
        } else if (err.status === 401) {
          this.errorMessage = 'You are not authorized to confirm this job.';
        } else if (err.status === 404) {
          this.errorMessage = 'Job not found.';
        } else {
          this.errorMessage = err.error?.message || 'Unable to confirm job. Please try again.';
        }
        
        this.loading = false;
      }
    });
  }
}