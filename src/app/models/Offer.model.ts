import { AppUser } from "./AppUser.model";
import { Deal } from "./Deal.model";
import { Product } from "./Product.model";
import { Proposal } from "./Proposal.model";

export class Offer {
    public constructor(public id: number, public title: string, public description: string, public creationdate: string, public products: Product[], public user: AppUser,
         public proposales: Proposal[], public deal: Deal){}

}