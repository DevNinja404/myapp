import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-add-edit-department',
  templateUrl: './add-edit-department.component.html',
  styleUrls: ['./add-edit-department.component.css']
})
export class AddEditDepartmentComponent implements OnInit {

  constructor(private service: ApiserviceService) { }

  @Input() depart: any;
  DepartmentId = "";
  DepartmentName = "";

  ngOnInit(): void {

    this.DepartmentId = this.depart.DepartmentId;
    this.DepartmentName = this.depart.DepartmentName;
  }

  addDepartment() {
    var dept = {
      DepartmentId: this.DepartmentId,
      DepartmentName: this.DepartmentName
    };
    this.service.addDepartment(dept).subscribe(
      (res: any) => {
        if (res === "Added Successfully") {
          alert("Added Successfully");
        } else {
          alert("Something Went Wrong");
        }
      },
      (error) => {
        alert("Error occurred: " + error);
      }
    );
  }

  updateDepartment() {
    var dept = {
      DepartmentId: this.DepartmentId,
      DepartmentName: this.DepartmentName
    };
    this.service.updateDepartment(dept).subscribe(res => {
      if (res === "Updated Successfully") {
        alert("Updated Successfully");
      } else {
        alert("Something Went Wrong");
      }
    },
    (error) => {
      alert("Error occurred: " + error);
    }
  );
}
}