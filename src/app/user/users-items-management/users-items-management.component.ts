import {Component} from '@angular/core';
import {ItemsService} from "../../services/items.service";
import {Item} from "../../models/Item.model";
import {AuthService} from "../../services/auth.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-users-items-management',
  templateUrl: './users-items-management.component.html',
  styleUrls: ['./users-items-management.component.css']
})
export class UsersItemsManagementComponent {
  loadedItemsPage;
  form: FormGroup
  errorMessage: string = "";
  isLoading: boolean = false;
  page: number = 0;
  size: number = 5;

  constructor(private itemsService: ItemsService, private authService: AuthService) {

  }

  ngOnInit() {
    this.isLoading=true
    this.itemsService.itemsSubject.subscribe(
      (res => {
        this.loadedItemsPage = res
      })
    )

    this.itemsService.fetchitems(this.authService.curentUser.username, this.page, this.size).subscribe(
      () => {
      },
      error => {
        this.errorMessage = error.message;
        this.isLoading = false
      },
      () => {
        this.isLoading = false
      }
    )

  }

  public goToDetails(itemId){

}

}
