import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService,
    private myRoute: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.auth.isLoggedIn()){
        const userRole = this.auth.getRole();
        if (route.data.role && route.data.role.indexOf(userRole) === -1) {
          this.myRoute.navigate(['/dashboard']);
          return false;
        }
        return true;
      }else{
        this.myRoute.navigate(["login"]);
        return false;
      }
  }
}
