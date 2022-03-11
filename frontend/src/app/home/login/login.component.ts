import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData:any;
  constructor(
    private _userService:UserService,
    private _route:Router,
    
  ) { 
    this.loginData={};
  }

  ngOnInit(): void {
  }

  login(){
    if(!this.loginData.email || !this.loginData.password) {
      console.log("datos incompletos");}
    else{
      this._userService.login(this.loginData).subscribe({
        next:(v)=>{
          this._route.navigate(['/home']);
          localStorage.setItem('token',v.token);
          localStorage.setItem('name',v.userName);
          console.log(v);
          
        }
      })
    }
    
  }

}
