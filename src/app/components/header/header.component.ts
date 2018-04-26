import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { SearchKeywordService } from '../../services/search/search.service.client';
import { EventService } from '../../services/events/events.service.client';
import { SharedService } from '../../services/sharedService/shared.service.client';
import { LogoutService } from '../../services/user/logout.service.client';
import { Router } from '@angular/router';
import { LoggedInService } from '../../services/user/loggedin.service.client';
import { ListUsersService } from '../../services/user/listUsers.service.client';
import { CartService } from '../../services/cart/cart.service.client';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  //properties
  message: string;
  headerClass: string;
  divClass: string;
  showUser: boolean;
  showAdmin: boolean;
  relevantEvents = [];
  showHeader: boolean;
  firstName: string;
  cartItems: number = 0;
  errorFlag: boolean;
  errorMsg: string;

  constructor(private cartService: CartService, private data: SearchKeywordService, private eventService: EventService, private sharedService: SharedService, private logoutService: LogoutService, private router: Router, private loggedInService: LoggedInService, private listUsersService: ListUsersService) {
  }

  ngOnInit() {
    // dynamic header
    if (window.location.pathname.length > 1) {
      this.headerClass = "site-header";
      this.divClass = "main-header main-header-bg";
    } else {
      this.headerClass = "fix-header site-header";
      this.divClass = "main-header";
    }

    // check if user is in session
    this.loggedInService.checkIfUserInSession()
      .subscribe((status) => {
        if (status) { //user is in session
          this.showHeader = false;
          this.firstName = this.sharedService.user.firstName;
          this.showUser = true;
          // check if user role is admin
          this.listUsersService.isUserRoleAdmin()
            .subscribe((status) => {
              if (status) { //user is admin
                this.showAdmin = true;
                this.showUser = false;
              } else { //user is not admin
                //code to update count in cart
                this.getAllCartItems();
                this.showAdmin = false;
                this.showUser = true;
              }
            });
        } else {
          this.showHeader = true;
          this.showUser = false;
        }
      });
  }

  //logout
  logout() {
    this.logoutService.logout()
      .subscribe((status) => {
        this.sharedService.user = null;
        this.router.navigate(['/login']);
      });
  }

  //fetch all cart items to get the count of items in cart
  getAllCartItems() {
    this.cartService.findAllCartItems()
      .subscribe((response) => {
        if (response[0]) {
          if (response[0].events.length > 0) {
            this.cartItems = response[0].events.length;
            console.log(this.cartItems);
          } 
        } else if (response) {
          if (response.length > 0) {
            let events = response[0].events;
            this.cartItems = events.length;
          } 
        }
      });

  }

}
