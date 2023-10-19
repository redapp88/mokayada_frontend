import { Component } from '@angular/core';

@Component({
  selector: 'app-users-offers-management',
  templateUrl: './users-offers-management.component.html',
  styleUrls: ['./users-offers-management.component.css']
})
export class UsersOffersManagementComponent {


  ngOnInit() {
    localStorage.setItem("test","testItemValue");
    console.log("storaaaaage"+localStorage.getItem('authData'))
  }


}
