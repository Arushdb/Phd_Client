
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publication } from '../interfaces/Publication';


@Injectable({
  providedIn: 'root'
})
export class PublicationsService {

  private apiUrl =
    'http://localhost:8080/cmsexam/api/publications';

  constructor(private http: HttpClient) {}

  getPublications(reportId: number): Observable<Publication[]> {
    return this.http.get<Publication[]>(
      `${this.apiUrl}/${reportId}`
    );
  }

  savePublication(
    reportId: number,
    publication: Publication
  ): Observable<Publication> {
    return this.http.post<Publication>(
      `${this.apiUrl}/${reportId}`,
      { ...publication, reportId }
    );
  }

  updatePublication(
    reportId: number,
    id: number,
    publication: Publication
  ): Observable<Publication> {
    return this.http.put<Publication>(
      `${this.apiUrl}/${reportId}/${id}`,
      { ...publication, reportId }
    );
  }

  deletePublication(
    reportId: number,
    id: number
  ): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${reportId}/${id}`
    );
  }
}