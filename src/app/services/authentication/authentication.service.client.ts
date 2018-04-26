import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { LoggedInService } from '../user/loggedin.service.client';

@Injectable()
export class AuthenticationService implements CanActivate {
    
    constructor(private loggedInService: LoggedInService) {}

    canActivate() {
        return this.loggedInService.loggedin();
    }

}