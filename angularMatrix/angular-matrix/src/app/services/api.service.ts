import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, Subject, Subscription} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Post} from '../../app/types/posts.types'
import {basicUrl} from "../../assets/constants";
import {Router} from "@angular/router";
import {AlertService} from "./alert.service";


interface Auth {
  email: string,
  password: string,
  displayName?: string
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private token = new BehaviorSubject<any>('');

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
  getPosts(
           limit: number,
           skip: number= 0,
           sortBy: string = 'createdDate',
           sortOrder: string = 'desc',
           search?: string,)
    : Observable<HttpResponse<Post[]>> {
    return this.http.get<Post[]>(`${basicUrl}/posts?skip=${skip}&limit=${limit?limit:''}&sortBy=${sortBy}&sortOrder=${sortOrder}`, { observe: 'response'})
  }
  register(data: Auth): Subscription  {
    return this.http.post<string>( `${basicUrl}/reqister`, data, {observe: 'response'}).subscribe(resp => {
      if (resp.body) {
        this.alertService.showAlert('account added')
      }
    })
  }
  login(data: Auth): Subscription  {
    return this.http.post<any>( `${basicUrl}/login`, data, { observe: 'response'}).subscribe(resp => {
        window.localStorage.setItem('token', resp.body.token)
        this.setToken(resp.body.token);
        this.router.navigate(['/','stories']);
        this.alertService.showAlert('login success')
    })
  }
  logout() {
    this.setToken('');
    window.localStorage.removeItem('token')
    this.router.navigate(['/','login']);
    this.alertService.showAlert('logout success');
  }
}
