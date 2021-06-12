import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserManagementService } from './../user-management.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-roles',
  templateUrl: './manage-roles.component.html',
  styleUrls: ['./manage-roles.component.css']
})
export class ManageRolesComponent implements OnInit {
  roleForm: FormGroup
  roleList: any = [];
  constructor(private service: UserManagementService, private toastr: ToastrService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.roleForm = this.formBuilder.group({
      name: ['', Validators.required]
    })
    this.getRoles()
  }

  addRole() {
    this.service.addRole(this.roleForm.value).subscribe((res: any) => {
      if (res.success == true) {
        this.toastr.success(res.message)
        this.getRoles()
        this.roleForm.reset()
      } else {
        this.toastr.error(res.message)
      }
    }, error => {
      this.toastr.error(error.error.message)

    })

  }
  getRoles() {
    this.service.getRoles().subscribe(res => {
      this.roleList = res

    })
  }

  deleteById(id) {
    this.service.deleRoleById(id).subscribe((res: any) => {
      if (res.success === true) {
        this.toastr.success(res.message)
        this.getRoles()
      }
      else {
        this.toastr.error(res.message)
      }

    }, error => {
      this.toastr.error(error.error.message)

    })

  }
}
