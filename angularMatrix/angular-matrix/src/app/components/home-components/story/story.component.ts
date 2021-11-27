import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {
  @Input() header: string = ''
  @Input() description: string = ''
  @Input() deadline: moment.Moment = moment()
  constructor() { }

  ngOnInit(): void {
  }

}
