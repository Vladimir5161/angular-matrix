
import {AbstractControl, ValidationErrors} from "@angular/forms";


  export function validatePasswordRepeat(
    control: AbstractControl): ValidationErrors | null {

    const controlValuePassword = control.get('password');
    const controlValueRepeatPassword = control.get('repeatPassword');
    if(controlValueRepeatPassword?.value && controlValuePassword?.value !== controlValueRepeatPassword.value) {
      return {equalPassword: true};
    } else {
      return null
    }
  }
