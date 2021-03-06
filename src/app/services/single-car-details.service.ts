import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SingleCarDetail } from '../models/singleCarDetail';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class SingleCarDetailService {

  apiUrl ="https://localhost:44365/api/cars/getbyidwithdetails?carId=";

  constructor(private httpClient: HttpClient) { }

  getCarDetailsById(carId: number) {
    let newPath =this.apiUrl + carId;
    return this.httpClient.get<SingleResponseModel<SingleCarDetail>>(newPath);
  }

  
}
