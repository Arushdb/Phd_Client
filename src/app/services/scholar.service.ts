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
import { DocumentModel } from '../models/document-model';

@Injectable({
  providedIn: 'root',
})
export class ScholarService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getScholarProfile(): Observable<ApiResponse<any>> {
    //const params = new HttpParams().set('userid', userid.toString())
    debugger;

    return this.http
      .get<ApiResponse<any>>(`${this.baseUrl}/scholars/profile`, {
        //params: params
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        }),
      );
  }

   createScholar(payload: any): Observable<any> {
      
    return this.http
    .post<ApiResponse<null>> (`${this.baseUrl}/scholars/generate`, payload)
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
      .post<ApiResponse<null>>(`${this.baseUrl}/progress/save`, request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        }),
      );
  }

  /* ================= SUBMIT ================= */
  submitReport(request: ProgressReportRequest): Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(`${this.baseUrl}/progress/submit`,request)
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
      `${this.baseUrl}/progress/semester/${semesterRegistrationId}`,
    );
  }

  /* ================= GET ALL REPORTS ================= */
  getAllProgressReports(): Observable<ApiResponse<ProgressReport[]>> {
    return this.http.get<ApiResponse<ProgressReport[]>>(
      `${this.baseUrl}/progress/all`,
    );
  }

  /* ================= Get reviewer reports ================= */
  getReviewerReports(): Observable<ApiResponse<ProgressReport[]>> {
    return this.http.get<ApiResponse<ProgressReport[]>>(
      `${this.baseUrl}/progress/reviewer`,
    );
  }

  getScholarRemarks(contextId: number): Observable<ApiResponse<any>> {
    console.log('Fetching scholar remarks for contextId:', contextId);
    return this.http.get<ApiResponse<any[]>>(
      `${this.baseUrl}/remarks/scholar/${contextId}`,
    );
  }


   loadScholarSemesters(scholarSemesterId: number): Observable<ApiResponse<any>> {
    console.log('Fetching scholar semesters for scholarSemesterId:', scholarSemesterId);
    return this.http.get<ApiResponse<any[]>>(
      `${this.baseUrl}/scholar-semester/${scholarSemesterId}`,
    );
  }


  // =========================
  // ✅ CREATE SCHOLAR
  // =========================
  createScholarnew(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  // =========================
  // ✅ GET ALL SCHOLARS
  // =========================
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // =========================
  // ✅ GET SCHOLAR BY ID
  // =========================
  getById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // =========================
  // ✅ UPDATE SCHOLAR
  // =========================
  updateScholar(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  // =========================
  // ✅ DELETE SCHOLAR
  // =========================
  deleteScholar(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // =========================
  // 🔍 SEARCH SCHOLARS
  // =========================
  search(keyword: string): Observable<any[]> {
    const params = new HttpParams().set('q', keyword);
    return this.http.get<any[]>(`${this.baseUrl}/search`, { params });
  }

  // =========================
  // 🔍 FILTER BY PROGRAM
  // =========================
  getByProgram(programId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/program/${programId}`);
  }

  // =========================
  // 🔍 FILTER BY DEPARTMENT
  // =========================
  getByDepartment(departmentId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/department/${departmentId}`);
  }

  // =========================
  // 🔍 GET BY USER ID (IMPORTANT)
  // =========================
  getByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/${userId}`);
  }

  // =========================
  // 🔍 GET SCHOLARS WITH SUPERVISOR
  // =========================
  getWithSupervisor(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/with-supervisor`);
  }

  // =========================
  // 🔄 CHANGE STATUS
  // =========================
  changeStatus(id: number, statusId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}/status`, {
      statusId: statusId
    });
  }
}
