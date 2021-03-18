import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { environment } from './../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  apiUrl = environment.apiUrl;
  user:any;
  public form: FormGroup;
  constructor(private fb: FormBuilder, private myRoute: Router, private http: HttpClient, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.form.invalid) {
        return;
    }
    return this.http.post('http://localhost:8000/api/create', this.form.value,  {headers: new HttpHeaders({ Authorization:  "Bearer "+localStorage.getItem("LoggedInUser")})}).subscribe(
        (res: any) => {
              console.log('User Update Success');
              if (res['status'] == "success")
              {
                Swal.fire('Success', res['message'], 'success');
                this.myRoute.navigate(["users"]);
                // console.log(localStorage.getItem('auth_token'));
              }
          },
        (error:HttpErrorResponse) => {
          console.log('Error');
          if( error.error['status'] == "error")
          {
              Swal.fire('opps',  error.error['message'], 'error');
              console.log( error.error);
          }
        }
    );
  }
}
