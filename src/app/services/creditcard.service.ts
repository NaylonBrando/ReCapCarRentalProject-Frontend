
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { CreditCard } from '../models/creditcard';
import { catchError, retry } from 'rxjs/operators';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  apiUrl="https://localhost:44365/api/";

  constructor(private httpClient:HttpClient) {}
  
  checkTheCreditCard(creditCard:CreditCard):Observable<ListResponseModel<CreditCard>>{
    let newPath = this.apiUrl + 'creditcards/checkthecard'
    return this.httpClient.post<ListResponseModel<CreditCard>>(newPath, creditCard).pipe(catchError(this.handleError)); //(1)
  }

  getCards():Observable<ListResponseModel<CreditCard>>{
    let newPath = this.apiUrl + "creditcards/getall"
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }

  handleError(error: HttpErrorResponse) { // Bu method dönen hataları yakalamak için
    return throwError(error);             // *(1) Kullanılacağı metodda .pipe() ile eklenir
  }
}