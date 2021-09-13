import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/models/rental';
import { SingleCarDetailService } from 'src/app/services/single-car-details.service';
import { RentalService } from 'src/app/services/rental.service';
import { SingleCarDetail } from 'src/app/models/singleCarDetail';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css'],
})
export class RentalAddComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalService,
    private carDetailService: SingleCarDetailService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private routerService:Router
  ) {}

  rentalAddForm: FormGroup;
  carDetails: SingleCarDetail;
  carId: number;
  carImagePath: string;
  defaultPath = 'https://localhost:44365';
  rentals: Rental[] = [];
  rentDateValue: Date;
  returnDateValue: Date;
  paymentComponent: boolean = false;
  tarihsakla?: number;
  diffDays: number;
  dailyPric: number;
  paymentValue: number;
  result2: Rental;
  carId2: number;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.GetCarDetailsById(params['carId']);
        this.createRentalDateForm();
        this.carId2 = params['carId'];
      }
    });
  }

  GetCarDetailsById(carId: number) {
    this.carDetailService.getCarDetailsById(carId).subscribe((response) => {
      this.carDetails = response.data;
      this.carId = this.carDetails.carId;
      this.carImagePath=this.carDetails.carImage[0].imagePath
      this.dailyPric = this.carDetails.dailyPrice;
    });
  }

  getRentals() {
    this.rentalService.getAllRentals().subscribe((response) => {
      this.rentals = response.data;
    });
  }

  createRentalDateForm() {
    this.rentalAddForm = this.formBuilder.group({
      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required],
    });
  }

  checkCar(carId: number) {
    if (this.rentalAddForm.valid) {
      let model = Object.assign(
        { carId: this.carId },
        this.rentalAddForm.value
      );

      if (model.returnDate < model.rentDate) {
        this.toastrService.error(
          'Kiralama tarihi dönüş tarihinden büyük olamaz'
        );
      } else {
        this.rentalService.rentalCheck(model).subscribe(
          (response) => {
            if (!response.success) {
              this.toastrService.error('Seçilen tarihte araç kiralanmış');
            } else {
              this.toastrService.success('Araç kiralamaya uygun');
              this.rentDateValue = model.rentDate;
              this.returnDateValue = model.returnDate;
              let sakla1 = Date.parse(this.rentDateValue.toString());
              let sakla2 = Date.parse(this.returnDateValue.toString());
              let sakla3 = sakla2 - sakla1;
              this.tarihsakla = sakla3 / (1000 * 60 * 60 * 24) + 1;
              this.paymentValue = this.carDetails.dailyPrice * this.tarihsakla;
              this.paymentComponent = true;             

            }
          },
          (responseError) => {
            this.toastrService.success(responseError.error);
          }
        );
      }
    } else {
      this.toastrService.error('Kiralama veya dönüş tarihi boş olamaz.');
    }
  }
}
