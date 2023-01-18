import { Offer } from "./Offer.model";
import { Proposal } from "./Proposal.model";

export class Deal{
public constructor(public id:string,public offer:Offer,public proposal:Proposal){}
}