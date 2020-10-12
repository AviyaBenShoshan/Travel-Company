import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Http } from "@angular/http";
import { map } from 'rxjs/operators';
import {Flight} from 'src/Models/Flight';

@Injectable({
  providedIn: 'root'
})
export class TravelsDataService {
  apiUrl: string = "restcountries.eu";
  private flightsSubject = new Subject<Flight>();

  constructor(private https: Http) { }

  sendMessage(message: string) {
    //this.flightsSubject.next({ text: message });
  }

  getMessage(): Observable<Flight> {
    return this.flightsSubject.asObservable();
  }


  getAllCountries(): Observable<string[]> {
    return this.https.get('http://restcountries.eu/rest/v2/all').pipe(
      map(res => {
        let countries = res.json().map(item => item.name)
        return countries;
      })
    );
  }
}
