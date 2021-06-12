import { VoteService } from './vote.service';
import { CandidateService } from './../candidate/candidate.service';
import { PositionService } from './../position/position.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {
  loggedInUser: any = JSON.parse(sessionStorage.getItem('loggedInUser'));
  positionList: any = [];
  selectedPosition: any = "Select Select Position"
  selectedPositionCandidate: any = [];
  candidates: any = [];

  constructor(private positionService: PositionService, private toastr: ToastrService, private candidateService: CandidateService, private voteService: VoteService) { }

  ngOnInit() {
    this.getPosition()
    this.getCandidates()
  }

  getPosition() {
    this.positionService.getPositions().subscribe(res => {
      // console.log(res);
      this.positionList = res
    })
  }

  getCandidates() {
    this.candidateService.getCandidates().subscribe(res => {
      // console.log(res);
      this.candidates = res
    })
  }

  selectPosition() {
    this.positionService.getPositionByTitle(this.selectedPosition).subscribe(res => {
      console.log(res);
      this.selectedPositionCandidate = res

    })
  }


  vote(list: any) {
    const body = {
      candidate: list.id,
      user: this.loggedInUser.id
    }
    console.log(body);

    this.voteService.castVote(body).subscribe(res => {
      console.log(res);
      if (res.success == true) {
        this.toastr.success("", res.message)
      } else {
        this.toastr.error("", res.message)
      }

    },
      error => {
        this.toastr.error("", error.error)
      }
    )

  }
}
