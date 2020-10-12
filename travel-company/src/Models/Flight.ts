export class Flight
{
    destCountry: string;
    departureDate: Date;
    returnDate: Date;
    note: string;

    constructor(){
        this.destCountry = "";      
        this.note = "";
    }   
}