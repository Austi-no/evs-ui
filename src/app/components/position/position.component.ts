
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PositionService } from './position.service';


@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {

  form: FormGroup
  positionList: any = [];
  priorities: any = [];

  constructor(private service: PositionService, private toastr: ToastrService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priorityLevel: ['Select Priority Level', Validators.required],
    })
    this.getPositions()
    this.getPriorities()
  }

  addPosition() {
    this.service.addPosition(this.form.value).subscribe((res: any) => {
      if (res.success == true) {
        this.toastr.success(res.message)
        this.getPositions()
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
      // console.log(res);


    })
  }

  getPriorities() {
    this.service.getPriorities().subscribe(res => {
      this.priorities = res
    })
  }

  deleteById(id) {
    this.service.deletePosition(id).subscribe((res: any) => {
      if (res.success === true) {
        this.toastr.success(res.message)
        this.getPositions()
      }
      else {
        this.toastr.error(res.message)
      }

    }, error => {
      this.toastr.error(error.error.message)

    })

  }
}
