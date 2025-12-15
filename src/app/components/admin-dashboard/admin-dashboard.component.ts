import { Component, OnInit } from '@angular/core';
import { ArtisanService } from '../../services/artisan.service';
import { CustomerService } from '../../services/customer.service';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  loading = true;

  totalArtisans = 0;
  totalCustomers = 0;
  totalJobs = 0;
  completedJobs = 0;
  pendingJobs = 0;
  assignedJobs = 0;

  revenue = 0;

  constructor(
    private artisanService: ArtisanService,
    private customerService: CustomerService,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.loadDashboardStats();
  }

  loadDashboardStats() {
    this.loading = true;

    // Load artisans
    this.artisanService.getArtisans().subscribe({
      next: artisans => {
        this.totalArtisans = artisans.length;
      }
    });

    // Load customers (backend must supply list endpoint)
    this.customerService.getAllCustomers().subscribe({
      next: customers => {
        this.totalCustomers = customers.length;
      }
    });

    // Load jobs
    this.jobService.getAllJobs().subscribe({
      next: jobs => {
        this.totalJobs = jobs.length;

        this.completedJobs = jobs.filter(j => j.status === 'CustomerConfirmed').length;

        this.pendingJobs = jobs.filter(j => j.status === "Pending").length;
        this.assignedJobs = jobs.filter(j => j.status === "Assigned").length;

        // Calculate revenue
        this.revenue = jobs
          .filter(j => j.artisanCharge !== undefined && j.artisanCharge !== null)
          .reduce((sum, j) => sum + (j.artisanCharge ?? 0), 0);

        this.loading = false;
      },
      error: err => {
        console.error("Dashboard load error:", err);
        this.loading = false;
      }
    });
  }

  // Helper method to calculate completion rate percentage
  getCompletionRate(): number {
    if (this.totalJobs === 0) return 0;
    return Math.round((this.completedJobs / this.totalJobs) * 100);
  }

}