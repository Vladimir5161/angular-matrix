import {Injectable} from "@angular/core";
import {Post} from "../types/posts.types";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {StoriesService} from "./stories.service";

@Injectable({ providedIn: 'root' })
export class StoriesResolver implements Resolve<Post[]> {
  constructor(private storiesService: StoriesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    return this.storiesService.getStoriesApi(10);
  }
}
