import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from 'src/app/models/job.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'https://localhost:5001/api/job';

  constructor(private http: HttpClient) {}

  createJob(job: any): Observable<any> {
    return this.http.post(this.apiUrl, job);
  }

   getJobRequests(): Observable<Job[]> {
    return this.http.get<Job[]>(this.apiUrl);
  }

  getJob(id: string): Observable<Job> {
    return this.http.get<Job>(`${this.apiUrl}/${id}`);
  }

  assignArtisanToJob(jobId: string, artisanId: string, artisanCharge: number): Observable<any> {
    const payload = {
      artisanId: artisanId,
      artisanCharge: artisanCharge
    };
    return this.http.put(`${this.apiUrl}/assign-artisan/${jobId}`, payload);
  }

  updateJobStatus(jobId: string, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-status/${jobId}`, { status });
  }
}
