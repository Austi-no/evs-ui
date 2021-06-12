import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  baseUrl: string = 'http://localhost:3000/evs-api/';
  constructor(private http: HttpClient) { }

  addPosition(value: any): any {
    return this.http.post(this.baseUrl + "addPosition", value)
  }

  getPositions(): any {
    return this.http.get(this.baseUrl + "getPositions")
  }

  getPositionByTitle(position: any): any {
    return this.http.get(this.baseUrl + "getCandidateByPosition?position=" + position, {})
  } position

  deletePosition(id: any): any {
    return this.http.delete(this.baseUrl + "deletePositionById/" + id)
  }

  addPriorityLevel(value: any): any {
    return this.http.post(this.baseUrl + "addPriority", value)
  }

  getPriorities(): any {
    return this.http.get(this.baseUrl + "getPriorities")
  }

  deletePriority(id: any): any {
    return this.http.delete(this.baseUrl + "deletePriority/" + id)
  }



}
