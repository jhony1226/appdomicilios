import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/services/service.service';
import { UserService } from 'src/app/services/user.service';
import { ListServicesComponent } from '../list-services/list-services.component';
import { ModalDomiciliarioComponent } from '../modal-domiciliario/modal-domiciliario.component';

export interface DialogData {
 cliente: any;
  domicilio: any;
}

/**
 * @title Dialog Overview
 */

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  cliente: any;
  domicilio: any;
  registerData: any;
  nombre: string=''; 
  nombreDom: string='';
  idCliente:number=0; 
  idToken:string="";
  idDom: number=0; 
  celular:string='';
  message: string = ''; 
  constructor(public dialog: MatDialog,
    private _serviceService:ServiceService) {
    this.registerData = {};
  }

  ngOnInit(): void {}

  openDialogDom(): void { 
    const dialogRef2 = this.dialog.open(ModalDomiciliarioComponent, {
      width: '100%',
      data: { domicilio: this.domicilio,   },
    });
    //dialogo para  domiciliarios
    dialogRef2.afterClosed().subscribe((result) => { 
      this.domicilio = result;
      console.log( this.domicilio.id_token);  
      this.nombreDom=this.domicilio.name
      this.idDom=this.domicilio.id 
     this.idToken=this.domicilio.id_token
     });
  }
  
  openDialogClient(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '100%',
      data: { cliente: this.cliente },
    }); 
    //dialogo para  usuarios
    dialogRef.afterClosed().subscribe((result) => { 
     this.cliente = result; 
     this.nombre=this.cliente.name
     this.celular=this.cliente.phone
     this.idCliente=this.cliente.id
    }); 
  }

  save(): void{
    if (
      !this.registerData.name ||
      !this.registerData.email
    ){
      this.registerData.idCliente=this.idCliente;
      this.registerData.idDeliv=this.idDom;
      this.registerData.idStatus=1;
      ;
      console.log(this.domicilio);
      
      console.log(this.registerData);

      const notification={
        id_token:this.idToken,
        title: "Servicio asignado",
        body_text: "Direccion:"+this.registerData.destination+" Total:$"+this.registerData.price,
        idService :this.registerData.id 
      }  
      console.log(notification);
      
      console.log("nuevo registro99");  
      this._serviceService.registerService(this.registerData).subscribe({
        next:(v)=>{   
          console.log(v.id);
          notification.idService=v.id
          this._serviceService.sendNotification(notification).subscribe({
            next:(v)=>{  
              console.log("notificacion enviada");  
            }
          })
          //this._router.navigate(['/home/list-users'])
          this.registerData={}
          //console.log("registrado");
          //console.log(v);  
           
        },
        error:(e)=>{ 
          console.log(e.error.message);
          console.log("error"); 
         }
      });
    }
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['./register.component.css'],
})
export class DialogOverviewExampleDialog {
  displayedColumns: string[] = [ 'Nombre', 'Email', 'Estado' ,'Seleccion'];
  dataSource = new MatTableDataSource<any>();
  usersData: any;

  constructor(
    private _userService: UserService,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.usersData = {};
    this.dataSource = new MatTableDataSource(this.usersData);
  }

  ngOnInit(): void {
    this._userService.listClients().subscribe({
      next: (v) => {
        this.usersData = v.users;
       // console.log(v);

        // this.isPo = v.verifyPo;
        this.dataSource = new MatTableDataSource(this.usersData);
        //this.dataSource.paginator = this.paginator;
      },
      error: (e) => {
        //this.message = e.error.message;
        //this.openSnackBarError();
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

   
}
