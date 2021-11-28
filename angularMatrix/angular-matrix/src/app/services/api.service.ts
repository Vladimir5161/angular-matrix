import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Post} from '../../app/types/posts.types'
import {basicUrl} from "../../assets/constants";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }
  getPosts(
           limit: number,
           skip: number= 0,
           sortBy: string = 'createdDate',
           sortOrder: string = 'desc',
           search?: string)
    : Observable<HttpResponse<Post[]>> {
    return this.http.get<Post[]>(`${basicUrl}posts?skip=${skip}&limit=${limit?limit:''}&search=${search?search:''}&sortBy=${sortBy}&sortOrder=${sortOrder}"`,{observe: 'response'})
  }
}
