import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Router } from '@angular/router';
import { AuthService } from './../../auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public form: FormGroup;
  public successdata:any;
  constructor(private fb: FormBuilder, private myRoute: Router, private auth: AuthService,  private http: HttpClient) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      privacy: ['', Validators.required]
    });
  }

  signUp() {
    if (this.form.invalid) {
      return;
  }
  return this.http.post('http://localhost:8000/api/auth/signup', this.form.value).subscribe(
      (res: any) => {
            console.log('Sign up success');
            this.successdata = res;
            if(this.successdata['status'] == "success")
            {
              Swal.fire('Thank you...', 'Signed Up succesfully!', 'success');
              localStorage.setItem('role', this.successdata['role']);
              this.auth.sendToken(this.successdata['token']);
              this.myRoute.navigate(["dashboard"]);
              // console.log(localStorage.getItem('auth_token'));
            }
        },
      (error:HttpErrorResponse) => {
        console.log('Error');
        this.successdata = error.error;
        if(this.successdata['status'] == "error")
        {
            Swal.fire('opps', this.successdata['message'], 'error');
            console.log(this.successdata);
        }
      }
    );
  }
}
