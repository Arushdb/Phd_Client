// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Role = 'ADMIN' | 'FACULTY' | 'SCHOLAR';

export interface User {
  id: string;
  name: string;
  roles: Role[];
  // other fields...
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  // Observable for components to subscribe
  currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor() {
    // Optionally: load persisted user from localStorage/session
    const saved = localStorage.getItem('currentUser');
    if (saved) {
      this.currentUserSubject.next(JSON.parse(saved));
    }
     this.currentUser$.subscribe(user => {
      console.log('currentUser changed:', user);
    });
  }

  // Simple login simulator - replace with real API call
  loginAs(user: User) {
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  logout() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  hasRole(...roles: Role[]): boolean {
    const user = this.currentUser;
    if (!user) return false;
    return roles.some(r => user.roles.includes(r));
  }
}
