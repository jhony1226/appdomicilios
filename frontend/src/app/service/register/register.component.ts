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

      const notificationapp={
        id_token:this.idToken,
        title: "Servicio asignado",
        body_text: "Direccion:"+this.registerData.destination+" Total:$"+this.registerData.price,
        idService :0
      }  
      
      const notification2={
        id:0,
        idService: 0,
        status: 1,
        title:"Servicio asignado",
        subtitle: notificationapp.body_text,
        fecha:'',
        descripcion:"descripcion"
      }
      //console.log(notification);
      
      console.log("nuevo registro99");  
      this._serviceService.registerService(this.registerData).subscribe({
        next:(v)=>{   
          //console.log(v); 
          this.registerData={}
          this.domicilio={}
          this.cliente=[]
          this.nombre=""
          this.celular=""
          this.nombreDom=""
          notificationapp.idService=v.service["idService"]
          notification2.idService=v.service.id
          console.log( "serv:"+ v.service["idService"]);
          console.log("notificacion2"+ v.service.id);
          console.log("notificacion23"+ v.service["idService"]);
          console.log("notificacion24"+v.service["id"]);
          this._serviceService.sendNotification(notificationapp).subscribe({
            next:(noti)=>{  
              console.log("notificacion enviada");  
            }
          })
          
          this._serviceService.registerNotificacion(notification2).subscribe({
            next:(notification)=>{  
              console.log("notificacion registrada");  
            }
          })
          //this._router.navigate(['/home/list-users'])
         
          //console.log("registrado");
          //console.log(v);  
           
        },
        error:(e)=>{ 
          console.log("error servicio.ts" + e.error.message);
         // console.log("error"); 
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
