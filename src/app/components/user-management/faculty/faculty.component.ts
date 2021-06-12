import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserManagementService } from '../user-management.service';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {

  form: FormGroup
  faculties: any = [];

  constructor(private service: UserManagementService, private toastr: ToastrService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required]
    })
    this.getFaculties()
  }

  addFaculty() {
    this.service.addFaculty(this.form.value).subscribe((res: any) => {
      if (res.success == true) {
        this.toastr.success(res.message)
        this.getFaculties()
        this.form.reset()
      } else {
        this.toastr.error(res.message)
      }
    }, error => {
      this.toastr.error(error.error.message)

    })

  }
  getFaculties() {
    this.service.getFaculties().subscribe(res => {
      this.faculties = res

    })
  }

  deleteById(id) {
    this.service.deleteFacultyById(id).subscribe((res: any) => {
      if (res.success === true) {
        this.toastr.success(res.message)
        this.getFaculties()
      }
      else {
        this.toastr.error(res.message)
      }

    }, error => {
      this.toastr.error(error.error.message)

    })

  }
}
