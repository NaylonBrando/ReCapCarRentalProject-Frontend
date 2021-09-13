import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { CustomerResponseModel } from '../models/customerResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl = 'https://localhost:44365/api/customers/';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<CustomerResponseModel> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<CustomerResponseModel>(this.apiUrl);
  }

  add(customer: Customer) {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, customer);
  }

  getLastCustomerByUserId(userId: number): Observable<SingleResponseModel<Customer>> {
    let newPath = this.apiUrl + 'getlastbyuserid?userId=' + userId;
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath);
  }
}
