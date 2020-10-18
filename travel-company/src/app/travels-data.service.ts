import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Http } from "@angular/http";
import { map } from 'rxjs/operators';
import {Flight} from 'src/Models/Flight';

@Injectable({
  providedIn: 'root'
})
export class TravelsDataService {
  apiUrl: string = "restcountries.eu";
  flightsSubject: BehaviorSubject<Flight[]> = new BehaviorSubject([]);

  constructor(private https: Http) { }

  addFlight(newFlight: Flight) {
    this.flightsSubject.next(this.flightsSubject.value.concat([newFlight]));    
  }

  getAllFlights(): Observable<Flight[]> {
    return this.flightsSubject.asObservable();
  }


  getAllCountries() : Promise<string[]>{
    return new Promise((resolve, reject) => {
      this.https.get('http://restcountries.eu/rest/v2/all').toPromise().then(
          res => { // Success
            let countries = res.json().map(item => item.name);
            console.log("finish internal");
          resolve(countries);
          },
          msg => { // Error
          reject(msg);
          }
        );
    });
  }    
}
