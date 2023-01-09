import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
//import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Role } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const roles = this.userService.getRoles();
    const isAuthorized = roles && roles.some((role: Role) => route.data?.['roles'].includes(role));
    console.log('is Authorized: ' + isAuthorized);
    if (!isAuthorized) {
      this.router.navigateByUrl('/');
      return false;
    }
    return isAuthorized;
  }

}
