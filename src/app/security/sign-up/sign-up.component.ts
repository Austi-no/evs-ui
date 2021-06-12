import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../helpers/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PasswordMatchValidator } from '../helpers/password-match.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  submitted: boolean
  signupForm: FormGroup
  success: boolean
  facultyList: any = [];

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      matNo: ['', Validators.required],
      phone: ['', Validators.required],
      faculty: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    },
      { validator: PasswordMatchValidator('password', 'confirmPassword') }
    );


    this.authService.getFaculties().subscribe((res: any) => {
      this.facultyList = res
      console.log(this.facultyList);

    })


  }

  createAccount() {
    this.submitted = true;
    console.log(this.signupForm.value);
    // stop here if form is invalid
    if (this.signupForm.invalid) {
      this.submitted = false;
      this.toastr.error('', 'Invalid Fields');

      return;
    }
    var matno = this.signupForm.value.matNo;
    var email = this.signupForm.value.email;

    var formattedMatNo = matno.toUpperCase().trim()
    var formattedEmail = email.toLowerCase().trim()

    this.signupForm.get('matNo').setValue(formattedMatNo)
    this.signupForm.get('email').setValue(formattedEmail)
    this.authService.createAccount(this.signupForm.value).subscribe(
      (res: any) => {
        this.submitted = false;
        console.log(res);
        if (res.success == true) {
          this.success = true
          this.toastr.success('success ', res.message);
          this.signupForm.reset()
        } else {
          this.toastr.error(' Failed ', res.message);
        }
      },
      (error) => {
        this.submitted = false;
        this.toastr.error(' error ', error.error);
        console.log(error);
      }
    );
  }

}

