import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { So2operationComponent } from './so2operation.component';

const routes: Routes = [
  { path: '', component: So2operationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class So2OperationModule { }
