import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {validatePasswordRepeat} from "../../../validators/form.validator";
import {FormErrorService} from "../../../services/form-error.service";

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {
  @Input() register: boolean = false;
  @Output() submitFormValues = new EventEmitter<{email: AbstractControl, password: AbstractControl, displayName: AbstractControl}>();
  visibilityPassword: boolean = false;
  visibilityPasswordRepeat: boolean = false;
  authGroup: FormGroup = this.fb.group({})
  constructor(private fb: FormBuilder, public FormErrorService: FormErrorService) { }

  ngOnInit(): void {
    this.authGroup = this.register? this.fb.group({
        email: ['', {updateOn: 'blur', validators: Validators.compose([Validators.required, Validators.minLength(3), Validators.email ])} ],
        password: ['', {updateOn: 'blur', validators: Validators.compose([Validators.required, Validators.minLength(5)])}],
        repeatPassword: ['', {updateOn: 'blur', validators: Validators.compose([Validators.required, Validators.minLength(5)]), }],
        displayName: ['', {updateOn: 'blur', validators: Validators.compose([Validators.required, Validators.minLength(3)])}],
      }, {validators: validatePasswordRepeat}) :
      this.fb.group({
        email: ['', {updateOn: 'blur', validators: Validators.compose([Validators.required, Validators.minLength(3), Validators.email ])} ],
        password: ['', {updateOn: 'blur', validators: Validators.compose([Validators.required, Validators.minLength(5)])}],
      }, )
  }
  get authGroupControls() {
    return this.authGroup.controls;
  }

  onInputValueChange() {
    this.FormErrorService.showErrorMessage(this.authGroup, this.register)
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
  }

}
