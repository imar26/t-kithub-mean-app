import {Component, OnInit, Input} from '@angular/core';
import {CartService} from '../../../services/cart/cart.service.client';
import {LoggedInService} from '../../../services/user/loggedin.service.client';
import {Router} from '@angular/router';

@Component({selector: 'app-price-details', templateUrl: './price-details.component.html', styleUrls: ['./price-details.component.scss']})
export class PriceDetailsComponent implements OnInit {

  @Input()event : Object;

  //properties
  successFlag : boolean;
  errorFlag : boolean;
  successMsg : string;
  errorMsg : string;
  eventsArray: Array<any> = [];

  constructor(private router : Router, private cartService : CartService, private loggedInService : LoggedInService) {}

  ngOnInit() {}

  // Add event to cart
  getEventId(eventId) {
    this
      .loggedInService
      .loggedin()
      .subscribe((response) => {
        if (response) {
          this
            .cartService
            .getAllItemsInCart()
            .subscribe((response) => {
              if (response == null) {
                this
                  .cartService
                  .addToCart(eventId)
                  .subscribe((response) => {
                    this.successFlag = true;
                    this.successMsg = "Event successfully added to the cart!";
                    setTimeout(() => {
                      this.successFlag = false;
                      this.successMsg = "";
                      this.router.navigate(['/cart']);
                    }, 2500);
                  })
              } else {
                for(let i=0; i<response.events.length; i++) {
                  this.eventsArray.push(response.events[i].eventId)
                }
                if (this.eventsArray.indexOf(eventId) == -1) {
                  this
                    .cartService
                    .updateItemInCart(eventId, response._id)
                    .subscribe((response) => {
                      this.successFlag = true;
                      this.successMsg = "Event successfully added to the cart!";
                      setTimeout(() => {
                        this.successFlag = false;
                        this.successMsg = "";
                        this.router.navigate(['/cart']);
                      }, 2500);
                    })
                } else {
                  this.errorFlag = true;
                  this.errorMsg = "Item already exists in the cart!";
                  setTimeout(() => {
                    this.errorFlag = false;
                    this.errorMsg = "";
                  }, 2500);
                }

              }
            })

        }
      })

  }

}
