import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-service',
  templateUrl: './detail-service.component.html',
  styleUrls: ['./detail-service.component.css']
})
export class DetailServiceComponent implements OnInit {
  serviceData:any={};

  constructor(
    private _router: Router,
    private _Arouter: ActivatedRoute,
    private _serviceService:ServiceService
  ) {
   }

  ngOnInit(): void {
    this._Arouter.params.subscribe((params) =>{
      let service=params;
      this._serviceService.listServiceById(service).subscribe({
        next:(v)=>{   
          //this._router.navigate(['/home/list-users'])
          this.serviceData=v.servicios[0];
          console.log(this.serviceData);

        },
        error:(e)=>{ 
          console.log(e.error.message);
          console.log("error"); 
          
         }
      });
    })
    
  }

}
