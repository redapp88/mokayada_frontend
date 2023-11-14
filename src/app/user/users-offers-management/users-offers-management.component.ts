import {Component} from '@angular/core';
import {Offer} from "../../models/Offer.model";
import {FormControl, FormGroup} from "@angular/forms";
import {ItemsService} from "../../services/items.service";
import {SharedService} from "../../services/shared.service";
import {AuthService} from "../../services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {OffersService} from "../../services/offers.service";
import {Item} from "../../models/Item.model";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-users-offers-management',
  templateUrl: './users-offers-management.component.html',
  styleUrls: ['./users-offers-management.component.css']
})
export class UsersOffersManagementComponent {

  constructor(private offersService: OffersService,private itemsService:ItemsService, private sharedService: SharedService, private authService: AuthService, private dialog: MatDialog) {
  }

  loadedOffers: Offer[] = [];
  offerItems:Item[]=[];
  loadedItemsPage;
  errorMessage: string = "";
  isLoadingOffers: boolean = false;
  isLoadingItems:boolean = true;
  page:number = 0;
  size:number = 5;
  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      keyword: new FormControl('', {
        updateOn: 'change',
        validators: []
      })
    })
    this.offersService.offersSubject.subscribe(
      (res)=>{
        this.loadedOffers = res;
      }
    )

    this.itemsService.itemsSubject.subscribe(
      (res)=>{
        this.loadedItemsPage = res
      }
    )

    this.fetchOffers()
    this.fetchItems();
  }

  onPaginatorChange($event: any) {
    this.page = $event.pageIndex;
    this.size = $event.pageSize;
    this.fetchItems();


  }

  public fetchOffers() {
    this.isLoadingOffers=true;


    this.offersService.fetchOffersByUser(this.authService.curentUser.username, this.form.value["keyword"]).subscribe(
      () => {
      },
      (error) => {
        this.isLoadingOffers=false
        this.errorMessage = error
      },
      ()=>{
        this.isLoadingOffers=false;
      }
    )
  }

  fetchItems(){
    this.isLoadingItems=true
    this.itemsService.fetchitems(this.authService.curentUser.username, this.page, this.size).subscribe(
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


  drop(event: CdkDragDrop<string[]>) {
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

}
