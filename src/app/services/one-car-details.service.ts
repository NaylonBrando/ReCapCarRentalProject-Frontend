import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class OneCarDetailService {

  apiUrl ="https://localhost:44365/api/cars/getbyidwithdetails?carId=";

  constructor(private httpClient: HttpClient) { }

  getCarDetailsById(carId: number): Observable<ListResponseModel<CarDetail>> {
    let newPath =this.apiUrl + carId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
}
