import { Component, OnInit } from '@angular/core';
import {Flight} from '../../Models/Flight';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-travels-view',
  templateUrl: './travels-view.component.html',
  styleUrls: ['./travels-view.component.scss']
})
export class TravelsViewComponent implements OnInit {
  allFlights: Observable<Flight[]>;
  displayedColumns: string[] = ['destCountry', 'departureDate', 'returnDate','note'];
  
  constructor() { }

  ngOnInit() {
    this.allFlights = new Observable();
  }

}
