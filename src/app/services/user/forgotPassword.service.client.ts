import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { environment } from '../../../environments/environment';
import 'rxjs/Rx';

@Injectable()
export class ForgotPasswordService {
    options: RequestOptions = new RequestOptions();
    baseUrl: string = environment.baseUrl;
    constructor(private _http: Http) {}

    forgotPassword(email) {
        this.options.withCredentials = true;
        let data = {
            email: email
        };
        return this._http.post(this.baseUrl + '/api/forgotPassword/', data, this.options)
            .map((response: Response) => {
                return response.json();
            });
    }

}