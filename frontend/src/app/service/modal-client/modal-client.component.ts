import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import {
  DialogOverviewExampleDialog,
  DialogData,
} from '../register/register.component';

@Component({
  selector: 'app-modal-client',
  templateUrl: './modal-client.component.html',
  styleUrls: ['./modal-client.component.css'],
})
export class ModalClientComponent implements OnInit {
  displayedColumns: string[] = ['Nombre', 'Email', 'Estado', 'Seleccion'];
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
