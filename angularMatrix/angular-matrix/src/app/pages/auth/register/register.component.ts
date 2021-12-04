import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../services/api.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  email: string = '';
  password: string = '';
  constructor(private ApiService: ApiService) { }

  ngOnInit(): void {
  }
  submitFormValues(event: any) {
    this.ApiService.register({email: event.email, password: event.password, displayName: event.displayName})
  }
}
