import { Component, OnInit, Input } from '@angular/core';
import { Apiso2operationserviceService } from 'src/app/apiso2operationservice.service';


@Component({
  selector: 'app-add-edit-so2operation',
  templateUrl: './add-edit-so2operation.component.html',
  styleUrls: ['./add-edit-so2operation.component.css']
})
export class AddEditSo2operationComponent implements OnInit {
  constructor(private service: Apiso2operationserviceService) { }
  @Input() So2: any;
  Id = "";
  DaySO2Hrs = "";
  DaySO2Water = "";
  CumSO2Hrs = "";
  CumSO2Water = "";
  Remarks = ""; 

  ngOnInit(): void {

    this.Id = this.So2.Id;
    this.DaySO2Hrs = this.So2.DaySO2Hrs;
    this.DaySO2Water = this.So2.DaySO2Water;
    this.CumSO2Hrs = this.So2.CumSO2Hrs;
    this.CumSO2Water = this.So2.CumSO2Water;
    this.Remarks = this.So2.Remarks;  
  }

  addSO2Operation() {
    var So2 = {
      Id: this.Id,
      DaySO2Hrs: this.DaySO2Hrs,
      DaySO2Water: this.DaySO2Water,
      CumSO2Hrs : this.CumSO2Hrs,
      CumSO2Water: this.CumSO2Water,
      Remarks : this.Remarks
    };
    this.service.addSO2_Operation(So2).subscribe(
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

  UpdateSO2Operation() {
    var So2 = {
      Id: this.Id,
      DaySO2Hrs: this.DaySO2Hrs,
      DaySO2Water: this.DaySO2Water,
      CumSO2Hrs: this.CumSO2Hrs,
      CumSO2Water: this.CumSO2Water,
      Remarks: this.Remarks,
    };
    this.service.UpdateSO2Operation(So2).subscribe(
      (res) => {
        if (res === "Updated Successfully") {
          alert("Updated Successfully");
        } else {
          alert("Something Went Wrong");
          console.log("Update failed. Response:", res); // Log the response for debugging
        }
      },
      (error) => {
        alert("Error occurred: " + error);
      }
    );
  }
  

}
