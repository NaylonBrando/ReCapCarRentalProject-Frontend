import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { Fuel } from 'src/app/models/fuel';
import { Gear } from 'src/app/models/gear';
import { SingleCarDetail } from 'src/app/models/singleCarDetail';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { FuelService } from 'src/app/services/fuel.service';
import { GearService } from 'src/app/services/gear.service';
import { SingleCarDetailService } from 'src/app/services/single-car-details.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css'],
})
export class CarUpdateComponent implements OnInit {
  carUpdateForm: FormGroup;
  car: SingleCarDetail;
  cars: Car[] = [];
  brands: Brand[] = [];
  colors: Color[] = [];
  fuelTypes:Fuel[] = [];
  gearTypes:Gear[] = [];
  carId: number;
  carName: string;
  brandId: number;
  colorId: number;
  gearId:number;
  fuelId:number;
  modelYear: number;
  dailyPrice: number;
  description: string;
  score:number;

  constructor(
    private carService: CarService,
    private singleCarDetailService: SingleCarDetailService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private colorService: ColorService,
    private fuelService:FuelService,
    private gearService:GearService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetailsByCarId(params['carId']);
        this.createCarForm();
        this.getProperties();
      }
    });
  }
  
  getProperties() {
    this.colorService.getAllColors().subscribe((response) => {
      this.colors = response.data;
    });

    this.brandService.getAllBrands().subscribe((response) => {
      this.brands = response.data;
    });

    this.fuelService.getAll().subscribe((response) => {
      this.fuelTypes = response.data;
    });

    this.gearService.getAll().subscribe((response) => {
      this.gearTypes = response.data;
    });
  }

  getCarDetailsByCarId(carId: number) {
    this.singleCarDetailService
      .getCarDetailsById(carId)
      .subscribe((response) => {
        this.car = response.data;
        this.carId = this.car.carId;
        this.carName = this.car.carName;
        this.brandId = this.car.brandId;
        this.colorId = this.car.colorId;
        this.fuelId = this.car.fuelId
        this.gearId = this.car.gearId
        this.modelYear = this.car.modelYear;
        this.dailyPrice = this.car.dailyPrice;
        this.description = this.car.description;
        this.score = this.car.score;
      });
  }

  createCarForm() {
    this.carUpdateForm = this.formBuilder.group({
      carId: ['', Validators.required],
      carName: ['', Validators.required],
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      fuelId:['', Validators.required],
      gearId:['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
      score:['', Validators.required],
    });
  }

  update() {
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({}, this.carUpdateForm.value);
      this.carService.update(carModel).subscribe(
        (response) => {
          this.toastrService.success('Araç güncellendi', 'Başarılı');
          this.backToList();
        },
        (responseError) => {
          this.toastrService.error(
            responseError.error.Message,
            'İşlem başarısız'
          );
          console.log(responseError);
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }

  backToList() {
    this.router.navigate(['cars/list']);
  }
}
