import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ProgressWork } from '../interfaces/progress-work';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressWorkService {
  
  private base = environment.apiBaseUrl+'/progress-work/';
  constructor(private http: HttpClient) {}

  saveProgressWork(data: ProgressWork[], reportId: number): Observable<any> {
    return this.http.post(
      this.base+reportId,
      data
    );
  }

  getProgressWork(reportId: number): Observable<any> {
    return this.http.get(
      this.base+reportId
    );
  }

  deleteProgressWork(progressWorkId: number) {
     return this.http.delete(
      this.base+progressWorkId
    );
  
  }

  
}
