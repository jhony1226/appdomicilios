import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { DialogData } from '../list-delivery/list-delivery.component';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-update-delivery',
  templateUrl: './update-delivery.component.html',
  styleUrls: ['./update-delivery.component.css']
})
export class UpdateDeliveryComponent implements OnInit {
  registerData: any;
  message: string = '';
  status: string = this.data.domicilio.status;
  email:string =this.data.domicilio.email; 
  constructor(
    private _userService: UserService,
    private _router: Router,
    public dialogRef: MatDialogRef<UpdateDeliveryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.registerData = {};
   }

  ngOnInit(): void {
    this.registerData.name=this.data.domicilio.name;
    this.registerData.email=this.data.domicilio.email;
    this.registerData.phone=this.data.domicilio.phone;
    this.registerData.status=this.data.domicilio.status;
    this.registerData.idUser=this.data.domicilio.id;
    this.registerData.idRole=this.data.domicilio.id_role;

  }
  upUser():void{
    if(this.registerData.phone!=null){      
      this.registerData.phone=this.registerData.phone.toString();
    }
    this.registerData.status=this.status;

    if(this.registerData.name == this.data.domicilio.name &&
      this.registerData.email ==  this.data.domicilio.email &&
      this.registerData.phone==this.data.domicilio.phone &&
      this.registerData.status==this.data.domicilio.status &&
      !this.registerData.password
      ){
        this.message="ERROR. No hay cambios para aplicar"
        console.log(this.message);
        this.openSnackBarError();
        
      }

    else if (
      !this.registerData.name ||
      !this.registerData.email ||
      !this.registerData.phone  ||
      !this.registerData.status ||
      !this.registerData.idUser ||
      !this.registerData.idRole

    ) {
      this.message="ERROR. Datos incompletos"
      console.log(this.message); 
      this.openSnackBarError();
    } else {
      
      this._userService.updateUser(this.registerData,this.email).subscribe({
        next:(v)=>{  
          
          //this._router.navigate(['/home/list-users'])
          this.registerData={}
          console.log(v); 
           this.dialogRef.close(); 
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
  title: 'Domiciliario actualizado',
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
