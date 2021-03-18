import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginform: FormGroup;
  public successdata:any;
  constructor( private formBuilder: FormBuilder, private myRoute: Router, private auth: AuthService,
               private http: HttpClient ) {}

  ngOnInit() {
    this.loginform = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
  });
  }
  ngOnDestroy() {
  }

  onSubmit() {
    console.log(this.loginform.value);
    // stop here if form is invalid
    if (this.loginform.invalid) {
        return;
    }
    return this.http.post('http://localhost:8000/api/auth/login', this.loginform.value).subscribe(
        (res: any) => {
              console.log('login success');
              this.successdata = res;
              if(this.successdata['status'] == "success")
              {
                Swal.fire('Thank you...', 'Login succesfully!', 'success');
                localStorage.setItem('role', this.successdata['role']);
                this.auth.sendToken(this.successdata['token']);
                this.myRoute.navigate(["dashboard"]);
                // console.log(localStorage.getItem('auth_token'));
              }
          },
        (error:HttpErrorResponse) => {
          console.log('Invalid credentials');
          this.successdata = error.error;
          if(this.successdata['status'] == "error")
          {
              Swal.fire('opps', 'Email or password wrong', 'error');
              console.log(this.successdata);
          }
        }
      );
  }
}
