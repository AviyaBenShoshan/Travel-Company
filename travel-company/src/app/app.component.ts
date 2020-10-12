import { Component, OnInit, Input } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { TravelsDataService } from './travels-data.service';
import { Flight } from '../Models/Flight';
import { MatDialog } from '@angular/material/dialog'
import { PopupComponent } from 'src/app/popup/popup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  countryControl = new FormControl();
  countriesOptions: string[];
  filteredOptions: Observable<string[]>;

  @Input()
  currentFlight: Flight;

  constructor(private travelDataService: TravelsDataService, private popup: MatDialog) {
  }

  ngOnInit() {
    this.travelDataService.getAllCountries().subscribe((countries) => { this.countriesOptions = countries });
    // this.filteredOptions = this.countryControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value))
    // ); 
    this.currentFlight = new Flight();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.countriesOptions.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  addFlight() {
    this.travelDataService.addFlight(this.currentFlight);
    this.currentFlight = new Flight();
  }

  OnDepartueDateChange(date) {
    if (Date.now() > date) {
      this.openPopup("תאריך ההמראה שבחרת כבר עבר");
      return;
    }
    if (this.currentFlight.returnDate && this.currentFlight.returnDate < date) {
      this.openPopup("תאריך ההמראה שבחרת אינו מתאים לתאריך החזרה");
      return;
    }
    this.currentFlight.departureDate = date;
  }

  OnReturnDateChange(date) {
    if (Date.now() > date) {
      this.openPopup("תאריך החזרה שבחרת כבר עבר");
      return;
    }
    if (this.currentFlight.departureDate && this.currentFlight.departureDate > date) {
      this.openPopup("תאריך החזרה שבחרת אינו מתאים לתאריך ההמראה");
      return;
    }
    this.currentFlight.returnDate = date;
  }

  openPopup(message: string) {
    this.popup.open(PopupComponent, { data: { message: message } });
  }

}
