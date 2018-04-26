import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/user/register.service.client';
import { SharedService } from '../../services/sharedService/shared.service.client';
import { ProfileService } from '../../services/user/profile.service.client';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm;

  //properties
  env: boolean = environment.production;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  verifyPassword: string;
  errorFlag: boolean;
  successFlag: boolean;
  errorMsg: string;
  successMsg: string;

  constructor(private registerService: RegisterService, private router: Router, private sharedService: SharedService, private profileService: ProfileService) { }

  ngOnInit() {
    // Calculate height
    var windowHeight = window.innerHeight;
    var footerHeight = document.getElementById('footer').clientHeight;
    var totalHeight = windowHeight - footerHeight;

    document.getElementById("register-page").setAttribute('style', 'min-height: ' + totalHeight + 'px');

    // Get current user
    this.profileService.currentUser()
      .subscribe((user) => {
        if(user) {
          this.router.navigate(['']);
        }
      }, (err) => {
        console.log(err);
      });
  }

  //register user
  registerUser() {
    this.firstName = this.signupForm.value.firstName;
    this.lastName = this.signupForm.value.lastName;
    this.userName = this.signupForm.value.userName;
    this.email = this.signupForm.value.email;
    this.password = this.signupForm.value.password;
    this.verifyPassword = this.signupForm.value.verifyPassword;
    // if passwords do not match
    if(this.password !== this.verifyPassword) {
      this.errorFlag = true;
      this.errorMsg = "Passwords do not match";
      setTimeout (() => {
        this.errorFlag = false;
        this.errorMsg = "";
      }, 2500);
      return true;
    }

    let user = {
      firstName: this.firstName,
      lastName: this.lastName,
      userName: this.userName,
      email: this.email,
      password: this.password
    };
    // add user
    this.registerService.registerUser(user)
      .subscribe((user) => {
        console.log(user);
        this.sharedService.user = user;
        this.router.navigate(['/profile']);
      }, (error) => {
        console.log(error);
        this.errorFlag = true;
        this.errorMsg = error._body;
        setTimeout(() => {
          this.errorFlag = false;
          this.errorMsg = "";
        }, 2500);
      });
  }

}
