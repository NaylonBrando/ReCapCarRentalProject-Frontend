import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { CarDetail } from 'src/app/models/carDetail';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: CarDetail[] = [];
  dataLoaded = false;
  defaultPath = 'https://localhost:44365';
  defaultCarImagePath = "https://localhost:44365\images\defaultcarimage.jpg";
  filterText = '';
  colors: Color[];
  brands: Brand[];
  brandParam = '';
  colorParam = '';
  brandFilter = '';
  colorFilter = '';
  selected = '';
  ngTextRead(text: string) {
    alert(text);
  }

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private brandService: BrandService,
    private colorService: ColorService
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
    this.getColorsAndBrands();
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
  filterCars() {
    this.colorFilter = this.colorParam;
    this.brandFilter = this.brandParam;
  }
  clearFilter() {
    this.brandParam = '';
    this.colorParam = '';
    this.colorFilter = '';
    this.brandFilter = '';
  }

  getColorsAndBrands() {
    this.colorService.getAllColors().subscribe((response) => {
      this.colors = response.data;
    });

    this.brandService.getAllBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
}
