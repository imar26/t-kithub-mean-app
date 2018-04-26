import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { environment } from '../../../environments/environment';
import 'rxjs/Rx';

@Injectable()
export class ProfileService {
    options: RequestOptions = new RequestOptions();
    baseUrl: string = environment.baseUrl;
    constructor(private _http: Http) {}

    updateProfile(user) {
        this.options.withCredentials = true;
        return this._http.put(this.baseUrl + '/api/user', user, this.options)
            .map((response: Response) => {
                return response.json();
            });
    }

    currentUser() {
        this.options.withCredentials = true;
        return this._http.get(this.baseUrl + '/api/user', this.options)
            .map((response: Response) => {
                if(response) {
                    if(response['_body']) {
                        return response.json();
                    }
                }
            });
    }

}