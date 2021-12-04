import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthFormComponent} from "../../components/auth-components/auth-form/auth-form.component";
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {ResetPasswordFormComponent} from "../../components/auth-components/reset-password-form/reset-password-form.component";



@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    AuthFormComponent,
    ResetPasswordComponent,
    ResetPasswordFormComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
    ]
})
export class AuthModule { }
