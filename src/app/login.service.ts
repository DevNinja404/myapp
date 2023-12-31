import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
 // private apiUrl = 'http://192.168.100.93:86/api/'; // Replace with your API endpoint For IIS
  private apiUrl = 'http://localhost:51582/api/';

  isAuthenticated: boolean = false;

  constructor(private http: HttpClient) {}
 
  Login(model: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'Auth/login', model, httpOptions);
  }

  // You can add methods for handling token storage, user session, and logout here
}
