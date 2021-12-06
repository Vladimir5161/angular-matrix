import { Injectable } from '@angular/core';
import {ErrorEnum} from "../types/form.types";


@Injectable({
  providedIn: 'root'
})
export class FormErrorService {
  errorMsg: Array<string> = ['','','','','','']
  constructor() { }
  clearError() {
    this.errorMsg = ['','','','','','']
  }
  getErrorMessage(): string  {
    let errorMsg = ''
    this.errorMsg.map(i => {
      if(i) {
        errorMsg = i
      }
    })
    return  errorMsg
  }
  showErrorMessage(formGroup: any, auth?: boolean ) {
    const groupControls = formGroup.controls;
    if(groupControls.displayName) {
      if(groupControls.displayName.value  && groupControls.displayName.errors?.minlength) {
        this.errorMsg[ErrorEnum.displayName] = 'Name length should be no less then 3'
      } else if(groupControls.displayName.touched && groupControls.displayName.errors?.required) {
        this.errorMsg[ErrorEnum.displayName] = 'Name is required'
      } else this.errorMsg[ErrorEnum.displayName] = '';
    }
    if(groupControls.email) {
      if (groupControls.email.touched && groupControls.email.errors?.required) {
        this.errorMsg[ErrorEnum.email] = 'email is required'
      } else if (groupControls.email.value && groupControls.email.errors?.minlength) {
        this.errorMsg[ErrorEnum.email] = 'email length should be no less then 3'
      } else if (groupControls.email.value && groupControls.email.errors?.email) {
        this.errorMsg[ErrorEnum.email] = 'email is invalid'
      } else this.errorMsg[ErrorEnum.email] = '';
    }
    if(groupControls.password) {
      if (groupControls.password.touched && groupControls.password.errors?.required) {
        this.errorMsg[ErrorEnum.password] = 'password is required'
      } else if (groupControls.password.value && groupControls.password.errors?.minlength) {
        this.errorMsg[ErrorEnum.password] = 'password length should be no less then 5'
      } else this.errorMsg[ErrorEnum.password] = '';
    }
    if(groupControls.repeatPassword) {
      if (groupControls.repeatPassword.errors?.required && groupControls.repeatPassword.touched) {
        this.errorMsg[ErrorEnum.repeatPassword] = "please repeat password"
      } else if (formGroup.errors?.['equalPassword'] && groupControls.password.value !== groupControls.repeatPassword.value) {
        this.errorMsg[ErrorEnum.repeatPassword] =  "passwords doesn't match each other"
      } else this.errorMsg[ErrorEnum.repeatPassword] = '';
    }
    if(auth) {
      if (groupControls.title.value && !groupControls.title.touched && groupControls.title.errors?.minlength) {
        this.errorMsg[ErrorEnum.title] = 'title length should be not less then 3'
      } else if (groupControls.title.touched && groupControls.title.errors?.required) {
        this.errorMsg[ErrorEnum.title]  = 'title is required'
      } else this.errorMsg[ErrorEnum.title] = ''
      if (groupControls.content.touched && groupControls.content.errors?.required) {
        this.errorMsg[ErrorEnum.content] = 'content is required'
      } else if (groupControls.content && !groupControls.content.touched && groupControls.content.errors?.minlength) {
        this.errorMsg[ErrorEnum.content] =  'content length should be not less then 3'
      } else this.errorMsg[ErrorEnum.content] = ''
    }
  }
}
