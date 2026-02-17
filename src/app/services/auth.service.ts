// src/app/services/auth.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, fromEvent, merge, timer } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

export type Role = 'ADMIN' | 'FACULTY' | 'SCHOLAR'|'SUPERVISOR'|'CO-SUPERVISOR'|'DEAN'|'HOD';

export interface User {
  id: string;
  name: string;
  roles: Role[];
  // add other fields you need
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();
   private readonly base = 'http://localhost:8080/cmsexam/api';
  // timer id returned by window.setTimeout
  private autoLogoutTimer: number | null = null;
  public refreshing = false;
  public refreshTokenSubject = new BehaviorSubject<string | null>(null);

  // idle detection
  private idleSub: Subscription | null = null;
  // how long of inactivity before auto-logout (ms)
  public idleTimeoutMs =  60 * 1000; // default 15 minutes
  // optional warning period before logout (ms) — you can use this to show modal
  public warnBeforeLogoutMs = 60 * 1000; // default 60s before actual logout

  constructor(private router: Router,private http: HttpClient) {
    //this.hydrateFromStorage();
    this.startIdleWatch(); // starts idle detection; you may choose to call this elsewhere
    // debug log (no-op in production if you remove)
    this.currentUser$.pipe(tap(u => console.debug('[AuthService] currentUser', u))).subscribe();
  }

  ngOnDestroy(): void {
    this.clearAutoLogoutTimer();
    this.stopIdleWatch();
  }

  // ------------------------
  // Public API
  // ------------------------

  /**
   * Login: persist user + token. Schedules auto logout based on token expiry.
   * @param user User object (from backend)
   * @param token JWT token (string)
   */
  login(username:string, password:string):  Observable<any> {
    
   
        const url = `${this.base}/auth/signin`;
    return this.http.post<any>(
    url,
    { username, password },
    {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true
    }
  );
    
  }

  //  get refreshToken() {
  //   return localStorage.getItem('refresh_token');
  // }

  get accessToken() {
    return localStorage.getItem('access_token');
  }

  setAccessToken(token: string) {
  localStorage.setItem('access_token', token);
}
  // saveTokens(access: string, refresh: string) {
  //   localStorage.setItem('access_token', access);
  //   //localStorage.setItem('refresh_token', refresh);
  // }

  /**
   * Logout user (client-side). Optionally pass reason for redirect query param.
   */
  logout(reason?: string): void {
    // clear storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('tokentype');
    localStorage.removeItem('username');
    localStorage.removeItem('isLoggedIn');
  

    // clear subject
    this.currentUserSubject.next(null);

    // clear timers/subscriptions
    this.clearAutoLogoutTimer();
    this.stopIdleWatch();

    // navigate to login
    this.router.navigate(['/login'], { queryParams: reason ? { reason } : {} });
  }


  refreshAccessToken(): Observable<any> {
  return this.http.post<any>(
    `${this.base}/auth/refresh`,
    {},
    { withCredentials: true }
  ).pipe(
    tap(res => this.setAccessToken(res.accessToken))
  );
}

  /**
   * Return currently stored user
   */
  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Quick auth boolean
   */
  isAuthenticated(): boolean {
    return !!this.currentUser && !!localStorage.getItem('access_token');
  }

  /**
   * Check roles
   */
  hasRole(...roles: Role[]): boolean {
    const user = this.currentUser;
    if (!user) return false;
    return roles.some(r => user.roles.includes(r));
  }

  // ------------------------
  // Token/expiry helpers
  // ------------------------

  /**
   * Safely parse a JWT and return expiration as unix epoch ms.
   * Returns 0 on failure.
   */
  getTokenExpiration(token: string | null): number {
    debugger
    if (!token) return 0;
    try {
      const payloadBase64 = token.split('.')[1];
      const payloadJson = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'));
      const payload = JSON.parse(payloadJson);
      if (!payload || !payload.exp) return 0;
      return payload.exp * 1000; // exp in seconds -> ms
    } catch (err) {
      console.error('[AuthService] getTokenExpiration failed', err);
      return 0;
    }
  }

  /**
   * Cancel any scheduled auto logout
   */
  private clearAutoLogoutTimer(): void {
    if (this.autoLogoutTimer !== null) {
      clearTimeout(this.autoLogoutTimer);
      this.autoLogoutTimer = null;
    }
  }

  /**
   * Schedule a client-side logout after expirationMs milliseconds.
   * If expirationMs <= 0 it logs out immediately.
   */
  // scheduleAutoLogout(expirationMs: number): void {
  //   // sanitize
  //   if (!expirationMs || expirationMs <= 0) {
  //     this.logout('token-expired');
  //     return;
  //   }

  //   // clear existing
  //   this.clearAutoLogoutTimer();

  //   // optionally schedule a warning before logout
  //   const warnAt = Math.max(0, expirationMs - this.warnBeforeLogoutMs);
  //   // If you want to show a warning UI use this timer (not implemented here):
  //   // const warningTimerId = window.setTimeout(() => this.notifyWarnBeforeLogout(), warnAt);

  //   // schedule real logout
  //   this.autoLogoutTimer = window.setTimeout(() => {
  //     this.logout('token-expired');
  //   }, Math.max(0, expirationMs));
  // }

  // ------------------------
  // Idle detection
  // ------------------------

  /**
   * Start watching for user inactivity and logout when idleTimeoutMs elapses.
   * Uses modern RxJS (switchMap) rather than deprecated operators.
   */
  startIdleWatch(): void {
    // If already watching, do nothing
    if (this.idleSub) return;

    const activity$ = merge(
      fromEvent(document, 'mousemove'),
      fromEvent(document, 'mousedown'),
      fromEvent(document, 'touchstart'),
      fromEvent(document, 'keydown'),
      fromEvent(document, 'scroll')
    );

    // On any activity restart a timer; when timer emits, logout
    this.idleSub = activity$
      .pipe(
        // start timer after each activity
        switchMap(() => timer(this.idleTimeoutMs))
      )
      .subscribe(() => {
        // optionally you could show a modal here to allow the user to extend session
        console.log('User is idle, logging out');
        this.logout('idle-timeout');
      });
  }

  stopIdleWatch(): void {
    if (this.idleSub) {
      this.idleSub.unsubscribe();
      this.idleSub = null;
    }
  }

  // ------------------------
  // Interceptor helper
  // ------------------------

  /**
   * Call this from your interceptor when server responds with 401/403 to force logout.
   * e.g. if (err.status === 401) authService.handleAuthErrorFromServer(err);
   */
  handleAuthErrorFromServer(): void {
    // you could add logic to inspect server response first
    this.logout('server-401-403');
  }

  // ------------------------
  // Hydration on startup
  // ------------------------

  // private hydrateFromStorage(): void {
  //   const userJson = localStorage.getItem('currentUser');
  //   const token = localStorage.getItem('token');

  //   if (userJson) {
  //     try {
  //       const user = JSON.parse(userJson) as User;
  //       this.currentUserSubject.next(user);
  //     } catch {
  //       localStorage.removeItem('currentUser');
  //     }
  //   }

  //   if (token) {
  //     const exp = this.getTokenExpiration(token);
  //     const msUntilExpiry = exp - Date.now();

  //     if (msUntilExpiry <= 0) {
  //       // expired already -> clear state
  //       this.logout('token-expired');
  //     } else {
  //       // schedule auto logout from token expiry
  //       this.scheduleAutoLogout(msUntilExpiry);
  //     }
  //   }
  // }
}
