import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {ApiAuthService} from "../services/api-auth.service";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(public apiAuthService: ApiAuthService, public router: Router) {
  }

  canActivate(): boolean {
    let authenticated: boolean = false
    this.apiAuthService.getToken().subscribe(token => {
      if (token) {
        authenticated = !!token
      }})
      if(!authenticated) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
  }
}
