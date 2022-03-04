import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private env:string;

  constructor(private _http : HttpClient,private _route:Router) { 
    this.env=environment.APP_URL;
  }

  login(user:any){
    return this._http.post<any>(this.env+'user/login',user);
  }
  listUsers(){
    return this._http.get<any>(this.env+'user/getUsers/');
  }
  listDeliverys(){
    return this._http.get<any>(this.env+'user/getDeliverys/');
  }
  listClients(){
    return this._http.get<any>(this.env+'user/getClients/');
  }
  registerUser(user:any){
    return this._http.post<any>(this.env+ 'user/registerUser/',user);
  }
  updateUser(user:any,email:string){
    return this._http.put<any>(this.env+ 'user/updateUser/'+email,user);
  }
}
