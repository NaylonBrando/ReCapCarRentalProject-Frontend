import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { Rental } from 'src/app/models/rental';
import { OneCarDetailService } from 'src/app/services/one-car-details.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  formBuilder: any;
  //sonradan toastiri ekle aq
  constructor(
    private carDetailService: OneCarDetailService,
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalService,
    private toastrService: ToastrService
  ) {}
  carDetails: CarDetail[];
  carDetails2: CarDetail;
  carImages: CarImage[];
  defaultPath = 'https://localhost:44365';
  defaultCarImagePath = 'https://localhost:44365/images/default.jpg';
  carId: number;
  rentals: Rental[] = [];
  dataLoaded = false;
  result: Rental;
  rentDate: Date;
  returnDate: Date;
  customerId: number = 1;
  dateStatus: boolean = false;
  rentalAddForm: FormGroup;


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.GetCarDetailsById(params['carId']);
      }    
    });
    // this.createRentalAddForm();
  }

  GetCarDetailsById(carId: number) {
    this.carDetailService.getCarDetailsById(carId).subscribe((response) => {
      this.carDetails = response.data;
      this.carDetails2=this.carDetails[0]
      this.carImages = this.carDetails[0].carImage;
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


  checkDateStatus(){
    if(this.dateStatus==true){
      this.toastrService.success('Kiralamaya Yönlendiriliyorsunuz');
      this.toastrService.clear();
    }
    else{
      this.toastrService.error('Arac Müsait Degil Gardas');
      this.toastrService.clear();
    }
  }
 
}
//Bu uyarıyı dikkate al!
// Stepper pagedeki ilerleme tuşunu(Kirala) javascript tarafında toastr uyarılarının durumuna göre aktif ettim.
// Bundan dolayı toastr bildirimlerini çağırdıktan sonra clear() fonksiyonu ile aktif olan toastr bildirimini
// kapatmak gerekiyor.