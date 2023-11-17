import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-department',
  templateUrl: './show-department.component.html',
  styleUrls: ['./show-department.component.css']
})
export class ShowDepartmentComponent implements OnInit {

  constructor(private service: ApiserviceService,private translate: TranslateService,private route: ActivatedRoute) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  DepartmentList: any = [];
  ModalTitle = "";
  ActivateAddEditDepartComp: boolean = false;
  depart: any;

  DepartmentIdFilter = "";
  DepartmentNameFilter = "";
  DepartmentListWithoutFilter: any = [];
  
  // Add pagination properties
  pageSize = 5; // Items per page
  currentPage = 0; // Current page
  pageSizeOptions: number[] = [5, 10, 25, 50];

   // Function to handle pagination event
   onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.refreshDepList();
  }



  ngOnInit(): void {
    this.refreshDepList();
    this.route.queryParams.subscribe((queryParams) => {
      const selectedLanguage = queryParams['lang']; // Use square brackets
      if (selectedLanguage) {
        this.changeLanguage(selectedLanguage);
      } else {
        // Set a default language here if needed
        this.translate.setDefaultLang('en');
      }
      this.refreshDepList();
    });
  }

  addClick() {
    this.depart = {
      DepartmentId: "0",
      DepartmentName: ""
    }
    this.ModalTitle = "Add Department";
    this.ActivateAddEditDepartComp = true;
  }

  editClick(item: any) {
    this.depart = item;
    this.ModalTitle = "Edit Department";
    this.ActivateAddEditDepartComp = true;
  }

  deleteClick(item: any) {
    if (confirm('Are you sure??')) {
      this.service.deleteDepartment(item.DepartmentId).subscribe(data => {
        alert(data.toString());
        this.refreshDepList();
      })
    }
  }

  closeClick() {
    this.ActivateAddEditDepartComp = false;
    this.refreshDepList();
  }



  refreshDepList() {
    this.service.getDepartmentList().subscribe(data => {
      this.DepartmentListWithoutFilter = data;
  
      // Calculate the start and end indexes for the current page
      const startIndex = this.currentPage * this.pageSize;
      const endIndex = startIndex + this.pageSize;
  
      // Slice the data for the current page
      this.DepartmentList = this.DepartmentListWithoutFilter.slice(startIndex, endIndex);
  
      // Update the length of the paginator
      this.paginator.length = this.DepartmentListWithoutFilter.length;
    });
  }
  
  sortResult(prop: any, asc: any) {
    this.DepartmentList = this.DepartmentListWithoutFilter.sort(function (a: any, b: any) {
      if (asc) {
        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
      }
      else {
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      }
    });
  }

  FilterFn() {
    var DepartmentIdFilter = this.DepartmentIdFilter;
    var DepartmentNameFilter = this.DepartmentNameFilter;

    this.DepartmentList = this.DepartmentListWithoutFilter.filter(
      function (el: any) {
        return el.DepartmentId.toString().toLowerCase().includes(
          DepartmentIdFilter.toString().trim().toLowerCase()
        ) &&
          el.DepartmentName.toString().toLowerCase().includes(
            DepartmentNameFilter.toString().trim().toLowerCase())
      }
    );
  }

   // Function to change the language
   changeLanguage(language: string) {
    this.translate.use(language);
  }
}