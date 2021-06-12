
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './layout/home/home.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { LoginComponent } from './security/login/login.component';
import { SignUpComponent } from './security/sign-up/sign-up.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from './security/helpers/auth.interceptor';
import { PositionComponent } from './components/position/position.component';
import { CandidateComponent } from './components/candidate/candidate.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PriorityLevelComponent } from './components/position/priority-level/priority-level.component';
import { VoteComponent } from './components/vote/vote.component';
import { ViewBallotComponent } from './components/vote/view-ballot/view-ballot.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    HomeComponent,
    DashboardComponent,
    LoginComponent,
    SignUpComponent,
    PositionComponent,
    CandidateComponent,
    PriorityLevelComponent,
    VoteComponent,
    ViewBallotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbPaginationModule,
    ToastrModule.forRoot(), // ToastrModule added
    NgxSpinnerModule

  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
