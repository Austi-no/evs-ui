import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  baseUrl: string = 'http://localhost:3000/evs-api/';

  constructor(private http: HttpClient) { }

  getFaculties(): any {
    return this.http.get(this.baseUrl + "getFaculties")
  }

  createAccount(value: any) {
    return this.http.post(this.baseUrl + "createUser", value)
  }

  login(value: any) {
    return this.http.post(this.baseUrl + "login", value)
  }

}
