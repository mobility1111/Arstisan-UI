import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../services/job.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-hire-artisan',
  templateUrl: './hire-artisan.component.html',
  styleUrls: ['./hire-artisan.component.css']
})
export class HireArtisanComponent implements OnInit {
  artisanId!: string;
  hireForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private jobService: JobService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.artisanId = this.route.snapshot.paramMap.get('artisanId')!;

    this.hireForm = this.fb.group({
      description: ['', Validators.required],
      preferredDate: ['', Validators.required],
      notes: ['']
    });
  }

  submitRequest() {
    if (this.hireForm.valid) {
      const customerId = localStorage.getItem('customerId'); // or from auth service
      const job = {
        ...this.hireForm.value,
        customerId,
        artisanId: this.artisanId
      };

      this.jobService.createJob(job).subscribe(() => {
        alert('Request sent successfully!');
        this.router.navigate(['/artisans']);
      });
    }
  }
}
