import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private SESSION_KEY = 'COS_SESSION';
  private session$: BehaviorSubject<LoginDTO> = new BehaviorSubject(null);

  constructor(private cookieService: CookieService) { 
    try {
      const sessionFromCookie = this.cookieService.get(this.SESSION_KEY);
      if(!!sessionFromCookie) {
        this.session$.next(JSON.parse(sessionFromCookie))
      }
    } catch (error) {
      console.error('Failed to load session from cookie', error)
    }
  }

  clearSession() {
    this.session$.next(null);
    this.setSession(null);
  }

  getSession() {
    return this.session$.asObservable()
  }

  setSession(session: LoginDTO | null) {
    this.cookieService.set(
      this.SESSION_KEY, 
      JSON.stringify(session),
      1,
      '',
      '',
      false,
      "Lax"
    );
    this.session$.next(session);
  }
}
