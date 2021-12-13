import { Component, OnInit } from '@angular/core';
import {ApiAuthService} from '../../../services/api-auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  constructor(private apiAuthService: ApiAuthService) { }

  submitFormValues(event: any) {
    this.apiAuthService.register({email: event.email, password: event.password, displayName: event.displayName})
  }
}
