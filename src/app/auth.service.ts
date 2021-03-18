import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private myRoute: Router) { }
  role:string;
  sendToken(token: string) {
    localStorage.setItem("LoggedInUser", token)
  }
  getToken() {
    return localStorage.getItem("LoggedInUser")
  }
  isLoggedIn() {
    return this.getToken() !== null;
  }
  logout() {
    localStorage.removeItem("LoggedInUser");
    localStorage.removeItem("role");
    this.myRoute.navigate(["login"]);
  }

  getRole() {
    this.role = localStorage.getItem('role');
    return this.role;
  }

}
