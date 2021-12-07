import {Component, OnInit} from '@angular/core';
import {ApiAuthService} from "./services/api-auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-matrix';
  loading: boolean = false;
  constructor(public apiAuthService: ApiAuthService) {
  }
  ngOnInit() {
    this.apiAuthService.loading.subscribe(value => {
      this.loading = value
    })
  }
}
