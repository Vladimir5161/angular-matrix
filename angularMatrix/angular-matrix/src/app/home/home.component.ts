import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchStr: string = '';
  addNewStory: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }
  getString($event: string) {
    this.searchStr = $event
  }
  setAddNewStory() {
    this.addNewStory = true
  }
  closeAddNewStory() {
    this.addNewStory = false
  }


}
