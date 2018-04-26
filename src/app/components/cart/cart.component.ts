import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { CartService } from '../../services/cart/cart.service.client';
import { EventService } from '../../services/events/events.service.client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @ViewChildren('f') price: QueryList<any>;
  @ViewChildren('g') total: QueryList<any>;
  //properties
  cartItems: Array<any> = [];
  tickets: Array<string> = [];
  errorFlag: boolean;
  errorMsg: string;

  constructor(private cartService : CartService, private eventService: EventService, private router: Router) { }

  ngOnInit() {
    // Calculate height
    var windowHeight = window.innerHeight;
    var footerHeight = document.getElementById('footer').clientHeight;
    var totalHeight = windowHeight - footerHeight;

    document.getElementById("cart-page").setAttribute('style', 'min-height: ' + totalHeight + 'px');

    this.getAllCartItems();

    for(let i=1; i<=10; i++) {
      this.tickets.push(i.toString());
    }
  }
  getAllCartItems(){
    this.cartService.findAllCartItems()
      .subscribe((response) =>{
        if(response[0]) {
          if(response[0].events.length > 0) {
            for(let i=0; i<response[0].events.length; i++) {
              this.eventService.getEventDetails(response[0].events[i].eventId).subscribe((eventDetails) => {
                // console.log(eventDetails);
                eventDetails.package = response[0].events[i].data.packageType;
                eventDetails.numberOfTickets = response[0].events[i].data.noTickets;
                this.cartItems.push(eventDetails);
              });
            }
          } else {
            this.errorFlag = true;
            this.errorMsg = "No items available in the cart";
          }
        } else if(response) {          
          if(response.length > 0) { 
            let events = response[0].events;
            // console.log(events);
            for(let i=0; i<events.length; i++) {
              this.eventService.getEventDetails(events[i].eventId).subscribe((eventDetails) => {
                // console.log(eventDetails);
                eventDetails.package = events[i].data.packageType;
                eventDetails.numberOfTickets = events[i].data.noTickets;
                this.cartItems.push(eventDetails);
              });
            }
          } else {
            this.errorFlag = true;
            this.errorMsg = "No items available in the cart";
          }
        }
      });
      
  }

  buy(index, eventId, packageType, noTickets) {
    let p = this.price.toArray()[index].nativeElement.innerText;
    let t = this.total.toArray()[index].nativeElement.innerText;
    let item = {
      eventId: eventId,
      packageType: packageType,
      noTickets: noTickets,
      price: p,
      total: t
    };
    this.cartService.updateItemValueInCart(item)
      .subscribe((status) => {
        if(status) {
          this.router.navigate(['/review-order/' + eventId]);
        }
      }, (err) => {
        console.log(err);
      });
  }

  deleteItem(eventId) {
    this.cartService.deleteItem(eventId)
      .subscribe((status) => {
        location.reload();
      }, (err) => {
        console.log(err);
      })
  }

}
