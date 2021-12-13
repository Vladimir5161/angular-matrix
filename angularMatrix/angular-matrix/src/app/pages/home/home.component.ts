import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  searchStr: string = '';
  addNewStory: boolean = false;
  constructor() { }

  getString($event: string) {
    this.searchStr = $event
  }
  closeAddNewStory() {
    this.addNewStory = false
  }
  submitBtn(event: MouseEvent) {
    event.preventDefault()
    this.addNewStory = true
  }

}
