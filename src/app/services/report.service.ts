import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { ReviewerDashboardModel } from '../models/reviewer-dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  

   private baseUrl = environment.apiBaseUrl+'/reports';
  

  constructor(private http: HttpClient) {}

  // getDashboard() {
  //   return this.http.get<any>(`${this.baseUrl}/dashboard`);
  // }

   getDashboard(): Observable<ApiResponse<ReviewerDashboardModel[]>> {
     console.log("in side report service dashboard",this.baseUrl);
  
      return this.http.get<ApiResponse<ReviewerDashboardModel[]>>(
        `${this.baseUrl}/dashboard`
      );
    }

    // submitReview(payload: { reportId: any; decision: any; remarks: any; }) {
    // throw new Error('Method not implemented.');

     submitReview(payload: { reportId: any; decision: any; remarks: any; }) {

    const params = new HttpParams()
      .set('reportId', payload.reportId.toString())
      .set('decision', payload.decision)
      .set('remarks', payload.remarks);
    return this.http.post<ApiResponse<any>>(
      `${this.baseUrl}/review`,null,{params}
      
    );  
  }
  }

