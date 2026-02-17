// src/app/services/api.service.ts

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

import { ActiveSemester, ApiResponse } from '../models/api-response';
import { int } from '@zxing/library/esm/customTypings';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // Adjust this base URL to match your backend
  private base = environment.apiBaseUrl;
  //private readonly base = 'http://localhost:8080/cmsexam/api';

  constructor(private http: HttpClient) {}

  // ------------------
  // Authentication
  // ------------------
  login(username: string, password: string): Observable<any> {
    const url = `${this.base}/auth/signin`;
    return this.http.post<any>(
      url,
      { username, password },
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        withCredentials: true,
      }
    ).pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        }));
  }

  // ------------------
  // Scholars
  // ------------------
  getScholars(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/scholars`);
  }

  createScholar(payload: any): Observable<any> {
    //     const headers = new HttpHeaders({
    //   'Authorization': 'Bearer ' + localStorage.getItem("token")
    // });
    return this.http.post<any>(`${this.base}/scholars/generate`, payload);
  }

  registerFromAdmission(
    admissionId: number,
    univCode = 'ABC',
    programCode = 'PhD'
  ): Observable<any> {
    const url = `${this.base}/register/from-admission`;
    const params = new HttpParams()
      .set('admissionId', admissionId.toString())
      .set('univCode', univCode)
      .set('programCode', programCode);
    return this.http.post<any>(url, {}, { params });
  }

  previewNextRegNo(univCode: string, programCode: string): Observable<string> {
    const url = `${this.base}/register/preview-next`;
    const params = new HttpParams()
      .set('univCode', univCode)
      .set('programCode', programCode);
    return this.http.get<string>(url, { params });
  }

  // ------------------
  // Semesters & self-registration
  // ------------------
  getAvailableSemesters(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/semesters/available`);
  }

  getMyApplications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/self-registration/mine`);
  }

  applyForSemester(semesterId: number, notes?: string): Observable<any> {
    const url = `${this.base}/self-registration/apply`;
    return this.http.post<any>(url, { semesterId, notes });
  }

  cancelApplication(semesterId: number): Observable<any> {
    const url = `${this.base}/self-registration/cancel`;
    return this.http.post<any>(url, { semesterId });
  }

  // ------------------
  // Progress Reports / Remarks / Topics (you can expand likewise)
  // ------------------
  getProgressReports(scholarId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/progress-reports`, {
      params: new HttpParams().set('scholarId', scholarId.toString()),
    });
  }

  createProgressReport(scholarId: number, payload: any): Observable<any> {
    const url = `${this.base}/progress-reports`;
    return this.http.post<any>(url, payload, {
      params: new HttpParams().set('scholarId', scholarId.toString()),
    });
  }

  // Remarks
  getRemarks(context: string, contextId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/remarks`, {
      params: new HttpParams()
        .set('context', context)
        .set('contextId', contextId.toString()),
    });
  }

  addRemark(payload: any): Observable<any> {
    return this.http.post<any>(`${this.base}/remarks`, payload);
  }

  // Research topics
  getTopics(scholarId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/topics`, {
      params: new HttpParams().set('scholarId', scholarId.toString()),
    });
  }

  createTopic(scholarId: number, payload: any): Observable<any> {
    return this.http.post<any>(
      `${this.base}/topics?scholarId=${scholarId}`,
      payload
    );
  }

  updateTopic(topicId: number, payload: any): Observable<any> {
    return this.http.put<any>(`${this.base}/topics/${topicId}`, payload);
  }

  //  getActiveSemester(): Observable<ApiResponse> {
  //   return this.http.get<ApiResponse>(
  //     `${this.base}/active-semester`
  //   );
  // }

  getActiveSemester(): Observable<ApiResponse<ActiveSemester>> {
    return this.http
      .get<ApiResponse<ActiveSemester>>(`${this.base}/register/active-semester`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      );
  }
  RegisterSemester(regform: any): Observable<any> {
    console.log('RegisterSemester called with form value:', regform.value);
    const params = new HttpParams()
      .set('scholarid', regform.value.scholarid.toString())
      .set('semesterId', regform.value.semesterId.toString());

    return this.http
      .get<ApiResponse<any>>(`${this.base}/register/register-semester`, {
        params,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      );
  }
}

// getPreviousSemesterStatus(): Observable<ApiResponse<ActiveSemester[]>> {
//     return this.http.get<any>(`${this.base}/register/previous-semester-status`);
//   }
