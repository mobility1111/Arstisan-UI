import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobRequest } from '../models/job-request.model';

@Injectable({
  providedIn: 'root'
})
export class JobRequestService {
  private apiUrl = 'https://localhost:7225/api/jobrequest';

  constructor(private http: HttpClient) {}

  createJobRequest(request: JobRequest): Observable<any> {
    return this.http.post(this.apiUrl, request);
  }

  getJobRequests(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
