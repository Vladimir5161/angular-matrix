import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {
  @Input() register: boolean | undefined;
  @Output() getFormValues = new EventEmitter<{email: AbstractControl, password: AbstractControl}>();
  @ViewChild('repeatPassword', { static: false })
  set input(element: ElementRef<HTMLInputElement>) {
    if(element) {
      element.nativeElement.focus()
    }
  }
  visibilityPassword: boolean = false;
  visibilityPasswordRepeat: boolean = false;
  repeatPassword: string = '';
  authGroup = this.fb.group({
    email: ['', {updateOn: 'change', validators: Validators.compose([Validators.required, Validators.minLength(3), Validators.email, ])} ],
    password: ['', {updateOn: 'blur', validators: Validators.compose([Validators.required, Validators.minLength(5)])}],
    displayName: ['', {updateOn: 'blur', validators: Validators.compose([Validators.required, Validators.minLength(3)])}],
  });
  errorMsg: { type: string, value: string } = {type: '', value: ''}
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  get authGroupControls() {
    return this.authGroup.controls;
  }

  onInputValueChange() {
    this.getFormValues.emit({email: this.authGroupControls.email, password: this.authGroupControls.password})
    if(this.authGroupControls.email.value  && this.authGroupControls.email.errors?.minlength) {
      this.errorMsg = {type: 'email', value: 'email length should be no less then 3'}
    } else if(this.authGroupControls.email.touched && !this.authGroupControls.email) {
      this.errorMsg = {type: 'email', value: 'email is required'}
    } if(this.authGroupControls.displayName.value  && this.authGroupControls.displayName.errors?.minlength) {
      this.errorMsg = {type: 'displayName', value: 'Name length should be no less then 3'}
    } else if(this.authGroupControls.displayName.touched && !this.authGroupControls.displayName) {
      this.errorMsg = {type: 'displayName', value: 'Name is required'}
    } else if( this.authGroupControls.email && this.authGroupControls.email.errors?.email) {
      this.errorMsg = {type: 'email', value:  'email is invalid'}
    } else if(this.authGroupControls.password.touched && !this.authGroupControls.password) {
      this.errorMsg = {type: 'password', value: 'password is required'}
    } else if(this.authGroupControls.password.value && this.authGroupControls.password.errors?.minlength) {
      this.errorMsg = {type: 'password', value: 'password length should be no less then 3'}
    } else if(this.authGroupControls.password.value !== this.repeatPassword) {
      this.errorMsg = {type: 'repeatPassword', value: "passwords doesn't match each other"}
    } else this.errorMsg = {type: '', value: ''}
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
    console.log({
      email: this.authGroupControls.email.value,
      password: this.authGroupControls.password.value
    })
  }

}
