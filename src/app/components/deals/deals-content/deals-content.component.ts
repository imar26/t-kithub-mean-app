import {Component, OnInit, ViewChild} from '@angular/core';
import {DealsService} from '../../../services/deals/deals.service.client';
import {AdminService} from '../../../services/authentication/admin.service.client';
import {SharedService} from '../../../services/sharedService/shared.service.client';
import {LoggedInService} from '../../../services/user/loggedin.service.client';
import {ListUsersService} from '../../../services/user/listUsers.service.client';
import {NgForm} from '@angular/forms';

@Component({selector: 'app-deals-content', templateUrl: './deals-content.component.html', styleUrls: ['./deals-content.component.scss']})
export class DealsContentComponent implements OnInit {
  @ViewChild('f') addForm : NgForm;
  //variables
  codeName : string;
  description : string;
  show : boolean;
  value : number;
  exists : boolean = false;
  showUpdate : boolean = false;
  codes = [];
  quantity : number;
  _id : string;
  showAdmin : boolean;
  errorFlag : boolean;
  errorMsg : string;
  successFlag : boolean;
  successMsg : string;

  constructor(private dealsService : DealsService, private sharedService : SharedService, private loggedInService : LoggedInService, private listUsersService : ListUsersService) {}

  ngOnInit() {
    this.getPromoCodes(); //fetch all the promo codes
    this.isAdmin(); //check if user is admin
  }

  /**
   * check if user is in session and then check if user is admin.
   * If user is admin then set the flag to true so that buttons are
   * only visible to admin.
   */
  isAdmin() {
    this
      .loggedInService
      .checkIfUserInSession()
      .subscribe((status) => {
        if (status) {
          this
            .listUsersService
            .isUserRoleAdmin()
            .subscribe((status) => {
              if (status) {
                this.showAdmin = true;
              } else {
                this.showAdmin = false;
              }
            });
        } else {}
      });
  }

  //add a new promo code
  addPromoCode() {
    let code, description, value, quantity, codeId;
    code = this.addForm.value.code;
    description = this.addForm.value.description;
    value = this.addForm.value.value;
    quantity = this.addForm.value.quantity;
    codeId = this.addForm.value._id;
    if(!codeId) {
      this
        .dealsService
        .getAllCodes()
        .subscribe((response) => { //retrieve all the existing codes

          if (Array.of(response)[0].length == 0) {
            //if db is empty
            this
              .dealsService
              .addPromoCode(description, code, value, quantity) //add a new code
              .subscribe((response) => {
                this.successFlag = true;
                this.successMsg = "Promo code added successfully.";
                setTimeout(() => {
                  this.successFlag = false;
                  this.successMsg = "";
                  this.getPromoCodes(); //update the array with the newly added code
                }, 2500);
              })

            this.addForm.reset();

          } else {
            var flag = false;
            for (var i = 0; i < Array.of(response)[0].length; i++) {
              if (Array.of(response)[0][i].code.indexOf(code) == -1) { //if the new code details doesn't exist in db
                flag = true;
              } else {
                flag = false;
                break;
              }
            }
            if (flag) {
              //add the new code if it doen't exist already in DB
              this
                .dealsService
                .addPromoCode(description, code, value, quantity)
                .subscribe((response) => {
                  this.successFlag = true;
                  this.successMsg = "Promo code added successfully.";
                  setTimeout(() => {
                    this.successFlag = false;
                    this.successMsg = "";
                    this.getPromoCodes(); //update the array with the newly added code
                  }, 2500);
                })

                this.addForm.reset();
            } else {
              //details of new code already exists in db; don't add it again in DB
              this.exists = true;
              this.errorMsg = "Promo Code Already Exists.";
              setTimeout(() => {
                this.exists = false;
                this.errorMsg = "";
              }, 2500);

              this.addForm.reset();
            }
          }
        });
    } else {
      this.update(codeId, description, code, value, quantity);
    }
  }

  //function to get all the promo codes existing in the DB
  getPromoCodes() {
    this.codes.length = 0;
    this
      .dealsService
      .getAllCodes()
      .subscribe((response) => {
        if (Array.of(response)[0].length > 0) {
          for (var i = 0; i < Array.of(response)[0].length; i++) {
            this
              .codes
              .push(Array.of(response)[0][i]);
          }
          this.errorFlag = false;
          this.errorMsg = "";
        } else {
          this.errorFlag = true;
          this.errorMsg = "No promo codes available";
        }
      })

  }

  //delete a specific code with given id
  deleteCode(_id) {
    this
      .dealsService
      .deleteCode(_id)
      .subscribe((response) => {
        if (response) {
          this.successFlag = true;
          this.successMsg = "Sucessfully deleted promo code.";
          setTimeout(() => {
            this.successFlag = false;
            this.successMsg = "";
            this.getPromoCodes(); //update the array with the newly added code
          }, 2500);
        }
      })
  }

  //function called on button click
  updateCode(code) {
    this.addForm.setValue(code);
  }
  //update an existing code
  update(codeId, description, code, value, quantity) {
    let data = {
      _id: codeId,
      code: code,
      description: description,
      value: value,
      quantity: quantity
    };
    this
      .dealsService
      .updateCode(data)
      .subscribe((response) => {
        if (response) {
          this.successFlag = true;
          this.successMsg = "Successfully updated the details of promo code.";
          setTimeout(() => {
            this.successFlag = false;
            this.successMsg = "";
            this.getPromoCodes(); //update the array with the newly added code
          }, 2500);

          this.addForm.reset();
        }
      })
  }
}
