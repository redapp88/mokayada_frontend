import {Component, OnInit} from '@angular/core';
import {Offer} from "../models/Offer.model";
import {OffersService} from "../services/offers.service";
import {AuthService} from "../services/auth.service";
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {OffersPage} from "../models/OffersPage.model";
import {Router} from "@angular/router";
import {UsersAddProposalComponent} from "./users-add-proposal/users-add-proposal.component";
import {MatDialog} from "@angular/material/dialog";
import {SharedService} from "../services/shared.service";
import {UsersUpdateProposalComponent} from "./users-update-proposal/users-update-proposal.component";
import {OfferDetailsComponent} from "../offers/offer-details/offer-details.component";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {


  cities: String[] = ["Toutes", "Rabat", "Casablanca", "Fes", "Agadir"];
  categories: String[] = ["Toutes", "Maison", "Auto-Moto", "Enfants", "Voyages"];

  loadOffersPage: OffersPage;
  isLoading: boolean = false;
  page: number = 0;
  size: number = 5;
  keyword: string = ""
  city: string = "";
  categorie: string = "";
  offersSubscription: Subscription;
  form: FormGroup
  errorMessage: string = "";

  constructor(private offerService: OffersService, private sharedService: SharedService, public authSertvice: AuthService, private router: Router, private dialog: MatDialog) {

  }

  popUpWith: string = "80%";

  ngOnInit(): void {
    this.offersSubscription = this.offerService.offersSubject.subscribe(
      (resultData: OffersPage) => {
        this.loadOffersPage = resultData;
        console.log(this.loadOffersPage)

      }
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

  goToDetails(offerId: number) {
    this.router.navigate(['/offers/details/' + offerId]);
  }

  onLoadOffers() {
    this.authSertvice.curentUser
    this.isLoading = true;
    this.offerService.fetchOffers(this.keyword, this.city, this.categorie, this.page, this.size).subscribe(
      () => {
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = error;
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      }
    )
  }

  onPaginatorChange($event: any) {
    this.page = $event.pageIndex;
    this.size = $event.pageSize;
    this.onLoadOffers()


  }

  onAddProposal(offer) {
    const dialogRef = this.dialog.open(UsersAddProposalComponent, {
      data: {offer},
      width: this.popUpWith,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == "success") {
        this.sharedService.openSnackBar("Proposition Ajouté", "")
        this.onLoadOffers();
      }
    });
  }

  onUpdateProposal(offer){
    let mode :string = "withDeleteOption";
    const dialogRef = this.dialog.open(UsersUpdateProposalComponent, {
      data: {offer,mode},
      width: this.popUpWith,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == "success") {
        this.sharedService.openSnackBar("Modification effectuée", "")
        this.onLoadOffers();
      }
    });
  }

  isAlreadyMadeProposale(offer: Offer) {
    let alreadyProposal: boolean = false;
    offer?.propositions.forEach(o => {
      if (o.owner?.username == this.authSertvice.curentUser.username) {
        alreadyProposal = true;
      }
    })
    return alreadyProposal;
  }

  onDetailsOffer(offer){
    let mode :string = "withDeleteOption";
    const dialogRef = this.dialog.open(OfferDetailsComponent, {
      data: {offer,mode},
      width: this.popUpWith,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == "success") {

      }
    });
  }
}
