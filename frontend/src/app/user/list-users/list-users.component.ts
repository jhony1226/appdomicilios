import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router, RouteReuseStrategy } from '@angular/router';
import { Service } from 'src/app/interfaces/servicio';

import { ServiceService } from 'src/app/services/service.service';
import { UserService } from 'src/app/services/user.service';
import { UpdateUserComponent } from '../update-user/update-user.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent implements OnInit {
  displayedColumns: string[] = [ 'Nombre', 'Email','Telefono','Accion'];
  dataSource = new MatTableDataSource<any>();
  message:string;
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
    this.message="";
    this.usersData = {};
    this.dataSource = new MatTableDataSource(this.usersData);
  }

  ngOnInit(): void {
    this._userService.listClients().subscribe({
      next: (v) => {
        this.usersData = v.users;
        console.log(v);

        // this.isPo = v.verifyPo;
        this.dataSource = new MatTableDataSource(this.usersData);
        this.dataSource.paginator = this.paginator;
      },
      error: (e) => {
        this.message = e.error.message;
        this.openSnackBarError();
      },
    });
  }

  eliminar(user:any){
    
    console.log({userDelete:user});
    
    console.log(user);
    
    this._userService.deleteUser(user).subscribe({
      next: (v) => {
        console.log(v);
        this.message='Usuario Desactivado'
        this.openSnackBarSuccesfull();
         this.ngOnInit();  
      },
      error: (e) => {
        this.message = e.error.message;
        this.openSnackBarError();
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
    
    const dialogRef2 = this.dialog.open(UpdateUserComponent, {
      width: '40%',
      data: { domicilio: domi, },
    });
    //dialogo para  domiciliarios
    dialogRef2.afterClosed().subscribe((result) => { 
      this.domiciliario = result;
      this.ngOnInit();      
     });
  }

  openSnackBarSuccesfull() {
    Swal.fire({
  icon: 'success',
  title: this.message,
  showConfirmButton: true,
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
