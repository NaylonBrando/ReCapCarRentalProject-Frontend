import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalCheck } from '../models/rentalCheck';
import { RentalDetail } from '../models/rentalDetail';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = 'https://localhost:44365/api/rentals/';

  constructor(private httpClient: HttpClient) {}

  getAllRentalsWithDetails(): Observable<ListResponseModel<RentalDetail>> {
    let newPath = this.apiUrl + 'getallwithdetails';
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }

  getAllRentals(): Observable<ListResponseModel<Rental>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  add(rental: Rental): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'rent';
    return this.httpClient.post<ResponseModel>(newPath, rental);
  }

  getLastRental(id: number): Observable<SingleResponseModel<Rental>> {
    let newPath = this.apiUrl + 'getlastrentalbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<Rental>>(newPath);
  }

  rentalCheck(rental: RentalCheck) {
    let newPath = this.apiUrl + 'checkrentaldate';
    return this.httpClient.post<ResponseModel>(newPath, rental);
  }
}
