import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetails } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { OneCarDetailService } from 'src/app/services/one-car-details.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  //get car details by id
  constructor(
    private carDetailService: OneCarDetailService,
    private activatedRoute: ActivatedRoute
  ) {}
  carDetails: CarDetails[];
  carImages:CarImage[];
  defaultPath = 'https://localhost:44365';
  defaultCarImagePath="https://localhost:44365/images/default.jpg"

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.GetCarDetailsById(params['carId']);
      }
    });
  }

  GetCarDetailsById(carId: number) {
    this.carDetailService.getCarDetailsById(carId).subscribe((response) => {
      this.carDetails = response.data;
      this.carImages=this.carDetails[0].carImage;
    });
  }

  getCurrentImageClass(image: CarImage) {
    if (image == this.carImages[0]) {
      return 'carousel-item active';
    } else {
      return 'carousel-item';
    }
  }

  getButtonClass(image: CarImage) {
    if (image == this.carImages[0]) {
      return 'active';
    } else {
      return '';
    }
  }
}
