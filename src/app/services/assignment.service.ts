import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response';
@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  private baseUrl = environment.apiBaseUrl + '/assign';

  constructor(private http: HttpClient) {}

  // ✅ Assign Supervisor
  assignSupervisor(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/supervisor`, data);
  }

  assignProgramRole(data: {
    userId: number;
    programId: number;
    role: string;
  }): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.baseUrl}/program-role`, data);
  }

  getAllProgramRole(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.baseUrl}/allprogramroles`);
  }
  getAllHodRoles(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.baseUrl}/allhodroles`);
  }


  getAllDeanRoles(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.baseUrl}/alldeanroles`);
  }

  // ✅ Assign Reviewer
  assignReviewer(data: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.baseUrl}/reviewer`, data);
  }

  // ✅ Assign HOD
  assignHod(data: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.baseUrl}/hod`, data);
  }

  // ✅ Assign Dean
  assignDean(data: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.baseUrl}/dean`, data);
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
    return this.http.delete<ApiResponse<any[]>>(
      `${this.baseUrl}/reviewer/${id}`
    );
  }

  removeHod(id: number): Observable<any> {
    return this.http.delete<ApiResponse<any[]>>(`${this.baseUrl}/hod/${id}`);
  }

  removeDean(id: number): Observable<any> {
    return this.http.delete<ApiResponse<any[]>>(`${this.baseUrl}/dean/${id}`);
  }
  searchAssignments(keyword: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/supervisor/search?keyword=${keyword}`,
    );
    //return this.http.get<any[]>(`/api/assign/supervisor/search?keyword=${keyword}`);
  }

  getAllSupervisorAssignments(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.baseUrl}/allsupervisors`);
  }

  deleteSupervisor(id: number) {
  return this.http.delete(`${this.baseUrl}/supervisor/${id}`);
}



searchProgramRoles(keyword: string, role: string) {
  return this.http.get(
    `${this.baseUrl}/program-role/search?keyword=${keyword}&role=${role}`
  );
}
searchHodRoles(keyword: string) {
  return this.http.get(
    `${this.baseUrl}/hod/search?keyword=${keyword}`
  );
}
searchDeanRoles(keyword: string) {
  return this.http.get(
    `${this.baseUrl}/dean/search?keyword=${keyword}`
  );
}
}
