import {Injectable} from '@angular/core';
import {Offer} from "../models/Offer.model";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {environment} from "../../environement/environement";
import {Subject,Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  offersSubject: Subject<any> = new Subject<any>();
  offers: Offer[] = [];


  constructor(private http:HttpClient,private authService:AuthService) {
  }

  emitOffers() {
    this.offersSubject.next(this.offers)
  }
  public fetchOffers(keyword:string,city:string,categorie:string,page:number,size:number){
    return new Observable(observer=>{

      this.http.get
      (`${environment.backEndUrl}/offers/byParams`,this.authService.httpOptions()).subscribe(
        (resData:any)=>{
          this.offers=resData;
          this.emitOffers();
          observer.complete()
        },
        (error)=>{observer.error(error)}
      )

    })
  }

  public getOffer(offerId){
    return  this.http.get
    (`${environment.backEndUrl}/offers/getOne?offerId=${offerId}`,this.authService.httpOptions())

  }


}
