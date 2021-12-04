import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthFormComponent} from "../../components/auth-components/auth-form/auth-form.component";



@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    AuthFormComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
    ]
})
export class AuthModule { }
