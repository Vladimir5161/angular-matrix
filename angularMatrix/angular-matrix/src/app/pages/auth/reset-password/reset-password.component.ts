import { Component, OnInit } from '@angular/core';
import {ApiAuthService} from "../../../services/api-auth.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  constructor(private apiAuthService: ApiAuthService) { }

  submitFormValues(event: any) {
    this.apiAuthService.requestResetPassword(event)
  }
}
