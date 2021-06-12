import { UserManagementService } from './../../components/user-management/user-management.service';
import { CandidateService } from './../../components/candidate/candidate.service';
import { AuthService } from './../../security/helpers/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { ScriptService } from '../script.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  listOfUsers: any = [];
  candidateList: any = [];




  constructor(private userManagementService: UserManagementService, private candidateService: CandidateService) {

  }

  ngOnInit() {
    this.getListOfUsers()
    this.getCandidates()

  }

  getListOfUsers(): any {
    this.userManagementService.getUsers().subscribe(
      (res) => {
        this.listOfUsers = res;

      },
      (error: any) => {
        console.log(error)
      }
    );
  }
  totalUsers(): any {
    return this.listOfUsers?.length;
  }

  getCandidates() {
    this.candidateService.getCandidates().subscribe(res => {
      // console.log(res);
      this.candidateList = res
    })
  }

  totalCandidate(): any {
    return this.candidateList?.length;
  }



}
