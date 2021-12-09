import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-add',
  template: `
    <div>
        <button class="add-btn" [ngClass]="{notReady: addNewStory}" type="submit" (click)="submitBtn($event)" >Add Story</button>
    </div>`,
})
export class AddComponent implements OnInit {
  @Output()
  setAddNewStory = new EventEmitter<boolean>();
  @Input()
  addNewStory: boolean = false
  constructor() { }

  ngOnInit(): void {
  }
  submitBtn(event: MouseEvent) {
    event.preventDefault()
    this.setAddNewStory.emit()
  }
}
