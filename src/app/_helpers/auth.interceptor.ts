import { HTTP_INTERCEPTORS, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError, finalize } from 'rxjs/operators';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TokenStorageService } from '../services/token/token-storage.service';
import { Router } from '@angular/router';

const TOKEN_HEADER_KEY = 'Authorization';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router

  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let auth_req = req;


    const token = this.tokenStorage.getToken();
    if (token != null) {
       auth_req = req.clone({
        headers: req.headers.set(TOKEN_HEADER_KEY, token),
      });

    }
    return next.handle(auth_req).pipe(

      catchError((error) => {
        if (error.status === 401 || error.status === 403) {
          this.tokenStorage.removeToken();
          this.router.navigate(['../auth/login']);
        }
        throw new Error(error)
      })

    );
  }
}
export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
