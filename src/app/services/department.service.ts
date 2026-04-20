
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// =========================
// API RESPONSE MODEL
// =========================
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response';
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

 
   private baseUrl = environment.apiBaseUrl + '/departments';

  constructor(private http: HttpClient) {}

  // =========================
  // ✅ GET ALL DEPARTMENTS
  // =========================
  getAll(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(this.baseUrl);
  }

  // =========================
  // ✅ GET BY FACULTY (IMPORTANT)
  // =========================
  getByFaculty(facultyId: number): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(
      `${this.baseUrl}/faculty/${facultyId}`
    );
  }

  // =========================
  // ✅ GET BY ID
  // =========================
  getById(id: number): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(
      `${this.baseUrl}/${id}`
    );
  }

  // =========================
  // ✅ CREATE
  // =========================
  create(data: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(
      this.baseUrl,
      data
    );
  }

  // =========================
  // ✅ UPDATE
  // =========================
  update(id: number, data: any): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(
      `${this.baseUrl}/${id}`,
      data
    );
  }

  // =========================
  // ✅ DELETE
  // =========================
  delete(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(
      `${this.baseUrl}/${id}`
    );
  }

  // =========================
  // ✅ SEARCH (OPTIONAL)
  // =========================
  search(keyword: string): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(
      `${this.baseUrl}/search?keyword=${keyword}`
    );
  }
}