import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl ="https://localhost:44365/api/carimages/";
  constructor(private httpClient: HttpClient) { }

  getImagesByCarId(carId: number):Observable<ListResponseModel<CarImage>> {
    let newPath=this.apiUrl+"getbycarid?id=" + carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath)
  }

  add(carId: number, file: File): Observable<ResponseModel> {
    const formData: FormData = new FormData();
    formData.append('carImageIdString', carId.toString());
    formData.append('file', file);

    let newPath = this.apiUrl + "add";

    return this.httpClient.post<ResponseModel>(newPath,
      formData,
      {
        reportProgress: true,
        responseType: 'json',
      }
    )
  }

  delete(carImage:CarImage){
    let newPath=this.apiUrl+"delete"
    const formData: FormData = new FormData();
    formData.append('carImageIdString', carImage.id.toString());
    return this.httpClient.post<ResponseModel>(newPath,formData,
      {
        reportProgress: true,
        responseType: 'json',
      })
  }

  getCarImageUrl(id: number): string {
    let newPath = this.apiUrl + "getbycarid?id="+id;
    return newPath;
  }
}
