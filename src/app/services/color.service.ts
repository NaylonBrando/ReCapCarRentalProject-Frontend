import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  apiUrl = 'https://localhost:44365/api/colors/';

  constructor(private httpClient: HttpClient) {}

  getAllColors(): Observable<ListResponseModel<Color>> {
    let newPath=this.apiUrl+"getall";
    return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }
  getColorById(id: number):Observable<SingleResponseModel<Color>> {
    let newPath=this.apiUrl+"getbyid?colorId=" + id;
    return this.httpClient.get<SingleResponseModel<Color>>(newPath)
  }

  add(color:Color):Observable<ResponseModel>{
    let newPath=this.apiUrl+"add";
    return this.httpClient.post<ResponseModel>(newPath,color)
  }

  delete(color:Color):Observable<ResponseModel>{
    let newPath=this.apiUrl+"delete";
    return this.httpClient.post<ResponseModel>(newPath,color)
  }

  update(brand:Color):Observable<ResponseModel>{
    let newPath=this.apiUrl+"update";
    return this.httpClient.post<ResponseModel>(newPath,brand)
  }

}
