import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ForgotPasswordService } from '../../services/user/forgotPassword.service.client';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/user/profile.service.client';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  @ViewChild('f') forgotForm: NgForm;

  //properties
  successFlag: boolean;
  errorFlag: boolean;
  successMsg: string;
  errorMsg: string;

  constructor(private forgotPasswordService: ForgotPasswordService, private router: Router, private profileService: ProfileService) { }

  ngOnInit() {
    // Calculate height
    var windowHeight = window.innerHeight;
    var footerHeight = document.getElementById('footer').clientHeight;
    var totalHeight = windowHeight - footerHeight;

    document.getElementById("forgot-password-page").setAttribute('style', 'min-height: ' + totalHeight + 'px');
    
    // get current user 
    this.profileService.currentUser()
      .subscribe((user) => {
        if(user) {
          this.router.navigate(['']);
        }
      }, (err) => {
        console.log(err);
      });
  }

  // send email to reset password
  sendEmail() {
    let email = this.forgotForm.value.email;
    this.forgotPasswordService.forgotPassword(email)
      .subscribe((response) => {
        // mail sent
        if(response == 'Mail sent') {
          this.successFlag = true;
          this.successMsg = "Reset password mail sent successfully";
          setTimeout(() => {
            this.successFlag = false;
            this.successMsg = "";
          }, 2500);
        }
      }, (error) => {
        // If email address does not exist
        if(error._body === '"Not found"') {
          this.errorFlag = true;
          this.errorMsg = "Email Address does not exist.";
          setTimeout(() => {
            this.errorFlag = false;
            this.errorMsg = "";
          }, 2500);
          // if email is not authorized
        } else if(error._body === '"NA"') {
          this.errorFlag = true;
          this.errorMsg = "Email Address is not authorized for resetting password.";
          setTimeout(() => {
            this.errorFlag = false;
            this.errorMsg = "";
          }, 2500);
        } else {
          // mail not sent
          this.errorFlag = true;
          this.errorMsg = "Password reset email not sent successfully.";
          setTimeout(() => {
            this.errorFlag = false;
            this.errorMsg = "";
          }, 2500);
        }
      });
  }

}
