import { AppRole } from "./AppRole.model";
import { Offer } from "./Offer.model";
import { Proposal } from "./Proposal.model";

export class AppUser {
    public constructor(public username: string, public firstname: string, public lastname: string, public email: string, public sex: string, public phone: string, public birthDate: Date, public localisation: string,
        public subscribeDate: Date, public offers: Offer[], public role: AppRole, public proposales: Proposal[]) {}

}