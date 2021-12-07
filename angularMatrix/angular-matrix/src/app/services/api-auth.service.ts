import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {basicUrl} from "../../constants";
import {Router} from "@angular/router";
import {AlertService} from "./alert.service";
import {Auth} from "../types/auth.types";


@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {
  private token = new BehaviorSubject<any>('');
  loading = new BehaviorSubject<boolean>(false);
  setToken(state: string) {
    this.token.next(state);
  }
  getToken(): Subject<any> {
    return this.token;
  }

  constructor(private http: HttpClient, private router: Router, public alertService: AlertService) {
    const token = window.localStorage.getItem('token');
    this.setToken(token || '')
  }
  setLoading(value: boolean) {
    this.loading.next(value)
  }
  requestResetPassword(email:string): Subscription {
    return this.http.post<string>(`${basicUrl}/requestPasswordReset?email=${email}`, { observe: 'response'}).subscribe(resp => {
      if (resp) {
        this.alertService.showAlert('please check your email', false)
      }
    })
  }
  resetPassword(email:string, password: string, repeatPassword: string): Subscription {
    const data = {email: email, password: password, repeatPassword: repeatPassword}
    return this.http.post<string>(`${basicUrl}/resetPassword`, data, { observe: 'response'}).subscribe(resp => {
      if (resp) {
        this.alertService.showAlert('password changed, please try to login', false)
      }
    })
  }
  register(data: Auth): Subscription  {
    return this.http.post<string>( `${basicUrl}/reqister`,  data, {observe: 'response'}).subscribe(resp => {
      if (resp) {
        this.alertService.showAlert('account added', false)
      }
    })
  }
  login(data: Auth): Subscription  {
    return this.http.post<any>( `${basicUrl}/login`, data, { observe: 'response'}).subscribe(resp => {
        window.localStorage.setItem('token', resp.body.token)
        this.setToken(resp.body.token);
        this.router.navigate(['/','stories']);
        this.alertService.showAlert('login success', false)
    })
  }
  logout() {
    this.setToken('');
    window.localStorage.removeItem('token')
    this.router.navigate(['/','login']);
    this.alertService.showAlert('logout success', false);
  }
}
