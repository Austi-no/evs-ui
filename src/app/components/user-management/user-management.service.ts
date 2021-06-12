import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  baseUrl: string = 'http://localhost:3000/evs-api/';

  constructor(private http: HttpClient) { }

  addRole(value: any): any {
    return this.http.post(this.baseUrl + "createRole", value)
  }
  getRoles(): any {
    return this.http.get(this.baseUrl + "getRoles")
  }

  deleRoleById(id: any): any {
    return this.http.delete(this.baseUrl + "deleteRoleById/" + id)
  }

  getUsers(): any {
    return this.http.get(this.baseUrl + "getUsers")
  }

  deleteUser(id: any): any {
    return this.http.delete(this.baseUrl + "deleteUserById/" + id)
  }

  addFaculty(value: any): any {
    return this.http.post(this.baseUrl + "addFaculty", value)
  }
  getFaculties(): any {
    return this.http.get(this.baseUrl + "getFaculties")
  }
  deleteFacultyById(id: any): any {
    return this.http.delete(this.baseUrl + "deleteFacultyById/" + id)
  }

}
