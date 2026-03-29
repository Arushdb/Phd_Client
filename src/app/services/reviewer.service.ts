
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ReviewerDashboardModel } from '../models/reviewer-dashboard.model';
import { ApiResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class ReviewerService {

  
  private baseUrl = environment.apiBaseUrl+'/reviewer';
  

  constructor(private http: HttpClient) {}

  // ===============================
  // 1️⃣ Get Dashboard Data
  // ===============================
  getDashboard(): Observable<ApiResponse<ReviewerDashboardModel[]>> {
   console.log("in side dashboard",this.baseUrl);

    return this.http.get<ApiResponse<ReviewerDashboardModel[]>>(
      `${this.baseUrl}/dashboard`
    );
  }

  // ===============================
  // 2️⃣ Get Pending Reports
  // ===============================
  getPendingReports(): Observable<any> {

    return this.http.get(
      `${this.baseUrl}/pending`
    );
  }

  // ===============================
  // 3️⃣ Get Report Details
  // ===============================
  getReport(reportId: number): Observable<any> {

    return this.http.get(
      `${this.baseUrl}/report/${reportId}`
    );
  }

  // ===============================
  // 4️⃣ Approve Report
  // ===============================
  approveReport(reportId: number): Observable<any> {

    return this.http.post(
      `${this.baseUrl}/approve/${reportId}`,
      {}
    );
  }

  // ===============================
  // 5️⃣ Request Revision
  // ===============================
  requestRevision(reportId: number, remarks: string): Observable<any> {

    return this.http.post(
      `${this.baseUrl}/revision/${reportId}?remarks=${encodeURIComponent(remarks)}`,
      {}
    );
  }


  

}