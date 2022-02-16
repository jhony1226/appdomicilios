import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { ListServicesComponent } from './service/list-services/list-services.component';
import { RegisterComponent } from './service/register/register.component';
import { UpdateServiceComponent } from './service/update-service/update-service.component';
 

const routes: Routes = [
 //{path:'',component:LoginComponent},
  {path:'register-service',component:RegisterComponent},
  {path:'list-services',component:ListServicesComponent},
  {path:'update-service',component:UpdateServiceComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
