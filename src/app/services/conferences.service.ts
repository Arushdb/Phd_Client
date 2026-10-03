import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConferenceAttended } from '../interfaces/conference-attended';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConferencesService {

  private apiUrl = 'http://localhost:8080/cmsexam/api/conferences';

  constructor(private http: HttpClient) {}


  // =====================================================
  // GET ALL CONFERENCES FOR A REPORT
  // GET /api/conferences/report/{reportId}
  // =====================================================

  getConferences(
    reportId: number
  ): Observable<ConferenceAttended[]> {

    return this.http.get<ConferenceAttended[]>(
      `${this.apiUrl}/${reportId}`
    );
  }


  // =====================================================
  // GET ONE CONFERENCE
  // GET /api/conferences/{reportId}/{conferenceId}
  // =====================================================

  getConference(
    reportId: number,
    conferenceId: number
  ): Observable<ConferenceAttended> {

    return this.http.get<ConferenceAttended>(
      `${this.apiUrl}/${reportId}/${conferenceId}`
    );
  }


  // =====================================================
  // CREATE CONFERENCE
  // POST /api/conferences
  // =====================================================

  saveConference(
    reportId: number,
    conference: ConferenceAttended
  ): Observable<ConferenceAttended> {

    console.log(
      'Saving conference:',
      conference,
      'reportId:',
      reportId
    );

    // Make sure reportId is sent with the object
    conference.reportId = reportId;

    return this.http.post<ConferenceAttended>(
       `${this.apiUrl}/${reportId}/`,
      conference
    );
  }


  // =====================================================
  // UPDATE CONFERENCE
  // PUT /api/conferences/{reportId}/{conferenceId}
  // =====================================================

  updateConference(
    reportId: number,
    conferenceId: number,
    conference: ConferenceAttended
  ): Observable<ConferenceAttended> {

    console.log(
      'Updating conference:',
      conferenceId,
      'reportId:',
      reportId,
      conference
    );

    return this.http.put<ConferenceAttended>(
      `${this.apiUrl}/${reportId}/${conferenceId}`,
      conference
    );
  }


  // =====================================================
  // DELETE CONFERENCE
  // DELETE /api/conferences/{reportId}/{conferenceId}
  // =====================================================

  deleteConference(
    conferenceId: number,
    reportId: number
  ): Observable<void> {

    console.log(
      'Deleting conference:',
      conferenceId,
      'reportId:',
      reportId
    );

    return this.http.delete<void>(
      `${this.apiUrl}/${reportId}/${conferenceId}`
    );
  }
}
