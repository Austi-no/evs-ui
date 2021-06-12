import { VoteComponent } from './components/vote/vote.component';
import { PriorityLevelComponent } from './components/position/priority-level/priority-level.component';
import { CandidateComponent } from './components/candidate/candidate.component';

import { AuthGuard } from './security/helpers/auth.guard';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { SignUpComponent } from './security/sign-up/sign-up.component';
import { LoginComponent } from './security/login/login.component';
import { HomeComponent } from './layout/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PositionComponent } from './components/position/position.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },

  {
    path: 'home', component: HomeComponent,
    children: [
      { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'user-management', loadChildren: () => import('./components/user-management/user-management.module').then(m => m.UserManagementModule) },
      { path: 'position', component: PositionComponent, canActivate: [AuthGuard] },
      { path: 'priority-level', component: PriorityLevelComponent, canActivate: [AuthGuard] },
      { path: 'candidate', component: CandidateComponent, canActivate: [AuthGuard] },
      { path: 'cast-vote', component: VoteComponent, canActivate: [AuthGuard] },

    ],

  },

];

@NgModule({
  imports: [
    // RouterModule.forRoot(routes)
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
