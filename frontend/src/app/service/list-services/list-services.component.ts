import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router, RouteReuseStrategy } from '@angular/router';
import { Service } from 'src/app/interfaces/servicio';

import { ServiceService } from 'src/app/services/service.service';
 
@Component({
  selector: 'app-list-services',
  templateUrl: './list-services.component.html',
  styleUrls: ['./list-services.component.css']
})

 
export class ListServicesComponent implements OnInit { 
  displayedColumns: string[] = ['Domiciliario', 'Destino','Cliente', 'Estado', 'Precio', 'Fecha','Detalles', 'Accion'];
  dataSource = new MatTableDataSource<any>();
  servicesData:any; 
  message:string="";
  @ViewChild(MatPaginator)
  paginator!: MatPaginator; 

  constructor(
    private _serviceService:ServiceService,
    private _router: Router,
    private _Arouter : ActivatedRoute
    
    ) { 
      this.servicesData={};
      this.dataSource=new MatTableDataSource(this.servicesData);
    }


  ngOnInit(): void {  
    this._serviceService.listService().subscribe({
      next: (v) => {
        
        this.servicesData = v.servicios;
        for(let i=0;i<this.servicesData.length;i++){
          
           this.servicesData[i].creation_date=new Date(this.servicesData[i].creation_date)
           this.servicesData[i].creation_date=this.servicesData[i].creation_date.toLocaleString();

           this.servicesData[i].closing_date=new Date(this.servicesData[i].closing_date);
           this.servicesData[i].closing_date=this.servicesData[i].closing_date.toLocaleString();
         }
        console.log(this.servicesData);
        
        // this.isPo = v.verifyPo;
        this.dataSource = new MatTableDataSource(this.servicesData);
         this.dataSource.paginator = this.paginator;
      },
      error: (e) => {
        //this.message = e.error.message;
        //this.openSnackBarError();
      },
    });  
  }
  deleteService = async (service: any) => {
    console.log(service);
    
      this._serviceService.deleteService(service).subscribe({
        next: (v) => {
          let index = this.servicesData.indexOf(service);
          if (index > -1) {
            this.servicesData.splice(index, 1);
            this.dataSource = new MatTableDataSource(this.servicesData);
            this.dataSource.paginator = this.paginator;
            this.message = 'Delete Project';
            
          }
        },
        error: (e) => {
          this.message = e.error.message;
          
        },
      });
    
  };
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
   

}
