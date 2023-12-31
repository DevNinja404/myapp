import { Component, ElementRef, OnInit, ViewChild,ChangeDetectionStrategy  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Apiso2operationserviceService } from 'src/app/apiso2operationservice.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { So2Operation } from 'src/app/so2operation/so2-operation';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import {PrintService} from 'src/app/print.service';
import { SimpleChanges } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-show-so2operation',
  templateUrl: './show-so2operation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./show-so2operation.component.css']
  
})
export class ShowSo2operationComponent implements OnInit {
  constructor(private service: Apiso2operationserviceService, private translate: TranslateService,
     private route: ActivatedRoute,public printService: PrintService) { }
     private unsubscribe$: Subject<void> = new Subject();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('printContent', { static: false }) printContent!: ElementRef;


  So2operationList: So2Operation[] = []; // Use the interface as a type
  So2: So2Operation | null = null;

  So2IdFilter: string = '';
  DaySO2HrsFilter: string = '';
  So2operationListWithoutFilter: any = [];

  // Add these properties
  editedData: any = {};
  editedRowIndex: number = -1;

  //Modal
  ModalTitle = "";
  ActivateAddEditSo2Comp: boolean = false;

  // Add pagination properties
  pageSize = 100; // Items per page
  currentPage = 0; // Current page
  pageSizeOptions: number[] = [5, 10, 25, 50];

  CreatedDate: string = '';
  selectedCreatedDate: string = '';
  // Add uniqueCreatedDates property
  uniqueCreatedDates: string[] = [];

