import { FacultyComponent } from './faculty/faculty.component';
import { ManageRolesComponent } from './manage-roles/manage-roles.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'manage-users', component: ManageUserComponent },
  { path: 'manage-roles', component: ManageRolesComponent },
  { path: 'faculty', component: FacultyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
