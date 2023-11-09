
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {environment} from "../../environement/environement";
import {Observable, Subject} from "rxjs";
import {Item} from "../models/Item.model";
import {ItemRequest} from "../requests/Item.request";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  itemsSubject: Subject<any> = new Subject<any>();
  offers: Item[] = [];


  constructor(private http: HttpClient, private authService: AuthService) {
  }

  emitItems() {
    this.itemsSubject.next(this.offers)
  }

  public fetchitems(username: string, page: number, size: number) {
    return new Observable(observer => {

      this.http.get
      (`${environment.backEndUrl}/items/byParams?username=${username}&page=${page}&size=${size}`, this.authService.httpOptions()).subscribe(
        (resData: any) => {
          this.offers = resData;
          this.emitItems();
          observer.complete()
        },
        (error) => {
          observer.error(error)
        }
      )

    })
  }

  public getItem(itemId) {
    return this.http.get<Item>
    (`${environment.backEndUrl}/items/getOne?id=${itemId}`, this.authService.httpOptions())

  }


  addItem(title: string, status: string, description: string) {

    let request:ItemRequest = new ItemRequest(title,status,description,this.authService.curentUser.username);
    console.log(request)

      return this.http.post(`${environment.backEndUrl}/items/add`,request, this.authService.httpOptions())


  }

  delete(itemId: number) {
    console.log(itemId)
    return this.http.delete(`${environment.backEndUrl}/items/delete/${itemId}`, this.authService.httpOptions())

  }

  update(id: number, title: string, status: string, description: string) {
    let request:ItemRequest = new ItemRequest(title,status,description,this.authService.curentUser.username);


    return this.http.put(`${environment.backEndUrl}/items/update/${id}`,request, this.authService.httpOptions())
  }
}
