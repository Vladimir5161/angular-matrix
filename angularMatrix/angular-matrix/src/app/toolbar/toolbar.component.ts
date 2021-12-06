import { Component, OnInit } from '@angular/core';
import {ApiAuthService} from "../services/api-auth.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  token: string = '';
  constructor(public ApiService: ApiAuthService) { }

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
