import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
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
