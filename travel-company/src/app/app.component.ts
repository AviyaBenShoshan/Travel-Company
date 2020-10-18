import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { TravelsDataService } from './travels-data.service';
import { MatDialog } from '@angular/material/dialog'
import { PopupComponent } from 'src/app/popup/popup.component';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  countriesOptions: string[];
  filteredOptions: Observable<string[]>;
  newFlightForm = new FormGroup({
    destCountry: new FormControl(''),
    returnDate: new FormControl('', this.dateValidator),
    departureDate: new FormControl('', this.dateValidator),
    note: new FormControl('')
  });

  constructor(private travelDataService: TravelsDataService, private popup: MatDialog) {
  }

  ngOnInit() {
    this.travelDataService.getAllCountries().then(countries => {
      this.countriesOptions = countries;
      this.filteredOptions = this.newFlightForm.controls["destCountry"].valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.countriesOptions.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  dateValidator(date: FormControl) {
    if (Date.now() > date.value)
      return { valid: false }
    return;
  }

  returnAndDepartueCompatible(departureDate: AbstractControl, returnDate: AbstractControl) {
    if (returnDate.value && departureDate.value && departureDate.value > returnDate.value)
      return false;
    return true;
  }

  onSubmit() {
    if (!this.returnAndDepartueCompatible(this.newFlightForm.controls["departureDate"],
      this.newFlightForm.controls["returnDate"])) {
      this.openPopup("תאריך ההמראה והחזרה לא מתאימים");
      return;
    }
    if (!this.newFlightForm.valid){
      this.openPopup("שים לב! התאריך כבר עבר");
      return;
    }
    this.travelDataService.addFlight(this.newFlightForm.value);
    this.newFlightForm.reset();
  }

  openPopup(message: string) {
    this.popup.open(PopupComponent, { data: { message: message } });
  }

}
