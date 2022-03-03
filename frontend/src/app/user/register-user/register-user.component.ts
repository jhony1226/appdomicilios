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
  message: string = '';

  constructor(
    private _userService: UserService,
    private _router: Router,
  ) {
    this.registerDate = {};
   }

  ngOnInit(): void {
  }

  saveUser():void{
    if (
      !this.registerDate.name ||
      !this.registerDate.email
    ) {
      
    } else {
      this.registerDate.idRole="30";
      this.registerDate.status="A";
<<<<<<< HEAD
      this.registerDate.password="";
      this.registerDate.phone=this.registerDate.phone.toString();
=======
      this.registerDate.password="1234";
>>>>>>> 70464765ddf658f78b130e67efde8bf16d919865
      console.log(this.registerDate);
      
      this._userService.registerUser(this.registerDate).subscribe({
        next:(v)=>{   
          //this._router.navigate(['/home/list-users'])
          this.registerDate={}
          console.log("registrado");
          console.log(v);   
        },
        error:(e)=>{ 
          console.log(e.error.message);
          console.log("error"); 
         }
      });
    }

  }

}
