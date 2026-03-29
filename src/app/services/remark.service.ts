import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Remark } from '../models/Remark';

@Injectable({
  providedIn: 'root'
})
export class RemarkService {
  
  private base = environment.apiBaseUrl+'/remarks';
  

  constructor(private http: HttpClient) {}

  // get all remarks for a report
  getRemarks(contextId: number) {
     const params = new HttpParams()
    .set('context', "PROGRESS_REPORT")
    .set('contextId', contextId.toString());
   return this.http.get<Remark[]>(this.base, { params });
  }

  // add new remark
  addRemark(remark: any) {
    console.log('Adding remark :', remark); 
    console.log('POST URL:', `${this.base}`);
   const token = localStorage.getItem('token') || '';
    const headers = {
  Authorization: 'Bearer ' + token
};
console.log('remark:', remark);


    return this.http.post(`${this.base}`, 
    
      remark
    , { headers });
  }

  // buildRemarkTree(remarks: Remark[]) {
  //   const map = new Map();
  //   console.log('Building remark tree from:', remarks);

  //   // Step 1: initialize map
  //   remarks.forEach((r) => {
  //     r.replies = [];
  //     map.set(r.remarkId, r);
  //   });

  //   const roots: any[] = [];

  //   // Step 2: build hierarchy
  //   remarks.forEach((r) => {
  //     if (r.parentRemarkId) {
  //       const parent = map.get(r.parentRemarkId);
  //       if (parent) {
  //         parent.children.push(r);
  //       }
  //     } else {
  //       roots.push(r);
  //     }
  //   });

  //   return roots;
  // }
 // ===============================
  // Convert flat list → threaded tree
  // ===============================
  buildRemarkTree(remarks: Remark[]): Remark[] {

    const map: any = {};
    const roots: any[] = [];

    remarks.forEach(r => {
      r.replies = [];
      map[r.remarkId] = r;
    });

    remarks.forEach(r => {
      if (r.parentRemarkId) {
        map[r.parentRemarkId]?.replies.push(r);
      } else {
        roots.push(r);
      }
    });

    return roots;
  }

submitRemarkReply(payload: {
  parentRemarkId: number;
  remarkText: string;
  contextId: number;
  
}) {

  const token = localStorage.getItem('token') || '';

  const headers = {
    Authorization: 'Bearer ' + token
  };

  return this.http.post(`${this.base}`, {
    reviewContext: 'PROGRESS_REPORT',
    contextId: payload.contextId,              // ✅ correct
    parentRemarkId: payload.parentRemarkId,
    remarkText: payload.remarkText,
    isPrivate: false,
     

  }, { headers });
}
 

 
}
