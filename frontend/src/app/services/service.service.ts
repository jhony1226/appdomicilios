import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private env:string;

  constructor(private _http : HttpClient,private _route:Router) { 
    this.env=environment.APP_URL; 
  }
  listService(){
    return this._http.get<any>(this.env+'services/getServices/');
  }
  registerService(service:any){
    return this._http.post<any>(this.env+'services/registerService/',service);
  }
}
