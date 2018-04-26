import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions} from '@angular/http';
import {environment} from '../../../environments/environment';
import 'rxjs/Rx';

@Injectable()
export class OrderService {
    options : RequestOptions = new RequestOptions();
    baseUrl : string = environment.baseUrl;
    constructor(private _http : Http) {}

    addOrder(eventId, order) {        
        this.options.withCredentials = true;
        return this
            ._http
            .post(this.baseUrl + '/api/addOrder/' + eventId, order, this.options)
            .map((response : Response) => {
                return response.json();
            });
    }

    getOrdersByUserId() {
        this.options.withCredentials = true;
        return this
            ._http
            .get(this.baseUrl + '/api/orders/', this.options)
            .map((response : Response) => {
                return response.json();
            });
    }

    getOrderDetails(orderId) {
        this.options.withCredentials = true;
        return this
            ._http
            .get(this.baseUrl + '/api/orders/' + orderId, this.options)
            .map((response : Response) => {
                return response.json();
            });
    }
}
