//import { ThrowStmt } from '@angular/compiler';
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
  registerData: any={
    "idService":Number,
      "idCliente":Number,
      "idDeliv":Number,
      "price":Number,
      "destination":String,
      "source":String,
      "observation":String,
      "idStatus":Number
  };
  registerDataService: any;

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
   
    this.registerDataService = {};
   }

  ngOnInit(): void {
    this._Arouter.params.subscribe((params) => {
      console.log(params);
      
      let service=params;
      this._serviceService.listServiceById(service).subscribe({
        next:(v)=>{   
          //this._router.navigate(['/home/list-users'])
          
          console.log(v.servicios[0]);
          
          this.registerDataService=v.servicios[0]; //console.log(this.registerDataService[0].id);

          this.cliente=this.registerDataService.name_client;
          this.domicilio=this.registerDataService.name_deliv;
          
          this.nombre=this.registerDataService.name_client;
          this.nombreDom=this.registerDataService.name_deliv;
          this.idCliente=this.registerDataService.source.id_client;
          this.idDom=this.registerDataService.source.id_deliv;

          this.registerData.idService=this.registerDataService.id;
          this.registerData.idCliente=this.registerDataService.id_client;
          this.registerData.idDeliv=this.registerDataService.id_deliv;
          this.registerData.price=this.registerDataService.price;
          this.registerData.destination=this.registerDataService.destination;
          this.registerData.source=this.registerDataService.source;
          this.registerData.observation=this.registerDataService.observation;
          this.registerData.idStatus=this.registerDataService.idStatus;

        },
        error:(e)=>{ 
          console.log(e.error.message);
          console.log("error"); 
          
         }
      });

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
    
     if(this.idDom!=undefined){
      this.registerData.idDeliv=this.idDom;
      
      console.log(this.idDom);
     }
     if(this.idCliente!=undefined){
      this.registerData.idCliente=this.idCliente;
     }  
      
      console.log(this.registerData);
      this.registerData.idStatus=1;
      this._serviceService.upadateService(this.registerData).subscribe({
        next:(v)=>{   
          this._router.navigate(['/home/list-services'])
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