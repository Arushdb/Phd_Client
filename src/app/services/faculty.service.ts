import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response';



@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  //private baseUrl = 'http://localhost:8080/api/faculty';
  private baseUrl = environment.apiBaseUrl + '/faculty';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(this.baseUrl);
  }

  search(name: string): Observable<ApiResponse<any[]> > {
    return this.http.get<ApiResponse<any[]>>(`${this.baseUrl}/search?name=${name}`);
  }

  create(name: string): Observable<ApiResponse<any[]> > {
    return this.http.post<ApiResponse<any[]>>(`${this.baseUrl}?name=${name}`, {});
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}