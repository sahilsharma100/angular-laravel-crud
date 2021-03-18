import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  apiUrl = environment.apiUrl;
  public Data:any;
  public Users:any;
  constructor( private http: HttpClient,  private myRoute: Router) {
  }

  ngOnInit() {
    this.fetchData();
  }
  async fetchData(){
        return await this.http.get(this.apiUrl+'/users',  {headers: new HttpHeaders({ Authorization:  "Bearer "+localStorage.getItem("LoggedInUser")})}).subscribe(
            (res: any) => {
                  this.Data = res;
                  this.Users = res['data'];
                  console.log(this.Data);
              },
            (error:HttpErrorResponse) => {
              console.log('Error in Fetching  User');
              if(this.Data['status'] == "error")
              {
                  Swal.fire('opps', this.Data['message'], 'error');
                  console.log(this.Data);
              }
              console.log(error.error);
            }
          );
     }
     editUser(id){
        this.myRoute.navigate(["edit", id]);
     }
     addUser(){
      this.myRoute.navigate(["create"]);
   }
     async deleteUser(id){
      return await this.http.get(this.apiUrl+'/delete/'+ id,  {headers: new HttpHeaders({ Authorization:  "Bearer "+localStorage.getItem("LoggedInUser")})}).subscribe(
        (res: any) => {
            if(res['status'] == "success")
            {
                Swal.fire('opps', res['message'], 'success');
                console.log(this.Data);
            }
            this.fetchData();
          },
        (error:HttpErrorResponse) => {
          console.log('Error  User Not exist');
          if(error.error['status'] == "error")
          {
              Swal.fire('opps', error.error['message'], 'error');
              console.log(error.error);
          }
          console.log(error.error);
        }
      );
     }
     
}

