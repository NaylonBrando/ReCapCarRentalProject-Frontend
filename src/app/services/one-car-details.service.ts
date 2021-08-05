import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetails } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class OneCarDetailService {

  apiUrl ="https://localhost:44365/api/cars/getbyidwithdetails?carId=";

  constructor(private httpClient: HttpClient) { }

  getCarDetailsById(carId: number): Observable<ListResponseModel<CarDetails>> {
    let newPath =this.apiUrl + carId;
    return this.httpClient.get<ListResponseModel<CarDetails>>(newPath);
  }
}
