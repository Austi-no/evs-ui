import { CandidateService } from './candidate.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PositionService } from '../position/position.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare const uploadImage;
@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {

  matNo: any
  form: FormGroup
  positionList: any = [];
  userData: any;
  candidateList: any = [];
  foundUser: boolean

  constructor(private service: PositionService, private spinner: NgxSpinnerService, private services: CandidateService, private toastr: ToastrService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    uploadImage()
    this.form = this.formBuilder.group({
      manifesto: ['', Validators.required],
      user: ['', Validators.required],
      position: ['', Validators.required],
    })
    this.getPositions();
    this.getCandidates()
  }

  searchCandidate() {
    this.spinner.show()
    this.services.getUserByMatNo(this.matNo).subscribe((res: any) => {

      if (res.success == true) {
        this.foundUser = true
        this.toastr.success(res.message);
        this.matNo = ""
        this.spinner.hide()
        this.userData = res.data
        // console.log(this.userData);
      } else {
        this.toastr.error(res.message)
        this.spinner.hide()
      }

    })

  }

  addCandidate() {
    var user = this.userData?.id;
    var position = this.form.value.position;

    this.form.get('user').setValue(user)
    this.form.get('position').setValue(position)

    this.services.addCandidate(this.form.value).subscribe((res: any) => {
      // console.log(res);

      if (res.success == true) {
        this.toastr.success(res.message)
        this.foundUser = false
        this.getCandidates()
        this.form.reset()
      } else {
        this.toastr.error(res.message)
      }
    }, error => {
      this.toastr.error(error.error.message)

    })

  }
  getPositions() {
    this.service.getPositions().subscribe(res => {
      this.positionList = res

    })
  }
  getCandidates() {
    this.services.getCandidates().subscribe(res => {
      this.candidateList = res
      // console.log(res);

    })
  }

  deleteById(id) {
    this.services.deleteCandidate(id).subscribe((res: any) => {
      if (res.success === true) {
        this.toastr.success(res.message)
        this.getCandidates()
      }
      else {
        this.toastr.error(res.message)
      }

    }, error => {
      this.toastr.error(error.error.message)

    })

  }

}
