import { StorageService } from './../../providers/storage-service';
import { AuthService } from './../../providers/auth.service';
import { CitizenService } from './../../providers/citizen-service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { CreateAccount } from '../../interfaces/create-account';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage {
  signin: CreateAccount = {cin: 0, firstName: '', lastName: '', dob: '', email: '', password: ''};
  submitted = false;
  errorMsg = '';

  constructor(
    public router: Router,
    public userData: UserData,
    public citizenService: CitizenService,
    public authService: AuthService,
    public storageService: StorageService
  ) {}

  onSignup(form: NgForm) {
    this.submitted = true;
    this.errorMsg = '';

    if (form.valid) {
      this.citizenService.createCitizen(this.signin)
        .subscribe(
          (response) => {
            console.log('Création du compte reuissi');

            this.authService.login(this.signin.email, this.signin.password)
            .subscribe(
              (res) => {
                let token = res.headers.get('Authorization');
                this.storageService.set('token', token).then(
                  result => {
                    this.authService.isAuth = true;
                    console.log('Login reuissi');
                    this.router.navigateByUrl('/app/tabs/schedule');
                  }
                  ).catch(e => {
                    console.log("erreur storage: " + e);
                  }
                );
              },
              (error: HttpErrorResponse) => {
                console.log("erreur http login:" + error);
              }
            );
          },
          (error: any) => {
            this.errorMsg = error.error.msg;
            console.log("erreur http inscription:" + JSON.stringify(error) );
          }
        );
    }
  }
}
