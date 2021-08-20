import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { SingleCarDetail } from 'src/app/models/singleCarDetail';
import { CarService } from 'src/app/services/car.service';
import { SingleCarDetailService } from 'src/app/services/single-car-details.service';

@Component({
  selector: 'app-car-delete',
  templateUrl: './car-delete.component.html',
  styleUrls: ['./car-delete.component.css'],
})
export class CarDeleteComponent implements OnInit {
  carDeleteForm: FormGroup;
  car: SingleCarDetail;
  carId: number;

  constructor(
    private carService: CarService,
    private singleCarDetailService: SingleCarDetailService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetailsByCarId(params['carId']);
        this.createCarForm();
      }
    });
  }

  getCarDetailsByCarId(carId: number) {
    this.singleCarDetailService
      .getCarDetailsById(carId)
      .subscribe((response) => {
        this.car = response.data;
        this.carId = this.car.carId;
      });
  }

  createCarForm() {
    this.carDeleteForm = this.formBuilder.group({
      carId: ['', Validators.required],
    });
  }

  delete() {
    if (this.carDeleteForm.valid) {
      let carModel = Object.assign({}, this.carDeleteForm.value);
      this.carService.delete(carModel).subscribe(
        (response) => {
          this.toastrService.success('Araç silindi', 'Başarılı');
          this.backToList();
        },
        (responseError) => {
          //this.toastrService.error(responseError.error.Errors.ErrorMessage,"Doğrulama hatası")
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
