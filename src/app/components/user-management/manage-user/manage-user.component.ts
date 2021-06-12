import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserManagementService } from '../user-management.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  roleForm: FormGroup
  userList: any = [];
  constructor(private service: UserManagementService, private toastr: ToastrService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.roleForm = this.formBuilder.group({
      name: ['', Validators.required]
    })
    this.getUsers()
  }


  getUsers() {
    this.service.getUsers().subscribe(res => {
      this.userList = res


    })
  }

  deleteById(id) {
    this.service.deleteUser(id).subscribe((res: any) => {
      if (res.success === true) {
        this.toastr.success(res.message)
        this.getUsers()
      }
      else {
        this.toastr.error(res.message)
      }

    }, error => {
      this.toastr.error(error.error.message)

    })

  }
}
