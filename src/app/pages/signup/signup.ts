import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { CreateAccount } from '../../interfaces/create-account';



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage {
  signin: CreateAccount = {cin: 0, firstName: '', lastName: '', dob: '', email: '', password: ''};
  submitted = false;

  constructor(
    public router: Router,
    public userData: UserData
  ) {}

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.signin(
        this.signin.cin,this.signin.firstName,this.signin.lastName,
        this.signin.dob,this.signin.email,this.signin.password);
      this.router.navigateByUrl('/app/tabs/schedule');
    }
  }
}
