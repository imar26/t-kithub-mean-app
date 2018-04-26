import {Component, OnInit} from '@angular/core';
import {ListUsersService} from '../../services/user/listUsers.service.client';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

@Component({selector: 'app-users-list', templateUrl: './users-list.component.html', styleUrls: ['./users-list.component.scss']})
export class UsersListComponent implements OnInit {
  users : Array < any > = [];
  constructor(private listUsers : ListUsersService) {}

  ngOnInit() {
    // Calculate height
    var windowHeight = window.innerHeight;
    var footerHeight = document
      .getElementById('footer')
      .clientHeight;
    var totalHeight = windowHeight - footerHeight;

    document
      .getElementById("users-list-page")
      .setAttribute('style', 'min-height: ' + totalHeight + 'px');

    this
      .listUsers
      .getAllUsersByUserRole()
      .subscribe((users) => {
        this.users = users;
      })
  }

  downloadData() {
    var result = [];
    for (var i = 0; i < this.users.length; i++) {
      let user = { //create a user object
        FirstName: this.users[i].firstName,
        LastName: this.users[i].lastName,
        Email: this.users[i].email,
        UserName: this.users[i].userName,
        DateJoined: new Date(this.users[i].dateCreated)
      }
      result.push(user); //add the object to array
    }
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: false,
      headers: ['First Name', 'Last Name', 'Email', 'User Name', 'Date Joined'] //header
    };
    new Angular2Csv(result, 'User Data', options); //create a csv file
  }

}
