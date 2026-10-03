import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Visit } from '../interfaces/visit';

@Injectable({
  providedIn: 'root'
})
export class VisitsService {

  private apiUrl =
    'http://localhost:8080/cmsexam/api/visits';

  constructor(
    private http: HttpClient
  ) {}


  // ============================================
  // GET ALL VISITS FOR REPORT
  // ============================================

  getVisits(
    reportId: number
  ): Observable<Visit[]> {

    return this.http.get<Visit[]>(
      `${this.apiUrl}/report/${reportId}`
    );
  }


  // ============================================
  // GET ONE VISIT
  // ============================================

  getVisit(
    reportId: number,
    visitId: number
  ): Observable<Visit> {

    return this.http.get<Visit>(
      `${this.apiUrl}/${reportId}/${visitId}`
    );
  }


  // ============================================
  // SAVE NEW VISIT
  // POST /api/visits/{reportId}
  // ============================================

  saveVisit(
    reportId: number,
    visit: Visit
  ): Observable<Visit> {

    console.log(
      'Saving visit:',
      visit,
      'reportId:',
      reportId
    );

    // Make sure reportId is included
    visit.reportId = reportId;

    return this.http.post<Visit>(
      `${this.apiUrl}/${reportId}`,
      visit
    );
  }


  // ============================================
  // UPDATE EXISTING VISIT
  // PUT /api/visits/{reportId}/{visitId}
  // ============================================

  updateVisit(
    reportId: number,
    visitId: number,
    visit: Visit
  ): Observable<Visit> {

    console.log(
      'Updating visit:',
      visitId,
      'reportId:',
      reportId,
      visit
    );

    return this.http.put<Visit>(
      `${this.apiUrl}/${reportId}/${visitId}`,
      visit
    );
  }


  // ============================================
  // DELETE VISIT
  // DELETE /api/visits/{reportId}/{visitId}
  // ============================================

  deleteVisit(
    reportId: number,
    visitId: number
  ): Observable<void> {

    console.log(
      'Deleting visit:',
      visitId,
      'reportId:',
      reportId
    );

    return this.http.delete<void>(
      `${this.apiUrl}/${reportId}/${visitId}`
    );
  }
}