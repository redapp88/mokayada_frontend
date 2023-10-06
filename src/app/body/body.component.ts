import {Component, OnInit} from '@angular/core';
import {Offer} from "../models/Offer.model";
import {OffersService} from "../services/offers.service";
import {AuthService} from "../services/auth.service";
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {OffersPage} from "../models/OffersPage.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  toppings = new FormControl('');

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  loadOffersPage: OffersPage;
  isLoading: boolean = true;
  page: number = 0;
  size: number = 10;
  keyword: string = ""
  city: string = "";
  categorie:string = "";
  offersSubscription:Subscription;
  form:FormGroup
  errorMessage: string = "";

  constructor(private offerService: OffersService, private authSertvice: AuthService,private router:Router) {

  }

  ngOnInit(): void {
    this.offersSubscription = this.offerService.offersSubject.subscribe(
      (resultData: OffersPage) => {
        this.loadOffersPage = resultData;
        this.isLoading = false;
      }

    )
    this.offerService.fetchOffers(this.keyword,this.city,this.categorie,this.page,this.size).subscribe(
      ()=>{},
    (error)=>{this.errorMessage=error}
      )


    this.form = new FormGroup({
      categorie: new FormControl(this.categorie, {
        updateOn: 'change',
      }),
      city: new FormControl(this.city, {
        updateOn: 'change',
      }),

      keyword: new FormControl(this.keyword, {
        updateOn: 'change',

      })
    })
  }
  goToDetails(offerId:number){
    this.router.navigate(['/offers/details/'+offerId]);
  }
}
