import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  private baseUrl = 'http://localhost:8080/api/assign';

  constructor(private http: HttpClient) {}

  // ✅ Assign Supervisor
  assignSupervisor(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/supervisor`, data);
  }

  // ✅ Assign Reviewer
  assignReviewer(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/reviewer`, data);
  }

  // ✅ Assign HOD
  assignHod(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/hod`, data);
  }

  // ✅ Assign Dean
  assignDean(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/dean`, data);
  }

  // 🔍 OPTIONAL: Get assignments (for listing/edit)

  getSupervisorsByScholar(scholarId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/supervisor/${scholarId}`);
  }

  getReviewersByScholar(scholarId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/reviewer/${scholarId}`);
  }

  getHodByDepartment(departmentId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/hod/${departmentId}`);
  }

  getDeanByFaculty(facultyId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/dean/${facultyId}`);
  }

  // ❌ Remove assignments (recommended feature)

  removeSupervisor(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/supervisor/${id}`);
  }

  removeReviewer(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/reviewer/${id}`);
  }

  removeHod(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/hod/${id}`);
  }

  removeDean(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/dean/${id}`);
  }
}