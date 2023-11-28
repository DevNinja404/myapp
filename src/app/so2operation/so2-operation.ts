// so2-operation.ts

export interface So2Operation {
    Id: string;
    DaySO2Hrs: string;
    DaySO2Water: string;
    CumSO2Hrs: string;
    CumSO2Water: string;
    Remarks: string;
    // CreatedDate: string;
    CreatedDate: Date; // Modify 
  }
  