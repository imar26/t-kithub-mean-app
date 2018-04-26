import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { environment } from '../../../environments/environment';
import 'rxjs/Rx';
import { SharedService } from '../sharedService/shared.service.client';
import { Router } from '@angular/router';

@Injectable()
export class ListUsersService {
    options: RequestOptions = new RequestOptions();
    baseUrl: string = environment.baseUrl;
    constructor(private _http: Http, private sharedService: SharedService, private router: Router) {}

    isAdmin() {
        this.options.withCredentials = true;
        return this._http.get(this.baseUrl + '/api/isAdmin', this.options)
            .map((response: Response) => {
                const user = response.json();
                if(user !== 0) {
                    this.sharedService.user = user;
                    return true;
                } else {
                    this.sharedService.user = null;
                    this.router.navigate(['/']);
                    return false;
                }
            });
    }

    isUserRoleAdmin() {
        this.options.withCredentials = true;
        return this._http.get(this.baseUrl + '/api/isAdmin', this.options)
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

    getAllUsersByUserRole() {
        this.options.withCredentials = true;
        return this._http.get(this.baseUrl + '/api/users', this.options)
            .map((response: Response) => {
                return response.json();
            });
    }

}