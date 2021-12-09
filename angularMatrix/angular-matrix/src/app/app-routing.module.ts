import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component'
import {RegisterComponent} from "./pages/auth/register/register.component";
import {LoginComponent} from "./pages/auth/login/login.component";
import {ResetPasswordComponent} from "./pages/auth/reset-password/reset-password.component";
import {StoriesResolver} from "./resolvers/stories.resolver";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {path: '',   redirectTo: 'stories', pathMatch: 'full' },
  {path: 'stories',
    component: HomeComponent,
    canActivate: [AuthGuard],
    resolve: {
      hero: StoriesResolver
    }},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'requestResetPassword', component: ResetPasswordComponent},
  {path: 'resetPassword', component: ResetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
