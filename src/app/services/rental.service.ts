import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetail } from '../models/rentalDetail';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = 'https://localhost:44365/api/';

  constructor(private httpClient: HttpClient) {}

  getRentalsWithDetails(): Observable<ListResponseModel<RentalDetail>> {
    let newPath = this.apiUrl + 'rentals/getallwithdetails';
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }

  getRentals(): Observable<ListResponseModel<Rental>> {
    let newPath = this.apiUrl + 'rentals/getall';
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  add(rental: Rental): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'rentals/rent';
    return this.httpClient.post<ResponseModel>(newPath, rental);
  }

  getLastRental(id: number):Observable<SingleResponseModel<Rental>> {
    let newPath = this.apiUrl + 'rentals/getlastrentalbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<Rental>>(newPath);
  }
}
