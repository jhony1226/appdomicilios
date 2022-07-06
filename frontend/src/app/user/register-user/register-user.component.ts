import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


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
      this.openSnackBarError();
      
    } else {
      this.registerDate.idRole="30";
      this.registerDate.status="A";
      this.registerDate.phone=this.registerDate.phone.toString();
      this.registerDate.password="1234";
      console.log(this.registerDate);
      
      this._userService.registerUser(this.registerDate).subscribe({
        next:(v)=>{   
          //this._router.navigate(['/home/list-users'])
          this.registerDate={}
          console.log("registrado");
          console.log(v); 
          this.openSnackBarSuccesfull();  
        },
        error:(e)=>{ 
          console.log(e.error.message);
          console.log("error"); 
          this.openSnackBarError();
         }
      });
    }

  }
  openSnackBarSuccesfull() {
    Swal.fire({
  icon: 'success',
  title: 'Cliente creado',
  showConfirmButton: false,
  timer: 1500
})
  }

  openSnackBarError() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: this.message,
    })
  }

}
