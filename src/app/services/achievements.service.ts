import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Achievement } from '../interfaces/achievement';

@Injectable({
  providedIn: 'root'
})

export class AchievementsService {

  private apiUrl = 'http://localhost:8080/cmsexam/api/achievements';

  constructor(private http: HttpClient) {}

  getAchievements(reportId: number): Observable<Achievement[]> {
    return this.http.get<Achievement[]>(
      `${this.apiUrl}/report/${reportId}`
    );
  }

  saveAchievement(
    reportId: number,
    achievement: Achievement
  ): Observable<Achievement> {
    return this.http.post<Achievement>(
      `${this.apiUrl}/${reportId}`,
      { ...achievement, reportId }
    );
  }

  updateAchievement(
    reportId: number,
    id: number,
    achievement: Achievement
  ): Observable<Achievement> {
    return this.http.put<Achievement>(
      `${this.apiUrl}/${reportId}/${id}`,
      { ...achievement, reportId }
    );
  }

  deleteAchievement(
    reportId: number,
    id: number
  ): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${reportId}/${id}`
    );
  }
}