import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ListUsersService } from '../user/listUsers.service.client';

@Injectable()
export class AdminService implements CanActivate {
    
    constructor(private listUsersService: ListUsersService) {}

    canActivate() {
        return this.listUsersService.isAdmin();
    }

}