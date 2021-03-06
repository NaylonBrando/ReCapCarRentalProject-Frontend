import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
 
  apiUrl ="https://localhost:44365/api/brands/";

  constructor(private httpClient: HttpClient) { }

  getAllBrands():Observable<ListResponseModel<Brand>>{
    let newPath=this.apiUrl+"getall"
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

  add(brand:Brand):Observable<ResponseModel>{
    let newPath=this.apiUrl+"add";
    return this.httpClient.post<ResponseModel>(newPath,brand)
  }

  getBrandById(id: number):Observable<SingleResponseModel<Brand>> {
    let newPath=this.apiUrl+"getbyid?brandId=" + id;
    return this.httpClient.get<SingleResponseModel<Brand>>(newPath)
  }

  delete(brand:Brand):Observable<ResponseModel>{
    let newPath=this.apiUrl+"delete";
    return this.httpClient.post<ResponseModel>(newPath,brand)
  }

  update(brand:Brand):Observable<ResponseModel>{
    let newPath=this.apiUrl+"update";
    return this.httpClient.post<ResponseModel>(newPath,brand)
  }


}
