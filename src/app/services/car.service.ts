import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44365/api/cars/';

  constructor(private httpClient: HttpClient) {}

  getAllCarsWithDetails(): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'getallwithdetails';
    let datas  =  this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
    return datas;
  }

  getCarsByColor(colorId: number): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'getbycolor?colorId=' + colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsByBrand(brandId: number): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'getbybrand?brandId=' + brandId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  
  add(car:Car):Observable<ResponseModel>{
    let newPath=this.apiUrl+"add";
    return this.httpClient.post<ResponseModel>(newPath,car)
  }

  delete(brand:Car):Observable<ResponseModel>{
    let newPath=this.apiUrl+"delete";
    return this.httpClient.post<ResponseModel>(newPath,brand)
  }

  update(car:Car):Observable<ResponseModel>{
    let newPath=this.apiUrl+"update";
    return this.httpClient.post<ResponseModel>(newPath,car)
  }



  
}
