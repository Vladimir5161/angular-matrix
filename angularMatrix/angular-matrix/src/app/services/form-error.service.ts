import { Injectable } from '@angular/core';
import {AlertService} from "./alert.service";
import {AbstractControl, FormControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormErrorService {
  errorMsg: { type: string, value: string } = {type: '', value: ''}
  constructor(private alertService: AlertService) { }
  showErrorMessage(formGroup: any, register?: boolean, auth?: boolean ) {
    const groupControls = formGroup.controls;
    if(register && groupControls.displayName.value  && groupControls.displayName.errors?.minlength) {
      this.errorMsg = {type: 'displayName', value: 'Name length should be no less then 3'}
    } else if(register && groupControls.displayName.touched && groupControls.displayName.errors?.required) {
      this.errorMsg = {type: 'displayName', value: 'Name is required'}
    } else if(groupControls.email.touched && groupControls.email.errors?.required) {
      this.errorMsg = {type: 'email', value: 'email is required'}
    } else if(groupControls.email.value  && groupControls.email.errors?.minlength) {
      this.errorMsg = {type: 'email', value: 'email length should be no less then 3'}
    } else if( groupControls.email.value && groupControls.email.errors?.email) {
      this.errorMsg = {type: 'email', value:  'email is invalid'}
    } else if(groupControls.password.touched && groupControls.password.errors?.required) {
      this.errorMsg = {type: 'password', value: 'password is required'}
    } else if(groupControls.password.value && groupControls.password.errors?.minlength) {
      this.errorMsg = {type: 'password', value: 'password length should be no less then 3'}
    } else if(register && groupControls.repeatPassword.errors?.required && groupControls.repeatPassword.touched) {
      this.errorMsg = {type: 'repeatPassword', value: "please repeat password"}
    } else if(register && formGroup.errors?.['equalPassword'] && groupControls.password.value !== groupControls.repeatPassword.value) {
      this.errorMsg = {type: 'repeatPassword', value: "passwords doesn't match each other"}
    } else this.errorMsg = {type: '', value: ''}
    if(auth) {
      if (groupControls.title.value && !groupControls.title.touched && groupControls.title.errors?.minlength) {
        this.errorMsg = {type: 'title', value: 'title length should be not less then 3'}
      } else if (groupControls.title.touched && groupControls.title.errors?.required) {
        this.errorMsg = {type: 'title', value: 'title is required'}
      } else if (groupControls.content.touched && groupControls.content.errors?.required) {
        this.errorMsg = {type: 'content', value: 'content is required'}
      } else if (groupControls.content && !groupControls.content.touched && groupControls.content.errors?.minlength) {
        this.errorMsg = {type: 'content', value: 'content length should be not less then 3'}
      }
    }
  }
}
