import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { environment } from '../../../environments/environment';
import 'rxjs/Rx';
import { Router } from '@angular/router';
import { SharedService } from '../sharedService/shared.service.client';

@Injectable()
export class LoggedInService {
    options: RequestOptions = new RequestOptions();
    baseUrl: string = environment.baseUrl;
    constructor(private _http: Http, private router: Router, private sharedService: SharedService) {}

    loggedin() {
        this.options.withCredentials = true;
        return this._http.post(this.baseUrl + '/api/loggedin', '', this.options)
            .map((response: Response) => {
                const user = response.json();
                if(user !== 0) {
                    this.sharedService.user = user;
                    return true;
                } else {
                    this.sharedService.user = null;
                    this.router.navigate(['/login']);
                    return false;
                }
            });
    }

    checkIfUserInSession() {
        this.options.withCredentials = true;
        return this._http.post(this.baseUrl + '/api/inSession', '', this.options)
            .map((response: Response) => {
                const user = response.json();
                if(user !== 0) {
                    this.sharedService.user = user;
                    return true;
                } else {
                    this.sharedService.user = null;
                    return false;
                }
            });
    }

}