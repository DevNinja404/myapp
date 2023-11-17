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

onPrintInvoice() {
  const documentName = 'so2operation'; // Change this to the desired document name
  const documentData = this.getHtmlContent(); // Replace this with how you obtain the HTML content
  this.printService.printDocument(documentName, documentData);
}

getHtmlContent(): string {
  // Replace this with code to get the HTML content you want to print
  return '<div><h1>Hello, World!</h1></div>';
}

}