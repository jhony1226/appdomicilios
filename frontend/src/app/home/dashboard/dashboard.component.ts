import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, EventEmitter ,Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { UserService } from 'src/app/services/user.service';
 
 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit,  OnDestroy {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  mobileQuery: MediaQueryList; 
  name:any ='';
  private element: HTMLElement | undefined;
  private _mobileQueryListener: () => void;

  constructor(public _userService: UserService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.name=localStorage.getItem('name');
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
  toggleActive(event: any) {
    debugger;
    event.preventDefault();
    if (this.element !== undefined) {
      this.element.style.backgroundColor = 'white';
      this.element.style.color='black'
    }
    var target = event.currentTarget; 
    target.style.backgroundColor = '#ecde1f';
    target.style.color='black'
    this.element = target;
  }


}
