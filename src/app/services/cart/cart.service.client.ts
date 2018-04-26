import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { environment } from '../../../environments/environment';
import 'rxjs/Rx';

@Injectable()
export class CartService {
  options: RequestOptions = new RequestOptions();
  baseUrl: string = environment.baseUrl;
  constructor(private _http: Http) { }

  addToCart(eventId: string) {
    let data = {
      eventId: eventId
    }
    this.options.withCredentials = true;
    return this._http.post(this.baseUrl + '/api/addToCart', data, this.options)
      .map((response: Response) => {
        return response.json();
      });
  }
  getAllItemsInCart() {
    this.options.withCredentials = true;
    return this._http.get(this.baseUrl + '/api/getAllItemsInCart', this.options)
      .map((response: Response) => {
        return response.json();
      });
  }
  updateItemInCart(eventId: string, cartId: string) {
    let data = {
      eventId: eventId,
      cartId: cartId
    }
    console.log("Een"+cartId);
    this.options.withCredentials = true;
    return this._http.put(this.baseUrl + '/api/updateItemInCart',data, this.options)
      .map((response: Response) => {
        return response.json();
      });
  }
  findAllCartItems(){
    this.options.withCredentials = true;
    return this._http.get(this.baseUrl + '/api/findAllCartItems', this.options)
      .map((response: Response) => {
        return response.json();
      });
  }

  updateItemValueInCart(item) {
    this.options.withCredentials = true;
    return this._http.put(this.baseUrl + '/api/updateItemValueInCart',item, this.options)
      .map((response: Response) => {
        return response.json();
      });
  }

  deleteItem(eventId) {
    this.options.withCredentials = true;
    return this._http.delete(this.baseUrl + '/api/deleteItem/' + eventId, this.options)
      .map((response: Response) => {
        return response.json();
      });
  }

  getItemByEventId(eventId) {
    this.options.withCredentials = true;
    return this._http.get(this.baseUrl + '/api/getItemByEventId/' + eventId, this.options)
      .map((response: Response) => {
        return response.json();
      });
  }

}
