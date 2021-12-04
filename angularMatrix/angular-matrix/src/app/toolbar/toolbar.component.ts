import { Component, OnInit } from '@angular/core';
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  token: string = '';
  constructor(public ApiService: ApiService) { }

  ngOnInit(): void {
    this.ApiService.getToken().subscribe(token => {
      this.token = token;
    })
  }
  logout(event: any) {
    event.preventDefault()
    this.ApiService.logout();
  }
}
