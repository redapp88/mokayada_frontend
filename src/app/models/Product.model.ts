import { AppPhoto } from "./AppPhoto.model";
export class Product{
   public constructor(public id:number,public title:string,public description:string,public creationDate:Date,public updateDate:Date,public photos:AppPhoto[] ){}
}