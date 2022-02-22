import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router, RouteReuseStrategy } from '@angular/router';
import { Service } from 'src/app/interfaces/servicio';

import { ServiceService } from 'src/app/services/service.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  displayedColumns: string[] = ['Rol', 'Nombre', 'Email', 'Estado'];
  dataSource = new MatTableDataSource<any>();
  usersData:any;

  constructor(
    private _userService:UserService,
    private _router: Router,
    private _Arouter : ActivatedRoute
  ) { 
    this.usersData={};
    this.dataSource=new MatTableDataSource(this.usersData);
  }

  ngOnInit(): void {
    this._userService.listUsers().subscribe({
      next: (v) => {
        this.usersData = v.users;
        console.log(v);
        
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

}
