import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { environment } from '../../../environments/environment';
import 'rxjs/Rx';

@Injectable()
export class ResetService {
    options: RequestOptions = new RequestOptions();
    baseUrl: string = environment.baseUrl;
    constructor(private _http: Http) {}

    resetPwd(data, token) {
        this.options.withCredentials = true;
        let obj = {
            data: data,
            token: token
        };
        return this._http.post(this.baseUrl + '/api/resetPassword/', obj, this.options)
            .map((response: Response) => {
                return response.json();
            });
    }

}