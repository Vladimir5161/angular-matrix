import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../services/api.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }
  submitFormValues(event: any) {
    this.apiService.requestResetPassword(event)
  }
}
