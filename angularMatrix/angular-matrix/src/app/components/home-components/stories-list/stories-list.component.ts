import {Component, Input, OnInit} from '@angular/core';
import * as moment from "moment";
import {Post} from "../../../types/posts.types";
import {StoriesService} from "../../../services/stories.service";
import {map} from "rxjs/operators";


@Component({
  selector: 'app-stories-list',
  templateUrl: './stories-list.component.html',
  styleUrls: ['./stories-list.component.scss']
})
export class StoriesListComponent implements OnInit {
  @Input() searchStr: string = ''
  stories: Post[] = [];
  constructor(private storiesService : StoriesService) { }

  ngOnInit(): void {
    this.storiesService.getStories()
      .pipe(
        map((
          arr: Post[]) => arr.sort((a,b ) => this.sort(a, b)
      )))
      .subscribe(stories => {
      this.stories  = stories
    })
  }
  sort(a: Post,b: Post) {
    if(moment(a.createdDate) > moment(b.createdDate)) {
      return 1
    } else return 0
  }
}
