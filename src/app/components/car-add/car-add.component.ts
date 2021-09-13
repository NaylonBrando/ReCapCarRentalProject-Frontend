import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { Fuel } from 'src/app/models/fuel';
import { Gear } from 'src/app/models/gear';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { FuelService } from 'src/app/services/fuel.service';
import { GearService } from 'src/app/services/gear.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  carAddForm: FormGroup;
  colors: Color[];
  brands: Brand[];
  gearTypes:Gear[];
  fuelTypes:Fuel[];


  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private toastrService: ToastrService,
    private colorService: ColorService,
    private brandService: BrandService,
    private fuelService:FuelService,
    private gearService:GearService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.createBrandAddForm();
    this.getProperties();
  }
  CarId: number;
  BrandId: number;
  ColorId: number;
  CarName: string;
  ModelYear: number;
  DailyPrice: number;
  Description: string;

  createBrandAddForm() {
    this.carAddForm = this.formBuilder.group({
      carName: ['', Validators.required],
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      fuelId: ['', Validators.required],
      gearId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
      score:['', Validators.required],
    });
  }

  add() {
    if (this.carAddForm.valid) {
      let productModel = Object.assign({}, this.carAddForm.value);
      this.carService.add(productModel).subscribe(
        (response) => {
          console.log(response);
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }

  backToList(){
    this.router.navigate(["cars/list"]);
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
}