  // Function to handle pagination event
  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.refreshSo2List();
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('selectedCreatedDate' in changes) {
      this.refreshSo2List();
    }
  }

  // ngAfterViewInit() {    
  // }
  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      console.log('Query Params:', queryParams);
      const selectedLanguage = queryParams['lang'];
  
      if (selectedLanguage) {
        this.changeLanguage(selectedLanguage);
      } else {
        this.translate.setDefaultLang('en');
      }
  
       this.refreshSo2List();
    });   
  }

  addClick() {
    this.So2 = {
      Id: "0",
      DaySO2Hrs: "",
      DaySO2Water: "",
      CumSO2Hrs: "",
      CumSO2Water: "",
      Remarks: "",
      CreatedDate: new Date() 
    }
    this.ModalTitle = "Add SO2_Operation";
    this.ActivateAddEditSo2Comp = true;
  }

  editClick(item: any) {
    this.So2 = item;
    this.ModalTitle = "Edit SO2_Operation";
    this.ActivateAddEditSo2Comp = true;
  }

  deleteClick(item: any) {
    if (confirm('confirm.delete')) {
      this.service.DeleteSO2Operation(item.Id).subscribe(data => {
        alert(data.toString());
        this.refreshSo2List();
      })
    }
  }

  closeClick() {
    this.ActivateAddEditSo2Comp = false;
    this.refreshSo2List();
  }


  // refreshSo2List() {
  //   this.service.getSo2operationList().subscribe(data => {
  //     this.So2operationListWithoutFilter = data;

  //     // Calculate the start and end indexes for the current page
  //     const startIndex = this.currentPage * this.pageSize;
  //     const endIndex = startIndex + this.pageSize;

  //     // Slice the data for the current page
  //     this.So2operationList = this.So2operationListWithoutFilter.slice(startIndex, endIndex);

  //     // Update the length of the paginator
  //     this.paginator.length = this.So2operationListWithoutFilter.length;
  //   });
  // }

  sortResult(prop: any, asc: any) {
    this.So2operationList = this.So2operationListWithoutFilter.sort(function (a: any, b: any) {
      if (asc) {
        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
      }
      else {
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      }
    });
  }

  FilterFn() {
    var So2IdFilter = this.So2IdFilter;
    var DaySO2HrsFilter = this.DaySO2HrsFilter;

    this.So2operationList = this.So2operationListWithoutFilter.filter(
      function (el: any) {
        return el.Id.toString().toLowerCase().includes(
          So2IdFilter.toString().trim().toLowerCase()
        ) &&
          el.DaySO2Hrs.toString().toLowerCase().includes(
            DaySO2HrsFilter.toString().trim().toLowerCase())
      }
    );
  }

  // Function to change the language
  changeLanguage(language: string) {
    this.translate.use(language);
  }

  // Print Method
  print(item: any): void {   
     
    this.So2 = item;   
    
    if (!this.So2) {
      console.error('printContent is not defined.');
      return;
    }
  
    const printWindow = window.open('', '', 'width=900, height=800');
  
    if (!printWindow) {
      console.error('Print window is null. Make sure your browser allows pop-ups for this site.');
      return;
    }
  
    const translatedDaySO2Hours = this.translate.instant('dataItem.DaySO2Hrs');
    const translatedDaySO2Water = this.translate.instant('dataItem.DaySO2Water');
    const translatedCumSO2Hrs = this.translate.instant('dataItem.CumSO2Hrs');
    const translatedCumSO2Water = this.translate.instant('dataItem.CumSO2Water');
    const translatedRemarks = this.translate.instant('dataItem.Remarks');
    

    const customStyles = `
      body {
        font-family: 'Roboto', 'Helvetica Neue', sans-serif;
        line-height: 1.6;
        background-color: #f5f5f5;
        color: #333;
        margin: 0;
        padding: 0;
      }
      .invoice-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        background-color: #fff;
        border-radius: 10px;
      }
      .print-header {
        text-align: left;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .logo {
        max-width: 150px;
        height: auto;
        border-radius: 8px;
      }    
      .print-content {
        margin-bottom: 20px;
      }
      table {
         width: 90%;
        border-collapse: collapse;
        margin-bottom: 20px;
      }
      th, td {
        border: 1px solid #ddd;
        padding: 12px;
        text-align: left;
      }
      th {
        background-color: #f5f5f5;
        color: #333;
      }
      .barcode {
        text-align: right;
        font-size: 20px;
        float:right;      
        writing-mode: vertical-rl;
        text-orientation: mixed;
        // margin-top: 50px;
        background-color:#748EB4;
        color: white;
        font-weight: bold
      }
      .print-footer {
        text-align: right;
        font-size: 20px;
        color: #777;
        margin-top: 20px;
        position: fixed;
        bottom: 0;
        page-break-inside: avoid;
      }
    `;
  
    const headerContent = `
      <div class="print-header">      
        <img class="logo" src="assets/Logo.png" alt="Company Logo">
        <span style="font-weight: bold">So2Operatation</span>        
      </div>
    `;
  
    const content = `
      <div class="print-content">
        <table>
          <tr>
            <th>ID</th>
            <td>${this.So2.Id}</td>
          </tr>
          <tr>
          <th>${translatedDaySO2Hours}</th>
          <td>${this.So2.DaySO2Hrs}</td>                      
          </tr>
          <tr>
            <th>${translatedDaySO2Water}</th>
            <td>${this.So2.DaySO2Water}</td>
          </tr>
          <tr>
            <th>${translatedCumSO2Hrs}</th>
            <td>${this.So2.CumSO2Hrs}</td>
          </tr>
          <tr>
            <th>${translatedCumSO2Water}</th>
            <td>${this.So2.CumSO2Water}</td>
          </tr>
          <tr>
            <th>${translatedRemarks}</th>
            <td>${this.So2.Remarks}</td>
            
          </tr>
          <tr>
          <span  class="barcode">      
          Barcode 
          "*V253DTIUNOC/120223"          
      </span>     
      </tr>
        </table> 
       
      </div>     
    `;
  
    const footerContent = `<div class="print-footer">Thank you for your business!</div>`;
  
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <style>${customStyles}</style>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
          <div class="invoice-container">${headerContent}${content}${footerContent}</div>
        </body>
      </html>
    `);
    printWindow.document.close();
  
    // Perform the print
    printWindow.window.scrollTo(0, 1000);
    //printWindow.moveTo(0, 0);
    setTimeout(() => {
      printWindow.print();
      // printWindow.close();
    }, 100);
    //printWindow.document.close();
    const onAfterPrint = () => {
      console.log('After print');
      printWindow.removeEventListener('printWindow.close()', onAfterPrint);
      printWindow.close();
    };
  
    printWindow.addEventListener('onafterprint', onAfterPrint);
  }  

  // Print All Method
  printAll(): void {
    const printWindow = window.open('', '', 'width=950, height=800');
  
    if (!printWindow) {
      console.error('Print window is null. Make sure your browser allows pop-ups for this site.');
      return;
    }
    const translatedDaySO2Hours = this.translate.instant('dataItem.DaySO2Hrs');
    const translatedDaySO2Water = this.translate.instant('dataItem.DaySO2Water');
    const translatedCumSO2Hrs = this.translate.instant('dataItem.CumSO2Hrs');
    const translatedCumSO2Water = this.translate.instant('dataItem.CumSO2Water');
    const translatedRemarks = this.translate.instant('dataItem.Remarks');
    const customStyles = `
      body {
        font-family: 'Roboto', 'Helvetica Neue', sans-serif;
        line-height: 1.6;
        background-color: #f5f5f5;
        color: #333;
        margin: 0;
        padding: 0;
      }
      .invoice-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        background-color: #fff;
        border-radius: 10px;
      }
      .print-header {
        text-align: left;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .logo {
        max-width: 150px;
        height: auto;
        border-radius: 8px;
      }    
      .print-content {
        margin-bottom: 20px;
      }
      table {
         width: 90%;
        border-collapse: collapse;
        margin-bottom: 20px;
      }
      th, td {
        border: 1px solid #ddd;
        padding: 12px;
        text-align: left;
      }
      th {
        background-color: #f5f5f5;
        color: #333;
      }
      .barcode {
        text-align: right;
        font-size: 20px;
        float:right;      
        writing-mode: vertical-rl;
        text-orientation: mixed;
        // margin-top: 50px;
        background-color:#748EB4;
        color: white;
        font-weight: bold
      }
      .print-footer {
        text-align: right;
        font-size: 20px;
        color: #777;
        margin-top: 20px;
        position: fixed;
        bottom: 0;
        page-break-inside: avoid;
      }
    `;
    const headerContent = `
    <div class="print-header">      
    <img class="logo" src="assets/Logo.png" alt="Company Logo" style="max-width: 150px; height: auto; border-radius: 8px;">      
    </div>
  `;
    const content = `
      <div class="print-container">      
        <h3 style="text-align: center;">Print All So2OperationList Items</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              
              <th>${translatedDaySO2Hours}</th>
              <th>${translatedDaySO2Water}</th>
              <th>${translatedCumSO2Hrs}</th>
              <th>${translatedCumSO2Water}</th>
              <th>${translatedRemarks}</th>
            </tr>
          </thead>
          <tbody>
    `;
  
    const itemRows = this.So2operationList.map((item: any) => `
      <tr>
        <td>${item.Id}</td>
        <td>${item.DaySO2Hrs}</td>
        <td>${item.DaySO2Water}</td>
        <td>${item.CumSO2Hrs}</td>
        <td>${item.CumSO2Water}</td>
        <td>${item.Remarks}</td>
      </tr>
    `).join('');
  
    const footerContent = `
          </tbody>
        </table>
      </div>
    `;
  
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <style>${customStyles}</style>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>          
        <div class="invoice-container">${headerContent}${content}${itemRows}${footerContent}</div>
        </body>
      </html>
    `);
    printWindow.document.close();
  
    // Perform the print
    printWindow.window.scrollTo(0, 1000);
    printWindow.moveTo(0, 0);
    setTimeout(() => {
      printWindow.print();
      //printWindow.close();
    }, 100);
    const onAfterPrint = () => {
      console.log('After print');
      printWindow.removeEventListener('printWindow.close()', onAfterPrint);
      printWindow.close();
    };
  
    printWindow.addEventListener('onafterprint', onAfterPrint);
  }

  // Add a new function to handle the change event of the select element
  onCreatedDateChange() {   
    this.refreshSo2List();
  }

