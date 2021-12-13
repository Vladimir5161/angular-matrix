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

    for (let control in ErrorEnum) {
      const isControlExist = groupControls[ErrorEnum[control]]
      if(isControlExist) {
        if (ErrorEnum[control] === 'email' && groupControls[ErrorEnum[control]].touched && groupControls[ErrorEnum[control]].errors?.email) {
          this.errorMsg[ErrorEnum.email] = 'email is not valid'
        } else if (groupControls[ErrorEnum[control]].errors?.minlength) {
          this.errorMsg[control] = 'length should be no less then 3'
        } else if (groupControls[ErrorEnum[control]].touched && groupControls[ErrorEnum[control]].errors?.required) {
          this.errorMsg[control] = 'value is required'
        } else if (ErrorEnum[control] === 'repeatPassword' && formGroup.errors?.['equalPassword'] && groupControls.password.value !== groupControls.repeatPassword.value) {
          this.errorMsg[control] = "passwords doesn't match each other"
        } else this.errorMsg[control] = '';
      }
    }
  }
}
