import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  registerDate: any;

  constructor(
    private _userService: UserService,
    private _router: Router,
  ) {
    this.registerDate = {};
   }

  ngOnInit(): void {
  }

  saveTask():void{
    if (
      !this.registerDate.name ||
      !this.registerDate.description
    ) {
      
    } else {
      this._userService.registerUser(this.registerDate).subscribe({
        next:(v)=>{  
          
          this._router.navigate(['/listTask'])
          
        },
        error:(e)=>{ 
          console.log(e.error.message);
          
         }
      });
    }

  }

}
