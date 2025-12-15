import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateJobRequest } from 'src/app/models/DTOs/create-job.dto';
import { Job } from 'src/app/models/job.model';
import { environment } from 'src/app/services/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private baseUrl = `${environment.baseApiUrl}/api/job`;

  constructor(private http: HttpClient) {}

  // Customer: Create job
  createJob(dto: CreateJobRequest): Observable<Job> {
    return this.http.post<Job>(`${this.baseUrl}/create`, dto);
  }

  // Customer: Get my jobs
  getMyJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.baseUrl}/my-jobs`);
  }

  // Customer: Confirm job completion
  confirmJob(jobId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/customer-confirm/${jobId}`, {});
  }

  // Admin: Get all jobs
  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.baseUrl}/all`);
  }

  // Admin: Assign artisan
assignArtisan(jobId: string, artisanId: string) {
  return this.http.put(`${this.baseUrl}/assign-artisan/${jobId}`, {
    artisanId: artisanId
  });
}


  // Admin: Set artisan charge
setCharge(jobId: string, charge: number) {
  return this.http.put(`${this.baseUrl}/set-charge/${jobId}`, {
    artisanCharge: charge
  });
}

markJobCompleted(jobId: string) {
  return this.http.put(`${this.baseUrl}/artisan-completed/${jobId}`, {});
}

getJobById(id: string) {
  return this.http.get(`${this.baseUrl}/${id}`);
}

updateJob(id: string, data: any) {
  return this.http.put(`${this.baseUrl}/edit/${id}`, data);
}


  // Admin: Mark completed
  adminMarkCompleted(jobId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin-complete/${jobId}`, {});
  }

customerConfirmJob(jobId: string) {
  return this.http.put(`${this.baseUrl}/customer-confirm/${jobId}`, {});
}


}
