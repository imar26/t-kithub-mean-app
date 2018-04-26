import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../../services/sharedService/shared.service.client';
import { ProfileService } from '../../services/user/profile.service.client';
import { ChangePasswordService } from '../../services/user/changePassword.service.client';
import { NgForm } from '@angular/forms';
import { ListUsersService } from '../../services/user/listUsers.service.client';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order/order.service.client';
import { EventService } from '../../services/events/events.service.client';
import * as jsPDF from 'jspdf'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild('f') profileForm: NgForm;
  @ViewChild('g') changePasswordForm: NgForm;
  //properties
  errorFlag: boolean;
  orderFlag: boolean;
  successFlag: boolean;
  errorMsg: string;
  orderMsg: string;
  successMsg: string = "User details updated successfully";
  user: any;
  data: any;
  orders: Array<any> = [];
  orderHistory: any;
  eventInfo: any;
  cannotChangePwd: boolean;

  constructor(private sharedService: SharedService, private profileService: ProfileService, private changePasswordService: ChangePasswordService, private listUsersService: ListUsersService, private router: Router, private orderService: OrderService, private eventService: EventService) { }

  ngOnInit() {
    // Calculate height
    var windowHeight = window.innerHeight;
    var footerHeight = document.getElementById('footer').clientHeight;
    var totalHeight = windowHeight - footerHeight;

    document.getElementById("profile-page").setAttribute('style', 'min-height: ' + totalHeight + 'px');

    this.loadUserData();

    // check if role is admin
    this.listUsersService.isUserRoleAdmin()
      .subscribe((status) => {
        if (status) {
          this.router.navigate(['']);
        }
      });
    
    // get user's order history
    this.orderService.getOrdersByUserId()
      .subscribe((user) => {
        if(user.orders.length > 0) {
          for(let i=0; i<user.orders.length; i++) {
            this.orderService.getOrderDetails(user.orders[i])
              .subscribe((detail) => {
                this.orders.push(detail);              
                this.eventService.getEventDetails(detail.eventId)
                  .subscribe((event) => {
                    this.orders[i] = Object.assign(this.orders[i],event);
                    console.log(this.orders[i]);
                  }, (err) => {
                    console.log(err);
                  });
              }, (error) => {
                console.log(error);
              });
          }
        } else {
          this.orderFlag = true;
          this.orderMsg = "No orders available";
        }
      }, (err) => {
        console.log(err);
      });
  }

  //download PDF copy of ticket
  downloadPdfData(order) {
    var doc = new jsPDF();
    var j = 20;
    console.log(Array.of(order));
    doc.setFontType("italic");
    doc.text(20, 14, "Ticket details");
    doc.text(20, 19, "\n");
    doc.text(20, 20,"---------------------------");
    doc.text(20, 22,"\n");
    doc.text(20, 25, "Event Name: ");
    doc.text(20, 30, order.name);
    doc.text(20, 35, "\n");
    doc.text(20, 40, "Location: ");
    doc.text(20, 45, order._embedded.venues[0].name + "," + order._embedded.venues[0].city.name);
    doc.text(20, 50, "\n");
    doc.text(20, 55, "Date");
    doc.text(20, 60, order.dates.start.localDate);
    doc.text(20, 65, "\n");
    doc.text(20, 70, "Time");
    doc.text(20, 75, order.dates.start.localTime);
    doc.text(20, 80, "\n");
    doc.text(20, 85, "Package Type");
    doc.text(20, 90, order.data.packageType);
    doc.text(20, 95, "\n");
    doc.text(20, 100, "Number of tickets");
    doc.text(20, 105, order.data.noTickets);
    doc.text(20, 110, "\n");
    doc.text(20, 115, "Total Price");
    doc.text(20, 120, "$" + order.data.total);
    doc.save('Ticket.pdf');
  }

  // load user details
  loadUserData() {
    this.profileService.currentUser()
      .subscribe((user) => {
        if (user.google || user.facebook) {
          this.cannotChangePwd = false;
        } else {
          this.cannotChangePwd = true;
        }
        this.user = user;
        this.sharedService.user = this.user;
      }, (err) => {
        console.log(err);
      });
  }

  // update user profile
  updateProfile(user) {
    this.profileService.updateProfile(user)
      .subscribe((user) => {
        if (user.ok) {
          this.loadUserData();
          this.successFlag = true;
          setTimeout(() => {
            this.successFlag = false;
          }, 2500);
        }
      }, (err) => {
        console.log(err);
      });
  }

  // change user password
  changePassword() {
    let userId = this.sharedService.user._id;
    let oldPassword = this.changePasswordForm.value.password;
    let newPassword = this.changePasswordForm.value.newPassword;
    let verifyNewPassword = this.changePasswordForm.value.verifyNewPassword;

    this.data = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      verifyNewPassword: verifyNewPassword
    };

    if (newPassword !== verifyNewPassword) {
      this.errorFlag = true;
      this.errorMsg = "New password and verify new password does not match.";
      setTimeout(() => {
        this.errorFlag = false;
        this.errorMsg = "";
      }, 2500);
    } else if (oldPassword === newPassword) {
      this.errorFlag = true;
      this.errorMsg = "New password cannot be same as the old password.";
      setTimeout(() => {
        this.errorFlag = false;
        this.errorMsg = "";
      }, 2500);
    } else {
      this.changePasswordService.changePassword(userId, this.data)
        .subscribe((status) => {
          if (status) {
            this.successFlag = true;
            this.successMsg = "Password has been updated.";
            setTimeout(() => {
              this.successFlag = false;
              this.successMsg = "";
            }, 2500);
          }
        }, (err) => {
          this.errorFlag = true;
          this.errorMsg = "Old password is incorrect.";
          setTimeout(() => {
            this.errorFlag = false;
            this.errorMsg = "";
          }, 2500);
        });
    }
  }

}
