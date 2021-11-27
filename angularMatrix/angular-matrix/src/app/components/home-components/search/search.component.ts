import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchStr: string = '';
  @Output() stringEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }
  updateString() {
    this.stringEvent.emit(this.searchStr)
  }

}
