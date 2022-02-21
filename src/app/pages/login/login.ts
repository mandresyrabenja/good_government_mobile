import { StorageService } from './../../providers/storage-service';
import { AuthService } from './../../providers/auth.service';
import { CreateAccount } from './../../interfaces/create-account';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { Storage } from '@ionic/storage';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  login: UserOptions = { username: '', password: '' };
  submitted = false;

  constructor(
    public userData: UserData,
    public router: Router,
    public authService: AuthService,
    public storageService : StorageService
  ) { }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.authService.login(this.login.username, this.login.password)
      .subscribe(
        (response) => {
          let token = response.headers.get('Authorization');
          this.storageService.set('token', token).then(
            result => {
              this.authService.isAuth = true;
              console.log('Login reuissi');
              this.router.navigateByUrl('/app/tabs/schedule');
            }
            ).catch(e => {
              console.log("error: " + e);
            }
          );
        },
        (error: HttpErrorResponse) => {
          console.log("erreur http:" + error);
        }
      );
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }
}
