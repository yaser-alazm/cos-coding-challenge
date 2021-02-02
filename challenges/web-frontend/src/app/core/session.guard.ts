import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SessionService } from './session.service';

@Injectable()
export class CanLoadAuthenthicatedPage implements CanActivate {
  constructor(private sessionService: SessionService, private router: Router) {}

  canActivate(): Observable<boolean|UrlTree> {
    return this.sessionService.getSession().pipe(
        switchMap<LoginDTO, boolean | UrlTree>((session) => {
          if(!!session) {
            return of(true);
          }

          return of(this.router.parseUrl('/login'))
        })
    )
  }
}