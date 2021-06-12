import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  baseUrl: string = 'http://localhost:3000/evs-api/';
  constructor(private http: HttpClient) { }

  getUserByMatNo(matNo: any) {
    return this.http.get(this.baseUrl + "getuserByMatNo?matNo=" + matNo, {})
  }

  addCandidate(value: any): any {
    return this.http.post(this.baseUrl + "addCandidate", value)
  }

  getCandidates(): any {
    return this.http.get(this.baseUrl + "getCandidates")
  }

  deleteCandidate(id: any): any {
    return this.http.delete(this.baseUrl + "deleteCandidateById/" + id)
  }
}
