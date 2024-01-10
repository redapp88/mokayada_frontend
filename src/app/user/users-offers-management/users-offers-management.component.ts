import {Component} from '@angular/core';
import {Offer} from "../../models/Offer.model";
import {FormControl, FormGroup} from "@angular/forms";
import {ItemsService} from "../../services/items.service";
import {SharedService} from "../../services/shared.service";
import {AuthService} from "../../services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {OffersService} from "../../services/offers.service";
import {Item} from "../../models/Item.model";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {UsersAddItemComponent} from "../users-items-management/users-add-item/users-add-item.component";
import {UsersAddOfferComponent} from "./users-add-offer/users-add-offer.component";

@Component({
  selector: 'app-users-offers-management',
  templateUrl: './users-offers-management.component.html',
  styleUrls: ['./users-offers-management.component.css']
})
export class UsersOffersManagementComponent {

  constructor(private offersService: OffersService, private itemsService: ItemsService, private sharedService: SharedService, private authService: AuthService, private dialog: MatDialog) {
  }

  loadedOffers: Offer[] = [];
  loadedOfferItems: Item[] = [];
  loadedItems: Item[] = [];
  errorMessage: string = "";
  isLoadingOffers: boolean = false;
  isLoadingItems: boolean = false;
  isLoadingOfferItems: boolean = false;
  isSavingItems: boolean = false;
  page: number = 0;
  size: number = 5;
  form: FormGroup;
  popUpWith: string = "60%";
  selectedOffer: Offer = null;

  ngOnInit() {
    this.form = new FormGroup({
      keyword: new FormControl('', {
        updateOn: 'change',
        validators: []
      })
    })
    this.offersService.offersSubject.subscribe(
      (res) => {
        this.loadedOffers = res;
        if(this.loadedOffers.length>0){

        }
      }
    )

    this.itemsService.itemsSubject.subscribe(
      (res) => {
        this.loadedItems = res
      }
    )
    this.itemsService.offersItemsSubject.subscribe(
      (res) => {
        this.loadedOfferItems = res
      }
    )

    this.fetchOffers()

  }



  public fetchOffers() {
    this.isLoadingOffers = true;


    this.offersService.fetchOffersByUser(this.authService.curentUser.username, this.form.value["keyword"]).subscribe(
      () => {
      },
      (error) => {
        this.isLoadingOffers = false
        this.errorMessage = error
      },
      () => {
        this.isLoadingOffers = false;
      }
    )
  }


  fetchOfferItems(offerId: number) {
    this.isLoadingOfferItems = true
    this.itemsService.fetchOfferItems(this.authService.curentUser.username,offerId).subscribe(
      () => {
      },
      error => {
        this.errorMessage = error.message;
        this.isLoadingItems = false
      },
      () => {
        this.isLoadingItems = false
      }
    )
  }


  drop(event: CdkDragDrop<Item[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  onAddOffer() {
    const dialogRef = this.dialog.open(UsersAddOfferComponent, {
      data: {},
      width: this.popUpWith,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == "success") {
        this.sharedService.openSnackBar("Offer added successfuly", "")
        this.fetchOffers();
      }
    });
  }

  onChangeSelectedOffer(offer) {
    this.selectedOffer = offer;
    this.fetchOfferItems(offer.id);
  }

  onSaveItemsAffectation() {
    this.isSavingItems = true;
    this.itemsService.saveItemAffectation(this.selectedOffer, this.loadedOfferItems).subscribe(
      ()=>{
        this.isSavingItems=false;
      },
    (error)=>{
        this.errorMessage=error;
      this.isSavingItems=false;
    }
    )
  }

}
