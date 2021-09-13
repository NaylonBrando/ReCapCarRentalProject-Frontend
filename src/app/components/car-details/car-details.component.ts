import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { Rental } from 'src/app/models/rental';
import { SingleCarDetailService } from 'src/app/services/single-car-details.service';
import { RentalService } from 'src/app/services/rental.service';
import { SingleCarDetail } from 'src/app/models/singleCarDetail';
import { FindeksScoreService } from 'src/app/services/findeks-score.service';
import { UserService } from 'src/app/services/user.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  formBuilder: any;
  //sonradan toastiri ekle aq
  constructor(
    private carDetailService: SingleCarDetailService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private findeksService:FindeksScoreService,
    private userService:UserService,
    private localStorageService:LocalStorageService,
    private router:Router
  ) {}
  carDetails: SingleCarDetail;
  carImages: CarImage[];
  defaultPath = 'https://localhost:44365';
  defaultCarImagePath = 'https://localhost:44365/images/default.jpg';
  carId:number

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
      this.carImages = this.carDetails.carImage;
      this.carId=this.carDetails.carId
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


  compareFindeksScore(){
    let userId:number;
    let userScore: number;
    this.userService.getByMail(this.localStorageService.getCurrentUserEmail()).subscribe((userResponse)=>{
      userId = userResponse.data.id
      this.findeksService.getById(userId).subscribe((findeksResponse)=>{
        userScore = findeksResponse.data.score

        if (this.carDetails.score>userScore) {  ///yarina hallet aq
          this.toastrService.error("Findeks puanınız bu arabayi kiralamaya yeterli degildir.")
        }
        else{
          this.toastrService.success("Findeks puanınız yeterli, kiralama sayfasina yönlendiriliyorsunuz.")
          this.router.navigate(["/rent/car/"+this.carId])
        }
      })
      
    })
  }
 
}