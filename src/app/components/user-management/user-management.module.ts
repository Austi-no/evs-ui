import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { ManageRolesComponent } from './manage-roles/manage-roles.component';
import { FacultyComponent } from './faculty/faculty.component';



@NgModule({
  declarations: [
    ManageUserComponent,
    ManageRolesComponent,
    FacultyComponent
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    UserManagementRoutingModule
  ]
})
export class UserManagementModule { }
