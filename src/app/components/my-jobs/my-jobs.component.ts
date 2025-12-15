import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Job } from 'src/app/models/job.model';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.css']
})
export class MyJobsComponent implements OnInit {
  jobs: Job[] = [];
  filteredJobs: Job[] = [];
  paginatedJobs: Job[] = [];
  selectedFilter: string = 'all';
  
  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(
    private jobService: JobService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs() {
    this.jobService.getMyJobs().subscribe({
      next: res => {
        this.jobs = res;
        this.filterJobs('all');
      },
      error: err => console.error(err)
    });
  }

  filterJobs(filter: string) {
    this.selectedFilter = filter;
    this.currentPage = 1; // Reset to first page when filtering

    switch(filter) {
      case 'pending':
        this.filteredJobs = this.jobs.filter(job => 
          job.status === 'AwaitingCustomerConfirmation' || 
          job.status === 'AwaitingArtisan' ||
          job.status === 'Pending'
        );
        break;
      case 'completed':
        this.filteredJobs = this.jobs.filter(job => 
          job.status === 'CustomerConfirmed' || 
          job.status === 'Confirmed'
        );
        break;
      default:
        this.filteredJobs = [...this.jobs];
    }

    this.updatePaginatedJobs();
  }

  getPendingCount(): number {
    return this.jobs.filter(job => 
      job.status === 'AwaitingCustomerConfirmation' || 
      job.status === 'AwaitingArtisan' ||
      job.status === 'Pending'
    ).length;
  }

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'AwaitingCustomerConfirmation': 'awaiting',
      'AwaitingArtisan': 'pending',
      'WorkCompletedByArtisan': 'completed',
      'InProgress': 'in-progress',
      'Completed': 'completed',
      'Confirmed': 'completed',
      'Cancelled': 'cancelled',
      'Pending': 'pending'
    };
    return statusMap[status] || 'pending';
  }

  getStatusLabel(status: string): string {
    const labelMap: { [key: string]: string } = {
      'AwaitingCustomerConfirmation': 'Awaiting Confirmation',
      'AwaitingArtisan': 'Pending Artisan',
      'WorkCompletedByArtisan': 'Work Completed',
      'InProgress': 'In Progress',
      'Completed': 'Completed',
      'Confirmed': 'Confirmed',
      'Cancelled': 'Cancelled',
      'Pending': 'Pending'
    };
    return labelMap[status] || status;
  }

  confirm(jobId: string) {
    if (confirm('Are you sure you want to confirm this job as completed?')) {
      this.jobService.confirmJob(jobId).subscribe({
        next: () => {
          alert("Job confirmed successfully!");
          this.loadJobs();
        },
        error: err => {
          console.error(err);
          alert("Error confirming job. Please try again.");
        }
      });
    }
  }

  viewJobDetails(jobId: string) {
    this.router.navigate(['/customer/job-details', jobId]);
  }

  // Pagination methods
  getTotalPages(): number {
    return Math.ceil(this.filteredJobs.length / this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
      this.updatePaginatedJobs();
    }
  }

  updatePaginatedJobs() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedJobs = this.filteredJobs.slice(startIndex, endIndex);
  }

  getPageNumbers(): number[] {
    const totalPages = this.getTotalPages();
    const pages: number[] = [];
    
    // Show max 5 page numbers
    let startPage = Math.max(1, this.currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    
    // Adjust start if we're near the end
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }
}