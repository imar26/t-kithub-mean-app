import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../services/user/login.service.client';
import { SharedService } from '../../services/sharedService/shared.service.client';
import { ProfileService } from '../../services/user/profile.service.client';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;

  //properties
  env: boolean = environment.production;
  userName: string;
  password: string;
  errorFlag: boolean;
  errorMsg: string;
  successFlag: boolean;
  successMsg: string;

  constructor(private router: Router, private loginService: LoginService, private sharedService: SharedService, private profileService: ProfileService) { }

  ngOnInit() {
    // Calculate height
    var windowHeight = window.innerHeight;
    var footerHeight = document.getElementById('footer').clientHeight;
    var totalHeight = windowHeight - footerHeight;

    document.getElementById("login-page").setAttribute('style', 'min-height: ' + totalHeight + 'px');

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

  //login user
  login() {
    this.userName = this.loginForm.value.userName;
    this.password = this.loginForm.value.password;

    this.loginService.login(this.userName, this.password)
      .subscribe((user) => {
        //user not found
        if(user === 'User not found') {
          this.errorFlag = true;
          this.errorMsg = user;
          setTimeout(() => {
            this.errorFlag = false;
            this.errorMsg = "";
          }, 2500);
          //invalid credentials
        } else if(user === 'Invalid Credentials') {
          this.errorFlag = true;
          this.errorMsg = user;
          setTimeout(() => {
            this.errorFlag = false;
            this.errorMsg = "";
          }, 2500);
        } else {
          //user loggedin
          this.sharedService.user = user;
          if(user.roles === "USER") {
            this.router.navigate(['/profile']);
          } else {
            this.router.navigate(['/users']);
          }
        }        
      });
  }

}
