import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { Rental } from 'src/app/models/rental';
import { OneCarDetailService } from 'src/app/services/one-car-details.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css'],
})
export class RentalAddComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalService,
    private carDetailService: OneCarDetailService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  rentalAddForm: FormGroup;
  carDetails: CarDetail[];
  carId: number;
  carImagePath: string;
  defaultPath = 'https://localhost:44365';
  rentals: Rental[] = [];
  rentDateValue: Date;
  returnDateValue: Date;
  dateStatus: boolean = false;
  tarihsakla?: number;
  diffDays: number;
  dailyPric: number;
  paymentValue: number;
  result2: Rental;
  carId2: number;

  //secilen arabanin bilgisi
  //tarih secimi
  //fiyatlandirma
  //kart bilgileri girisi

  //1 rental araba müsait(uygun tarih) sorgusu
  //2 uygunsa git 4
  //3 degilse hata ver
  //4 ödeme bilgilerini sorgula
  //5 ödeme bilgisi dogruysa ödeme yap
  //6 rental ekle

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.GetCarDetailsById(params['carId']);
        this.createRentalDateForm();
        this.carId2 = params['carId'];
      }
    });
  }

  //tarih secimi için formgroup nesneleri
  //tarih uygunsa payment aktif hale gelsin

  GetCarDetailsById(carId: number) {
    this.carDetailService.getCarDetailsById(carId).subscribe((response) => {
      this.carDetails = response.data;
      this.carImagePath = this.carDetails[0].carImage[0].imagePath;
      this.carId = this.carDetails[0].carId;
      this.dailyPric = this.carDetails[0].dailyPrice;
    });
  }

  // getRentals() {
  //   this.rentalService.getRentals().subscribe((response) => {
  //     this.rentals = response.data;
  //   });
  // }

  createRentalDateForm() {
    this.rentalAddForm = this.formBuilder.group({
      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required],
    });
  }

  redirectToPayment(carId: number) {
    if (this.rentalAddForm.valid) {
      let model = Object.assign({}, this.rentalAddForm.value);
      this.rentDateValue = model.rentDate;
      this.returnDateValue = model.returnDate;
    }

    this.getLastRental(this.carId2).subscribe((response) => {
      this.result2 = response.data;
      

      if (this.result2) {
        if (this.rentDateValue == null || this.returnDateValue == null) {
          this.toastrService.error('A Kiralama veya dönüş tarihi boş olamaz.');
          this.toastrService.clear();
        } else {
          if (this.rentDateValue > this.returnDateValue) {
            this.toastrService.warning(
              'A Araç kiralama tarihi dönüş tarihinden büyük olamaz'
            );
            this.toastrService.clear();
            this.tarihsakla = undefined;
          }
          if (this.result2.returnDate > this.rentDateValue) {
            this.toastrService.warning('Sectiginiz tarihte araba kiralanmis');
            this.toastrService.clear();
            this.tarihsakla = undefined;
          } else if (
            this.rentDateValue < this.returnDateValue ||
            this.rentDateValue == this.returnDateValue
          ) {
            let sakla1 = Date.parse(this.rentDateValue.toString());
            let sakla2 = Date.parse(this.returnDateValue.toString());
            let sakla3 = sakla2 - sakla1;
            this.tarihsakla = sakla3 / (1000 * 60 * 60 * 24) + 1;
            this.paymentValue = this.carDetails[0].dailyPrice * this.tarihsakla;
            this.toastrService.info('A Araç müsait.');
            this.toastrService.clear();
            this.dateStatus = true;
          }
        }
      } else {
        if (this.rentDateValue == null || this.returnDateValue == null) {
          this.toastrService.error('B Kiralama veya dönüş tarihi boş olamaz.');
          this.toastrService.clear();
          this.dateStatus = false;
        }
        if (this.rentDateValue > this.returnDateValue) {
          this.toastrService.error(
            'B Araç kiralama tarihi dönüş tarihinden büyük olamaz'
          );
          this.toastrService.clear();
          this.dateStatus = false;
          this.tarihsakla = undefined;
        }
        if (
          this.rentDateValue < this.returnDateValue ||
          this.rentDateValue == this.returnDateValue
        ) {
          let sakla1 = Date.parse(this.rentDateValue.toString());
          let sakla2 = Date.parse(this.returnDateValue.toString());
          let sakla3 = sakla2 - sakla1;
          this.tarihsakla = sakla3 / (1000 * 60 * 60 * 24) + 1;
          this.paymentValue = this.carDetails[0].dailyPrice * this.tarihsakla;
          this.toastrService.info('B Araç müsait.');
          this.toastrService.clear();
          this.dateStatus = true;
        }
      }
    });

    // let result = this.rentals.find((value) => value.carId == carId) ;
  }

  //calisiyore xddddddddd
  test() {
    if (this.rentalAddForm.valid) {
      let model = Object.assign({}, this.rentalAddForm.value);
      this.tarihsakla = model.rentDate;
      console.log(this.tarihsakla);
    }
  }

  getLastRental(carId: number) {
    // this.rentalService.getLastRental(carId).subscribe((response) => {
    //   // this.result2 = response.data;
    // });
    return this.rentalService.getLastRental(this.carId);
  }
}
