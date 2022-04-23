import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-detail-service',
  templateUrl: './detail-service.component.html',
  styleUrls: ['./detail-service.component.css']
})
export class DetailServiceComponent implements OnInit {
  displayedColumns: string[] = ['Cliente', 'Origen', 'Destino', 'Precio','Observaciones'];
  dataSource:any=new MatTableDataSource<any>();
  servicesData:any={};

  constructor(
    private _router: Router,
    private _Arouter: ActivatedRoute,
    private _serviceService:ServiceService
  ) {
    this.servicesData={};
    this.dataSource=new MatTableDataSource(this.servicesData);
   }

  ngOnInit(): void {
    this._Arouter.params.subscribe((params) =>{
      let service=params;
      this._serviceService.listServiceById(service).subscribe({
        next:(v)=>{   
          //this._router.navigate(['/home/list-users'])
          this.servicesData=v.servicios;
          console.log(this.servicesData[0]);
          
          this.dataSource = new MatTableDataSource(this.servicesData);
          
          console.log(this.dataSource);
          

        },
        error:(e)=>{ 
          console.log(e.error.message);
          console.log("error"); 
          
         }
      });
    })
    
  }

}
