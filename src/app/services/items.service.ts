import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {environment} from "../../environement/environement";
import {Observable, Subject} from "rxjs";
import {Item} from "../models/Item.model";

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  itemsSubject: Subject<any> = new Subject<any>();
  offers: Item[] = [];


  constructor(private http:HttpClient,private authService:AuthService) {
  }

  emitItems() {
    this.itemsSubject.next(this.offers)
  }
  public fetchitems(username:string,page:number,size:number){
    return new Observable(observer=>{

      this.http.get
      (`${environment.backEndUrl}/items/byParams?username=${username}&page=${page}&size=${size}`,this.authService.httpOptions()).subscribe(
        (resData:any)=>{
          this.offers=resData;
          this.emitItems();
          observer.complete()
        },
        (error)=>{observer.error(error)}
      )

    })
  }

  public getItem(itemId){
    return  this.http.get
    (`${environment.backEndUrl}/offers/getOne?offerId=${itemId}`,this.authService.httpOptions())

  }

}
