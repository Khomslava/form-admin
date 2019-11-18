

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ERoutingPath } from './../../../shared/models/routing.models';
import { AuthService } from './../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree {

    // const currentUser = this.authService.isAuthenticated();
    // if (currentUser) {
    //   return true;
    // }
    return true;

    this.router.navigate(['/' + ERoutingPath.LOGIN], {queryParams: { returnUrl: next.url } });
    return false;
  }

}
