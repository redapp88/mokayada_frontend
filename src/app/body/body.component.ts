import {Component, OnInit} from '@angular/core';
import {Offer} from "../models/Offer.model";
import {OffersService} from "../services/offers.service";
import {AuthService} from "../services/auth.service";
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {OffersPage} from "../models/OffersPage.model";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
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

  constructor(private offerService: OffersService, private authSertvice: AuthService) {

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
    (error)=>{this.errorMessage=error()}
      )


    this.form = new FormGroup({
      categorie: new FormControl(this.categorie, {
        updateOn: 'change',
      }),
      city: new FormControl(this.city, {
        updateOn: 'change',
        validators: [Validators.required, Validators.minLength(3)]
      }),

      keyword: new FormControl(this.keyword, {
        updateOn: 'change',

      })


    })
  }
}
