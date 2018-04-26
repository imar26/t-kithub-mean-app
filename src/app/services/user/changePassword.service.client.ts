import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { environment } from '../../../environments/environment';
import 'rxjs/Rx';

@Injectable()
export class ChangePasswordService {
    options: RequestOptions = new RequestOptions();
    baseUrl: string = environment.baseUrl;
    constructor(private _http: Http) {}

    changePassword(userId, data) {
        this.options.withCredentials = true;
        return this._http.put(this.baseUrl + '/api/changePassword/' + userId, data, this.options)
            .map((response: Response) => {
                return response.json();
            });
    }

}