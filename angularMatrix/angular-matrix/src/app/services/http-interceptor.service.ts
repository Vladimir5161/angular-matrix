import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of, throwError} from "rxjs";
import {catchError, map, tap} from 'rxjs/operators';
import {AlertService} from "./alert.service";
import {ApiAuthService} from "./api-auth.service";
import {Router} from "@angular/router";

@Injectable()
export class GlobalHttpInterceptorService implements HttpInterceptor {

  constructor(private alertService: AlertService, public apiAuthService: ApiAuthService, private router: Router,) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any> | any> {
    this.apiAuthService.setLoading(true)
    const token: string | null = window.localStorage.getItem('token');
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}` || ''),
    })
    return next.handle(authReq).pipe(
      tap((event) => {
        if (event instanceof HttpResponse)
          this.apiAuthService.setLoading(false)
          console.log('Server response')
      }),
      catchError((error) => {
        this.apiAuthService.setLoading(false)
        if (error.status === 0) {
          return throwError(
            'An error occurred:', error.error);
        } else if(error.status === 400) {
          this.alertService.showAlert(error.error, true)
          return throwError(
            {status: error.status, body: error.error});
        } else if(error.status === 401) {
          this.apiAuthService.setToken('');
          this.router.navigate(['/','login']);
          this.alertService.showAlert('you a not logged in, or your token expired', true)
          return throwError(
            {status: error.status, body: error.error});
        } else {
          return throwError(
            `Backend returned code ${error.status}, body was: `, error.error);
        }
      })
    )
  }
}
