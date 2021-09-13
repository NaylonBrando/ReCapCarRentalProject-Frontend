import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { CreditCardAddModel } from '../models/creditcardAddModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  apiUrl="https://localhost:44365/api/creditcards/";

  constructor(private httpClient:HttpClient) {}
  
  checkTheCreditCard(creditCard:CreditCardAddModel):Observable<ListResponseModel<CreditCardAddModel>>{
    let newPath = this.apiUrl + 'checkthecard'
    return this.httpClient.post<ListResponseModel<CreditCardAddModel>>(newPath, creditCard).pipe(catchError(this.handleError)); //(1)
  }

  getCards():Observable<ListResponseModel<CreditCardAddModel>>{
    let newPath = this.apiUrl + "getall"
    return this.httpClient.get<ListResponseModel<CreditCardAddModel>>(newPath);
  }

  add(creditCard:CreditCardAddModel){
    let newPath = this.apiUrl + "add"
    return this.httpClient.post<ResponseModel>(newPath, creditCard);
  }

  getByCustomerId(id:number){
    let newPath = this.apiUrl + "getbycustomerid?customerId=" + id;
    return this.httpClient.get<SingleResponseModel<CreditCardAddModel>>(newPath);
  }

  handleError(error: HttpErrorResponse) { // Bu method dönen hataları yakalamak için. //galiba backendde yapilan degisiklik bunu yapiyor
    return throwError(error);             // *(1) Kullanılacağı metodda .pipe() ile eklenir
  }
  
}