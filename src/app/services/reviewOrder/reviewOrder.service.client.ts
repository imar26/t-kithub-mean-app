import { Injectable } from '@angular/core';


@Injectable()
export class ReviewOrderService {

  ticketNo: number;
  price: number;
  constructor() { }

  
  setTicketNo(ticketNo: number){
      this.ticketNo = ticketNo;
  }
  getTicketNo(){
      return this.ticketNo;
  }
  setPrice(price: number){
      this.price = price;
  }
  getPrice(){
      return this.price;
  }

}