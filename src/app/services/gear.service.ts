import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gear } from '../models/gear';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class GearService {
  apiUrl = 'https://localhost:44365/api/gears/';

  constructor(private httpClient: HttpClient) {}
  getAll(): Observable<ListResponseModel<Gear>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<Gear>>(newPath);
  }
}
