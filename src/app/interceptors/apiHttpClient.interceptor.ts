import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  constructor(@Inject('BASE_API_URL') private baseUrl: string, private cookieService: CookieService) {

  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headers: { [key: string]: string } = {};
    const token = this.cookieService.get("token");
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const apiReq = request.clone({ url: `${this.baseUrl}${request.url}`, setHeaders: headers });
    return next.handle(apiReq);
  }
}
