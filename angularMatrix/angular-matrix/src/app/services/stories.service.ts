import { Injectable } from '@angular/core';
import {ApiAuthService} from "./api-auth.service";
import {Post} from "../types/posts.types";
import {BehaviorSubject, Subject} from "rxjs";
import {ApiPostsService} from "./api-posts.service";
import {AlertService} from "./alert.service";
import {filter, map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class StoriesService {
  private stories = new BehaviorSubject<Post[]>([]);

  setStories(state: Post[]) {
    this.stories.next(state);
  }
  addStory(state: Post) {
    this.stories.next([...this.stories.getValue(), state])
  }
  getStories(): Subject<Post[]> {
    return this.stories;
  }
  constructor(private ApiPostsService: ApiPostsService, private ApiAuthService: ApiAuthService, private alertService: AlertService) { }
  getStory(postId: string) {
    return this.stories.value.filter(i => i.id === postId)[0]
  }
  getStoriesApi(limit: number) {
    this.ApiAuthService.getToken().subscribe(token => {
      if(token) {
        this.ApiPostsService.getPosts(limit).pipe(map(value =>value.body), filter(this.isNonNull)).subscribe(resp => {
            this.setStories(resp)
        })
      }
    })
  }
  addPost(title: string, content: string, image: any) {
    this.ApiPostsService.addPost(title, content, image).pipe(map(value =>value.body), filter(this.isNonNull)).subscribe(responce => {
        this.addStory(responce)
        this.alertService.showAlert('story added', false)
    })
  }
  likeUnlikePost(postId: string, like: boolean) {
    this.ApiPostsService.likeUnlikePost(postId, !like).pipe(map(value =>value.body), filter(this.isNonNull)).subscribe(resp => {
        const post = this.stories.value.filter(i => i.id === postId)[0]
        post.isLikedByCurrentUser = !like;
        post.likesCount = like ? post.likesCount - 1 : post.likesCount + 1;
    })
  }
  isNonNull<T>(value: T): value is NonNullable<T> {
    return value != null;
  }
  updatePost(title: string, content: string, postId: string) {
    this.ApiPostsService.updatePost(title, content, postId).pipe(map(value =>value.body), filter(this.isNonNull)).subscribe(story => {
        const post = this.stories.value.filter(i => i.id === postId)[0]
        post.title = story.title;
        post.content = story.content
        post.updatedDate = story.updatedDate
        this.alertService.showAlert('story updated', false)
    })
  }
  updatePostImage(postId: string, image: string) {
    this.ApiPostsService.updatePostImage(postId, image).pipe(map(value =>value.body), filter(this.isNonNull)).subscribe(resp => {
        const post = this.stories.value.filter(i => i.id === postId)[0]
        this.alertService.showAlert(`story image ${post.imageUrl? 'updated': 'added'}`, false)
        post.imageUrl = resp.imageUrl;
    })
  }
}
