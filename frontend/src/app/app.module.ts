import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { RegisterComponent } from './service/register/register.component';
import { ListServicesComponent } from './service/list-services/list-services.component';
import { UpdateServiceComponent } from './service/update-service/update-service.component';  
import {ServiceService} from'./services/service.service';
import { UserService } from './services/user.service';
import { TokenInterceptorService } from './services/token-interceptor.service';

import { AuthGuard } from './guard/auth.guard';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import { SidebarComponent } from './home/sidebar/sidebar.component';
import { FooterComponent } from './home/footer/footer.component';



@NgModule({
  declarations: [
    AppComponent, 
    RegisterComponent,
    ListServicesComponent,
    UpdateServiceComponent,
    DashboardComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent, 
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
