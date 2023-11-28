import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Apiso2operationserviceService {
   // private apiUrl = 'http://192.168.100.93:86/api/'; // Replace with your API endpoint For IIS
   private apiUrl = 'http://localhost:51582/api/';
  readonly photoUrl = "http://localhost:86/Photos/";

  constructor(private http: HttpClient) { }

  // SO2_Operation
  // getSo2operationList(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl + 'so2operation/GetSO2Operation')
  //     .pipe(catchError(this.handleError));
  // }

  getSo2operationList(createdDate?: Date): Observable<any[]> {
    // Check if createdDate is a valid Date object
    const dateParam =
      createdDate instanceof Date && !isNaN(createdDate.getTime())
        ? `&createdDate=${createdDate.toISOString()}`
        : '';
  
    const apiUrl = createdDate
      ? `${this.apiUrl}so2operation/GetSO2Operation?createdDate=${dateParam}`
      : `${this.apiUrl}so2operation/GetSO2Operation`;
  
    return this.http.get<any[]>(apiUrl).pipe(catchError(this.handleError));
  }
  
  

  // getSo2operationList(page: number, pageSize: number): Observable<any[]> {
  //   const url = `${this.apiUrl}/GetSO2Operation?page=${page}&pageSize=${pageSize}`;
  //   return this.http.get<any[]>(url);
  // }

  addSO2_Operation(So2: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'so2operation/AddSO2Operation', So2, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  UpdateSO2Operation(So2: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<any>(this.apiUrl + 'so2operation/UpdateSO2Operation/' + '?timestamp=' + new Date().getTime(), So2, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  DeleteSO2Operation(So2Id: number): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>(this.apiUrl + 'so2operation/DeleteSO2Operation/' + So2Id, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  uploadPhoto(photo: any): Observable<any> {
    return this.http.post(this.apiUrl + 'employee/savefile', photo)
      .pipe(
        catchError(this.handleError)
      );
  }
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurred.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}