refreshSo2List() {
  this.service.getSo2operationList() .pipe(takeUntil(this.unsubscribe$))
  .subscribe(data => {
    this.So2operationListWithoutFilter = data;
    this.currentPage = 0;

    // Extract unique CreatedDates for the dropdown
    this.uniqueCreatedDates = [...new Set(data.map((item: So2Operation) => {
      // Check if item.CreatedDate is already a Date object
      const createdDate = item.CreatedDate instanceof Date ? item.CreatedDate : new Date(item.CreatedDate);
      return createdDate.toISOString();
    }))];

    // If a specific CreatedDate is selected, filter the list
    if (this.selectedCreatedDate) {
      const selectedDate = new Date(this.selectedCreatedDate); // Convert string to Date
      this.So2operationList = this.So2operationListWithoutFilter
        .filter((item: So2Operation) => {
          // Check if item.CreatedDate is already a Date object
          const createdDate = item.CreatedDate instanceof Date ? item.CreatedDate : new Date(item.CreatedDate);
          return createdDate.toISOString() === selectedDate.toISOString();
        });
    } else {
      // If no CreatedDate is selected, show all data
      this.So2operationList = this.So2operationListWithoutFilter.slice(0, this.pageSize);
    }

    this.paginator.length = this.So2operationListWithoutFilter.length;
  });
}  

ngOnDestroy(): void {
  // Unsubscribe to avoid memory leaks
  this.unsubscribe$.next();
  this.unsubscribe$.complete();
}
trackByFn(index: number, item: So2Operation): string {
  return item.Id.toString(); // Convert Id to string
}
}

