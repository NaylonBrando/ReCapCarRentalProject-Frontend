import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  dataLoaded = false;
  defaultPath ="https://localhost:44365";
  defaultCarImagePath="https://localhost:44365/images/default.jpg";
  filterText="";
  brandParam="";
  colorParam="";
  brandFilter="";
  colorFilter="";
  selected="";

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } else if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else {
        this.getAllCarWithDetails();
      }
    });
    this.getAllCarWithDetails();
  }

  getAllCarWithDetails() {
    this.carService.getAllCarsWithDetails().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  filterCars(){
    this.colorFilter=this.brandParam;
    this.brandFilter=this.colorParam;
  }
  clearFilter(){
    this.brandParam="";
    this.colorParam="";
    this.colorFilter="";
    this.brandFilter="";
  }
}
