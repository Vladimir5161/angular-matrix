import { Injectable } from '@angular/core';
import {ApiAuthService} from "./api-auth.service";
import {Post} from "../types/posts.types";
import {BehaviorSubject, Subject} from "rxjs";
import {ApiPostsService} from "./api-posts.service";
import {AlertService} from "./alert.service";

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
        this.ApiPostsService.getPosts(limit).subscribe(resp => {
          if(resp.body) {
            this.setStories(resp.body)
          }
        })
      }
    })
  }
  addPost(title: string, content: string, image: any) {
    this.ApiPostsService.addPost(title, content, image).subscribe(responce => {
      if(responce.body) {
        this.addStory(responce.body)
        this.alertService.showAlert('story added', false)
      }
    })
  }
  likeUnlikePost(postId: string, like: boolean) {
    this.ApiPostsService.likeUnlikePost(postId, !like).subscribe(resp => {
      if(resp) {
        const post = this.stories.value.filter(i => i.id === postId)[0]
        post.isLikedByCurrentUser = !like;
        post.likesCount = like ? post.likesCount - 1 : post.likesCount + 1;
      }
    })
  }
  updatePost(title: string, content: string, postId: string) {
    this.ApiPostsService.updatePost(title, content, postId).subscribe(resp => {
      if(resp.body) {
        const post = this.stories.value.filter(i => i.id === postId)[0]
        post.title = resp.body.title;
        post.content = resp.body.content
        post.updatedDate = resp.body.updatedDate
        this.alertService.showAlert('story updated', false)
      }
    })
  }
  updatePostImage(postId: string, image: string) {
    this.ApiPostsService.updatePostImage(postId, image).subscribe(resp => {
      if(resp.body) {
        const post = this.stories.value.filter(i => i.id === postId)[0]
        this.alertService.showAlert(`story image ${post.imageUrl? 'updated': 'added'}`, false)
        post.imageUrl = resp.body.imageUrl;
      }
    })
  }
}
