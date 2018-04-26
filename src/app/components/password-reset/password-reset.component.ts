import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ResetService } from '../../services/user/reset.service.client';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../../services/user/profile.service.client';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  @ViewChild('f') resetForm: NgForm;

  //properties
  errorFlag: boolean;
  successFlag: boolean;
  errorMsg: string;
  successMsg: string = "Reset password done successfully.";
  token: string;

  constructor(private resetService: ResetService, private activatedRoute: ActivatedRoute, private router: Router, private profileService: ProfileService) { }

  ngOnInit() {
    // Calculate height
    var windowHeight = window.innerHeight;
    var footerHeight = document.getElementById('footer').clientHeight;
    var totalHeight = windowHeight - footerHeight;

    document.getElementById("reset-password-page").setAttribute('style', 'min-height: ' + totalHeight + 'px');

    // Get token from url
    this.activatedRoute.params.subscribe(
      params => {
        this.token = params['token'];
      });
    
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

  //reset password
  resetPwd() {
    let newPassword = this.resetForm.value.newPassword;
    let verifyNewPassword = this.resetForm.value.verifyNewPassword;
    let data = {
      newPassword: newPassword,
      verifyNewPassword: verifyNewPassword
    };
    // if new password is not same as verify password
    if(newPassword !== verifyNewPassword) {
      this.errorFlag = true;
      this.errorMsg = "New password and verify new password does not match.";
      setTimeout(() => {
        this.errorFlag = false;
        this.errorMsg = "";
      }, 2500);
    } else {
      this.resetService.resetPwd(data, this.token).
        subscribe((response) => {
          //password changed
          if(response) {
            this.successFlag = true;
            this.successMsg = "Password changed successfully.";
            setTimeout(() => {
              this.successFlag = false;
              this.successMsg = "";
              this.router.navigate(['/login']);
            }, 2500);
          }
        }, (error) => {
          //invalid token or expired token
          if(error) {
            this.errorFlag = true;
            this.errorMsg = "Token is invalid or token has expired";
            setTimeout(() => {
              this.errorFlag = false;
              this.errorMsg = "";
            }, 2500);
          }
        });      
    }
  }

}
