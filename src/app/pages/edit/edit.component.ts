import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { environment } from './../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  apiUrl = environment.apiUrl;
  user:any;
  public form: FormGroup;
  constructor(private fb: FormBuilder, private myRoute: Router, private http: HttpClient, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
          (params) => {
            this.fetchData(params['id']);
    });
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      id: ['', Validators.required],
    });
  }
  async fetchData(id){
    console.log(id);
        return await this.http.get(this.apiUrl+'/edit/'+ id, {headers: new HttpHeaders({ Authorization:  "Bearer "+localStorage.getItem("LoggedInUser")})}).subscribe(
            (res: any) => {
                  this.user = res['data'];
                  if(this.user){
                    this.form.setValue({
                        name:  this.user.name,
                        email:  this.user.email,
                        role: this.user.role,
                        id: this.user.id
                    });
                  }
                  console.log(this.user);
              },
            (error:HttpErrorResponse) => {
              console.log('Error inNot Found');
              if(error.error['status'] == "error")
              {
                  Swal.fire('opps', error.error['message'], 'error');
                  console.log(error.error);
              }
              console.log(error.error);
              console.log(error.error);
            }
          );
     }

     onSubmit() {
        if (this.form.invalid) {
            return;
        }
        return this.http.post('http://localhost:8000/api/update', this.form.value,  {headers: new HttpHeaders({ Authorization:  "Bearer "+localStorage.getItem("LoggedInUser")})}).subscribe(
            (res: any) => {
                  console.log('User Update Success');
                  if(res['status'] == "success")
                  {
                    Swal.fire('Success', 'Updated succesfully!', 'success');
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
