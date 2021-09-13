import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { UserUpdateModel } from '../models/userUpdateModel';
import { UserUpdatePasswordModel } from '../models/userUpdatePasswordModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://localhost:44365/api/auth/';
  constructor(private httpClient: HttpClient) {}

  login(loginModel: LoginModel) {
    let newPath= this.apiUrl+"login";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,loginModel)
  }

  register(registerModel:RegisterModel){
    let newPath= this.apiUrl+"register";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, registerModel)
  }

  update(updateModel:UserUpdateModel){
    let newPath= this.apiUrl+"update";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, updateModel)
  }

  updatePassword(userUpdatePasswordModel:UserUpdatePasswordModel){
    let newPath= this.apiUrl+"updatepassword";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, userUpdatePasswordModel)
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }
}
