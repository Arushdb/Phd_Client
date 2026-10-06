import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ProgressWork } from '../interfaces/progress-work';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProgressWorkService {

  private apiUrl =
    'http://localhost:8080/cmsexam/api/progress-work';

  constructor(private http: HttpClient) {}

  getProgressWork(reportId: number) {
    return this.http.get<ProgressWork[]>(
      `${this.apiUrl}/report/${reportId}`);
  }

  saveProgressWork(reportId: number, work: ProgressWork) {
    return this.http.post<ProgressWork>(
      `${this.apiUrl}/${reportId}`, work);
  }

  updateProgressWork(
    reportId: number, id: number, work: ProgressWork) {

    return this.http.put<ProgressWork>(
      `${this.apiUrl}/${reportId}/${id}`, work);
  }

  deleteProgressWork(reportId: number, id: number) {
    return this.http.delete(
      `${this.apiUrl}/${reportId}/${id}`);
  }
}

