import {Component, OnInit} from '@angular/core';
import {Offer} from "../../models/Offer.model";
import {ActivatedRoute, Route} from "@angular/router";
import {OffersService} from "../../services/offers.service";

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css']
})
export class OfferDetailsComponent implements OnInit {

  public offer: Offer;
  public offerId: any;
  private errorMessage: string;
  private isLoading = true;

  constructor(private route: ActivatedRoute, private offersService: OffersService) {

  }

  ngOnInit(): void {
    this.isLoading = true;
    this.offerId = this.route.snapshot.paramMap.get("offerId");
    this.offersService.getOffer(this.offerId).subscribe(
      (resData: any) => {
        this.offer = resData;
        this.isLoading = false
      },
      (error) => {
        this.errorMessage = error;
        this.isLoading=false;
      }
    )
  }
}
