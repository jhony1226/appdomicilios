import { Component, OnInit,Inject, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import { UserService } from 'src/app/services/user.service';
import { ListServicesComponent } from '../list-services/list-services.component';
import { ModalClientComponent } from '../modal-client/modal-client.component';
import { ModalDomiciliarioComponent } from '../modal-domiciliario/modal-domiciliario.component';



export interface DialogData {
  cliente: any;
   domicilio: any;
 }
@Component({
  selector: 'app-update-service',
  templateUrl: 'update-service.component.html',
  styleUrls: ['./update-service.component.css']
})
export class UpdateServiceComponent implements OnInit {
  cliente: any;
  domicilio: any;
  registerData: any;
  nombre: string=''; 
  nombreDom: string='';
  idCliente:number=0; 
  idDom: number=0; 
  celular:string='';
  message: string = ''; 
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private _router: Router,
    private _Arouter: ActivatedRoute,
    public dialog: MatDialog,
    private _serviceService:ServiceService
  ) {
    this.registerData = {};
   }

  ngOnInit(): void {
    this._Arouter.params.subscribe((params) => {
      this.registerData=params["element"];

    })
  }

  openDialogDom(): void { 
    const dialogRef2 = this.dialog.open(ModalDomiciliarioComponent, {
      width: '100%',
      data: { domicilio: this.domicilio,   },
    });
    //dialogo para  domiciliarios
    dialogRef2.afterClosed().subscribe((result) => { 
      this.domicilio = result;
      console.log( this.domicilio.name);  
      this.nombreDom=this.domicilio.name
      this.idDom=this.domicilio.id
     });
  }
  
  openDialogClient(): void {
    const dialogRef = this.dialog.open(ModalClientComponent, {
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
      
      this._serviceService.registerService(this.registerData).subscribe({
        next:(v)=>{   
          //this._router.navigate(['/home/list-users'])
          this.registerData={}
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