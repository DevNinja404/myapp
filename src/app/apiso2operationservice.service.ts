import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Apiso2operationserviceService {
  readonly apiUrl = 'http://localhost:51582/api/';
  readonly photoUrl = "http://localhost:50306/Photos/";

  constructor(private http: HttpClient) { }

  // SO2_Operation
  getSo2operationList(): Observable<any[]> {
    
    return this.http.get<any[]>(this.apiUrl + 'so2operation/GetSO2Operation');
  }

  addSO2_Operation(So2: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'so2operation/AddSO2Operation', So2, httpOptions);
  }

 
  UpdateSO2Operation(So2: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<any>(this.apiUrl + 'so2operation/UpdateSO2Operation/' + '?timestamp=' + new Date().getTime(), So2, httpOptions);
  }
  
  DeleteSO2Operation(So2Id: number): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>(this.apiUrl + 'so2operation/DeleteSO2Operation/' + So2Id, httpOptions);
  }

  
  uploadPhoto(photo: any) {
    return this.http.post(this.apiUrl + 'employee/savefile', photo);
  }
}