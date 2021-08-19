import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  cars:CarDetail[]= [];

  constructor(private carService:CarService) { }

  ngOnInit(): void {
    this.getCarDetails();
  }
  getCarDetails(){
    this.carService.getAllCarsWithDetails().subscribe(response => {
      this.cars = response.data
    })
  }

}
