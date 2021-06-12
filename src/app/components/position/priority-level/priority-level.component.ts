import { PositionService } from './../position.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-priority-level',
  templateUrl: './priority-level.component.html',
  styleUrls: ['./priority-level.component.css']
})
export class PriorityLevelComponent implements OnInit {

  form: FormGroup
  priorities: any = [];
  constructor(private service: PositionService, private toastr: ToastrService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      priorityLevel: ['', Validators.required]
    })
    this.getPriorities()
  }

  addPriorityLevel() {
    this.service.addPriorityLevel(this.form.value).subscribe((res: any) => {
      if (res.success == true) {
        this.toastr.success(res.message)
        this.getPriorities()
        this.form.reset()
      } else {
        this.toastr.error(res.message)
      }
    }, error => {
      this.toastr.error(error.error.message)

    })

  }


  getPriorities() {
    this.service.getPriorities().subscribe(res => {
      this.priorities = res
      // console.log(res);

    })
  }

  deleteById(id) {
    this.service.deletePriority(id).subscribe((res: any) => {
      if (res.success === true) {
        this.toastr.success(res.message)
        this.getPriorities()
      }
      else {
        this.toastr.error(res.message)
      }

    }, error => {
      this.toastr.error(error.error.message)

    })

  }
}
