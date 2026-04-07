
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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


  //  submitReview(payload: { reportId: any; decision: any; remarks: any; }) {

  //   const params = new HttpParams()
  //     .set('reportId', payload.reportId.toString())
  //     .set('decision', payload.decision)
  //     .set('remarks', payload.remarks);
  //   return this.http.post(
  //     `${this.baseUrl}/review`,null,{params}
      
  //   );  
  // }

submitAttendance(payload: { scholarSemesterId: any; semesterName: any;
   totalsessions: any; attendedsessions: any; attendancePercentage: any; 
   attendanceremarks: any;scholarid: any }) {

    console.log('Submitting attendance with payload:', payload);
    const params = new HttpParams()
      .set('scholarSemesterId', payload.scholarSemesterId.toString())
      .set('semesterName', payload.semesterName)
      .set('totalsessions', payload.totalsessions.toString())
      .set('attendedsessions', payload.attendedsessions.toString())
      .set('attendancePercentage', payload.attendancePercentage)
      .set('attendanceremarks', payload.attendanceremarks)
      .set('scholarid', payload.scholarid.toString());
    return this.http.post(
      `${this.baseUrl}/attendance`,null,{params}
      
    );  
  }



  

}