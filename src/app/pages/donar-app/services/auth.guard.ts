import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const token = this.loginService.getToken();
    if (!token) {
      return this.router.parseUrl('/auth/login');
    }

    const userRole : any = this.loginService.getUserRole(); // ← from token
    const allowedRoles = route.data['roles'] as string[];

    if (allowedRoles && !allowedRoles.includes(userRole)) {
      return this.router.parseUrl('/notfound'); // or unauthorized page
    }

    return true;
  }
}
