import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  private baseUrl = environment.apiBaseUrl + '/programs';

  constructor(private http: HttpClient) {}

  // =========================
  // ✅ GET ALL PROGRAMS
  // =========================
  getAll(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(this.baseUrl);
  }

  // =========================
  // ✅ GET PROGRAM BY ID
  // =========================
  getById(id: number): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.baseUrl}/${id}`);
  }

  // =========================
  // ✅ CREATE PROGRAM
  // =========================
  create(data: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.baseUrl, data);
  }

  // =========================
  // ✅ UPDATE PROGRAM
  // =========================
  update(id: number, data: any): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.baseUrl}/${id}`, data);
  }

  // =========================
  // ✅ DELETE PROGRAM
  // =========================
  delete(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.baseUrl}/${id}`);
  }
}