import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {validatePasswordRepeat} from "../../../validators/form.validator";
import {FormErrorService} from "../../../services/form-error.service";
import {ErrorEnum} from '../../../types/form.types'

interface ResetPassword {
  token: string;
  password: string;
  repeatPassword: string
}

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['../auth-forms.component.scss']
})
export class ResetPasswordFormComponent implements OnInit {
  @Output() submitFormValues = new EventEmitter<string | ResetPassword>();
  email: string = ''
  visibilityPassword: boolean = false;
  visibilityPasswordRepeat: boolean = false;
  resetPasswordGroup: FormGroup = this.fb.group({})
  resetPasswordPage: boolean = false;
  token: string = '';
  ErrorEnum = ErrorEnum
  constructor(private fb: FormBuilder, public FormErrorService: FormErrorService) { }

  ngOnInit(): void {
    this.FormErrorService.clearError()
    this.resetPasswordPage = !window.location.href.includes('requestResetPassword');
    this.resetPasswordGroup = this.resetPasswordPage ? this.fb.group({
      password: ['', {updateOn: 'blur', validators: Validators.compose([Validators.required, Validators.minLength(5)])}],
      repeatPassword: ['', {updateOn: 'change', validators: Validators.compose([Validators.required, Validators.minLength(5)]), }],
    }, {validators: validatePasswordRepeat})
      : this.fb.group({
      email: ['', {updateOn: 'change', validators: Validators.compose([Validators.required, Validators.email])}],
    } )
  }

  onInputValueChange() {
    this.FormErrorService.showErrorMessage(this.resetPasswordGroup, false)
  }
  setVisibility(inputName: string) {
    if(inputName === 'password') {
      this.visibilityPassword = !this.visibilityPassword
    } else {
      this.visibilityPasswordRepeat = !this.visibilityPasswordRepeat
    }
  }
  submitForm(event: any) {
    const data = !this.resetPasswordPage ? this.resetPasswordGroup.controls.email.value :
      {
        token: this.token,
        password: this.resetPasswordGroup.controls.password.value,
        repeatPassword: this.resetPasswordGroup.controls.repeatPassword.value
      }
    this.submitFormValues.emit(data)
    this.resetPasswordGroup.reset()
  }

}
