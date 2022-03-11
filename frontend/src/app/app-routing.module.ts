import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { LoginComponent } from './home/login/login.component';
import { ListServicesComponent } from './service/list-services/list-services.component';
import { RegisterComponent } from './service/register/register.component';
import { UpdateServiceComponent } from './service/update-service/update-service.component';
import { ListDeliveryComponent } from './user/list-delivery/list-delivery.component';
import { ListUsersComponent } from './user/list-users/list-users.component';
import { RegisterDeliveryComponent } from './user/register-delivery/register-delivery.component';
import { RegisterUserComponent } from './user/register-user/register-user.component';
import { UpdateDeliveryComponent } from './user/update-delivery/update-delivery.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},

  {
    path: 'home',
    component: DashboardComponent, 
    children: [ 
        {path:'',component:ListServicesComponent},
        {path:'list-services',component:ListServicesComponent},
        {path:'registerService',component:RegisterComponent}, 
      {path:'update-service',component:UpdateServiceComponent},
      {path:'register-user',component:RegisterUserComponent},
      {path:'list-users',component:ListUsersComponent},
      {path:'update-user/:element',component:UpdateUserComponent},
      {path:'register-delivery',component:RegisterDeliveryComponent},
      {path:'list-delivery',component:ListDeliveryComponent},
      {path:'update-delivery',component:UpdateDeliveryComponent}
    ]
  },
 
     
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
