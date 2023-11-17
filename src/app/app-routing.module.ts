import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DepartmentComponent } from './department/department.component';
import { So2operationComponent } from './so2operation/so2operation.component';
import { PrintLayoutComponent } from './print-layout/print-layout.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'department', component: DepartmentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'so2operation', component: So2operationComponent },
  {
    path: 'print/:documentName', outlet: 'print',
    component: PrintLayoutComponent,
    children: [
      { path: 'so2operation', component: So2operationComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
