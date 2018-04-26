import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { environment } from '../../../environments/environment';
import 'rxjs/Rx';

@Injectable()
export class DealsService {
  options: RequestOptions = new RequestOptions();
  baseUrl: string = environment.baseUrl;
  constructor(private _http: Http) { }

  //add new promo code to the DB
  addPromoCode(description: string, code: string, value: number, quantity: number) {
    let data = {
        code: code,
        description: description,
        value: value,
        quantity: quantity
    }
    this.options.withCredentials = true;
    return this._http.post(this.baseUrl + '/api/addPromoCode', data, this.options)
      .map((response: Response) => {          
        return response.json();
      });
  }

  //retrieve all the codes existing in DB
  getAllCodes(){
    this.options.withCredentials = true;
    return this._http.get(this.baseUrl + '/api/getAllCodes', this.options)
    .map((response: Response) => {
      return response.json();
    });
  }

  //delete a specific promo code
  deleteCode(_id){
    console.log(_id);
    this.options.withCredentials = true;
    return this._http.delete(this.baseUrl + '/api/deleteCode/'+ _id, this.options)
    .map((response: Response) => {
      console.log("inside delete code client service");
      console.log(response);
      return response.json();
    })
  }

  //update an existing promo code
  updateCode(code){
    console.log(code);
    let data = {
      _id: code._id,
      code: code.code,
      description: code.description,
      value: code.value,
      quantity: code.quantity
    }
    this.options.withCredentials = true;
    return this._http.put(this.baseUrl + '/api/updateCode/', data, this.options)
    .map((response: Response) => {
      console.log("inside update code client service");
      console.log(response);
      return response.json();
    })
  }

  //get Code by name
  getCodeByName(codeName){
    this.options.withCredentials = true;
    return this._http.get(this.baseUrl + '/api/findCodeByName/' + codeName, this.options)
    .map((response: Response) => {
      return response.json();
    });
  }

}
