import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarImage } from 'src/app/models/carImage';
import { SingleCarDetail } from 'src/app/models/singleCarDetail';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { SingleCarDetailService } from 'src/app/services/single-car-details.service';

@Component({
  selector: 'app-car-image-add',
  templateUrl: './car-image-edit.component.html',
  styleUrls: ['./car-image-edit.component.css']
})
export class CarImageEditComponent implements OnInit {

  carId: number
  selectedFiles?: FileList;
  carImages : CarImage[]=[]
  defaultPath = 'https://localhost:44365';
  defaultCarImagePath = 'https://localhost:44365\images\logo.jpg';
  combinedImagePaths:CarImage[]=[]
  carData:SingleCarDetail


  constructor(
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private carImageService: CarImageService,
    private carService:SingleCarDetailService
  ) { }

  ngOnInit(): void {
    this.getCarIdFromParam();
    this.getCarImagesById(this.carId);
  }

  getCarImagesById(carId: number) {
    this.carImageService.getImagesByCarId(carId).subscribe((response) => {
      this.carImages = response.data
      for (let index = 0; index < this.carImages.length; index++) {
        this.combinedImagePaths[index] = this.carImages[index]
        this.combinedImagePaths[index].imagePath = this.defaultPath + this.carImages[index].imagePath
      }
    });
  }

  getCarData(carId:number){
    this.carService.getCarDetailsById(carId).subscribe((response)=>{
      this.carData=response.data
    })
  }

  getCarIdFromParam() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) this.carId = params['carId'];
      this.getCarImagesById(this.carId);
      this.getCarData(this.carId)
    });
  }

  // getCarImageUrl(carImageId: number): string {
  //   return this.carImageService.getCarImageUrl(carImageId);
  // }

  selectFiles(event: any): void {
    this.selectedFiles = event.target.files;
  }

  uploadFiles(): void {
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(this.selectedFiles[i]);
      }
    }
  }

  upload(file: File): void {
    if (!file) return;

    this.carImageService.add(this.carId, file).subscribe((response) => {
      this.getCarImagesById(this.carId);
      this.toastrService.success(file.name, 'Uploaded car image successfully!');
    });
  }

  delete(carImage: CarImage) {
    if (window.confirm('Resmin silinmesine emin misiniz?')) {
      this.carImageService.delete(carImage).subscribe((response) => {
        this.toastrService.success('Secili araba resmi silindi');
        this.getCarImagesById(this.carId);
      }, (responseError)=>{
        this.toastrService.error(responseError.error);
      });
    }
  }

  isDefaultCarImage(carImage: CarImage): boolean {
    return carImage.id === 0;
  }

}
