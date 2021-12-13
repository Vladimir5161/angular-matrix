import { Component, OnInit } from '@angular/core';
import {ApiAuthService} from '../../../services/api-auth.service'
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  constructor(private apiAuthService: ApiAuthService, private router: Router) { }

  submitFormValues(event: any) {
    this.apiAuthService.login({email: event.email, password: event.password})
  }
  goToForgotPassword() {
    this.router.navigate(['/','requestResetPassword'])
  }

}
