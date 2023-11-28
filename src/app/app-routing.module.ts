import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DepartmentComponent } from './department/department.component';
import { So2operationComponent } from './so2operation/so2operation.component';



// const routes: Routes = [
//   { path: '', redirectTo: 'login', pathMatch: 'full' },
//   { path: 'department', component: DepartmentComponent },
//   { path: 'login', component: LoginComponent },
//   { path: 'so2operation', component: So2operationComponent },
  
// ];
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'department', loadChildren: () => import('./department/department.module').then(m => m.DepartmentModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'so2operation', loadChildren: () => import('./so2operation/so2operation.module').then(m => m.So2OperationModule) },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
