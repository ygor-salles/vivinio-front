import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HeaderService } from './../components/template/header/header.service';

const { apiUrl } = environment;

// Envia o token para o servidor automaticamente
@Injectable({
    providedIn: 'root'
  })
export class AutenticacaoInterceptor implements HttpInterceptor {
  constructor(private headerService: HeaderService, private router: Router) {}

  private isRefreshing = false;

  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null,
  );

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const token = this.headerService.getToken();

    return next.handle(this.setTokenHeaders(req, token)).pipe(
      catchError(error => {
        if (req.url !== `${apiUrl}/login`) {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            return this.handle401Error(req, next);
          }
        }
        return throwError(error);
      }),
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      this.headerService
        .atualizarToken()
        .then(token => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token);
          return next.handle(this.setTokenHeaders(request, token));
        })
        .catch(() => {
          this.headerService.logout();
          this.router.navigate(['login']);
        });
    }
    return this.refreshTokenSubject.pipe(
      filter(token => token != null),
      take(1),
      switchMap(token => {
        return next.handle(this.setTokenHeaders(request, token));
      }),
    );
  }

  private setTokenHeaders(
    req: HttpRequest<any>,
    token: string,
  ): HttpRequest<any> {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return req;
  }
}
