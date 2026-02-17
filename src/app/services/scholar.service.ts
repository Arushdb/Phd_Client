import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

import { ActiveSemester, ApiResponse } from '../models/api-response';
import { environment } from '../../environments/environment';
import { ProgressReportRequest } from '../models/progress-report-request';
import { ProgressReport } from '../models/progressreport';

@Injectable({
  providedIn: 'root',
})
export class ScholarService {
  private base = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getScholarProfile(): Observable<ApiResponse<any>> {
    //const params = new HttpParams().set('userid', userid.toString());

    return this.http
      .get<ApiResponse<any>>(`${this.base}/scholar/profile`, {
        //params: params
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        }),
      );
  }

 
  /* ================= SAVE DRAFT ================= */
  saveDraft(request: ProgressReportRequest): Observable<ApiResponse<null>> {
    console.log('Saving draft with request:', request);
    return this.http
      .post<ApiResponse<null>>(`${this.base}/progress/save`, request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        }),
      );
  }

  /* ================= SUBMIT ================= */
  submitReport(request: ProgressReportRequest): Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(`${this.base}/progress/submit`,request)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      }),
      //tap(res => console.log('Submit response:', res, 'Request payload:', 
      //request)    )
    );
  }

  /* ================= GET ONE REPORT ================= */
  getProgressReport(
    semesterRegistrationId: number,
  ): Observable<ApiResponse<ProgressReport>> {
    console.log('Fetching progress report for semesterRegistrationId:', semesterRegistrationId);
    return this.http.get<ApiResponse<ProgressReport>>(
      `${this.base}/progress/semester/${semesterRegistrationId}`,
    );
  }

  /* ================= GET ALL REPORTS ================= */
  getAllProgressReports(): Observable<ApiResponse<ProgressReport[]>> {
    return this.http.get<ApiResponse<ProgressReport[]>>(
      `${this.base}/progress/all`,
    );
  }
}
