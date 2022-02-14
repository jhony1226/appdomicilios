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

import {ServiceService} from'./services/service.service';
import { UserService } from './services/user.service';
import { TokenInterceptorService } from './services/token-interceptor.service';

import { AuthGuard } from './guard/auth.guard';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

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
    UpdateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ServiceService,UserService,TokenInterceptorService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }