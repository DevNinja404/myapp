import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {PrintService} from './print.service';
import { So2operationComponent } from './so2operation/so2operation.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  constructor(private router: Router,public printService: PrintService) {}

  // Check if the current route is the default 'login' route
  isDefaultRouteLogin() { 
    return this.router.url === '/login';
  }  
//   onPrintInvoice() {
//     const so2operation = 'so2operation';
//     this.printService.printDocument('so2operation',so2operation);
// }

}