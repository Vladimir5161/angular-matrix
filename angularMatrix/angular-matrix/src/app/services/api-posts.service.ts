import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Post} from '../../app/types/posts.types'
import {basicUrl, defaultSortBy, defaultSortOrder} from "../../constants";


@Injectable({
  providedIn: 'root'
})
export class ApiPostsService {

  constructor(private http: HttpClient) {
  }
  getPosts(
    limit: number,
    skip: number= 0,
    sortBy: string = defaultSortBy,
    sortOrder: string = defaultSortOrder,
    search?: string,)
    : Observable<HttpResponse<Post[]>> {
    return this.http.get<Post[]>(`${basicUrl}/posts?skip=${skip}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`, { observe: 'response'})
  }
  addPost(title: string, content: string, image: any) : Observable<HttpResponse<Post>> {
    const data = new FormData()
    data.set('image', image)
    return this.http.post<Post>(`${basicUrl}/posts?title=${title}&content=${content}`, data, { observe: 'response'})
  }
  updatePost(title: string, content: string, postId: string) : Observable<HttpResponse<Post>> {
    return this.http.patch<Post>(`${basicUrl}/posts/${postId}?title=${title}&content=${content}`,  {},{ observe: 'response'})
  }
  updatePostImage(postId: string, image: any) : Observable<HttpResponse<Post>> {
    const data = new FormData()
    data.set('image',image)
    return this.http.post<Post>(`${basicUrl}/posts/${postId}/updateImage`, data, { observe: 'response'})
  }
  likeUnlikePost(postId: string, like: boolean): Observable<HttpResponse<Post>> {
    const data = {}
    return this.http.post<Post>(`${basicUrl}/posts/${postId}/${like?'like':'unlike'}`, data, { observe: 'response'})
  }
}
