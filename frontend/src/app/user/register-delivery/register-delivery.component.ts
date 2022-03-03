import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-delivery',
  templateUrl: './register-delivery.component.html',
  styleUrls: ['./register-delivery.component.css']
})
export class RegisterDeliveryComponent implements OnInit {
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
      this.registerDate.idRole="31";
      this.registerDate.status="A";
      this.registerDate.phone=this.registerDate.phone.toString();
      console.log(this.registerDate);
      
      this._userService.registerUser(this.registerDate).subscribe({
        next:(v)=>{  
          
          //this._router.navigate(['/home/list-users'])
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
