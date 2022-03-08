import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router'; 
import { UserService } from 'src/app/services/user.service';
import { UpdateDeliveryComponent } from '../update-delivery/update-delivery.component';
export interface DialogData { 
   domicilio: any;
 }
@Component({
  selector: 'app-list-delivery',
  templateUrl: './list-delivery.component.html',
  styleUrls: ['./list-delivery.component.css']
})
export class ListDeliveryComponent implements OnInit {
  displayedColumns: string[] = [ 'Nombre', 'Email', 'Estado','Accion'];
  dataSource = new MatTableDataSource<any>();
  usersData: any;
  domiciliario:any;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private _userService: UserService,
    private _router: Router,
    private _Arouter: ActivatedRoute
  ) {
    this.usersData = {};
    this.dataSource = new MatTableDataSource(this.usersData);
  }

  ngOnInit(): void {
   
    
    this._userService.listDeliverys().subscribe({
      next: (v) => {
        for(let i=0 ; i< v.users.length ; i++){
          if(v.users[i].status=="I"){
            console.log(v.users[i].status)
            v.users[i].status="INACTIVO";
            console.log(v.users[i].status)
                       
          }
          else{
            v.users[i].status="ACTIVO";
          }
        }
        this.usersData = v.users;
        console.log(v);

        // this.isPo = v.verifyPo;
        this.dataSource = new MatTableDataSource(this.usersData);
        this.dataSource.paginator = this.paginator;
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

  openDialogDom(domi:any): void { 
    
    const dialogRef2 = this.dialog.open(UpdateDeliveryComponent, {
      width: '100%',
      data: { domicilio: domi,   },
    });
    //dialogo para  domiciliarios
    dialogRef2.afterClosed().subscribe((result) => { 
      this.domiciliario = result;
      this.ngOnInit();      
     });
  }

}
