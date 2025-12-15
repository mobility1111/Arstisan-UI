import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from '../services/job.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css']
})
export class CreateJobComponent {
  jobForm: FormGroup;

  constructor(private fb: FormBuilder, private jobService: JobService) {
    this.jobForm = this.fb.group({
      description: ['', Validators.required],
      preferredDate: ['', Validators.required],
      category: ['', Validators.required],
      location: ['', Validators.required],
      notes: ['']
    });
  }

  createJob() {
    if (!this.jobForm.valid) return;

    this.jobService.createJob(this.jobForm.value).subscribe({
      next: res => {
        this.showToast('Job created successfully!', 'success');
        this.jobForm.reset();
      },
      error: err => {
        console.error(err);
        this.showToast('Failed to create job.', 'error');
      }
    });
  }

  private showToast(message: string, icon: 'success' | 'error') {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: icon,
      title: message,
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true
    });
  }
}
