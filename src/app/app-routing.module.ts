import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PolicydetailsComponent } from './components/policydetails/policydetails.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { policyguardGuard } from './service/policyguard.guard';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'Policydetails',
    component: PolicydetailsComponent,
    canActivate:[policyguardGuard]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
