import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/models/rental';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  rentals: RentalDetail[] = [];
  dataLoaded = false;


  constructor(private rentalService: RentalService) {}

  ngOnInit(): void {
    this.getRentalsWithDetails();
  }

  getRentalsWithDetails() {
    this.rentalService.getRentalsWithDetails().subscribe((response) => {
      this.rentals = response.data;
      this.dataLoaded = true;
    });
  }

}
