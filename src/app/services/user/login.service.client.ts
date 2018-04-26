import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { environment } from '../../../environments/environment';
import 'rxjs/Rx';

@Injectable()
export class LoginService {
    options: RequestOptions = new RequestOptions();
    baseUrl: string = environment.baseUrl;
    constructor(private _http: Http) {}

    login(username, password) {
        this.options.withCredentials = true;
        const credentials = {
            username: username,
            password: password
        };
        return this._http.post(this.baseUrl + '/api/login', credentials, this.options)
            .map((response: Response) => {
                return response.json();
            });
    }

}