import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { environment } from '../../../environments/environment';
import 'rxjs/Rx';

@Injectable()
export class RegisterService {
  options: RequestOptions = new RequestOptions();
  baseUrl: string = environment.baseUrl;
  constructor(private _http: Http) { }

  registerUser(user: any) {
    this.options.withCredentials = true;
    return this._http.post(this.baseUrl + '/api/register', user, this.options)
      .map((response: Response) => {
        return response.json();
      });
  }

}
