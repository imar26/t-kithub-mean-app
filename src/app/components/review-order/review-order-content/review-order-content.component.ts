import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../services/cart/cart.service.client';
import { EventService } from '../../../services/events/events.service.client';
import { DealsService } from '../../../services/deals/deals.service.client';
import { NgForm } from '@angular/forms';
import { OrderService } from '../../../services/order/order.service.client';

@Component({
  selector: 'app-review-order-content',
  templateUrl: './review-order-content.component.html',
  styleUrls: ['./review-order-content.component.scss']
})
export class ReviewOrderContentComponent implements OnInit {
  @ViewChild('f') totalPrice;
  @ViewChild('g') paymentForm: NgForm;
  //properties
  eventId: string;
  itemData: any;
  eventData: any;
  showPayment: boolean = false;
  code: string;
  validCode: boolean;
  codeValue: any;
  invalidCodeMessage: boolean;
  disableUpdateCodeButton: boolean = false;
  removeCodeLink: boolean = false;
  discountValidCode: boolean = false;
  notDiscountValidCode: boolean = false;
  validQuantity: boolean = false;
  showInvalidQuantityCodeFlag: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private eventService: EventService,
    private orderService: OrderService,
    private router: Router, private dealsService: DealsService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        this.eventId = params['eventId'];
      });

    this.eventService.getEventDetails(this.eventId).subscribe((eventDetails) => {
      this.eventData = eventDetails;
      // console.log(this.eventData);
    });

    this.cartService.getItemByEventId(this.eventId)
      .subscribe((item) => {
        this.itemData = item.data;
        this.itemData.total = this.itemData.total.slice(1);
        this.itemData.total = parseFloat(this.itemData.total.replace(/,/g, ''));
      }, (err) => {
        console.log(err);
      });
  }

  //function that applies code to overall order
  applyCode() {
    console.log("code applied");
    console.log(this.code);

    this.dealsService.getCodeByName(this.code) //to check if the code is valid or not
      .subscribe((code) => {
        console.log("inside apply code method");
        console.log(code);
        if (code.length > 0) { //valid code
          if (code[0].quantity != null) { //group discount code
            if (this.itemData.noTickets >= code[0].quantity) { //valid group discount code
              this.discountValidCode = true;
              this.showInvalidQuantityCodeFlag = false;
              this.notDiscountValidCode = false;
              this.removeCodeLink = true;
              this.disableUpdateCodeButton = true;
              this.validQuantity = true;
            } else {
              //code is valid & also group discount code but user selected less quantity
              this.showInvalidQuantityCodeFlag = true;
              this.removeCodeLink = false;
              this.disableUpdateCodeButton = false;
              this.notDiscountValidCode = false;
              this.discountValidCode = true;
              this.validQuantity = false;
              this.code = '';
            }
          } else { //not a group discount code
            this.discountValidCode = false;
            this.notDiscountValidCode = true;
            this.showInvalidQuantityCodeFlag = false;
            this.removeCodeLink = true;
            this.validQuantity = false;
            this.disableUpdateCodeButton = true;
          }

          this.validCode = true;                    
          this.codeValue = code[0];
          this.invalidCodeMessage = false;
        } else {
          this.validCode = false; //invalid code
          this.invalidCodeMessage = true;
          this.disableUpdateCodeButton = false;
          this.removeCodeLink = false;
          this.discountValidCode = false;
          this.discountValidCode = false;
          this.showInvalidQuantityCodeFlag = false;
          this.notDiscountValidCode = false;
          this.code = '';
        }
      })
  }

  //function to remove code
  removeCode() {
    this.disableUpdateCodeButton = false;
    this.validCode = false;
    this.removeCodeLink = false;
    this.code = '';
  }
  checkout() {
    this.showPayment = true;
  }

  cancelPayment() {
    this.showPayment = false;
  }

  confirmPayment() {
    console.log(this.totalPrice);
    let finalTotal = this.totalPrice.nativeElement.innerHTML;
    let data = {
      packageType: this.itemData.packageType,
      price: this.itemData.price,
      noTickets: this.itemData.noTickets,
      total: finalTotal
    };
    this.orderService.addOrder(this.eventId, data)
      .subscribe((status) => {
        if (status) {
          this.router.navigate(['/order-success']);
        }
      }, (err) => {
        console.log(err);
      });


  }
}
