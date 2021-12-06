import { Component, OnInit } from '@angular/core';
import {ApiAuthService} from '../../../services/api-auth.service'
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  constructor(private apiAuthService: ApiAuthService, private router: Router) { }

  ngOnInit(): void {
  }
  submitFormValues(event: any) {
    this.apiAuthService.login({email: event.email, password: event.password})
  }
  goToForgotPassword() {
    this.router.navigate(['/','requestResetPassword'])
  }

}
