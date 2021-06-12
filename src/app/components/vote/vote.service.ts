import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  baseUrl: string = 'http://localhost:3000/evs-api/';
  constructor(private http: HttpClient) { }

  castVote(value: any): any {
    return this.http.post(this.baseUrl + "addVote", value)
  }

  getVotes(): any {
    return this.http.get(this.baseUrl + "getPositions")
  }

  deleteVote(id: any): any {
    return this.http.delete(this.baseUrl + "deletePositionById/" + id)
  }
}
