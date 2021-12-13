import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {validatePasswordRepeat} from "../../../validators/form.validator";
import {FormErrorService} from "../../../services/form-error.service";
import {ErrorEnum} from '../../../types/form.types'

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['../auth-forms.component.scss']
})
export class AuthFormComponent implements OnInit {
  @Input() register: boolean = false;
  @Output() submitFormValues = new EventEmitter<{email: AbstractControl, password: AbstractControl, displayName: AbstractControl}>();
  visibilityPassword: boolean = false;
  visibilityPasswordRepeat: boolean = false;
  authGroup: FormGroup = this.fb.group({})
  ErrorEnum = ErrorEnum
  constructor(private fb: FormBuilder, public FormErrorService: FormErrorService) { }

  ngOnInit(): void {
    this.FormErrorService.clearError()
    this.authGroup = this.register? this.fb.group({
        email: ['', {updateOn: 'blur', validators: Validators.compose([Validators.required, Validators.minLength(3), Validators.email ])} ],
        password: ['', {updateOn: 'blur', validators: Validators.compose([Validators.required, Validators.minLength(3)])}],
        repeatPassword: ['', {updateOn: 'change', validators: Validators.compose([Validators.required, Validators.minLength(3)]), }],
        displayName: ['', {updateOn: 'blur', validators: Validators.compose([Validators.required, Validators.minLength(3)])}],
      }, {validators: validatePasswordRepeat}) :
      this.fb.group({
        email: ['', {updateOn: 'blur', validators: Validators.compose([Validators.required, Validators.minLength(3), Validators.email ])} ],
        password: ['', {updateOn: 'change', validators: Validators.compose([Validators.required, Validators.minLength(3)])}],
      }, )
  }
  get authGroupControls() {
    return this.authGroup.controls;
  }

  onInputValueChange() {
      this.FormErrorService.showErrorMessage(this.authGroup)

  }
  setVisibility(inputName: string) {
    if(inputName === 'password') {
      this.visibilityPassword = !this.visibilityPassword
    } else {
      this.visibilityPasswordRepeat = !this.visibilityPasswordRepeat
    }
  }

  onSubmitBtn(event: any) {
    event.preventDefault()
    this.submitFormValues.emit(({
      email: this.authGroupControls.email.value,
      password: this.authGroupControls.password.value,
      displayName: this.register? this.authGroupControls.displayName.value : null,
    }))
    this.authGroup.reset()
  }

}
