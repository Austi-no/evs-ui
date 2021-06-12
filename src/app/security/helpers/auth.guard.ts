import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private toastr: ToastrService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = sessionStorage.getItem('token');
    if (token) {
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(["login"]);
    this.toastr.error("UnAuthorized")

    return false;
  }
}
