import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-response';
import { DocumentModel, DocumentTypes } from '../models/document-model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private base = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
uploadProgressDocument(formData: FormData, reportId: string): Observable<ApiResponse<DocumentModel>> {
    return this.http.post<ApiResponse<DocumentModel>>(
      `${this.base}/documents/progress/${reportId}/upload`,
      formData  
    );
  }
  
   // Get Documents
  getProgressDocuments(
    reportId: number,scholarId?: number
  ): Observable<ApiResponse<DocumentModel[]>> {

    let url = `${this.base}/documents/progress/${reportId}`;
    if (scholarId !== undefined) {
      url += `?scholarId=${scholarId}`;
    }

    return this.http.get<ApiResponse<DocumentModel[]>>(
      `${url}`
    );
  }

  // Get Document Types
  getDocumentTypes(): Observable<ApiResponse<DocumentTypes[]>> {

    debugger;

    return this.http.get<ApiResponse<DocumentTypes[]>>(
      `${this.base}/documents/document-types`
    );
  }

  downloadDocument(documentId: number): Observable<Blob> {
    return this.http.get(
      `${this.base}/documents/download/${documentId}`,
      { responseType: 'blob' }
    );
  }

}


