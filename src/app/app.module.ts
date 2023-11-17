import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartmentComponent } from './department/department.component';
import { AddEditDepartmentComponent } from './department/add-edit-department/add-edit-department.component';
import { ShowDepartmentComponent } from './department/show-department/show-department.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiserviceService } from './apiservice.service';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { So2operationComponent } from './so2operation/so2operation.component';
import { AddEditSo2operationComponent } from './so2operation/add-edit-so2operation/add-edit-so2operation.component';
import { ShowSo2operationComponent } from './so2operation/show-so2operation/show-so2operation.component';
import { Apiso2operationserviceService } from './apiso2operationservice.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';import { ToastrModule } from 'ngx-toastr';

import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import {NgxPrintModule} from 'ngx-print';
import { PrintLayoutComponent } from './print-layout/print-layout.component';
import {PrintService} from './print.service';

// Create a loader function for translations
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    DepartmentComponent,
    AddEditDepartmentComponent,
    ShowDepartmentComponent,
    LoginComponent,
    So2operationComponent,
    AddEditSo2operationComponent,
    ShowSo2operationComponent,
    NavbarComponent,
    PrintLayoutComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule,
    MatPaginatorModule, MatInputModule, MatSelectModule,NoopAnimationsModule,BrowserAnimationsModule,NgxPrintModule,
    
    ToastrModule.forRoot({
      timeOut: 3000, // Duration of the toast
      positionClass: 'toast-top-center', // Position of the toast
      preventDuplicates: true, // Prevent duplicate toasts
      // Other configuration options
    }),       
    TranslateModule.forRoot({ // Add this TranslateModule configuration
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [ApiserviceService,Apiso2operationserviceService],  
  bootstrap: [AppComponent]
})
export class AppModule { }
