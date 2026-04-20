import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //private baseUrl = 'http://localhost:8080/api/users';
  private baseUrl = environment.apiBaseUrl + '/users';

  constructor(private http: HttpClient) {}

  // =========================
  // ✅ CREATE USER
  // =========================
  createUser(data: any): Observable<any> {
    console.log('Creating user with data:', data);
    return this.http.post(this.baseUrl, data);
  }

  // =========================
  // ✅ GET ALL USERS
  // =========================
  getUsers(): Observable<any[]> {
    console.log('Fetching users from:', this.baseUrl);
    return this.http.get<any[]>(this.baseUrl);
  }
   getRoles(): Observable<any[]> {
    console.log('Fetching Role IDs from:', this.baseUrl);
    let url = this.baseUrl;

    url = this.baseUrl+"/roles" ;
    return this.http.get<any[]>(url);
  }
  

  // =========================
  // ✅ GET USER BY ID
  // =========================
  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // =========================
  // ✅ UPDATE USER
  // =========================
  updateUser(id: number, data: any): Observable<any> {
    console.log(`${this.baseUrl}/${id}`);
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  // =========================
  // ✅ DELETE USER
  // =========================
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // =========================
  // 🔍 GET USERS BY ROLE (IMPORTANT)
  // =========================
  getByRole(roleName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/rolename/${roleName}`);
  }

  // =========================
  // 🔍 GET USERS BY ROLE ID
  // =========================
  getByRoleId(roleId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/roleId/${roleId}`);
  }

  // =========================
  // 🔍 SEARCH USERS
  // =========================
  searchUsers(keyword: string): Observable<any[]> {
    const params = new HttpParams().set('q', keyword);
    return this.http.get<any[]>(`${this.baseUrl}/search`, { params });
  }

  // =========================
  // 🔐 RESET PASSWORD
  // =========================
  resetPassword(userId: number, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${userId}/reset-password`, {
      password: password
    });
  }

  // =========================
  // 🔄 CHANGE STATUS (ACTIVE / INACTIVE)
  // =========================
  changeStatus(userId: number, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${userId}/status`, {
      status: status
    });
  }
}