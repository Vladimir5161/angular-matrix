import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../../types/posts.types";
import {StoriesService} from "../../../services/stories.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-stories-list',
  templateUrl: './stories-list.component.html',
  styleUrls: ['./stories-list.component.scss']
})
export class StoriesListComponent implements OnInit {
  @Input() searchStr: string = ''
  stories: Observable<Post[]>|undefined;
  constructor(private storiesService : StoriesService) { }

  ngOnInit(): void {
    this.stories = this.storiesService.getStories()
  }

}
