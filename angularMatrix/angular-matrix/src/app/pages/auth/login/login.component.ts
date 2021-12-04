import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../services/api.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  constructor(private ApiService: ApiService) { }

  ngOnInit(): void {
  }
  submitFormValues(event: any) {
    this.ApiService.login({email: event.email, password: event.password})
  }
}
