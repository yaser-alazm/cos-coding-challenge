import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';
import { switchMap, first } from 'rxjs/operators';

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {
  
  constructor(private sessionService: SessionService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.sessionService.getSession().pipe( 
      first(),
      switchMap((session: LoginDTO) => {

        // Only when session is truthy, headers are assign 
        if(!!session) {
          const headers = {
            'userId': session.userId,
            'authtoken': session.token
          };

          request = request.clone({
            setHeaders: headers
          });
        }
        
        return next.handle(request);
      })
    );  
  }
}
