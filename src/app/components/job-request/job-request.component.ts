import { Component, OnInit } from '@angular/core';
import { JobRequest } from 'src/app/models/job-request.model';
import { JobRequestService } from 'src/app/services/job-request.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-job-request',
  templateUrl: './job-request.component.html',
  styleUrls: ['./job-request.component.css']
})
export class JobRequestComponent implements OnInit {
  isSubmitting: boolean = false;
  isCustomerLoggedIn: boolean = false;

  jobRequest: JobRequest = {
    customerId: '',
    customerName: '',
    phoneNumber: '',
    location: '',
    serviceType: '',
    description: '',
    preferredDate: new Date()
  };

  constructor(
    private jobRequestService: JobRequestService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const role = this.authService.getUserRole();
    if (role === 'Customer') {
      const customerId = this.authService.getUserId();
      if (customerId) {
        this.jobRequest.customerId = customerId;
        this.isCustomerLoggedIn = true;
      }
    }
  }

  submitRequest() {
    if (!this.isCustomerLoggedIn) {
      alert('You must be logged in as a customer to request a service.');
      return;
    }

    this.isSubmitting = true;
    this.jobRequestService.createJobRequest(this.jobRequest).subscribe({
      next: () => {
        alert('Request sent successfully!');
        this.isSubmitting = false;
        this.resetForm();
      },
      error: (err) => {
        console.error('Error sending job request:', err);
        alert('Failed to send request. Please try again.');
        this.isSubmitting = false;
      }
    });
  }

  resetForm() {
    this.jobRequest = {
      customerId: this.jobRequest.customerId,  // retain customerId
      customerName: '',
      phoneNumber: '',
      location: '',
      serviceType: '',
      description: '',
      preferredDate: new Date()
    };
  }
}
