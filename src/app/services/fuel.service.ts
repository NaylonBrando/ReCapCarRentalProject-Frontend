import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fuel } from '../models/fuel';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class FuelService {
  apiUrl = 'https://localhost:44365/api/fuels/';

  constructor(private httpClient: HttpClient) {}
  getAll(): Observable<ListResponseModel<Fuel>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<Fuel>>(newPath);
  }
}
