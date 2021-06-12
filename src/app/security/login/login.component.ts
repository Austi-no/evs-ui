import { Router } from '@angular/router';
import { SessionService } from './../helpers/session.service';
import { AuthService } from './../helpers/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted: boolean
  loginForm: FormGroup
  constructor(private formBuilder: FormBuilder, private router: Router, private toastr: ToastrService, private authService: AuthService, private sessionService: SessionService) { }

  ngOnInit() {
    sessionStorage.clear()
    this.loginForm = this.formBuilder.group({
      matNo: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  login() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.submitted = false;
      this.toastr.error("Invalid Details")
      return;
    }

    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe((res: any) => {
      // console.log(res);


      if (res.success == true && res.success === true) {
        console.log(res);
        this.submitted = false;
        this.toastr.success("", res.message)

        this.sessionService.setToken(res.token)
        this.sessionService.setUser(res.user)
        this.sessionService.setUserRole(res.user.role);

        this.router.navigate(['home']);

      } else {
        this.submitted = false;
        this.toastr.error("", res.message)
      }
    }, error => {
      this.submitted = false;
      this.toastr.error("Error!", error.error.message)
    })

  }

}
