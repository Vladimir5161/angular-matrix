import { Component, OnInit } from '@angular/core';
import * as moment from "moment";

interface Story {
  id: number,
  header: string,
  description: string,
  createdAt: moment.Moment,
  deadline: moment.Moment
}
const stories: Story[] = [
  {
    id: 1,
    header: 'header of item 1',
    description: 'main story description text',
    createdAt: moment(),
    deadline: moment()
  },
  {
    id: 2,
    header: 'header of item 2',
    description: 'main story description text 2',
    createdAt: moment(),
    deadline: moment()
  },
  {
    id: 3,
    header: 'header of item 3',
    description: 'main story description text 3',
    createdAt: moment(),
    deadline: moment()
  }
]
@Component({
  selector: 'app-stories-list',
  templateUrl: './stories-list.component.html',
  styleUrls: ['./stories-list.component.scss']
})
export class StoriesListComponent implements OnInit {
  stories: Story[] = stories;
  constructor() { }

  ngOnInit(): void {
  }

}
