import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './home/header/header.component';
import { FooterComponent } from './home/footer/footer.component';
import { LoginComponent } from './home/login/login.component';
import { DialogOverviewExampleDialog, RegisterComponent } from './service/register/register.component';
import { ListServicesComponent } from './service/list-services/list-services.component';
import { UpdateServiceComponent } from './service/update-service/update-service.component';
import { RegisterUserComponent } from './user/register-user/register-user.component';
import { ListUsersComponent } from './user/list-users/list-users.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {ServiceService} from'./services/service.service';
import { UserService } from './services/user.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { MatIconModule} from '@angular/material/icon';

import { AuthGuard } from './guard/auth.guard';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {MatTableModule} from '@angular/material/table';
import { DashboardComponent } from './home/dashboard/dashboard.component';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list'; 
import { MatMenuModule } from '@angular/material/menu';  
import {MatInputModule} from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog'; 
import {MatSelectModule} from '@angular/material/select';  

import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import { RegisterDeliveryComponent } from './user/register-delivery/register-delivery.component';
import { UpdateDeliveryComponent } from './user/update-delivery/update-delivery.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ModalDomiciliarioComponent } from './service/modal-domiciliario/modal-domiciliario.component';
import { ListDeliveryComponent } from './user/list-delivery/list-delivery.component';
import { ModalClientComponent } from './service/modal-client/modal-client.component';

 


@NgModule({

  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ListServicesComponent,
    UpdateServiceComponent,
    RegisterUserComponent,
    ListUsersComponent,
    UpdateUserComponent,
    DashboardComponent,
    RegisterDeliveryComponent,
    UpdateDeliveryComponent,
    DialogOverviewExampleDialog,
    ModalDomiciliarioComponent,
    ListDeliveryComponent,
    ModalClientComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSelectModule
  ],
  providers: [ServiceService,UserService,TokenInterceptorService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
