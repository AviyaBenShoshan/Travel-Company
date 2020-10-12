import { Component, OnInit } from '@angular/core';
import { Flight } from '../../Models/Flight';
import { Observable, Subscription } from 'rxjs';
import { TravelsDataService } from '../travels-data.service';

@Component({
  selector: 'app-travels-view',
  templateUrl: './travels-view.component.html',
  styleUrls: ['./travels-view.component.scss']
})
export class TravelsViewComponent implements OnInit {
  allFlights: Flight[] = [];
  subscription: Subscription;
  displayedColumns: string[] = ['destCountry', 'departureDate', 'returnDate', 'note'];

  constructor(private travelDataService: TravelsDataService) {
    this.subscription = this.travelDataService.getAllFlights().subscribe(flights => this.allFlights = flights);
  }

  ngOnInit() {

  }

}
