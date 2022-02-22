import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './home/header/header.component';
import { FooterComponent } from './home/footer/footer.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './service/register/register.component';
import { ListServicesComponent } from './service/list-services/list-services.component';
import { UpdateServiceComponent } from './service/update-service/update-service.component';
import { RegisterUserComponent } from './user/register-user/register-user.component';
import { ListUsersComponent } from './user/list-users/list-users.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field'
import {ServiceService} from'./services/service.service';
import { UserService } from './services/user.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import {MatIconModule} from '@angular/material/icon';

import { AuthGuard } from './guard/auth.guard';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {MatTableModule} from '@angular/material/table';
import { DashboardComponent } from './home/dashboard/dashboard.component';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list'; 

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
    DashboardComponent
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
    MatCardModule,
    MatFormFieldModule,
  ],
  providers: [ServiceService,UserService,TokenInterceptorService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
